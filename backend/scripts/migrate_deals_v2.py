"""
migrate_deals_v2.py — Migrate ma_activities collection to deal schema v2.

Usage:
    python scripts/migrate_deals_v2.py               # dry-run (no writes)
    python scripts/migrate_deals_v2.py --apply       # apply migrations
    python scripts/migrate_deals_v2.py --csv report  # also write CSV report

Environment:
    MONGO_URL  — MongoDB connection string (or reads backend/.env)
    DB_NAME    — database name (default: defense_dashboard)
"""

import argparse
import asyncio
import csv
import os
import re
import sys
import uuid
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

# ── Environment ──────────────────────────────────────────────────────────────

_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(_ROOT))

# Load .env from backend/ if present
_env_file = _ROOT / ".env"
if _env_file.exists():
    for line in _env_file.read_text().splitlines():
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            k, _, v = line.partition("=")
            os.environ.setdefault(k.strip(), v.strip())

MONGO_URL = os.environ.get("MONGO_URL", "mongodb://localhost:27017")
DB_NAME = os.environ.get("DB_NAME", "defense_dashboard")


# ── Schema v2 field mapping ───────────────────────────────────────────────────

DEAL_TYPE_MAP = {
    "acquisition": "acquisition",
    "merger": "merger",
    "joint_venture": "joint_venture",
    "strategic_investment": "investment",
    "minority_stake": "minority_stake",
    "funding_round": "investment",
    "asset_acquisition": "asset_acquisition",
}

STATUS_MAP = {
    "announced": "announced",
    "pending": "pending",
    "under_review": "under_review",
    "completed": "completed",
    "cancelled": "cancelled",
    "dissolved": "dissolved",
    "exited": "exited",
    "active": "active",
}

# Fields that were added in v2 and default to None/empty when absent
V2_NEW_FIELDS = {
    "deal_id": None,           # generated below
    "closed_date": None,
    "value_disclosed": None,   # derived from is_disclosed
    "ev_revenue_multiple": None,
    "ev_ebitda_multiple": None,
    "advisors": {
        "acquirer_financial": [],
        "acquirer_legal": [],
        "target_financial": [],
        "target_legal": [],
    },
    "linked_programs": [],
    "regulatory_aspects": [],
    "sources": [],             # built from source_url
    "last_verified": None,
    "verified_by": "auto",
    "confidence": "low",
    "notes": None,
    "bitd_segment": [],
    "geo_acquirer": None,      # derived from acquirer_country
    "geo_target": None,        # derived from target_country
    "acquirer_type": None,     # must be set manually
}


def _make_deal_id(acquirer: str, target: str, date_str: str) -> str:
    """Generate a human-readable deal_id slug."""
    def slug(s: str) -> str:
        s = s.lower()
        s = re.sub(r"[^a-z0-9]+", "-", s)
        return s.strip("-")[:30]

    year_month = date_str[:7] if date_str else "0000-00"
    return f"{slug(acquirer)}_{slug(target)}_{year_month}"


def _migrate_one(doc: dict) -> tuple[dict, list[str]]:
    """
    Convert a v1 document to v2 schema.
    Returns (migrated_doc, list_of_warnings).
    """
    warnings = []
    out = {}

    # Carry over all existing v1 fields unchanged
    for k, v in doc.items():
        if k == "_id":
            continue
        out[k] = v

    # id — keep existing UUID
    if not out.get("id"):
        out["id"] = str(uuid.uuid4())
        warnings.append("generated new id (was missing)")

    # deal_id
    announced = out.get("announced_date", "")
    if isinstance(announced, datetime):
        announced = announced.isoformat()
    out["deal_id"] = _make_deal_id(
        out.get("acquirer", ""),
        out.get("target", ""),
        str(announced),
    )

    # type — normalise deal_type
    raw_type = out.get("deal_type", "acquisition")
    out["deal_type"] = DEAL_TYPE_MAP.get(raw_type, raw_type)
    if raw_type not in DEAL_TYPE_MAP:
        warnings.append(f"unknown deal_type '{raw_type}' — kept as-is")

    # status
    raw_status = out.get("status", "")
    out["status"] = STATUS_MAP.get(raw_status, raw_status)
    if raw_status not in STATUS_MAP:
        warnings.append(f"unknown status '{raw_status}' — kept as-is")

    # value_disclosed (derived from is_disclosed)
    out["value_disclosed"] = bool(out.get("is_disclosed", True))

    # geo fields (copy from country fields)
    out.setdefault("geo_acquirer", out.get("acquirer_country"))
    out.setdefault("geo_target", out.get("target_country"))

    # sources — promote source_url to sources array
    existing_sources = out.get("sources", [])
    if not existing_sources and out.get("source_url"):
        existing_sources = [{
            "url": out["source_url"],
            "publication": "unknown",
            "date": None,
            "type": "secondary",
        }]
    out["sources"] = existing_sources

    # advisors
    out.setdefault("advisors", {
        "acquirer_financial": [],
        "acquirer_legal": [],
        "target_financial": [],
        "target_legal": [],
    })

    # remaining v2 defaults
    for field, default in V2_NEW_FIELDS.items():
        if field not in out:
            out[field] = default

    # confidence — "low" for all docs not manually verified
    if not out.get("confidence"):
        out["confidence"] = "low"
        warnings.append("confidence set to 'low' — pending manual review")

    # last_verified
    if not out.get("last_verified"):
        warnings.append("last_verified is null — add to manual review queue")

    return out, warnings


