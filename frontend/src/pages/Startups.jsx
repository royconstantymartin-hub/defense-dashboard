import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { API } from "@/App";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Rocket,
  Globe,
  Users,
  Building2,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  DollarSign,
  Calendar,
  MapPin,
  Zap,
  Filter,
} from "lucide-react";
import CompanyProfileSheet from "@/components/CompanyProfileSheet";
import { Sheet, SheetContent } from "@/components/ui/sheet";

// Country → ISO alpha-2 code (lowercase) for flag images
const COUNTRY_ISO = {
  "USA": "us", "UK": "gb", "France": "fr", "Germany": "de",
  "Italy": "it", "Spain": "es", "Sweden": "se", "Norway": "no",
  "Finland": "fi", "Netherlands": "nl", "Belgium": "be",
  "Switzerland": "ch", "Poland": "pl", "Czech Republic": "cz",
  "Denmark": "dk", "Estonia": "ee", "Greece": "gr", "EU": "eu",
  "Israel": "il", "Turkey": "tr", "UAE": "ae", "Saudi Arabia": "sa",
  "India": "in", "China": "cn", "Russia": "ru", "Ukraine": "ua",
  "South Korea": "kr", "Japan": "jp", "Australia": "au",
  "Brazil": "br", "Canada": "ca", "Singapore": "sg",
  "South Africa": "za",
};

// Country display flags (emoji)
const COUNTRY_FLAGS = {
  "USA": "🇺🇸", "UK": "🇬🇧", "France": "🇫🇷", "Germany": "🇩🇪",
  "Italy": "🇮🇹", "Spain": "🇪🇸", "Sweden": "🇸🇪", "Norway": "🇳🇴",
  "Finland": "🇫🇮", "Netherlands": "🇳🇱", "Belgium": "🇧🇪",
  "Switzerland": "🇨🇭", "Poland": "🇵🇱", "Czech Republic": "🇨🇿",
  "Denmark": "🇩🇰", "Estonia": "🇪🇪", "Greece": "🇬🇷", "EU": "🇪🇺",
  "Israel": "🇮🇱", "Turkey": "🇹🇷", "UAE": "🇦🇪", "Saudi Arabia": "🇸🇦",
  "India": "🇮🇳", "China": "🇨🇳", "Russia": "🇷🇺", "Ukraine": "🇺🇦",
  "South Korea": "🇰🇷", "Japan": "🇯🇵", "Australia": "🇦🇺",
  "Brazil": "🇧🇷", "Canada": "🇨🇦", "Singapore": "🇸🇬",
  "South Africa": "🇿🇦",
};

// Segment colour mapping for specialization badges
const SPEC_COLOR = {
  "AI": "bg-violet-100 text-violet-700 border-violet-200",
  "Autonomous": "bg-blue-100 text-blue-700 border-blue-200",
  "UAV": "bg-sky-100 text-sky-700 border-sky-200",
  "UGV": "bg-teal-100 text-teal-700 border-teal-200",
  "Cyber": "bg-rose-100 text-rose-700 border-rose-200",
  "Space": "bg-indigo-100 text-indigo-700 border-indigo-200",
  "Electronic Warfare": "bg-amber-100 text-amber-700 border-amber-200",
  "Counter-UAS": "bg-orange-100 text-orange-700 border-orange-200",
  "Hypersonics": "bg-red-100 text-red-700 border-red-200",
  "Naval": "bg-cyan-100 text-cyan-700 border-cyan-200",
  "Robotics": "bg-emerald-100 text-emerald-700 border-emerald-200",
};

function specBadgeClass(spec) {
  for (const [key, cls] of Object.entries(SPEC_COLOR)) {
    if (spec.toLowerCase().includes(key.toLowerCase())) return cls;
  }
  return "bg-slate-100 text-slate-600 border-slate-200";
}

// Determine whether a company is a startup (private, small, tech-focused)
function isStartup(company) {
  const priv = company.is_public === false || company.ticker?.includes("-PRIV") || company.ticker === "PRIVATE";
  if (!priv) return false;
  // Exclude huge state-owned defence conglomerates
  if (company.employees > 20000) return false;
  if (company.market_cap > 20) return false;
  return true;
}

