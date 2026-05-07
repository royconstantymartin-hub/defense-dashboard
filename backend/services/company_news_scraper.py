"""
Defense Intelligence Hub — Company-specific news scraper

For each company in the defense_players collection, queries Google News RSS
for the 5 most recent articles.  Results are tagged with:
  - companyTag       : canonical company name from the DB
  - isCompanySpecific: True

Google News RSS titles have the form "Article headline - Outlet Name".
We parse that suffix to expose the real outlet as `realSource` and derive
a Clearbit Logo URL stored in `sourceLogo`.
"""
import logging
import re
import time
from datetime import datetime, timezone
from typing import Dict, List, Optional, Tuple
from urllib.parse import quote_plus

import feedparser
import requests

from services.news_scraper import (
    _extract_image_from_entry,
    _extract_summary,
    _parse_entry_date,
    assign_category,
    compute_relevance_score,
    detect_companies,
    detect_region_from_text,
)

logger = logging.getLogger(__name__)

REQUEST_TIMEOUT = 10
ARTICLES_PER_COMPANY = 5
# Polite delay between Google News requests — avoids rate-limiting
INTER_REQUEST_DELAY = 1.2  # seconds

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/120.0.0.0 Safari/537.36"
    ),
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
}

# Flat bonus added to the computed relevanceScore for company-specific articles.
_COMPANY_SPECIFIC_SCORE_BONUS = 10

# Fallback logo when we can't derive a domain for the real outlet.
_GOOGLE_NEWS_LOGO = "https://logo.clearbit.com/news.google.com"

# ── Outlet → domain map ──────────────────────────────────────────────────────
# Keys are lowercase outlet names exactly as they appear after the " - " suffix.
# Values are the bare domain (no protocol) used with Clearbit Logo API.
_OUTLET_DOMAIN_MAP: Dict[str, str] = {
    # Generic aggregators
    "msn":                        "msn.com",
    "yahoo news":                 "yahoo.com",
    "yahoo finance":              "finance.yahoo.com",
    "yahoo":                      "yahoo.com",
    # Wire services
    "reuters":                    "reuters.com",
    "associated press":           "apnews.com",
    "ap news":                    "apnews.com",
    "ap":                         "apnews.com",
    "bloomberg":                  "bloomberg.com",
    "afp":                        "afp.com",
    # Major US newspapers
    "the new york times":         "nytimes.com",
    "new york times":             "nytimes.com",
    "nyt":                        "nytimes.com",
    "the washington post":        "washingtonpost.com",
    "washington post":            "washingtonpost.com",
    "wall street journal":        "wsj.com",
    "the wall street journal":    "wsj.com",
    "wsj":                        "wsj.com",
    "financial times":            "ft.com",
    "ft":                         "ft.com",
    "usa today":                  "usatoday.com",
    "politico":                   "politico.com",
    "axios":                      "axios.com",
    "the hill":                   "thehill.com",
    "the intercept":              "theintercept.com",
    # US broadcast
    "cnn":                        "cnn.com",
    "fox news":                   "foxnews.com",
    "nbc news":                   "nbcnews.com",
    "abc news":                   "abcnews.go.com",
    "cbs news":                   "cbsnews.com",
    "npr":                        "npr.org",
    # UK press
    "bbc":                        "bbc.com",
    "bbc news":                   "bbc.com",
    "the guardian":               "theguardian.com",
    "the telegraph":              "telegraph.co.uk",
    "the times":                  "thetimes.co.uk",
    "the independent":            "independent.co.uk",
    "sky news":                   "news.sky.com",
    # Israeli press
    "the jerusalem post":         "jpost.com",
    "jerusalem post":             "jpost.com",
    "jpost":                      "jpost.com",
    "haaretz":                    "haaretz.com",
    "ynet news":                  "ynetnews.com",
    "times of israel":            "timesofisrael.com",
    "the times of israel":        "timesofisrael.com",
    # Middle East / international
    "al jazeera":                 "aljazeera.com",
    "arab news":                  "arabnews.com",
    "middle east eye":            "middleeasteye.net",
    "the national":               "thenationalnews.com",
    # Indian press
    "the times of india":         "timesofindia.indiatimes.com",
    "times of india":             "timesofindia.indiatimes.com",
    "hindustan times":            "hindustantimes.com",
    "the hindu":                  "thehindu.com",
    "ndtv":                       "ndtv.com",
    "india today":                "indiatoday.in",
    # Australian press
    "the australian":             "theaustralian.com.au",
    "abc australia":              "abc.net.au",
    # Specialty defense
    "breaking defense":           "breakingdefense.com",
    "defense news":               "defensenews.com",
    "defense one":                "defenseone.com",
    "defense post":               "thedefensepost.com",
    "the defense post":           "thedefensepost.com",
    "the war zone":               "thedrive.com",
    "war zone":                   "thedrive.com",
    "usni news":                  "news.usni.org",
    "c4isrnet":                   "c4isrnet.com",
    "national defense":           "nationaldefensemagazine.org",
    "national defense magazine":  "nationaldefensemagazine.org",
    "aviation week":              "aviationweek.com",
    "flightglobal":               "flightglobal.com",
    "flight global":              "flightglobal.com",
    "naval news":                 "navalnews.com",
    "the aviationist":            "theaviationist.com",
    "spacenews":                  "spacenews.com",
    "space news":                 "spacenews.com",
    "shephard media":             "shephardmedia.com",
    "army times":                 "armytimes.com",
    "navy times":                 "navytimes.com",
    "air force times":            "airforcetimes.com",
    "marine corps times":         "marinecorpstimes.com",
    "military times":             "militarytimes.com",
    "stars and stripes":          "stripes.com",
    "task & purpose":             "taskandpurpose.com",
    "task and purpose":           "taskandpurpose.com",
    "warrior maven":              "warriormaven.com",
    "dod news":                   "defense.gov",
    "federal news network":       "federalnewsnetwork.com",
    "real clear defense":         "realcleardefense.com",
    "war on the rocks":           "warontherocks.com",
    "defense industry daily":     "defenseindustrydaily.com",
    "defense aerospace":          "defense-aerospace.com",
    # French press
    "le monde":                   "lemonde.fr",
    "le figaro":                  "lefigaro.fr",
    "le point":                   "lepoint.fr",
    "les echos":                  "lesechos.fr",
    "l'express":                  "lexpress.fr",
    "bfm business":               "bfmbusiness.bfmtv.com",
    "opex360":                    "opex360.com",
    "meta-défense":               "meta-defense.fr",
    "air & cosmos":               "air-cosmos.com",
    "forces operations":          "forcesoperations.com",
    "mer et marine":              "meretmarine.com",
    # Tech / business
    "business insider":           "businessinsider.com",
    "forbes":                     "forbes.com",
    "the economist":              "economist.com",
    "wired":                      "wired.com",
    "techcrunch":                 "techcrunch.com",
}


