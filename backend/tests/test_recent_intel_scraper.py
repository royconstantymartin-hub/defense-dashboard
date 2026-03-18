from pathlib import Path
import sys
import os
from datetime import datetime, timedelta, timezone
from urllib.parse import urlparse

sys.path.append(str(Path(__file__).resolve().parents[1]))
os.environ.setdefault("MONGO_URL", "mongodb://localhost:27017")
os.environ.setdefault("DB_NAME", "test_db")

from server import fetch_recent_intel_preview


class DummyResponse:
    def __init__(self, content=None, json_data=None):
        self.content = content
        self._json_data = json_data

    def raise_for_status(self):
        return None

    def json(self):
        return self._json_data


def _rss_item(title: str, link: str, date_value: str, description: str) -> str:
    return f"""
    <item>
      <title>{title}</title>
      <link>{link}</link>
      <pubDate>{date_value}</pubDate>
      <description>{description}</description>
    </item>
    """


def test_fetch_recent_intel_preview_uses_24h_window_and_defense_filter(monkeypatch):
    now = datetime.now(timezone.utc)
    recent = now.strftime("%a, %d %b %Y %H:%M:%S +0000")
    old = (now - timedelta(hours=50)).strftime("%a, %d %b %Y %H:%M:%S +0000")

    defense_post_feed = f"""<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
{_rss_item("Defense Post title", "https://example.com/dp-1", recent, "Defense update")}
{_rss_item("Too old", "https://example.com/dp-old", old, "Old intel")}
</channel></rss>"""

    opex_feed = f"""<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
{_rss_item("Titre Opex", "https://example.com/opex-1", recent, "Résumé Opex")}
</channel></rss>"""

    les_echos_feed = f"""<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
{_rss_item("Défense industrielle", "https://example.com/le-1", recent, "Le secteur de la défense accélère")}
{_rss_item("Banques et inflation", "https://example.com/le-2", recent, "Macroéconomie")}
</channel></rss>"""

    def fake_get(url, *args, **kwargs):  # noqa: ANN001, ANN002, ANN003
        host = urlparse(url).netloc
        if "translate.googleapis.com" in host:
            text = kwargs["params"]["q"]
            return DummyResponse(json_data=[[[f"EN:{text}", text, None, None]]])
        if "thedefensepost.com" in host:
            return DummyResponse(content=defense_post_feed.encode())
        if "opex360.com" in host:
            return DummyResponse(content=opex_feed.encode())
        if "lesechos.fr" in host:
            return DummyResponse(content=les_echos_feed.encode())
        raise AssertionError(f"Unexpected URL: {url}")

    monkeypatch.setattr("server.requests.get", fake_get)
    items = fetch_recent_intel_preview(hours=24, limit=10)

    titles = [item.title for item in items]
    links = [item.source_url for item in items]

    assert "Too old" not in titles
    assert "EN:Banques et inflation" not in titles
    assert "EN:Titre Opex" in titles
    assert "Defense Post title" in titles
    assert "EN:Défense industrielle" in titles
    assert "https://example.com/le-1" in links
