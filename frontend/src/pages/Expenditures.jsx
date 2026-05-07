import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { API } from "@/App";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search, TrendingUp, Clock, Database,
  ArrowUpDown, Globe2, BarChart2, Percent, Shield,
  Anchor, Plane, Satellite, Zap, Lock, Flag, ExternalLink,
  FileText, Building2, Newspaper, Users, Globe,
} from "lucide-react";
import { getLogoUrls } from "@/lib/companyLogos";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const REGIONS = [
  { value: "all", label: "All Regions" },
  { value: "North America", label: "North America" },
  { value: "Europe", label: "Europe" },
  { value: "Asia-Pacific", label: "Asia-Pacific" },
  { value: "Middle East", label: "Middle East" },
  { value: "South America", label: "South America" },
  { value: "Africa", label: "Africa" },
];

const SORT_OPTIONS = [
  { value: "expenditure_desc", label: "Expenditure (High to Low)" },
  { value: "expenditure_asc", label: "Expenditure (Low to High)" },
  { value: "gdp_desc", label: "% GDP (High to Low)" },
  { value: "gdp_asc", label: "% GDP (Low to High)" },
  { value: "name_asc", label: "Country (A-Z)" },
];

const COLORS = ['#7E22CE', '#A855F7', '#10B981', '#F59E0B', '#3B82F6', '#06B6D4', '#EC4899', '#84CC16'];

const COUNTRY_FLAGS = {
  "US": "us", "CN": "cn", "RU": "ru", "IN": "in", "SA": "sa",
  "GB": "gb", "DE": "de", "FR": "fr", "JP": "jp", "KR": "kr",
  "AU": "au", "IT": "it", "BR": "br", "CA": "ca", "IL": "il",
  "TR": "tr", "ES": "es", "PL": "pl", "NL": "nl", "TW": "tw",
  "SG": "sg", "GR": "gr", "NO": "no", "SE": "se", "FI": "fi",
  "AE": "ae", "PK": "pk", "ID": "id", "VN": "vn", "EG": "eg",
  "UA": "ua", "IR": "ir", "QA": "qa", "KW": "kw", "DZ": "dz",
  "MA": "ma", "TH": "th", "MY": "my", "PH": "ph", "NZ": "nz",
  "ZA": "za", "NG": "ng", "AR": "ar", "CO": "co", "CL": "cl",
  "MX": "mx", "PT": "pt", "BE": "be", "CH": "ch", "AT": "at",
  "DK": "dk", "CZ": "cz", "RO": "ro", "HU": "hu", "JO": "jo",
  "IQ": "iq", "AZ": "az", "BD": "bd", "MM": "mm", "PE": "pe",
};

const BRANCH_ICON = {
  army:          <Shield className="w-4 h-4" />,
  navy:          <Anchor className="w-4 h-4" />,
  air:           <Plane className="w-4 h-4" />,
  space:         <Satellite className="w-4 h-4" />,
  special:       <Zap className="w-4 h-4" />,
  cyber:         <Lock className="w-4 h-4" />,
  strategic:     <Flag className="w-4 h-4" />,
  gendarmerie:   <Shield className="w-4 h-4" />,
  coast_guard:   <Anchor className="w-4 h-4" />,
  national_guard:<Shield className="w-4 h-4" />,
};

const BRANCH_COLOR = {
  army:          "bg-emerald-50 text-emerald-700 border-emerald-200",
  navy:          "bg-blue-50 text-blue-700 border-blue-200",
  air:           "bg-sky-50 text-sky-700 border-sky-200",
  space:         "bg-violet-50 text-violet-700 border-violet-200",
  special:       "bg-amber-50 text-amber-700 border-amber-200",
  cyber:         "bg-slate-50 text-slate-700 border-slate-200",
  strategic:     "bg-rose-50 text-rose-700 border-rose-200",
  gendarmerie:   "bg-indigo-50 text-indigo-700 border-indigo-200",
  coast_guard:   "bg-cyan-50 text-cyan-700 border-cyan-200",
  national_guard:"bg-teal-50 text-teal-700 border-teal-200",
};

const CONTRACT_STATUS_STYLE = {
  awarded:   "bg-emerald-50 text-emerald-700",
  open:      "bg-blue-50 text-blue-700",
  closed:    "bg-slate-100 text-slate-500",
  cancelled: "bg-rose-50 text-rose-600",
};

