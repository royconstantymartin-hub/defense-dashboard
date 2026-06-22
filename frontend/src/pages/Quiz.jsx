import { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  GraduationCap,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Trophy,
  Target,
} from "lucide-react";
import {
  QUIZ_QUESTIONS,
  QUIZ_CATEGORIES,
  QUIZ_LEVELS,
  CATEGORY_LABEL,
  LEVEL_LABEL,
  CATEGORY_COUNTS,
} from "@/data/quiz";

// How many questions a single game contains (drawn at random from the bank).
const QUESTIONS_PER_GAME = 20;

// Fisher–Yates shuffle — returns a new array so we never mutate the source bank.
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Filters the bank by category, the chosen sub-filters and difficulty.
// "all" category = no category filter; empty subs = every sub in the category;
// a question matches the subs if it carries at least one of the selected tags.
function filterPool(category, subs, level) {
  let pool = QUIZ_QUESTIONS;
  if (category !== "all") pool = pool.filter((q) => q.category === category);
  if (subs.length > 0) pool = pool.filter((q) => q.sub.some((s) => subs.includes(s)));
  if (level !== "all") pool = pool.filter((q) => q.level === level);
  return pool;
}

// Builds a single game run: draws a random subset and shuffles each question's
// four options so the correct answer isn't always in the same spot.
function buildRun(category, subs, level) {
  return shuffle(filterPool(category, subs, level))
    .slice(0, QUESTIONS_PER_GAME)
    .map((q) => {
      const paired = q.options.map((text, i) => ({ text, correct: i === q.answer }));
      const shuffledOpts = shuffle(paired);
      return {
        ...q,
        options: shuffledOpts.map((o) => o.text),
        answer: shuffledOpts.findIndex((o) => o.correct),
      };
    });
}

// Turns a score percentage into a colored verdict.
function verdict(pct) {
  if (pct >= 80) return { label: "Excellent", cls: "text-emerald-600" };
  if (pct >= 60) return { label: "Bien", cls: "text-blue-700" };
  if (pct >= 40) return { label: "Passable", cls: "text-amber-600" };
  return { label: "À retravailler", cls: "text-rose-600" };
}

