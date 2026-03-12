import { useEffect, useState } from "react";
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
import { Search, TrendingUp, DollarSign, Clock, Database, ArrowUpDown, Globe2 } from "lucide-react";
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
  ComposedChart,
  Area
} from "recharts";

const REGIONS = [
  { value: "all", label: "All Regions" },
  { value: "North America", label: "North America" },
  { value: "Europe", label: "Europe" },
  { value: "Asia-Pacific", label: "Asia-Pacific" },
  { value: "Middle East", label: "Middle East" },
  { value: "South America", label: "South America" },
];

const SUB_REGIONS = {
  "Europe": ["Western Europe", "Eastern Europe", "Nordic", "Southern Europe"],
  "Asia-Pacific": ["East Asia", "South Asia", "Southeast Asia", "Oceania"],
  "Middle East": ["Gulf States", "Levant", "North Africa"],
};

const SORT_OPTIONS = [
  { value: "expenditure_desc", label: "Expenditure (High to Low)" },
  { value: "expenditure_asc", label: "Expenditure (Low to High)" },
  { value: "gdp_desc", label: "% GDP (High to Low)" },
  { value: "gdp_asc", label: "% GDP (Low to High)" },
  { value: "name_asc", label: "Country (A-Z)" },
];

const COLORS = ['#7E22CE', '#A855F7', '#10B981', '#F59E0B', '#3B82F6', '#06B6D4', '#EC4899', '#84CC16'];

// Country code mapping for flags
const COUNTRY_FLAGS = {
  "US": "us", "CN": "cn", "RU": "ru", "IN": "in", "SA": "sa",
  "GB": "gb", "DE": "de", "FR": "fr", "JP": "jp", "KR": "kr",
  "AU": "au", "IT": "it", "BR": "br", "CA": "ca", "IL": "il",
  "TR": "tr", "ES": "es", "PL": "pl", "NL": "nl", "TW": "tw",
  "SG": "sg", "GR": "gr", "NO": "no", "SE": "se", "FI": "fi",
  "AE": "ae", "PK": "pk", "ID": "id", "VN": "vn", "EG": "eg"
};

