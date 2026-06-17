import { useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Lightbulb,
  Link as LinkIcon,
  ImageOff,
} from "lucide-react";
import { LEXICON_BY_SLUG, CATEGORY_LABEL } from "@/data/lexicon";

export default function LexiconTerm() {
  const { slug } = useParams();
  const entry = LEXICON_BY_SLUG[slug];
  const [imgFailed, setImgFailed] = useState(false);

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
        {entry.image && !imgFailed ? (
          <img
            src={entry.image}
            alt={entry.imageAlt || entry.term}
            onError={() => setImgFailed(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-slate-400">
            <ImageOff className="w-8 h-8" />
            <span className="text-xs">Image unavailable</span>
          </div>
        )}
        {/* Title overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
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

      {/* Summary callout */}
      <p className="text-lg text-slate-700 leading-relaxed font-medium">{entry.summary}</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Definition (main column) */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardContent className="p-6">
              <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
                <BookOpen className="w-4 h-4 text-blue-800" />
                Definition
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
      {entry.image && !imgFailed && (
        <p className="text-[11px] text-slate-400">
          Image: Wikimedia Commons. Definitions are simplified for general understanding.
        </p>
      )}
    </div>
  );
}
