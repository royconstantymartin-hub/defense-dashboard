// ── Defense Knowledge Quiz — question bank index ──────────────────────────────
// The quiz is organized in two levels:
//   • CATEGORY  — a broad knowledge area (history, institutions, industry…)
//   • SUB-FILTER — a narrower facet inside the category (a country, a domain…)
// plus a difficulty LEVEL (beginner / intermediate / expert) on top.
//
// Each category lives in its own file and exports a flat array of questions in a
// compact shape:
//   { level, sub: ["tag", ...], q, o: [4 options], a: indexOfCorrect, e: explanation }
// A question can carry several sub-tags (e.g. a history question is tagged with a
// country AND an era), so it shows up under either filter.
//
// This index adds the `category` key and a stable `id`, and normalizes everything
// into one predictable shape. Frontend-only prototype: nothing is saved server-side.

import { HISTORY_QUESTIONS } from "./history";
import { INSTITUTIONS_QUESTIONS } from "./institutions";
import { INDUSTRY_QUESTIONS } from "./industry";
import { SYSTEMS_QUESTIONS } from "./systems";
import { STRATEGY_QUESTIONS } from "./strategy";

// The categories and their sub-filters. `groups` (optional) lets the UI show the
// sub-filters in labeled sections — used by History for "Country" vs "Era".
export const QUIZ_CATEGORIES = [
  {
    value: "history",
    label: "Histoire & batailles",
    emoji: "⚔️",
    subs: [
      { value: "france", label: "🇫🇷 France" },
      { value: "usa", label: "🇺🇸 États-Unis" },
      { value: "uk", label: "🇬🇧 Royaume-Uni" },
      { value: "germany", label: "🇩🇪 Allemagne" },
      { value: "russia", label: "🇷🇺 Russie / URSS" },
      { value: "intl", label: "🌍 Autres / Multinational" },
      { value: "ancient", label: "🏛️ Antiquité & médiéval" },
      { value: "c19", label: "🎩 XIXᵉ siècle" },
      { value: "ww1", label: "1️⃣ 1re Guerre mondiale" },
      { value: "ww2", label: "2️⃣ 2de Guerre mondiale" },
      { value: "coldwar", label: "❄️ Guerre froide" },
      { value: "modern", label: "⏳ Conflits modernes" },
    ],
    groups: [
      { label: "Pays / acteur", values: ["france", "usa", "uk", "germany", "russia", "intl"] },
      { label: "Époque", values: ["ancient", "c19", "ww1", "ww2", "coldwar", "modern"] },
    ],
  },
  {
    value: "institutions",
    label: "Armées & institutions",
    emoji: "🎖️",
    subs: [
      { value: "nato", label: "🛡️ OTAN" },
      { value: "eu", label: "🇪🇺 Union européenne" },
      { value: "usa", label: "🇺🇸 États-Unis" },
      { value: "france", label: "🇫🇷 France" },
      { value: "uk", label: "🇬🇧 Royaume-Uni" },
      { value: "russia", label: "🇷🇺 Russie" },
      { value: "general", label: "🌐 Général" },
    ],
  },
  {
    value: "industry",
    label: "Industrie de défense",
    emoji: "🏭",
    subs: [
      { value: "global", label: "🌍 Mondial / général" },
      { value: "usa", label: "🇺🇸 États-Unis" },
      { value: "europe", label: "🇪🇺 Europe" },
      { value: "asia", label: "🌏 Asie & autres" },
    ],
  },
  {
    value: "systems",
    label: "Systèmes & matériels",
    emoji: "✈️",
    subs: [
      { value: "air", label: "✈️ Air" },
      { value: "land", label: "🚜 Terre" },
      { value: "sea", label: "🚢 Mer" },
      { value: "missiles", label: "🚀 Missiles & artillerie" },
      { value: "spacecyber", label: "🛰️ Espace & cyber" },
    ],
  },
  {
    value: "strategy",
    label: "Technologies & stratégie",
    emoji: "🛰️",
    subs: [
      { value: "trade", label: "🌐 Commerce & traités" },
      { value: "cyber", label: "💻 Cyber" },
      { value: "drones", label: "🤖 Drones & IA" },
      { value: "space", label: "🛰️ Spatial" },
      { value: "nuclear", label: "☢️ Dissuasion nucléaire" },
      { value: "emerging", label: "🔬 Technologies émergentes" },
    ],
  },
];

// The three difficulty levels, shared by every category.
export const QUIZ_LEVELS = [
  { value: "beginner", label: "Débutant" },
  { value: "intermediate", label: "Intermédiaire" },
  { value: "expert", label: "Expert" },
];

// Lookups (value → label).
export const CATEGORY_LABEL = Object.fromEntries(QUIZ_CATEGORIES.map((c) => [c.value, c.label]));
export const LEVEL_LABEL = Object.fromEntries(QUIZ_LEVELS.map((l) => [l.value, l.label]));

// Flat lookup for every sub-filter label, e.g. SUB_LABEL.history.france.
export const SUB_LABEL = Object.fromEntries(
  QUIZ_CATEGORIES.map((c) => [c.value, Object.fromEntries(c.subs.map((s) => [s.value, s.label]))])
);

// Raw banks keyed by category value.
const RAW_BANKS = {
  history: HISTORY_QUESTIONS,
  institutions: INSTITUTIONS_QUESTIONS,
  industry: INDUSTRY_QUESTIONS,
  systems: SYSTEMS_QUESTIONS,
  strategy: STRATEGY_QUESTIONS,
};

// Normalize every category file into a single flat array of full question objects.
export const QUIZ_QUESTIONS = Object.entries(RAW_BANKS).flatMap(([category, bank]) =>
  bank.map((item, i) => ({
    id: `${category}-${i + 1}`,
    category,
    sub: Array.isArray(item.sub) ? item.sub : item.sub ? [item.sub] : [],
    level: item.level,
    question: item.q,
    options: item.o,
    answer: item.a,
    explanation: item.e,
  }))
);

// How many questions exist per category — handy for the setup screen.
export const CATEGORY_COUNTS = Object.fromEntries(
  QUIZ_CATEGORIES.map((c) => [c.value, QUIZ_QUESTIONS.filter((q) => q.category === c.value).length])
);

// How many questions exist per sub-filter, e.g. SUB_COUNTS.history.france.
export const SUB_COUNTS = Object.fromEntries(
  QUIZ_CATEGORIES.map((c) => [
    c.value,
    Object.fromEntries(
      c.subs.map((s) => [
        s.value,
        QUIZ_QUESTIONS.filter((q) => q.category === c.value && q.sub.includes(s.value)).length,
      ])
    ),
  ])
);
