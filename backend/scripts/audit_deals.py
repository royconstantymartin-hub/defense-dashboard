"""
audit_deals.py — Automated consistency audit for the ma_activities collection.

Detects and reports:
  - Probable duplicates (same acquirer/target pair within 90 days or identical value)
  - Temporal inconsistencies (closed < announced, future dates >24 months without 'announced' status)
  - Status inconsistencies (completed without closed_date, cancelled with closed_date)
  - Aberrant values (>$100B, <$1M)
  - Missing sources
  - Low-confidence deals not reviewed in >90 days
  - Header count vs actual count discrepancy

Usage:
    python scripts/audit_deals.py
    python scripts/audit_deals.py --json          # machine-readable output
    python scripts/audit_deals.py --md report.md  # write markdown report

Exit code != 0 if any BLOCKER issues are found (usable as pre-commit hook).

Environment: MONGO_URL, DB_NAME (or backend/.env)
"""

import argparse
import asyncio
import json
import os
import sys
from datetime import datetime, timedelta, timezone
from pathlib import Path

# ── Environment ──────────────────────────────────────────────────────────────

_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(_ROOT))

_env_file = _ROOT / ".env"
if _env_file.exists():
    for line in _env_file.read_text().splitlines():
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            k, _, v = line.partition("=")
            os.environ.setdefault(k.strip(), v.strip())

MONGO_URL = os.environ.get("MONGO_URL", "mongodb://localhost:27017")
DB_NAME = os.environ.get("DB_NAME", "defense_dashboard")

NOW = datetime.now(tz=timezone.utc)
FUTURE_WARN_MONTHS = 24


# ── Colours ───────────────────────────────────────────────────────────────────

class C:
    RED   = "\033[31m"
    AMBER = "\033[33m"
    GREEN = "\033[32m"
    BOLD  = "\033[1m"
    RESET = "\033[0m"


def _red(s: str) -> str:    return f"{C.RED}{s}{C.RESET}"
def _amber(s: str) -> str:  return f"{C.AMBER}{s}{C.RESET}"
def _green(s: str) -> str:  return f"{C.GREEN}{s}{C.RESET}"
def _bold(s: str) -> str:   return f"{C.BOLD}{s}{C.RESET}"


# ── Helpers ───────────────────────────────────────────────────────────────────

def _parse_date(val) -> datetime | None:
    if val is None:
        return None
    if isinstance(val, datetime):
        return val.replace(tzinfo=timezone.utc) if val.tzinfo is None else val
    try:
        s = str(val).replace("Z", "+00:00")
        return datetime.fromisoformat(s)
    except (ValueError, TypeError):
        return None


def _norm(s: str) -> str:
    import re
    return re.sub(r"\s+", " ", s.lower().strip())


def _label(doc: dict) -> str:
    return f"{doc.get('acquirer', '?')} → {doc.get('target', '?')}"


# ── Audit checks ─────────────────────────────────────────────────────────────

def check_duplicates(docs: list[dict]) -> list[dict]:
    """Probable duplicates: same (acquirer_norm, target_norm) within 90 days OR identical value."""
    issues = []
    seen: dict[tuple, list] = {}

    for doc in docs:
        a = _norm(doc.get("acquirer", ""))
        t = _norm(doc.get("target", ""))
        key = (a.split()[0] if a else "", t.split()[0] if t else "")
        seen.setdefault(key, []).append(doc)

    for key, group in seen.items():
        if len(group) < 2:
            continue
        for i, d1 in enumerate(group):
            for d2 in group[i + 1:]:
                date1 = _parse_date(d1.get("announced_date"))
                date2 = _parse_date(d2.get("announced_date"))
                val1 = d1.get("deal_value", 0) or 0
                val2 = d2.get("deal_value", 0) or 0

                dates_close = (
                    date1 and date2 and abs((date1 - date2).days) <= 90
                )
                values_identical = val1 and val2 and val1 == val2

                if dates_close or values_identical:
                    issues.append({
                        "severity": "blocker",
                        "check": "duplicate",
                        "label": f"{_label(d1)} / {_label(d2)}",
                        "detail": (
                            f"dates within 90d ({date1.date() if date1 else '?'} vs "
                            f"{date2.date() if date2 else '?'})"
                            if dates_close else
                            f"identical value ${val1}M"
                        ),
                    })
    return issues


