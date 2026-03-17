import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "@/App";
import { FALLBACK_API_DATA } from "@/data/fallbackApiData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, TrendingUp, TrendingDown, ArrowUpDown, ArrowDown, ArrowUp, Building2, Clock, Database } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";

const COUNTRIES = [
  { value: "all", label: "All Countries" },
  { value: "USA", label: "🇺🇸 United States" },
  { value: "UK", label: "🇬🇧 United Kingdom" },
  { value: "France", label: "🇫🇷 France" },
  { value: "Germany", label: "🇩🇪 Germany" },
  { value: "Italy", label: "🇮🇹 Italy" },
  { value: "EU", label: "🇪🇺 European Union" },
  { value: "Israel", label: "🇮🇱 Israel" },
  { value: "Japan", label: "🇯🇵 Japan" },
  { value: "South Korea", label: "🇰🇷 South Korea" },
  { value: "Turkey", label: "🇹🇷 Turkey" },
  { value: "India", label: "🇮🇳 India" },
];

const SORT_OPTIONS = [
  { value: "market_cap_desc", label: "Market Cap (High to Low)" },
  { value: "market_cap_asc", label: "Market Cap (Low to High)" },
  { value: "change_desc", label: "Change % (Best)" },
  { value: "change_asc", label: "Change % (Worst)" },
  { value: "revenue_desc", label: "Revenue (High to Low)" },
  { value: "name_asc", label: "Name (A-Z)" },
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

// Company logo domains
const COMPANY_LOGOS = {
  "Lockheed Martin": "lockheedmartin.com",
  "Raytheon Technologies": "rtx.com",
  "Boeing Defense": "boeing.com",
  "Northrop Grumman": "northropgrumman.com",
  "General Dynamics": "gd.com",
  "L3Harris Technologies": "l3harris.com",
  "BAE Systems": "baesystems.com",
  "Thales": "thalesgroup.com",
  "Leonardo": "leonardo.com",
  "Airbus Defence & Space": "airbus.com",
  "Safran": "safran-group.com",
  "Dassault Aviation": "dassault-aviation.com",
  "Rheinmetall": "rheinmetall.com",
  "Saab AB": "saab.com",
  "Elbit Systems": "elbitsystems.com",
};

export default function MarketData() {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [sortBy, setSortBy] = useState("market_cap_desc");
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get(`${API}/defense-players`);
        setPlayers(response.data);
        setFilteredPlayers(response.data);
      } catch (error) {
        console.error("Error fetching players:", error);
        setPlayers(FALLBACK_API_DATA.defense_players);
        setFilteredPlayers(FALLBACK_API_DATA.defense_players);

      } finally {
        setLoading(false);
      }
    };
    fetchPlayers();
  }, []);

  useEffect(() => {
    let filtered = [...players];
    
    if (selectedCountry !== "all") {
      filtered = filtered.filter(p => p.country === selectedCountry);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(term) || 
        p.ticker.toLowerCase().includes(term)
      );
    }
    
    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "market_cap_desc": return b.market_cap - a.market_cap;
        case "market_cap_asc": return a.market_cap - b.market_cap;
        case "change_desc": return b.change_percent - a.change_percent;
        case "change_asc": return a.change_percent - b.change_percent;
        case "revenue_desc": return b.revenue - a.revenue;
        case "name_asc": return a.name.localeCompare(b.name);
        default: return 0;
      }
    });
    
    setFilteredPlayers(filtered);
  }, [searchTerm, selectedCountry, sortBy, players]);

  const totalMarketCap = filteredPlayers.reduce((sum, p) => sum + p.market_cap, 0);
  const totalRevenue = filteredPlayers.reduce((sum, p) => sum + p.revenue, 0);
  const totalEmployees = filteredPlayers.reduce((sum, p) => sum + p.employees, 0);

  const chartData = filteredPlayers.slice(0, 10).map(p => ({
    name: p.ticker || p.name.substring(0, 8),
    value: p.market_cap,
    change: p.change_percent
  }));

  const getFlag = (country) => {
    const code = COUNTRY_FLAGS[country];
    if (code) {
      return `https://flagcdn.com/w40/${code}.png`;
    }
    return null;
  };

  const getLogo = (companyName) => {
    const domain = COMPANY_LOGOS[companyName];
    if (domain) {
      return `https://logo.clearbit.com/${domain}`;
    }
    return null;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div data-testid="market-data-page" className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-slate-900 tracking-tight">
            Market Data
          </h1>
          <p className="text-slate-500 text-sm mt-1">Defense Industry Market Capitalization & Financials</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 bg-white border border-slate-200 rounded-lg px-3 py-2">
          <Clock className="w-3.5 h-3.5" />
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
          <span className="text-slate-300">|</span>
          <Database className="w-3.5 h-3.5" />
          <span>Source: Public filings, Bloomberg, Reuters</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">TOTAL MARKET CAP</p>
            <p className="text-2xl font-mono font-bold text-slate-900 mt-2">${totalMarketCap.toFixed(1)}B</p>
            <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +2.4% this week
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">COMBINED REVENUE</p>
            <p className="text-2xl font-mono font-bold text-slate-900 mt-2">${totalRevenue.toFixed(1)}B</p>
            <p className="text-xs text-slate-500 mt-1">TTM Revenue</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">TOTAL EMPLOYEES</p>
            <p className="text-2xl font-mono font-bold text-slate-900 mt-2">{(totalEmployees / 1000).toFixed(0)}K</p>
            <p className="text-xs text-slate-500 mt-1">Across all companies</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">COMPANIES</p>
            <p className="text-2xl font-mono font-bold text-purple-700 mt-2">{filteredPlayers.length}</p>
            <p className="text-xs text-slate-500 mt-1">of {players.length} total</p>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card className="bg-white border-slate-200 shadow-sm">
        <CardHeader className="border-b border-slate-100 pb-4">
          <CardTitle className="font-heading text-lg text-slate-900">Top 10 by Market Cap</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="h-[280px]" data-testid="market-cap-chart">
            <ResponsiveContainer width="100%" height="100%" minWidth={200}>
              <BarChart data={chartData}>
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: '#64748B', fontSize: 11 }} 
                  axisLine={false} 
                  tickLine={false}
                />
                <YAxis 
                  tick={{ fill: '#94A3B8', fontSize: 11 }} 
                  axisLine={false} 
                  tickLine={false}
                  tickFormatter={(v) => `$${v}B`}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white border border-slate-200 p-3 rounded-lg shadow-lg">
                          <p className="text-slate-900 font-medium text-sm">{data.name}</p>
                          <p className="text-purple-700 font-mono font-semibold">${data.value}B</p>
                          <p className={`font-mono text-sm ${data.change >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                            {data.change >= 0 ? '+' : ''}{data.change}%
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.change >= 0 ? '#7E22CE' : '#A855F7'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search by company or ticker..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400"
            data-testid="search-players"
          />
        </div>
        <Select value={selectedCountry} onValueChange={setSelectedCountry}>
          <SelectTrigger className="w-full sm:w-48 bg-white border-slate-200 text-slate-700" data-testid="country-filter">
            <SelectValue placeholder="Country" />
          </SelectTrigger>
          <SelectContent className="bg-white border-slate-200">
            {COUNTRIES.map(c => (
              <SelectItem key={c.value} value={c.value} className="text-slate-700 focus:bg-purple-50">
                {c.label}
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

      {/* Players Table */}
      <Card className="bg-white border-slate-200 shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto" data-testid="players-table">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 p-4">Company</th>
                  <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 p-4">Ticker</th>
                  <th className="text-right text-xs font-semibold uppercase tracking-wider text-slate-500 p-4">Stock Price</th>
                  <th className="text-right text-xs font-semibold uppercase tracking-wider text-slate-500 p-4">Market Cap</th>
                  <th className="text-right text-xs font-semibold uppercase tracking-wider text-slate-500 p-4">Revenue</th>
                  <th className="text-right text-xs font-semibold uppercase tracking-wider text-slate-500 p-4">Change</th>
                  <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 p-4">Specializations</th>
                </tr>
              </thead>
              <tbody>
                {filteredPlayers.map((player, idx) => {
                  const flagUrl = getFlag(player.country);
                  const logoUrl = getLogo(player.name);
                  return (
                    <tr 
                      key={player.id} 
                      className="border-b border-slate-100 hover:bg-purple-50/50 transition-colors cursor-pointer"
                      onClick={() => setSelectedPlayer(player)}
                      data-testid={`player-row-${player.id}`}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 bg-slate-100 rounded-lg flex items-center justify-center text-xs font-mono text-slate-500 font-medium">
                            {idx + 1}
                          </span>
                          {logoUrl ? (
                            <img 
                              src={logoUrl} 
                              alt={player.name}
                              className="w-8 h-8 rounded-lg object-contain bg-white border border-slate-100"
                              onError={(e) => { e.target.style.display = 'none'; }}
                            />
                          ) : (
                            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                              <Building2 className="w-4 h-4 text-purple-600" />
                            </div>
                          )}
                          <div>
                            <p className="text-slate-900 font-medium text-sm">{player.name}</p>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              {flagUrl && (
                                <img src={flagUrl} alt={player.country} className="w-4 h-3 object-cover rounded-sm" />
                              )}
                              <span className="text-xs text-slate-500">{player.country}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="font-mono text-sm text-purple-700 font-medium bg-purple-50 px-2 py-0.5 rounded">
                          {player.ticker}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <span className="font-mono text-sm text-slate-900 font-medium">
                          {player.stock_price > 0 ? `$${player.stock_price.toFixed(2)}` : 'Private'}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <span className="font-mono text-sm text-slate-900 font-semibold">${player.market_cap}B</span>
                      </td>
                      <td className="p-4 text-right">
                        <span className="font-mono text-sm text-slate-600">${player.revenue}B</span>
                      </td>
                      <td className="p-4 text-right">
                        <span className={`inline-flex items-center gap-1 font-mono text-sm px-2 py-0.5 rounded-full ${
                          player.change_percent >= 0 
                            ? 'text-emerald-700 bg-emerald-50' 
                            : 'text-rose-700 bg-rose-50'
                        }`}>
                          {player.change_percent >= 0 ? (
                            <ArrowUp className="w-3 h-3" />
                          ) : (
                            <ArrowDown className="w-3 h-3" />
                          )}
                          {player.change_percent >= 0 ? '+' : ''}{player.change_percent}%
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1">
                          {player.specializations.slice(0, 2).map((spec, idx) => (
                            <span key={idx} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                              {spec}
                            </span>
                          ))}
                          {player.specializations.length > 2 && (
                            <span className="text-xs text-slate-400">+{player.specializations.length - 2}</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Player Detail Modal */}
      {selectedPlayer && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-start justify-center z-50 p-4 sm:py-8 overflow-y-auto"
          onClick={() => setSelectedPlayer(null)}
        >
          <Card 
            className="bg-white border-slate-200 w-full max-w-lg shadow-2xl max-h-[calc(100vh-4rem)] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            data-testid="player-detail-modal"
          >
            <CardHeader className="border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-4">
                {getLogo(selectedPlayer.name) ? (
                  <img 
                    src={getLogo(selectedPlayer.name)} 
                    alt={selectedPlayer.name}
                    className="w-14 h-14 rounded-xl object-contain bg-white border border-slate-100 shadow-sm"
                  />
                ) : (
                  <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Building2 className="w-7 h-7 text-purple-600" />
                  </div>
                )}
                <div>
                  <CardTitle className="font-heading text-xl text-slate-900">{selectedPlayer.name}</CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    {getFlag(selectedPlayer.country) && (
                      <img src={getFlag(selectedPlayer.country)} alt={selectedPlayer.country} className="w-5 h-4 object-cover rounded-sm" />
                    )}
                    <span className="text-sm text-slate-500">{selectedPlayer.country}</span>
                    <span className="text-slate-300">•</span>
                    <span className="font-mono text-sm text-purple-700 font-medium">{selectedPlayer.ticker}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500">STOCK PRICE</p>
                  <p className="text-xl font-mono font-bold text-slate-900 mt-1">
                    {selectedPlayer.stock_price > 0 ? `$${selectedPlayer.stock_price.toFixed(2)}` : 'Private'}
                  </p>
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500">CHANGE</p>
                  <p className={`text-xl font-mono font-bold mt-1 ${
                    selectedPlayer.change_percent >= 0 ? 'text-emerald-600' : 'text-rose-600'
                  }`}>
                    {selectedPlayer.change_percent >= 0 ? '+' : ''}{selectedPlayer.change_percent}%
                  </p>
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500">MARKET CAP</p>
                  <p className="text-xl font-mono font-bold text-slate-900 mt-1">${selectedPlayer.market_cap}B</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500">REVENUE</p>
                  <p className="text-xl font-mono font-bold text-slate-900 mt-1">${selectedPlayer.revenue}B</p>
                </div>
              </div>
              
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-2">EMPLOYEES</p>
                <p className="text-slate-900 font-medium">{selectedPlayer.employees.toLocaleString()}</p>
              </div>
              
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-2">SPECIALIZATIONS</p>
                <div className="flex flex-wrap gap-2">
                  {selectedPlayer.specializations.map((spec, idx) => (
                    <span key={idx} className="text-sm bg-purple-50 text-purple-700 border border-purple-200 px-3 py-1 rounded-full font-medium">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
