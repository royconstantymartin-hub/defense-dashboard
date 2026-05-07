import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { API } from "@/App";
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
  Rocket,
  Globe,
  Users,
  Building2,
  ExternalLink,
  DollarSign,
  Calendar,
  MapPin,
  Filter,
} from "lucide-react";
import CompanyProfileSheet from "@/components/CompanyProfileSheet";

const COUNTRY_ISO = {
  "USA": "us", "UK": "gb", "France": "fr", "Germany": "de",
  "Italy": "it", "Spain": "es", "Sweden": "se", "Norway": "no",
  "Finland": "fi", "Netherlands": "nl", "Belgium": "be",
  "Switzerland": "ch", "Poland": "pl", "Czech Republic": "cz",
  "Denmark": "dk", "Estonia": "ee", "Greece": "gr",
  "Israel": "il", "Turkey": "tr", "UAE": "ae", "Saudi Arabia": "sa",
  "India": "in", "China": "cn", "Russia": "ru", "Ukraine": "ua",
  "South Korea": "kr", "Japan": "jp", "Australia": "au",
  "Brazil": "br", "Canada": "ca", "Singapore": "sg",
  "South Africa": "za",
};

const SPEC_COLOR = {
  "AI":                  "bg-violet-100 text-violet-700 border-violet-200",
  "Autonomous":          "bg-blue-100 text-blue-700 border-blue-200",
  "UAV":                 "bg-sky-100 text-sky-700 border-sky-200",
  "UGV":                 "bg-teal-100 text-teal-700 border-teal-200",
  "Cyber":               "bg-rose-100 text-rose-700 border-rose-200",
  "Space":               "bg-indigo-100 text-indigo-700 border-indigo-200",
  "Electronic Warfare":  "bg-amber-100 text-amber-700 border-amber-200",
  "Counter-UAS":         "bg-orange-100 text-orange-700 border-orange-200",
  "Hypersonics":         "bg-red-100 text-red-700 border-red-200",
  "Naval":               "bg-cyan-100 text-cyan-700 border-cyan-200",
  "Robotics":            "bg-emerald-100 text-emerald-700 border-emerald-200",
};

function specBadgeClass(spec) {
  for (const [key, cls] of Object.entries(SPEC_COLOR)) {
    if (spec.toLowerCase().includes(key.toLowerCase())) return cls;
  }
  return "bg-slate-100 text-slate-600 border-slate-200";
}

// A company is a startup if it is private, has fewer than 5 000 employees,
// and a market cap under $3B — this excludes large primes like Naval Group.
function isStartup(company) {
  const isPrivate =
    company.is_public === false ||
    company.ticker?.includes("-PRIV") ||
    company.ticker === "PRIVATE";
  if (!isPrivate) return false;
  if ((company.employees || 0) > 5000) return false;
  if ((company.market_cap || 0) > 3) return false;
  return true;
}

