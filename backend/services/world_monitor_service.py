"""
Fetches real-time conflict incidents from:
  - GDELT DOC 2.0 API (free, no key) — recent articles per conflict zone
  - ReliefWeb API (free, no key) — humanitarian alerts with country data

Results are cached in memory for 15 minutes to avoid hammering the APIs.
"""

import asyncio
import logging
import time
from datetime import datetime, timezone
from typing import Any

import requests

logger = logging.getLogger(__name__)

# ── In-memory cache ───────────────────────────────────────────────────────────
_cache: dict[str, Any] = {"data": [], "ts": 0}
CACHE_TTL = 900  # 15 minutes

# ── Country centroids (ISO2 → lat/lng) ────────────────────────────────────────
COUNTRY_CENTROIDS: dict[str, tuple[float, float]] = {
    "UA": (48.37, 31.17),
    "RU": (61.52, 105.32),
    "IL": (31.05, 34.85),
    "PS": (31.90, 35.20),
    "LB": (33.85, 35.86),
    "YE": (15.55, 48.52),
    "SD": (12.86, 30.22),
    "SS": (6.87, 31.31),
    "ET": (9.15, 40.49),
    "SO": (5.15, 46.20),
    "CD": (-4.03, 21.76),
    "ML": (17.57, -3.99),
    "BF": (12.36, -1.56),
    "NE": (17.61, 8.08),
    "NG": (9.08, 8.68),
    "MM": (21.91, 95.96),
    "AF": (33.93, 67.71),
    "SY": (34.80, 38.99),
    "IQ": (33.22, 43.68),
    "IR": (32.43, 53.69),
    "PK": (30.37, 69.35),
    "IN": (20.59, 78.96),
    "CN": (35.86, 104.19),
    "TW": (23.69, 120.96),
    "KP": (40.34, 127.51),
    "LY": (26.34, 17.23),
    "MZ": (-18.66, 35.53),
    "HT": (18.97, -72.29),
    "MX": (23.63, -102.55),
    "VE": (6.42, -66.59),
}

# ── Conflict zones for GDELT queries ─────────────────────────────────────────
CONFLICT_ZONES = [
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
        "region": "Taiwan Strait",
        "lat": 24.00, "lng": 120.96,
        "query": "taiwan china military PLA strait",
        "type": "political",
        "country": "TW",
    },
]

GDELT_DOC_URL = "https://api.gdeltproject.org/api/v2/doc/doc"
RELIEFWEB_URL = "https://api.reliefweb.int/v1/reports"


def _gdelt_fetch_zone(zone: dict) -> list[dict]:
    """Fetch recent GDELT articles for one conflict zone."""
    try:
        resp = requests.get(
            GDELT_DOC_URL,
            params={
                "query": zone["query"],
                "mode": "artlist",
                "maxrecords": "5",
                "timespan": "3d",
                "format": "JSON",
                "sourcelang": "english",
            },
            timeout=8,
        )
        resp.raise_for_status()
        data = resp.json()
        articles = data.get("articles", [])
        incidents = []
        for i, art in enumerate(articles[:3]):
            title = art.get("title", "").strip()
            if not title:
                continue
            # crude intensity: more recent = slightly higher
            intensity = 6 + (i == 0)
            incidents.append({
                "id": f"gdelt-{zone['country']}-{i}",
                "lat": zone["lat"] + (i * 0.15),   # slight offset to avoid stacking
                "lng": zone["lng"] + (i * 0.15),
                "type": zone["type"],
                "label": title[:120],
                "region": zone["region"],
                "intensity": intensity,
                "date": _parse_gdelt_date(art.get("seendate", "")),
                "source": art.get("domain", "GDELT"),
                "url": art.get("url", ""),
            })
        return incidents
    except Exception as e:
        logger.warning("GDELT fetch failed for %s: %s", zone["region"], e)
        return []


def _parse_gdelt_date(raw: str) -> str:
    """Convert GDELT seendate (20260602T123000Z) to YYYY-MM-DD."""
    try:
        return f"{raw[0:4]}-{raw[4:6]}-{raw[6:8]}"
    except Exception:
        return datetime.now(timezone.utc).strftime("%Y-%m-%d")


def _reliefweb_fetch() -> list[dict]:
    """Fetch humanitarian alerts from ReliefWeb."""
    try:
        resp = requests.post(
            RELIEFWEB_URL,
            json={
                "appname": "defense-intelligence-hub",
                "limit": 20,
                "sort": ["date:desc"],
                "fields": {
                    "include": ["title", "date.created", "country", "primary_country"]
                },
                "filter": {
                    "operator": "AND",
                    "conditions": [
                        {"field": "type.name", "value": "Situation Report"},
                    ],
                },
            },
            timeout=8,
        )
        resp.raise_for_status()
        items = resp.json().get("data", [])
        incidents = []
        for item in items:
            fields = item.get("fields", {})
            title = fields.get("title", "").strip()
            countries = fields.get("country", [])
            if not title or not countries:
                continue
            iso2 = countries[0].get("iso3", "")[:2].upper() if countries else ""
            centroid = COUNTRY_CENTROIDS.get(iso2)
            if not centroid:
                continue
            date_raw = fields.get("date", {}).get("created", "")
            date_str = date_raw[:10] if date_raw else datetime.now(timezone.utc).strftime("%Y-%m-%d")
            incidents.append({
                "id": f"rw-{item.get('id', '')}",
                "lat": centroid[0],
                "lng": centroid[1],
                "type": "humanitarian",
                "label": title[:120],
                "region": countries[0].get("name", iso2),
                "intensity": 5,
                "date": date_str,
                "source": "ReliefWeb",
                "url": "",
            })
        return incidents
    except Exception as e:
        logger.warning("ReliefWeb fetch failed: %s", e)
        return []


def fetch_incidents() -> list[dict]:
    """
    Return merged incidents from GDELT + ReliefWeb.
    Uses a 15-minute in-memory cache.
    """
    now = time.time()
    if _cache["data"] and (now - _cache["ts"]) < CACHE_TTL:
        return _cache["data"]

    logger.info("Refreshing World Monitor incident data...")
    all_incidents: list[dict] = []

    # GDELT: one request per conflict zone (sequential to be polite)
    for zone in CONFLICT_ZONES:
        all_incidents.extend(_gdelt_fetch_zone(zone))

    # ReliefWeb: single batch request
    all_incidents.extend(_reliefweb_fetch())

    # Assign sequential numeric IDs for the frontend
    for idx, inc in enumerate(all_incidents):
        inc["id"] = idx + 1

    _cache["data"] = all_incidents
    _cache["ts"] = now
    logger.info("World Monitor: %d incidents loaded", len(all_incidents))
    return all_incidents
