"""
Defense Intelligence Hub — News Scraper Service

Scrapes defense industry news from RSS feeds and public HTML pages.
Uses requests + feedparser + BeautifulSoup; no headless browser required.
"""
import re
import logging
from datetime import datetime, timezone
from typing import Dict, List, Optional

import feedparser
import requests
from bs4 import BeautifulSoup

logger = logging.getLogger(__name__)

REQUEST_TIMEOUT = 8  # seconds

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/120.0.0.0 Safari/537.36"
    ),
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
}

# ── Category keyword matching ────────────────────────────────────────────────

CATEGORY_KEYWORDS: Dict[str, List[str]] = {
    "CONTRACT":    ["contract", "award", "deal", "procurement", "tender", "bid",
                    "contrat", "marché", "appel d'offres", "commande"],
    "TECHNOLOGY":  ["ai", "drone", "cyber", "satellite", "hypersonic", "autonomous",
                    "robot", "electronic warfare", "directed energy", "space",
                    "intelligence artificielle", "spatial", "cyberattaque", "missile"],
    "CONFLICT":    ["war", "operation", "strike", "deploy", "troops", "combat", "battle",
                    "offensive", "ceasefire", "attack", "hostilities",
                    "guerre", "opération", "attaque", "conflit", "déploiement", "frappe"],
    "POLICY":      ["nato", "eu", "law", "regulation", "policy", "spending", "gdp",
                    "budget", "legislation", "congress", "parliament", "defence review",
                    "otan", "loi", "politique", "budget défense", "lpm", "programmation"],
    "M&A":         ["acquisition", "merger", "acquires", "buys", "takeover", "joint venture",
                    "fusion", "rachat", "cession"],
    "GEOPOLITICS": ["sanctions", "diplomacy", "talks", "summit", "alliance", "tensions",
                    "treaty", "agreement", "bilateral", "multilateral",
                    "sanctions", "diplomatie", "sommet", "alliance", "accord", "tensions"],
}


def assign_category(title: str) -> str:
    t = title.lower()
    for cat, keywords in CATEGORY_KEYWORDS.items():
        if any(kw in t for kw in keywords):
            return cat
    return "INDUSTRY"


# ── Region detection ─────────────────────────────────────────────────────────

_REGION_PATTERNS: Dict[str, List[str]] = {
    "us":          ["united states", "pentagon", "congress", "senate", "white house",
                    "us army", "us navy", "us air force", "u.s.", "american defense",
                    "department of defense", "lockheed", "raytheon", "northrop", "washington dc"],
    "europe":      ["europe", "nato", "ukraine", "russia", "france", "germany",
                    "britain", " uk ", "united kingdom", "poland", "finland", "sweden",
                    "european union", "eu defense", "paris", "berlin", "london",
                    "macron", "scholz", "zelensky", "putin", "balkans"],
    "asia-pacific":["china", "taiwan", "japan", "south korea", "india", "pacific",
                    "indo-pacific", "pla ", "beijing", "tokyo", "seoul", "new delhi",
                    "south china sea", "dprk", "north korea", "australia"],
    "middle-east": ["israel", "iran", "syria", "saudi", "middle east", "iraq",
                    "yemen", "hamas", "hezbollah", "gaza", "tehran", "tel aviv",
                    "gulf", "persian gulf", "idf"],
    "africa":      ["africa", "sahel", "nigeria", "somalia", "mali", "senegal",
                    "ethiopia", "sudan", "burkina", "niger"],
}


def detect_region_from_text(title: str, summary: str = "") -> Optional[str]:
    """Return the most likely region based on keyword hits, or None if ambiguous."""
    text = (title + " " + summary).lower()
    for region, patterns in _REGION_PATTERNS.items():
        if any(p in text for p in patterns):
            return region
    return None


# ── Defense relevance scoring ────────────────────────────────────────────────

