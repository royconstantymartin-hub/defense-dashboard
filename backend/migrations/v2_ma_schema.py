"""
V2 migration — backfill data-quality & lifecycle fields on ma_activities (C0).

Idempotent and rejouable: only sets fields that are missing, never overwrites
curated content. Run once after deploying the V2 models.

    python -m migrations.v2_ma_schema          # apply
    python -m migrations.v2_ma_schema --dry     # report only, no writes

What it does for every existing deal:
  - deal_class        ← classify_deal_class(deal_type, round_type)        (C4)
  - value_basis       ← inferred from deal_type / disclosure              (C1)
  - sources           ← [{url: source_url}] wrapper around the lone URL   (C0)
  - status_history    ← [{status, date: announced_date}]                  (C2)
  - extraction_method ← "manual" for seeded deals, "regex" for scraped
  - verification_status, confidence_score for curated entries
"""
import os
import sys
import asyncio
from datetime import datetime, timezone

from motor.motor_asyncio import AsyncIOMotorClient

# Reuse the single source of truth for classification (no logic duplication).
from services.ma_scraper import classify_deal_class

MONGO_URL = os.environ.get("MONGO_URL", "mongodb://localhost:27017")
DB_NAME = os.environ.get("DB_NAME", "defense_dashboard")


def _infer_value_basis(doc: dict) -> str:
    """Best-effort basis for legacy rows. Conservative: never invents a number."""
    if not (doc.get("deal_value") or 0) > 0:
        return "undisclosed"
    if doc.get("round_type") or doc.get("deal_type") in (
        "funding_round", "strategic_investment", "minority_stake"
    ):
        return "round_amount"
    # Seed convention documented in seed_data.py: deal_value = equity consideration.
    return "equity"


def _build_patch(doc: dict) -> dict:
    patch: dict = {}

    if not doc.get("deal_class"):
        patch["deal_class"] = classify_deal_class(
            doc.get("deal_type", "acquisition"), doc.get("round_type")
        )

    if not doc.get("value_basis"):
        patch["value_basis"] = _infer_value_basis(doc)

    if not doc.get("currency"):
        patch["currency"] = "USD"

    # Wrap the single legacy URL into the new sources[] shape.
    if not doc.get("sources") and doc.get("source_url"):
        patch["sources"] = [{"url": doc["source_url"], "publisher": None, "published_at": None}]

    # Seed the lifecycle journal from the announced state.
    if not doc.get("status_history"):
        when = doc.get("announced_date")
        patch["status_history"] = [{
            "status": doc.get("status", "announced"),
            "date": when if isinstance(when, str) else (when.isoformat() if when else None),
            "source_url": doc.get("source_url"),
        }]

    # Provenance: a row with scraped_at came from the scraper, otherwise it's curated seed.
    if not doc.get("extraction_method"):
        scraped = bool(doc.get("scraped_at"))
        patch["extraction_method"] = "regex" if scraped else "manual"
        patch["verification_status"] = "auto" if scraped else "human_verified"
        if not scraped:
            # Curated deals are trustworthy by construction.
            if doc.get("confidence_score") is None:
                patch["confidence_score"] = 0.95
            if not doc.get("confidence"):
                patch["confidence"] = "high"
        else:
            # Legacy regex-scraped rows were never confidence-scored. Mark them
            # low so the Option-A display gate hides them until the V2 pipeline
            # re-scrapes them with a real score. Honest default: don't trust
            # an old regex extraction.
            if doc.get("confidence_score") is None:
                patch["confidence_score"] = 0.3
            if not doc.get("confidence"):
                patch["confidence"] = "low"

    return patch


async def migrate(dry: bool = False) -> dict:
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]
    docs = await db.ma_activities.find({}, {"_id": 0}).to_list(10000)

    scanned = len(docs)
    patched = 0
    for doc in docs:
        patch = _build_patch(doc)
        if not patch:
            continue
        patched += 1
        if not dry:
            await db.ma_activities.update_one({"id": doc["id"]}, {"$set": patch})

    result = {"scanned": scanned, "patched": patched, "dry_run": dry,
              "ran_at": datetime.now(timezone.utc).isoformat()}
    print(f"[v2_ma_schema] {result}")
    client.close()
    return result


if __name__ == "__main__":
    asyncio.run(migrate(dry="--dry" in sys.argv))
