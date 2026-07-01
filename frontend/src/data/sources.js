// ─────────────────────────────────────────────────────────────────────────────
// Source registry & citation helpers  (V2 — workstream C1 "Sourcing & traceability")
//
// Goal: no figure should be displayed without a citable, dated and exportable
// source. This module centralises references (instead of hard-coded labels
// scattered across the page) and provides academic export helpers
// (BibTeX / RIS), reused by the table and country-profile exports.
//
// Budget constraint: OPEN, free sources only (SIPRI, NATO, Global Firepower,
// national government reports) — no licensed feed is required for this layer.
// ─────────────────────────────────────────────────────────────────────────────

// Single reference vintage for the page — single source of truth.
// Replaces the multiple hard-coded "2024" strings (vintage consistency).
export const DATA_VINTAGE = {
  // Reference fiscal year of the spending figures shown.
  expenditure_fy: 2024,
  // Capability yearbook edition used as the primary reference.
  capability_edition: "2024",
  // Date of the last editorial review of the dataset (update on each refresh).
  // Displayed as "last reviewed".
  last_reviewed: "2026-06-29",
};

// Source registry. Each entry carries a complete, verifiable citation.
// `accessed` = date the source was consulted (academic requirement).
export const SOURCES = {
  SIPRI: {
    id: "SIPRI",
    label: "SIPRI Military Expenditure Database",
    publisher: "Stockholm International Peace Research Institute",
    year: 2025,
    url: "https://www.sipri.org/databases/milex",
    accessed: DATA_VINTAGE.last_reviewed,
    type: "dataset",
    open_access: true,
    note: "Military spending in constant USD. Open and free data.",
  },
  IISS: {
    id: "IISS",
    label: "The Military Balance 2024",
    publisher: "International Institute for Strategic Studies",
    year: 2024,
    url: "https://www.iiss.org/publications/the-military-balance/",
    accessed: DATA_VINTAGE.last_reviewed,
    type: "book",
    open_access: false,
    note: "Primary reference for equipment inventories (in-service fleet).",
  },
  NATO: {
    id: "NATO",
    label: "Defence Expenditure of NATO Countries",
    publisher: "North Atlantic Treaty Organization",
    year: 2024,
    url: "https://www.nato.int/cps/en/natohq/news_226465.htm",
    accessed: DATA_VINTAGE.last_reviewed,
    type: "report",
    open_access: true,
    note: "Official NATO press releases (% GDP, spending). Open access.",
  },
  GFP: {
    id: "GFP",
    label: "Global Firepower — Military Strength Ranking",
    publisher: "GlobalFirepower.com",
    year: 2025,
    url: "https://www.globalfirepower.com/",
    accessed: DATA_VINTAGE.last_reviewed,
    type: "website",
    open_access: true,
    note: "Aggregate estimates of personnel and equipment. Open access.",
  },
  NATIONAL: {
    id: "NATIONAL",
    label: "National government defence reports",
    publisher: "Various national ministries of defence",
    year: DATA_VINTAGE.expenditure_fy,
    url: "",
    accessed: DATA_VINTAGE.last_reviewed,
    type: "report",
    open_access: true,
    note: "Official national budget reports (varies by country).",
  },
  ESTIMATE: {
    id: "ESTIMATE",
    label: "Editorial estimate (unverified)",
    publisher: "Defense Intelligence Hub",
    year: DATA_VINTAGE.expenditure_fy,
    url: "",
    accessed: DATA_VINTAGE.last_reviewed,
    type: "estimate",
    open_access: true,
    note: "Internal unverified estimate — do NOT cite as a primary source.",
  },
};

// Resolves the raw source id (as stored in DB / seed) to a registry entry.
// Case-insensitive.
export function resolveSource(rawId) {
  if (!rawId) return null;
  const key = String(rawId).trim().toUpperCase().replace(/\s+/g, "_");
  return SOURCES[key] || null;
}

// Short display label (e.g. "SIPRI 2025").
export function sourceShortLabel(rawId) {
  const s = resolveSource(rawId);
  if (!s) return rawId || "—";
  return `${s.id} ${s.year}`;
}

// Long reference-list-style citation.
// e.g. "Stockholm International Peace Research Institute (2025). SIPRI Military
//       Expenditure Database. https://… Accessed 2026-06-29."
export function citationText(rawId) {
  const s = resolveSource(rawId);
  if (!s) return rawId || "";
  const parts = [
    `${s.publisher} (${s.year}).`,
    `${s.label}.`,
    s.url ? s.url : null,
    `Accessed ${s.accessed}.`,
  ].filter(Boolean);
  return parts.join(" ");
}