// Company logo with fallback
function CompanyLogo({ company, size = "md" }) {
  const [src, setSrc] = useState(null);
  const dim = size === "sm" ? "w-8 h-8" : size === "lg" ? "w-14 h-14" : "w-10 h-10";
  const textSize = size === "sm" ? "text-xs" : size === "lg" ? "text-lg" : "text-sm";

  useEffect(() => {
    const domain = company.website
      ? company.website.replace(/^https?:\/\//, "").split("/")[0]
      : null;
    if (domain) setSrc(`https://logo.clearbit.com/${domain}`);
  }, [company.website, company.name]);

  const initials = company.name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  if (!src) {
    return (
      <div className={`${dim} rounded-lg bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center flex-shrink-0`}>
        <span className={`font-bold text-purple-700 ${textSize}`}>{initials}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={company.name}
      className={`${dim} rounded-lg object-contain bg-white border border-slate-100 flex-shrink-0`}
      onError={() => setSrc(null)}
    />
  );
}

// Funding badge colour
function FundingBadge({ stage }) {
  if (!stage) return null;
  const s = stage.toLowerCase();
  let cls = "bg-slate-100 text-slate-600";
  if (s.includes("series a")) cls = "bg-emerald-100 text-emerald-700";
  else if (s.includes("series b")) cls = "bg-blue-100 text-blue-700";
  else if (s.includes("series c")) cls = "bg-indigo-100 text-indigo-700";
  else if (s.includes("series d") || s.includes("series e") || s.includes("series f")) cls = "bg-violet-100 text-violet-700";
  else if (s.includes("seed")) cls = "bg-amber-100 text-amber-700";
  else if (s.includes("acquired") || s.includes("acquisition")) cls = "bg-rose-100 text-rose-700";
  else if (s.includes("public")) cls = "bg-teal-100 text-teal-700";
  else if (s.includes("private")) cls = "bg-slate-100 text-slate-600";

  const short = stage.length > 40 ? stage.slice(0, 40) + "…" : stage;
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${cls}`}>
      <DollarSign className="w-3 h-3" />
      {short}
    </span>
  );
}

// Single startup card
function StartupCard({ company, onClick }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card
      className="bg-white border border-slate-200 rounded-xl shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] hover:shadow-lg hover:border-purple-200 transition-all duration-200 cursor-pointer group"
    >
      <CardContent className="p-5">
        {/* Header row */}
        <div className="flex items-start gap-3 mb-3">
          <CompanyLogo company={company} size="md" />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3
                className="font-semibold text-slate-900 text-sm leading-tight group-hover:text-purple-700 transition-colors"
                onClick={onClick}
              >
                {company.name}
              </h3>
              {company.website && (
                <a
                  href={company.website.startsWith("http") ? company.website : `https://${company.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-slate-400 hover:text-purple-600 transition-colors flex-shrink-0"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-2 mt-1">
              {company.founded_year && (
                <span className="flex items-center gap-1 text-xs text-slate-500">
                  <Calendar className="w-3 h-3" />
                  {company.founded_year}
                </span>
              )}
              {company.headquarters && (
                <span className="flex items-center gap-1 text-xs text-slate-500 truncate max-w-[160px]">
                  <MapPin className="w-3 h-3 flex-shrink-0" />
                  {company.headquarters}
                </span>
              )}
              {company.employees > 0 && (
                <span className="flex items-center gap-1 text-xs text-slate-500">
                  <Users className="w-3 h-3" />
                  {company.employees.toLocaleString()}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Funding */}
        {company.funding_stage && (
          <div className="mb-3">
            <FundingBadge stage={company.funding_stage} />
          </div>
        )}

        {/* Specializations */}
        {company.specializations?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {company.specializations.slice(0, 4).map((s) => (
              <span
                key={s}
                className={`text-xs font-medium px-2 py-0.5 rounded-full border ${specBadgeClass(s)}`}
              >
                {s}
              </span>
            ))}
            {company.specializations.length > 4 && (
              <span className="text-xs text-slate-400 px-1 py-0.5">+{company.specializations.length - 4}</span>
            )}
          </div>
        )}

        {/* Description */}
        {company.description && (
          <div className="mb-3">
            <p className={`text-xs text-slate-600 leading-relaxed ${!expanded ? "line-clamp-3" : ""}`}>
              {company.description}
            </p>
            {company.description.length > 180 && (
              <button
                onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
                className="text-xs text-purple-600 hover:text-purple-800 mt-1 flex items-center gap-0.5"
              >
                {expanded ? <><ChevronUp className="w-3 h-3" /> Réduire</> : <><ChevronDown className="w-3 h-3" /> Voir plus</>}
              </button>
            )}
          </div>
        )}

        {/* Programs */}
        {company.programs?.length > 0 && (
          <div className="mb-3">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1.5">Programmes clés</p>
            <div className="flex flex-col gap-1">
              {company.programs.slice(0, 3).map((p) => (
                <div key={p} className="flex items-start gap-1.5">
                  <Zap className="w-3 h-3 text-purple-400 mt-0.5 flex-shrink-0" />
                  <span className="text-xs text-slate-700">{p}</span>
                </div>
              ))}
              {company.programs.length > 3 && (
                <span className="text-xs text-slate-400 ml-4">+{company.programs.length - 3} autres</span>
              )}
            </div>
          </div>
        )}

        {/* Export markets */}
        {company.export_countries?.length > 0 && (
          <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-slate-100">
            <Globe className="w-3 h-3 text-slate-400 flex-shrink-0" />
            <div className="flex gap-1 flex-wrap">
              {company.export_countries.slice(0, 8).map((code) => {
                const c = (code || "").toLowerCase();
                return (
                  <img
                    key={c}
                    src={`https://flagcdn.com/w20/${c}.png`}
                    alt={c}
                    title={c.toUpperCase()}
                    className="w-5 h-auto rounded-sm"
                    onError={(e) => { e.target.style.display = "none"; }}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* CTA */}
        <button
          onClick={onClick}
          className="mt-3 w-full text-center text-xs font-medium text-purple-700 hover:text-purple-900 py-1.5 rounded-lg border border-purple-200 hover:bg-purple-50 transition-colors"
        >
          Voir la fiche complète →
        </button>
      </CardContent>
    </Card>
  );
}

// Country section with all its startups
function CountrySection({ country, startups, onSelectCompany }) {
  const [collapsed, setCollapsed] = useState(false);
  const iso = COUNTRY_ISO[country] || "xx";
  const flag = COUNTRY_FLAGS[country] || "🌍";

  return (
    <section className="mb-10">
      {/* Country header */}
      <div
        className="flex items-center justify-between mb-4 cursor-pointer group"
        onClick={() => setCollapsed(!collapsed)}
      >
        <div className="flex items-center gap-3">
          <img
            src={`https://flagcdn.com/w40/${iso}.png`}
            alt={country}
            className="w-8 h-auto rounded shadow-sm"
            onError={(e) => { e.target.style.display = "none"; }}
          />
          <h2 className="text-base font-bold text-slate-800 group-hover:text-purple-700 transition-colors">
            {flag} {country}
          </h2>
          <span className="bg-purple-100 text-purple-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            {startups.length} startup{startups.length > 1 ? "s" : ""}
          </span>
        </div>
        <button className="text-slate-400 hover:text-slate-600 transition-colors">
          {collapsed ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
        </button>
      </div>

      {/* Grid of startup cards */}
      {!collapsed && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {startups.map((company) => (
            <StartupCard
              key={company.id || company.name}
              company={company}
              onClick={() => onSelectCompany(company)}
            />
          ))}
        </div>
      )}
    </section>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function Startups() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [filterCountry, setFilterCountry] = useState("all");
  const [filterSpec, setFilterSpec] = useState("all");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const { data } = await axios.get(`${API}/defense-players`);
        setCompanies(data);
      } catch (e) {
        setError("Impossible de charger les données.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Filter to startups only
  const startups = useMemo(() => companies.filter(isStartup), [companies]);

  // All unique specializations across startups
  const allSpecs = useMemo(() => {
    const set = new Set();
    startups.forEach((c) => (c.specializations || []).forEach((s) => set.add(s)));
    return ["all", ...Array.from(set).sort()];
  }, [startups]);

  // All countries that have startups
  const allCountries = useMemo(() => {
    const set = new Set(startups.map((c) => c.country).filter(Boolean));
    return ["all", ...Array.from(set).sort()];
  }, [startups]);

  // Filtered + searched startups
  const filtered = useMemo(() => {
    let list = startups;
    if (filterCountry !== "all") list = list.filter((c) => c.country === filterCountry);
    if (filterSpec !== "all") list = list.filter((c) => (c.specializations || []).includes(filterSpec));
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          (c.description || "").toLowerCase().includes(q) ||
          (c.specializations || []).some((s) => s.toLowerCase().includes(q)) ||
          (c.headquarters || "").toLowerCase().includes(q)
      );
    }
    return list;
  }, [startups, filterCountry, filterSpec, search]);

  // Group by country, ordered by count desc
  const groupedByCountry = useMemo(() => {
    const map = {};
    filtered.forEach((c) => {
      if (!map[c.country]) map[c.country] = [];
      map[c.country].push(c);
    });
    // Sort each country's startups by market_cap desc
    Object.values(map).forEach((arr) => arr.sort((a, b) => (b.market_cap || 0) - (a.market_cap || 0)));
    // Sort countries by number of startups desc
    return Object.entries(map).sort((a, b) => b[1].length - a[1].length);
  }, [filtered]);

  // Stats
  const totalEmployees = useMemo(() => startups.reduce((s, c) => s + (c.employees || 0), 0), [startups]);
  const totalFunded = useMemo(() => startups.filter((c) => c.funding_stage && !c.funding_stage.toLowerCase().includes("private")).length, [startups]);
  const countriesCount = useMemo(() => new Set(startups.map((c) => c.country)).size, [startups]);

  function openProfile(company) {
    setSelectedCompany(company);
    setProfileOpen(true);
  }

  return (
    <div className="p-6 max-w-screen-2xl mx-auto">
      {/* Page header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-purple-700 flex items-center justify-center">
            <Rocket className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 font-heading">Startups Défense</h1>
            <p className="text-sm text-slate-500">Fiches entreprises par pays — {startups.length} startups référencées</p>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      {!loading && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Startups", value: startups.length, icon: Rocket, color: "text-purple-700" },
            { label: "Pays", value: countriesCount, icon: Globe, color: "text-blue-600" },
            { label: "Employés", value: totalEmployees.toLocaleString("fr-FR"), icon: Users, color: "text-emerald-600" },
            { label: "Financées", value: totalFunded, icon: DollarSign, color: "text-amber-600" },
          ].map(({ label, value, icon: Icon, color }) => (
            <Card key={label} className="bg-white border border-slate-200 rounded-xl shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]">
              <CardContent className="p-4 flex items-center gap-3">
                <div className={`w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center ${color}`}>
                  <Icon className="w-4.5 h-4.5" />
                </div>
                <div>
                  <p className="text-xl font-bold text-slate-900">{value}</p>
                  <p className="text-xs text-slate-500">{label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Rechercher une startup…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9 text-sm border-slate-200"
          />
        </div>

        <Select value={filterCountry} onValueChange={setFilterCountry}>
          <SelectTrigger className="w-44 h-9 text-sm border-slate-200">
            <Globe className="w-4 h-4 mr-1.5 text-slate-400" />
            <SelectValue placeholder="Pays" />
          </SelectTrigger>
          <SelectContent>
            {allCountries.map((c) => (
              <SelectItem key={c} value={c}>
                {c === "all" ? "Tous les pays" : `${COUNTRY_FLAGS[c] || ""} ${c}`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filterSpec} onValueChange={setFilterSpec}>
          <SelectTrigger className="w-48 h-9 text-sm border-slate-200">
            <Filter className="w-4 h-4 mr-1.5 text-slate-400" />
            <SelectValue placeholder="Spécialisation" />
          </SelectTrigger>
          <SelectContent>
            {allSpecs.map((s) => (
              <SelectItem key={s} value={s}>
                {s === "all" ? "Toutes spécialisations" : s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {(search || filterCountry !== "all" || filterSpec !== "all") && (
          <button
            onClick={() => { setSearch(""); setFilterCountry("all"); setFilterSpec("all"); }}
            className="text-sm text-slate-500 hover:text-slate-800 flex items-center gap-1.5 px-3 h-9 rounded-md border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            Réinitialiser
          </button>
        )}
      </div>

      {/* Results count */}
      {(search || filterCountry !== "all" || filterSpec !== "all") && (
        <p className="text-sm text-slate-500 mb-4">
          {filtered.length} startup{filtered.length > 1 ? "s" : ""} trouvée{filtered.length > 1 ? "s" : ""}
        </p>
      )}

      {/* Main content */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-3">
          <div className="w-10 h-10 rounded-full border-4 border-purple-200 border-t-purple-700 animate-spin" />
          <p className="text-sm text-slate-500">Chargement des startups…</p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-24 gap-2">
          <Building2 className="w-10 h-10 text-rose-400" />
          <p className="text-sm text-rose-600">{error}</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-2">
          <Rocket className="w-10 h-10 text-slate-300" />
          <p className="text-slate-500 text-sm">Aucune startup ne correspond à votre recherche.</p>
        </div>
      ) : (
        groupedByCountry.map(([country, list]) => (
          <CountrySection
            key={country}
            country={country}
            startups={list}
            onSelectCompany={openProfile}
          />
        ))
      )}

      {/* Company profile sheet */}
      <Sheet open={profileOpen} onOpenChange={setProfileOpen}>
        <SheetContent side="right" className="w-full sm:max-w-2xl p-0 overflow-y-auto">
          {selectedCompany && (
            <CompanyProfileSheet
              company={selectedCompany}
              onClose={() => setProfileOpen(false)}
            />
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
