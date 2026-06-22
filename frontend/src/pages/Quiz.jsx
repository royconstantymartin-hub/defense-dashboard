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
} from "@/data/quiz";

// Fisher–Yates shuffle — returns a new array so we never mutate the source bank.
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Picks the questions for a run, filtered by the chosen category/level ("all" = no filter).
function pickQuestions(category, level) {
  let pool = QUIZ_QUESTIONS;
  if (category !== "all") pool = pool.filter((q) => q.category === category);
  if (level !== "all") pool = pool.filter((q) => q.level === level);
  return shuffle(pool);
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
  const [category, setCategory] = useState("all");
  const [level, setLevel] = useState("all");

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null); // index picked for the current question
  const [answers, setAnswers] = useState([]); // { question, picked, correct }

  // How many questions match the current filters (shown on the setup screen).
  const availableCount = useMemo(
    () => pickQuestions(category, level).length,
    [category, level]
  );

  const startQuiz = () => {
    const qs = pickQuestions(category, level);
    setQuestions(qs);
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
              Test your knowledge of the global defense sector. Choose a category and a
              difficulty level, or leave both on "All" to get a full mix. You'll get a score
              broken down by category and by level at the end.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Category
                </label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {QUIZ_CATEGORIES.map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        {c.label}
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
                {availableCount} question{availableCount !== 1 ? "s" : ""} available
              </span>
              <Button
                onClick={startQuiz}
                disabled={availableCount === 0}
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
            <h2 className="font-heading text-lg font-bold text-slate-900 mb-5">
              {q.question}
            </h2>

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
        {/* Per-category radar (only when 3+ categories were tested) */}
        {radarData.length >= 3 && (
          <Card className="bg-white border border-slate-200 rounded-xl shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]">
            <CardContent className="p-6">
              <h3 className="font-heading font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-800" />
                Score by Category
              </h3>
              <ResponsiveContainer width="100%" height={260}>
                <RadarChart data={radarData} outerRadius="70%">
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fontSize: 11, fill: "#475569" }}
                  />
                  <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 10, fill: "#94a3b8" }} />
                  <Radar
                    dataKey="score"
                    stroke="#1e40af"
                    fill="#1e40af"
                    fillOpacity={0.25}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {/* Per-category bars (always shown) */}
        <Card className="bg-white border border-slate-200 rounded-xl shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]">
          <CardContent className="p-6">
            <h3 className="font-heading font-bold text-slate-900 mb-4">By Category</h3>
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
            Test your defense-sector knowledge by category and level
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
