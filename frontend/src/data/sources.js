// ─────────────────────────────────────────────────────────────────────────────
// Source registry & citation helpers  (V2 — Chantier 1 « Sourcing & traçabilité »)
//
// Objectif : aucune donnée ne doit être affichée sans une source citable, datée
// et exportable. Ce module centralise les références (au lieu d'étiquettes en dur
// dispersées dans la page) et fournit les helpers d'export académique
// (BibTeX / RIS), réutilisables par l'export du tableau et des fiches pays.
//
// Contrainte budgétaire : uniquement des sources OUVERTES et gratuites
// (SIPRI, NATO, Global Firepower, rapports gouvernementaux) — aucun flux sous
// licence n'est requis pour faire fonctionner cette couche.
// ─────────────────────────────────────────────────────────────────────────────

// Millésime de référence unique de la page — source de vérité unique.
// Remplace les multiples « 2024 » codés en dur (cohérence des millésimes).
export const DATA_VINTAGE = {
  // Année budgétaire de référence des dépenses affichées.
  expenditure_fy: 2024,
  // Édition de l'annuaire de capacités utilisée comme référence principale.
  capability_edition: "2024",
  // Date de dernière revue éditoriale du jeu de données (à mettre à jour à chaque
  // rafraîchissement). Affichée comme « dernière mise à jour ».
  last_reviewed: "2026-06-29",
};

// Registre des sources. Chaque entrée porte une citation complète et vérifiable.
// `accessed` = date de consultation (exigence académique).
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
    note: "Dépenses militaires en USD constants. Données ouvertes et gratuites.",
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
    note: "Référence principale des inventaires d'équipement (parc en service).",
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
    note: "Communiqués officiels OTAN (% PIB, dépenses). Accès libre.",
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
    note: "Estimations agrégées d'effectifs et d'équipements. Accès libre.",
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
    note: "Rapports budgétaires officiels nationaux (variable par pays).",
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
    note: "Estimation interne non vérifiée — à NE PAS citer comme source primaire.",
  },
};

// Résout l'identifiant de source brut (tel que stocké en base / seed) vers une
// entrée du registre. Tolérant aux variantes de casse.
export function resolveSource(rawId) {
  if (!rawId) return null;
  const key = String(rawId).trim().toUpperCase().replace(/\s+/g, "_");
  return SOURCES[key] || null;
}

// Étiquette courte affichable (ex. « SIPRI 2025 »).
export function sourceShortLabel(rawId) {
  const s = resolveSource(rawId);
  if (!s) return rawId || "—";
  return `${s.id} ${s.year}`;
}

// Citation longue façon liste de références.
// Ex. « SIPRI (2025). SIPRI Military Expenditure Database. Stockholm International
//       Peace Research Institute. Consulté le 2026-06-29. https://… »
export function citationText(rawId) {
  const s = resolveSource(rawId);
  if (!s) return rawId || "";
  const parts = [
    `${s.publisher} (${s.year}).`,
    `${s.label}.`,
    s.url ? s.url : null,
    `Consulté le ${s.accessed}.`,
  ].filter(Boolean);
  return parts.join(" ");
}

// Export BibTeX d'une source (clé = id + année).
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
    `  note   = {Consulté le ${s.accessed}}`,
    `}`,
  ].filter(Boolean);
  return lines.join("\n");
}

// Export RIS d'une source (compatible Zotero / EndNote / Mendeley).
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

// Agrège les citations uniques d'une liste d'identifiants de sources.
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

// Déclenche le téléchargement d'un fichier texte côté navigateur.
export function downloadTextFile(filename, content, mime = "text/plain") {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([content], { type: mime }));
  a.download = filename;
  a.click();
}
