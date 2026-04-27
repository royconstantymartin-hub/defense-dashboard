"""
audit_sources.py — HTTP health check on all source_url fields in ma_activities.

Usage:
    python scripts/audit_sources.py
    python scripts/audit_sources.py --csv sources_audit.csv
    python scripts/audit_sources.py --fix-wayback    # replace 404s with Wayback snapshots

Environment: MONGO_URL, DB_NAME (or backend/.env)

Exit codes:
    0 — all checked, no blockers
    1 — one or more URLs returned 404/5xx with no Wayback fallback
"""

import argparse
import asyncio
import csv
import os
import re
import sys
import time
from datetime import datetime, timezone
from pathlib import Path

_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(_ROOT))

_env_file = _ROOT / ".env"
if _env_file.exists():
    for line in _env_file.read_text().splitlines():
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            k, _, v = line.partition("=")
            os.environ.setdefault(k.strip(), v.strip())

MONGO_URL = os.environ.get("MONGO_URL", "mongodb://localhost:27017")
DB_NAME   = os.environ.get("DB_NAME",   "defense_dashboard")

_PAYWALL_MARKERS = [
    "subscribe", "subscription required", "register to read",
    "sign in to read", "premium content", "members only",
]

_TIMEOUT = 12   # seconds per request
_DELAY   = 0.3  # polite delay between requests (seconds)

# ANSI colours (disabled if not a tty)
_TTY = sys.stdout.isatty()
def _green(s):  return f"\033[92m{s}\033[0m" if _TTY else s
def _amber(s):  return f"\033[93m{s}\033[0m" if _TTY else s
def _red(s):    return f"\033[91m{s}\033[0m" if _TTY else s
def _grey(s):   return f"\033[90m{s}\033[0m" if _TTY else s


def _head(session, url: str) -> dict:
    """
    Synchronous HEAD (then GET if HEAD disallowed). Returns:
      status (int), final_url (str after redirects), is_paywall (bool), error (str|None)
    """
    import requests
    headers = {"User-Agent": "Mozilla/5.0 (compatible; DefenseDashboardBot/1.0)"}
    try:
        r = session.head(url, timeout=_TIMEOUT, allow_redirects=True, headers=headers)
        if r.status_code == 405:
            r = session.get(url, timeout=_TIMEOUT, stream=True, headers=headers)

        body_sample = ""
        if r.status_code == 200:
            # Read first 2 KB to detect paywall markers
            body_sample = r.text[:2048].lower() if hasattr(r, "text") else ""

        is_paywall = any(m in body_sample for m in _PAYWALL_MARKERS) if body_sample else False
        return {
            "status": r.status_code,
            "final_url": r.url,
            "is_paywall": is_paywall,
            "error": None,
        }
    except Exception as exc:
        return {
            "status": 0,
            "final_url": url,
            "is_paywall": False,
            "error": str(exc)[:120],
        }


def _wayback_latest(url: str) -> str | None:
    """Try to find a Wayback Machine snapshot for the given URL. Returns snapshot URL or None."""
    import requests
    try:
        api = f"https://archive.org/wayback/available?url={url}"
        r = requests.get(api, timeout=10)
        data = r.json()
        snap = data.get("archived_snapshots", {}).get("closest", {})
        if snap.get("available") and snap.get("url"):
            return snap["url"]
    except Exception:
        pass
    return None


