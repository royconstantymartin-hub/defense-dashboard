"""Source-backed additions reviewed 2026-09-29; unknown fundamentals stay null."""
from datetime import datetime, timezone

REVIEWED = datetime(2026, 9, 29, tzinfo=timezone.utc)
ROUND_SOURCE = "https://isembard.com/uk/newsroom/series-a/"
COMPANIES = [{
    "name": "Isembard", "ticker": "ISEMBARD-PRIV", "country": "UK",
    "market_cap": None, "stock_price": 0, "change_percent": 0,
    "revenue": None, "employees": None, "is_public": False,
    "headquarters": "Southwark, London, United Kingdom", "website": "isembard.com",
    "aliases": ["Isambard", "Isembard Ltd"],
    "specializations": ["Precision manufacturing", "Industrial software", "Aerospace components", "Defence supply chain"],
    "funding_stage": "Series A — $50M (9 March 2026)",
    "description": "Isembard manufactures precision components for aerospace, defence, energy and robotics. Its owned and franchised factories use MasonOS to coordinate quoting, scheduling, production and quality. The company announced a $50M Series A led by Union Square Ventures on 9 March 2026. Revenue, valuation and total workforce are not established by the sources reviewed.",
    "source_reviewed_at": "2026-09-29",
    "sources": [
        {"url": ROUND_SOURCE, "publisher": "Isembard", "published_at": "2026-03-09"},
        {"url": "https://isembard.com/us/newsroom/southwark-launch/", "publisher": "Isembard", "published_at": "2026-09-14"},
        {"url": "https://find-and-update.company-information.service.gov.uk/company/15989684", "publisher": "Companies House"}
    ],
    "data_notes": "Company publications describe a 2025 founding; the legal entity was incorporated on 1 October 2024. Founding year is left unset pending reconciliation. Company statements are not independently audited."
}]

DEALS = [
    {
        "acquirer": "Union Square Ventures", "target": "Isembard",
        "deal_value": 50, "currency": "USD", "value_basis": "round_amount",
        "status": "completed", "deal_type": "funding_round", "deal_class": "vc",
        "round_type": "series_a", "is_disclosed": True, "valuation": None,
        "description": "Isembard announced a $50M Series A to expand precision manufacturing capacity.",
        "announced_date": datetime(2026, 3, 9, tzinfo=timezone.utc),
        "acquirer_country": "US", "target_country": "GB",
        "lead_investors": ["Union Square Ventures"],
        "investors": ["Tamarack Global", "IQ Capital", "Notion Capital", "CIV"],
        "source_url": ROUND_SOURCE,
        "sources": [{"url": ROUND_SOURCE, "publisher": "Isembard", "published_at": "2026-03-09"}],
        "confidence": "medium", "verification_status": "primary_source_reviewed",
        "extraction_method": "manual", "last_verified_at": REVIEWED,
        "notes": "Corrects the unsupported legacy Series B / underwater vehicle entry. Valuation and closing date are not stated in the reviewed release.",
        "sector": "other"
    },
    {
        "acquirer": "Lockheed", "target": "Martin Marietta",
        "deal_value": 0, "is_disclosed": False, "value_basis": "undisclosed",
        "status": "completed", "deal_type": "merger", "deal_class": "ma",
        "description": "Combination of Lockheed and Martin Marietta to form Lockheed Martin.",
        "announced_date": datetime(1994, 8, 29, tzinfo=timezone.utc),
        "closed_date": datetime(1995, 3, 15, tzinfo=timezone.utc),
        "acquirer_country": "US", "target_country": "US",
        "source_url": "https://investors.lockheedmartin.com/static-files/7b6ddafc-6645-4880-9117-0da5ea05b29f",
        "confidence": "medium", "verification_status": "primary_source_reviewed",
        "extraction_method": "manual", "last_verified_at": REVIEWED,
        "notes": "29 August 1994 is the agreement date in the filing. No comparable transaction value is entered.",
        "sector": "aircraft"
    },
    {
        "acquirer": "British Aerospace", "target": "Marconi Electronic Systems",
        "deal_value": 0, "is_disclosed": False, "value_basis": "undisclosed",
        "status": "completed", "deal_type": "merger", "deal_class": "ma",
        "description": "Combination of British Aerospace and GEC's Marconi Electronic Systems business to form BAE Systems.",
        "announced_date": datetime(1999, 4, 27, tzinfo=timezone.utc),
        "closed_date": datetime(1999, 11, 30, tzinfo=timezone.utc),
        "acquirer_country": "GB", "target_country": "GB",
        "source_url": "https://www.baesystems.com/en/our-company/undertakings",
        "sources": [
            {"url": "https://www.baesystems.com/en/our-company/undertakings", "publisher": "BAE Systems"},
            {"url": "https://heritage.baesystems.com/page/vickers-shipbuilding", "publisher": "BAE Systems Heritage"}
        ],
        "confidence": "medium", "verification_status": "primary_source_reviewed",
        "extraction_method": "manual", "last_verified_at": REVIEWED,
        "notes": "27 April 1999 is the agreement date identified by BAE, not a claim about the earliest press announcement. No transaction value established here.",
        "sector": "c2_electronics"
    }
]
