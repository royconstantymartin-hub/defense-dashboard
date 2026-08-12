"""
Stock price service using Yahoo Finance (yfinance).
Fetches live prices and historical data with an in-memory cache.
Price cache: 5 minutes. History cache: 5 min (1d), 15 min (others).
"""
import asyncio
import logging
import time
from datetime import datetime, timezone
from typing import Dict, List, Optional

import yfinance as yf

logger = logging.getLogger(__name__)

PRICE_CACHE_TTL_SECONDS = 300      # 5 minutes
HISTORY_CACHE_TTL_1D_SECONDS = 300  # 5 minutes for intraday
HISTORY_CACHE_TTL_SECONDS = 900    # 15 minutes for weekly/monthly/yearly

# Yahoo Finance throttles bursts of requests, so we cap how many tickers are
# fetched at the same time and retry each one a couple of times on failure.
MAX_CONCURRENT_FETCHES = 8
FETCH_RETRIES = 3

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
    """Return official last-close price + daily change % for a single ticker.

    Uses daily OHLCV history (interval=1d) so that both the price and
    the prev_close are the exchange's official closing auction prices —
    exactly what Yahoo Finance and Google Finance display.
    Using intraday (5m) candle closes for this calculation produced gaps
    because candle closes differ from the closing-auction price.

    Yahoo often answers a throttled request with an empty frame or an error
    instead of data, so we retry a few times with a short backoff before
    giving up — that is what turns "sometimes it doesn't load" into "it loads".
    """
    for attempt in range(FETCH_RETRIES):
        try:
            t = yf.Ticker(ticker)
            hist = t.history(period="5d", interval="1d")
            if hist is None or hist.empty:
                # Empty frame is usually a transient throttle: back off and retry.
                if attempt < FETCH_RETRIES - 1:
                    time.sleep(0.6 * (attempt + 1))
                    continue
                return None

            # Normalize index to UTC
            if hist.index.tz is None:
                hist.index = hist.index.tz_localize("UTC")
            else:
                hist.index = hist.index.tz_convert("UTC")

            price = round(float(hist["Close"].iloc[-1]), 2)
            prev_close = round(float(hist["Close"].iloc[-2]), 2) if len(hist) >= 2 else price
            change_pct = round(((price - prev_close) / prev_close) * 100, 2) if prev_close > 0 else 0.0
            open_price = round(float(hist["Open"].iloc[-1]), 2)
            change_since_open = round(((price - open_price) / open_price) * 100, 2) if open_price > 0 else 0.0
            # Weekly change: close 5 trading days ago → today (same 5d history already loaded)
            week_open = round(float(hist["Close"].iloc[0]), 2)
            week_change_pct = round(((price - week_open) / week_open) * 100, 2) if week_open > 0 else 0.0

            return {
                "ticker": ticker,
                "price": price,
                "change_percent": change_pct,
                "prev_close": prev_close,
                "open_price": open_price,
                "change_since_open": change_since_open,
                "week_change_percent": week_change_pct,
            }
        except Exception as exc:
            if attempt < FETCH_RETRIES - 1:
                time.sleep(0.6 * (attempt + 1))
                continue
            logger.warning("Price fetch failed for %s: %s", ticker, exc)
            return None
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
    """Async: fetch prices for multiple tickers with bounded concurrency.

    Firing 100+ requests at Yahoo Finance at once gets the whole batch
    throttled (empty responses). A semaphore caps how many tickers are
    fetched simultaneously so the batch stays under Yahoo's rate limit.
    Cached tickers pass through instantly and don't count against the limit
    in any meaningful way.
    """
    semaphore = asyncio.Semaphore(MAX_CONCURRENT_FETCHES)

    async def _guarded(ticker: str):
        async with semaphore:
            return await get_stock_price(ticker)

    tasks = [_guarded(t) for t in tickers]
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