export default function Quiz() {
  // phase: "setup" → "playing" → "results"
  const [phase, setPhase] = useState("setup");
  const [category, setCategory] = useState("history");
  const [subs, setSubs] = useState([]); // selected sub-filter values
  const [level, setLevel] = useState("all");

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null); // index picked for the current question
  const [answers, setAnswers] = useState([]); // { question, picked, correct }

  // The currently selected category object (with its sub-filter definitions).
  const catObj = useMemo(
    () => QUIZ_CATEGORIES.find((c) => c.value === category),
    [category]
  );

  const available = useMemo(
    () => filterPool(category, subs, level).length,
    [category, subs, level]
  );
  const drawn = Math.min(available, QUESTIONS_PER_GAME);
  const totalInBank = QUIZ_QUESTIONS.length;

  const changeCategory = (value) => {
    setCategory(value);
    setSubs([]); // sub-filters are category-specific, so reset them
  };

  const toggleSub = (value) => {
    setSubs((prev) =>
      prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value]
    );
  };

  const startQuiz = () => {
    setQuestions(buildRun(category, subs, level));
    setCurrent(0);
    setSelected(null);
    setAnswers([]);
    setPhase("playing");
  };

  const resetQuiz = () => {
    setPhase("setup");
    setQuestions([]);
    setCurrent(0);
    setSelected(null);
    setAnswers([]);
  };

  const choose = (idx) => {
    if (selected !== null) return; // lock once answered
    const q = questions[current];
    setSelected(idx);
    setAnswers((prev) => [...prev, { question: q, picked: idx, correct: idx === q.answer }]);
  };

  const next = () => {
    if (current + 1 >= questions.length) {
      setPhase("results");
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
    }
  };

  // ── Setup screen ────────────────────────────────────────────────────────────
  if (phase === "setup") {
    return (
      <div className="max-w-3xl mx-auto">
        <PageHeader />
        <Card className="bg-white border border-slate-200 rounded-xl shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]">
          <CardContent className="p-6 space-y-6">
            <p className="text-sm text-slate-600">
              Testez vos connaissances du monde de la défense. Choisissez une catégorie, affinez
              avec un ou plusieurs sous-filtres, puis une difficulté. Chaque partie tire{" "}
              {QUESTIONS_PER_GAME} questions au hasard et mélange les réponses : deux parties se
              ressemblent rarement.
            </p>

            {/* Step 1 — Category */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                1 · Catégorie
              </label>
              <Select value={category} onValueChange={changeCategory}>
                <SelectTrigger className="bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">🎲 Toutes catégories (mix complet)</SelectItem>
                  {QUIZ_CATEGORIES.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.emoji} {c.label} ({CATEGORY_COUNTS[c.value]})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Step 2 — Sub-filters (chips), hidden for the "all categories" mix */}
            {category !== "all" && catObj && (
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  2 · Sous-filtre{" "}
                  <span className="font-normal normal-case text-slate-400">
                    (aucun = toute la catégorie)
                  </span>
                </label>

                {catObj.groups ? (
                  // Grouped chips (e.g. History: Country vs Era)
                  <div className="space-y-3">
                    {catObj.groups.map((g) => (
                      <div key={g.label}>
                        <p className="text-[11px] font-semibold text-slate-400 mb-1.5">{g.label}</p>
                        <div className="flex flex-wrap gap-2">
                          {g.values.map((v) => {
                            const sub = catObj.subs.find((s) => s.value === v);
                            return (
                              <SubChip
                                key={v}
                                label={sub.label}
                                active={subs.includes(v)}
                                onClick={() => toggleSub(v)}
                              />
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {catObj.subs.map((s) => (
                      <SubChip
                        key={s.value}
                        label={s.label}
                        active={subs.includes(s.value)}
                        onClick={() => toggleSub(s.value)}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Step 3 — Difficulty */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                3 · Difficulté
              </label>
              <Select value={level} onValueChange={setLevel}>
                <SelectTrigger className="bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous niveaux</SelectItem>
                  {QUIZ_LEVELS.map((l) => (
                    <SelectItem key={l.value} value={l.value}>
                      {l.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-sm text-slate-500 font-mono">
                {drawn} question{drawn !== 1 ? "s" : ""} cette partie · {available} disponible
                {available !== 1 ? "s" : ""} · {totalInBank} en banque
              </span>
              <Button
                onClick={startQuiz}
                disabled={available === 0}
                className="bg-blue-800 hover:bg-blue-900 text-white"
              >
                Commencer
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ── Playing screen ──────────────────────────────────────────────────────────
  if (phase === "playing") {
    const q = questions[current];
    const answered = selected !== null;
    const progress = ((current + (answered ? 1 : 0)) / questions.length) * 100;

    return (
      <div className="max-w-3xl mx-auto">
        <PageHeader />

        {/* Progress + meta */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2 text-sm">
            <span className="font-mono text-slate-500">
              Question {current + 1} / {questions.length}
            </span>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-slate-200 text-slate-600">
                {CATEGORY_LABEL[q.category]}
              </Badge>
              <Badge variant="outline" className="border-slate-200 text-slate-600">
                {LEVEL_LABEL[q.level]}
              </Badge>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="bg-white border border-slate-200 rounded-xl shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]">
          <CardContent className="p-6">
            <h2 className="font-heading text-lg font-bold text-slate-900 mb-5">{q.question}</h2>

            <div className="space-y-3">
              {q.options.map((opt, idx) => {
                const isCorrect = idx === q.answer;
                const isPicked = idx === selected;

                let cls = "border-slate-200 hover:border-blue-300 hover:bg-blue-50/50";
                let Icon = null;
                if (answered) {
                  if (isCorrect) {
                    cls = "border-emerald-300 bg-emerald-50";
                    Icon = CheckCircle2;
                  } else if (isPicked) {
                    cls = "border-rose-300 bg-rose-50";
                    Icon = XCircle;
                  } else {
                    cls = "border-slate-200 opacity-60";
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => choose(idx)}
                    disabled={answered}
                    className={`w-full flex items-center gap-3 text-left px-4 py-3 rounded-lg border transition-all ${cls} ${
                      !answered ? "cursor-pointer" : "cursor-default"
                    }`}
                  >
                    <span className="flex-1 text-sm text-slate-800">{opt}</span>
                    {Icon && (
                      <Icon
                        className={`w-5 h-5 ${isCorrect ? "text-emerald-600" : "text-rose-600"}`}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation after answering */}
            {answered && (
              <div className="mt-5 p-4 rounded-lg bg-slate-50 border border-slate-200">
                <p className="text-sm text-slate-700">
                  <span className="font-semibold">
                    {selected === q.answer ? "Correct. " : "Pas tout à fait. "}
                  </span>
                  {q.explanation}
                </p>
              </div>
            )}

            {answered && (
              <div className="flex justify-end mt-5">
                <Button onClick={next} className="bg-blue-800 hover:bg-blue-900 text-white">
                  {current + 1 >= questions.length ? "Voir les résultats" : "Question suivante"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  // ── Results screen ──────────────────────────────────────────────────────────
  const total = answers.length;
  const correct = answers.filter((a) => a.correct).length;
  const overallPct = total ? Math.round((correct / total) * 100) : 0;
  const overall = verdict(overallPct);

  // Build per-category and per-level breakdowns from the answers given.
  const breakdown = (key, defs) =>
    defs
      .map((d) => {
        const subset = answers.filter((a) => a.question[key] === d.value);
        const ok = subset.filter((a) => a.correct).length;
        return {
          value: d.value,
          label: d.label,
          total: subset.length,
          correct: ok,
          pct: subset.length ? Math.round((ok / subset.length) * 100) : 0,
        };
      })
      .filter((d) => d.total > 0);

  const byCategory = breakdown("category", QUIZ_CATEGORIES);
  const byLevel = breakdown("level", QUIZ_LEVELS);

  // Radar needs at least 3 axes to look meaningful.
  const radarData = byCategory.map((c) => ({ subject: c.label, score: c.pct }));

  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader />

      {/* Overall score */}
      <Card className="bg-white border border-slate-200 rounded-xl shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] mb-5">
        <CardContent className="p-6 flex flex-col items-center text-center">
          <Trophy className="w-10 h-10 text-blue-800 mb-3" />
          <p className="text-sm text-slate-500 uppercase tracking-wider font-semibold">
            Score global
          </p>
          <p className="font-heading text-5xl font-bold text-slate-900 my-2">{overallPct}%</p>
          <p className={`text-sm font-semibold ${overall.cls}`}>{overall.label}</p>
          <p className="text-sm text-slate-500 mt-1 font-mono">
            {correct} / {total} correctes
          </p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-5">
        {/* Per-category radar (only when 3+ categories were tested) */}
        {radarData.length >= 3 && (
          <Card className="bg-white border border-slate-200 rounded-xl shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]">
            <CardContent className="p-6">
              <h3 className="font-heading font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-800" />
                Score par catégorie
              </h3>
              <ResponsiveContainer width="100%" height={260}>
                <RadarChart data={radarData} outerRadius="70%">
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: "#475569" }} />
                  <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 10, fill: "#94a3b8" }} />
                  <Radar dataKey="score" stroke="#1e40af" fill="#1e40af" fillOpacity={0.25} />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {/* Per-category bars (always shown) */}
        <Card className="bg-white border border-slate-200 rounded-xl shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]">
          <CardContent className="p-6">
            <h3 className="font-heading font-bold text-slate-900 mb-4">Par catégorie</h3>
            <div className="space-y-3">
              {byCategory.map((c) => (
                <ScoreBar key={c.value} label={c.label} correct={c.correct} total={c.total} pct={c.pct} />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Per-level bars */}
        <Card className="bg-white border border-slate-200 rounded-xl shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]">
          <CardContent className="p-6">
            <h3 className="font-heading font-bold text-slate-900 mb-4">Par difficulté</h3>
            <div className="space-y-3">
              {byLevel.map((l) => (
                <ScoreBar key={l.value} label={l.label} correct={l.correct} total={l.total} pct={l.pct} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center mt-6">
        <Button onClick={resetQuiz} className="bg-blue-800 hover:bg-blue-900 text-white">
          <RotateCcw className="w-4 h-4 mr-2" />
          Rejouer
        </Button>
      </div>
    </div>
  );
}

// ── Small presentational helpers ──────────────────────────────────────────────

function PageHeader() {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
          <GraduationCap className="w-5 h-5 text-blue-800" />
        </div>
        <div>
          <h1 className="font-heading text-2xl font-bold text-slate-900">Quiz de connaissances</h1>
          <p className="text-sm text-slate-500">
            Testez vos connaissances de la défense par catégorie, sous-filtre et niveau
          </p>
        </div>
      </div>
    </div>
  );
}

// A toggleable sub-filter chip/pill.
function SubChip({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-sm border transition-all ${
        active
          ? "bg-blue-800 border-blue-800 text-white"
          : "bg-white border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-blue-50/50"
      }`}
    >
      {label}
    </button>
  );
}

// A labeled progress bar showing "x/y" and the percentage, tinted by performance.
function ScoreBar({ label, correct, total, pct }) {
  const tint =
    pct >= 80 ? "bg-emerald-500" : pct >= 50 ? "bg-blue-700" : pct >= 30 ? "bg-amber-500" : "bg-rose-500";
  return (
    <div>
      <div className="flex items-center justify-between mb-1 text-sm">
        <span className="text-slate-700">{label}</span>
        <span className="font-mono text-slate-500">
          {correct}/{total} · {pct}%
        </span>
      </div>
      <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
        <div className={`h-full rounded-full ${tint}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
