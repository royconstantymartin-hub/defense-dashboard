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

# NOTE: feedparser / requests / bs4 are imported lazily inside the functions that
# need them (the network fetchers). This keeps the pure extraction/classification
# helpers (value parsing, deal_class, confidence) importable and unit-testable
# without the heavy/optional scraping dependencies installed.

logger = logging.getLogger(__name__)

REQUEST_TIMEOUT = 8

# ── C6 — Source health registry ────────────────────────────────────────────────
# In-memory health snapshot per feed, refreshed on every scrape. Lets the
# /health/sources endpoint surface dead feeds (e.g. a 404'ing RSS) and the
# real per-source yield, instead of trusting a static list that may be stale.
SOURCE_HEALTH: Dict[str, Dict] = {}

def _record_source_health(name: str, url: str, ok: bool, useful: int, error: Optional[str] = None) -> None:
    SOURCE_HEALTH[name] = {
        "name": name,
        "url": url,
        "ok": ok,
        "useful_signals": useful,
        "error": error,
        "checked_at": datetime.now(timezone.utc).isoformat(),
    }

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
    # ── US Primes ─────────────────────────────────────────────────────────────
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
    "kratos":                    ("US", "kratosdefense.com"),
    "heico":                     ("US", "heico.com"),
    "spirit aerosystems":        ("US", "spiritaero.com"),
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
    "imperva":                   ("US", "imperva.com"),
    "csra":                      ("US", "gd.com"),
    "engility":                  ("US", "leidos.com"),
    "esterline":                 ("US", "transdigm.com"),
    # ── US Defense Tech / New Primes ──────────────────────────────────────────
    "anduril":                   ("US", "anduril.com"),
    "anduril industries":        ("US", "anduril.com"),
    "palantir":                  ("US", "palantir.com"),
    "shield ai":                 ("US", "shield.ai"),
    "rebellion defense":         ("US", "rebelliondefense.com"),
    "epirus":                    ("US", "epirusinc.com"),
    "hawkeye 360":               ("US", "he360.com"),
    "dedrone":                   ("US", "dedrone.com"),
    "joby aviation":             ("US", "jobyaviation.com"),
    "archer aviation":           ("US", "archeraircraft.com"),
    "hermeus":                   ("US", "hermeus.com"),
    "sarcos technology":         ("US", "sarcos.com"),
    "true anomaly":              ("US", "trueanomaly.com"),
    "skydio":                    ("US", "skydio.com"),
    "joby defense":              ("US", "jobyaviation.com"),
    "ghost robotics":            ("US", "ghostrobotics.ai"),
    "apptronik":                 ("US", "apptronik.com"),
    "firestorm labs":            ("US", "firestormlabs.ai"),
    "capella space":             ("US", "capellaspace.com"),
    "iceye":                     ("FI", "iceye.com"),
    "planet labs":               ("US", "planet.com"),
    "spire global":              ("US", "spire.com"),
    "rocket lab":                ("US", "rocketlabusa.com"),
    "astra space":               ("US", "astra.com"),
    "relativity space":          ("US", "relativityspace.com"),
    "nuro":                      ("US", "nuro.ai"),
    "saildrone":                 ("US", "saildrone.com"),
    "xwing":                     ("US", "xwing.com"),
    "kitty hawk":                ("US", "kittyhawk.aero"),
    "nightwing":                 ("US", "nightwing.com"),
    # ── European Defense Tech ─────────────────────────────────────────────────
    "helsing":                   ("DE", "helsing.ai"),
    "milrem robotics":           ("EE", "milremrobotics.com"),
    "tekever":                   ("PT", "tekever.com"),
    "arquus":                    ("FR", "arquus-defense.com"),
    "cilas":                     ("FR", "cilas.com"),
    "mbda":                      ("FR", "mbda-systems.com"),
    "harmattan.ai":              ("FR", "harmattan.ai"),
    "preligens":                 ("FR", "preligens.com"),
    "unseenlabs":                ("FR", "unseenlabs.com"),
    "exail":                     ("FR", "exail.com"),
    "eca group":                 ("FR", "ecagroup.com"),
    "eurodrone":                 ("FR", "airbus.com"),
    "knds france":               ("FR", "knds.com"),   # FR subsidiary (ex-Nexter)
    "knds germany":              ("DE", "knds.com"),   # DE subsidiary (ex-KMW)
    "knds":                      ("DE", "knds.com"),   # default holding → DE
    "diehl":                     ("DE", "diehl.com"),
    "hensoldt":                  ("DE", "hensoldt.net"),
    "rheinmetall":               ("DE", "rheinmetall.com"),
    "proxima fusion":            ("DE", "proximafusion.com"),
    "aveillant":                 ("GB", "aveillant.com"),
    "malloy aeronautics":        ("GB", "malloyaeronautics.com"),
    "reaction engines":          ("GB", "reactionengines.co.uk"),
    "open cosmos":               ("GB", "open-cosmos.com"),
    "satavia":                   ("GB", "satavia.com"),
    # ── European Primes ───────────────────────────────────────────────────────
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
    "leonardo":                  ("IT", "leonardo.com"),
    "leonardo drs":              ("IT", "leonardodrs.com"),
    "saab":                      ("SE", "saabgroup.com"),
    "kongsberg":                 ("NO", "kongsberg.com"),
    "expal systems":             ("ES", "maxamcorp.com"),
    "gemalto":                   ("NL", "thalesgroup.com"),
    "bohemia interactive":       ("CZ", "bisimulations.com"),
    # ── Asia-Pacific & Other ──────────────────────────────────────────────────
    "hanwha":                    ("KR", "hanwha.com"),
    "hanwha ocean":              ("KR", "hanwha.com"),
    "israel aerospace":          ("IL", "iai.co.il"),
    "elbit":                     ("IL", "elbitsystems.com"),
    "rafael":                    ("IL", "rafael.co.il"),
    "rada electronic":           ("IL", "rada.com"),
    "daewoo shipbuilding":       ("KR", "hanwha.com"),
    "dsme":                      ("KR", "hanwha.com"),
    "edge group":                ("AE", "edgegroup.ae"),
    "arianegroup":               ("FR", "arianegroup.com"),
    "rbsl":                      ("GB", "rheinmetall.com"),
    "lig nex1":                  ("KR", "lignex1.com"),
    "fnss":                      ("TR", "fnss.com.tr"),
    "otokar":                    ("TR", "otokar.com.tr"),
    "aselsan":                   ("TR", "aselsan.com.tr"),
    "roketsan":                  ("TR", "roketsan.com.tr"),
    # ── Eurosatory / land-systems & munitions players ────────────────────────
    "eurenco":                   ("FR", "eurenco.com"),
    "mesko":                     ("PL", "pgz.pl"),
    "pgz":                       ("PL", "pgz.pl"),
    "czechoslovak group":        ("CZ", "csgroup.cz"),
    "csg":                       ("CZ", "csgroup.cz"),
    "electro optic systems":     ("AU", "eos-aus.com"),
    "marss":                     ("GB", "marss.com"),
    "roshel":                    ("CA", "roshel.com"),
    "patria":                    ("FI", "patriagroup.com"),
    "nexter":                    ("FR", "knds.com"),
    # ── Canada ───────────────────────────────────────────────────────────────
    "bombardier":                ("CA", "bombardier.com"),
}