const CONTRACT_CATEGORY_COLOR = {
  aerospace: "border-l-sky-400",
  naval:     "border-l-blue-400",
  land:      "border-l-emerald-400",
  cyber:     "border-l-slate-400",
  services:  "border-l-amber-400",
  logistics: "border-l-orange-400",
  space:     "border-l-violet-400",
};

const CATEGORY_LABEL = {
  aerospace: "Aerospace", naval: "Naval", land: "Land",
  cyber: "Cyber", services: "Services", logistics: "Logistics", space: "Space",
};

// ── Logo helpers (mirrors MarketData.jsx) ────────────────────────────────────
const AVATAR_COLORS = [
  "from-purple-600 to-purple-800", "from-blue-600 to-blue-800",
  "from-emerald-600 to-emerald-800", "from-amber-600 to-amber-800",
  "from-rose-600 to-rose-800", "from-indigo-600 to-indigo-800",
  "from-teal-600 to-teal-800", "from-orange-600 to-orange-800",
];
function avatarColor(name = "") {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) & 0xffff;
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
}
function initials(name = "") {
  return name.split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}
function CompanyLogo({ name, size = "md" }) {
  const urls = getLogoUrls(name);
  const [idx, setIdx] = useState(0);
  const sz = size === "sm" ? "w-7 h-7 text-[9px]" : "w-9 h-9 text-[11px]";
  if (!urls.length || idx >= urls.length) {
    return (
      <div className={`${sz} bg-gradient-to-br ${avatarColor(name)} rounded-lg flex items-center justify-center shrink-0`}>
        <span className="font-bold text-white tracking-tight">{initials(name)}</span>
      </div>
    );
  }
  return (
    <img
      src={urls[idx]}
      alt={name}
      className={`${sz} rounded-lg object-contain bg-white border border-slate-100 shrink-0 p-0.5`}
      onError={() => setIdx(i => i + 1)}
    />
  );
}

