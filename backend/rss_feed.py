import re
from typing import Optional

import feedparser
import httpx
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter(prefix="/api", tags=["intel"])

RSS_SOURCES = {
    "thedefensepost": "https://thedefensepost.com/feed",
    "breakingdefense": "https://feeds.feedburner.com/BreakingDefense",
    "defenseone": "https://www.defenseone.com/rss/all",
}


class Article(BaseModel):
    title: str
    link: str
    summary: str
    image: Optional[str] = None
    published: Optional[str] = None
    source: str


def extract_image(entry) -> Optional[str]:
    """Extrait l'image d'un article RSS (plusieurs formats possibles)."""
    if hasattr(entry, "media_content") and entry.media_content:
        for media in entry.media_content:
            if media.get("type", "").startswith("image"):
                return media.get("url")

    if hasattr(entry, "media_thumbnail") and entry.media_thumbnail:
        return entry.media_thumbnail[0].get("url")

    if hasattr(entry, "enclosures") and entry.enclosures:
        for enc in entry.enclosures:
            if enc.get("type", "").startswith("image"):
                return enc.get("url") or enc.get("href")

    if hasattr(entry, "summary"):
        match = re.search(r'<img[^>]+src=["\']([^"\']+)["\']', entry.summary)
        if match:
            return match.group(1)

    return None


def clean_summary(raw: str) -> str:
    """Supprime les balises HTML et tronque le résumé."""
    text = re.sub(r"<[^>]+>", "", raw or "")
    text = text.strip()
    return text[:220] + "…" if len(text) > 220 else text


@router.get("/recent-intel", response_model=list[Article])
async def get_recent_intel(limit: int = 12):
    """
    Récupère les derniers articles de The Defense Post via RSS.
    Appelle : GET /api/recent-intel?limit=12
    """
    articles = []

    async with httpx.AsyncClient(timeout=10) as client:
        for source_name, rss_url in RSS_SOURCES.items():
            if source_name != "thedefensepost":
                continue  # N'activer que The Defense Post pour l'instant
            try:
                response = await client.get(rss_url)
                feed = feedparser.parse(response.text)

                for entry in feed.entries[:limit]:
                    articles.append(
                        Article(
                            title=entry.get("title", "Sans titre"),
                            link=entry.get("link", "#"),
                            summary=clean_summary(entry.get("summary", "")),
                            image=extract_image(entry),
                            published=entry.get("published", None),
                            source="The Defense Post",
                        )
                    )
            except Exception as e:
                raise HTTPException(
                    status_code=502,
                    detail=f"Erreur lors de la récupération du flux RSS ({source_name}): {str(e)}",
                ) from e

    return articles[:limit]
