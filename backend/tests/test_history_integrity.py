import unittest
from datetime import datetime, timezone
from services.deal_identity import deal_identity
from services.ma_scraper import deduplicate_ma_signals, score_confidence
from data.researched_additions import COMPANIES, DEALS
from data.seed_data import (
    MA_DATA, MA_EXTRA_DEALS, MA_EUROPE_DEALS, MA_PILOT_10,
    MA_EUROSATORY_2026, MA_ILA_BERLIN_2026, MA_DEFENSETECH_2026,
)

class HistoryIntegrityTests(unittest.TestCase):
    def test_separate_rounds_survive(self):
        first = dict(acquirer="Fund", target="Company", acquirer_norm="fund",
                     target_norm="company", deal_type="funding_round",
                     announced_date=datetime(2024, 1, 2, tzinfo=timezone.utc))
        second = {**first, "announced_date": datetime(2025, 1, 2, tzinfo=timezone.utc)}
        self.assertNotEqual(deal_identity(first), deal_identity(second))
        self.assertEqual(len(deduplicate_ma_signals([first, first, second])), 2)

    def test_missing_date_cannot_be_an_identity(self):
        with self.assertRaises(ValueError):
            deal_identity(dict(acquirer="A", target="B", deal_type="merger"))

    def test_same_parties_need_their_own_source_or_date(self):
        first = dict(acquirer="Fund", target="Company", acquirer_norm="fund",
                     target_norm="company", deal_type="funding_round",
                     announced_date=datetime(2025, 2, 1, tzinfo=timezone.utc), source_url="https://one.example")
        second = {**first, "source_url": "https://two.example"}
        self.assertEqual(len(deduplicate_ma_signals([first, first, second])), 2)

    def test_manual_entry_is_not_verification(self):
        score, label = score_confidence(acq_known=False, tgt_known=False,
                                      value_basis="undisclosed", extraction_method="manual")
        self.assertEqual(label, "low")

    def test_isembard_is_manufacturing_with_unknown_fundamentals(self):
        company = COMPANIES[0]
        self.assertIn("Precision manufacturing", company["specializations"])
        for field in ("revenue", "employees", "market_cap"):
            self.assertIsNone(company[field])
        deal = next(d for d in DEALS if d["target"] == "Isembard")
        self.assertEqual(deal["round_type"], "series_a")
        self.assertEqual(deal["acquirer"], "Union Square Ventures")
        self.assertEqual(deal["deal_value"], 50)
        self.assertIsNone(deal["valuation"])

    def test_reviewed_private_profiles_do_not_present_valuations_as_market_caps(self):
        by_name = {company["name"]: company for company in COMPANIES}
        for name in ("Helsing", "Quantum Systems", "ARX Robotics", "TEKEVER"):
            self.assertIsNone(by_name[name]["market_cap"], name)
            self.assertTrue(by_name[name]["sources"], name)

    def test_every_researched_deal_has_a_real_date(self):
        for deal in DEALS:
            self.assertIsInstance(deal["announced_date"], datetime)
            self.assertTrue(deal.get("source_url"))

    def test_seeded_corporate_transactions_are_unique(self):
        """One acquisition/JV/IPO must not be split into an announcement row and a closing row."""
        repeatable_types = {"funding_round", "minority_stake", "strategic_investment"}
        seen = {}
        curated_lists = (
            MA_DATA, MA_EXTRA_DEALS, MA_EUROPE_DEALS, MA_PILOT_10,
            MA_EUROSATORY_2026, MA_ILA_BERLIN_2026, MA_DEFENSETECH_2026,
        )
        for deal in (d for deals in curated_lists for d in deals):
            if deal["deal_type"] in repeatable_types:
                continue
            key = (
                " ".join(deal["acquirer"].lower().split()),
                " ".join(deal["target"].lower().split()),
                deal["deal_type"],
            )
            self.assertNotIn(
                key,
                seen,
                f"Duplicate corporate transaction: {deal['acquirer']} → {deal['target']} "
                f"({seen.get(key)} and {deal['announced_date'].date()})",
            )
            seen[key] = deal["announced_date"].date()

if __name__ == "__main__":
    unittest.main()