# (term → base points). Title matches count double.
_RELEVANCE_TERMS: Dict[str, int] = {
    # Core domain — 10 pts
    "defense": 10, "defence": 10, "military": 10, "pentagon": 10, "nato": 10,
    "ministry of defense": 10, "ministry of defence": 10,
    # Major platforms — 9 pts
    "hypersonic": 9, "stealth": 9, "f-35": 9, "icbm": 9, "submarine": 9,
    # Platforms — 8 pts
    "missile": 8, "fighter": 8, "drone": 8, "aircraft": 8, "frigate": 8,
    "destroyer": 8, "tank": 8, "cyber": 8, "satellite": 8,
    # Operations — 8 pts
    "combat": 8, "deploy": 8, "troops": 8, "war": 8, "conflict": 8,
    "strike": 8, "operation": 7,
    # Services — 8 pts
    "army": 8, "navy": 8, "air force": 8, "marine corps": 8, "coast guard": 7,
    # Procurement — 7 pts
    "contract": 7, "procurement": 7, "award": 7, "acquisition": 7,
    "billion": 5, "million": 4,
    # Key companies — 7 pts
    "lockheed": 7, "raytheon": 7, "northrop": 7, "bae systems": 7,
    "rheinmetall": 7, "thales": 7, "dassault": 7, "leonardo": 7,
    "boeing defense": 7, "general dynamics": 7,
    # Technology — 7 pts
    "autonomous": 7, "surveillance": 7, "intelligence": 6, "electronic warfare": 8,
    "space force": 8, "reconnaissance": 7,
    # Hot geopolitical — 6 pts
    "ukraine": 6, "taiwan": 6, "russia": 5, "china": 5, "israel": 5,
    # Generic defense
    "weapon": 6, "armament": 7, "ammunition": 6, "warship": 7,
    # French defense terms
    "défense": 10, "militaire": 10, "armée": 10, "marine nationale": 10,
    "armée de l'air": 10, "armée de terre": 8, "gendarmerie": 5,
    "missile": 8, "sous-marin": 9, "frégate": 8, "porte-avions": 9,
    "guerre": 8, "opération": 7, "déploiement": 7, "renseignement": 7,
    "otan": 10, "ukraine": 6, "russie": 5, "chine": 5, "taiwan": 6,
    "airbus defense": 7, "dassault": 7, "thales": 7, "safran": 7, "mbda": 8,
    "budget défense": 10, "lpm": 10, "contrat": 6, "acquisition": 7,
    "cyber": 8, "drone": 8, "surveillance": 7, "espace": 5,
}


def compute_relevance_score(title: str, summary: str) -> int:
    """
    Return a 0-100 defense relevance score.
    Title keyword matches are worth 2×; summary matches are worth 1×.
    """
    title_l = title.lower()
    summary_l = summary.lower()
    score = 0
    for term, pts in _RELEVANCE_TERMS.items():
        if term in title_l:
            score += pts * 2
        elif term in summary_l:
            score += pts
    return min(100, score)


# ── Similarity / dedup helpers ───────────────────────────────────────────────

def word_overlap_ratio(t1: str, t2: str) -> float:
    """Jaccard word overlap between two title strings."""
    w1 = set(re.findall(r"\w+", t1.lower()))
    w2 = set(re.findall(r"\w+", t2.lower()))
    if not w1 or not w2:
        return 0.0
    return len(w1 & w2) / len(w1 | w2)


def deduplicate_articles(articles: List[Dict]) -> List[Dict]:
    """
    Remove duplicates by:
      1. Exact URL match
      2. Title Jaccard similarity > 0.80
    """
    seen_urls: set = set()
    seen_titles: List[str] = []
    unique: List[Dict] = []

    for article in articles:
        url = article.get("url", "")
        title = article.get("title", "")

        if url in seen_urls:
            continue
        if any(word_overlap_ratio(title, t) > 0.8 for t in seen_titles):
            continue

        seen_urls.add(url)
        seen_titles.append(title)
        unique.append(article)

    return unique


# ── RSS / Atom helpers ───────────────────────────────────────────────────────

def _parse_entry_date(entry) -> datetime:
    """Parse publication date from feedparser entry (returns UTC datetime)."""
    for attr in ("published_parsed", "updated_parsed"):
        t = getattr(entry, attr, None)
        if t:
            try:
                return datetime(*t[:6], tzinfo=timezone.utc)
            except Exception:
                pass
    for attr in ("published", "updated"):
        val = getattr(entry, attr, None)
        if val:
            try:
                from email.utils import parsedate_to_datetime
                return parsedate_to_datetime(val).astimezone(timezone.utc).replace(tzinfo=timezone.utc)
            except Exception:
                pass
    return datetime.now(timezone.utc)


