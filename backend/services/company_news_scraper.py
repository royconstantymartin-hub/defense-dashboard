"""
Defense Intelligence Hub — Company-specific news scraper

For each company in the defense_players collection, queries Google News RSS
for the 5 most recent articles.  Results are tagged with:
  - companyTag       : canonical company name from the DB
  - isCompanySpecific: True

This lets company profile pages show their own news feed AND lets the general
feed give a slight priority boost to articles about specific tracked companies.
"""
import logging
import time
from datetime import datetime, timezone
from typing import Dict, List
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
# This ensures they surface above generic industry noise in the general feed.
_COMPANY_SPECIFIC_SCORE_BONUS = 10


def _google_news_rss_url(company_name: str) -> str:
    """Build a Google News RSS search URL for a company name."""
    query = quote_plus(f"{company_name} defense")
    return f"https://news.google.com/rss/search?q={query}&hl=en-US&gl=US&ceid=US:en"


def _fetch_one_company(company_name: str) -> List[Dict]:
    """
    Fetch up to ARTICLES_PER_COMPANY articles from Google News RSS for one company.
    Never raises — failures are logged and return an empty list.
    """
    articles: List[Dict] = []
    url = _google_news_rss_url(company_name)
    try:
        resp = requests.get(url, headers=HEADERS, timeout=REQUEST_TIMEOUT)
        resp.raise_for_status()
        feed = feedparser.parse(resp.content)

        for entry in feed.entries[:ARTICLES_PER_COMPANY]:
            title = getattr(entry, "title", "").strip()
            article_url = getattr(entry, "link", "").strip()
            if not title or not article_url:
                continue

            summary = _extract_summary(entry)
            raw_score = compute_relevance_score(title, summary)
            region = detect_region_from_text(title, summary) or "global"

            # Ensure the queried company is always in the companies list,
            # even if it isn't explicitly named in the article text.
            companies = detect_companies(title, summary)
            if company_name not in companies:
                companies.append(company_name)

            articles.append({
                "title":             title,
                "url":               article_url,
                "image":             _extract_image_from_entry(entry),
                "summary":           summary,
                "source":            f"Google News ({company_name})",
                "publishedAt":       _parse_entry_date(entry),
                "category":          assign_category(title),
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
