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
import { Search, FileText, Globe, Calendar, CheckCircle2 } from "lucide-react";

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
];

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
        return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      case 'export_control':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'procurement':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'itar':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      default:
        return 'bg-zinc-800 text-zinc-400 border-zinc-700';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div data-testid="regulations-page" className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="font-heading text-3xl font-bold text-white tracking-tight">
          Regulations Database
        </h1>
        <p className="text-zinc-500 text-sm mt-1">Defense Industry Compliance & Export Controls</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-zinc-950 border-zinc-800 p-4">
          <p className="text-xs font-mono uppercase tracking-wider text-zinc-500">TOTAL REGULATIONS</p>
          <p className="text-2xl font-mono font-medium text-white mt-2">{regulations.length}</p>
        </Card>
        <Card className="bg-zinc-950 border-zinc-800 p-4">
          <p className="text-xs font-mono uppercase tracking-wider text-zinc-500">OFFSET POLICIES</p>
          <p className="text-2xl font-mono font-medium text-purple-500 mt-2">
            {regulations.filter(r => r.category === 'offset').length}
          </p>
        </Card>
        <Card className="bg-zinc-950 border-zinc-800 p-4">
          <p className="text-xs font-mono uppercase tracking-wider text-zinc-500">EXPORT CONTROLS</p>
          <p className="text-2xl font-mono font-medium text-blue-500 mt-2">
            {regulations.filter(r => r.category === 'export_control').length}
          </p>
        </Card>
        <Card className="bg-zinc-950 border-zinc-800 p-4">
          <p className="text-xs font-mono uppercase tracking-wider text-zinc-500">COUNTRIES</p>
          <p className="text-2xl font-mono font-medium text-white mt-2">
            {new Set(regulations.map(r => r.country)).size}
          </p>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <Input
            placeholder="Search regulations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600"
            data-testid="search-regulations"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-48 bg-zinc-900 border-zinc-800 text-white" data-testid="category-filter">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-900 border-zinc-800">
            {CATEGORIES.map(c => (
              <SelectItem key={c.value} value={c.value} className="text-white focus:bg-zinc-800">
                {c.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedCountry} onValueChange={setSelectedCountry}>
          <SelectTrigger className="w-full sm:w-48 bg-zinc-900 border-zinc-800 text-white" data-testid="country-filter">
            <SelectValue placeholder="Country" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-900 border-zinc-800">
            {COUNTRIES.map(c => (
              <SelectItem key={c.value} value={c.value} className="text-white focus:bg-zinc-800">
                {c.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Regulations Accordion */}
      <Card className="bg-zinc-950 border-zinc-800">
        <CardContent className="p-0" data-testid="regulations-list">
          <Accordion type="single" collapsible className="w-full">
            {filteredRegulations.map((reg) => (
              <AccordionItem 
                key={reg.id} 
                value={reg.id}
                className="border-b border-zinc-800 last:border-0"
                data-testid={`regulation-item-${reg.id}`}
              >
                <AccordionTrigger className="px-6 py-4 hover:bg-zinc-900/50 hover:no-underline">
                  <div className="flex items-start gap-4 text-left">
                    <div className="w-10 h-10 bg-zinc-800 rounded-sm flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-zinc-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className={`text-xs font-mono px-2 py-0.5 rounded-full border ${getCategoryStyle(reg.category)}`}>
                          {reg.category.replace('_', ' ').toUpperCase()}
                        </span>
                        <span className="text-xs text-zinc-500 flex items-center gap-1">
                          <Globe className="w-3 h-3" />
                          {reg.country}
                        </span>
                      </div>
                      <h3 className="text-white font-medium">{reg.title}</h3>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="ml-14 space-y-4">
                    <p className="text-zinc-400 leading-relaxed">{reg.description}</p>
                    
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-500 mb-3">
                        KEY REQUIREMENTS
                      </h4>
                      <ul className="space-y-2">
                        {reg.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-zinc-300">
                            <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex items-center gap-2 pt-2 text-sm text-zinc-500">
                      <Calendar className="w-4 h-4" />
                      <span>Effective Date: {reg.effective_date}</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          {filteredRegulations.length === 0 && (
            <div className="text-center py-12 text-zinc-500">
              No regulations found matching your criteria
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