def _extract_image_from_entry(entry) -> Optional[str]:
    """Return the best image URL found in a feedparser entry."""
    # media:content
    for m in getattr(entry, "media_content", []):
        if m.get("medium") == "image" or m.get("type", "").startswith("image"):
            if m.get("url"):
                return m["url"]

    # media:thumbnail
    thumbs = getattr(entry, "media_thumbnail", [])
    if thumbs and thumbs[0].get("url"):
        return thumbs[0]["url"]

    # enclosures
    for enc in getattr(entry, "enclosures", []):
        if enc.get("type", "").startswith("image"):
            url = enc.get("url") or enc.get("href")
            if url:
                return url

    # Parse from entry HTML content / summary
    for attr in ("content", "summary"):
        val = getattr(entry, attr, None)
        if not val:
            continue
        html = val[0].get("value", "") if isinstance(val, list) else val
        soup = BeautifulSoup(html, "html.parser")
        img = soup.find("img")
        if img:
            src = img.get("src") or img.get("data-src", "")
            if src and src.startswith("http"):
                return src

    return None


def _extract_summary(entry) -> str:
    """Return a plain-text summary (≤ 300 chars) from a feedparser entry."""
    for attr in ("summary", "description"):
        val = getattr(entry, attr, None)
        if val:
            text = BeautifulSoup(val, "html.parser").get_text(separator=" ", strip=True)
            return text[:300] + ("..." if len(text) > 300 else "")
    return ""


# ── Per-source scrapers ──────────────────────────────────────────────────────

def _fetch_rss(source: Dict) -> List[Dict]:
    """Fetch and parse an RSS/Atom feed. Returns list of article dicts."""
    articles: List[Dict] = []
    try:
        resp = requests.get(source["url"], headers=HEADERS, timeout=REQUEST_TIMEOUT)
        resp.raise_for_status()
        feed = feedparser.parse(resp.content)

        for entry in feed.entries[:20]:
            title = getattr(entry, "title", "").strip()
            url = getattr(entry, "link", "").strip()
            if not title or not url:
                continue
            summary = _extract_summary(entry)
            src_lang   = source.get("language", "en")
            src_region = source.get("region", "global")
            # For global sources try to narrow down region from content
            region = (detect_region_from_text(title, summary) or src_region) if src_region == "global" else src_region
            articles.append({
                "title":          title,
                "url":            url,
                "image":          _extract_image_from_entry(entry),
                "summary":        summary,
                "source":         source["name"],
                "publishedAt":    _parse_entry_date(entry),
                "category":       assign_category(title),
                "relevanceScore": compute_relevance_score(title, summary),
                "language":       src_lang,
                "region":         region,
            })

        logger.info("[%s] Fetched %d articles via RSS", source["name"], len(articles))
    except Exception as exc:
        logger.error("[%s] RSS fetch failed: %s", source["name"], exc)

    return articles


def _scrape_nato() -> List[Dict]:
    """Scrape public NATO news listing page."""
    articles: List[Dict] = []
    url = "https://www.nato.int/cps/en/natohq/news.htm"
    try:
        resp = requests.get(url, headers=HEADERS, timeout=REQUEST_TIMEOUT)
        resp.raise_for_status()
        soup = BeautifulSoup(resp.text, "html.parser")

        items = (
            soup.select("ul.listing li")
            or soup.select(".news-listing li")
            or soup.select("div.listing a[href]")
            or soup.select("article")
        )

        for item in items[:12]:
            link = item.find("a", href=True)
            if not link:
                continue
            title = link.get_text(strip=True)
            href = link["href"]
            if href.startswith("/"):
                href = "https://www.nato.int" + href
            if not title or not href.startswith("http"):
                continue

            pub_date = datetime.now(timezone.utc)
            date_elem = item.find("time") or item.find(class_=re.compile(r"date|time", re.I))
            if date_elem:
                dt_str = date_elem.get("datetime") or date_elem.get_text(strip=True)
                try:
                    pub_date = datetime.fromisoformat(dt_str.replace("Z", "+00:00"))
                except Exception:
                    pass

            articles.append({
                "title":          title,
                "url":            href,
                "image":          None,
                "summary":        "",
                "source":         "NATO",
                "publishedAt":    pub_date,
                "category":       assign_category(title),
                "relevanceScore": compute_relevance_score(title, ""),
                "language":       "en",
                "region":         "europe",
            })

        logger.info("[NATO] Scraped %d articles", len(articles))
    except Exception as exc:
        logger.error("[NATO] HTML scrape failed: %s", exc)

    return articles


