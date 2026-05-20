"""
Defense Intelligence Hub — News Scraper Service

Scrapes defense industry news from RSS feeds and public HTML pages.
Uses requests + feedparser + BeautifulSoup; no headless browser required.
"""
import re
import logging
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime, timezone
from typing import Dict, List, Optional

import feedparser
import requests
from bs4 import BeautifulSoup

logger = logging.getLogger(__name__)

REQUEST_TIMEOUT = 12  # seconds

# Stock-photo hosting domains that produce off-topic thumbnails (e.g. pilates
# images on a defence article).  Images whose URLs contain any of these
# substrings are discarded so the frontend falls back to category placeholders.
_STOCK_PHOTO_DOMAINS = (
    "unsplash.com",
    "gettyimages.com",
    "istockphoto.com",
    "shutterstock.com",
    "depositphotos.com",
    "pexels.com",
    "dreamstime.com",
    "123rf.com",
    "alamy.com",
    "stock.adobe.com",
    "pixabay.com",
    "stocksy.com",
    "canstockphoto.com",
)


def _is_stock_photo(url: str) -> bool:
    """Return True if *url* points to a generic stock-photo service."""
    low = url.lower()
    return any(domain in low for domain in _STOCK_PHOTO_DOMAINS)

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
# Order matters: first match wins. CONFLICT and M&A are checked before TECHNOLOGY
# so that "drone strike" → CONFLICT (not TECHNOLOGY) and "acquires" → M&A.

CATEGORY_KEYWORDS: Dict[str, List[str]] = {
    # EARNINGS: quarterly/annual financial results for defense companies.
    "EARNINGS":    ["earnings", "quarterly results", "annual results", "revenue beat",
                    "eps beat", "earnings per share", "q1 results", "q2 results",
                    "q3 results", "q4 results", "full-year results", "fiscal year",
                    "net income", "operating income", "guidance raised", "guidance lowered",
                    "raises guidance", "beats expectations", "misses expectations",
                    "beats estimates", "misses estimates", "revenue grew", "revenue growth",
                    "résultats trimestriels", "résultats annuels", "chiffre d'affaires",
                    "bénéfice net", "résultat opérationnel", "prévisions relevées"],
    # CONFLICT: actual ongoing armed conflict, casualties, kinetic events.
    # Deliberately narrow to avoid misclassifying technology/doctrine articles.
    "CONFLICT":    ["war crimes", "killed in action", "troops killed", "soldiers killed",
                    "civilians killed", "ceasefire", "hostilities", "battle of",
                    "front line", "frontline", "ground offensive", "bombing campaign",
                    "airstrike on", "air strike on", "shelling of", "missile strike",
                    "artillery fire", "ambush", "insurgency", "guerrilla",
                    "conflit armé", "guerre en ", "offensive terrestre", "cessez-le-feu",
                    "victimes civiles", "soldats tués", "bombardement de", "frappe sur"],
    "M&A":         ["acquisition", "merger", "acquires", "acquis", "buys", "takeover",
                    "joint venture", "agrees to buy", "agrees to acquire", "strategic investment",
                    "stake in", "minority stake", "majority stake", "divests", "divestiture",
                    "spin-off", "completes purchase", "signs agreement to acquire",
                    "investment round", "series a", "series b", "ipo", "goes public",
                    "raises funding", "raises $", "valuation", "private equity",
                    "memorandum of understanding", "mou signed", "teaming agreement",
                    "letter of intent", "strategic partnership agreement",
                    "fusion", "rachat", "cession", "cède", "prise de participation",
                    "investissement stratégique", "cession d'actifs", "levée de fonds",
                    "tour de table", "protocole d'accord", "accord de partenariat stratégique"],
    "CONTRACT":    ["contract", "award", "procurement", "tender", "bid",
                    "arms deal", "defense deal", "weapons deal", "military deal",
                    "purchase agreement", "firm order", "delivery order", "work order",
                    "option exercised", "option contract",
                    "indefinite delivery", "idiq", "other transaction authority", "ota",
                    # Acquisition program lifecycle
                    "program of record", "program executive", "source selection",
                    "down-select", "downselect", "selected to develop", "selected to build",
                    "selected for", "chosen to develop", "chosen for",
                    "full-rate production", "low-rate initial production", "lrip",
                    "engineering manufacturing development", "milestone b", "milestone c",
                    "request for proposal", "rfp issued", "solicitation",
                    "program manager", "major defense acquisition", "mdap",
                    "foreign military sale", "foreign military sales", "fms",
                    "contrat", "marché", "appel d'offres", "commande", "livraison",
                    "attribut", "remporté"],
    "GEOPOLITICS": ["sanctions", "diplomacy", "talks", "summit", "alliance", "tensions",
                    "treaty", "bilateral", "multilateral", "cooperation agreement",
                    "foreign policy", "arms embargo", "export control",
                    "diplomatie", "sommet", "accord bilatéral", "partenariat stratégique",
                    "contrôle des exportations", "embargo"],
    "POLICY":      ["nato", "eu ", "law", "regulation", "policy", "spending", "gdp",
                    "budget", "legislation", "congress", "parliament", "defence review",
                    "white paper", "national strategy", "defence white paper",
                    "military spending", "defence budget", "lpm", "programmation militaire",
                    "otan", "loi de programmation", "politique de défense",
                    "effort de défense", "milliards pour",
                    "watchdog", "oversight", "inspector general", "ig report",
                    "accountability", "evaluating military", "gao report",
                    "contrôle parlementaire", "rapport d'inspection"],
    "TECHNOLOGY":  ["ai ", "artificial intelligence", "cyber", "satellite", "hypersonic",
                    "autonomous", "robot", "electronic warfare", "directed energy",
                    "space launch", "quantum", "radar", "stealth", "sensor",
                    "drone", "uav", "ugv", "usv", "unmanned", "loitering munition",
                    "missile defense", "c2 system", "command and control",
                    # Missile defense programs
                    "golden dome", "iron dome", "aegis", "thaad", "patriot missile",
                    "interceptor missile", "layered defense", "missile shield",
                    "ground-based midcourse", "hypersonic defense", "space-based interceptor",
                    "high energy laser", "directed energy weapon", "counter-drone",
                    "intelligence artificielle", "cyberattaque", "spatial",
                    "guerre électronique", "énergie dirigée", "système d'arme",
                    "drone de combat", "véhicule autonome", "capteur", "détection"],
}


# ── Source-level defense relevance weights ───────────────────────────────────
# Specialty defense outlets keep their full score (1.0).
# Mainstream/generalist outlets get a penalty so they don't flood the feed with
# tangentially-related articles. Scores are multiplied by this factor at scrape time.