// BibTeX export of a source (key = id + year).
export function toBibTeX(rawId) {
  const s = resolveSource(rawId);
  if (!s) return "";
  const typeMap = { dataset: "misc", book: "book", report: "techreport", website: "online", estimate: "misc" };
  const entryType = typeMap[s.type] || "misc";
  const lines = [
    `@${entryType}{${s.id}${s.year},`,
    `  title  = {${s.label}},`,
    `  author = {{${s.publisher}}},`,
    `  year   = {${s.year}},`,
    s.url ? `  url    = {${s.url}},` : null,
    `  note   = {Accessed ${s.accessed}}`,
    `}`,
  ].filter(Boolean);
  return lines.join("\n");
}

// RIS export of a source (compatible with Zotero / EndNote / Mendeley).
export function toRIS(rawId) {
  const s = resolveSource(rawId);
  if (!s) return "";
  const tyMap = { dataset: "DATA", book: "BOOK", report: "RPRT", website: "ELEC", estimate: "GEN" };
  const ty = tyMap[s.type] || "GEN";
  const lines = [
    `TY  - ${ty}`,
    `TI  - ${s.label}`,
    `PB  - ${s.publisher}`,
    `PY  - ${s.year}`,
    s.url ? `UR  - ${s.url}` : null,
    `Y2  - ${s.accessed}`,
    `ER  - `,
  ].filter(Boolean);
  return lines.join("\n");
}

// Aggregates the unique citations from a list of source ids.
export function buildBibliography(rawIds, format = "bibtex") {
  const seen = new Set();
  const out = [];
  rawIds.forEach((id) => {
    const s = resolveSource(id);
    const key = s ? `${s.id}${s.year}` : id;
    if (!key || seen.has(key)) return;
    seen.add(key);
    out.push(format === "ris" ? toRIS(id) : toBibTeX(id));
  });
  return out.filter(Boolean).join("\n\n");
}

// ── Per-country deep links ───────────────────────────────────────────────────
// A source NAME ("IISS 2024") is not a citation a reader can open. These helpers
// return a direct, openly-accessible URL to THAT country's data so a reviewer
// can verify the figures — the gap a thesis director rightly flags.

// Global Firepower publishes a free, per-country detail page (aircraft, tanks,
// ships, budget…). Slugs keyed by ISO code for every country with a capability
// profile in the app.
export const GFP_COUNTRY_SLUG = {
  US: "united-states-of-america", CN: "china", RU: "russia", IN: "india",
  SA: "saudi-arabia", GB: "united-kingdom", DE: "germany", FR: "france",
  JP: "japan", KR: "south-korea", TR: "turkey", IL: "israel", AU: "australia",
  IT: "italy", CA: "canada", PL: "poland", UA: "ukraine", AE: "united-arab-emirates",
  PK: "pakistan", ES: "spain", NL: "netherlands", TW: "taiwan", EG: "egypt",
  GR: "greece", VN: "vietnam", ID: "indonesia", AZ: "azerbaijan", BR: "brazil",
  SE: "sweden", NO: "norway", FI: "finland", IR: "iran", DZ: "algeria",
  TH: "thailand", ZA: "south-africa", QA: "qatar", KW: "kuwait", MA: "morocco",
  MY: "malaysia", PH: "philippines", NZ: "new-zealand", OM: "oman",
};

// Direct, open-access page for a country's military capabilities (Global
// Firepower). This is the source a reviewer can actually open — IISS Military
// Balance is the primary reference but is a subscription book with no free
// per-country link, so we point verification at the open equivalent.
export function capabilitiesSourceLink(countryCode) {
  const slug = GFP_COUNTRY_SLUG[countryCode];
  return slug
    ? `https://www.globalfirepower.com/country-military-strength-detail.php?country_id=${slug}`
    : "https://www.globalfirepower.com/countries-listing.php";
}

// Direct link to the SIPRI Military Expenditure database (open data — download
// the dataset and filter the country row). SIPRI has no public per-country
// permalink, so we link the database + name the country to filter.
export function spendingSourceLink() {
  return "https://www.sipri.org/databases/milex";
}

// Triggers a client-side text file download.
export function downloadTextFile(filename, content, mime = "text/plain") {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([content], { type: mime }));
  a.download = filename;
  a.click();
}