function CompanyLogo({ company }) {
  const [src, setSrc] = useState(null);

  useEffect(() => {
    const domain = company.website
      ? company.website.replace(/^https?:\/\//, "").split("/")[0]
      : null;
    if (domain) setSrc(`https://logo.clearbit.com/${domain}`);
  }, [company.website]);

  const initials = company.name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  if (!src) {
    return (
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center flex-shrink-0">
        <span className="font-bold text-purple-700 text-sm">{initials}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={company.name}
      className="w-10 h-10 rounded-lg object-contain bg-white border border-slate-100 flex-shrink-0"
      onError={() => setSrc(null)}
    />
  );
}

function FundingBadge({ stage }) {
  if (!stage) return null;
  const s = stage.toLowerCase();
  let cls = "bg-slate-100 text-slate-600";
  if (s.includes("series a"))      cls = "bg-emerald-100 text-emerald-700";
  else if (s.includes("series b")) cls = "bg-blue-100 text-blue-700";
  else if (s.includes("series c")) cls = "bg-indigo-100 text-indigo-700";
  else if (s.includes("series d") || s.includes("series e") || s.includes("series f"))
                                    cls = "bg-violet-100 text-violet-700";
  else if (s.includes("seed"))      cls = "bg-amber-100 text-amber-700";
  else if (s.includes("acquired"))  cls = "bg-rose-100 text-rose-700";

  const short = stage.length > 40 ? stage.slice(0, 40) + "…" : stage;
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${cls}`}>
      <DollarSign className="w-3 h-3" />
      {short}
    </span>
  );
}

function StartupCard({ company, onClick }) {
  const iso = COUNTRY_ISO[(company.country || "").trim()];

  return (
    <Card
      className="bg-white border border-slate-200 rounded-xl shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] hover:shadow-lg hover:border-purple-200 transition-all duration-200 cursor-pointer group"
      onClick={onClick}
    >
      <CardContent className="p-4">
        {/* Header row */}
        <div className="flex items-start gap-3 mb-3">
          <CompanyLogo company={company} />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-slate-900 text-sm leading-tight group-hover:text-purple-700 transition-colors truncate">
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

            <div className="flex flex-wrap items-center gap-2 mt-1">
              {iso && (
                <img
                  src={`https://flagcdn.com/w20/${iso}.png`}
                  alt={company.country}
                  title={company.country}
                  className="w-4 h-auto rounded-sm"
                  onError={(e) => { e.target.style.display = "none"; }}
                />
              )}
              {company.headquarters && (
                <span className="flex items-center gap-1 text-xs text-slate-500 truncate max-w-[140px]">
                  <MapPin className="w-3 h-3 flex-shrink-0" />
                  {company.headquarters}
                </span>
              )}
              {company.founded_year && (
                <span className="flex items-center gap-1 text-xs text-slate-500">
                  <Calendar className="w-3 h-3" />
                  {company.founded_year}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Funding stage */}
        {company.funding_stage && (
          <div className="mb-3">
            <FundingBadge stage={company.funding_stage} />
          </div>
        )}

        {/* Specializations */}
        {company.specializations?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {company.specializations.slice(0, 3).map((s) => (
              <span
                key={s}
                className={`text-xs font-medium px-2 py-0.5 rounded-full border ${specBadgeClass(s)}`}
              >
                {s}
              </span>
            ))}
            {company.specializations.length > 3 && (
              <span className="text-xs text-slate-400 px-1 py-0.5">
                +{company.specializations.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Description — 2 lines max, full details in profile sheet */}
        {company.description && (
          <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-3">
            {company.description}
          </p>
        )}

        <div className="pt-2 border-t border-slate-100">
          <span className="text-xs font-medium text-purple-700 group-hover:text-purple-900 transition-colors">
            View full profile →
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function Startups() {
  const [companies, setCompanies]   = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);
  const [search, setSearch]         = useState("");
  const [filterCountry, setFilterCountry] = useState("all");
  const [filterSpec, setFilterSpec] = useState("all");
  const [profileName, setProfileName] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const { data } = await axios.get(`${API}/defense-players`);
        setCompanies(data);
      } catch {
        setError("Failed to load startup data.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const startups = useMemo(() => companies.filter(isStartup), [companies]);

  const allSpecs = useMemo(() => {
    const set = new Set();
    startups.forEach((c) => (c.specializations || []).forEach((s) => set.add(s)));
    return Array.from(set).sort();
  }, [startups]);

  // [country, count] pairs sorted by count desc
  const countryCounts = useMemo(() => {
    const map = {};
    startups.forEach((c) => {
      if (c.country) map[c.country] = (map[c.country] || 0) + 1;
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [startups]);

  const filtered = useMemo(() => {
    let list = startups;
    if (filterCountry !== "all") list = list.filter((c) => c.country === filterCountry);
    if (filterSpec !== "all")    list = list.filter((c) => (c.specializations || []).includes(filterSpec));
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

  const totalEmployees = useMemo(
    () => startups.reduce((s, c) => s + (c.employees || 0), 0),
    [startups]
  );
  const totalFunded = useMemo(
    () => startups.filter((c) => c.funding_stage && !c.funding_stage.toLowerCase().includes("private")).length,
    [startups]
  );

  return (
    <div className="p-6 max-w-screen-2xl mx-auto">
      {/* Page header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl bg-purple-700 flex items-center justify-center">
            <Rocket className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 font-heading">Defense Startups</h1>
            <p className="text-sm text-slate-500">
              Private defense companies · {startups.length} tracked
            </p>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      {!loading && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Startups",         value: startups.length,                  icon: Rocket,   color: "text-purple-700" },
            { label: "Countries",         value: countryCounts.length,             icon: Globe,    color: "text-blue-600" },
            { label: "Total Employees",   value: totalEmployees.toLocaleString(),  icon: Users,    color: "text-emerald-600" },
            { label: "Funded",            value: totalFunded,                      icon: DollarSign, color: "text-amber-600" },
          ].map(({ label, value, icon: Icon, color }) => (
            <Card key={label} className="bg-white border border-slate-200 rounded-xl shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]">
              <CardContent className="p-4 flex items-center gap-3">
                <div className={`w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center ${color}`}>
                  <Icon className="w-4 h-4" />
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

      {/* Search + spec filter */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search startups…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9 text-sm border-slate-200"
          />
        </div>

        <Select value={filterSpec} onValueChange={setFilterSpec}>
          <SelectTrigger className="w-52 h-9 text-sm border-slate-200">
            <Filter className="w-4 h-4 mr-1.5 text-slate-400" />
            <SelectValue placeholder="Specialization" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All specializations</SelectItem>
            {allSpecs.map((s) => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {(search || filterCountry !== "all" || filterSpec !== "all") && (
          <button
            onClick={() => { setSearch(""); setFilterCountry("all"); setFilterSpec("all"); }}
            className="text-sm text-slate-500 hover:text-slate-800 flex items-center gap-1.5 px-3 h-9 rounded-md border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            Reset
          </button>
        )}
      </div>

      {/* Body */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-3">
          <div className="w-10 h-10 rounded-full border-4 border-purple-200 border-t-purple-700 animate-spin" />
          <p className="text-sm text-slate-500">Loading startups…</p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-24 gap-2">
          <Building2 className="w-10 h-10 text-rose-400" />
          <p className="text-sm text-rose-600">{error}</p>
        </div>
      ) : (
        <div className="flex gap-6 items-start">

          {/* ── Country sidebar ── */}
          <div className="w-52 flex-shrink-0 sticky top-6">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-1">
              Countries
            </p>
            <div className="flex flex-col gap-0.5">
              {/* "All" row */}
              <button
                onClick={() => setFilterCountry("all")}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                  filterCountry === "all"
                    ? "bg-purple-50 text-purple-700 font-medium"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <span>All countries</span>
                <span className={`text-xs font-mono px-1.5 py-0.5 rounded-full ${
                  filterCountry === "all"
                    ? "bg-purple-100 text-purple-700"
                    : "bg-slate-100 text-slate-500"
                }`}>
                  {startups.length}
                </span>
              </button>

              {/* Per-country rows */}
              {countryCounts.map(([country, count]) => {
                const iso    = COUNTRY_ISO[country];
                const active = filterCountry === country;
                return (
                  <button
                    key={country}
                    onClick={() => setFilterCountry(country)}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                      active
                        ? "bg-purple-50 text-purple-700 font-medium"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      {iso ? (
                        <img
                          src={`https://flagcdn.com/w20/${iso}.png`}
                          alt={country}
                          className="w-4 h-auto rounded-sm flex-shrink-0"
                          onError={(e) => { e.target.style.display = "none"; }}
                        />
                      ) : (
                        <Globe className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      )}
                      <span className="truncate">{country}</span>
                    </div>
                    <span className={`text-xs font-mono px-1.5 py-0.5 rounded-full flex-shrink-0 ml-1 ${
                      active ? "bg-purple-100 text-purple-700" : "bg-slate-100 text-slate-500"
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Cards grid ── */}
          <div className="flex-1 min-w-0">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 gap-2">
                <Rocket className="w-10 h-10 text-slate-300" />
                <p className="text-slate-500 text-sm">No startups match your search.</p>
              </div>
            ) : (
              <>
                <p className="text-xs text-slate-500 mb-4">
                  {filtered.length} startup{filtered.length !== 1 ? "s" : ""}
                  {filterCountry !== "all" ? ` · ${filterCountry}` : ""}
                  {filterSpec !== "all" ? ` · ${filterSpec}` : ""}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filtered.map((company) => (
                    <StartupCard
                      key={company.id || company.name}
                      company={company}
                      onClick={() => setProfileName(company.name)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* CompanyProfileSheet manages its own Sheet/drawer internally */}
      <CompanyProfileSheet name={profileName} onClose={() => setProfileName(null)} />
    </div>
  );
}
