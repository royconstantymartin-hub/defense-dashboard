"""
Free, keyless OSINT feed proxies for the World Monitor globe.

  - Aircraft: OpenSky Network anonymous API (~7-12k live ADS-B targets).
    Anonymous access is limited to ~100 full-globe requests/day per IP, so
    positions are cached server-side (one upstream call shared by every
    user) and refreshed at most every AIRCRAFT_TTL seconds.
  - Satellites: CelesTrak GP catalogue as raw TLE text (~12k active
    objects). Orbits change slowly; cached for TLE_TTL. Position
    propagation happens client-side (satellite.js).

Both endpoints serve the previous snapshot if an upstream fetch fails.
"""

import logging
import threading
import time
from typing import Any

import requests

logger = logging.getLogger(__name__)

OPENSKY_URL = "https://opensky-network.org/api/states/all"
CELESTRAK_URL = "https://celestrak.org/NORAD/elements/gp.php?GROUP=active&FORMAT=tle"

AIRCRAFT_TTL = 300      # 5 min — matches the frontend polling interval
TLE_TTL = 6 * 3600      # orbits drift slowly; 4 fetches/day is plenty

_aircraft_cache: dict[str, Any] = {"data": None, "ts": 0}
_tle_cache: dict[str, Any] = {"text": None, "ts": 0}
_aircraft_lock = threading.Lock()
_tle_lock = threading.Lock()

# Compact row layout (arrays, not objects) to keep the payload small:
AIRCRAFT_FIELDS = ["icao24", "callsign", "country", "lon", "lat", "alt_m", "vel_ms", "track", "on_ground"]


def get_aircraft() -> dict:
    """Live aircraft snapshot, cached AIRCRAFT_TTL seconds."""
    now = time.time()
    if _aircraft_cache["data"] and (now - _aircraft_cache["ts"]) < AIRCRAFT_TTL:
        return _aircraft_cache["data"]
    with _aircraft_lock:
        now = time.time()
        if _aircraft_cache["data"] and (now - _aircraft_cache["ts"]) < AIRCRAFT_TTL:
            return _aircraft_cache["data"]
        try:
            resp = requests.get(OPENSKY_URL, timeout=30)
            resp.raise_for_status()
            raw = resp.json()
            rows = []
            for s in raw.get("states") or []:
                lon, lat = s[5], s[6]
                if lon is None or lat is None:
                    continue
                rows.append([
                    s[0],
                    (s[1] or "").strip(),
                    s[2] or "",
                    round(lon, 4),
                    round(lat, 4),
                    round(s[7]) if s[7] is not None else None,
                    round(s[9]) if s[9] is not None else None,
                    round(s[10]) if s[10] is not None else None,
                    bool(s[8]),
                ])
            data = {"time": raw.get("time"), "fields": AIRCRAFT_FIELDS, "aircraft": rows}
            _aircraft_cache["data"] = data
            _aircraft_cache["ts"] = time.time()
            logger.info("OpenSky: %d aircraft cached", len(rows))
            return data
        except Exception as e:
            logger.warning("OpenSky fetch failed: %s", e)
            if _aircraft_cache["data"]:
                return _aircraft_cache["data"]
            raise


def get_satellites_tle() -> str:
    """Active-satellite TLE catalogue as text, cached TLE_TTL seconds."""
    now = time.time()
    if _tle_cache["text"] and (now - _tle_cache["ts"]) < TLE_TTL:
        return _tle_cache["text"]
    with _tle_lock:
        now = time.time()
        if _tle_cache["text"] and (now - _tle_cache["ts"]) < TLE_TTL:
            return _tle_cache["text"]
        try:
            resp = requests.get(CELESTRAK_URL, timeout=60)
            resp.raise_for_status()
            text = resp.text
            if "1 " not in text[:2000]:  # sanity: looks like TLE data
                raise ValueError("unexpected CelesTrak payload")
            _tle_cache["text"] = text
            _tle_cache["ts"] = time.time()
            logger.info("CelesTrak: %d KB of TLEs cached", len(text) // 1024)
            return text
        except Exception as e:
            logger.warning("CelesTrak fetch failed: %s", e)
            if _tle_cache["text"]:
                return _tle_cache["text"]
            raise