_SOURCE_DEFENSE_WEIGHT: Dict[str, float] = {
    # Generalist dailies — low defense signal-to-noise
    "Le Monde":         0.40,
    "Le Figaro":        0.55,
    "BFM Business":     0.50,
    "Capital":          0.45,
    "BBC News":         0.60,
    "The Guardian":     0.60,
    "Reuters Business": 0.65,
    # Business press — good for M&A/budget but not pure defense
    "L'Agefi":          0.75,
    "Les Echos":        0.80,
    "La Tribune":       0.80,
    # Broad geopolitics / analysis — good signal but not pure defense
    "Foreign Policy":   0.70,
    "Bellingcat":       0.80,
    "Stars and Stripes": 0.90,
    # Military lifestyle / benefits — lower signal for industry analysis
    "Sandboxx":         0.30,
    "Task & Purpose":   0.50,
    "Military.com":     0.55,
    # Academic / legal — slow publishing, niche
    "Just Security":    0.55,
    "Lawfare":          0.55,
    "Small Wars Journal": 0.50,
    # Advocacy / regional media with limited defense expertise
    "Euromaidan Press": 0.30,
    "Daily Excelsior":  0.25,
    "Kyiv Independent": 0.40,
    "Ukrinform":        0.35,
    "Al Jazeera":       0.50,
    "Jerusalem Post":   0.55,
    "Times of India":   0.40,
    "South China Morning Post": 0.50,
    "RT":               0.10,
    "Sputnik":          0.10,
    "Global Times":     0.15,
}

# Sources excluded entirely from the public feed regardless of relevance score.
# Includes state-controlled propaganda outlets whose editorial independence
# cannot be verified.
_BLOCKED_SOURCES: set = {
    "RT", "Russia Today", "Sputnik", "Sputnik International",
    "TASS", "Xinhua", "Global Times", "PLA Daily",
    "Press TV", "Al-Manar", "Al-Alam",
}


# ── Company alias map ────────────────────────────────────────────────────────
# Maps each canonical company name (as stored in the DB) to a list of search
# terms (lowercase) that identify mentions of that company in article text.
# Terms are checked against the full lowercase title + summary string.

COMPANY_ALIASES: Dict[str, List[str]] = {
    # USA — Major Primes
    "Lockheed Martin":         ["lockheed martin", "lockheed", "lmt"],
    "Raytheon Technologies":   ["raytheon technologies", "raytheon", " rtx ", "rtx corp", "rtx's"],
    "Northrop Grumman":        ["northrop grumman", "northrop", "noc "],
    "General Dynamics":        ["general dynamics", " gdls "],
    "Boeing Defense":          ["boeing defense", "boeing"],
    "L3Harris Technologies":   ["l3harris", "l3 harris", "harris corporation"],
    "Huntington Ingalls":      ["huntington ingalls", " hii "],
    "Leidos Holdings":         ["leidos"],
    "SAIC":                    [" saic "],
    "Booz Allen Hamilton":     ["booz allen"],
    "General Atomics":         ["general atomics"],
    "Textron":                 ["textron", "bell helicopter", "bell textron"],
    "Kratos Defense":          ["kratos defense", "kratos"],
    "AeroVironment":           ["aerovironment"],
    "Anduril Industries":      ["anduril"],
    "Palantir Technologies":   ["palantir", "pltr"],
    "Rocket Lab":              ["rocket lab", "rklb"],
    "Axon Enterprise":         ["axon enterprise", " axon "],
    "Mercury Systems":         ["mercury systems"],
    "Parsons Corporation":     ["parsons corporation"],
    "BWX Technologies":        [" bwxt ", "bwx technologies"],
    "TransDigm":               ["transdigm"],
    # UK
    "BAE Systems":             ["bae systems", "bae "],
    "Rolls-Royce Holdings":    ["rolls-royce", "rolls royce"],
    "Babcock International":   ["babcock international", "babcock"],
    "QinetiQ":                 ["qinetiq"],
    # France
    "Thales":                  ["thales"],
    "Dassault Aviation":       ["dassault", "rafale"],
    "Safran":                  ["safran"],
    "Naval Group":             ["naval group"],
    "MBDA":                    [" mbda "],
    "Nexter Systems":          ["nexter"],
    "Arquus":                  ["arquus"],
    # Germany
    "Rheinmetall":             ["rheinmetall"],
    "Hensoldt":                ["hensoldt"],
    "KNDS":                    [" knds "],
    "Krauss-Maffei Wegmann":   ["krauss-maffei", "kmw ", " leopard tank"],
    "MTU Aero Engines":        [" mtu aero"],
    "ThyssenKrupp Marine":     ["thyssenkrupp marine", "thyssenkrupp"],
    # EU/Multinational
    "Airbus Defence & Space":  ["airbus defence", "airbus defense", "airbus"],
    "Leonardo":                ["leonardo"],
    "MBDA":                    [" mbda "],
    "Saab AB":                 [" saab "],
    "Kongsberg Defence":       ["kongsberg"],
    # Italy
    "Fincantieri":             ["fincantieri"],
    # Spain
    "Indra Sistemas":          ["indra "],
    "Navantia":                ["navantia"],
    "Expal Systems":           ["expal "],
    # Israel
    "Elbit Systems":           ["elbit"],
    "Israel Aerospace Industries": ["iai ", "israel aerospace"],
    "Rafael Advanced Defense": ["rafael "],
    # Turkey
    "Baykar":                  ["baykar", "bayraktar"],
    "Aselsan":                 ["aselsan"],
    # South Korea
    "Hanwha Aerospace":        ["hanwha aerospace"],
    "Hanwha Systems":          ["hanwha systems"],
    "Korea Aerospace Industries": [" kai ", "korea aerospace"],
    "LIG Nex1":                ["lig nex1", "lignex"],
    # Japan
    "Mitsubishi Heavy Industries": ["mitsubishi heavy"],
    "NEC Defense Systems":     ["nec defense", "nec corporation defense"],
    "Japan Marine United":     ["japan marine united", " jmu "],
    "Mitsubishi Electric Defense": ["mitsubishi electric"],
    # Australia
    "Austal":                  ["austal"],
    "CEA Technologies":        ["cea technologies", " cea radar"],
    # India
    "Hindustan Aeronautics":   [" hal ", "hindustan aeronautics"],
    "Tata Advanced Systems":   ["tata advanced systems", " tasl "],
    "Bharat Forge":            ["bharat forge"],
    # Brazil
    "Embraer Defense":         ["embraer"],
    "Taurus Armas":            ["taurus armas", "taurus firearms"],
    # Canada
    "CAE Inc":                 [" cae "],
    # Ukraine
    "Ukroboronprom":           ["ukroboronprom"],
    # Singapore
    "ST Engineering":          ["st engineering"],
    # Germany
    "Krauss-Maffei Wegmann":   ["krauss-maffei wegmann", " kmw ", "leopard 2 maker"],
    "Helsing":                 ["helsing "],
    # Netherlands
    "Thales Netherlands":      ["thales netherlands", "thales nl"],
    # Poland
    "Mesko":                   ["mesko "],
    # Saudi Arabia
    "Advanced Electronics Company": [" aec ", "advanced electronics company"],
    # UK
    "Cobham":                  ["cobham "],
    "Serco Group":             ["serco "],
    # Egypt
    "Arab Organization for Industrialization": ["arab organization for industrialization", " aoi "],
}


