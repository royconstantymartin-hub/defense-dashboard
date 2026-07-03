"""
Fetches real-time conflict & crisis incidents from the GDELT DOC 2.0 API
(free, no API key) — recent press coverage per monitored zone.

ReliefWeb was dropped: its v1 API was decommissioned and v2 requires an
approved appname, so GDELT now also covers the humanitarian angle via
dedicated queries.

Reliability:
  - GDELT rate-limits per IP (~1 query / 5 s), so zone queries run
    SEQUENTIALLY with a politeness delay — never in parallel.
  - A refresh can therefore take a few minutes; it only ever runs in the
    background (scheduler job in server.py + on-demand warm-up thread).
    The API endpoint reads the cache without blocking.
  - A lock prevents concurrent refresh stampedes.
  - If a refresh comes back empty (API down), the previous snapshot is
    served instead of an empty page.
"""

import logging
import threading
import time
from datetime import datetime, timezone
from typing import Any

import requests

logger = logging.getLogger(__name__)

# ── In-memory cache ───────────────────────────────────────────────────────────
_cache: dict[str, Any] = {"data": [], "ts": 0}
_refresh_lock = threading.Lock()
CACHE_TTL = 900  # 15 minutes
REQUEST_TIMEOUT = 25  # seconds — GDELT can be slow to answer
REQUEST_DELAY = 6  # seconds between zone queries (GDELT rate limit)
RATE_LIMIT_BACKOFF = 20  # seconds to wait before the single retry after a 429

# ── Monitored zones for GDELT queries ─────────────────────────────────────────
# type: combat = ground fighting · strike = air/missile/drone campaigns
#       political = tensions/posturing · humanitarian = crisis & displacement
MONITORED_ZONES = [
    # ── Active hostilities ──
    {
        "region": "Ukraine",
        "lat": 48.37, "lng": 31.17,
        "query": "ukraine war russia military attack",
        "type": "combat",
        "country": "UA",
    },
    {
        "region": "Gaza Strip",
        "lat": 31.50, "lng": 34.47,
        "query": "gaza israel airstrike military",
        "type": "strike",
        "country": "PS",
    },
    {
        "region": "Lebanon",
        "lat": 33.85, "lng": 35.86,
        "query": "lebanon hezbollah israel border",
        "type": "strike",
        "country": "LB",
    },
    {
        "region": "Syria",
        "lat": 35.02, "lng": 38.50,
        "query": "syria military clashes strikes",
        "type": "combat",
        "country": "SY",
    },
    {
        "region": "Sudan",
        "lat": 15.55, "lng": 32.53,
        "query": "sudan RSF SAF war khartoum",
        "type": "combat",
        "country": "SD",
    },
    {
        "region": "Yemen",
        "lat": 15.35, "lng": 44.20,
        "query": "yemen houthi drone attack red sea",
        "type": "strike",
        "country": "YE",
    },
    {
        "region": "Myanmar",
        "lat": 21.91, "lng": 95.96,
        "query": "myanmar military junta resistance attack",
        "type": "combat",
        "country": "MM",
    },
    {
        "region": "DR Congo",
        "lat": -1.67, "lng": 29.22,
        "query": "congo DRC M23 eastern conflict",
        "type": "combat",
        "country": "CD",
    },
    {
        "region": "Sahel",
        "lat": 14.00, "lng": -2.00,
        "query": "mali burkina faso jihadist armed group attack",
        "type": "combat",
        "country": "ML",
    },
    {
        "region": "Somalia",
        "lat": 2.04, "lng": 45.34,
        "query": "somalia al-shabaab attack mogadishu",
        "type": "combat",
        "country": "SO",
    },
    {
        "region": "Haiti",
        "lat": 18.97, "lng": -72.29,
        "query": "haiti gang violence port-au-prince",
        "type": "combat",
        "country": "HT",
    },
    # ── Political / strategic tension ──
    {
        "region": "Taiwan Strait",
        "lat": 24.00, "lng": 120.96,
        "query": "taiwan china military PLA strait",
        "type": "political",
        "country": "TW",
    },
    {
        "region": "Korean Peninsula",
        "lat": 39.50, "lng": 127.00,
        "query": "north korea missile launch military",
        "type": "political",
        "country": "KP",
    },
    # ── Humanitarian crises ──
    {
        "region": "Sudan",
        "lat": 14.60, "lng": 30.80,
        "query": "sudan humanitarian famine displacement refugees",
        "type": "humanitarian",
        "country": "SD",
    },
    {
        "region": "Gaza Strip",
        "lat": 31.30, "lng": 34.30,
        "query": "gaza humanitarian aid crisis civilians",
        "type": "humanitarian",
        "country": "PS",
    },
    {
        "region": "Haiti",
        "lat": 19.30, "lng": -72.60,
        "query": "haiti humanitarian crisis displacement",
        "type": "humanitarian",
        "country": "HT",
    },
    {
        "region": "Afghanistan",
        "lat": 33.93, "lng": 67.71,
        "query": "afghanistan humanitarian crisis aid",
        "type": "humanitarian",
        "country": "AF",
    },
    {
        "region": "DR Congo",
        "lat": -2.60, "lng": 28.00,
        "query": "congo humanitarian displacement refugees",
        "type": "humanitarian",
        "country": "CD",
    },
]

GDELT_DOC_URL = "https://api.gdeltproject.org/api/v2/doc/doc"

