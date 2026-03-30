"""
Stock price service using Yahoo Finance (yfinance).
Fetches live prices and historical data with an in-memory cache.
Price cache: 5 minutes. History cache: 5 min (1d), 15 min (others).
"""
import asyncio
import logging
from datetime import datetime, timezone
from typing import Dict, List, Optional

import yfinance as yf

logger = logging.getLogger(__name__)

PRICE_CACHE_TTL_SECONDS = 300      # 5 minutes
HISTORY_CACHE_TTL_1D_SECONDS = 300  # 5 minutes for intraday
HISTORY_CACHE_TTL_SECONDS = 900    # 15 minutes for weekly/monthly/yearly

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


def _cache_valid(cache: dict, key: str, ttl: int) -> bool:
    if key not in cache:
        return False
    age = (datetime.now(timezone.utc) - cache[key]["fetched_at"]).total_seconds()
    return age < ttl


# ---------------------------------------------------------------------------
# Sync helpers (run in thread executor to avoid blocking the event loop)
# ---------------------------------------------------------------------------

def _fetch_price_sync(ticker: str) -> Optional[dict]:
    """Return current price + daily change % for a single ticker.

    Uses yfinance history to get an accurate intraday price and the
    previous regular-market close so change_percent is never stale.
    """
    try:
        t = yf.Ticker(ticker)
        # Get last ~2 trading days of intraday data so we have both the
        # current price (last 1m/5m candle) and yesterday's close.
        hist = t.history(period="5d", interval="5m")
        if hist is None or hist.empty:
            return None

        # Normalize to UTC so comparisons are timezone-consistent
        if hist.index.tz is None:
            hist.index = hist.index.tz_localize("UTC")
        else:
            hist.index = hist.index.tz_convert("UTC")

        price = round(float(hist["Close"].iloc[-1]), 2)

        # Determine previous close: last Close of the calendar day before
        # the most recent candle.
        last_ts = hist.index[-1]
        last_date = last_ts.date()
        prev_day_data = hist[hist.index.date < last_date]
        if not prev_day_data.empty:
            prev_close = round(float(prev_day_data["Close"].iloc[-1]), 2)
        else:
            # Fallback to fast_info if history only covers today
            fi = t.fast_info
            pc = getattr(fi, "previous_close", None)
            prev_close = round(float(pc), 2) if pc else price

        change_pct = round(((price - prev_close) / prev_close) * 100, 2) if prev_close > 0 else 0.0

        return {
            "ticker": ticker,
            "price": price,
            "change_percent": change_pct,
            "prev_close": prev_close,
        }
    except Exception as exc:
        logger.warning("Price fetch failed for %s: %s", ticker, exc)
        return None


def _fetch_history_sync(ticker: str, period: str) -> Optional[List[dict]]:
    """Return close-price series for the requested period.

    All timestamps are normalised to UTC so the frontend can parse them
    unambiguously with new Date() regardless of the stock's exchange
    timezone (e.g. AIR.PA on Euronext Paris returns CET timestamps).
    """
    try:
        yf_period, interval = PERIOD_MAP.get(period, ("1d", "5m"))
        t = yf.Ticker(ticker)
        hist = t.history(period=yf_period, interval=interval)
        if hist is None or hist.empty:
            return []

        # Always convert index to UTC before serialising
        if hist.index.tz is None:
            hist.index = hist.index.tz_localize("UTC")
        else:
            hist.index = hist.index.tz_convert("UTC")

        result = []
        for ts, row in hist.iterrows():
            result.append({
                "time": ts.isoformat(),   # e.g. "2024-03-30T11:00:00+00:00"
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
    if _cache_valid(_price_cache, ticker, PRICE_CACHE_TTL_SECONDS):
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
    ttl = HISTORY_CACHE_TTL_1D_SECONDS if period == "1d" else HISTORY_CACHE_TTL_SECONDS
    if _cache_valid(_history_cache, cache_key, ttl):
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