def detect_companies(title: str, summary: str) -> List[str]:
    """
    Return a list of canonical company names mentioned in the article.
    Checks title and summary (case-insensitive). Uses word-boundary padding
    (spaces / punctuation) via the padded text trick to avoid false positives
    on short terms like "rtx" or "hal".
    """
    # Pad with spaces so prefix/suffix terms like " rtx " always match
    text = (" " + title + " " + summary + " ").lower()
    found: List[str] = []
    for canonical, aliases in COMPANY_ALIASES.items():
        for alias in aliases:
            if alias in text:
                found.append(canonical)
                break  # one match per company is enough
    return found


def assign_category(title: str, summary: str = "") -> str:
    t = (title + " " + summary).lower()
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
    # Earnings / financial results — 6 pts (defense company financials are relevant)
    "earnings": 6, "quarterly results": 6, "annual results": 6,
    "revenue beat": 6, "beats estimates": 6, "beats expectations": 6,
    "eps beat": 6, "raises guidance": 6, "guidance raised": 6,
    "q1 results": 5, "q2 results": 5, "q3 results": 5, "q4 results": 5,
    # Key companies — 7 pts
    "lockheed": 7, "raytheon": 7, "northrop": 7, "bae systems": 7,
    "rheinmetall": 7, "thales": 7, "dassault": 7, "leonardo": 7,
    "boeing defense": 7, "general dynamics": 7,
    "l3harris": 7, "l3 harris": 7, "anduril": 8, "palantir": 7,
    "leidos": 7, "huntington ingalls": 7, "general atomics": 7,
    "aerovironment": 6, "mercury systems": 6, "kratos": 6, "textron": 6,
    # Acquisition programs and missile defense
    "golden dome": 10, "iron dome": 9, "thaad": 8, "aegis": 8,
    "interceptor": 7, "missile defense system": 9, "layered defense": 8,
    "ground-based midcourse": 9, "missile shield": 8,
    # Acquisition vocabulary
    "program of record": 8, "source selection": 8, "down-select": 8,
    "full-rate production": 8, "lrip": 7, "milestone b": 8, "milestone c": 8,
    "engineering manufacturing development": 8,
    "foreign military sale": 7, "foreign military sales": 7,
    "ndaa": 7, "appropriations": 6, "defense authorization": 7,
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


# ── Similarity / clustering helpers ─────────────────────────────────────────

# Stop words filtered out before computing similarity so that "US Army seeks
# sled-mounted air defense" and "US Army considers sled-mounted air defense"
# cluster correctly despite different verbs.
_STOP_WORDS = {
    "the", "a", "an", "to", "in", "of", "and", "or", "for", "is", "at",
    "by", "on", "with", "from", "its", "it", "that", "this", "has", "was",
    "will", "be", "as", "are", "have", "had", "not", "new", "says", "said",
    "would", "could", "should", "over", "up", "into", "after", "against",
    "amid", "two", "three", "four", "five", "six",
    # French
    "le", "la", "les", "un", "une", "des", "du", "de", "et", "en", "au",
    "aux", "sur", "par", "pour", "qui", "que", "se", "sa", "son", "ses",
}


def _content_words(text: str) -> set:
    return set(re.findall(r"\w+", text.lower())) - _STOP_WORDS


def word_overlap_ratio(t1: str, t2: str) -> float:
    """Jaccard overlap on content words (stop words excluded)."""
    w1 = _content_words(t1)
    w2 = _content_words(t2)
    if not w1 or not w2:
        return 0.0
    return len(w1 & w2) / len(w1 | w2)


def cluster_articles(articles: List[Dict]) -> List[Dict]:
    """
    Group articles that cover the same story into clusters (Jaccard ≥ 0.50 on
    content words). For each cluster keep the article with the highest relevance
    score as the representative and annotate it with:
      - source_count  : number of distinct sources covering the story
      - covered_by    : list of source names in the cluster

    This replaces simple deduplication: instead of discarding near-duplicate
    articles we *surface* multi-source coverage as a hotness signal.
    """
    seen_urls: set = set()
    clusters: List[List[Dict]] = []

    for article in articles:
        url = article.get("url", "")
        if url in seen_urls:
            continue
        seen_urls.add(url)

        title = article.get("title", "")
        matched: Optional[List[Dict]] = None
        for cluster in clusters:
            rep_title = cluster[0].get("title", "")
            if word_overlap_ratio(title, rep_title) >= 0.60:
                matched = cluster
                break

        if matched is not None:
            matched.append(article)
        else:
            clusters.append([article])

    result: List[Dict] = []
    for cluster in clusters:
        best = max(cluster, key=lambda a: a.get("relevanceScore", 0))
        best = best.copy()
        best["source_count"] = len(cluster)
        best["covered_by"] = sorted({a.get("source", "") for a in cluster if a.get("source")})
        result.append(best)

    return result


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
    # media:content — accept any entry with a URL.
    # Many outlets (Guardian, Reuters, War Zone) emit <media:content url="..."/>
    # WITHOUT a medium= or type= attribute, so the old strict check dropped them.
    for m in getattr(entry, "media_content", []):
        url = m.get("url", "")
        if not url or not url.startswith("http"):
            continue
        medium = m.get("medium", "")
        mime   = m.get("type", "")
        # Accept: explicit image medium, image/* MIME, OR no typing at all
        if medium == "image" or mime.startswith("image") or (not medium and not mime):
            if not _is_stock_photo(url):
                return url

    # media:thumbnail
    thumbs = getattr(entry, "media_thumbnail", [])
    if thumbs and thumbs[0].get("url") and not _is_stock_photo(thumbs[0]["url"]):
        return thumbs[0]["url"]

    # enclosures — accept image MIME or image URL extension
    _IMG_EXTS = (".jpg", ".jpeg", ".png", ".webp", ".avif")
    for enc in getattr(entry, "enclosures", []):
        url  = enc.get("url") or enc.get("href", "")
        mime = enc.get("type", "")
        if url and not _is_stock_photo(url) and (mime.startswith("image") or any(url.lower().endswith(e) for e in _IMG_EXTS)):
            return url

    # Parse from full article HTML (WordPress content:encoded, Guardian, etc.)
    for attr in ("content", "summary"):
        val = getattr(entry, attr, None)
        if not val:
            continue
        html = val[0].get("value", "") if isinstance(val, list) else val
        soup = BeautifulSoup(html, "html.parser")
        # <figure> first — WordPress themes put the best image there
        fig = soup.find("figure")
        if fig:
            img = fig.find("img")
            if img:
                src = (img.get("src") or img.get("data-src")
                       or img.get("data-lazy-src") or img.get("data-original", ""))
                if src and src.startswith("http") and not _is_stock_photo(src):
                    return src
        # Fall back to any <img> — skip tiny tracking pixels and GIFs
        for img in soup.find_all("img"):
            src = (img.get("src") or img.get("data-src")
                   or img.get("data-lazy-src") or img.get("data-original", ""))
            if src and src.startswith("http") and not src.endswith(".gif") and not _is_stock_photo(src):
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