export default function Expenditures() {
  const [expenditures, setExpenditures] = useState([]);
  const [filteredExpenditures, setFilteredExpenditures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [sortBy, setSortBy] = useState("expenditure_desc");
  const [viewMode, setViewMode] = useState("table"); // "table" or "map"

  useEffect(() => {
    const fetchExpenditures = async () => {
      try {
        const response = await axios.get(`${API}/expenditures`);
        setExpenditures(response.data);
        setFilteredExpenditures(response.data);
      } catch (error) {
        console.error("Error fetching expenditures:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchExpenditures();
  }, []);

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

    // Sorting
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

  const totalExpenditure = filteredExpenditures.reduce((sum, e) => sum + e.expenditure, 0);
  const avgGdpPercent = filteredExpenditures.length 
    ? (filteredExpenditures.reduce((sum, e) => sum + e.gdp_percent, 0) / filteredExpenditures.length).toFixed(1)
    : 0;

  const topCountries = [...filteredExpenditures]
    .sort((a, b) => b.expenditure - a.expenditure)
    .slice(0, 10);

  const regionData = filteredExpenditures.reduce((acc, exp) => {
    const existing = acc.find(r => r.name === exp.region);
    if (existing) {
      existing.value += exp.expenditure;
    } else {
      acc.push({ name: exp.region, value: exp.expenditure });
    }
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
        <div className="flex items-center gap-2 text-xs text-slate-500 bg-white border border-slate-200 rounded-lg px-3 py-2">
          <Clock className="w-3.5 h-3.5" />
          <span>FY 2024</span>
          <span className="text-slate-300">|</span>
          <Database className="w-3.5 h-3.5" />
          <span>Source: SIPRI, IISS, Gov Reports</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">TOTAL SPENDING</p>
            <p className="text-2xl font-mono font-bold text-slate-900 mt-2">${totalExpenditure.toFixed(0)}B</p>
            <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +3.2% YoY
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

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Countries Bar Chart */}
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-100 pb-4 bg-slate-50/50">
            <CardTitle className="font-heading text-lg text-slate-900">Top Spending Countries</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-[300px]" data-testid="top-countries-chart">
              <ResponsiveContainer width="100%" height="100%" minWidth={200}>
                <BarChart data={topCountries} layout="vertical">
                  <XAxis 
                    type="number" 
                    tick={{ fill: '#64748B', fontSize: 11 }} 
                    axisLine={false} 
                    tickLine={false}
                    tickFormatter={(v) => `$${v}B`}
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
                  <Bar dataKey="expenditure" fill="#7E22CE" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
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
                    <span 
                      className="w-2 h-2 rounded-full" 
                      style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                    />
                    <span className="text-slate-600">{region.name}</span>
                  </div>
                  <span className="font-mono text-slate-900 font-medium">${region.value.toFixed(1)}B</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

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

      {/* Data Table with Flags */}
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
                      <span className="text-sm text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
                        {exp.region}
                      </span>
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Map Visualization Placeholder */}
      <Card className="bg-white border-slate-200 shadow-sm">
        <CardHeader className="border-b border-slate-100 pb-4 bg-slate-50/50">
          <div className="flex items-center justify-between">
            <CardTitle className="font-heading text-lg text-slate-900">Global Defense Spending Map</CardTitle>
            <span className="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded-full border border-purple-200">
              Interactive View
            </span>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="relative w-full h-[350px] bg-gradient-to-br from-slate-50 to-purple-50/30 rounded-lg overflow-hidden border border-slate-100">
            {/* Simple SVG World Map representation */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-4">
                <Globe2 className="w-16 h-16 text-purple-300 mx-auto" />
                <div>
                  <p className="text-slate-600 font-medium">Global Defense Budget Distribution</p>
                  <p className="text-sm text-slate-500 mt-1">Hover over countries for details</p>
                </div>
              </div>
            </div>
            
            {/* Top 5 countries as positioned markers */}
            <div className="absolute inset-0 pointer-events-none">
              {/* USA */}
              <div className="absolute left-[18%] top-[35%] transform -translate-x-1/2 -translate-y-1/2">
                <div className="flex flex-col items-center gap-1 pointer-events-auto">
                  <img src={getFlag("US")} alt="USA" className="w-8 h-6 rounded shadow-lg border-2 border-white" />
                  <span className="text-xs font-mono bg-purple-700 text-white px-1.5 py-0.5 rounded">$886B</span>
                </div>
              </div>
              {/* China */}
              <div className="absolute left-[75%] top-[40%] transform -translate-x-1/2 -translate-y-1/2">
                <div className="flex flex-col items-center gap-1 pointer-events-auto">
                  <img src={getFlag("CN")} alt="China" className="w-8 h-6 rounded shadow-lg border-2 border-white" />
                  <span className="text-xs font-mono bg-purple-600 text-white px-1.5 py-0.5 rounded">$296B</span>
                </div>
              </div>
              {/* Russia */}
              <div className="absolute left-[58%] top-[25%] transform -translate-x-1/2 -translate-y-1/2">
                <div className="flex flex-col items-center gap-1 pointer-events-auto">
                  <img src={getFlag("RU")} alt="Russia" className="w-8 h-6 rounded shadow-lg border-2 border-white" />
                  <span className="text-xs font-mono bg-purple-500 text-white px-1.5 py-0.5 rounded">$109B</span>
                </div>
              </div>
              {/* India */}
              <div className="absolute left-[65%] top-[50%] transform -translate-x-1/2 -translate-y-1/2">
                <div className="flex flex-col items-center gap-1 pointer-events-auto">
                  <img src={getFlag("IN")} alt="India" className="w-8 h-6 rounded shadow-lg border-2 border-white" />
                  <span className="text-xs font-mono bg-purple-400 text-white px-1.5 py-0.5 rounded">$83.6B</span>
                </div>
              </div>
              {/* UK */}
              <div className="absolute left-[45%] top-[28%] transform -translate-x-1/2 -translate-y-1/2">
                <div className="flex flex-col items-center gap-1 pointer-events-auto">
                  <img src={getFlag("GB")} alt="UK" className="w-8 h-6 rounded shadow-lg border-2 border-white" />
                  <span className="text-xs font-mono bg-purple-400 text-white px-1.5 py-0.5 rounded">$68.5B</span>
                </div>
              </div>
              {/* Saudi Arabia */}
              <div className="absolute left-[55%] top-[48%] transform -translate-x-1/2 -translate-y-1/2">
                <div className="flex flex-col items-center gap-1 pointer-events-auto">
                  <img src={getFlag("SA")} alt="Saudi Arabia" className="w-8 h-6 rounded shadow-lg border-2 border-white" />
                  <span className="text-xs font-mono bg-purple-400 text-white px-1.5 py-0.5 rounded">$75B</span>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 border border-slate-200 shadow-sm">
              <p className="text-xs font-semibold text-slate-700 mb-2">Spending Level</p>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-purple-700"></span>
                  <span className="text-xs text-slate-600">&gt; $500B</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                  <span className="text-xs text-slate-600">$100B - $500B</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-purple-300"></span>
                  <span className="text-xs text-slate-600">&lt; $100B</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
