"""
seed_company_profiles.py — Audit orphan company profiles referenced in M&A deals.

An "orphan" is a company that appears as acquirer or target in ma_activities
but has no corresponding defense_players document.

This script:
  1. Lists all orphan company names (dry-run by default)
  2. Attempts lightweight enrichment via yfinance (for public companies)
  3. Outputs a CSV of orphans for manual review before insert
  4. Optionally inserts stub profiles with --apply

Usage:
    python scripts/seed_company_profiles.py
    python scripts/seed_company_profiles.py --csv orphans.csv
    python scripts/seed_company_profiles.py --apply      # inserts stubs (manual enrichment required)

Environment: MONGO_URL, DB_NAME (or backend/.env)
"""

import argparse
import asyncio
import csv
import os
import re
import sys
import uuid
from pathlib import Path

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
DB_NAME   = os.environ.get("DB_NAME",   "defense_dashboard")

# Names that are PE firms, government bodies, or consortia — skip profiling
_SKIP_NAMES = frozenset({
    "blackstone", "bain capital", "thoma bravo", "carlyle", "kkr", "advent",
    "inflexion", "general catalyst", "founders fund", "general atlantic",
    "andreessen horowitz", "khosla ventures", "y combinator", "tiger global",
    "tikehau capital", "ae industrial partners", "ae industrial",
    "us government", "us army", "us navy", "us air force", "pentagon",
    "nato", "european commission", "ec", "fti consulting",
})

_PE_INDICATORS = {"capital", "ventures", "fund", "partners", "management", "holdings", "investment"}


def _is_pe_or_gov(name: str) -> bool:
    lower = name.lower()
    if lower in _SKIP_NAMES:
        return True
    words = set(lower.split())
    return bool(words & _PE_INDICATORS) and "defense" not in lower and "aerospace" not in lower


def _try_yfinance(ticker: str) -> dict:
    """Attempt to enrich a public company via yfinance. Returns {} on failure."""
    try:
        import yfinance as yf
        info = yf.Ticker(ticker).info
        return {
            "market_cap": round((info.get("marketCap") or 0) / 1e9, 2),
            "stock_price": round(info.get("currentPrice") or info.get("regularMarketPrice") or 0, 2),
            "revenue": round((info.get("totalRevenue") or 0) / 1e9, 2),
            "employees": info.get("fullTimeEmployees") or 0,
            "headquarters": (info.get("city") or "") + ", " + (info.get("country") or ""),
            "website": info.get("website", ""),
            "description": (info.get("longBusinessSummary") or "")[:400],
        }
    except Exception:
        return {}


async def run(apply: bool, csv_path: str | None) -> None:
    from motor.motor_asyncio import AsyncIOMotorClient

    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]

    # Collect all company names referenced in deals
    deals = await db.ma_activities.find({}, {"_id": 0, "acquirer": 1, "target": 1}).to_list(5000)
    deal_names: set[str] = set()
    for d in deals:
        for field in ("acquirer", "target"):
            raw = d.get(field, "")
            # Handle multi-party strings like "Airbus + BAE Systems + Leonardo"
            for part in re.split(r"\s*\+\s*|\s*/\s*|\s*&\s*", raw):
                part = part.strip()
                if part:
                    deal_names.add(part)

    # Fetch existing player names + aliases
    players = await db.defense_players.find(
        {}, {"_id": 0, "name": 1, "aliases": 1}
    ).to_list(2000)
    known: set[str] = set()
    for p in players:
        known.add(p["name"].lower())
        for alias in (p.get("aliases") or []):
            known.add(alias.lower())

    # Find orphans
    orphans: list[str] = []
    for name in sorted(deal_names):
        if name.lower() in known:
            continue
        if _is_pe_or_gov(name):
            continue
        orphans.append(name)

    print(f"\nM&A deals reference {len(deal_names)} distinct company names.")
    print(f"Known in defense_players : {len(known)}")
    print(f"Orphan profiles found    : {len(orphans)}\n")

    rows = []
    for name in orphans:
        print(f"  ○ {name}")
        rows.append({
            "name": name,
            "auto_enriched": "",
            "suggested_ticker": "",
            "country": "",
            "market_cap_bn": "",
            "revenue_bn": "",
            "employees": "",
            "specializations": "",
            "website": "",
            "description": "",
            "action": "NEEDS_REVIEW",
        })

    if apply and orphans:
        print(f"\nInserting {len(orphans)} stub profiles (requires manual enrichment)…")
        for name in orphans:
            stub = {
                "id": str(uuid.uuid4()),
                "name": name,
                "ticker": f"{name.upper().replace(' ','-')[:6]}-STUB",
                "country": "Unknown",
                "market_cap": 0.0,
                "stock_price": 0.0,
                "change_percent": 0.0,
                "revenue": 0.0,
                "employees": 0,
                "specializations": [],
                "description": None,
                "aliases": [],
            }
            await db.defense_players.update_one(
                {"name": name},
                {"$setOnInsert": stub},
                upsert=True,
            )
        print("  Done. Enrich these profiles manually before publishing.")

    if csv_path:
        with open(csv_path, "w", newline="", encoding="utf-8") as f:
            writer = csv.DictWriter(f, fieldnames=rows[0].keys() if rows else [])
            writer.writeheader()
            writer.writerows(rows)
        print(f"\n  CSV written → {csv_path}")

    client.close()


def main() -> None:
    parser = argparse.ArgumentParser(description="Audit orphan company profiles in M&A deals")
    parser.add_argument("--apply", action="store_true", help="Insert stub profiles into MongoDB")
    parser.add_argument("--csv",   metavar="PATH",      help="Write CSV report to PATH")
    args = parser.parse_args()
    asyncio.run(run(apply=args.apply, csv_path=args.csv))


if __name__ == "__main__":
    main()
