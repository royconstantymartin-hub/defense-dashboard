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
  QUIZ_THEMES,
  QUIZ_LEVELS,
  THEME_LABEL,
  LEVEL_LABEL,
  THEME_COUNTS,
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

// Builds a single game run: filters by theme/level ("all" = no filter), draws a
// random subset, and shuffles each question's four options so the correct answer
// isn't always in the same spot. The original answer index is remapped.
function buildRun(theme, level) {
  let pool = QUIZ_QUESTIONS;
  if (theme !== "all") pool = pool.filter((q) => q.theme === theme);
  if (level !== "all") pool = pool.filter((q) => q.level === level);

  return shuffle(pool)
    .slice(0, QUESTIONS_PER_GAME)
    .map((q) => {
      // Pair each option with whether it is the correct one, then shuffle.
      const paired = q.options.map((text, i) => ({ text, correct: i === q.answer }));
      const shuffledOpts = shuffle(paired);
      return {
        ...q,
        options: shuffledOpts.map((o) => o.text),
        answer: shuffledOpts.findIndex((o) => o.correct),
      };
    });
}

// How many questions match the current filters (before drawing the 20).
function countAvailable(theme, level) {
  let pool = QUIZ_QUESTIONS;
  if (theme !== "all") pool = pool.filter((q) => q.theme === theme);
  if (level !== "all") pool = pool.filter((q) => q.level === level);
  return pool.length;
}

// Turns a score percentage into a colored verdict.
function verdict(pct) {
  if (pct >= 80) return { label: "Excellent", cls: "text-emerald-600" };
  if (pct >= 60) return { label: "Good", cls: "text-blue-700" };
  if (pct >= 40) return { label: "Fair", cls: "text-amber-600" };
  return { label: "Needs work", cls: "text-rose-600" };
}

export default function Quiz() {
  // phase: "setup" → "playing" → "results"
  const [phase, setPhase] = useState("setup");
  const [theme, setTheme] = useState("all");
  const [level, setLevel] = useState("all");

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null); // index picked for the current question
  const [answers, setAnswers] = useState([]); // { question, picked, correct }

  const available = useMemo(() => countAvailable(theme, level), [theme, level]);
  const drawn = Math.min(available, QUESTIONS_PER_GAME);

  const totalInBank = QUIZ_QUESTIONS.length;

  const startQuiz = () => {
    setQuestions(buildRun(theme, level));
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
              Test your knowledge of the global defense world. Pick a theme and a difficulty
              level, or leave both on "All" for a full mix. Each game draws {QUESTIONS_PER_GAME}{" "}
              random questions and shuffles the answers, so two runs are rarely the same. You'll
              get a score broken down by theme and by level at the end.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Theme
                </label>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger className="bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Themes</SelectItem>
                    {QUIZ_THEMES.map((t) => (
                      <SelectItem key={t.value} value={t.value}>
                        {t.label} ({THEME_COUNTS[t.value]})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Difficulty
                </label>
                <Select value={level} onValueChange={setLevel}>
                  <SelectTrigger className="bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    {QUIZ_LEVELS.map((l) => (
                      <SelectItem key={l.value} value={l.value}>
                        {l.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-sm text-slate-500 font-mono">
                {drawn} question{drawn !== 1 ? "s" : ""} this game · {available} match your filters
                · {totalInBank} in bank
              </span>
              <Button
                onClick={startQuiz}
                disabled={available === 0}
                className="bg-blue-800 hover:bg-blue-900 text-white"
              >
                Start Quiz
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
                {THEME_LABEL[q.theme]}
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

                // Default (unanswered) styling
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
                    {selected === q.answer ? "Correct. " : "Not quite. "}
                  </span>
                  {q.explanation}
                </p>
              </div>
            )}

            {answered && (
              <div className="flex justify-end mt-5">
                <Button onClick={next} className="bg-blue-800 hover:bg-blue-900 text-white">
                  {current + 1 >= questions.length ? "See Results" : "Next Question"}
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

  // Build per-theme and per-level breakdowns from the answers given.
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

  const byTheme = breakdown("theme", QUIZ_THEMES);
  const byLevel = breakdown("level", QUIZ_LEVELS);

  // Radar needs at least 3 axes to look meaningful.
  const radarData = byTheme.map((c) => ({ subject: c.label, score: c.pct }));

  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader />

      {/* Overall score */}
      <Card className="bg-white border border-slate-200 rounded-xl shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] mb-5">
        <CardContent className="p-6 flex flex-col items-center text-center">
          <Trophy className="w-10 h-10 text-blue-800 mb-3" />
          <p className="text-sm text-slate-500 uppercase tracking-wider font-semibold">
            Overall Score
          </p>
          <p className="font-heading text-5xl font-bold text-slate-900 my-2">{overallPct}%</p>
          <p className={`text-sm font-semibold ${overall.cls}`}>{overall.label}</p>
          <p className="text-sm text-slate-500 mt-1 font-mono">
            {correct} / {total} correct
          </p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-5">
        {/* Per-theme radar (only when 3+ themes were tested) */}
        {radarData.length >= 3 && (
          <Card className="bg-white border border-slate-200 rounded-xl shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]">
            <CardContent className="p-6">
              <h3 className="font-heading font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-800" />
                Score by Theme
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

        {/* Per-theme bars (always shown) */}
        <Card className="bg-white border border-slate-200 rounded-xl shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]">
          <CardContent className="p-6">
            <h3 className="font-heading font-bold text-slate-900 mb-4">By Theme</h3>
            <div className="space-y-3">
              {byTheme.map((c) => (
                <ScoreBar key={c.value} label={c.label} correct={c.correct} total={c.total} pct={c.pct} />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Per-level bars */}
        <Card className="bg-white border border-slate-200 rounded-xl shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]">
          <CardContent className="p-6">
            <h3 className="font-heading font-bold text-slate-900 mb-4">By Difficulty</h3>
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
          Play Again
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
          <h1 className="font-heading text-2xl font-bold text-slate-900">Knowledge Quiz</h1>
          <p className="text-sm text-slate-500">
            Test your defense-world knowledge by theme and level
          </p>
        </div>
      </div>
    </div>
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
