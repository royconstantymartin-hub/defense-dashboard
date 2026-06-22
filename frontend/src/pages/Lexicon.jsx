import { useMemo, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { getWikiImage } from "@/lib/wikiImage";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Filter,
  BookOpen,
  ArrowRight,
  ArrowLeftRight,
  Rocket,
  Radio,
  Plane,
  Brain,
  Factory,
  Library,
} from "lucide-react";
import { LEXICON, LEXICON_CATEGORIES, CATEGORY_LABEL } from "@/data/lexicon";

// Each category gets an icon + tint so cards are scannable at a glance.
const CATEGORY_STYLE = {
  trade:     { Icon: ArrowLeftRight, cls: "text-blue-800",   bg: "bg-blue-50 border-blue-100" },
  missiles:  { Icon: Rocket,         cls: "text-rose-600",   bg: "bg-rose-50 border-rose-100" },
  systems:   { Icon: Radio,          cls: "text-emerald-600",bg: "bg-emerald-50 border-emerald-100" },
  platforms: { Icon: Plane,          cls: "text-amber-600",  bg: "bg-amber-50 border-amber-100" },
  doctrine:  { Icon: Brain,          cls: "text-slate-600",  bg: "bg-slate-100 border-slate-200" },
  industry:  { Icon: Factory,        cls: "text-indigo-600", bg: "bg-indigo-50 border-indigo-100" },
};

const categoryStyle = (category) =>
  CATEGORY_STYLE[category] || { Icon: BookOpen, cls: "text-slate-600", bg: "bg-slate-100 border-slate-200" };

// Mini thumbnail for a card: lazily fetches the term's Wikipedia photo (the same
// image used as the detail-page hero) and shows it in place of the icon. Only
// loads once the card scrolls near the viewport, and falls back to the category
// icon when the term has no image.
function CardThumb({ wiki, alt, Icon, cls, bg }) {
  const ref = useRef(null);
  const [src, setSrc] = useState(null);
  const [failed, setFailed] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || !wiki) return;
    let active = true;
    getWikiImage(wiki, 200).then((url) => {
      if (!active) return;
      if (url) setSrc(url);
      else setFailed(true);
    });
    return () => { active = false; };
  }, [visible, wiki]);

  const showImage = src && !failed;

  return (
    <div
      ref={ref}
      className={`w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border ${showImage ? "border-slate-200" : bg}`}
    >
      {showImage ? (
        <img
          src={src}
          alt={alt}
          onError={() => setFailed(true)}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <Icon className={`w-5 h-5 ${cls}`} />
        </div>
      )}
    </div>
  );
}

export default function Lexicon() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filtered = useMemo(() => {
    let list = LEXICON;
    if (selectedCategory !== "all") {
      list = list.filter((e) => e.category === selectedCategory);
    }
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      list = list.filter(
        (e) =>
          e.term.toLowerCase().includes(q) ||
          (e.abbreviation || "").toLowerCase().includes(q) ||
          e.tldr.toLowerCase().includes(q) ||
          (e.summary || "").toLowerCase().includes(q)
      );
    }
    return [...list].sort((a, b) => a.term.localeCompare(b.term));
  }, [searchTerm, selectedCategory]);

  return (
    <div data-testid="lexicon-page" className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-slate-900 tracking-tight">
            Defense Lexicon
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Plain-English definitions of key defense terminology — click any term for examples & detail
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 bg-white border border-slate-200 rounded-lg px-3 py-2">
          <Library className="w-3.5 h-3.5" />
          <span>{LEXICON.length} terms</span>
          <span className="text-slate-300">|</span>
          <span>{LEXICON_CATEGORIES.length - 1} categories</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search terms (e.g. offset, ballistic, BVR)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400"
            data-testid="search-lexicon"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-56 bg-white border-slate-200 text-slate-700" data-testid="category-filter">
            <Filter className="w-4 h-4 mr-2 text-slate-400" />
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent className="bg-white border-slate-200">
            {LEXICON_CATEGORIES.map((c) => (
              <SelectItem key={c.value} value={c.value} className="text-slate-700 focus:bg-slate-50">
                {c.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Grid of term cards */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <Search className="w-8 h-8 text-slate-300" />
          <p className="text-sm text-slate-500">No terms match your search</p>
          <button
            onClick={() => { setSearchTerm(""); setSelectedCategory("all"); }}
            className="text-xs text-blue-700 hover:text-blue-900 font-medium underline underline-offset-2"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4" data-testid="lexicon-grid">
          {filtered.map((entry) => {
            const { Icon, cls, bg } = categoryStyle(entry.category);
            return (
              <Link
                key={entry.slug}
                to={`/lexicon/${entry.slug}`}
                className="group block"
                data-testid={`lexicon-card-${entry.slug}`}
              >
                <Card className="bg-white border-slate-200 rounded-xl shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] hover:shadow-lg hover:border-blue-200 transition-all duration-200 h-full">
                  <CardContent className="p-5 flex flex-col h-full">
                    <div className="flex items-start gap-3 mb-3">
                      <CardThumb
                        wiki={entry.wiki}
                        alt={entry.imageAlt || entry.term}
                        Icon={Icon}
                        cls={cls}
                        bg={bg}
                      />
                      <div className="min-w-0">
                        <h3 className="font-heading font-bold text-slate-900 leading-tight group-hover:text-blue-800 transition-colors">
                          {entry.term}
                        </h3>
                        {entry.abbreviation && (
                          <span className="text-[11px] font-mono text-slate-400">{entry.abbreviation}</span>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed flex-1">{entry.tldr}</p>
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
                      <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                        {CATEGORY_LABEL[entry.category]}
                      </span>
                      <span className="flex items-center gap-1 text-xs font-medium text-blue-700 group-hover:gap-2 transition-all">
                        Read more <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
