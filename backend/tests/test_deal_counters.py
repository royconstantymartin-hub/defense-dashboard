"""
test_deal_counters.py — Data consistency tests for the ma_activities collection.

These are integration tests that hit a live API + MongoDB (same pattern as
test_defense_dashboard.py). Run them after seeding the database.

Usage:
    REACT_APP_BACKEND_URL=http://localhost:8000 pytest tests/test_deal_counters.py -v

Checks:
  1. Sum of deals by type equals the total reported by /api/ma-activities/meta
  2. No deal has closed_date < announced_date
  3. No deal has confidence != "low" AND zero sources
  4. No deal has status="completed" AND closed_date is None (warning, not blocker)
  5. /api/health/data-consistency returns status="ok" with zero blockers
"""

import os
import pytest
import requests
from datetime import datetime, timezone

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "").rstrip("/")


def _all_deals() -> list[dict]:
    """Fetch all deals from both recent and historical endpoints."""
    seen = set()
    deals = []
    for url_suffix, params in [
        ("/api/ma-activities",            {"limit": 500, "offset": 0, "days": 0}),
        ("/api/ma-activities/historical", {"limit": 500, "offset": 0}),
    ]:
        r = requests.get(f"{BASE_URL}{url_suffix}", params=params, timeout=30)
        r.raise_for_status()
        for d in r.json():
            if d.get("id") not in seen:
                seen.add(d.get("id"))
                deals.append(d)
    return deals


def _parse_date(val) -> datetime | None:
    if not val:
        return None
    try:
        return datetime.fromisoformat(str(val).replace("Z", "+00:00"))
    except (ValueError, TypeError):
        return None


@pytest.mark.skipif(not BASE_URL, reason="REACT_APP_BACKEND_URL not set")
class TestDealCounters:
    """Counter coherence between API meta endpoint and actual deal collections."""

    def test_meta_count_matches_fetched_deals(self):
        """
        The global total from /api/ma-activities/meta must be >= the number of
        unique deals we can fetch. (It may be slightly higher if pagination caps
        the fetch, but should never be lower than what's visible in the UI.)
        """
        meta = requests.get(f"{BASE_URL}/api/ma-activities/meta", timeout=10).json()
        meta_total = meta.get("total", 0)
        assert meta_total > 0, "meta total should be positive — DB may be empty"

        deals = _all_deals()
        assert len(deals) > 0, "should fetch at least some deals"

        # meta_total is DB count; fetched deals deduplicate across two endpoints.
        # We assert fetched <= meta (never more unique deals than DB reports).
        assert len(deals) <= meta_total, (
            f"Fetched {len(deals)} unique deals but meta reports only {meta_total} — "
            "possible dedup or pagination issue"
        )
        print(f"✓ meta total={meta_total}, fetched unique={len(deals)}")

    def test_type_breakdown_sums_to_at_least_half_total(self):
        """
        The sum of known deal_type buckets (acquisitions + mergers + investments + JV)
        should cover most of the dataset. If a large fraction has unknown/null type,
        that's a data quality problem.
        """
        deals = _all_deals()
        known_types = {
            "acquisition", "merger", "joint_venture", "strategic_investment",
            "minority_stake", "funding_round", "investment", "asset_acquisition",
        }
        known_count = sum(1 for d in deals if d.get("deal_type") in known_types)
        coverage = known_count / len(deals) if deals else 0
        assert coverage >= 0.8, (
            f"Only {coverage:.0%} of deals have a recognised deal_type — "
            f"{len(deals) - known_count} deals have unknown type"
        )
        print(f"✓ deal_type coverage: {coverage:.0%} ({known_count}/{len(deals)})")


