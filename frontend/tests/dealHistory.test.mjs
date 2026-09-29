import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
const source = await readFile(new URL("../src/lib/dealHistory.js", import.meta.url), "utf8");
const { mergeDealHistory, historyYears, loadHistoryPages } = await import(
  "data:text/javascript;base64," + Buffer.from(source).toString("base64")
);
test("keeps separate funding rounds and removes exact duplicates", () => {
  const a = { id: "1", acquirer: "Fund A", target: "Company", deal_type: "funding_round", announced_date: "2024-01-01" };
  const b = { ...a, id: "2", announced_date: "2025-01-01" };
  assert.equal(mergeDealHistory([a, b], [a]).length, 2);
});
test("does not collapse companies sharing their first word", () => {
  const a = { acquirer: "General Dynamics", target: "Company", announced_date: "2024-01-01" };
  assert.equal(mergeDealHistory([a, { ...a, acquirer: "General Electric" }]).length, 2);
});
test("years include older history and ignore invalid dates", () => {
  assert.deepEqual(historyYears([{ announced_date: "1994-08-29" }, { announced_date: "2026-01-01" }, {}]), [2026, 1994]);
});
test("loads beyond the old 500-record limit", async () => {
  const records = Array.from({ length: 1101 }, (_, id) => ({ id }));
  const result = await loadHistoryPages(async ({ limit, offset }) => records.slice(offset, offset + limit));
  assert.equal(result.length, 1101);
});
test("fails visibly if the API ignores pagination", async () => {
  await assert.rejects(loadHistoryPages(async () => [{ id: 1 }], 1), /did not advance/);
});
test("does not turn a failed historical request into an empty success", async () => {
  await assert.rejects(loadHistoryPages(async () => { throw new Error("offline"); }), /offline/);
});
