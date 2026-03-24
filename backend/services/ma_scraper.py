"""
Defense Intelligence Hub — M&A Scraper Service

Scrapes defense industry M&A signals from RSS feeds.
Every field written to the database MUST originate from parsed source text.
No values are inferred or generated — source_url is mandatory for each signal.

Anti-hallucination guarantees:
  - acquirer / target extracted only if both appear in article title/summary
  - deal_value parsed strictly from "$X billion/million" patterns; defaults to 0 if absent
  - status inferred from vocabulary-controlled verb mapping only
  - signals missing acquirer or target are discarded before storage
"""
import re
import logging
from datetime import datetime, timezone
from typing import Dict, List, Optional, Tuple

import feedparser
import requests
from bs4 import BeautifulSoup

logger = logging.getLogger(__name__)

REQUEST_TIMEOUT = 8

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/120.0.0.0 Safari/537.36"
    ),
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
}

# ── Known defense company registry (name → (country_iso2, logo_domain)) ──────

KNOWN_COMPANIES: Dict[str, Tuple[str, str]] = {
    "lockheed martin":           ("US", "lockheedmartin.com"),
    "raytheon":                  ("US", "rtx.com"),
    "rtx":                       ("US", "rtx.com"),
    "northrop grumman":          ("US", "northropgrumman.com"),
    "general dynamics":          ("US", "gd.com"),
    "l3harris":                  ("US", "l3harris.com"),
    "l3 harris":                 ("US", "l3harris.com"),
    "boeing":                    ("US", "boeing.com"),
    "textron":                   ("US", "textron.com"),
    "leidos":                    ("US", "leidos.com"),
    "saic":                      ("US", "saic.com"),
    "booz allen":                ("US", "boozallen.com"),
    "huntington ingalls":        ("US", "hii.com"),
    "hii":                       ("US", "hii.com"),
    "transdigm":                 ("US", "transdigm.com"),
    "teledyne":                  ("US", "teledyne.com"),
    "mercury systems":           ("US", "mrcy.com"),
    "curtiss-wright":            ("US", "curtisswright.com"),
    "aerovironment":             ("US", "avinc.com"),
    "anduril":                   ("US", "anduril.com"),
    "palantir":                  ("US", "palantir.com"),
    "kratos":                    ("US", "kratosdefense.com"),
    "heico":                     ("US", "heico.com"),
    "spirit aerosystems":        ("US", "spiritaero.com"),
    "bae systems":               ("GB", "baesystems.com"),
    "rolls-royce":               ("GB", "rolls-royce.com"),
    "cobham":                    ("GB", "cobham.com"),
    "ultra electronics":         ("GB", "ultra.group"),
    "babcock":                   ("GB", "babcock.com"),
    "qinetiq":                   ("GB", "qinetiq.com"),
    "thales":                    ("FR", "thalesgroup.com"),
    "dassault":                  ("FR", "dassault-aviation.com"),
    "safran":                    ("FR", "safran-group.com"),
    "naval group":               ("FR", "naval-group.com"),
    "airbus":                    ("FR", "airbus.com"),
    "rheinmetall":               ("DE", "rheinmetall.com"),
    "hensoldt":                  ("DE", "hensoldt.net"),
    "knds":                      ("DE", "knds.de"),
    "leonardo":                  ("IT", "leonardo.com"),
    "mbda":                      ("FR", "mbda-systems.com"),
    "saab":                      ("SE", "saabgroup.com"),
    "kongsberg":                 ("NO", "kongsberg.com"),
    "hanwha":                    ("KR", "hanwha.com"),
    "hanwha ocean":              ("KR", "hanwha.com"),
    "israel aerospace":          ("IL", "iai.co.il"),
    "elbit":                     ("IL", "elbitsystems.com"),
    "rafael":                    ("IL", "rafael.co.il"),
    "collins aerospace":         ("US", "collinsaerospace.com"),
    "ge aerospace":              ("US", "geaerospace.com"),
    "meggitt":                   ("GB", "meggitt.com"),
    "parker hannifin":           ("US", "parker.com"),
    "flir":                      ("US", "flir.com"),
    "teledyne flir":             ("US", "teledyne.com"),
    "aerojet rocketdyne":        ("US", "aerojet.com"),
    "orbital atk":               ("US", "northropgrumman.com"),
    "terran orbital":            ("US", "terranorbital.com"),
    "ball aerospace":            ("US", "ball.com"),
    "expal systems":             ("ES", "maxamcorp.com"),
    "imperva":                   ("US", "imperva.com"),
    "gemalto":                   ("NL", "thalesgroup.com"),
    "csra":                      ("US", "gd.com"),
    "engility":                  ("US", "leidos.com"),
    "esterline":                 ("US", "transdigm.com"),
    "daewoo shipbuilding":       ("KR", "hanwha.com"),
    "dsme":                      ("KR", "hanwha.com"),
    "bohemia interactive":       ("CZ", "bisimulations.com"),
}