# ── Temporal & logical consistency checks ─────────────────────────────────────

def _check_consistency(doc: dict) -> list[str]:
    """Return list of consistency problems for a single document."""
    issues = []
    acquirer = doc.get("acquirer", "?")
    target = doc.get("target", "?")
    label = f"{acquirer} → {target}"

    announced = doc.get("announced_date")
    closed = doc.get("closed_date")
    status = doc.get("status", "")
    value = doc.get("deal_value", 0) or 0
    sources = doc.get("sources", [])

    if announced and closed:
        ann = datetime.fromisoformat(str(announced).replace("Z", "+00:00")) if isinstance(announced, str) else announced
        cl = datetime.fromisoformat(str(closed).replace("Z", "+00:00")) if isinstance(closed, str) else closed
        if cl < ann:
            issues.append(f"[BLOCKER] {label}: closed_date {cl.date()} < announced_date {ann.date()}")

    if status == "completed" and not closed:
        issues.append(f"[WARN] {label}: status=completed but no closed_date")

    if status == "cancelled" and closed:
        issues.append(f"[WARN] {label}: status=cancelled but has closed_date {closed}")

    if value and value > 100_000:
        issues.append(f"[BLOCKER] {label}: deal_value {value}M > $100B sanity check")

    if value and 0 < value < 1:
        issues.append(f"[WARN] {label}: deal_value {value}M < $1M — check units")

    if not sources:
        issues.append(f"[BLOCKER] {label}: no sources")

    confidence = doc.get("confidence", "low")
    last_verified = doc.get("last_verified")
    if confidence == "low" and not last_verified:
        issues.append(f"[WARN] {label}: confidence=low and never verified")

    return issues


# ── CSV report ────────────────────────────────────────────────────────────────

def _write_csv(rows: list[dict], path: str) -> None:
    if not rows:
        return
    fieldnames = [
        "deal_id", "acquirer", "target", "announced_date", "status",
        "deal_value", "confidence", "last_verified", "warnings", "issues",
    ]
    with open(path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames, extrasaction="ignore")
        writer.writeheader()
        writer.writerows(rows)
    print(f"  CSV report written → {path}")


# ── Main ──────────────────────────────────────────────────────────────────────

async def run(apply: bool, csv_path: str | None) -> None:
    from motor.motor_asyncio import AsyncIOMotorClient

    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]
    collection = db.ma_activities

    total = await collection.count_documents({})
    print(f"\nma_activities: {total} documents found\n")

    migrated = 0
    skipped = 0
    blockers = 0
    report_rows = []

    cursor = collection.find({}, {"_id": 0})
    async for doc in cursor:
        v2_doc, warnings = _migrate_one(doc)
        issues = _check_consistency(v2_doc)

        deal_blockers = [i for i in issues if "[BLOCKER]" in i]
        if deal_blockers:
            blockers += len(deal_blockers)

        all_issues = warnings + issues
        if all_issues:
            label = f"{doc.get('acquirer', '?')} → {doc.get('target', '?')}"
            print(f"  {label}")
            for msg in all_issues:
                colour = "\033[31m" if "[BLOCKER]" in msg else "\033[33m"
                print(f"    {colour}{msg}\033[0m")

        report_rows.append({
            "deal_id": v2_doc.get("deal_id", ""),
            "acquirer": doc.get("acquirer", ""),
            "target": doc.get("target", ""),
            "announced_date": doc.get("announced_date", ""),
            "status": doc.get("status", ""),
            "deal_value": doc.get("deal_value", ""),
            "confidence": v2_doc.get("confidence", "low"),
            "last_verified": v2_doc.get("last_verified", ""),
            "warnings": "; ".join(w for w in warnings if "[BLOCKER]" not in w),
            "issues": "; ".join(issues),
        })

        if apply:
            await collection.update_one(
                {"id": v2_doc["id"]},
                {"$set": v2_doc},
                upsert=False,
            )
            migrated += 1
        else:
            skipped += 1

    print(f"\n{'─' * 60}")
    print(f"  Documents processed : {total}")
    print(f"  Blocker issues      : \033[31m{blockers}\033[0m")
    if apply:
        print(f"  Documents migrated  : {migrated}")
    else:
        print(f"  Dry-run (no writes) : pass --apply to execute")

    if csv_path:
        _write_csv(report_rows, csv_path)

    client.close()

    if blockers:
        sys.exit(1)


def main() -> None:
    parser = argparse.ArgumentParser(description="Migrate ma_activities to deal schema v2")
    parser.add_argument("--apply", action="store_true", help="Write changes to MongoDB (default: dry-run)")
    parser.add_argument("--csv", metavar="PATH", help="Write CSV report to PATH")
    args = parser.parse_args()

    asyncio.run(run(apply=args.apply, csv_path=args.csv))


if __name__ == "__main__":
    main()
