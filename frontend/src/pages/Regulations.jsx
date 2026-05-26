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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search, FileText, Globe, Calendar, CheckCircle2, Clock, Database, Filter, Shield, ArrowUpDown, ExternalLink, Lock, ArrowLeftRight, FileCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CATEGORIES = [
  { value: "all", label: "All Categories" },
  { value: "offset", label: "Offset Policies" },
  { value: "export_control", label: "Export Controls" },
  { value: "procurement", label: "Procurement" },
  { value: "itar", label: "ITAR" },
];

const COUNTRIES = [
  { value: "all", label: "All Countries" },
  { value: "USA", label: "United States" },
  { value: "UK", label: "United Kingdom" },
  { value: "EU", label: "European Union" },
  { value: "France", label: "France" },
  { value: "Germany", label: "Germany" },
  { value: "India", label: "India" },
  { value: "South Korea", label: "South Korea" },
  { value: "Turkey", label: "Turkey" },
  { value: "Australia", label: "Australia" },
  { value: "UAE", label: "UAE" },
  { value: "Saudi Arabia", label: "Saudi Arabia" },
  { value: "Poland", label: "Poland" },
];

// Country code mapping for flags
const COUNTRY_FLAGS = {
  "USA": "us", "UK": "gb", "France": "fr", "Germany": "de", "Italy": "it",
  "EU": "eu", "Spain": "es", "Sweden": "se", "Norway": "no", "Israel": "il",
  "Japan": "jp", "South Korea": "kr", "India": "in", "Australia": "au",
  "Brazil": "br", "Canada": "ca", "Turkey": "tr", "UAE": "ae", "Singapore": "sg",
  "China": "cn", "Russia": "ru", "Poland": "pl", "Czech Republic": "cz",
  "Switzerland": "ch", "Netherlands": "nl", "Belgium": "be", "Finland": "fi",
  "South Africa": "za", "Saudi Arabia": "sa"
};

