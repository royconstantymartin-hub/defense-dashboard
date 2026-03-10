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
import { Search, TrendingUp, TrendingDown, DollarSign, Users, Building2 } from "lucide-react";
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
  { value: "USA", label: "United States" },
  { value: "UK", label: "United Kingdom" },
  { value: "France", label: "France" },
  { value: "Germany", label: "Germany" },
  { value: "Italy", label: "Italy" },
  { value: "EU", label: "European Union" },
];

export default function MarketData() {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get(`${API}/defense-players`);
        setPlayers(response.data);
        setFilteredPlayers(response.data);
      } catch (error) {
        console.error("Error fetching players:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlayers();
  }, []);

  useEffect(() => {
    let filtered = players;
    
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
    
    setFilteredPlayers(filtered);
  }, [searchTerm, selectedCountry, players]);

  const totalMarketCap = filteredPlayers.reduce((sum, p) => sum + p.market_cap, 0);
  const totalRevenue = filteredPlayers.reduce((sum, p) => sum + p.revenue, 0);
  const totalEmployees = filteredPlayers.reduce((sum, p) => sum + p.employees, 0);

  const chartData = filteredPlayers.slice(0, 8).map(p => ({
    name: p.ticker,
    value: p.market_cap,
    change: p.change_percent
  }));

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div data-testid="market-data-page" className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="font-heading text-3xl font-bold text-white tracking-tight">
          Market Data
        </h1>
        <p className="text-zinc-500 text-sm mt-1">Defense Industry Market Capitalization & Financials</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-zinc-950 border-zinc-800 p-4">
          <p className="text-xs font-mono uppercase tracking-wider text-zinc-500">TOTAL MARKET CAP</p>
          <p className="text-2xl font-mono font-medium text-white mt-2">${totalMarketCap.toFixed(1)}B</p>
        </Card>
        <Card className="bg-zinc-950 border-zinc-800 p-4">
          <p className="text-xs font-mono uppercase tracking-wider text-zinc-500">COMBINED REVENUE</p>
          <p className="text-2xl font-mono font-medium text-white mt-2">${totalRevenue.toFixed(1)}B</p>
        </Card>
        <Card className="bg-zinc-950 border-zinc-800 p-4">
          <p className="text-xs font-mono uppercase tracking-wider text-zinc-500">TOTAL EMPLOYEES</p>
          <p className="text-2xl font-mono font-medium text-white mt-2">{(totalEmployees / 1000).toFixed(0)}K</p>
        </Card>
        <Card className="bg-zinc-950 border-zinc-800 p-4">
          <p className="text-xs font-mono uppercase tracking-wider text-zinc-500">COMPANIES</p>
          <p className="text-2xl font-mono font-medium text-white mt-2">{filteredPlayers.length}</p>
        </Card>
      </div>

      {/* Chart */}
      <Card className="bg-zinc-950 border-zinc-800">
        <CardHeader className="border-b border-zinc-800 pb-4">
          <CardTitle className="font-heading text-lg text-white">Market Cap Comparison</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="h-[250px]" data-testid="market-cap-chart">
            <ResponsiveContainer width="100%" height="100%" minWidth={200}>
              <BarChart data={chartData}>
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: '#A1A1AA', fontSize: 11 }} 
                  axisLine={false} 
                  tickLine={false}
                />
                <YAxis 
                  tick={{ fill: '#71717A', fontSize: 11 }} 
                  axisLine={false} 
                  tickLine={false}
                  tickFormatter={(v) => `$${v}B`}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-sm">
                          <p className="text-white font-mono text-sm">{data.name}</p>
                          <p className="text-blue-500 font-mono">${data.value}B</p>
                          <p className={`font-mono text-sm ${data.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {data.change >= 0 ? '+' : ''}{data.change}%
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.change >= 0 ? '#10B981' : '#EF4444'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <Input
            placeholder="Search by company or ticker..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600"
            data-testid="search-players"
          />
        </div>
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

      {/* Players Table */}
      <Card className="bg-zinc-950 border-zinc-800">
        <CardContent className="p-0">
          <div className="overflow-x-auto" data-testid="players-table">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left text-xs font-mono uppercase tracking-wider text-zinc-500 p-4">Company</th>
                  <th className="text-left text-xs font-mono uppercase tracking-wider text-zinc-500 p-4">Ticker</th>
                  <th className="text-right text-xs font-mono uppercase tracking-wider text-zinc-500 p-4">Stock Price</th>
                  <th className="text-right text-xs font-mono uppercase tracking-wider text-zinc-500 p-4">Market Cap</th>
                  <th className="text-right text-xs font-mono uppercase tracking-wider text-zinc-500 p-4">Revenue</th>
                  <th className="text-right text-xs font-mono uppercase tracking-wider text-zinc-500 p-4">Change</th>
                  <th className="text-left text-xs font-mono uppercase tracking-wider text-zinc-500 p-4">Specializations</th>
                </tr>
              </thead>
              <tbody>
                {filteredPlayers.map((player) => (
                  <tr 
                    key={player.id} 
                    className="border-b border-zinc-800/50 hover:bg-zinc-900/50 transition-colors cursor-pointer"
                    onClick={() => setSelectedPlayer(player)}
                    data-testid={`player-row-${player.id}`}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-zinc-800 rounded-sm flex items-center justify-center">
                          <Building2 className="w-5 h-5 text-zinc-400" />
                        </div>
                        <div>
                          <p className="text-white font-medium text-sm">{player.name}</p>
                          <p className="text-xs text-zinc-500">{player.country}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="font-mono text-sm text-blue-400">{player.ticker}</span>
                    </td>
                    <td className="p-4 text-right">
                      <span className="font-mono text-sm text-white">${player.stock_price.toFixed(2)}</span>
                    </td>
                    <td className="p-4 text-right">
                      <span className="font-mono text-sm text-white">${player.market_cap}B</span>
                    </td>
                    <td className="p-4 text-right">
                      <span className="font-mono text-sm text-zinc-400">${player.revenue}B</span>
                    </td>
                    <td className="p-4 text-right">
                      <span className={`font-mono text-sm flex items-center justify-end gap-1 ${
                        player.change_percent >= 0 ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {player.change_percent >= 0 ? (
                          <TrendingUp className="w-3 h-3" />
                        ) : (
                          <TrendingDown className="w-3 h-3" />
                        )}
                        {player.change_percent >= 0 ? '+' : ''}{player.change_percent}%
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {player.specializations.slice(0, 2).map((spec, idx) => (
                          <span key={idx} className="text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full">
                            {spec}
                          </span>
                        ))}
                        {player.specializations.length > 2 && (
                          <span className="text-xs text-zinc-500">+{player.specializations.length - 2}</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Player Detail Modal */}
      {selectedPlayer && (
        <div 
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedPlayer(null)}
        >
          <Card 
            className="bg-zinc-950 border-zinc-800 w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
            data-testid="player-detail-modal"
          >
            <CardHeader className="border-b border-zinc-800">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-zinc-800 rounded-sm flex items-center justify-center">
                  <Building2 className="w-7 h-7 text-zinc-400" />
                </div>
                <div>
                  <CardTitle className="font-heading text-xl text-white">{selectedPlayer.name}</CardTitle>
                  <p className="text-sm text-zinc-500">{selectedPlayer.country} • {selectedPlayer.ticker}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-zinc-500">STOCK PRICE</p>
                  <p className="text-xl font-mono text-white mt-1">${selectedPlayer.stock_price.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-zinc-500">CHANGE</p>
                  <p className={`text-xl font-mono mt-1 ${
                    selectedPlayer.change_percent >= 0 ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {selectedPlayer.change_percent >= 0 ? '+' : ''}{selectedPlayer.change_percent}%
                  </p>
                </div>
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-zinc-500">MARKET CAP</p>
                  <p className="text-xl font-mono text-white mt-1">${selectedPlayer.market_cap}B</p>
                </div>
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-zinc-500">REVENUE</p>
                  <p className="text-xl font-mono text-white mt-1">${selectedPlayer.revenue}B</p>
                </div>
              </div>
              
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-zinc-500 mb-2">EMPLOYEES</p>
                <p className="text-white">{selectedPlayer.employees.toLocaleString()}</p>
              </div>
              
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-zinc-500 mb-2">SPECIALIZATIONS</p>
                <div className="flex flex-wrap gap-2">
                  {selectedPlayer.specializations.map((spec, idx) => (
                    <span key={idx} className="text-sm bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-full">
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
