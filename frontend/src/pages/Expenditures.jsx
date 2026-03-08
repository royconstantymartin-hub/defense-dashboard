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
import { Search, Globe, TrendingUp, DollarSign } from "lucide-react";
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
  LineChart,
  Line
} from "recharts";

const REGIONS = [
  { value: "all", label: "All Regions" },
  { value: "North America", label: "North America" },
  { value: "Europe", label: "Europe" },
  { value: "Asia-Pacific", label: "Asia-Pacific" },
  { value: "Middle East", label: "Middle East" },
  { value: "South America", label: "South America" },
];

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EC4899', '#8B5CF6', '#06B6D4', '#EF4444', '#84CC16'];

export default function Expenditures() {
  const [expenditures, setExpenditures] = useState([]);
  const [filteredExpenditures, setFilteredExpenditures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");

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
    let filtered = expenditures;
    
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
    
    setFilteredExpenditures(filtered);
  }, [searchTerm, selectedRegion, expenditures]);

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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div data-testid="expenditures-page" className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="font-heading text-3xl font-bold text-white tracking-tight">
          Defense Expenditures
        </h1>
        <p className="text-zinc-500 text-sm mt-1">Global Military Spending by Country</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-zinc-950 border-zinc-800 p-4">
          <p className="text-xs font-mono uppercase tracking-wider text-zinc-500">TOTAL SPENDING</p>
          <p className="text-2xl font-mono font-medium text-white mt-2">${totalExpenditure.toFixed(0)}B</p>
        </Card>
        <Card className="bg-zinc-950 border-zinc-800 p-4">
          <p className="text-xs font-mono uppercase tracking-wider text-zinc-500">COUNTRIES</p>
          <p className="text-2xl font-mono font-medium text-white mt-2">{filteredExpenditures.length}</p>
        </Card>
        <Card className="bg-zinc-950 border-zinc-800 p-4">
          <p className="text-xs font-mono uppercase tracking-wider text-zinc-500">AVG % OF GDP</p>
          <p className="text-2xl font-mono font-medium text-white mt-2">{avgGdpPercent}%</p>
        </Card>
        <Card className="bg-zinc-950 border-zinc-800 p-4">
          <p className="text-xs font-mono uppercase tracking-wider text-zinc-500">FISCAL YEAR</p>
          <p className="text-2xl font-mono font-medium text-white mt-2">2024</p>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Countries Bar Chart */}
        <Card className="bg-zinc-950 border-zinc-800">
          <CardHeader className="border-b border-zinc-800 pb-4">
            <CardTitle className="font-heading text-lg text-white">Top Spending Countries</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-[300px]" data-testid="top-countries-chart">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topCountries} layout="vertical">
                  <XAxis 
                    type="number" 
                    tick={{ fill: '#71717A', fontSize: 11 }} 
                    axisLine={false} 
                    tickLine={false}
                    tickFormatter={(v) => `$${v}B`}
                  />
                  <YAxis 
                    type="category" 
                    dataKey="country_code" 
                    tick={{ fill: '#A1A1AA', fontSize: 11 }} 
                    axisLine={false} 
                    tickLine={false}
                    width={35}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-sm">
                            <p className="text-white text-sm font-medium">{data.country}</p>
                            <p className="text-blue-500 font-mono">${data.expenditure}B</p>
                            <p className="text-zinc-500 text-xs">{data.gdp_percent}% of GDP</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="expenditure" fill="#3B82F6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Regional Distribution */}
        <Card className="bg-zinc-950 border-zinc-800">
          <CardHeader className="border-b border-zinc-800 pb-4">
            <CardTitle className="font-heading text-lg text-white">Regional Distribution</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-[200px]" data-testid="regional-pie-chart">
              <ResponsiveContainer width="100%" height="100%">
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
                          <div className="bg-zinc-900 border border-zinc-800 p-2 rounded-sm">
                            <p className="text-white text-sm">{payload[0].name}</p>
                            <p className="font-mono text-blue-500">${payload[0].value.toFixed(1)}B</p>
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
                    <span className="text-zinc-400">{region.name}</span>
                  </div>
                  <span className="font-mono text-white">${region.value.toFixed(1)}B</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <Input
            placeholder="Search by country..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600"
            data-testid="search-expenditures"
          />
        </div>
        <Select value={selectedRegion} onValueChange={setSelectedRegion}>
          <SelectTrigger className="w-full sm:w-48 bg-zinc-900 border-zinc-800 text-white" data-testid="region-filter">
            <SelectValue placeholder="Region" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-900 border-zinc-800">
            {REGIONS.map(r => (
              <SelectItem key={r.value} value={r.value} className="text-white focus:bg-zinc-800">
                {r.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Data Table */}
      <Card className="bg-zinc-950 border-zinc-800">
        <CardContent className="p-0">
          <div className="overflow-x-auto" data-testid="expenditures-table">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left text-xs font-mono uppercase tracking-wider text-zinc-500 p-4">Country</th>
                  <th className="text-left text-xs font-mono uppercase tracking-wider text-zinc-500 p-4">Code</th>
                  <th className="text-left text-xs font-mono uppercase tracking-wider text-zinc-500 p-4">Region</th>
                  <th className="text-right text-xs font-mono uppercase tracking-wider text-zinc-500 p-4">Expenditure</th>
                  <th className="text-right text-xs font-mono uppercase tracking-wider text-zinc-500 p-4">% of GDP</th>
                  <th className="text-right text-xs font-mono uppercase tracking-wider text-zinc-500 p-4">Year</th>
                </tr>
              </thead>
              <tbody>
                {filteredExpenditures.map((exp) => (
                  <tr 
                    key={exp.id} 
                    className="border-b border-zinc-800/50 hover:bg-zinc-900/50 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-zinc-800 rounded-sm flex items-center justify-center">
                          <Globe className="w-4 h-4 text-zinc-400" />
                        </div>
                        <span className="text-white font-medium text-sm">{exp.country}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="font-mono text-sm text-blue-400">{exp.country_code}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-zinc-400">{exp.region}</span>
                    </td>
                    <td className="p-4 text-right">
                      <span className="font-mono text-sm text-white">${exp.expenditure}B</span>
                    </td>
                    <td className="p-4 text-right">
                      <span className={`font-mono text-sm ${
                        exp.gdp_percent >= 3 ? 'text-amber-500' : 
                        exp.gdp_percent >= 2 ? 'text-green-500' : 'text-zinc-400'
                      }`}>
                        {exp.gdp_percent}%
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <span className="font-mono text-sm text-zinc-500">{exp.year}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