# ── Dynamic company registry (C3-lite) ────────────────────────────────────────
# The hardcoded KNOWN_COMPANIES (~150 names) was the extraction bottleneck: any
# deal whose parties weren't in it was silently discarded, even though the app's
# defense_players collection knows 400+ companies with aliases. The server
# injects that live registry here before each scrape run.
EXTRA_COMPANIES: Dict[str, Tuple[Optional[str], Optional[str]]] = {}

def set_company_registry(extra: Dict[str, Tuple[Optional[str], Optional[str]]]) -> None:
    """Replace the dynamic registry (name_lower -> (iso2_or_None, domain_or_None))."""
    global EXTRA_COMPANIES
    # Never let short/generic keys poison substring matching.
    EXTRA_COMPANIES = {k: v for k, v in extra.items() if k and len(k) >= 4}
    logger.info("MA scraper registry: %d dynamic companies injected", len(EXTRA_COMPANIES))

def _registry_keys():
    return list(KNOWN_COMPANIES.keys()) + list(EXTRA_COMPANIES.keys())

# ── M&A keyword patterns for article filtering ────────────────────────────────

MA_TITLE_KEYWORDS = [
    # Traditional M&A
    "acqui", "merger", "acquires", "acquire", "buys", "buy out",
    "takeover", "joint venture", "strategic partnership", "combines with",
    "merges with", "consolidat",
    # Trade-show style deals (JV / teaming / MoU / partnerships)
    "teaming agreement", "cooperation agreement", "memorandum of understanding",
    "mou", "partners with", "teams up with", "teams with", "alliance",
    "forms joint venture", "sign agreement to establish",
    # Venture / startup funding
    "series a", "series b", "series c", "series d",
    "funding round", "raises", "seed round", "growth round",
    "invests in", "investment in", "minority stake",
    "takes stake", "equity stake", "strategic investment",
    "venture arm", "backed by", "portfolio company",
    # Structural deals
    "spinoff", "spin-off", "divestiture", "divests",
    "carve-out", "separates", "creates joint venture",
]