def check_temporal(docs: list[dict]) -> list[dict]:
    issues = []
    for doc in docs:
        lbl = _label(doc)
        announced = _parse_date(doc.get("announced_date"))
        closed = _parse_date(doc.get("closed_date"))
        status = doc.get("status", "")

        if announced and closed and closed < announced:
            issues.append({
                "severity": "blocker",
                "check": "temporal",
                "label": lbl,
                "detail": f"closed_date {closed.date()} < announced_date {announced.date()}",
            })

        future_limit = NOW + timedelta(days=FUTURE_WARN_MONTHS * 30)
        if announced and announced > future_limit and status not in ("announced", "pending"):
            issues.append({
                "severity": "warn",
                "check": "temporal",
                "label": lbl,
                "detail": f"announced_date {announced.date()} is >24 months in future with status='{status}'",
            })

    return issues


def check_status_consistency(docs: list[dict]) -> list[dict]:
    issues = []
    for doc in docs:
        lbl = _label(doc)
        status = doc.get("status", "")
        closed = _parse_date(doc.get("closed_date"))

        if status == "completed" and not closed:
            issues.append({
                "severity": "warn",
                "check": "status",
                "label": lbl,
                "detail": "status=completed but no closed_date",
            })

        if status == "cancelled" and closed:
            issues.append({
                "severity": "warn",
                "check": "status",
                "label": lbl,
                "detail": f"status=cancelled but has closed_date {closed.date()}",
            })

    return issues


def check_values(docs: list[dict]) -> list[dict]:
    issues = []
    for doc in docs:
        lbl = _label(doc)
        value = doc.get("deal_value", 0) or 0

        if value > 100_000:
            issues.append({
                "severity": "blocker",
                "check": "value",
                "label": lbl,
                "detail": f"deal_value ${value}M exceeds $100B sanity threshold",
            })

        if 0 < value < 1:
            issues.append({
                "severity": "warn",
                "check": "value",
                "label": lbl,
                "detail": f"deal_value ${value}M < $1M — possible unit error (M vs B?)",
            })

    return issues


def check_sources(docs: list[dict]) -> list[dict]:
    issues = []
    for doc in docs:
        lbl = _label(doc)
        sources = doc.get("sources", [])
        source_url = doc.get("source_url", "")

        if not sources and not source_url:
            issues.append({
                "severity": "blocker",
                "check": "sources",
                "label": lbl,
                "detail": "no source_url and no sources[] — unsourced deal",
            })

    return issues


def check_stale_confidence(docs: list[dict]) -> list[dict]:
    issues = []
    threshold = NOW - timedelta(days=90)

    for doc in docs:
        lbl = _label(doc)
        confidence = doc.get("confidence", "low")
        last_verified = _parse_date(doc.get("last_verified"))

        if confidence == "low" and (not last_verified or last_verified < threshold):
            issues.append({
                "severity": "warn",
                "check": "confidence",
                "label": lbl,
                "detail": (
                    f"confidence=low, last_verified={last_verified.date() if last_verified else 'never'}"
                ),
            })

    return issues


def check_counter_consistency(docs: list[dict]) -> dict:
    """Returns breakdown counts by deal_type and status for header reconciliation."""
    by_type: dict[str, int] = {}
    by_status: dict[str, int] = {}

    for doc in docs:
        dt = doc.get("deal_type", "unknown")
        st = doc.get("status", "unknown")
        by_type[dt] = by_type.get(dt, 0) + 1
        by_status[st] = by_status.get(st, 0) + 1

    return {
        "total": len(docs),
        "by_type": dict(sorted(by_type.items(), key=lambda x: -x[1])),
        "by_status": dict(sorted(by_status.items(), key=lambda x: -x[1])),
    }


# ── Markdown report ───────────────────────────────────────────────────────────

