import re
from datetime import datetime
from typing import Optional

import feedparser
import httpx
from fastapi import APIRouter, Query
from pydantic import BaseModel

router = APIRouter()

RSS_URL = "https://thedefensepost.com/feed"
SOURCE_NAME = "The Defense Post"


class Article(BaseModel):
    title: str
    link: str
    summary: str
    image: Optional[str] = None
    published: Optional[str] = None
    source: str


def _strip_html(html: str) -> str:
    return re.sub(r"<[^>]+>", "", html or "").strip()


def _extract_image(entry: dict) -> Optional[str]:
    # media:content
    media_content = entry.get("media_content", [])
    for m in media_content:
        url = m.get("url", "")
        if url:
            return url

    # media:thumbnail
    media_thumbnail = entry.get("media_thumbnail", [])
    for m in media_thumbnail:
        url = m.get("url", "")
        if url:
            return url

    # enclosures
    for enc in entry.get("enclosures", []):
        if enc.get("type", "").startswith("image/"):
            url = enc.get("href") or enc.get("url", "")
            if url:
                return url

    # <img> tag in summary/content
    raw = ""
    if entry.get("content"):
        raw = entry["content"][0].get("value", "")
    if not raw:
        raw = entry.get("summary", "")
    match = re.search(r'<img[^>]+src=["\']([^"\']+)["\']', raw)
    if match:
        return match.group(1)

    return None


def _format_date(entry: dict) -> Optional[str]:
    published_parsed = entry.get("published_parsed")
    if published_parsed:
        try:
            dt = datetime(*published_parsed[:6])
            return dt.strftime("%Y-%m-%d")
        except Exception:
            pass
    return entry.get("published")


@router.get("/recent-intel", response_model=list[Article])
async def recent_intel(limit: int = Query(default=12, ge=1, le=50)) -> list[Article]:
    async with httpx.AsyncClient(timeout=10.0) as client:
        response = await client.get(RSS_URL, headers={"User-Agent": "DefenseIntelHub/1.0"})
        response.raise_for_status()
        raw_xml = response.text

    feed = feedparser.parse(raw_xml)
    articles: list[Article] = []

    for entry in feed.entries[:limit]:
        title = _strip_html(entry.get("title", ""))
        link = entry.get("link", "")

        raw_summary = ""
        if entry.get("content"):
            raw_summary = entry["content"][0].get("value", "")
        if not raw_summary:
            raw_summary = entry.get("summary", "")
        summary = _strip_html(raw_summary)
        if len(summary) > 220:
            summary = summary[:217].rstrip() + "..."

        articles.append(
            Article(
                title=title,
                link=link,
                summary=summary,
                image=_extract_image(entry),
                published=_format_date(entry),
                source=SOURCE_NAME,
            )
        )

    return articles
