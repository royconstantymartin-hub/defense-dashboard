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
  Search, Rocket, Globe, Users, Building2, ExternalLink,
  DollarSign, Calendar, Filter,
  Brain, Bot, Plane, Truck, Star, Zap, Target, Flame,
  Anchor, Command, Eye, Radio, GraduationCap, ScanLine,
  Crosshair, Server, Wrench, Network, Cpu, ChevronRight,
  ShieldAlert,
} from "lucide-react";
import CompanyProfileSheet from "@/components/CompanyProfileSheet";

// ── Static maps ───────────────────────────────────────────────────────────────

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

const SPEC_ICON_MAP = [
  { keys: ["AI", "Machine Learning", "Artificial"],       Icon: Brain },
  { keys: ["Autonomous", "Autonomy"],                     Icon: Bot },
  { keys: ["UAV", "Drone", "UAS", "UCAV"],               Icon: Plane },
  { keys: ["UGV", "Ground Vehicle", "Land Robot"],        Icon: Truck },
  { keys: ["Cyber", "Cybersecurity"],                     Icon: ShieldAlert },
  { keys: ["Space", "Satellite", "Orbital"],              Icon: Star },
  { keys: ["Electronic Warfare", "EW", "SIGINT"],        Icon: Zap },
  { keys: ["Counter-UAS", "C-UAS", "Anti-drone"],        Icon: Target },
  { keys: ["Hypersonics", "Hypersonic"],                  Icon: Flame },
  { keys: ["Naval", "Maritime", "Submarine"],             Icon: Anchor },
  { keys: ["Robotics", "Robot"],                          Icon: Bot },
  { keys: ["Missile", "Rockets", "Munitions"],            Icon: Crosshair },
  { keys: ["Command", "C2", "C4ISR", "C4"],              Icon: Command },
  { keys: ["Intelligence", "ISR", "Reconnaissance"],      Icon: Eye },
  { keys: ["Communications", "Comms", "Radio", "Datalink"], Icon: Radio },
  { keys: ["Training", "Simulation"],                     Icon: GraduationCap },
  { keys: ["Directed Energy", "HPM", "Laser", "DEW"],    Icon: Zap },
  { keys: ["Sensor", "Detection", "Radar", "Sonar"],     Icon: ScanLine },
  { keys: ["Aircraft", "Aviation", "Fixed-wing"],        Icon: Plane },
  { keys: ["Ammunition", "Ammo"],                        Icon: Crosshair },
  { keys: ["Land Systems", "Armoured"],                   Icon: Truck },
  { keys: ["Engineering"],                                Icon: Wrench },
  { keys: ["IT", "Software", "Platform"],                Icon: Cpu },
  { keys: ["Network", "Connectivity"],                   Icon: Network },
];

function getSpecIcon(spec) {
  const lower = spec.toLowerCase();
  for (const { keys, Icon } of SPEC_ICON_MAP) {
    if (keys.some((k) => lower.includes(k.toLowerCase()))) return Icon;
  }
  return null;
}

const SPEC_COLOR = {
  "AI":                 "bg-violet-50 text-violet-700 border-violet-200",
  "Autonomous":         "bg-blue-50 text-blue-700 border-blue-200",
  "UAV":                "bg-sky-50 text-sky-700 border-sky-200",
  "UGV":                "bg-teal-50 text-teal-700 border-teal-200",
  "Cyber":              "bg-rose-50 text-rose-700 border-rose-200",
  "Space":              "bg-indigo-50 text-indigo-700 border-indigo-200",
  "Electronic Warfare": "bg-amber-50 text-amber-700 border-amber-200",
  "Counter-UAS":        "bg-orange-50 text-orange-700 border-orange-200",
  "Hypersonics":        "bg-red-50 text-red-700 border-red-200",
  "Naval":              "bg-cyan-50 text-cyan-700 border-cyan-200",
  "Robotics":           "bg-emerald-50 text-emerald-700 border-emerald-200",
};

