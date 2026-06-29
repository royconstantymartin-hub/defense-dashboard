"""
C8 — Unit tests for the deterministic M&A extraction pipeline (V2).

Pure-function tests: no running server, no DB, no network. They guard the
high-value V2 invariants and are scored against backend/eval/golden_set.json.
Run: pytest backend/tests/test_ma_extraction.py -v
"""
import json
import os

from services.ma_scraper import (
    _parse_deal_value_with_basis,
    classify_deal_class,
    score_confidence,
)

GOLDEN = os.path.join(os.path.dirname(__file__), "..", "eval", "golden_set.json")
with open(GOLDEN) as f:
    CASES = json.load(f)


def test_value_basis_golden_set():
    """Value + basis must match ground truth on every golden case."""
    failures = []
    for c in CASES["value_basis_cases"]:
        val, basis = _parse_deal_value_with_basis(c["text"])
        if val != c["expect_value"] or basis != c["expect_basis"]:
            failures.append(f"{c['text'][:50]!r} -> ({val},{basis}) != ({c['expect_value']},{c['expect_basis']})")
    assert not failures, "Value/basis mismatches:\n" + "\n".join(failures)


def test_revenue_is_never_a_deal_value():
    """The V1 bug: 'reported $25 billion in revenue' must NOT become a deal value."""
    val, basis = _parse_deal_value_with_basis("BAE reported $25 billion in revenue last year")
    assert val == 0.0 and basis == "undisclosed"


def test_contract_award_is_not_a_deal_value():
    val, basis = _parse_deal_value_with_basis("Rheinmetall wins a $300 million contract to supply ammunition")
    assert val == 0.0 and basis == "undisclosed"


def test_deal_class_golden_set():
    for c in CASES["deal_class_cases"]:
        got = classify_deal_class(c["deal_type"], c["round_type"])
        assert got == c["expect"], f"{c} -> {got}"


def test_confidence_thresholds():
    # Two known parties + disclosed value + 2 sources → high
    score, label = score_confidence(acq_known=True, tgt_known=True, value_basis="equity", num_sources=2)
    assert label == "high" and score >= 0.8
    # Nothing anchored → low
    score, label = score_confidence(acq_known=False, tgt_known=False, value_basis="undisclosed")
    assert label == "low"
    # Manual curation is always trusted
    score, label = score_confidence(acq_known=False, tgt_known=False, value_basis="undisclosed",
                                    extraction_method="manual")
    assert label == "high" and score >= 0.9