# ── Value extraction ──────────────────────────────────────────────────────────

_VALUE_RE = re.compile(
    r"\$\s*(?P<num>[\d,]+(?:\.\d+)?)\s*(?P<unit>billion|million|bn|m)\b",
    re.IGNORECASE,
)

def _parse_deal_value(text: str) -> float:
    """Extract deal value in millions USD from free text. Returns 0 if not found.

    Legacy helper kept for back-compat. New code must use
    _parse_deal_value_with_basis, which is context-anchored (C1).
    """
    val, _basis = _parse_deal_value_with_basis(text)
    return val

# ── C1 — Context-anchored value extraction ────────────────────────────────────
# The old behaviour took the FIRST "$X" in the article, which routinely captured a
# revenue figure or an unrelated contract value rather than the deal price. V2 only
# accepts an amount when it sits next to a transaction anchor, and reports HOW the
# figure should be read (value_basis), so the UI never shows a "naked" number.

# Keywords that, when found in the window around a "$X" amount, qualify what the
# figure represents. Order matters: a round/EV anchor wins over a generic equity one.
_BASIS_ANCHORS = {
    "round_amount": (
        "raise", "raised", "raises", "funding round", "in funding", "round",
        "series ", "seed", "investment of", "invests", "led by", "secures",
    ),
    "enterprise": (
        "enterprise value", "ev of", "including debt", "including assumed debt",
        "incl. debt", "on a cash-free", "debt-free basis",
    ),
    "equity": (
        "for $", "for an", "all-cash", "all cash", "cash deal", "valued at",
        "deal valued", "acquire", "acquisition", "buys", "to buy", "purchase",
        "takeover", "bid of", "offer of", "in equity", "equity value",
    ),
}

def _amount_to_millions(num_str: str, unit: str) -> float:
    num = float(num_str.replace(",", ""))
    return round(num * 1000, 1) if unit.lower() in ("billion", "bn") else round(num, 1)

def _parse_deal_value_with_basis(text: str) -> Tuple[float, str]:
    """Return (value_millions_usd, value_basis).

    value_basis ∈ {equity, enterprise, round_amount, undisclosed}.
    Returns (0.0, "undisclosed") when no amount is anchored to a transaction —
    a bare "$X" with no deal context is deliberately ignored.
    """
    lowered = text.lower()
    for m in _VALUE_RE.finditer(text):
        start, end = m.start(), m.end()
        window = lowered[max(0, start - 45): min(len(lowered), end + 15)]
        # round / EV anchors are more specific → test them before generic equity
        for basis in ("round_amount", "enterprise", "equity"):
            if any(anchor in window for anchor in _BASIS_ANCHORS[basis]):
                return _amount_to_millions(m.group("num"), m.group("unit")), basis
    return 0.0, "undisclosed"

# ── C4 — Deal class taxonomy ───────────────────────────────────────────────────
# Keeps M&A, joint ventures and venture funding in separate buckets so the UI can
# split them into distinct streams and the leaderboard never mixes acquisition
# prices with post-money valuations.

def classify_deal_class(deal_type: str, round_type: Optional[str] = None) -> str:
    """Map a granular deal_type to a high-level class: ma | jv | vc | ipo."""
    if deal_type == "ipo":
        return "ipo"
    if round_type or deal_type in ("funding_round", "strategic_investment", "minority_stake"):
        return "vc"
    if deal_type == "joint_venture":
        return "jv"
    return "ma"

# ── C1 — Deterministic confidence score ────────────────────────────────────────
# No paid model involved: the score is a transparent function of how much of the
# signal we could anchor to known facts. Surfaced to the user as a badge so a
# low-confidence auto-extraction is never mistaken for a verified deal.