export default function Regulations() {
  const navigate = useNavigate();
  const [regulations, setRegulations] = useState([]);
  const [filteredRegulations, setFilteredRegulations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [sortBy, setSortBy] = useState("date_desc");

  const fetchRegulations = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await axios.get(`${API}/regulations`);
      setRegulations(response.data);
      setFilteredRegulations(response.data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRegulations(); }, []);

  useEffect(() => {
    let filtered = regulations;
    
    if (selectedCategory !== "all") {
      filtered = filtered.filter(r => r.category === selectedCategory);
    }
    
    if (selectedCountry !== "all") {
      filtered = filtered.filter(r => r.country === selectedCountry);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(r =>
        r.title.toLowerCase().includes(term) ||
        r.description.toLowerCase().includes(term) ||
        r.country.toLowerCase().includes(term)
      );
    }

    // Sort
    filtered = [...filtered].sort((a, b) => {
      if (sortBy === "date_desc") {
        return (new Date(b.effective_date || 0)) - (new Date(a.effective_date || 0));
      }
      if (sortBy === "date_asc") {
        return (new Date(a.effective_date || 0)) - (new Date(b.effective_date || 0));
      }
      if (sortBy === "country_asc") {
        return a.country.localeCompare(b.country);
      }
      return 0;
    });

    setFilteredRegulations(filtered);
  }, [searchTerm, selectedCategory, selectedCountry, sortBy, regulations]);

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'itar':          return { Icon: Lock,          cls: "text-slate-600", bg: "bg-slate-100 border-slate-200" };
      case 'export_control':return { Icon: Globe,          cls: "text-slate-600", bg: "bg-slate-100 border-slate-200" };
      case 'procurement':   return { Icon: FileCheck,      cls: "text-slate-600", bg: "bg-slate-100 border-slate-200" };
      case 'offset':        return { Icon: ArrowLeftRight, cls: "text-slate-600", bg: "bg-slate-100 border-slate-200" };
      default:              return { Icon: FileText,       cls: "text-slate-600", bg: "bg-slate-100 border-slate-200" };
    }
  };

  const getCategoryStyle = (_category) => 'bg-slate-100 text-slate-600 border-slate-200';

  const getFlag = (country) => {
    const code = COUNTRY_FLAGS[country];
    return code ? `https://flagcdn.com/w40/${code}.png` : null;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-2 border-slate-200 border-t-slate-800 rounded-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4 text-slate-500">
        <p className="font-medium">Failed to load regulations.</p>
        <button onClick={fetchRegulations} className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm hover:bg-slate-800 transition-colors">Retry</button>
      </div>
    );
  }

  return (
    <div data-testid="regulations-page" className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-slate-900 tracking-tight">
            Regulations Database
          </h1>
          <p className="text-slate-500 text-sm mt-1">Defense Industry Compliance & Export Controls</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 bg-white border border-slate-200 rounded-lg px-3 py-2">
          <Clock className="w-3.5 h-3.5" />
          <span>Updated: {new Date().getFullYear()}</span>
          <span className="text-slate-300">|</span>
          <Database className="w-3.5 h-3.5" />
          <span>Official sources</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "TOTAL REGULATIONS", value: regulations.length,                                    Icon: Shield,        iconCls: "text-blue-800",  bgCls: "bg-blue-50",    top: "border-t-2 border-t-blue-700" },
          { label: "OFFSET POLICIES",   value: regulations.filter(r=>r.category==='offset').length,  Icon: ArrowLeftRight,iconCls: "text-slate-600",    bgCls: "bg-slate-100",    top: "border-t-2 border-t-slate-400" },
          { label: "EXPORT CONTROLS",   value: regulations.filter(r=>r.category==='export_control').length, Icon: Globe,  iconCls: "text-slate-600",    bgCls: "bg-slate-100",    top: "border-t-2 border-t-slate-400" },
          { label: "COUNTRIES",         value: new Set(regulations.map(r=>r.country)).size,           Icon: FileCheck,     iconCls: "text-slate-600",    bgCls: "bg-slate-100",    top: "border-t-2 border-t-slate-400" },
        ].map(({ label, value, Icon, iconCls, bgCls, top }) => (
          <Card key={label} className={`bg-white border-slate-200 shadow-sm ${top}`}>
            <CardContent className="p-5 flex items-start justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">{label}</p>
                <p className="text-2xl font-mono font-bold text-slate-900 mt-2">{value}</p>
              </div>
              <div className={`w-9 h-9 ${bgCls} rounded-xl flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-4 h-4 ${iconCls}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search regulations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400"
            data-testid="search-regulations"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-48 bg-white border-slate-200 text-slate-700" data-testid="category-filter">
            <Filter className="w-4 h-4 mr-2 text-slate-400" />
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent className="bg-white border-slate-200">
            {CATEGORIES.map(c => (
              <SelectItem key={c.value} value={c.value} className="text-slate-700 focus:bg-slate-50">
                {c.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedCountry} onValueChange={setSelectedCountry}>
          <SelectTrigger className="w-full sm:w-48 bg-white border-slate-200 text-slate-700" data-testid="country-filter">
            <Globe className="w-4 h-4 mr-2 text-slate-400" />
            <SelectValue placeholder="Country" />
          </SelectTrigger>
          <SelectContent className="bg-white border-slate-200 max-h-80">
            {COUNTRIES.map(c => (
              <SelectItem key={c.value} value={c.value} className="text-slate-700 focus:bg-slate-50">
                {c.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-48 bg-white border-slate-200 text-slate-700">
            <ArrowUpDown className="w-4 h-4 mr-2 text-slate-400" />
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="bg-white border-slate-200">
            <SelectItem value="date_desc" className="text-slate-700 focus:bg-slate-50">Date (newest first)</SelectItem>
            <SelectItem value="date_asc" className="text-slate-700 focus:bg-slate-50">Date (oldest first)</SelectItem>
            <SelectItem value="country_asc" className="text-slate-700 focus:bg-slate-50">Country (A → Z)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Regulations Accordion */}
      <Card className="bg-white border-slate-200 shadow-sm">
        <CardContent className="p-0" data-testid="regulations-list">
          <Accordion type="single" collapsible className="w-full">
            {filteredRegulations.map((reg) => {
              const flagUrl = getFlag(reg.country);
              // "Recent" = effective_date within the last 12 months
              const isRecent = reg.effective_date
                && (new Date() - new Date(reg.effective_date)) < 365 * 24 * 3600 * 1000
                && new Date(reg.effective_date) <= new Date();
              return (
                <AccordionItem
                  key={reg.id}
                  value={reg.id}
                  className="border-b border-slate-100 last:border-0"
                  data-testid={`regulation-item-${reg.id}`}
                >
                  <AccordionTrigger className="px-6 py-4 hover:bg-slate-50 hover:no-underline transition-colors">
                    <div className="flex items-start gap-4 text-left">
                      {(() => { const { Icon, cls, bg } = getCategoryIcon(reg.category); return (
                        <div className={`w-10 h-10 ${bg} border rounded-xl flex items-center justify-center flex-shrink-0`}>
                          <Icon className={`w-5 h-5 ${cls}`} />
                        </div>
                      ); })()}
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${getCategoryStyle(reg.category)}`}>
                            {reg.category.replace('_', ' ').toUpperCase()}
                          </span>
                          {/* Clickable country badge → Expenditures filtered */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/expenditures?country=${encodeURIComponent(reg.country)}`);
                            }}
                            className="text-xs text-slate-500 flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 hover:text-slate-900 px-2 py-0.5 rounded-full transition-colors"
                            title={`View ${reg.country} expenditures`}
                          >
                            {flagUrl && (
                              <img src={flagUrl} alt={reg.country} className="w-4 h-3 object-cover rounded-sm" />
                            )}
                            {reg.country}
                            <ExternalLink className="w-2.5 h-2.5 opacity-50" />
                          </button>
                          {isRecent && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase tracking-wide">
                              Recent
                            </span>
                          )}
                        </div>
                        <h3 className="text-slate-900 font-medium">{reg.title}</h3>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="ml-14 space-y-4">
                      <p className="text-slate-600 leading-relaxed">{reg.description}</p>
                      
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                          KEY REQUIREMENTS
                        </h4>
                        <ul className="space-y-2">
                          {reg.requirements.map((req, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex items-center gap-2 pt-2 text-sm text-slate-500 bg-slate-50 rounded-lg p-3">
                        <Calendar className="w-4 h-4" />
                        <span>Effective Date: {reg.effective_date ? new Date(reg.effective_date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "N/A"}</span>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
          
          {filteredRegulations.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <Search className="w-8 h-8 text-slate-300" />
              <p className="text-sm text-slate-500">No regulations found matching your criteria</p>
              <button
                onClick={() => { setSearchTerm(""); setSelectedCategory("all"); setSelectedCountry("all"); }}
                className="text-xs text-blue-700 hover:text-blue-900 font-medium underline underline-offset-2"
              >
                Clear filters
              </button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
