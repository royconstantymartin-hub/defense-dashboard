"""Source-backed additions reviewed 2026-09-30; unknown fundamentals stay null."""
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
}, {
    "name": "Helsing", "ticker": "HELS-PRIV", "country": "Germany",
    "market_cap": None, "stock_price": 0, "change_percent": 0, "revenue": None, "employees": None,
    "is_public": False, "founded_year": 2021, "headquarters": "Munich, Germany", "website": "helsing.ai",
    "aliases": ["Helsing SE"], "specializations": ["Defence AI", "Autonomous systems", "Electronic warfare", "Underwater surveillance"],
    "funding_stage": "Series E — $1.8bn (13 July 2026)",
    "description": "Helsing develops software and autonomous systems for European defence. It began with AI for battlefield data analysis and has expanded into autonomous drones, underwater surveillance and aircraft applications. Revenue and employee count are not entered here because the reviewed sources do not establish a current audited figure.",
    "source_reviewed_at": "2026-09-30",
    "sources": [
        {"url": "https://helsing.ai/newsroom/helsing-raises-1-8bn-in-series-e", "publisher": "Helsing", "published_at": "2026-07-13"},
        {"url": "https://www.reuters.com/business/aerospace-defense/europes-helsing-raises-18-billion-valuing-defence-group-18-billion-2026-07-13/", "publisher": "Reuters", "published_at": "2026-07-13"}
    ],
    "data_notes": "The $18bn figure is a post-money valuation disclosed with the Series E, not a market capitalisation."
}, {
    "name": "Quantum Systems", "ticker": "QSYS-PRIV", "country": "Germany",
    "market_cap": None, "stock_price": 0, "change_percent": 0, "revenue": None, "employees": None,
    "is_public": False, "founded_year": 2015, "headquarters": "Munich, Germany", "website": "quantum-systems.com",
    "aliases": ["Quantum-Systems GmbH"], "specializations": ["Autonomous systems", "Uncrewed aerial systems", "ISR", "Mission software"],
    "funding_stage": "Series D — $1.2bn (2 July 2026)",
    "description": "Quantum Systems develops uncrewed aerial systems and mission software for defence and security. Its current strategy is a multi-domain family of systems linked by MOSAIC UXS; the company also states a production footprint across Germany, Ukraine, the United States, Australia, Romania, the United Kingdom and the Baltics.",
    "source_reviewed_at": "2026-09-30",
    "sources": [{"url": "https://quantum-systems.com/us/news/quantum-systems-raises-1-2bn-series-d-to-accelerate-growth-and-scale-software-defined-autonomous-systems-across-air-land-and-sea/", "publisher": "Quantum Systems", "published_at": "2026-07-02"}],
    "data_notes": "The approximately $8bn value is post-money; no revenue or headcount is entered without a directly reviewed current disclosure."
}, {
    "name": "ARX Robotics", "ticker": "ARXR-PRIV", "country": "Germany",
    "market_cap": None, "stock_price": 0, "change_percent": 0, "revenue": None, "employees": 140,
    "is_public": False, "founded_year": 2022, "headquarters": "Munich, Germany", "website": "arx-robotics.com",
    "aliases": ["ARX", "ARX Landsysteme"], "specializations": ["Uncrewed ground vehicles", "Land autonomy", "Vehicle retrofit", "Robotics software"],
    "funding_stage": "Series A — €42m total (2025)",
    "description": "ARX Robotics develops uncrewed ground vehicles and Mithra OS, an autonomy software layer intended for legacy vehicles. The company reports deployments with six European armed forces and products spanning logistics, reconnaissance and casualty evacuation. Its stated winter 2025 headcount was 140.",
    "source_reviewed_at": "2026-09-30",
    "sources": [{"url": "https://www.arx-robotics.com/investors", "publisher": "ARX Robotics"}],
    "data_notes": "€31m Series A plus €11m extension are reported by the company; revenue and valuation are not disclosed in the reviewed source."
}, {
    "name": "TEKEVER", "ticker": "TEKEVER-PRIV", "country": "Portugal",
    "market_cap": None, "stock_price": 0, "change_percent": 0, "revenue": None, "employees": None,
    "is_public": False, "founded_year": 2001, "headquarters": "Lisbon, Portugal", "website": "tekever.com",
    "aliases": ["Tekever"], "specializations": ["Autonomous systems", "Uncrewed aerial systems", "ISR", "Mission software"],
    "funding_stage": "Series D — $580m first close (23 September 2026)",
    "description": "TEKEVER develops AI-powered autonomous systems, including the AR3 and AR5 uncrewed aircraft and the ATLAS software platform. It describes the $580m Series D as a first close and links the AR5 to the UK CORVUS surveillance capability.",
    "source_reviewed_at": "2026-09-30",
    "sources": [{"url": "https://www.tekever.com/news/tekever-raises-us580-million-reaching-us6-4-billion-valuation-in-series-d-round-led-by-uc-investments-and-baillie-gifford/", "publisher": "TEKEVER", "published_at": "2026-09-23"}],
    "data_notes": "The stated $6.4bn figure is the Series D valuation, not a market capitalisation; revenue and workforce are not entered."
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
    },
    {
        "acquirer": "Dragoneer Investment Group", "target": "Helsing",
        "deal_value": 1800, "currency": "USD", "value_basis": "round_amount", "status": "completed",
        "deal_type": "funding_round", "deal_class": "vc", "round_type": "series_e", "is_disclosed": True,
        "valuation": 18000, "description": "Helsing announced a $1.8bn Series E financing at a stated $18bn valuation.",
        "announced_date": datetime(2026, 7, 13, tzinfo=timezone.utc), "acquirer_country": "US", "target_country": "DE",
        "lead_investors": ["Dragoneer Investment Group"], "source_url": "https://helsing.ai/newsroom/helsing-raises-1-8bn-in-series-e",
        "sources": [{"url": "https://helsing.ai/newsroom/helsing-raises-1-8bn-in-series-e", "publisher": "Helsing", "published_at": "2026-07-13"}],
        "confidence": "medium", "verification_status": "primary_source_reviewed", "extraction_method": "manual", "last_verified_at": REVIEWED,
        "notes": "Round value and post-money valuation are company-stated; investor participation is broader than the lead shown.", "sector": "c2_electronics"
    },
    {
        "acquirer": "Blackstone + Noteus + Airbus + Advent", "target": "Quantum Systems",
        "deal_value": 1200, "currency": "USD", "value_basis": "round_amount", "status": "completed",
        "deal_type": "funding_round", "deal_class": "vc", "round_type": "series_d", "is_disclosed": True,
        "valuation": 8000, "description": "Quantum Systems announced a $1.2bn Series D financing at an approximately $8bn post-money valuation.",
        "announced_date": datetime(2026, 7, 2, tzinfo=timezone.utc), "acquirer_country": "US", "target_country": "DE",
        "lead_investors": ["Blackstone", "Noteus", "Airbus", "Advent"], "source_url": "https://quantum-systems.com/us/news/quantum-systems-raises-1-2bn-series-d-to-accelerate-growth-and-scale-software-defined-autonomous-systems-across-air-land-and-sea/",
        "sources": [{"url": "https://quantum-systems.com/us/news/quantum-systems-raises-1-2bn-series-d-to-accelerate-growth-and-scale-software-defined-autonomous-systems-across-air-land-and-sea/", "publisher": "Quantum Systems", "published_at": "2026-07-02"}],
        "confidence": "medium", "verification_status": "primary_source_reviewed", "extraction_method": "manual", "last_verified_at": REVIEWED,
        "notes": "The valuation is described as approximately $8bn post-money by the company.", "sector": "uas_drones"
    },
    {
        "acquirer": "UC Investments + Baillie Gifford", "target": "TEKEVER",
        "deal_value": 580, "currency": "USD", "value_basis": "round_amount", "status": "announced",
        "deal_type": "funding_round", "deal_class": "vc", "round_type": "series_d", "is_disclosed": True,
        "valuation": 6400, "description": "TEKEVER announced the first close of a $580m Series D at a stated $6.4bn valuation.",
        "announced_date": datetime(2026, 9, 23, tzinfo=timezone.utc), "acquirer_country": "US", "target_country": "PT",
        "lead_investors": ["UC Investments", "Baillie Gifford"], "source_url": "https://www.tekever.com/news/tekever-raises-us580-million-reaching-us6-4-billion-valuation-in-series-d-round-led-by-uc-investments-and-baillie-gifford/",
        "sources": [{"url": "https://www.tekever.com/news/tekever-raises-us580-million-reaching-us6-4-billion-valuation-in-series-d-round-led-by-uc-investments-and-baillie-gifford/", "publisher": "TEKEVER", "published_at": "2026-09-23"}],
        "confidence": "medium", "verification_status": "primary_source_reviewed", "extraction_method": "manual", "last_verified_at": REVIEWED,
        "notes": "First close only; the company expected additional closings. $6.4bn is a stated valuation.", "sector": "uas_drones"
    }
]