# Intensity ladder per type: [lead article, 2nd, 3rd].
# Hostility zones with heavy press coverage get bumped to critical (8).
INTENSITY_LADDER = {
    "combat": [7, 6, 5],
    "strike": [7, 6, 5],
    "political": [6, 5, 4],
    "humanitarian": [6, 5, 4],
}


def _is_latin(text: str) -> bool:
    """Return True if the text is predominantly Latin-script (English, French, etc.)."""
    if not text:
        return False
    latin = sum(1 for c in text if ord(c) < 0x500)
    return latin / len(text) > 0.85


def _gdelt_fetch_zone(zone: dict, retried: bool = False) -> list[dict]:
    """Fetch recent GDELT articles for one monitored zone."""
    try:
        resp = requests.get(
            GDELT_DOC_URL,
            params={
                "query": zone["query"],
                "mode": "artlist",
                "maxrecords": "10",
                "timespan": "3d",
                "format": "JSON",
                "sourcelang": "english",
            },
            timeout=REQUEST_TIMEOUT,
        )
        if resp.status_code == 429 and not retried:
            time.sleep(RATE_LIMIT_BACKOFF)
            return _gdelt_fetch_zone(zone, retried=True)
        resp.raise_for_status()
        data = resp.json()
        articles = data.get("articles", [])
        ladder = list(INTENSITY_LADDER.get(zone["type"], [6, 5, 4]))
        # Heavy press coverage in the 3-day window = hotter zone
        if zone["type"] in ("combat", "strike") and len(articles) >= 8:
            ladder[0] = 8
        incidents = []
        kept = 0
        for art in articles:
            if kept >= 3:
                break
            title = art.get("title", "").strip()
            if not title or not _is_latin(title):
                continue
            incidents.append({
                "id": f"gdelt-{zone['country']}-{zone['type']}-{kept}",
                "lat": zone["lat"] + (kept * 0.15),
                "lng": zone["lng"] + (kept * 0.15),
                "type": zone["type"],
                "label": title[:120],
                "region": zone["region"],
                "intensity": ladder[kept],
                "date": _parse_gdelt_date(art.get("seendate", "")),
                "source": art.get("domain", "GDELT"),
                "url": art.get("url", ""),
            })
            kept += 1
        return incidents
    except Exception as e:
        logger.warning("GDELT fetch failed for %s (%s): %s", zone["region"], zone["type"], e)
        return []


def _parse_gdelt_date(raw: str) -> str:
    """Convert GDELT seendate (20260602T123000Z) to YYYY-MM-DD."""
    try:
        return f"{raw[0:4]}-{raw[4:6]}-{raw[6:8]}"
    except Exception:
        return datetime.now(timezone.utc).strftime("%Y-%m-%d")


def last_updated_iso() -> str | None:
    """ISO timestamp of the last successful refresh, or None."""
    if not _cache["ts"]:
        return None
    return datetime.fromtimestamp(_cache["ts"], tz=timezone.utc).isoformat()


def get_snapshot() -> dict:
    """
    Non-blocking read used by the API endpoint: returns whatever the cache
    holds right now. If the cache is empty (cold start), a background
    refresh is kicked off and status "warming" is returned so the frontend
    can show a "collecting data" state and retry shortly.
    """
    if _cache["data"]:
        return {
            "incidents": _cache["data"],
            "count": len(_cache["data"]),
            "updated": last_updated_iso(),
            "status": "ok",
        }
    start_background_refresh()
    return {"incidents": [], "count": 0, "updated": None, "status": "warming"}


def start_background_refresh() -> None:
    """Kick a refresh in a daemon thread unless one is already running."""
    if _refresh_lock.locked():
        return
    threading.Thread(target=lambda: fetch_incidents(force=True), daemon=True).start()


def fetch_incidents(force: bool = False) -> list[dict]:
    """
    Refresh + return merged incidents from all monitored zones.
    BLOCKING (several minutes worst case) — only call from background
    threads/jobs, never from the request path. `force=True` bypasses the
    TTL (used by the scheduler job).
    """
    now = time.time()
    if not force and _cache["data"] and (now - _cache["ts"]) < CACHE_TTL:
        return _cache["data"]

    with _refresh_lock:
        # Another thread may have refreshed while we waited for the lock —
        # if the data is fresher than a minute, don't hit GDELT again.
        if _cache["data"] and (time.time() - _cache["ts"]) < 60:
            return _cache["data"]

        logger.info("Refreshing World Monitor incident data (%d zones)...", len(MONITORED_ZONES))
        # Previous snapshot grouped by zone — reused for zones whose refresh
        # fails, so a partial outage never blanks part of the map.
        previous: dict[tuple, list[dict]] = {}
        for inc in _cache["data"]:
            previous.setdefault((inc["region"], inc["type"]), []).append(inc)

        all_incidents: list[dict] = []
        for i, zone in enumerate(MONITORED_ZONES):
            if i > 0:
                time.sleep(REQUEST_DELAY)  # respect GDELT's per-IP rate limit
            zone_incidents = _gdelt_fetch_zone(zone)
            if not zone_incidents:
                zone_incidents = previous.get((zone["region"], zone["type"]), [])
            all_incidents.extend(zone_incidents)

        if not all_incidents and _cache["data"]:
            logger.warning("World Monitor refresh empty — serving previous snapshot")
            return _cache["data"]

        # Assign sequential numeric IDs for the frontend
        for idx, inc in enumerate(all_incidents):
            inc["id"] = idx + 1

        _cache["data"] = all_incidents
        _cache["ts"] = time.time()
        logger.info("World Monitor: %d incidents loaded", len(all_incidents))
        return all_incidents