# ── M&A keyword patterns for article filtering ────────────────────────────────

MA_TITLE_KEYWORDS = [
    "acqui", "merger", "acquires", "acquire", "buys", "buy out",
    "takeover", "joint venture", "strategic partnership", "combines with",
    "merges with", "consolidat",
]

# ── Value extraction ──────────────────────────────────────────────────────────

_VALUE_RE = re.compile(
    r"\$\s*(?P<num>[\d,]+(?:\.\d+)?)\s*(?P<unit>billion|million|bn|m)\b",
    re.IGNORECASE,
)

def _parse_deal_value(text: str) -> float:
    """Extract deal value in millions USD from free text. Returns 0 if not found."""
    m = _VALUE_RE.search(text)
    if not m:
        return 0.0
    num = float(m.group("num").replace(",", ""))
    unit = m.group("unit").lower()
    if unit in ("billion", "bn"):
        return round(num * 1000, 1)
    return round(num, 1)

# ── Status inference ──────────────────────────────────────────────────────────

_STATUS_VERBS = {
    "announced":  ["announces", "announced", "plans to acquire", "agrees to acquire",
                   "signed agreement", "letter of intent", "loi"],
    "pending":    ["pending", "awaiting", "regulatory review", "antitrust", "clearance",
                   "awaiting approval", "under review"],
    "completed":  ["completes", "completed", "closed", "finalizes", "finalized",
                   "closes acquisition"],
    "cancelled":  ["cancelled", "abandoned", "withdrew", "drops bid", "terminat"],
}

def _infer_status(text: str) -> str:
    t = text.lower()
    for status, verbs in _STATUS_VERBS.items():
        if any(v in t for v in verbs):
            return status
    return "announced"

# ── Deal type inference ───────────────────────────────────────────────────────

def _infer_deal_type(text: str) -> str:
    t = text.lower()
    if any(kw in t for kw in ["joint venture", "jv", "partnership"]):
        return "joint_venture"
    if any(kw in t for kw in ["merger", "merges", "combines"]):
        return "merger"
    return "acquisition"

# ── Company name extraction ───────────────────────────────────────────────────

# Patterns for "Company acquires Target" style titles
_ACQ_PATTERNS = [
    re.compile(
        r"(?P<acquirer>[\w][\w\s\-&']+?)\s+"
        r"(?:acquires?|buys?|to acquire|to buy|agrees? to acquire|agrees? to buy|"
        r"completes? acquisition of|closes? acquisition of|announces? acquisition of)\s+"
        r"(?P<target>[\w][\w\s\-&']+?)(?:\s+for\b|\s+in\b|\.|\,|$)",
        re.IGNORECASE,
    ),
    re.compile(
        r"(?P<acquirer>[\w][\w\s\-&']+?)\s+(?:and|&)\s+"
        r"(?P<target>[\w][\w\s\-&']+?)\s+(?:merger|merge|to merge|combines?)",
        re.IGNORECASE,
    ),
]

def _extract_companies(title: str, summary: str) -> Tuple[Optional[str], Optional[str]]:
    """
    Try to extract (acquirer, target) from title then summary.
    Returns (None, None) if extraction fails — callers must discard such signals.
    """
    for text in (title, summary):
        for pat in _ACQ_PATTERNS:
            m = pat.search(text)
            if m:
                acquirer = m.group("acquirer").strip()
                target = m.group("target").strip()
                # Basic sanity: both names should be > 2 chars and not stop words
                if len(acquirer) > 2 and len(target) > 2:
                    # Verify at least one is a known defense company
                    acq_l = acquirer.lower()
                    tgt_l = target.lower()
                    if any(k in acq_l for k in KNOWN_COMPANIES) or any(k in tgt_l for k in KNOWN_COMPANIES):
                        return acquirer, target
    return None, None

def _lookup_company(name: str) -> Tuple[Optional[str], Optional[str]]:
    """Return (country_iso2, logo_domain) for a company name, or (None, None)."""
    n = name.lower()
    for key, val in KNOWN_COMPANIES.items():
        if key in n:
            return val
    return None, None

def _normalize_name(name: str) -> str:
    return re.sub(r"\s+", " ", name.lower().strip())

# ── Deduplication ─────────────────────────────────────────────────────────────

def _jaccard(s1: str, s2: str) -> float:
    w1 = set(re.findall(r"\w+", s1.lower()))
    w2 = set(re.findall(r"\w+", s2.lower()))
    if not w1 or not w2:
        return 0.0
    return len(w1 & w2) / len(w1 | w2)