def _parse_google_title(raw_title: str) -> Tuple[str, str]:
    """Split a Google News RSS title into (clean_headline, outlet_name).

    Google News appends the outlet after the last separator:
        "Textron awarded $150M contract - MSN"
        "Elbit wins deal | Jerusalem Post"
        "Lockheed wins contract — Reuters"

    Returns ("Textron awarded $150M contract", "MSN"), etc.
    If no separator is found, returns (raw_title, "").
    """
    for sep in (" - ", " | ", " — "):   # hyphen, pipe, em-dash
        idx = raw_title.rfind(sep)
        if idx > 0:
            outlet = raw_title[idx + len(sep):].strip()
            clean  = raw_title[:idx].strip()
            # Sanity check: outlet should be reasonably short (≤ 60 chars)
            # and the headline non-empty.
            if clean and outlet and len(outlet) <= 60:
                return clean, outlet
    return raw_title, ""


def _source_to_clearbit_domain(outlet_name: str) -> str:
    """Map an outlet name to its domain for use with the Clearbit Logo API.

    Lookup order:
    1. Exact match in _OUTLET_DOMAIN_MAP (case-insensitive).
    2. Generic heuristic: strip leading article words, remove non-alphanumeric,
       lowercase, append ".com".

    Returns "" if the result looks too short to be a real domain.
    """
    key = outlet_name.strip().lower()

    if key in _OUTLET_DOMAIN_MAP:
        return _OUTLET_DOMAIN_MAP[key]

    # Generic heuristic: "The Jerusalem Post" is in the map; for unknowns try
    # to build a reasonable .com domain from the name.
    stripped = re.sub(r"^(the|le|la|les|l')\s+", "", key, flags=re.IGNORECASE)
    # Keep only alphanumeric — "Air & Cosmos" → "aircosmos"
    alphanum = re.sub(r"[^a-z0-9]", "", stripped)
    if len(alphanum) >= 3:
        return f"{alphanum}.com"

    return ""