def score_confidence(
    *,
    acq_known: bool,
    tgt_known: bool,
    value_basis: str,
    num_sources: int = 1,
    extraction_method: str = "regex",
) -> Tuple[float, str]:
    """Return (confidence_score 0..1, confidence_label high|medium|low)."""
    if extraction_method == "manual":
        return 0.95, "high"
    score = 0.30
    if acq_known:
        score += 0.20
    if tgt_known:
        score += 0.20
    if value_basis and value_basis != "undisclosed":
        score += 0.15
    if num_sources >= 2:
        score += 0.15
    # The UI promises "High = 2+ concordant primary sources". Honour it: an
    # auto-extraction corroborated by a single source can never exceed medium.
    if num_sources < 2:
        score = min(score, 0.79)
    score = round(min(score, 1.0), 2)
    label = "high" if score >= 0.8 else "medium" if score >= 0.55 else "low"
    return score, label

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
    if any(kw in t for kw in [
        "joint venture", "jv", "creates joint venture", "teaming agreement",
        "cooperation agreement", "memorandum of understanding", "mou",
        "strategic partnership", "partners with", "teams up with", "teams with",
        "alliance", "consortium",
    ]):
        return "joint_venture"
    if any(kw in t for kw in ["merger", "merges", "combines"]):
        return "merger"
    if any(kw in t for kw in [
        "series a", "series b", "series c", "series d",
        "seed round", "funding round", "raises", "growth round",
        "strategic investment", "backs", "backed by", "invests in",
        "investment in", "venture arm",
    ]):
        return "strategic_investment"
    if any(kw in t for kw in ["minority stake", "takes stake", "equity stake", "partial stake"]):
        return "minority_stake"
    if any(kw in t for kw in ["spinoff", "spin-off", "divestiture", "divests", "carve-out", "separates"]):
        return "acquisition"  # treated as acquisition of the spun-out entity
    return "acquisition"


def _infer_round_type(text: str) -> Optional[str]:
    """Extract VC round type from free text. Returns None if not a VC deal."""
    t = text.lower()
    if "seed" in t:
        return "seed"
    for label in ("series a", "series b", "series c", "series d", "series e"):
        if label in t:
            return label.replace(" ", "_")
    if any(kw in t for kw in ["growth round", "growth equity"]):
        return "growth"
    if any(kw in t for kw in ["buyout", "buy-out", "lbo"]):
        return "buyout"
    return None


def _infer_stake_percentage(text: str) -> Optional[float]:
    """Extract stake percentage from text, e.g. '15% stake', '~20%'."""
    m = re.search(r"~?\s*(\d{1,3}(?:\.\d+)?)\s*%\s*(?:stake|equity|interest|ownership)", text, re.IGNORECASE)
    if m:
        return float(m.group(1))
    return None

# ── Company name extraction ───────────────────────────────────────────────────

# STRICT patterns — reliable verbs ("acquires", "merges"). One party being a
# known defense company is enough, because the verb itself is unambiguous.
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

# LOOSE patterns — "X and Y form a joint venture / partnership / MoU". These verbs
# are weak (lots of false positives), so callers require BOTH parties to be known
# defense companies before trusting the match. Catches the JV/teaming/MoU deals
# that dominate trade shows like Eurosatory.
_LOOSE_PATTERNS = [
    # "X and Y form/sign/create ... joint venture | teaming agreement | partnership | MoU"
    re.compile(
        r"(?P<acquirer>[\w][\w\s\-&']+?)\s+(?:and|&|,)\s+"
        r"(?P<target>[\w][\w\s\-&']+?)\s+"
        r"(?:sign|signs|signed|form|forms|formed|create|creates|created|establish|establishes|"
        r"established|launch|launches|to form|to create|to establish|to launch|agree to form|"
        r"agree to establish|agree to create)\s+"
        r"(?:a\s+|an\s+|the\s+|new\s+)*"
        r"(?:joint venture|jv|teaming agreement|cooperation agreement|strategic partnership|"
        r"memorandum of understanding|mou|partnership|alliance|consortium)",
        re.IGNORECASE,
    ),
    # "X, Y sign agreement to establish/form/create ... (joint) venture"
    re.compile(
        r"(?P<acquirer>[\w][\w\s\-&']+?)\s*(?:and|&|,)\s+"
        r"(?P<target>[\w][\w\s\-&']+?)\s+"
        r"(?:sign|signs|signed|agree to sign|agree)\s+(?:an? )?agreement\s+to\s+"
        r"(?:establish|form|create|launch|set up)\b",
        re.IGNORECASE,
    ),
    # "X partners with / teams up with / signs partnership with / forms JV with Y"
    re.compile(
        r"(?P<acquirer>[\w][\w\s\-&']+?)\s+"
        r"(?:partners with|partner with|teams up with|teams with|team up with|"
        r"signs? (?:a |an )?(?:strategic )?partnership with|"
        r"signs? (?:a |an )?(?:cooperation |teaming )?agreement with|"
        r"forms? (?:a )?joint venture with|to form (?:a )?joint venture with|"
        r"signs? (?:an? )?mou with|signs? (?:a )?memorandum of understanding with)\s+"
        r"(?P<target>[\w][\w\s\-&']+?)(?:\s+for\b|\s+to\b|\s+at\b|\s+on\b|\.|\,|$)",
        re.IGNORECASE,
    ),
]

