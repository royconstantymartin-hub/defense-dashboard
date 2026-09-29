import unittest
from datetime import datetime, timezone
from services.deal_identity import deal_identity
from services.ma_scraper import deduplicate_ma_signals, score_confidence
from data.researched_additions import COMPANIES, DEALS

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

if __name__ == "__main__":
    unittest.main()
