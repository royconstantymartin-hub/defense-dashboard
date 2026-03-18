from pathlib import Path
import sys

sys.path.append(str(Path(__file__).resolve().parents[1]))

from rss_feed import clean_summary, extract_image


class DummyEntry(dict):
    def __getattr__(self, key):
        return self.get(key)


def test_clean_summary_strips_html_and_truncates():
    raw = "<p>Hello <strong>world</strong></p>"
    assert clean_summary(raw) == "Hello world"

    long_raw = "<p>" + ("a" * 240) + "</p>"
    cleaned = clean_summary(long_raw)
    assert cleaned.endswith("…")
    assert len(cleaned) == 221


def test_extract_image_prefers_media_and_falls_back_to_html():
    entry_with_media = DummyEntry(
        media_content=[{"type": "image/jpeg", "url": "https://img.example.com/media.jpg"}]
    )
    assert extract_image(entry_with_media) == "https://img.example.com/media.jpg"

    entry_with_html = DummyEntry(
        summary='<p>text</p><img src="https://img.example.com/from-summary.jpg" />'
    )
    assert extract_image(entry_with_html) == "https://img.example.com/from-summary.jpg"
