"""
Stock price service using Yahoo Finance (yfinance).
Fetches live prices and historical data with an in-memory 1-hour cache.
"""
import asyncio
import logging
from datetime import datetime, timezone
from typing import Dict, List, Optional

import yfinance as yf

logger = logging.getLogger(__name__)

CACHE_TTL_SECONDS = 3600  # 1 hour

# In-memory caches
_price_cache: Dict[str, dict] = {}
_history_cache: Dict[str, dict] = {}

# Period mapping: our API period -> (yfinance period, interval)
PERIOD_MAP = {
    "1d": ("1d", "5m"),
    "1w": ("5d", "1h"),
    "1mo": ("1mo", "1d"),
    "1y": ("1y", "1wk"),
}


def _cache_valid(cache: dict, key: str) -> bool:
    if key not in cache:
        return False
    age = (datetime.now(timezone.utc) - cache[key]["fetched_at"]).total_seconds()
    return age < CACHE_TTL_SECONDS


# ---------------------------------------------------------------------------
# Sync helpers (run in thread executor to avoid blocking the event loop)
# ---------------------------------------------------------------------------

def _fetch_price_sync(ticker: str) -> Optional[dict]:
    """Return current price + daily change % for a single ticker."""
    try:
        t = yf.Ticker(ticker)
        info = t.fast_info
        price = info.last_price
        prev_close = info.previous_close
        if price and prev_close and prev_close > 0:
            change_pct = round(((price - prev_close) / prev_close) * 100, 2)
        else:
            change_pct = 0.0
        return {
            "ticker": ticker,
            "price": round(float(price), 2) if price else None,
            "change_percent": change_pct,
            "prev_close": round(float(prev_close), 2) if prev_close else None,
        }
    except Exception as exc:
        logger.warning("Price fetch failed for %s: %s", ticker, exc)
        return None


def _fetch_history_sync(ticker: str, period: str) -> Optional[List[dict]]:
    """Return OHLC close series for the requested period."""
    try:
        yf_period, interval = PERIOD_MAP.get(period, ("1d", "5m"))
        t = yf.Ticker(ticker)
        hist = t.history(period=yf_period, interval=interval)
        if hist is None or hist.empty:
            return []
        result = []
        for ts, row in hist.iterrows():
            result.append({
                "time": ts.isoformat(),
                "price": round(float(row["Close"]), 2),
            })
        return result
    except Exception as exc:
        logger.warning("History fetch failed for %s / %s: %s", ticker, period, exc)
        return None


# ---------------------------------------------------------------------------
# Async public API
# ---------------------------------------------------------------------------

async def get_stock_price(ticker: str) -> Optional[dict]:
    """Async: fetch (or return cached) current price data."""
    if _cache_valid(_price_cache, ticker):
        return _price_cache[ticker]["data"]

    loop = asyncio.get_event_loop()
    data = await loop.run_in_executor(None, _fetch_price_sync, ticker)
    if data is not None:
        _price_cache[ticker] = {"data": data, "fetched_at": datetime.now(timezone.utc)}
    return data


async def get_bulk_prices(tickers: List[str]) -> Dict[str, dict]:
    """Async: fetch prices for multiple tickers concurrently."""
    tasks = [get_stock_price(t) for t in tickers]
    results = await asyncio.gather(*tasks, return_exceptions=True)
    output: Dict[str, dict] = {}
    for ticker, result in zip(tickers, results):
        if isinstance(result, dict):
            output[ticker] = result
    return output


async def get_stock_history(ticker: str, period: str = "1d") -> Optional[List[dict]]:
    """Async: fetch (or return cached) price history."""
    cache_key = f"{ticker}_{period}"
    if _cache_valid(_history_cache, cache_key):
        return _history_cache[cache_key]["data"]

    loop = asyncio.get_event_loop()
    data = await loop.run_in_executor(None, _fetch_history_sync, ticker, period)
    if data is not None:
        _history_cache[cache_key] = {"data": data, "fetched_at": datetime.now(timezone.utc)}
    return data


def invalidate_cache():
    """Clear all cached data (useful for testing or forced refresh)."""
    _price_cache.clear()
    _history_cache.clear()