# ── OG image fallback ───────────────────────────────────────────────────────

def _resolve_redirect(url: str, timeout: int = 4) -> str:
    """Follow HTTP redirects and return the final canonical URL.
    Used to unwrap Google News redirect links (news.google.com/rss/articles/…)
    so we store the real publisher URL — correct favicon, dedup, and OG images."""
    try:
        r = requests.head(url, headers=HEADERS, timeout=timeout, allow_redirects=True)
        final = r.url or url
        if final and not final.startswith("https://news.google.com"):
            return final
    except Exception:
        pass
    return url


def _fetch_og_image(article_url: str, timeout: int = 6) -> Optional[str]:
    """Fetch the Open Graph / Twitter Card image from an article page.
    Used as a fallback when the RSS entry carries no image metadata.
    Short timeout so it never blocks the scraper for long."""
    try:
        resp = requests.get(article_url, headers=HEADERS, timeout=timeout, stream=True)
        resp.raise_for_status()
        # Read only the first 32 KB — enough to find <meta> tags in <head>
        chunk = resp.raw.read(32768).decode("utf-8", errors="ignore")
        resp.close()
        soup = BeautifulSoup(chunk, "html.parser")
        for selector in [
            {"property": "og:image"},
            {"name": "og:image"},
            {"property": "twitter:image"},
            {"name": "twitter:image"},
        ]:
            tag = soup.find("meta", attrs=selector)
            if tag:
                content = tag.get("content", "")
                if content and content.startswith("http") and not _is_stock_photo(content):
                    return content
    except Exception:
        pass
    return None


def _enrich_images(articles: List[Dict]) -> None:
    """For articles that have no image, try to fetch the OG image in parallel.
    Mutates the list in place. Uses up to 8 threads."""
    targets = [(i, a["url"]) for i, a in enumerate(articles) if not a.get("image") and a.get("url")]
    if not targets:
        return
    with ThreadPoolExecutor(max_workers=16) as pool:
        futures = {pool.submit(_fetch_og_image, url): idx for idx, url in targets}
        for future in as_completed(futures):
            idx = futures[future]
            try:
                img = future.result()
                if img:
                    articles[idx]["image"] = img
            except Exception:
                pass


# ── Per-source scrapers ──────────────────────────────────────────────────────

def _fetch_rss(source: Dict) -> List[Dict]:
    """Fetch and parse an RSS/Atom feed. Returns list of article dicts."""
    from services.company_news_scraper import _source_to_clearbit_domain
    articles: List[Dict] = []
    max_items = source.get("max_items", 20)
    try:
        resp = requests.get(source["url"], headers=HEADERS, timeout=REQUEST_TIMEOUT)
        resp.raise_for_status()
        feed = feedparser.parse(resp.content)

        src_name   = source["name"]
        src_domain = _source_to_clearbit_domain(src_name)
        src_logo   = f"https://logo.clearbit.com/{src_domain}" if src_domain else ""

        for entry in feed.entries[:max_items]:
            title = getattr(entry, "title", "").strip()
            url = getattr(entry, "link", "").strip()
            if not title or not url:
                continue
            summary = _extract_summary(entry)
            src_lang   = source.get("language", "en")
            src_region = source.get("region", "global")
            # For global sources try to narrow down region from content
            region = (detect_region_from_text(title, summary) or src_region) if src_region == "global" else src_region
            raw_score = compute_relevance_score(title, summary)
            weight    = _SOURCE_DEFENSE_WEIGHT.get(src_name, 1.0)
            articles.append({
                "title":          title,
                "url":            url,
                "image":          _extract_image_from_entry(entry),
                "summary":        summary,
                "source":         src_name,
                "realSource":     src_name,
                "sourceLogo":     src_logo,
                "publishedAt":    _parse_entry_date(entry),
                "category":       assign_category(title, summary),
                "relevanceScore": int(raw_score * weight),
                "language":       src_lang,
                "region":         region,
                "companies":      detect_companies(title, summary),
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
                "companies":      detect_companies(title, ""),
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
                "companies":      detect_companies(title, ""),
            })

        logger.info("[Janes] Scraped %d articles", len(articles))
    except Exception as exc:
        logger.error("[Janes] HTML scrape failed: %s", exc)

    return articles


def _scrape_defensepost() -> List[Dict]:
    """
    Scrape The Defense Post homepage + page 2 for broader coverage.
    Selectors derived from Jannah/TieTheme WordPress template:
      • li.post-item           — article container
      • a.post-thumb           — thumbnail link carrying the article URL + image
      • h2.post-title a        — title and canonical URL
      • span.date.meta-item    — publication date text
      • p.post-excerpt         — optional excerpt (featured article only)
    """
    articles: List[Dict] = []
    seen_urls: set = set()

    for page_url in ["https://thedefensepost.com/", "https://thedefensepost.com/page/2/"]:
        try:
            resp = requests.get(page_url, headers=HEADERS, timeout=REQUEST_TIMEOUT)
            resp.raise_for_status()
            soup = BeautifulSoup(resp.text, "html.parser")
            items = soup.select("li.post-item")

            for item in items[:40]:
                title_tag = item.select_one("h2.post-title a") or item.select_one("h3.post-title a")
                if not title_tag:
                    continue

                title = title_tag.get_text(strip=True)
                href  = title_tag.get("href", "").strip()
                if not title or not href.startswith("http") or href in seen_urls:
                    continue
                seen_urls.add(href)

                # Image — prefer the post-thumb img (higher resolution)
                image_url: Optional[str] = None
                thumb = item.select_one("a.post-thumb img")
                if thumb:
                    srcset = thumb.get("srcset", "")
                    if srcset:
                        srcs = [s.strip().split(" ")[0] for s in srcset.split(",") if s.strip()]
                        image_url = srcs[-1] if srcs else None
                    if not image_url:
                        image_url = thumb.get("src") or thumb.get("data-src")

                # Date
                pub_date = datetime.now(timezone.utc)
                date_el = item.select_one("span.date") or item.select_one(".meta-item.tie-icon")
                if date_el:
                    dt_text = date_el.get_text(strip=True)
                    try:
                        from datetime import datetime as _dt
                        pub_date = _dt.strptime(dt_text, "%B %d, %Y").replace(tzinfo=timezone.utc)
                    except Exception:
                        pass

                # Excerpt
                summary = ""
                excerpt_el = item.select_one("p.post-excerpt")
                if excerpt_el:
                    summary = excerpt_el.get_text(strip=True)[:300]

                region = detect_region_from_text(title, summary) or "global"
                articles.append({
                    "title":          title,
                    "url":            href,
                    "image":          image_url,
                    "summary":        summary,
                    "source":         "The Defense Post",
                    "publishedAt":    pub_date,
                    "category":       assign_category(title, summary),
                    "relevanceScore": compute_relevance_score(title, summary),
                    "language":       "en",
                    "region":         region,
                    "companies":      detect_companies(title, summary),
                })

        except Exception as exc:
            logger.error("[The Defense Post] HTML scrape failed (%s): %s", page_url, exc)

    logger.info("[The Defense Post] Scraped %d articles across pages", len(articles))
    return articles


