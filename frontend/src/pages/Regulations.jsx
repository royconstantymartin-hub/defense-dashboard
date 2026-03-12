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
import { Search, FileText, Globe, Calendar, CheckCircle2, Clock, Database, Filter, Shield } from "lucide-react";

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
  const [regulations, setRegulations] = useState([]);
  const [filteredRegulations, setFilteredRegulations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCountry, setSelectedCountry] = useState("all");

  useEffect(() => {
    const fetchRegulations = async () => {
      try {
        const response = await axios.get(`${API}/regulations`);
        setRegulations(response.data);
        setFilteredRegulations(response.data);
      } catch (error) {
        console.error("Error fetching regulations:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRegulations();
  }, []);

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
        r.description.toLowerCase().includes(term)
      );
    }
    
    setFilteredRegulations(filtered);
  }, [searchTerm, selectedCategory, selectedCountry, regulations]);

  const getCategoryStyle = (category) => {
    switch (category) {
      case 'offset':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'export_control':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'procurement':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'itar':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  const getFlag = (country) => {
    const code = COUNTRY_FLAGS[country];
    return code ? `https://flagcdn.com/w40/${code}.png` : null;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full" />
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
          <span>Updated: Q4 2024</span>
          <span className="text-slate-300">|</span>
          <Database className="w-3.5 h-3.5" />
          <span>Official sources</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">TOTAL REGULATIONS</p>
            <p className="text-2xl font-mono font-bold text-slate-900 mt-2">{regulations.length}</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">OFFSET POLICIES</p>
            <p className="text-2xl font-mono font-bold text-purple-600 mt-2">
              {regulations.filter(r => r.category === 'offset').length}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">EXPORT CONTROLS</p>
            <p className="text-2xl font-mono font-bold text-blue-600 mt-2">
              {regulations.filter(r => r.category === 'export_control').length}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">COUNTRIES</p>
            <p className="text-2xl font-mono font-bold text-slate-900 mt-2">
              {new Set(regulations.map(r => r.country)).size}
            </p>
          </CardContent>
        </Card>
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
              <SelectItem key={c.value} value={c.value} className="text-slate-700 focus:bg-purple-50">
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
              <SelectItem key={c.value} value={c.value} className="text-slate-700 focus:bg-purple-50">
                {c.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Regulations Accordion */}
      <Card className="bg-white border-slate-200 shadow-sm">
        <CardContent className="p-0" data-testid="regulations-list">
          <Accordion type="single" collapsible className="w-full">
            {filteredRegulations.map((reg) => {
              const flagUrl = getFlag(reg.country);
              return (
                <AccordionItem 
                  key={reg.id} 
                  value={reg.id}
                  className="border-b border-slate-100 last:border-0"
                  data-testid={`regulation-item-${reg.id}`}
                >
                  <AccordionTrigger className="px-6 py-4 hover:bg-purple-50/30 hover:no-underline transition-colors">
                    <div className="flex items-start gap-4 text-left">
                      <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <FileText className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${getCategoryStyle(reg.category)}`}>
                            {reg.category.replace('_', ' ').toUpperCase()}
                          </span>
                          <span className="text-xs text-slate-500 flex items-center gap-1.5 bg-slate-100 px-2 py-0.5 rounded-full">
                            {flagUrl && (
                              <img src={flagUrl} alt={reg.country} className="w-4 h-3 object-cover rounded-sm" />
                            )}
                            {reg.country}
                          </span>
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
                        <span>Effective Date: {reg.effective_date}</span>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
          
          {filteredRegulations.length === 0 && (
            <div className="text-center py-12 text-slate-500">
              No regulations found matching your criteria
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