# ── Junk-name guard ───────────────────────────────────────────────────────────
# Rejects extracted "company" names that are obviously not companies: bare
# quantities ("over 10", "10,000 units"), descriptive nouns from headlines
# ("carmaker Renault" → the word "carmaker"), or generic placeholders.
_JUNK_NAME_RE = re.compile(
    r"^\s*(?:"
    r"\d[\d,\.]*"                                  # starts with a number ("10,000 units")
    r"|(?:over|under|about|around|nearly|up to|more than|at least|some)\b.*"
    r"|(?:the\s+)?(?:carmaker|automaker|car maker|truckmaker|truck maker|startup|"
    r"company|firm|group|maker|manufacturer|giant|specialist|supplier|venture|"
    r"consortium|alliance|partnership|government|ministry|army|navy|air force|"
    r"pentagon|nation|country|defense firms?|defence firms?)\b.*"
    r")\s*$",
    re.IGNORECASE,
)
# Descriptive prefixes to strip from a name before validating ("Carmaker Renault"
# → "Renault"), so a real company hidden behind a label is still recognised.
_DESCRIPTOR_PREFIX_RE = re.compile(
    r"^(?:the\s+)?(?:carmaker|automaker|car\s*maker|truckmaker|truck\s*maker|startup|"
    r"defen[cs]e\s+(?:firm|group|company|giant|champion)|french|german|british|italian|"
    r"american|us|uk|european|spanish|polish|swedish|israeli|korean|turkish|dutch)\s+",
    re.IGNORECASE,
)

def _clean_name(name: str) -> str:
    """Strip leading descriptors so 'Carmaker Renault' validates as 'Renault'."""
    prev = None
    out = name.strip()
    while prev != out:
        prev = out
        out = _DESCRIPTOR_PREFIX_RE.sub("", out).strip()
    return out

# Descriptor role words that appear at the END of a mis-extracted headline
# phrase, e.g. "underwater-drone maker" (real target: Exail), "AI startup",
# "radar manufacturer". Real company names are not built from these, so a name
# ending in one is a description the extractor grabbed instead of the name.
_TRAILING_DESC_RE = re.compile(
    r"[\s-](?:maker|makers|manufacturer|manufacturers|developer|developers|"
    r"specialist|specialists|producer|producers|supplier|suppliers|"
    r"start-?up|start-?ups|vendor|vendors|integrator|integrators)\s*$",
    re.IGNORECASE,
)

def _is_junk_name(name: str) -> bool:
    n = name.strip()
    return bool(_JUNK_NAME_RE.match(n)) or bool(_TRAILING_DESC_RE.search(n))

def _both_known(acq_l: str, tgt_l: str) -> bool:
    keys = _registry_keys()
    return (any(k in acq_l for k in keys)
            and any(k in tgt_l for k in keys))

def _one_known(acq_l: str, tgt_l: str) -> bool:
    keys = _registry_keys()
    return (any(k in acq_l for k in keys)
            or any(k in tgt_l for k in keys))