# ── RSS source registry ──────────────────────────────────────────────────────

RSS_SOURCES: List[Dict] = [
    # ── Defense specialty — English (tier 1 — no score minimum, max items boosted) ──
    {"name": "The Defense Post",          "url": "https://thedefensepost.com/feed/",                                          "language": "en", "region": "global",  "max_items": 60},
    {"name": "Breaking Defense",          "url": "https://breakingdefense.com/feed/",                                         "language": "en", "region": "us",      "max_items": 50},
    {"name": "Defense News",              "url": "https://www.defensenews.com/arc/outboundfeeds/rss/",                        "language": "en", "region": "us",      "max_items": 50},
    {"name": "The War Zone",              "url": "https://www.thedrive.com/the-war-zone/feed",                                "language": "en", "region": "global",  "max_items": 50},
    {"name": "Defense One",               "url": "https://www.defenseone.com/rss/all/",                                       "language": "en", "region": "us",      "max_items": 40},
    {"name": "Defense Industry Daily",    "url": "https://www.defenseindustrydaily.com/feed/",                                "language": "en", "region": "us",      "max_items": 40},
    {"name": "USNI News",                 "url": "https://news.usni.org/feed",                                                "language": "en", "region": "us",      "max_items": 40},
    {"name": "Task & Purpose",            "url": "https://taskandpurpose.com/feed/",                                          "language": "en", "region": "us",      "max_items": 30},
    {"name": "Aviation Week",             "url": "https://aviationweek.com/rss/defense-space",                                "language": "en", "region": "global",  "max_items": 40},
    {"name": "Army Technology",           "url": "https://www.army-technology.com/feed/",                                     "language": "en", "region": "global",  "max_items": 35},
    {"name": "Naval Technology",          "url": "https://www.naval-technology.com/feed/",                                    "language": "en", "region": "global",  "max_items": 35},
    {"name": "Airforce Technology",       "url": "https://www.airforce-technology.com/feed/",                                 "language": "en", "region": "global",  "max_items": 35},
    {"name": "C4ISRNET",                  "url": "https://www.c4isrnet.com/arc/outboundfeeds/rss/",                           "language": "en", "region": "us",      "max_items": 35},
    {"name": "National Defense Magazine", "url": "https://www.nationaldefensemagazine.org/rss/articles",                      "language": "en", "region": "us",      "max_items": 30},
    {"name": "SpaceNews",                 "url": "https://spacenews.com/feed/",                                               "language": "en", "region": "global",  "max_items": 30},
    {"name": "Air Force Magazine",        "url": "https://www.airforcemag.com/feed/",                                         "language": "en", "region": "us",      "max_items": 30},
    {"name": "Shephard Media",            "url": "https://www.shephardmedia.com/rss/news/",                                   "language": "en", "region": "global",  "max_items": 30},
    {"name": "Flight Global",             "url": "https://www.flightglobal.com/rss/",                                         "language": "en", "region": "global",  "max_items": 30},
    {"name": "The Aviationist",           "url": "https://theaviationist.com/feed/",                                          "language": "en", "region": "global",  "max_items": 40},
    {"name": "Naval News",                "url": "https://www.navalnews.com/feed/",                                           "language": "en", "region": "global",  "max_items": 35},
    {"name": "War on the Rocks",          "url": "https://warontherocks.com/feed/",                                           "language": "en", "region": "global",  "max_items": 30},
    {"name": "Real Clear Defense",        "url": "https://www.realcleardefense.com/rss/all.rss",                              "language": "en", "region": "global",  "max_items": 30},
    {"name": "Army Times",                "url": "https://www.armytimes.com/arc/outboundfeeds/rss/",                          "language": "en", "region": "us",      "max_items": 30},
    {"name": "Navy Times",                "url": "https://www.navytimes.com/arc/outboundfeeds/rss/",                          "language": "en", "region": "us",      "max_items": 30},
    {"name": "Air Force Times",           "url": "https://www.airforcetimes.com/arc/outboundfeeds/rss/",                     "language": "en", "region": "us",      "max_items": 30},
    {"name": "Marine Corps Times",        "url": "https://www.marinecorpstimes.com/arc/outboundfeeds/rss/",                  "language": "en", "region": "us",      "max_items": 20},
    {"name": "Stars and Stripes",         "url": "https://www.stripes.com/arc/outboundfeeds/rss/",                           "language": "en", "region": "us",      "max_items": 30},
    {"name": "Foreign Policy",            "url": "https://foreignpolicy.com/feed/",                                          "language": "en", "region": "global",  "max_items": 20},
    {"name": "Bellingcat",                "url": "https://www.bellingcat.com/feed/",                                          "language": "en", "region": "global",  "max_items": 20},
    {"name": "UK Ministry of Defence",    "url": "https://www.gov.uk/government/organisations/ministry-of-defence.atom",     "language": "en", "region": "europe",  "max_items": 20},
    # ── Defense acquisition & programs — English ────────────────────────────
    # Warrior Maven: procurement, programs, Pentagon budget analysis
    {"name": "Warrior Maven",            "url": "https://warriormaven.com/feed/",                                            "language": "en", "region": "us",      "max_items": 40},
    # DoD official news: contract awards, program announcements, policy
    {"name": "DoD News",                 "url": "https://www.defense.gov/News/RSS/",                                         "language": "en", "region": "us",      "max_items": 30},
    # Federal News Network: acquisition policy, Pentagon contracts, budget
    {"name": "Federal News Network",     "url": "https://federalnewsnetwork.com/category/defense-main/feed/",                "language": "en", "region": "us",      "max_items": 30},
    # Defense Aerospace: international programs, sales, contracts
    {"name": "Defense Aerospace",        "url": "https://www.defense-aerospace.com/rss.xml",                                 "language": "en", "region": "global",  "max_items": 30},
    # CSIS Defense360: strategic analysis, programs, acquisition policy
    {"name": "CSIS Defense",             "url": "https://defense360.csis.org/feed/",                                         "language": "en", "region": "global",  "max_items": 20},
    # ── Defense specialty — French ──────────────────────────────────────────
    {"name": "Opex360",                   "url": "https://www.opex360.com/feed/",                                             "language": "fr", "region": "europe",  "max_items": 30},
    {"name": "Meta-Défense",              "url": "https://meta-defense.fr/feed/",                                             "language": "fr", "region": "europe",  "max_items": 30},
    {"name": "Air & Cosmos",              "url": "https://www.air-cosmos.com/rss",                                            "language": "fr", "region": "europe",  "max_items": 30},
    {"name": "TTU",                       "url": "https://www.ttu.fr/feed/",                                                  "language": "fr", "region": "europe",  "max_items": 25},
    {"name": "Mer et Marine",             "url": "https://www.meretmarine.com/fr/rss.xml",                                   "language": "fr", "region": "europe",  "max_items": 25},
    # Forces Operations Blog — l'un des blogs défense français les plus actifs
    {"name": "Forces Operations",         "url": "https://forcesoperations.com/feed/",                                        "language": "fr", "region": "europe",  "max_items": 35},
    # Secret Défense — blog de Jean-Dominique Merchet (Libération), source de référence
    {"name": "Secret Défense",            "url": "https://secretdefense.blogs.liberation.fr/rss.xml",                        "language": "fr", "region": "europe",  "max_items": 25},
    # Lignes de Défense — blog Philippe Chapleau (Ouest-France), OPEX & équipements
    {"name": "Lignes de Défense",         "url": "https://lignesdedefense.blogs.ouest-france.fr/rss.xml",                    "language": "fr", "region": "europe",  "max_items": 25},
    # Zone Militaire — blog de référence sur l'industrie et les opérations de défense françaises
    {"name": "Zone Militaire",            "url": "https://www.zoneMilitaire.com/feed/",                                       "language": "fr", "region": "europe",  "max_items": 40},
    # Ministère des Armées — communiqués officiels, contrats, nominations
    {"name": "Ministère des Armées",      "url": "https://www.defense.gouv.fr/actualites/rss.xml",                           "language": "fr", "region": "europe",  "max_items": 20},
    # Aerobuzz — actualité aéronautique et défense aérienne française
    {"name": "Aerobuzz",                  "url": "https://www.aerobuzz.fr/feed/",                                             "language": "fr", "region": "europe",  "max_items": 25},
    # EuroDéfense — think-tank franco-européen, politique et stratégie
    {"name": "EuroDéfense",               "url": "https://www.eurodefen.fr/feed/",                                            "language": "fr", "region": "europe",  "max_items": 15},
    # ── Mainstream — English ────────────────────────────────────────────────
    {"name": "BBC News",                  "url": "http://feeds.bbci.co.uk/news/world/rss.xml",                                "language": "en", "region": "global"},
    {"name": "The Guardian",              "url": "https://www.theguardian.com/world/rss",                                     "language": "en", "region": "global"},
    {"name": "The Guardian Defence",      "url": "https://www.theguardian.com/uk/defence-and-security/rss",                   "language": "en", "region": "global",  "max_items": 20},
    {"name": "Reuters Business",          "url": "https://feeds.reuters.com/reuters/businessNews",                            "language": "en", "region": "global"},
    # ── Mainstream — French ─────────────────────────────────────────────────
    # Le Monde: généraliste, poids défense faible — limité à 8 articles
    {"name": "Le Monde",                  "url": "https://www.lemonde.fr/rss/une.xml",                                        "language": "fr", "region": "europe", "max_items": 8},
    {"name": "Le Figaro",                 "url": "https://www.lefigaro.fr/rss/figaro_monde.xml",                              "language": "fr", "region": "europe"},
    # Le Point — bonne couverture défense/sécurité en France
    {"name": "Le Point",                  "url": "https://www.lepoint.fr/defense-et-securite/rss.xml",                        "language": "fr", "region": "europe", "max_items": 20},
    {"name": "Les Echos",                 "url": "https://www.lesechos.fr/arc/outboundfeeds/rss/",                            "language": "fr", "region": "europe"},
    # ── French business & industry press (M&A / finance / defense industry) ─
    # Usine Nouvelle: defense/aerospace section — targeted feed
    {"name": "Usine Nouvelle",            "url": "https://www.usinenouvelle.com/secteurs/aeronautique-et-defense.rss",        "language": "fr", "region": "europe", "max_items": 30},
    # Challenges: defense section + broader economy feed for M&A/budget coverage
    {"name": "Challenges",               "url": "https://www.challenges.fr/defense/rss.xml",                                 "language": "fr", "region": "europe"},
    {"name": "Challenges",               "url": "https://www.challenges.fr/economie/rss.xml",                                "language": "fr", "region": "europe"},
    {"name": "La Tribune",               "url": "https://www.latribune.fr/rss/industrie-et-innovation.rss",                  "language": "fr", "region": "europe"},
    {"name": "La Tribune Défense",        "url": "https://www.latribune.fr/rss/defense.rss",                                  "language": "fr", "region": "europe"},
    {"name": "L'Agefi",                  "url": "https://www.agefi.fr/rss/finance.rss",                                      "language": "fr", "region": "europe"},
    {"name": "Capital",                  "url": "https://www.capital.fr/rss",                                                 "language": "fr", "region": "europe"},
    {"name": "BFM Business",             "url": "https://bfmbusiness.bfmtv.com/rss/news-feed-bfmbusiness/",                  "language": "fr", "region": "europe"},
    # ── Additional English specialty ────────────────────────────────────────
    # Military.com — very popular US military news + benefits site
    {"name": "Military.com",             "url": "https://www.military.com/rss/daily-news",                                   "language": "en", "region": "us",      "max_items": 40},
    # Military Times (Sightline Media) — large military audience, pay/benefits + ops
    {"name": "Military Times",           "url": "https://www.militarytimes.com/arc/outboundfeeds/rss/",                      "language": "en", "region": "us",      "max_items": 30},
    # The Hill — Defense section; strong US policy/Congress defense coverage
    {"name": "The Hill Defense",         "url": "https://thehill.com/policy/defense/feed/",                                  "language": "en", "region": "us",      "max_items": 30},
    # ASPI Strategist — Australian Strategic Policy Institute, Indo-Pacific focus
    {"name": "ASPI Strategist",          "url": "https://www.aspistrategist.org.au/feed/",                                   "language": "en", "region": "asia-pacific", "max_items": 30},
    # Modern War Institute (West Point) — doctrine, strategy, military innovation
    {"name": "Modern War Institute",     "url": "https://mwi.westpoint.edu/feed/",                                           "language": "en", "region": "global",  "max_items": 20},
    # Small Wars Journal — COIN, special ops, irregular warfare
    {"name": "Small Wars Journal",       "url": "https://smallwarsjournal.com/blog/feed",                                    "language": "en", "region": "global",  "max_items": 20},
    # The Cipher Brief — intelligence community analysis
    {"name": "The Cipher Brief",         "url": "https://www.thecipherbrief.com/feed",                                      "language": "en", "region": "global",  "max_items": 20},
    # Just Security — national security law and policy
    {"name": "Just Security",            "url": "https://www.justsecurity.org/feed/",                                        "language": "en", "region": "us",      "max_items": 20},
    # Lawfare — national security law, technology policy
    {"name": "Lawfare",                  "url": "https://www.lawfaremedia.org/feed",                                         "language": "en", "region": "us",      "max_items": 20},
    # Forces.net — UK Royal British Legion, British military news
    {"name": "Forces.net",               "url": "https://www.forces.net/rss",                                                "language": "en", "region": "europe",  "max_items": 25},
    # DefenceWeb — South Africa, African defense + global arms market
    {"name": "DefenceWeb",               "url": "https://www.defenceweb.co.za/feed/",                                       "language": "en", "region": "africa",  "max_items": 25},
    # Euromaidan Press — Ukraine war, Russian military, Eastern Europe
    {"name": "Euromaidan Press",         "url": "https://euromaidanpress.com/feed/",                                         "language": "en", "region": "europe",  "max_items": 25},
    # Defense Express (Ukraine) — Ukrainian defense industry & battlefield reporting
    {"name": "Defense Express",          "url": "https://defence-ua.com/feed",                                               "language": "en", "region": "europe",  "max_items": 25},
    # Sandboxx — US military lifestyle, gear, technology stories
    {"name": "Sandboxx",                 "url": "https://www.sandboxx.us/news/feed/",                                        "language": "en", "region": "us",      "max_items": 20},
    # European Leadership Network — nuclear policy, arms control
    {"name": "ELN",                      "url": "https://www.europeanleadershipnetwork.org/feed/",                           "language": "en", "region": "europe",  "max_items": 15},
    # Arms Control Association — disarmament, treaties, proliferation
    {"name": "Arms Control",             "url": "https://www.armscontrol.org/taxonomy/term/1/feed",                          "language": "en", "region": "global",  "max_items": 15},
    # Stimson Center — international security think tank
    {"name": "Stimson Center",           "url": "https://www.stimson.org/feed/",                                             "language": "en", "region": "global",  "max_items": 15},
    # Kyiv Independent — Ukraine war ground-level reporting
    {"name": "Kyiv Independent",         "url": "https://kyivindependent.com/feed/",                                         "language": "en", "region": "europe",  "max_items": 20},
    # Defence Connect (Australia) — Australian defence industry procurement
    {"name": "Defence Connect",          "url": "https://www.defenceconnect.com.au/feed",                                    "language": "en", "region": "asia-pacific", "max_items": 25},
    # ── Premier tier additions ───────────────────────────────────────────────
    # ISW (Institute for the Study of War) — daily Ukraine/Russia sitreps, gold standard
    {"name": "ISW",                      "url": "https://www.understandingwar.org/feeds/all",                                "language": "en", "region": "europe",  "max_items": 30},
    # The Diplomat — leading Asia-Pacific security & geopolitics publication
    {"name": "The Diplomat",             "url": "https://thediplomat.com/feed/",                                             "language": "en", "region": "asia-pacific", "max_items": 30},
    # EurActiv Defence — EU defence policy, European defence industry
    {"name": "EurActiv Defence",         "url": "https://www.euractiv.com/section/defence-and-security/feed/",              "language": "en", "region": "europe",  "max_items": 30},
    # Politico National Security — US defence policy, Congress, Pentagon coverage
    {"name": "Politico Defense",         "url": "https://www.politico.com/rss/national-security.xml",                       "language": "en", "region": "us",      "max_items": 30},
    # Air & Space Forces Magazine — USAF & Space Force official magazine
    {"name": "Air & Space Forces",       "url": "https://www.airandspaceforces.com/feed/",                                  "language": "en", "region": "us",      "max_items": 30},
    # Defense & Aerospace Report — international programs, FMS, industry
    {"name": "Defense Aerospace Report", "url": "https://darreport.com/feed/",                                              "language": "en", "region": "global",  "max_items": 25},
]