function formatPersonnel(n) {
  if (!n) return null;
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${Math.round(n / 1000)}k`;
  return n.toString();
}

function formatAmount(min, max) {
  if (!min && !max) return null;
  const fmt = (v) => v >= 1000 ? `$${(v / 1000).toFixed(1)}B` : `$${v}M`;
  if (min && max && min !== max) return `${fmt(min)} – ${fmt(max)}`;
  return fmt(min || max);
}

// ── Country Profile Section ──────────────────────────────────────────────────

function CountryProfileSection({ country, allExpenditures }) {
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [industryTab, setIndustryTab] = useState("national");

  useEffect(() => {
    let cancelled = false;
    setLoadingProfile(true);
    setProfile(null);
    axios.get(`${API}/country-profile`, { params: { country_name: country.country } })
      .then(r => { if (!cancelled) setProfile(r.data); })
      .catch(() => { if (!cancelled) setProfile({ military_branches: [], contracts: [], companies: [], news: [] }); })
      .finally(() => { if (!cancelled) setLoadingProfile(false); });
    return () => { cancelled = true; };
  }, [country.country]);

  // Build regional peers data for the comparison bar chart
  const regionalPeers = allExpenditures
    .filter(e => e.region === country.region)
    .sort((a, b) => b.expenditure - a.expenditure)
    .slice(0, 10);

  const getFlag = (code) => {
    const c = COUNTRY_FLAGS[code] || code.toLowerCase();
    return `https://flagcdn.com/w40/${c}.png`;
  };

  return (
    <div className="space-y-5">
      {/* Profile header */}
      <div className="flex items-center gap-4 px-1">
        <div className="w-0.5 h-8 bg-purple-600 rounded-full" />
        <div className="flex items-center gap-3">
          <img
            src={getFlag(country.country_code)}
            alt={country.country}
            className="w-10 h-7 object-cover rounded shadow border border-slate-200"
          />
          <div>
            <h2 className="font-heading text-xl font-bold text-slate-900">
              {country.country} — Defense Profile
            </h2>
            <p className="text-xs text-slate-500">
              {country.region} · ${country.expenditure}B budget · {country.gdp_percent}% of GDP
            </p>
          </div>
        </div>
      </div>

      {/* Row 1: Military Branches + Regional Comparison */}
      <div className="grid lg:grid-cols-2 gap-5">
        {/* Military Branches */}
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-100 pb-3 bg-slate-50/50">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-purple-600" />
              <CardTitle className="font-heading text-base text-slate-900">Military Branches</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            {loadingProfile ? (
              <div className="space-y-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-12 bg-slate-100 rounded-lg animate-pulse" />
                ))}
              </div>
            ) : profile?.military_branches?.length > 0 ? (
              <div className="space-y-2">
                {profile.military_branches.map((branch, i) => (
                  <a
                    key={i}
                    href={branch.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-lg border hover:border-purple-200 hover:bg-purple-50/30 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`p-1.5 rounded-md border ${BRANCH_COLOR[branch.type] || "bg-slate-50 text-slate-600 border-slate-200"}`}>
                        {BRANCH_ICON[branch.type] || <Shield className="w-4 h-4" />}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-slate-800 group-hover:text-purple-700 leading-tight">
                          {branch.name}
                        </p>
                        <p className="text-xs text-slate-500">{branch.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-right">
                      {branch.personnel > 0 && (
                        <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {formatPersonnel(branch.personnel)}
                        </span>
                      )}
                      <ExternalLink className="w-3.5 h-3.5 text-slate-300 group-hover:text-purple-400 transition-colors" />
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-400 py-4 text-center">No branch data available for this country.</p>
            )}
          </CardContent>
        </Card>

        {/* Regional Comparison Bar Chart */}
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-100 pb-3 bg-slate-50/50">
            <div className="flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-purple-600" />
              <CardTitle className="font-heading text-base text-slate-900">
                {country.region} — Comparison
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regionalPeers} layout="vertical" margin={{ left: 0, right: 8 }}>
                  <XAxis
                    type="number"
                    tick={{ fill: '#64748B', fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `$${v}B`}
                  />
                  <YAxis
                    type="category"
                    dataKey="country_code"
                    tick={{ fill: '#64748B', fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                    width={30}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const d = payload[0].payload;
                        return (
                          <div className="bg-white border border-slate-200 p-2.5 rounded-lg shadow-lg text-sm">
                            <p className="font-semibold text-slate-800">{d.country}</p>
                            <p className="font-mono text-purple-700">${d.expenditure}B</p>
                            <p className="text-slate-400 text-xs">{d.gdp_percent}% of GDP</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="expenditure" radius={[0, 5, 5, 0]}>
                    {regionalPeers.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.country_code === country.country_code ? '#7E22CE' : '#DDD6FE'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-700 inline-block" />
              {country.country} highlighted
              <span className="w-2 h-2 rounded-full bg-violet-200 inline-block ml-2" />
              Regional peers
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Row 2: Contracts + Companies */}
      <div className="grid lg:grid-cols-2 gap-5">
        {/* Key Contracts */}
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-100 pb-3 bg-slate-50/50">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-purple-600" />
              <CardTitle className="font-heading text-base text-slate-900">Key Contracts & Programs</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            {loadingProfile ? (
              <div className="space-y-2">
                {[1, 2, 3].map(i => <div key={i} className="h-16 bg-slate-100 rounded-lg animate-pulse" />)}
              </div>
            ) : profile?.contracts?.length > 0 ? (
              <div className="space-y-2">
                {profile.contracts.map((c, i) => (
                  <div
                    key={c.id || i}
                    className={`pl-3 pr-3 py-3 rounded-lg border border-slate-100 border-l-4 hover:border-purple-100 hover:bg-slate-50/60 transition-colors ${CONTRACT_CATEGORY_COLOR[c.category] || "border-l-slate-300"}`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="text-sm font-medium text-slate-800 leading-snug line-clamp-2">{c.title}</p>
                      <span className={`shrink-0 text-xs px-2 py-0.5 rounded-full font-medium ${CONTRACT_STATUS_STYLE[c.status] || "bg-slate-100 text-slate-500"}`}>
                        {c.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap mt-1">
                      {c.category && (
                        <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
                          {CATEGORY_LABEL[c.category] || c.category}
                        </span>
                      )}
                      {c.program && (
                        <span className="text-xs text-purple-600 font-semibold">{c.program}</span>
                      )}
                      {formatAmount(c.amount_min, c.amount_max) && (
                        <span className="text-xs font-mono text-slate-700 font-semibold ml-auto">
                          {formatAmount(c.amount_min, c.amount_max)}
                        </span>
                      )}
                    </div>
                    {c.awarded_to && (
                      <p className="text-xs text-slate-400 mt-1 truncate">→ {c.awarded_to}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-400 py-4 text-center">No contracts found for this country.</p>
            )}
          </CardContent>
        </Card>

        {/* Defense Companies */}
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-100 pb-3 bg-slate-50/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-purple-600" />
                <CardTitle className="font-heading text-base text-slate-900">Defense Industry</CardTitle>
              </div>
              {/* National / Multinational tabs */}
              <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-0.5">
                <button
                  onClick={() => setIndustryTab("national")}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                    industryTab === "national" ? "bg-white text-purple-700 shadow-sm" : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <Flag className="w-3 h-3" /> National
                </button>
                <button
                  onClick={() => setIndustryTab("multinational")}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                    industryTab === "multinational" ? "bg-white text-purple-700 shadow-sm" : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <Globe className="w-3 h-3" /> Multinational
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            {loadingProfile ? (
              <div className="space-y-2">
                {[1, 2, 3].map(i => <div key={i} className="h-14 bg-slate-100 rounded-lg animate-pulse" />)}
              </div>
            ) : (() => {
              const list = (profile?.companies || []).filter(c =>
                industryTab === "national" ? c.is_national !== false : c.is_national === false
              );
              return list.length > 0 ? (
                <div className="space-y-2">
                  {list.map((c, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:border-purple-100 hover:bg-slate-50/60 transition-colors gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <CompanyLogo name={c.name} size="sm" />
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-slate-800 truncate">{c.name}</p>
                          <div className="flex gap-1 flex-wrap mt-0.5">
                            {c.specializations.slice(0, 2).map((s, si) => (
                              <span key={si} className="text-[10px] bg-purple-50 text-purple-600 px-1.5 py-0.5 rounded">
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        {c.market_cap > 0 && (
                          <p className="text-xs font-mono text-slate-700 font-semibold">${c.market_cap}B</p>
                        )}
                        <p className="text-[10px] text-slate-400 font-mono">{c.ticker}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-400 py-4 text-center">
                  {industryTab === "multinational" ? "No multinational companies found." : "No national companies found."}
                </p>
              );
            })()}
          </CardContent>
        </Card>
      </div>

      {/* Row 3: Recent News */}
      <Card className="bg-white border-slate-200 shadow-sm">
        <CardHeader className="border-b border-slate-100 pb-3 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <Newspaper className="w-4 h-4 text-purple-600" />
            <CardTitle className="font-heading text-base text-slate-900">
              Recent Defense News — {country.country}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          {loadingProfile ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[1, 2, 3].map(i => <div key={i} className="h-32 bg-slate-100 rounded-lg animate-pulse" />)}
            </div>
          ) : profile?.news?.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {profile.news.slice(0, 6).map((article, i) => (
                <a
                  key={i}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col rounded-lg border border-slate-100 hover:border-purple-200 hover:shadow-md transition-all overflow-hidden"
                >
                  {article.image ? (
                    <div className="w-full h-28 bg-slate-100 overflow-hidden shrink-0">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => { e.target.parentElement.style.display = "none"; }}
                      />
                    </div>
                  ) : (
                    <div className="w-full h-14 bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center shrink-0">
                      <Newspaper className="w-6 h-6 text-slate-300" />
                    </div>
                  )}
                  <div className="p-3 flex flex-col flex-1">
                    <p className="text-sm font-medium text-slate-800 group-hover:text-purple-700 line-clamp-2 leading-snug mb-auto transition-colors">
                      {article.title}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[10px] text-slate-400 bg-slate-50 border border-slate-100 px-1.5 py-0.5 rounded truncate max-w-[70%]">
                        {article.source}
                      </span>
                      <ExternalLink className="w-3 h-3 text-slate-300 group-hover:text-purple-400 transition-colors shrink-0" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-400 py-4 text-center">No recent news found for this country.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function Expenditures() {
  const [searchParams] = useSearchParams();
  const [expenditures, setExpenditures] = useState([]);
  const [filteredExpenditures, setFilteredExpenditures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState(searchParams.get("country") || "");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [sortBy, setSortBy] = useState("expenditure_desc");
  const [chartMode, setChartMode] = useState("absolute");

  const fetchExpenditures = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await axios.get(`${API}/expenditures`);
      setExpenditures(response.data);
      setFilteredExpenditures(response.data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchExpenditures(); }, []);

  useEffect(() => {
    let filtered = [...expenditures];
    if (selectedRegion !== "all") {
      filtered = filtered.filter(e => e.region === selectedRegion);
    }
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(e =>
        e.country.toLowerCase().includes(term) ||
        e.country_code.toLowerCase().includes(term)
      );
    }
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "expenditure_desc": return b.expenditure - a.expenditure;
        case "expenditure_asc": return a.expenditure - b.expenditure;
        case "gdp_desc": return b.gdp_percent - a.gdp_percent;
        case "gdp_asc": return a.gdp_percent - b.gdp_percent;
        case "name_asc": return a.country.localeCompare(b.country);
        default: return 0;
      }
    });
    setFilteredExpenditures(filtered);
  }, [searchTerm, selectedRegion, sortBy, expenditures]);

  const focusCountry = filteredExpenditures.length === 1 ? filteredExpenditures[0] : null;

  const totalExpenditure = filteredExpenditures.reduce((sum, e) => sum + e.expenditure, 0);
  const avgGdpPercent = filteredExpenditures.length
    ? (filteredExpenditures.reduce((sum, e) => sum + e.gdp_percent, 0) / filteredExpenditures.length).toFixed(1)
    : 0;

  const topCountries = [...filteredExpenditures]
    .sort((a, b) => b.expenditure - a.expenditure)
    .slice(0, 10);

  const regionData = filteredExpenditures.reduce((acc, exp) => {
    const existing = acc.find(r => r.name === exp.region);
    if (existing) { existing.value += exp.expenditure; }
    else { acc.push({ name: exp.region, value: exp.expenditure }); }
    return acc;
  }, []).sort((a, b) => b.value - a.value);

  const getFlag = (countryCode) => {
    const code = COUNTRY_FLAGS[countryCode] || countryCode.toLowerCase();
    return `https://flagcdn.com/w40/${code}.png`;
  };

  const getGdpColor = (gdpPercent) => {
    if (gdpPercent >= 4) return 'text-rose-600 bg-rose-50';
    if (gdpPercent >= 2.5) return 'text-amber-600 bg-amber-50';
    if (gdpPercent >= 2) return 'text-emerald-600 bg-emerald-50';
    return 'text-slate-600 bg-slate-50';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4 text-slate-500">
        <p className="font-medium">Failed to load expenditure data.</p>
        <button onClick={fetchExpenditures} className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 transition-colors">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div data-testid="expenditures-page" className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-slate-900 tracking-tight">
            Defense Expenditures
          </h1>
          <p className="text-slate-500 text-sm mt-1">Global Military Spending by Country</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-2 text-xs text-slate-500 bg-white border border-slate-200 rounded-lg px-3 py-2">
            <Clock className="w-3.5 h-3.5" />
            <span className="font-medium">Reference FY 2024</span>
            <span className="text-slate-300">|</span>
            <Database className="w-3.5 h-3.5" />
            <span>SIPRI Military Expenditure Database · IISS Military Balance · National government reports</span>
          </div>
          <p className="text-xs text-slate-400 text-right max-w-md">
            Note: reference year may vary by country based on official data availability. Figures in constant USD billions.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">TOTAL SPENDING</p>
            <p className="text-2xl font-mono font-bold text-slate-900 mt-2">${totalExpenditure.toFixed(0)}B</p>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> YoY change not computed
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">COUNTRIES</p>
            <p className="text-2xl font-mono font-bold text-slate-900 mt-2">{filteredExpenditures.length}</p>
            <p className="text-xs text-slate-500 mt-1">of {expenditures.length} total</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">AVG % OF GDP</p>
            <p className="text-2xl font-mono font-bold text-purple-700 mt-2">{avgGdpPercent}%</p>
            <p className="text-xs text-slate-500 mt-1">NATO target: 2%</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">FISCAL YEAR</p>
            <p className="text-2xl font-mono font-bold text-slate-900 mt-2">2024</p>
            <p className="text-xs text-slate-500 mt-1">Latest data</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts — hidden when a single country is in focus */}
      {!focusCountry && <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Countries Bar Chart */}
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-100 pb-4 bg-slate-50/50">
            <div className="flex items-center justify-between">
              <CardTitle className="font-heading text-lg text-slate-900">
                {chartMode === "absolute" ? "Top Countries — Absolute Budget" : "Top Countries — % of GDP"}
              </CardTitle>
              <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-0.5">
                <button
                  onClick={() => setChartMode("absolute")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                    chartMode === "absolute" ? "bg-white text-purple-700 shadow-sm" : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <BarChart2 className="w-3.5 h-3.5" /> $B
                </button>
                <button
                  onClick={() => setChartMode("gdp")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                    chartMode === "gdp" ? "bg-white text-purple-700 shadow-sm" : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <Percent className="w-3.5 h-3.5" /> GDP
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-[300px]" data-testid="top-countries-chart">
              <ResponsiveContainer width="100%" height="100%" minWidth={200}>
                <BarChart
                  data={chartMode === "gdp"
                    ? [...filteredExpenditures].sort((a, b) => b.gdp_percent - a.gdp_percent).slice(0, 10)
                    : topCountries}
                  layout="vertical"
                >
                  <XAxis
                    type="number"
                    tick={{ fill: '#64748B', fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={chartMode === "gdp" ? (v) => `${v}%` : (v) => `$${v}B`}
                  />
                  <YAxis
                    type="category"
                    dataKey="country_code"
                    tick={{ fill: '#64748B', fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    width={35}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-white border border-slate-200 p-3 rounded-lg shadow-lg">
                            <div className="flex items-center gap-2 mb-1">
                              <img src={getFlag(data.country_code)} alt={data.country} className="w-5 h-4 object-cover rounded-sm" />
                              <span className="text-slate-900 font-medium text-sm">{data.country}</span>
                            </div>
                            <p className="text-purple-700 font-mono font-semibold">${data.expenditure}B</p>
                            <p className="text-slate-500 text-xs">{data.gdp_percent}% of GDP</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey={chartMode === "gdp" ? "gdp_percent" : "expenditure"} fill="#7E22CE" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            {chartMode === "gdp" && (
              <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-purple-400 inline-block" />
                NATO 2% target — countries above this threshold are highlighted in the table
              </p>
            )}
          </CardContent>
        </Card>

        {/* Regional Distribution */}
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-100 pb-4 bg-slate-50/50">
            <CardTitle className="font-heading text-lg text-slate-900">Regional Distribution</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-[200px]" data-testid="regional-pie-chart">
              <ResponsiveContainer width="100%" height="100%" minWidth={200}>
                <PieChart>
                  <Pie
                    data={regionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {regionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white border border-slate-200 p-3 rounded-lg shadow-lg">
                            <p className="text-slate-900 font-medium text-sm">{payload[0].name}</p>
                            <p className="font-mono text-purple-700 font-semibold">${payload[0].value.toFixed(1)}B</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {regionData.map((region, idx) => (
                <div key={region.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                    <span className="text-slate-600">{region.name}</span>
                  </div>
                  <span className="font-mono text-slate-900 font-medium">${region.value.toFixed(1)}B</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search by country..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400"
            data-testid="search-expenditures"
          />
        </div>
        <Select value={selectedRegion} onValueChange={setSelectedRegion}>
          <SelectTrigger className="w-full sm:w-48 bg-white border-slate-200 text-slate-700" data-testid="region-filter">
            <Globe2 className="w-4 h-4 mr-2 text-slate-400" />
            <SelectValue placeholder="Region" />
          </SelectTrigger>
          <SelectContent className="bg-white border-slate-200">
            {REGIONS.map(r => (
              <SelectItem key={r.value} value={r.value} className="text-slate-700 focus:bg-purple-50">
                {r.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-56 bg-white border-slate-200 text-slate-700" data-testid="sort-filter">
            <ArrowUpDown className="w-4 h-4 mr-2 text-slate-400" />
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="bg-white border-slate-200">
            {SORT_OPTIONS.map(opt => (
              <SelectItem key={opt.value} value={opt.value} className="text-slate-700 focus:bg-purple-50">
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* ── Country Profile (only when exactly 1 country is in view) ── */}
      {focusCountry && (
        <CountryProfileSection country={focusCountry} allExpenditures={expenditures} />
      )}

      {/* Data Table */}
      <Card className="bg-white border-slate-200 shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto" data-testid="expenditures-table">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 p-4">Country</th>
                  <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 p-4">Region</th>
                  <th className="text-right text-xs font-semibold uppercase tracking-wider text-slate-500 p-4">Expenditure</th>
                  <th className="text-right text-xs font-semibold uppercase tracking-wider text-slate-500 p-4">% of GDP</th>
                  <th className="text-right text-xs font-semibold uppercase tracking-wider text-slate-500 p-4">Year</th>
                  <th className="text-right text-xs font-semibold uppercase tracking-wider text-slate-500 p-4">Source</th>
                </tr>
              </thead>
              <tbody>
                {filteredExpenditures.map((exp, idx) => (
                  <tr
                    key={exp.id}
                    className="border-b border-slate-100 hover:bg-purple-50/30 transition-colors"
                    data-testid={`expenditure-row-${exp.id}`}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 bg-slate-100 rounded-lg flex items-center justify-center text-xs font-mono text-slate-500 font-medium">
                          {idx + 1}
                        </span>
                        <img
                          src={getFlag(exp.country_code)}
                          alt={exp.country}
                          className="w-8 h-6 object-cover rounded shadow-sm border border-slate-100"
                          onError={(e) => { e.target.src = `https://flagcdn.com/w40/${exp.country_code.toLowerCase()}.png`; }}
                        />
                        <div>
                          <p className="text-slate-900 font-medium text-sm">{exp.country}</p>
                          <p className="text-xs text-slate-500 font-mono">{exp.country_code}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">{exp.region}</span>
                    </td>
                    <td className="p-4 text-right">
                      <span className="font-mono text-sm text-slate-900 font-semibold">${exp.expenditure}B</span>
                    </td>
                    <td className="p-4 text-right">
                      <span className={`inline-flex font-mono text-sm px-2.5 py-1 rounded-full font-medium ${getGdpColor(exp.gdp_percent)}`}>
                        {exp.gdp_percent}%
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <span className="font-mono text-sm text-slate-500">{exp.year}</span>
                    </td>
                    <td className="p-4 text-right">
                      {exp.source ? (
                        <span className="inline-flex items-center text-xs font-medium text-purple-700 bg-purple-50 border border-purple-100 px-2 py-0.5 rounded-full">
                          {exp.source}
                        </span>
                      ) : (
                        <span className="text-xs text-slate-300">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Top 5 focus cards */}
      <Card className="bg-white border-slate-200 shadow-sm">
        <CardHeader className="border-b border-slate-100 pb-4 bg-slate-50/50">
          <div className="flex items-center justify-between">
            <CardTitle className="font-heading text-lg text-slate-900">Focus — Top 5 Global Defense Budgets</CardTitle>
            <span className="text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded border border-slate-200">
              Source : SIPRI · {filteredExpenditures[0]?.year ?? 2024}
            </span>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            {[...expenditures]
              .sort((a, b) => b.expenditure - a.expenditure)
              .slice(0, 5)
              .map((exp, i) => {
                const shade = ["bg-purple-700", "bg-purple-600", "bg-purple-500", "bg-purple-400", "bg-purple-300"];
                return (
                  <div key={exp.id} className="flex flex-col items-center gap-2 text-center">
                    <span className="text-xs font-mono text-slate-400 font-bold">#{i + 1}</span>
                    <img
                      src={getFlag(exp.country_code)}
                      alt={exp.country}
                      className="w-12 h-8 object-cover rounded shadow-md border-2 border-white"
                      onError={e => { e.target.style.display = "none"; }}
                    />
                    <p className="text-xs font-semibold text-slate-700 leading-tight">{exp.country}</p>
                    <span className={`text-xs font-mono text-white px-2 py-0.5 rounded ${shade[i]}`}>
                      ${exp.expenditure}B
                    </span>
                    <span className="text-[10px] text-slate-400">{exp.gdp_percent}% of GDP</span>
                  </div>
                );
              })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
