import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  ExternalLink,
  Search,
  Newspaper,
  Building2,
  BookOpen,
  Globe2,
  ShieldCheck,
  BarChart3,
} from "lucide-react";

// ─── Curated source catalogue ──────────────────────────────────────────────
// Each source is manually verified and categorised.
// No scraped content — users navigate directly to the primary source.

const CATEGORIES = [
  { id: "all",        label: "All",             icon: Globe2 },
  { id: "press",      label: "Specialty Press", icon: Newspaper },
  { id: "institution",label: "Institutions",    icon: ShieldCheck },
  { id: "thinktank",  label: "Think Tanks",     icon: BookOpen },
  { id: "market",     label: "Market Data",     icon: BarChart3 },
  { id: "industry",   label: "Industry",        icon: Building2 },
];

const SOURCES = [
  // ── Specialty Press ──────────────────────────────────────────────────────
  {
    id: "janes",
    name: "Jane's",
    description: "Global reference for defense & security intelligence. Coverage of equipment, programs, and orders of battle.",
    url: "https://www.janes.com",
    category: "press",
    lang: ["EN"],
    tags: ["equipment", "programs", "intelligence"],
    paywall: true,
  },
  {
    id: "defensenews",
    name: "Defense News",
    description: "International defense news covering contracts, acquisition policies, and budgets. Reference publication of the Sightline Media group.",
    url: "https://www.defensenews.com",
    category: "press",
    lang: ["EN"],
    tags: ["contracts", "acquisitions", "budget"],
    paywall: false,
  },
  {
    id: "breakingdefense",
    name: "Breaking Defense",
    description: "In-depth coverage of US, European and Indo-Pacific acquisition policies. Strong on budget analysis and Pentagon news.",
    url: "https://breakingdefense.com",
    category: "press",
    lang: ["EN"],
    tags: ["policy", "budget", "acquisition"],
    paywall: false,
  },
  {
    id: "aviationweek",
    name: "Aviation Week & Space Technology",
    description: "Reference publication for aeronautics, aerospace and defense. Combat aircraft programs, UAVs, military space.",
    url: "https://aviationweek.com",
    category: "press",
    lang: ["EN"],
    tags: ["aviation", "space", "programs"],
    paywall: true,
  },
  {
    id: "thewarzone",
    name: "The War Zone (The Drive)",
    description: "Detailed analyses of weapons systems, ongoing conflicts, and military doctrine. Very strong on US technical topics.",
    url: "https://www.thedrive.com/the-war-zone",
    category: "press",
    lang: ["EN"],
    tags: ["systems", "conflicts", "doctrine"],
    paywall: false,
  },
  {
    id: "opex360",
    name: "Opex 360",
    description: "Leading French-language defense & security news site. External operations, DGA, and French programs.",
    url: "https://www.opex360.com",
    category: "press",
    lang: ["FR"],
    tags: ["France", "operations", "DGA"],
    paywall: false,
  },
  {
    id: "metadefense",
    name: "Meta-Défense",
    description: "Strategic and industrial analyses of European defense, with a focus on Franco-European programs.",
    url: "https://www.meta-defense.fr",
    category: "press",
    lang: ["FR"],
    tags: ["Europe", "programs", "industry"],
    paywall: false,
  },
  {
    id: "ttj",
    name: "French Official Defense Public Procurement Bulletin (BOAMP)",
    description: "Official bulletin for public procurement notices. Primary source for DGA and ministry calls for tenders.",
    url: "https://www.boamp.fr",
    category: "press",
    lang: ["FR"],
    tags: ["public procurement", "tenders", "DGA"],
    paywall: false,
  },
  {
    id: "europeandefencematters",
    name: "European Defence Matters",
    description: "Magazine of the European Defence Agency. Cooperative programs, PESCO, European Defence Fund.",
    url: "https://eda.europa.eu/webzine",
    category: "press",
    lang: ["EN"],
    tags: ["Europe", "PESCO", "cooperation"],
    paywall: false,
  },

  // ── Institutions ────────────────────────────────────────────────────────
  {
    id: "dga",
    name: "DGA – Directorate General of Armaments",
    description: "Official press releases, armament programs, awarded contracts, annual performance report. French primary source.",
    url: "https://www.defense.gouv.fr/dga",
    category: "institution",
    lang: ["FR"],
    tags: ["France", "programs", "contracts"],
    paywall: false,
  },
  {
    id: "nato_newsroom",
    name: "NATO Newsroom",
    description: "Press releases, speeches, and official NATO documents. Council decisions, budget, and capabilities.",
    url: "https://www.nato.int/cps/en/natohq/news.htm",
    category: "institution",
    lang: ["EN", "FR"],
    tags: ["NATO", "policy", "capabilities"],
    paywall: false,
  },
  {
    id: "dod",
    name: "U.S. Department of Defense – Press Releases",
    description: "Daily contract awards, budget announcements, and official Pentagon publications.",
    url: "https://www.defense.gov/News/Releases/",
    category: "institution",
    lang: ["EN"],
    tags: ["USA", "contracts", "budget"],
    paywall: false,
  },
  {
    id: "eda",
    name: "European Defence Agency (EDA)",
    description: "Data on European defense spending, R&D cooperation, and PESCO programs.",
    url: "https://eda.europa.eu",
    category: "institution",
    lang: ["EN"],
    tags: ["Europe", "R&D", "cooperation"],
    paywall: false,
  },
  {
    id: "uk_mod",
    name: "UK Ministry of Defence",
    description: "Contract announcements, defense strategy, and white papers. Spending data published annually.",
    url: "https://www.gov.uk/government/organisations/ministry-of-defence",
    category: "institution",
    lang: ["EN"],
    tags: ["UK", "contracts", "strategy"],
    paywall: false,
  },
  {
    id: "bundeswehr",
    name: "Bundeswehr / BMVg",
    description: "German Federal Ministry of Defence. Programs, Zeitenwende, and German defense budget.",
    url: "https://www.bmvg.de",
    category: "institution",
    lang: ["DE"],
    tags: ["Germany", "programs", "budget"],
    paywall: false,
  },

  // ── Think Tanks & Research ───────────────────────────────────────────────
  {
    id: "sipri",
    name: "SIPRI – Stockholm International Peace Research Institute",
    description: "Global reference database on military spending, arms transfers, and nuclear arsenals. Free annual data.",
    url: "https://www.sipri.org",
    category: "thinktank",
    lang: ["EN"],
    tags: ["spending", "transfers", "data"],
    paywall: false,
  },
  {
    id: "iiss",
    name: "IISS – International Institute for Strategic Studies",
    description: "Military Balance (annual reference on global military capabilities) and strategic analyses.",
    url: "https://www.iiss.org",
    category: "thinktank",
    lang: ["EN"],
    tags: ["capabilities", "strategy", "Military Balance"],
    paywall: true,
  },
  {
    id: "irsem",
    name: "IRSEM – Strategic Research Institute of the Military School",
    description: "French think tank affiliated with the Ministry of Armed Forces. Strategic studies, geopolitics, and defense industry.",
    url: "https://www.irsem.fr",
    category: "thinktank",
    lang: ["FR", "EN"],
    tags: ["France", "strategy", "geopolitics"],
    paywall: false,
  },
  {
    id: "ifri_securite",
    name: "IFRI – Security & Defence Program",
    description: "French Institute of International Relations. Work on European defense industry, DTIB, and strategic autonomy.",
    url: "https://www.ifri.org/fr/espaces-thematiques/securite-defense",
    category: "thinktank",
    lang: ["FR", "EN"],
    tags: ["Europe", "DTIB", "strategic autonomy"],
    paywall: false,
  },
  {
    id: "csis",
    name: "CSIS – Center for Strategic and International Studies",
    description: "Washington-based think tank. Defense acquisition, industry, Indo-Pacific, and cybersecurity.",
    url: "https://www.csis.org/programs/defense-industrial-initiatives-group",
    category: "thinktank",
    lang: ["EN"],
    tags: ["USA", "acquisition", "industry"],
    paywall: false,
  },
  {
    id: "rand",
    name: "RAND Corporation",
    description: "In-depth studies on acquisition, capability planning, deterrence, and military strategies.",
    url: "https://www.rand.org/topics/military.html",
    category: "thinktank",
    lang: ["EN"],
    tags: ["planning", "acquisition", "deterrence"],
    paywall: false,
  },
  {
    id: "fondation_recherche",
    name: "FRS – Foundation for Strategic Research",
    description: "French expertise in non-proliferation, nuclear strategy, arms control, and export.",
    url: "https://www.frstrategie.org",
    category: "thinktank",
    lang: ["FR"],
    tags: ["nuclear", "export", "arms control"],
    paywall: false,
  },

  // ── Market Data ──────────────────────────────────────────────────────────
  {
    id: "sam_gov",
    name: "SAM.gov – U.S. Federal Contract Opportunities",
    description: "Official US source for federal contract opportunities and awards. Essential for the American defense market.",
    url: "https://sam.gov/content/opportunities",
    category: "market",
    lang: ["EN"],
    tags: ["USA", "contracts", "tenders"],
    paywall: false,
  },
  {
    id: "ted",
    name: "TED – Tenders Electronic Daily (EU)",
    description: "Supplement to the EU Official Journal. European public procurement including defense purchases.",
    url: "https://ted.europa.eu",
    category: "market",
    lang: ["FR", "EN"],
    tags: ["Europe", "public procurement", "tenders"],
    paywall: false,
  },
  {
    id: "nato_nspa",
    name: "NATO Support and Procurement Agency (NSPA)",
    description: "NATO acquisition opportunities, logistics contracts, munitions, and services.",
    url: "https://www.nspa.nato.int/business/procurement",
    category: "market",
    lang: ["EN"],
    tags: ["NATO", "logistics", "acquisition"],
    paywall: false,
  },
  {
    id: "aerospace_forecast",
    name: "Aerospace & Defense Industry Monitor (ASD)",
    description: "ASD Eurospace association. Industrial data on the European aerospace & defense sector.",
    url: "https://www.asd-europe.org",
    category: "market",
    lang: ["EN"],
    tags: ["Europe", "industry", "statistics"],
    paywall: false,
  },

  // ── Industry ─────────────────────────────────────────────────────────────
  {
    id: "airbus_defence",
    name: "Airbus Defence & Space – Newsroom",
    description: "Official Airbus D&S press releases. Programs, contracts, partnerships, and financial results.",
    url: "https://www.airbus.com/en/newsroom",
    category: "industry",
    lang: ["EN", "FR"],
    tags: ["Airbus", "programs", "contracts"],
    paywall: false,
  },
  {
    id: "thales_newsroom",
    name: "Thales Group – Newsroom",
    description: "Thales news: contracts, innovations, results, and partnerships. Defense & security electronics.",
    url: "https://www.thalesgroup.com/en/worldwide/press_releases",
    category: "industry",
    lang: ["EN", "FR"],
    tags: ["Thales", "electronics", "contracts"],
    paywall: false,
  },
  {
    id: "safran_newsroom",
    name: "Safran – News",
    description: "Engines, aeronautical equipment and defense. LEAP, Rafale, and helicopter programs.",
    url: "https://www.safran-group.com/fr/media/actualites",
    category: "industry",
    lang: ["FR", "EN"],
    tags: ["Safran", "engines", "Rafale"],
    paywall: false,
  },
  {
    id: "mbda_newsroom",
    name: "MBDA – Press Releases",
    description: "European missile manufacturer. Meteor, Mistral, ASMP-A, and CAMM contracts and programs.",
    url: "https://www.mbda-systems.com/press-releases/",
    category: "industry",
    lang: ["EN", "FR"],
    tags: ["missiles", "programs", "MBDA"],
    paywall: false,
  },
];