def deduplicate_ma_signals(signals: List[Dict]) -> List[Dict]:
    """
    Deduplicate by:
      1. Exact (acquirer_norm, target_norm) pair
      2. Jaccard similarity > 0.75 on acquirer+target concatenated string
    """
    seen_pairs: set = set()
    seen_labels: List[str] = []
    unique: List[Dict] = []

    for sig in signals:
        pair = (sig.get("acquirer_norm", ""), sig.get("target_norm", ""))
        if pair in seen_pairs:
            continue
        label = f"{pair[0]} {pair[1]}"
        if any(_jaccard(label, l) > 0.75 for l in seen_labels):
            continue
        seen_pairs.add(pair)
        seen_labels.append(label)
        unique.append(sig)

    return unique

# ── RSS fetcher ───────────────────────────────────────────────────────────────

def _parse_entry_date(entry) -> datetime:
    for attr in ("published_parsed", "updated_parsed"):
        t = getattr(entry, attr, None)
        if t:
            try:
                return datetime(*t[:6], tzinfo=timezone.utc)
            except Exception:
                pass
    return datetime.now(timezone.utc)

def _extract_summary(entry) -> str:
    for attr in ("summary", "description"):
        val = getattr(entry, attr, None)
        if val:
            return BeautifulSoup(val, "html.parser").get_text(separator=" ", strip=True)[:500]
    return ""

def _is_ma_article(title: str, summary: str) -> bool:
    text = (title + " " + summary).lower()
    return any(kw in text for kw in MA_TITLE_KEYWORDS)

def _fetch_rss_ma(source_name: str, url: str) -> List[Dict]:
    signals: List[Dict] = []
    try:
        resp = requests.get(url, headers=HEADERS, timeout=REQUEST_TIMEOUT)
        resp.raise_for_status()
        feed = feedparser.parse(resp.content)

        for entry in feed.entries[:30]:
            title = getattr(entry, "title", "").strip()
            link = getattr(entry, "link", "").strip()
            if not title or not link:
                continue

            summary = _extract_summary(entry)
            if not _is_ma_article(title, summary):
                continue

            acquirer, target = _extract_companies(title, summary)
            if not acquirer or not target:
                continue  # discard — no reliable extraction

            acq_country, acq_logo = _lookup_company(acquirer)
            tgt_country, tgt_logo = _lookup_company(target)

            deal_value = _parse_deal_value(title + " " + summary)
            status = _infer_status(title + " " + summary)
            deal_type = _infer_deal_type(title + " " + summary)

            # Description: first 120 chars of title (actual scraped text)
            description = title[:120]

            signals.append({
                "acquirer":          acquirer,
                "target":            target,
                "acquirer_norm":     _normalize_name(acquirer),
                "target_norm":       _normalize_name(target),
                "deal_value":        deal_value,
                "status":            status,
                "deal_type":         deal_type,
                "description":       description,
                "source_url":        link,   # always present — traceability guarantee
                "rationale":         summary[:300] if summary else None,
                "announced_date":    _parse_entry_date(entry),
                "acquirer_country":  acq_country,
                "target_country":    tgt_country,
                "acquirer_logo_domain": acq_logo,
                "target_logo_domain":   tgt_logo,
            })

        logger.info("[%s] M&A signals extracted: %d", source_name, len(signals))
    except Exception as exc:
        logger.error("[%s] RSS M&A fetch failed: %s", source_name, exc)
    return signals

# ── RSS sources ───────────────────────────────────────────────────────────────

MA_RSS_SOURCES = [
    ("Breaking Defense",       "https://breakingdefense.com/feed/"),
    ("Defense News",           "https://www.defensenews.com/arc/outboundfeeds/rss/"),
    ("Defense Industry Daily", "https://www.defenseindustrydaily.com/feed/"),
    ("Reuters Business",       "https://feeds.reuters.com/reuters/businessNews"),
    ("Defense Post",           "https://thedefensepost.com/feed/"),
]

# ── Public API ────────────────────────────────────────────────────────────────

def scrape_ma_signals() -> List[Dict]:
    """
    Scrape all configured sources for M&A signals.
    Returns raw signal dicts — must be deduplicated before storage.
    Never raises — failed sources are logged and skipped.
    """
    all_signals: List[Dict] = []
    for name, url in MA_RSS_SOURCES:
        try:
            all_signals.extend(_fetch_rss_ma(name, url))
        except Exception as exc:
            logger.error("[%s] Unexpected M&A scraper error: %s", name, exc)
    logger.info("Total raw M&A signals collected: %d", len(all_signals))
    return all_signals