async def run(csv_path: str | None, fix_wayback: bool) -> int:
    import requests
    from motor.motor_asyncio import AsyncIOMotorClient

    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]

    deals = await db.ma_activities.find(
        {"source_url": {"$exists": True, "$ne": None, "$ne": ""}},
        {"_id": 0, "id": 1, "acquirer": 1, "target": 1, "source_url": 1, "announced_date": 1},
    ).to_list(5000)

    print(f"\nChecking {len(deals)} deals with source URLs…\n")

    rows = []
    blockers = 0

    with requests.Session() as sess:
        for i, deal in enumerate(deals, 1):
            url = deal.get("source_url", "")
            if not url or not url.startswith("http"):
                continue

            result = _head(sess, url)
            status = result["status"]
            final_url = result["final_url"]
            is_paywall = result["is_paywall"]
            error = result["error"]

            # Classify
            if error:
                verdict = "ERROR"
                colour = _red
            elif status == 200 and is_paywall:
                verdict = "PAYWALL"
                colour = _amber
            elif status == 200:
                verdict = "OK"
                colour = _green
            elif status in (301, 302, 308):
                verdict = "REDIRECT"
                colour = _amber
            elif status == 0:
                verdict = "TIMEOUT"
                colour = _red
            elif status in (404, 410):
                verdict = "DEAD"
                colour = _red
            elif status >= 400:
                verdict = f"HTTP_{status}"
                colour = _red
            else:
                verdict = f"HTTP_{status}"
                colour = _amber

            wayback = None
            if verdict in ("DEAD", "TIMEOUT", "ERROR") and fix_wayback:
                wayback = _wayback_latest(url)

            # Print progress line
            deal_label = f"{deal.get('acquirer','?')[:30]} → {deal.get('target','?')[:25]}"
            print(f"  [{i:>3}/{len(deals)}] {colour(verdict):12}  {deal_label:<58} {_grey(url[:60])}")
            if wayback:
                print(f"           {_amber('↩ Wayback:')} {wayback}")

            if verdict in ("DEAD", "TIMEOUT", "ERROR"):
                blockers += 1

            rows.append({
                "deal_id":      deal.get("id", ""),
                "acquirer":     deal.get("acquirer", ""),
                "target":       deal.get("target", ""),
                "announced":    deal.get("announced_date", ""),
                "source_url":   url,
                "http_status":  status,
                "verdict":      verdict,
                "redirect_to":  final_url if final_url != url else "",
                "is_paywall":   is_paywall,
                "wayback_url":  wayback or "",
                "error":        error or "",
                "action":       (
                    "USE_WAYBACK" if wayback else
                    "NEEDS_REPLACEMENT" if verdict in ("DEAD", "TIMEOUT", "ERROR") else
                    "CHECK_REDIRECT" if verdict == "REDIRECT" else
                    "FLAG_PAYWALL" if verdict == "PAYWALL" else
                    "OK"
                ),
            })

            # Optionally patch the source_url with Wayback snapshot
            if fix_wayback and wayback and verdict in ("DEAD", "TIMEOUT", "ERROR"):
                await db.ma_activities.update_one(
                    {"id": deal.get("id")},
                    {"$set": {"source_url": wayback}},
                )

            time.sleep(_DELAY)

    print()
    ok_count   = sum(1 for r in rows if r["verdict"] == "OK")
    dead_count = sum(1 for r in rows if r["verdict"] in ("DEAD", "TIMEOUT", "ERROR"))
    pw_count   = sum(1 for r in rows if r["verdict"] == "PAYWALL")
    redir_count = sum(1 for r in rows if r["verdict"] == "REDIRECT")

    print(f"{'='*60}")
    print(f"  {_green('OK')}       : {ok_count}")
    print(f"  {_amber('PAYWALL')} : {pw_count}")
    print(f"  {_amber('REDIRECT')}: {redir_count}")
    print(f"  {_red('DEAD/ERR')}: {dead_count}")
    print(f"{'='*60}\n")

    if csv_path:
        fieldnames = rows[0].keys() if rows else []
        with open(csv_path, "w", newline="", encoding="utf-8") as f:
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(rows)
        print(f"  CSV written → {csv_path}\n")

    client.close()
    return 1 if blockers else 0


def main() -> None:
    parser = argparse.ArgumentParser(description="Audit HTTP status of all deal source URLs")
    parser.add_argument("--csv",          metavar="PATH", help="Write CSV report to PATH")
    parser.add_argument("--fix-wayback",  action="store_true",
                        help="Replace 404/dead URLs with Wayback Machine snapshots in DB")
    args = parser.parse_args()

    exit_code = asyncio.run(run(csv_path=args.csv, fix_wayback=args.fix_wayback))
    sys.exit(exit_code)


if __name__ == "__main__":
    main()