HTML_SCRAPERS = [_scrape_nato, _scrape_janes, _scrape_defensepost]


# ── Google News RSS ──────────────────────────────────────────────────────────
# Each query searches Google's full news index and returns up to 20 fresh articles
# from any publisher — massive extra coverage at zero extra scraping effort.

_GOOGLE_NEWS_QUERIES: List[Dict] = [
    {"q": "defense contract award military procurement",       "region": "us"},
    {"q": "Pentagon DoD defense budget spending",              "region": "us"},
    {"q": "military aircraft fighter jet strike",              "region": "global"},
    {"q": "navy warship frigate destroyer submarine",          "region": "global"},
    {"q": "missile hypersonic weapons system defense",         "region": "global"},
    {"q": "NATO alliance military Europe Ukraine",             "region": "europe"},
    {"q": "defense technology drone autonomous cyber",         "region": "global"},
    {"q": "arms deal weapons export sale defense",             "region": "global"},
    {"q": "defense industry merger acquisition deal",          "region": "global"},
    {"q": "Lockheed Raytheon Northrop Boeing defense contract","region": "us"},
    {"q": "Rheinmetall BAE Thales Airbus Leonardo defense",    "region": "europe"},
    {"q": "space force satellite reconnaissance military",     "region": "global"},
    {"q": "electronic warfare radar stealth defense",          "region": "global"},
    {"q": "China Russia military threat defense",              "region": "asia-pacific"},
    {"q": "Israel IDF military Gaza air strike",               "region": "middle-east"},
    {"q": "India Pakistan military Asia defense",              "region": "asia-pacific"},
    {"q": "UK France Germany defence ministry military",       "region": "europe"},
    {"q": "Golden Dome Iron Dome missile defense shield",      "region": "us"},
    {"q": "Ukraine weapons artillery ammunition war",          "region": "europe"},
    {"q": "defense ministry Army Navy Air Force budget",       "region": "global"},
    # Earnings / financial results for defense & defense-tech companies
    {"q": "Palantir earnings results revenue quarterly",       "region": "us"},
    {"q": "Lockheed Raytheon Northrop Boeing earnings quarterly results", "region": "us"},
    {"q": "defense company earnings revenue quarterly results","region": "global"},
    {"q": "Anduril Kratos AeroVironment Mercury earnings",     "region": "us"},
]


