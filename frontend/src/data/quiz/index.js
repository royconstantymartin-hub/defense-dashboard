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
    label: "History & Battles",
    subs: [
      { value: "france", label: "France" },
      { value: "usa", label: "United States" },
      { value: "uk", label: "United Kingdom" },
      { value: "germany", label: "Germany" },
      { value: "russia", label: "Russia / USSR" },
      { value: "intl", label: "Other / Multinational" },
      { value: "ancient", label: "Ancient & Medieval" },
      { value: "c19", label: "19th Century" },
      { value: "ww1", label: "World War I" },
      { value: "ww2", label: "World War II" },
      { value: "coldwar", label: "Cold War" },
      { value: "modern", label: "Modern Conflicts" },
    ],
    groups: [
      { label: "Country / Actor", values: ["france", "usa", "uk", "germany", "russia", "intl"] },
      { label: "Era", values: ["ancient", "c19", "ww1", "ww2", "coldwar", "modern"] },
    ],
  },
  {
    value: "institutions",
    label: "Armed Forces & Institutions",
    subs: [
      { value: "nato", label: "NATO" },
      { value: "eu", label: "European Union" },
      { value: "usa", label: "United States" },
      { value: "france", label: "France" },
      { value: "uk", label: "United Kingdom" },
      { value: "russia", label: "Russia" },
      { value: "general", label: "General" },
    ],
  },
  {
    value: "industry",
    label: "Defense Industry",
    subs: [
      { value: "global", label: "Global / General" },
      { value: "usa", label: "United States" },
      { value: "europe", label: "Europe" },
      { value: "asia", label: "Asia & Others" },
    ],
  },
  {
    value: "systems",
    label: "Systems & Equipment",
    subs: [
      { value: "air", label: "Air" },
      { value: "land", label: "Land" },
      { value: "sea", label: "Sea" },
      { value: "missiles", label: "Missiles & Artillery" },
      { value: "spacecyber", label: "Space & Cyber" },
    ],
  },
  {
    value: "strategy",
    label: "Technology & Strategy",
    subs: [
      { value: "trade", label: "Trade & Treaties" },
      { value: "cyber", label: "Cyber" },
      { value: "drones", label: "Drones & AI" },
      { value: "space", label: "Space" },
      { value: "nuclear", label: "Nuclear Deterrence" },
      { value: "emerging", label: "Emerging Tech" },
    ],
  },
];

// The three difficulty levels, shared by every category.
export const QUIZ_LEVELS = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
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
    // Optional illustration: set `img: "https://..."` on a question to show a
    // picture above it. Left null when absent — rendering is fully optional.
    image: item.img || null,
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
