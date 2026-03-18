from pathlib import Path
import sys
import os

sys.path.append(str(Path(__file__).resolve().parents[1]))
os.environ.setdefault("MONGO_URL", "mongodb://localhost:27017")
os.environ.setdefault("DB_NAME", "test_db")

from server import (
    _extract_companies_from_title,
    _looks_like_ma,
    fetch_the_defense_post_ma_preview,
)


class DummyResponse:
    def __init__(self, content: bytes):
        self.content = content

    def raise_for_status(self):
        return None


def test_looks_like_ma_keyword_detection():
    assert _looks_like_ma("Company A acquires Company B")
    assert _looks_like_ma("Major merger announced in Europe")
    assert not _looks_like_ma("New radar product launched")


def test_extract_companies_from_title():
    acquirer, target, confidence = _extract_companies_from_title("Alpha Defense acquires Beta Systems")
    assert acquirer == "Alpha Defense"
    assert target == "Beta Systems"
    assert confidence == "medium"


def test_fetch_the_defense_post_ma_preview_filters_non_ma(monkeypatch):
    rss = b"""<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <item>
      <title>Alpha Defense acquires Beta Systems</title>
      <link>https://example.com/ma-1</link>
      <pubDate>Tue, 18 Mar 2025 12:00:00 +0000</pubDate>
    </item>
    <item>
      <title>Gamma unveils new armored vehicle</title>
      <link>https://example.com/product-1</link>
      <pubDate>Tue, 18 Mar 2025 13:00:00 +0000</pubDate>
    </item>
  </channel>
</rss>
"""

    def fake_get(*args, **kwargs):  # noqa: ANN002, ANN003
        return DummyResponse(rss)

    monkeypatch.setattr("server.requests.get", fake_get)
    results = fetch_the_defense_post_ma_preview(limit=10)

    assert len(results) == 1
    assert results[0].title == "Alpha Defense acquires Beta Systems"
    assert results[0].acquirer == "Alpha Defense"
    assert results[0].target == "Beta Systems"