def _scrape_janes() -> List[Dict]:
    """Attempt to scrape Janes public defence-news page (may be JS-rendered)."""
    articles: List[Dict] = []
    url = "https://www.janes.com/defence-news"
    try:
        resp = requests.get(url, headers=HEADERS, timeout=REQUEST_TIMEOUT)
        resp.raise_for_status()
        soup = BeautifulSoup(resp.text, "html.parser")

        items = (
            soup.select("article")
            or soup.select('[class*="article-card"]')
            or soup.select('[class*="news-card"]')
        )

        for item in items[:10]:
            link = item.find("a", href=True)
            title_elem = item.find(["h2", "h3", "h4"])
            if not link or not title_elem:
                continue

            title = title_elem.get_text(strip=True)
            href = link["href"]
            if href.startswith("/"):
                href = "https://www.janes.com" + href
            if not title or not href.startswith("http"):
                continue

            image_url: Optional[str] = None
            img = item.find("img")
            if img:
                src = img.get("src") or img.get("data-src", "")
                if src and src.startswith("http"):
                    image_url = src

            region = detect_region_from_text(title) or "global"
            articles.append({
                "title":          title,
                "url":            href,
                "image":          image_url,
                "summary":        "",
                "source":         "Janes",
                "publishedAt":    datetime.now(timezone.utc),
                "category":       assign_category(title),
                "relevanceScore": compute_relevance_score(title, ""),
                "language":       "en",
                "region":         region,
            })

        logger.info("[Janes] Scraped %d articles", len(articles))
    except Exception as exc:
        logger.error("[Janes] HTML scrape failed: %s", exc)

    return articles


# ── RSS source registry ──────────────────────────────────────────────────────

RSS_SOURCES: List[Dict] = [
    # ── Defense specialty — English ─────────────────────────────────────────
    {"name": "Breaking Defense",       "url": "https://breakingdefense.com/feed/",                          "language": "en", "region": "us"},
    {"name": "Defense Post",           "url": "https://thedefensepost.com/feed/",                           "language": "en", "region": "global"},
    {"name": "Defense News",           "url": "https://www.defensenews.com/arc/outboundfeeds/rss/",         "language": "en", "region": "us"},
    {"name": "Defense Industry Daily", "url": "https://www.defenseindustrydaily.com/feed/",                 "language": "en", "region": "us"},
    # ── Defense specialty — French ──────────────────────────────────────────
    {"name": "Opex360",                "url": "https://www.opex360.com/feed/",                              "language": "fr", "region": "europe"},
    {"name": "Meta-Défense",           "url": "https://meta-defense.fr/feed/",                              "language": "fr", "region": "europe"},
    # ── Mainstream — English ────────────────────────────────────────────────
    {"name": "BBC News",               "url": "http://feeds.bbci.co.uk/news/world/rss.xml",                 "language": "en", "region": "global"},
    {"name": "The Guardian",           "url": "https://www.theguardian.com/world/rss",                      "language": "en", "region": "global"},
    # ── Mainstream — French ─────────────────────────────────────────────────
    {"name": "Le Monde",               "url": "https://www.lemonde.fr/rss/une.xml",                         "language": "fr", "region": "europe"},
    {"name": "Le Figaro",              "url": "https://www.lefigaro.fr/rss/figaro_monde.xml",               "language": "fr", "region": "europe"},
    {"name": "Les Echos",              "url": "https://www.lesechos.fr/arc/outboundfeeds/rss/",             "language": "fr", "region": "europe"},
]

HTML_SCRAPERS = [_scrape_nato, _scrape_janes]


# ── Public API ───────────────────────────────────────────────────────────────

def scrape_all_sources() -> List[Dict]:
    """
    Scrape all configured sources and return raw article dicts.
    Never raises — failed sources are logged and skipped.
    """
    all_articles: List[Dict] = []

    for source in RSS_SOURCES:
        try:
            all_articles.extend(_fetch_rss(source))
        except Exception as exc:
            logger.error("[%s] Unexpected error: %s", source["name"], exc)

    for scraper_fn in HTML_SCRAPERS:
        try:
            all_articles.extend(scraper_fn())
        except Exception as exc:
            logger.error("HTML scraper %s unexpected error: %s", scraper_fn.__name__, exc)

    logger.info("Total raw articles collected: %d", len(all_articles))
    return all_articles