def _fetch_google_news(query: str, region: str = "global", max_items: int = 20) -> List[Dict]:
    """Fetch Google News RSS for a defense search query.
    Titles arrive as 'Article headline - Publisher Name'; we split them."""
    from urllib.parse import quote as url_quote
    # Lazy import to avoid circular dependency (company_news_scraper imports news_scraper)
    from services.company_news_scraper import _source_to_clearbit_domain, _GOOGLE_NEWS_LOGO
    url = (
        f"https://news.google.com/rss/search"
        f"?q={url_quote(query)}&hl=en-US&gl=US&ceid=US:en"
    )
    articles: List[Dict] = []
    try:
        resp = requests.get(url, headers=HEADERS, timeout=REQUEST_TIMEOUT)
        resp.raise_for_status()
        feed = feedparser.parse(resp.content)

        for entry in feed.entries[:max_items]:
            raw_title = getattr(entry, "title", "").strip()
            article_url = getattr(entry, "link", "").strip()
            if not raw_title or not article_url:
                continue

            # Split "Headline - Publisher" (last segment only, keep short publisher names)
            title = raw_title
            real_source = "Google News"
            if " - " in raw_title:
                parts = raw_title.rsplit(" - ", 1)
                if len(parts) == 2 and len(parts[1]) <= 60:
                    title = parts[0].strip()
                    real_source = parts[1].strip()

            # feedparser sometimes has entry.source.title
            entry_src = getattr(entry, "source", None)
            if entry_src:
                src_title = getattr(entry_src, "title", "")
                if src_title:
                    real_source = src_title

            if real_source in _BLOCKED_SOURCES:
                continue

            summary = _extract_summary(entry)
            region_det = detect_region_from_text(title, summary) or region
            raw_score = compute_relevance_score(title, summary)
            weight = _SOURCE_DEFENSE_WEIGHT.get(real_source, 1.0)
            score = int(raw_score * weight)

            domain = _source_to_clearbit_domain(real_source) if real_source else ""
            source_logo = f"https://logo.clearbit.com/{domain}" if domain else _GOOGLE_NEWS_LOGO

            articles.append({
                "title":          title,
                "url":            article_url,
                "image":          _extract_image_from_entry(entry),
                "summary":        summary,
                "source":         real_source,
                "realSource":     real_source,
                "sourceLogo":     source_logo,
                "publishedAt":    _parse_entry_date(entry),
                "category":       assign_category(title, summary),
                "relevanceScore": score,
                "language":       "en",
                "region":         region_det,
                "companies":      detect_companies(title, summary),
            })

        # Resolve Google redirect URLs → real publisher URLs (correct favicon + dedup)
        if articles:
            with ThreadPoolExecutor(max_workers=10) as pool:
                url_futures = {
                    pool.submit(_resolve_redirect, a["url"]): i
                    for i, a in enumerate(articles)
                }
                for future in as_completed(url_futures):
                    idx = url_futures[future]
                    try:
                        resolved = future.result()
                        if resolved != articles[idx]["url"]:
                            articles[idx]["url"] = resolved
                    except Exception:
                        pass

        logger.info("[GNews:%s] Fetched %d articles", query[:45], len(articles))
    except Exception as exc:
        logger.error("[GNews:%s] Failed: %s", query[:45], exc)
    return articles