def _extract_companies(title: str, summary: str) -> Tuple[Optional[str], Optional[str]]:
    """
    Try to extract (acquirer, target) from title then summary.
    Returns (None, None) if extraction fails — callers must discard such signals.

    Strict patterns need only ONE known company; loose JV/partnership patterns
    need BOTH parties known to avoid the trade-show false positives that polluted
    the dataset (e.g. "Carmaker Renault teams with …", "… over 10 nations").
    """
    for text in (title, summary):
        for pat, need_both in ([(p, False) for p in _ACQ_PATTERNS]
                               + [(p, True) for p in _LOOSE_PATTERNS]):
            m = pat.search(text)
            if not m:
                continue
            acquirer = _clean_name(m.group("acquirer"))
            target = _clean_name(m.group("target"))
            # Basic sanity: both names should be > 2 chars and not junk
            if len(acquirer) <= 2 or len(target) <= 2:
                continue
            if _is_junk_name(acquirer) or _is_junk_name(target):
                continue
            acq_l = acquirer.lower()
            tgt_l = target.lower()
            ok = _both_known(acq_l, tgt_l) if need_both else _one_known(acq_l, tgt_l)
            if ok:
                return acquirer, target
    return None, None

# ── Non-M&A guard ─────────────────────────────────────────────────────────────
# A real M&A deal is one COMPANY acquiring another COMPANY. A sovereign state
# buying equipment ("Italy buys six Airbus-made A330 MRTT tankers") is procurement,
# NOT M&A — such signals must never be stored.

STATE_BUYERS = {
    "united states", "usa", "u.s.", "u.s", "america", "uk", "united kingdom",
    "britain", "italy", "france", "germany", "spain", "poland", "netherlands",
    "belgium", "sweden", "norway", "finland", "denmark", "greece", "turkey",
    "türkiye", "india", "japan", "south korea", "korea", "north korea",
    "australia", "canada", "israel", "saudi arabia", "uae", "qatar", "egypt",
    "brazil", "ukraine", "russia", "china", "taiwan", "nato", "european union",
    "eu", "pentagon", "switzerland", "austria", "portugal", "romania",
    "czech republic", "czechia", "hungary", "slovakia", "croatia", "indonesia",
    "philippines",
}
_GOV_BUYER_RE = re.compile(
    r"\b(ministry of defen[cs]e|department of defen[cs]e|\bdod\b|\bmod\b|"
    r"armed forces|air force|\bnavy\b|\barmy\b|government|military)\b",
    re.IGNORECASE,
)
_PROCUREMENT_RE = re.compile(
    r"\b(\d+|one|two|three|four|five|six|seven|eight|nine|ten|dozens?|fleet|squadron)\b.*"
    r"\b(tankers?|fighters?|jets?|aircraft|helicopters?|drones?|uavs?|missiles?|"
    r"frigates?|destroyers?|submarines?|corvettes?|warships?|vehicles?|tanks?|"
    r"howitzers?|radars?|satellites?|units?)\b",
    re.IGNORECASE,
)

def _is_state_or_procurement(acquirer: str, target: str) -> bool:
    """True if the signal is a state/government procurement rather than corporate M&A."""
    a = re.sub(r"^the\s+", "", acquirer.strip().lower())
    if a in STATE_BUYERS:
        return True
    if _GOV_BUYER_RE.search(acquirer):
        return True
    if _PROCUREMENT_RE.search(target):
        return True
    return False

def _lookup_company(name: str) -> Tuple[Optional[str], Optional[str]]:
    """Return (country_iso2, logo_domain) for a company name, or (None, None)."""
    n = name.lower()
    for key, val in KNOWN_COMPANIES.items():
        if key in n:
            return val
    for key, val in EXTRA_COMPANIES.items():
        if key in n:
            return val
    return None, None

def _is_registered(name: str) -> bool:
    n = name.lower()
    return any(k in n for k in _registry_keys())

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
    from bs4 import BeautifulSoup
    for attr in ("summary", "description"):
        val = getattr(entry, attr, None)
        if val:
            return BeautifulSoup(val, "html.parser").get_text(separator=" ", strip=True)[:500]
    return ""

def _is_ma_article(title: str, summary: str) -> bool:
    text = (title + " " + summary).lower()
    return any(kw in text for kw in MA_TITLE_KEYWORDS)