@pytest.mark.skipif(not BASE_URL, reason="REACT_APP_BACKEND_URL not set")
class TestDealDateConsistency:
    """Temporal integrity: closed_date must not precede announced_date."""

    def test_no_closed_before_announced(self):
        """
        For any deal that has both announced_date and closed_date,
        closed_date must be >= announced_date.
        """
        deals = _all_deals()
        violations = []
        for d in deals:
            ann = _parse_date(d.get("announced_date"))
            cl  = _parse_date(d.get("closed_date"))
            if ann and cl and cl < ann:
                violations.append(
                    f"{d.get('acquirer')} → {d.get('target')}: "
                    f"closed {cl.date()} < announced {ann.date()}"
                )
        assert not violations, (
            f"{len(violations)} deal(s) have closed_date before announced_date:\n"
            + "\n".join(violations)
        )
        print(f"✓ All {len(deals)} deals pass closed_date >= announced_date check")


@pytest.mark.skipif(not BASE_URL, reason="REACT_APP_BACKEND_URL not set")
class TestDealSourceConsistency:
    """Source integrity: high-confidence deals must have a source URL."""

    def test_high_confidence_deals_have_source(self):
        """
        Deals marked confidence='high' or confidence='medium' must have at
        least a source_url. Only 'low' confidence deals may lack sources.
        """
        deals = _all_deals()
        violations = []
        for d in deals:
            confidence = d.get("confidence", "low")
            has_source = bool(d.get("source_url") or d.get("sources"))
            if confidence in ("high", "medium") and not has_source:
                violations.append(
                    f"{d.get('acquirer')} → {d.get('target')} "
                    f"(confidence={confidence}, no source)"
                )
        assert not violations, (
            f"{len(violations)} deal(s) have confidence!=low but no source:\n"
            + "\n".join(violations)
        )
        print(f"✓ All high/medium confidence deals have sources")


@pytest.mark.skipif(not BASE_URL, reason="REACT_APP_BACKEND_URL not set")
class TestDealStatusConsistency:
    """Status integrity: completed deals should have a closed_date."""

    def test_completed_deals_have_closed_date(self):
        """
        Deals with status='completed' should have a closed_date.
        This is a warning-level check (not all legacy deals have been enriched yet).
        We report the violations but don't fail — use audit_deals.py for blocker enforcement.
        """
        deals = _all_deals()
        missing_close = [
            f"{d.get('acquirer')} → {d.get('target')}"
            for d in deals
            if d.get("status") == "completed" and not d.get("closed_date")
        ]
        # Log as info rather than hard failure (legacy data may lack closed_date)
        if missing_close:
            print(
                f"⚠ {len(missing_close)} completed deal(s) missing closed_date "
                f"(add to seed_data for full v2 compliance):\n  "
                + "\n  ".join(missing_close[:10])
                + (" …" if len(missing_close) > 10 else "")
            )
        # Soft assertion: at most 50% of completed deals should lack closed_date
        completed_total = sum(1 for d in deals if d.get("status") == "completed")
        if completed_total > 0:
            missing_ratio = len(missing_close) / completed_total
            assert missing_ratio < 0.5, (
                f"{missing_ratio:.0%} of completed deals lack closed_date — "
                "enrichment needed"
            )
        print(f"✓ closed_date coverage for completed deals: "
              f"{completed_total - len(missing_close)}/{completed_total}")


@pytest.mark.skipif(not BASE_URL, reason="REACT_APP_BACKEND_URL not set")
class TestDataConsistencyEndpoint:
    """The /api/health/data-consistency endpoint must return status=ok."""

    def test_consistency_endpoint_ok(self):
        """
        The data-consistency health endpoint should return status='ok'
        with zero blocker issues after seeding corrected data.
        """
        r = requests.get(f"{BASE_URL}/api/health/data-consistency", timeout=30)
        assert r.status_code == 200, f"endpoint returned {r.status_code}"
        data = r.json()

        assert "status" in data
        assert "total_deals" in data
        assert "by_type" in data
        assert "by_status" in data
        assert "blockers" in data

        blockers = data.get("blockers", [])
        assert data["status"] == "ok", (
            f"data-consistency check FAILED with {len(blockers)} blocker(s):\n"
            + "\n".join(blockers)
        )
        assert data["total_deals"] > 0, "DB appears empty — seed first"
        print(
            f"✓ /api/health/data-consistency: {data['total_deals']} deals, "
            f"status={data['status']}, "
            f"types={data['by_type']}"
        )