# ── Public API ───────────────────────────────────────────────────────────────

def scrape_all_sources() -> List[Dict]:
    """
    Scrape all configured sources in parallel and return raw article dicts.
    Never raises — failed sources are logged and skipped.

    All RSS feeds and HTML scrapers run concurrently (up to 25 workers).
    Google News RSS queries run in a second parallel batch (10 workers).
    This replaces the previous sequential loop which caused most sources to
    timeout or be skipped entirely, resulting in only a handful of articles.
    """
    all_articles: List[Dict] = []

    def _safe_rss(source: Dict) -> List[Dict]:
        try:
            return _fetch_rss(source)
        except Exception as exc:
            logger.error("[%s] Unexpected error: %s", source["name"], exc)
            return []

    def _safe_html(fn) -> List[Dict]:
        try:
            return fn()
        except Exception as exc:
            logger.error("HTML scraper %s unexpected error: %s", fn.__name__, exc)
            return []

    def _safe_gnews(item: Dict) -> List[Dict]:
        try:
            return _fetch_google_news(item["q"], item.get("region", "global"))
        except Exception as exc:
            logger.error("[GNews] Unexpected error: %s", exc)
            return []

    # ── Phase 1: all RSS feeds + HTML scrapers in parallel ────────────────
    with ThreadPoolExecutor(max_workers=25) as pool:
        rss_futures   = [pool.submit(_safe_rss, src) for src in RSS_SOURCES]
        html_futures  = [pool.submit(_safe_html, fn)  for fn  in HTML_SCRAPERS]
        for future in as_completed(rss_futures + html_futures):
            try:
                all_articles.extend(future.result())
            except Exception as exc:
                logger.error("Phase-1 scraper future error: %s", exc)

    # ── Phase 2: Google News RSS queries in parallel ───────────────────────
    with ThreadPoolExecutor(max_workers=10) as pool:
        gn_futures = [pool.submit(_safe_gnews, item) for item in _GOOGLE_NEWS_QUERIES]
        for future in as_completed(gn_futures):
            try:
                all_articles.extend(future.result())
            except Exception as exc:
                logger.error("Phase-2 Google News future error: %s", exc)

    logger.info("Total raw articles collected: %d", len(all_articles))

    # Sort by (relevance desc, date desc, source, title) BEFORE clustering.
    # as_completed() produces nondeterministic ordering across runs; cluster_articles
    # compares each article against cluster[0], so the representative and covered_by
    # list would differ between runs without a stable sort applied first.
    _epoch = datetime.min.replace(tzinfo=timezone.utc)
    all_articles.sort(key=lambda a: (
        -(a.get("relevanceScore") or 0),
        -(a.get("publishedAt", _epoch).timestamp() if isinstance(a.get("publishedAt"), datetime) else 0),
        a.get("source", ""),
        a.get("title", ""),
    ))

    # Enrich articles that have no image with OG image from article page
    missing_before = sum(1 for a in all_articles if not a.get("image"))
    _enrich_images(all_articles)
    missing_after = sum(1 for a in all_articles if not a.get("image"))
    logger.info("OG image enrichment: %d/%d articles enriched", missing_before - missing_after, missing_before)

    return all_articles