// ─── Component ──────────────────────────────────────────────────────────────

const LANG_COLORS = {
  FR: "bg-blue-50 text-blue-700 border-blue-200",
  EN: "bg-slate-50 text-slate-600 border-slate-200",
  DE: "bg-yellow-50 text-yellow-700 border-yellow-200",
};

function SourceLogo({ url }) {
  const domain = url.replace(/^https?:\/\//, "").split("/")[0];
  const [errored, setErrored] = useState(false);
  if (errored) return <Globe2 className="w-5 h-5 text-slate-300" />;
  return (
    <img
      src={`https://logo.clearbit.com/${domain}`}
      alt=""
      className="w-5 h-5 object-contain"
      onError={() => setErrored(true)}
    />
  );
}

export default function Follow() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = SOURCES.filter(s => {
    const matchCat = activeCategory === "all" || s.category === activeCategory;
    const q = search.toLowerCase();
    const matchSearch = !q
      || s.name.toLowerCase().includes(q)
      || s.description.toLowerCase().includes(q)
      || s.tags.some(t => t.toLowerCase().includes(q));
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-slate-900 tracking-tight">
            Reference Sources
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Curated source catalogue — press, institutions, think tanks, market data
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 max-w-sm">
          <span className="text-amber-500">ℹ</span>
          <span>
            These are direct links to primary publications. No content is reproduced here.
          </span>
        </div>
      </div>

      {/* Search + Category filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search a source, tag..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 border-slate-200 text-sm"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map(cat => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeCategory === cat.id
                    ? "bg-purple-700 text-white"
                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results count */}
      <p className="text-xs text-slate-400">
        {filtered.length} source{filtered.length > 1 ? "s" : ""} shown
      </p>

      {/* Source grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(source => (
          <a
            key={source.id}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            <Card className="bg-white border-slate-200 shadow-sm h-full hover:border-purple-300 hover:shadow-md transition-all duration-200">
              <CardContent className="p-4 flex flex-col gap-3 h-full">
                {/* Top row */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5 flex-1 min-w-0">
                    <div className="flex-shrink-0 w-8 h-8 rounded-md bg-slate-50 border border-slate-100 flex items-center justify-center">
                      <SourceLogo url={source.url} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-slate-900 group-hover:text-purple-700 transition-colors leading-tight">
                        {source.name}
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5 font-mono truncate">{source.url.replace("https://", "")}</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-purple-500 flex-shrink-0 mt-0.5 transition-colors" />
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed flex-1">
                  {source.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100">
                  {/* Languages */}
                  <div className="flex gap-1">
                    {source.lang.map(l => (
                      <span
                        key={l}
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${LANG_COLORS[l] ?? "bg-slate-50 text-slate-600 border-slate-200"}`}
                      >
                        {l}
                      </span>
                    ))}
                  </div>
                  {/* Tags + paywall indicator */}
                  <div className="flex items-center gap-1 flex-wrap justify-end">
                    {source.paywall && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 font-medium">
                        Paid
                      </span>
                    )}
                    {source.tags.slice(0, 2).map(tag => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-[10px] px-1.5 py-0 bg-slate-50 text-slate-500 border border-slate-100 font-normal"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-slate-400">
          <Search className="w-8 h-8 mb-3 opacity-40" />
          <p className="text-sm">No sources match this search.</p>
        </div>
      )}
    </div>
  );
}
