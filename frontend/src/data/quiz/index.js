// ── Defense Knowledge Quiz — question bank index ──────────────────────────────
// The quiz is organized by THEME (a knowledge area about the defense world) and
// by LEVEL of difficulty. Each theme lives in its own file in this folder and
// exports a flat array of questions. This index merges them all and normalizes
// each entry into a single, predictable shape used by the Quiz page.
//
// Theme files use a compact shape to keep the large banks readable:
//   { level, q, o: [4 options], a: indexOfCorrectOption, e: explanation }
// This index adds the `theme` key and a stable `id` automatically.
//
// Frontend-only prototype: nothing is saved to the backend. Each game draws a
// random subset of questions (and shuffles the answer order), so two runs of the
// same theme rarely show the same questions in the same order.

import { INDUSTRY_QUESTIONS } from "./industry";
import { EUROPE_QUESTIONS } from "./europe";
import { USA_QUESTIONS } from "./usa";
import { POWERS_QUESTIONS } from "./powers";
import { SYSTEMS_QUESTIONS } from "./systems";
import { TECHTRADE_QUESTIONS } from "./techtrade";

// The themes — a blend of thematic and geographic knowledge areas.
export const QUIZ_THEMES = [
  { value: "industry",  label: "Defense Industry" },
  { value: "europe",    label: "Europe" },
  { value: "usa",       label: "United States" },
  { value: "powers",    label: "Other Powers" },
  { value: "systems",   label: "Systems & Platforms" },
  { value: "techtrade", label: "Technology & Arms Trade" },
];

// The three difficulty levels, shared by every theme.
export const QUIZ_LEVELS = [
  { value: "beginner",     label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "expert",       label: "Expert" },
];

// Human-readable label lookups (value → label).
export const THEME_LABEL = Object.fromEntries(QUIZ_THEMES.map((t) => [t.value, t.label]));
export const LEVEL_LABEL = Object.fromEntries(QUIZ_LEVELS.map((l) => [l.value, l.label]));

// Raw banks keyed by theme value.
const RAW_BANKS = {
  industry:  INDUSTRY_QUESTIONS,
  europe:    EUROPE_QUESTIONS,
  usa:       USA_QUESTIONS,
  powers:    POWERS_QUESTIONS,
  systems:   SYSTEMS_QUESTIONS,
  techtrade: TECHTRADE_QUESTIONS,
};

// Normalize every theme file into a single flat array of full question objects.
export const QUIZ_QUESTIONS = Object.entries(RAW_BANKS).flatMap(([theme, bank]) =>
  bank.map((item, i) => ({
    id: `${theme}-${i + 1}`,
    theme,
    level: item.level,
    question: item.q,
    options: item.o,
    answer: item.a,
    explanation: item.e,
  }))
);

// How many questions exist per theme — handy for the setup screen ("100 in bank").
export const THEME_COUNTS = Object.fromEntries(
  QUIZ_THEMES.map((t) => [t.value, QUIZ_QUESTIONS.filter((q) => q.theme === t.value).length])
);