def _fetch_rss_ma(source_name: str, url: str) -> List[Dict]:
    import feedparser
    import requests
    signals: List[Dict] = []
    try:
        resp = requests.get(url, headers=HEADERS, timeout=REQUEST_TIMEOUT)
        resp.raise_for_status()
        feed = feedparser.parse(resp.content)

        for entry in feed.entries[:60]:
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

            # Safeguard: only real company → company acquisitions. Drop state
            # procurement (e.g. "Italy buys six A330 MRTT tankers").
            if _is_state_or_procurement(acquirer, target):
                logger.info("[%s] Skipping non-M&A procurement/state signal: %s → %s",
                            source_name, acquirer, target)
                continue

            acq_country, acq_logo = _lookup_company(acquirer)
            tgt_country, tgt_logo = _lookup_company(target)

            full_text = title + " " + summary
            deal_value, value_basis = _parse_deal_value_with_basis(full_text)
            status = _infer_status(full_text)
            deal_type = _infer_deal_type(full_text)
            round_type = _infer_round_type(full_text)
            stake_pct = _infer_stake_percentage(full_text)
            is_disclosed = deal_value > 0
            deal_class = classify_deal_class(deal_type, round_type)
            confidence_score, confidence = score_confidence(
                acq_known=_is_registered(acquirer),
                tgt_known=_is_registered(target),
                value_basis=value_basis,
                num_sources=1,
                extraction_method="regex",
            )

            # Description: first 120 chars of title (actual scraped text)
            description = title[:120]

            signals.append({
                "acquirer":             acquirer,
                "target":               target,
                "acquirer_norm":        _normalize_name(acquirer),
                "target_norm":          _normalize_name(target),
                "deal_value":           deal_value,
                "value_basis":          value_basis,       # C1 — how to read the number
                "currency":             "USD",
                "status":               status,
                "deal_type":            deal_type,
                "deal_class":           deal_class,        # C4 — ma | jv | vc
                "round_type":           round_type,
                "stake_percentage":     stake_pct,
                "is_disclosed":         is_disclosed,
                "confidence":           confidence,        # high | medium | low
                "confidence_score":     confidence_score,  # 0..1
                "extraction_method":    "regex",
                "verification_status":  "auto",
                "description":          description,
                "source_url":           link,   # always present — traceability guarantee
                "sources":              [{"url": link, "publisher": source_name,
                                          "published_at": _parse_entry_date(entry).isoformat()}],
                "rationale":            summary[:300] if summary else None,
                "announced_date":       _parse_entry_date(entry),
                "acquirer_country":     acq_country,
                "target_country":       tgt_country,
                "acquirer_logo_domain": acq_logo,
                "target_logo_domain":   tgt_logo,
            })

        logger.info("[%s] M&A signals extracted: %d", source_name, len(signals))
        _record_source_health(source_name, url, ok=True, useful=len(signals))
    except Exception as exc:
        logger.error("[%s] RSS M&A fetch failed: %s", source_name, exc)
        _record_source_health(source_name, url, ok=False, useful=0, error=str(exc))
    return signals

# ── RSS sources ───────────────────────────────────────────────────────────────

MA_RSS_SOURCES = [
    # ── Business/industry category feeds — highest M&A density per fetch ─────
    ("Defense Post Business",   "https://thedefensepost.com/category/business/feed/"),
    ("Defense News Industry",   "https://www.defensenews.com/arc/outboundfeeds/rss/category/industry/?outputType=xml"),
    # ── Core defense press ────────────────────────────────────────────────────
    ("Breaking Defense",        "https://breakingdefense.com/feed/"),
    ("Defense News",            "https://www.defensenews.com/arc/outboundfeeds/rss/"),
    ("Defense Post",            "https://thedefensepost.com/feed/"),
    ("C4ISRNET",                "https://www.c4isrnet.com/arc/outboundfeeds/rss/"),
    ("Defense One",             "https://www.defenseone.com/rss/all/"),
    ("The War Zone",            "https://www.thedrive.com/the-war-zone/feed"),
    ("DefenseScoop",            "https://defensescoop.com/feed/"),
    # ── Naval & maritime ─────────────────────────────────────────────────────
    ("USNI News",               "https://news.usni.org/feed"),
    ("Naval News",              "https://www.navalnews.com/feed/"),
    # ── Air & space ──────────────────────────────────────────────────────────
    ("SpaceNews",               "https://spacenews.com/feed/"),
    ("Air Force Magazine",      "https://www.airforcemag.com/feed/"),
    ("Aviation Week",           "https://aviationweek.com/rss.xml"),
    # ── European defense ─────────────────────────────────────────────────────
    ("Defence Industry Europe", "https://defence-industry.eu/feed/"),
    ("EDR Magazine",            "https://www.edrmagazine.eu/feed"),
    # ── Financial / M&A generalist ───────────────────────────────────────────
    # NOTE (C6): dead feeds are pruned based on /health/sources evidence, not
    # guesswork. Removed as confirmed dead by the live monitor: Reuters legacy,
    # FT home/uk, Defense Industry Daily, Army Recognition, Army Technology,
    # Shephard Media, Janes (paywalled), Intelligence Online (paywalled).
    ("Defense Daily",           "https://www.defensedaily.com/feed/"),
]