function specBadgeClass(spec) {
  for (const [key, cls] of Object.entries(SPEC_COLOR)) {
    if (spec.toLowerCase().includes(key.toLowerCase())) return cls;
  }
  return "bg-slate-50 text-slate-600 border-slate-200";
}

// ── Business logic ────────────────────────────────────────────────────────────

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

function autoDescription(company) {
  if (company.description) return company.description;
  const specs = (company.specializations || []).slice(0, 3).join(", ");
  const country = company.country || "";
  if (specs && country) return `${country} defense company · ${specs}`;
  if (specs) return specs;
  return null;
}

// Build a list of Clearbit domains to try in order
function trialDomains(company) {
  const seen = new Set();
  const out  = [];
  const add  = (d) => {
    if (d && !seen.has(d)) { seen.add(d); out.push(d); }
  };

  // 1. Explicit website
  if (company.website) {
    add(company.website.replace(/^https?:\/\//, "").split("/")[0].toLowerCase());
  }

  // 2. Name-derived slug, multiple TLDs
  const slug = company.name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
  add(`${slug}.com`);
  add(`${slug}.io`);
  add(`${slug}.ai`);
  add(`${slug}.defense`);

  // 3. First word only (e.g. "Skydio" from "Skydio Inc")
  const first = company.name.split(/\s+/)[0].toLowerCase().replace(/[^a-z0-9]/g, "");
  if (first !== slug) {
    add(`${first}.com`);
    add(`${first}.io`);
    add(`${first}.ai`);
  }

  return out;
}

// ── Avatar colors (consistent per company, 8 palette) ─────────────────────────

const AVATAR_PALETTES = [
  { bg: "bg-violet-100", text: "text-violet-700" },
  { bg: "bg-blue-100",   text: "text-blue-700" },
  { bg: "bg-emerald-100",text: "text-emerald-700" },
  { bg: "bg-amber-100",  text: "text-amber-700" },
  { bg: "bg-rose-100",   text: "text-rose-700" },
  { bg: "bg-cyan-100",   text: "text-cyan-700" },
  { bg: "bg-indigo-100", text: "text-indigo-700" },
  { bg: "bg-teal-100",   text: "text-teal-700" },
];

function avatarPalette(name) {
  const idx = (name.charCodeAt(0) + (name.charCodeAt(1) || 0)) % AVATAR_PALETTES.length;
  return AVATAR_PALETTES[idx];
}

// ── Logo component (progressive Clearbit fallback) ───────────────────────────

function CompanyLogo({ company, size = 44 }) {
  const domains = useMemo(() => trialDomains(company), [company]);
  const [idx, setIdx]       = useState(0);
  const [allFailed, setAllFailed] = useState(false);

  useEffect(() => {
    setIdx(0);
    setAllFailed(false);
  }, [company.name]);

  const initials = company.name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  const { bg, text } = avatarPalette(company.name);

  if (allFailed || domains.length === 0) {
    return (
      <div
        className={`${bg} ${text} rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-sm`}
        style={{ width: size, height: size }}
      >
        {initials}
      </div>
    );
  }

  return (
    <img
      key={domains[idx]}
      src={`https://logo.clearbit.com/${domains[idx]}`}
      alt={company.name}
      className="rounded-xl object-contain bg-white border border-slate-100 flex-shrink-0"
      style={{ width: size, height: size }}
      onError={() => {
        if (idx + 1 < domains.length) setIdx(idx + 1);
        else setAllFailed(true);
      }}
    />
  );
}

// ── Funding badge ─────────────────────────────────────────────────────────────

function FundingBadge({ stage }) {
  if (!stage) return null;
  const s = stage.toLowerCase();
  let cls = "bg-slate-50 text-slate-500 border-slate-200";
  if (s.includes("series a"))      cls = "bg-emerald-50 text-emerald-700 border-emerald-200";
  else if (s.includes("series b")) cls = "bg-blue-50 text-blue-700 border-blue-200";
  else if (s.includes("series c")) cls = "bg-indigo-50 text-indigo-700 border-indigo-200";
  else if (s.includes("series d") || s.includes("series e") || s.includes("series f"))
                                    cls = "bg-violet-50 text-violet-700 border-violet-200";
  else if (s.includes("seed"))      cls = "bg-amber-50 text-amber-700 border-amber-200";
  else if (s.includes("acquired"))  cls = "bg-rose-50 text-rose-700 border-rose-200";

  // Short label: keep only "Private — Series B ($200M, 2024)" → "Series B · $200M"
  let short = stage;
  const seriesMatch = stage.match(/(Series [A-F]|Seed)/i);
  const moneyMatch  = stage.match(/\$[\d.]+[BMK]/i);
  if (seriesMatch) {
    short = seriesMatch[0] + (moneyMatch ? ` · ${moneyMatch[0]}` : "");
  } else if (stage.length > 32) {
    short = stage.slice(0, 32) + "…";
  }

  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border ${cls}`}>
      <DollarSign className="w-3 h-3 flex-shrink-0" />
      {short}
    </span>
  );
}

// ── Row component (Linear/Notion aesthetic) ───────────────────────────────────

function StartupRow({ company, onClick }) {
  const iso   = COUNTRY_ISO[(company.country || "").trim()];
  const specs = company.specializations || [];
  const desc  = autoDescription(company);

  return (
    <div
      className="relative flex items-center gap-5 px-5 py-3.5 hover:bg-purple-50/40 transition-colors cursor-pointer group"
      onClick={onClick}
    >
      {/* Left accent bar on hover */}
      <div className="absolute left-0 top-1 bottom-1 w-0.5 rounded-r bg-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Logo */}
      <CompanyLogo company={company} size={44} />

      {/* Name + meta */}
      <div className="w-48 flex-shrink-0 min-w-0">
        <div className="flex items-center gap-1.5">
          <h3 className="font-semibold text-[15px] leading-snug text-slate-900 group-hover:text-purple-700 transition-colors truncate">
            {company.name}
          </h3>
          {company.website && (
            <a
              href={company.website.startsWith("http") ? company.website : `https://${company.website}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-slate-300 hover:text-purple-500 transition-colors flex-shrink-0"
            >
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
        <div className="flex items-center gap-1.5 mt-0.5">
          {iso && (
            <img
              src={`https://flagcdn.com/w20/${iso}.png`}
              alt={company.country}
              title={company.country}
              className="w-4 h-auto rounded-sm flex-shrink-0"
              onError={(e) => { e.target.style.display = "none"; }}
            />
          )}
          <span className="text-xs text-slate-400 truncate">
            {company.headquarters || company.country || "—"}
          </span>
          {company.founded_year && (
            <span className="text-xs text-slate-300 flex-shrink-0">· {company.founded_year}</span>
          )}
        </div>
      </div>

      {/* Description (auto-generated if missing) */}
      <div className="flex-1 min-w-0 hidden lg:block">
        {desc ? (
          <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{desc}</p>
        ) : null}
      </div>

      {/* Specialization badges with icons */}
      <div className="flex flex-wrap gap-1.5 w-64 flex-shrink-0">
        {specs.slice(0, 4).map((s) => {
          const SpecIcon = getSpecIcon(s);
          return (
            <span
              key={s}
              className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border ${specBadgeClass(s)}`}
            >
              {SpecIcon && <SpecIcon className="w-3 h-3 flex-shrink-0" />}
              {s}
            </span>
          );
        })}
        {specs.length > 4 && (
          <span className="text-xs text-slate-400 self-center">+{specs.length - 4}</span>
        )}
      </div>

      {/* Funding + employees */}
      <div className="w-44 flex-shrink-0 flex flex-col items-end gap-1.5">
        {company.funding_stage ? (
          <FundingBadge stage={company.funding_stage} />
        ) : null}
        {company.employees ? (
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Users className="w-3 h-3" />
            {company.employees.toLocaleString()}
          </span>
        ) : null}
      </div>

      <ChevronRight className="w-4 h-4 text-slate-200 group-hover:text-purple-400 transition-colors flex-shrink-0" />
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function Startups() {
  const [companies, setCompanies]         = useState([]);
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState(null);
  const [search, setSearch]               = useState("");
  const [filterCountry, setFilterCountry] = useState("all");
  const [filterSpec, setFilterSpec]       = useState("all");
  const [profileName, setProfileName]     = useState(null);

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
            { label: "Startups",        value: startups.length,                 icon: Rocket,     color: "text-purple-700" },
            { label: "Countries",        value: countryCounts.length,            icon: Globe,      color: "text-blue-600" },
            { label: "Total Employees",  value: totalEmployees.toLocaleString(), icon: Users,      color: "text-emerald-600" },
            { label: "Funded",           value: totalFunded,                     icon: DollarSign, color: "text-amber-600" },
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
      <div className="flex flex-wrap gap-3 mb-5">
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
            {allSpecs.map((s) => {
              const SpecIcon = getSpecIcon(s);
              return (
                <SelectItem key={s} value={s}>
                  <span className="flex items-center gap-1.5">
                    {SpecIcon && <SpecIcon className="w-3.5 h-3.5 text-slate-400" />}
                    {s}
                  </span>
                </SelectItem>
              );
            })}
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
          <div className="w-48 flex-shrink-0 sticky top-6">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-1">
              Countries
            </p>
            <div className="flex flex-col gap-0.5">
              <button
                onClick={() => setFilterCountry("all")}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                  filterCountry === "all"
                    ? "bg-purple-50 text-purple-700 font-medium"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                }`}
              >
                <span>All countries</span>
                <span className={`text-xs font-mono px-1.5 py-0.5 rounded-full ${
                  filterCountry === "all"
                    ? "bg-purple-100 text-purple-700"
                    : "bg-slate-100 text-slate-400"
                }`}>
                  {startups.length}
                </span>
              </button>

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
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
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
                        <Globe className="w-4 h-4 text-slate-300 flex-shrink-0" />
                      )}
                      <span className="truncate">{country}</span>
                    </div>
                    <span className={`text-xs font-mono px-1.5 py-0.5 rounded-full flex-shrink-0 ml-1 ${
                      active ? "bg-purple-100 text-purple-700" : "bg-slate-100 text-slate-400"
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── List ── */}
          <div className="flex-1 min-w-0">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 gap-2">
                <Rocket className="w-10 h-10 text-slate-200" />
                <p className="text-slate-400 text-sm">No startups match your search.</p>
              </div>
            ) : (
              <>
                {/* Column headers */}
                <div className="flex items-center gap-5 px-5 mb-1 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  <div className="w-44 flex-shrink-0 ml-[52px]">Company</div>
                  <div className="flex-1 hidden lg:block">Description</div>
                  <div className="w-64 flex-shrink-0">Specializations</div>
                  <div className="w-44 flex-shrink-0 text-right">Funding · Team</div>
                  <div className="w-4 flex-shrink-0" />
                </div>

                {/* Rows container — Linear-style divide */}
                <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 overflow-hidden shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]">
                  {filtered.map((company) => (
                    <StartupRow
                      key={company.id || company.name}
                      company={company}
                      onClick={() => setProfileName(company.name)}
                    />
                  ))}
                </div>

                <p className="text-xs text-slate-400 mt-3 text-right">
                  {filtered.length} startup{filtered.length !== 1 ? "s" : ""}
                  {filterCountry !== "all" ? ` · ${filterCountry}` : ""}
                  {filterSpec !== "all" ? ` · ${filterSpec}` : ""}
                </p>
              </>
            )}
          </div>
        </div>
      )}

      <CompanyProfileSheet name={profileName} onClose={() => setProfileName(null)} />
    </div>
  );
}