# ── Per-company fetcher ──────────────────────────────────────────────────────

# Companies that are primarily software/tech — drop the "defense" suffix so
# their earnings and financial results news also gets captured.
_TECH_FIRST_COMPANIES = {
    "Palantir Technologies", "Anduril Industries", "Axon Enterprise",
    "Rocket Lab", "AeroVironment", "Kratos Defense", "Mercury Systems",
    "Booz Allen Hamilton", "SAIC", "Leidos Holdings",
}


def _google_news_rss_url(company_name: str) -> str:
    """Build a Google News RSS search URL for a company name."""
    suffix = "" if company_name in _TECH_FIRST_COMPANIES else " defense"
    query = quote_plus(f"{company_name}{suffix}")
    return f"https://news.google.com/rss/search?q={query}&hl=en-US&gl=US&ceid=US:en"


def _fetch_one_company(company_name: str) -> List[Dict]:
    """
    Fetch up to ARTICLES_PER_COMPANY articles from Google News RSS for one company.
    Never raises — failures are logged and return an empty list.

    Each returned article dict includes:
      - title      : cleaned headline (outlet suffix removed)
      - source     : real outlet name (e.g. "MSN") or fallback "Google News (Company)"
      - realSource : the extracted outlet string, or "" if not found
      - sourceLogo : Clearbit Logo URL for the real outlet, or Google News logo
    """
    articles: List[Dict] = []
    url = _google_news_rss_url(company_name)
    try:
        resp = requests.get(url, headers=HEADERS, timeout=REQUEST_TIMEOUT)
        resp.raise_for_status()
        feed = feedparser.parse(resp.content)

        for entry in feed.entries[:ARTICLES_PER_COMPANY]:
            raw_title   = getattr(entry, "title", "").strip()
            article_url = getattr(entry, "link", "").strip()
            if not raw_title or not article_url:
                continue

            # ── Problem 1: extract real outlet from title suffix ──────────
            clean_title, real_source = _parse_google_title(raw_title)
            domain = _source_to_clearbit_domain(real_source) if real_source else ""
            source_logo = (
                f"https://logo.clearbit.com/{domain}"
                if domain
                else _GOOGLE_NEWS_LOGO
            )

            summary   = _extract_summary(entry)
            raw_score = compute_relevance_score(clean_title, summary)
            region    = detect_region_from_text(clean_title, summary) or "global"

            companies = detect_companies(clean_title, summary)
            if company_name not in companies:
                companies.append(company_name)

            articles.append({
                "title":             clean_title,
                "url":               article_url,
                # image will be None for Google News RSS — enriched asynchronously
                # in server.py after the article is inserted (Problem 2).
                "image":             _extract_image_from_entry(entry),
                "summary":           summary,
                "source":            real_source or f"Google News ({company_name})",
                "realSource":        real_source,
                "sourceLogo":        source_logo,
                "publishedAt":       _parse_entry_date(entry),
                "category":          assign_category(clean_title),
                "relevanceScore":    min(100, raw_score + _COMPANY_SPECIFIC_SCORE_BONUS),
                "language":          "en",
                "region":            region,
                "companies":         companies,
                "companyTag":        company_name,
                "isCompanySpecific": True,
            })

        logger.debug("[CompanyNews] %-30s → %d articles", company_name, len(articles))
    except Exception as exc:
        logger.warning("[CompanyNews] Failed for '%s': %s", company_name, exc)

    return articles


def scrape_company_news(company_names: List[str]) -> List[Dict]:
    """
    Scrape Google News RSS for every company in company_names.

    Designed to be called via asyncio.to_thread() from an async job.
    Returns raw article dicts — deduplication against the database is done
    by the caller (run_company_news_scraper_job in server.py).
    """
    all_articles: List[Dict] = []

    for company_name in company_names:
        all_articles.extend(_fetch_one_company(company_name))
        time.sleep(INTER_REQUEST_DELAY)

    logger.info(
        "[CompanyNews] Collected %d articles across %d companies",
        len(all_articles),
        len(company_names),
    )
    return all_articles