# ── Archive backfill (beyond RSS depth) ──────────────────────────────────────
# RSS feeds only expose the last ~20-60 articles. WordPress category pages are
# paginated (/category/business/page/N/), so we can walk the archive and feed
# each headline through the SAME extraction pipeline — historical depth for free.

BACKFILL_CATEGORY_PAGES = [
    ("Defense Post Business", "https://thedefensepost.com/category/business/"),
]

def _extract_signal_from_headline(source_name: str, title: str, link: str,
                                  published: Optional[datetime] = None) -> Optional[Dict]:
    """Run one headline through the full extraction pipeline. None if discarded."""
    if not _is_ma_article(title, ""):
        return None
    acquirer, target = _extract_companies(title, "")
    if not acquirer or not target:
        return None
    if _is_state_or_procurement(acquirer, target):
        return None
    acq_country, acq_logo = _lookup_company(acquirer)
    tgt_country, tgt_logo = _lookup_company(target)
    deal_value, value_basis = _parse_deal_value_with_basis(title)
    deal_type = _infer_deal_type(title)
    round_type = _infer_round_type(title)
    when = published or datetime.now(timezone.utc)
    confidence_score, confidence = score_confidence(
        acq_known=_is_registered(acquirer), tgt_known=_is_registered(target),
        value_basis=value_basis, num_sources=1, extraction_method="regex",
    )
    return {
        "acquirer": acquirer, "target": target,
        "acquirer_norm": _normalize_name(acquirer), "target_norm": _normalize_name(target),
        "deal_value": deal_value, "value_basis": value_basis, "currency": "USD",
        "status": _infer_status(title), "deal_type": deal_type,
        "deal_class": classify_deal_class(deal_type, round_type),
        "round_type": round_type, "stake_percentage": _infer_stake_percentage(title),
        "is_disclosed": deal_value > 0,
        "confidence": confidence, "confidence_score": confidence_score,
        "extraction_method": "regex", "verification_status": "auto",
        "description": title[:120], "source_url": link,
        "sources": [{"url": link, "publisher": source_name, "published_at": when.isoformat()}],
        "rationale": None, "announced_date": when,
        "acquirer_country": acq_country, "target_country": tgt_country,
        "acquirer_logo_domain": acq_logo, "target_logo_domain": tgt_logo,
    }

def scrape_category_backfill(pages: int = 10) -> List[Dict]:
    """Walk paginated WordPress category archives and extract M&A signals from
    headlines. Dates are unknown from listing pages, so announced_date falls
    back to now — acceptable for backfill rows, which remain confidence-capped."""
    import requests
    from bs4 import BeautifulSoup
    signals: List[Dict] = []
    for source_name, base in BACKFILL_CATEGORY_PAGES:
        for page in range(1, max(1, pages) + 1):
            url = base if page == 1 else f"{base.rstrip('/')}/page/{page}/"
            try:
                resp = requests.get(url, headers=HEADERS, timeout=REQUEST_TIMEOUT)
                if resp.status_code == 404:
                    break  # walked past the last page
                resp.raise_for_status()
                soup = BeautifulSoup(resp.text, "html.parser")
                seen_links = set()
                for a in soup.select("article a[href], h2 a[href], h3 a[href]"):
                    title = a.get_text(strip=True)
                    link = a.get("href", "")
                    if not title or len(title) < 25 or not link.startswith("http"):
                        continue
                    if link in seen_links:
                        continue
                    seen_links.add(link)
                    sig = _extract_signal_from_headline(source_name, title, link)
                    if sig:
                        signals.append(sig)
            except Exception as exc:
                logger.warning("[%s] backfill page %d failed: %s", source_name, page, exc)
                break
    logger.info("Category backfill: %d signals from %d source(s)", len(signals), len(BACKFILL_CATEGORY_PAGES))
    return signals

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
