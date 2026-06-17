import { useEffect, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Lightbulb,
  Sparkles,
  Link as LinkIcon,
  ImageOff,
} from "lucide-react";
import { LEXICON_BY_SLUG, CATEGORY_LABEL } from "@/data/lexicon";

// Fetch a representative image for the term from the public Wikipedia REST API.
// This keeps images correct without hardcoding (and easily broken) file names.
function useWikipediaImage(wikiTitle) {
  const [src, setSrc] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;
    setSrc(null);
    setFailed(false);
    if (!wikiTitle) {
      setFailed(true);
      return;
    }
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wikiTitle)}`;
    fetch(url)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("not ok"))))
      .then((data) => {
        if (!active) return;
        // Prefer the thumbnail (smaller) but bump its width for a crisp hero.
        const thumb = data?.thumbnail?.source;
        const original = data?.originalimage?.source;
        const chosen = thumb
          ? thumb.replace(/\/\d+px-/, "/960px-")
          : original;
        if (chosen) setSrc(chosen);
        else setFailed(true);
      })
      .catch(() => active && setFailed(true));
    return () => {
      active = false;
    };
  }, [wikiTitle]);

  return { src, failed, setFailed };
}

export default function LexiconTerm() {
  const { slug } = useParams();
  const entry = LEXICON_BY_SLUG[slug];
  const { src: imgSrc, failed: imgFailed, setFailed } = useWikipediaImage(entry?.wiki);

  // Unknown slug → send the user back to the lexicon index.
  if (!entry) {
    return <Navigate to="/lexicon" replace />;
  }

  return (
    <div data-testid="lexicon-term-page" className="space-y-6 animate-fade-in max-w-4xl">
      {/* Breadcrumb / back */}
      <Link
        to="/lexicon"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-700 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Lexicon
      </Link>

      {/* Hero image */}
      <div className="relative w-full h-56 sm:h-72 rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
        {imgSrc && !imgFailed ? (
          <img
            src={imgSrc}
            alt={entry.imageAlt || entry.term}
            onError={() => setFailed(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-slate-300">
            {imgFailed ? <ImageOff className="w-8 h-8" /> : (
              <div className="animate-spin w-7 h-7 border-2 border-slate-200 border-t-slate-400 rounded-full" />
            )}
            <span className="text-xs">{imgFailed ? "Image unavailable" : "Loading image…"}</span>
          </div>
        )}
        {/* Title overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 p-5">
          <span className="inline-block text-[10px] font-medium uppercase tracking-wider text-white/80 bg-white/15 backdrop-blur-sm rounded-full px-2.5 py-0.5 mb-2">
            {CATEGORY_LABEL[entry.category]}
          </span>
          <h1 className="font-heading text-3xl font-bold text-white tracking-tight drop-shadow">
            {entry.term}
          </h1>
          {entry.abbreviation && (
            <span className="text-sm font-mono text-white/80">{entry.abbreviation}</span>
          )}
        </div>
      </div>

      {/* TLDR — plain-English, "explain like I'm 5" callout */}
      <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4">
        <Sparkles className="w-5 h-5 text-blue-700 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-blue-700 mb-1">
            In plain words
          </p>
          <p className="text-slate-700 leading-relaxed">{entry.tldr}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Definition (main column) */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardContent className="p-6">
              <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
                <BookOpen className="w-4 h-4 text-blue-800" />
                Full Definition
              </h2>
              <div className="space-y-4">
                {entry.definition.map((para, idx) => (
                  <p key={idx} className="text-slate-600 leading-relaxed">{para}</p>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Real-world examples */}
          {entry.examples?.length > 0 && (
            <Card className="bg-white border-slate-200 shadow-sm">
              <CardContent className="p-6">
                <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  Real-World Examples
                </h2>
                <div className="space-y-4">
                  {entry.examples.map((ex, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-slate-900 font-medium">{ex.title}</h3>
                        <p className="text-sm text-slate-600 leading-relaxed mt-0.5">{ex.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar: key facts + related */}
        <div className="space-y-6">
          {entry.keyFacts?.length > 0 && (
            <Card className="bg-white border-slate-200 shadow-sm">
              <CardContent className="p-6">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
                  Key Facts
                </h2>
                <dl className="space-y-3">
                  {entry.keyFacts.map((fact, idx) => (
                    <div key={idx} className="flex flex-col">
                      <dt className="text-[11px] uppercase tracking-wide text-slate-400">{fact.label}</dt>
                      <dd className="text-sm font-medium text-slate-800">{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              </CardContent>
            </Card>
          )}

          {entry.related?.length > 0 && (
            <Card className="bg-white border-slate-200 shadow-sm">
              <CardContent className="p-6">
                <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
                  <LinkIcon className="w-4 h-4 text-slate-400" />
                  Related Terms
                </h2>
                <div className="space-y-1">
                  {entry.related
                    .map((relSlug) => LEXICON_BY_SLUG[relSlug])
                    .filter(Boolean)
                    .map((rel) => (
                      <Link
                        key={rel.slug}
                        to={`/lexicon/${rel.slug}`}
                        className="flex items-center justify-between group px-3 py-2 -mx-3 rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        <span className="text-sm text-slate-700 group-hover:text-blue-800">{rel.term}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-700" />
                      </Link>
                    ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Image attribution */}
      {imgSrc && !imgFailed && (
        <p className="text-[11px] text-slate-400">
          Image: Wikipedia / Wikimedia Commons. Definitions are simplified for general understanding.
        </p>
      )}
    </div>
  );
}
