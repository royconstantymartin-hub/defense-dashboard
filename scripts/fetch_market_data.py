#!/usr/bin/env python3
"""
Daily market data fetcher for defense companies.
Reads data/companies.json, fetches prices from Yahoo Finance, writes data/market-data.json.

Usage:
    pip install yfinance
    python scripts/fetch_market_data.py
"""

import json
import time
import os
import sys
from datetime import datetime, timezone

try:
    import yfinance as yf
except ImportError:
    print("Error: yfinance not installed. Run: pip install yfinance")
    sys.exit(1)

# Paths
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
REPO_ROOT = os.path.dirname(SCRIPT_DIR)
DATA_DIR = os.path.join(REPO_ROOT, "data")
COMPANIES_PATH = os.path.join(DATA_DIR, "companies.json")
OUTPUT_PATH = os.path.join(DATA_DIR, "market-data.json")

# Rate limiting: pause between requests to avoid getting blocked
DELAY_SECONDS = 0.4

def fetch_company(company: dict) -> dict | None:
    yt = company["yf_ticker"]
    display_ticker = company["ticker"]
    try:
        ticker_obj = yf.Ticker(yt)
        hist = ticker_obj.history(period="5d")

        if hist.empty:
            print(f"  ✗ {yt}: no price data")
            return None

        closes = hist["Close"].dropna()
        if len(closes) == 0:
            print(f"  ✗ {yt}: no valid closes")
            return None
        elif len(closes) >= 2:
            price = float(closes.iloc[-1])
            prev = float(closes.iloc[-2])
            change_pct = round((price - prev) / prev * 100, 2)
        else:
            price = float(closes.iloc[0])
            change_pct = 0.0

        # Market cap via fast_info (avoids full info download)
        market_cap_b = 0.0
        try:
            fi = ticker_obj.fast_info
            raw_cap = getattr(fi, "market_cap", 0) or 0
            market_cap_b = round(raw_cap / 1e9, 2)
        except Exception:
            pass

        print(f"  ✓ {yt}: {price:.2f} ({change_pct:+.2f}%) mcap={market_cap_b:.1f}B")
        return {
            "ticker": display_ticker,
            "yf_ticker": yt,
            "price": round(price, 4),
            "change_pct": change_pct,
            "market_cap_b": market_cap_b,
            "currency": company.get("currency", "USD"),
        }

    except Exception as e:
        print(f"  ✗ {yt}: {e}")
        return None


def main():
    os.makedirs(DATA_DIR, exist_ok=True)

    with open(COMPANIES_PATH, encoding="utf-8") as f:
        companies = json.load(f)

    listed = [c for c in companies if c.get("listed", True)]
    print(f"Fetching {len(listed)} listed defense companies from Yahoo Finance...\n")

    results = []
    errors = []

    for i, company in enumerate(listed, 1):
        print(f"[{i}/{len(listed)}] {company['name']} ({company['yf_ticker']})")
        result = fetch_company(company)
        if result:
            results.append(result)
        else:
            errors.append(company["yf_ticker"])
        time.sleep(DELAY_SECONDS)

    output = {
        "updated_at": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "count": len(results),
        "errors": errors,
        "data": results,
    }

    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(output, f, indent=2, ensure_ascii=False)

    print(f"\n✓ Done. {len(results)}/{len(listed)} companies written to {OUTPUT_PATH}")
    if errors:
        print(f"  Failed: {', '.join(errors)}")


if __name__ == "__main__":
    main()
