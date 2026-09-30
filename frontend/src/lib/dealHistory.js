// Preserve separate rounds and transactions between the same parties.
export function mergeDealHistory(...batches) {
  const ids = new Set();
  const fingerprints = new Set();
  const normalize = value => String(value || "").trim().toLowerCase().replace(/\s+/g, " ");
  return batches.flat().filter(deal => {
    if (deal.id && ids.has(deal.id)) return false;
    const key = [deal.acquirer, deal.target, deal.deal_type, deal.round_type,
      String(deal.announced_date || "").slice(0, 10), deal.source_url].map(normalize).join("|");
    if (fingerprints.has(key)) return false;
    if (deal.id) ids.add(deal.id);
    fingerprints.add(key);
    return true;
  });
}

export function historyYears(deals) {
  return [...new Set(deals.map(d => new Date(d.announced_date).getUTCFullYear())
    .filter(Number.isFinite))].sort((a, b) => b - a);
}

// Fail visibly instead of silently presenting a truncated historical universe.
export async function loadHistoryPages(fetchPage, pageSize = 500) {
  const rows = [];
  const seenPages = new Set();
  for (let offset = 0; ; offset += pageSize) {
    const page = await fetchPage({ limit: pageSize, offset });
    if (!Array.isArray(page)) throw new Error("Invalid history response");
    if (page.length) {
      const signature = JSON.stringify(page);
      if (seenPages.has(signature)) throw new Error("History pagination did not advance");
      seenPages.add(signature);
    }
    rows.push(...page);
    if (page.length < pageSize) return rows;
  }
}