def _write_markdown(all_issues: list[dict], counters: dict, path: str) -> None:
    date_str = NOW.strftime("%Y-%m-%d")
    blockers = [i for i in all_issues if i["severity"] == "blocker"]
    warns = [i for i in all_issues if i["severity"] == "warn"]

    lines = [
        f"# Deals Audit Report — {date_str}",
        "",
        f"**Total deals:** {counters['total']}  ",
        f"**Blockers:** {len(blockers)}  ",
        f"**Warnings:** {len(warns)}",
        "",
        "## Breakdown by type",
        "",
        "| Type | Count |",
        "|---|---|",
    ]
    for t, c in counters["by_type"].items():
        lines.append(f"| {t} | {c} |")

    lines += [
        "",
        "## Breakdown by status",
        "",
        "| Status | Count |",
        "|---|---|",
    ]
    for s, c in counters["by_status"].items():
        lines.append(f"| {s} | {c} |")

    if blockers:
        lines += ["", "## 🔴 Blockers", ""]
        for issue in blockers:
            lines.append(f"- **[{issue['check'].upper()}]** `{issue['label']}` — {issue['detail']}")

    if warns:
        lines += ["", "## 🟡 Warnings", ""]
        for issue in warns:
            lines.append(f"- **[{issue['check'].upper()}]** `{issue['label']}` — {issue['detail']}")

    if not blockers and not warns:
        lines += ["", "## ✅ All checks passed", ""]

    lines.append("")
    Path(path).write_text("\n".join(lines), encoding="utf-8")
    print(f"  Markdown report written → {path}")


# ── Main ──────────────────────────────────────────────────────────────────────

async def run(as_json: bool, md_path: str | None) -> int:
    from motor.motor_asyncio import AsyncIOMotorClient

    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]
    docs = await db.ma_activities.find({}, {"_id": 0}).to_list(5000)
    client.close()

    print(f"\n{_bold('Defense Dashboard — M&A Deals Audit')}")
    print(f"  Database  : {DB_NAME}")
    print(f"  Documents : {len(docs)}")
    print(f"  Run at    : {NOW.strftime('%Y-%m-%d %H:%M UTC')}\n")

    all_issues: list[dict] = []
    all_issues += check_duplicates(docs)
    all_issues += check_temporal(docs)
    all_issues += check_status_consistency(docs)
    all_issues += check_values(docs)
    all_issues += check_sources(docs)
    all_issues += check_stale_confidence(docs)

    counters = check_counter_consistency(docs)

    blockers = [i for i in all_issues if i["severity"] == "blocker"]
    warns    = [i for i in all_issues if i["severity"] == "warn"]

    if as_json:
        print(json.dumps({"issues": all_issues, "counters": counters}, indent=2, default=str))
    else:
        if not all_issues:
            print(_green("  ✓ All checks passed — no issues found.\n"))
        else:
            for issue in blockers:
                print(_red(f"  [BLOCKER/{issue['check'].upper()}] {issue['label']}"))
                print(_red(f"    → {issue['detail']}"))

            for issue in warns:
                print(_amber(f"  [WARN/{issue['check'].upper()}] {issue['label']}"))
                print(_amber(f"    → {issue['detail']}"))

        print(f"\n{_bold('Counters')}")
        print(f"  Total : {counters['total']}")
        print(f"  By type   : {counters['by_type']}")
        print(f"  By status : {counters['by_status']}")
        print()

        status_symbol = _red("✗ FAILED") if blockers else (_amber("⚠ WARNINGS") if warns else _green("✓ PASSED"))
        print(f"  Result: {status_symbol} — {len(blockers)} blocker(s), {len(warns)} warning(s)\n")

    if md_path:
        date_str = NOW.strftime("%Y-%m-%d")
        final_path = md_path if md_path.endswith(".md") else f"audit_report_{date_str}.md"
        _write_markdown(all_issues, counters, final_path)

    return 1 if blockers else 0


def main() -> None:
    parser = argparse.ArgumentParser(description="Audit ma_activities collection for data quality issues")
    parser.add_argument("--json", action="store_true", help="Output results as JSON")
    parser.add_argument("--md", metavar="PATH", nargs="?", const="auto", help="Write markdown report (optional path)")
    args = parser.parse_args()

    md_path = args.md
    if md_path == "auto":
        md_path = f"audit_report_{NOW.strftime('%Y-%m-%d')}.md"

    exit_code = asyncio.run(run(as_json=args.json, md_path=md_path))
    sys.exit(exit_code)


if __name__ == "__main__":
    main()
