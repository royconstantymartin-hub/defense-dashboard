import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "@/App";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Building2, 
  Newspaper, 
  Handshake,
  Package,
  Globe,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EC4899', '#8B5CF6', '#06B6D4', '#EF4444'];

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [players, setPlayers] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [expenditures, setExpenditures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, playersRes, announcementsRes, expendituresRes] = await Promise.all([
          axios.get(`${API}/dashboard/stats`),
          axios.get(`${API}/defense-players`),
          axios.get(`${API}/announcements?limit=5`),
          axios.get(`${API}/expenditures?year=2024`)
        ]);
        setStats(statsRes.data);
        setPlayers(playersRes.data);
        setAnnouncements(announcementsRes.data);
        setExpenditures(expendituresRes.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  const topPlayers = players.slice(0, 5);
  const topExpenditures = expenditures.slice(0, 7);

  const regionData = expenditures.reduce((acc, exp) => {
    const existing = acc.find(r => r.name === exp.region);
    if (existing) {
      existing.value += exp.expenditure;
    } else {
      acc.push({ name: exp.region, value: exp.expenditure });
    }
    return acc;
  }, []).sort((a, b) => b.value - a.value);

  return (
    <div data-testid="dashboard-page" className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-white tracking-tight">
            Mission Control
          </h1>
          <p className="text-zinc-500 text-sm mt-1">Global Defense Intelligence Overview</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="TOTAL MARKET CAP"
          value={`$${(stats?.total_market_cap || 0).toFixed(1)}B`}
          icon={DollarSign}
          trend="+2.4%"
          positive
          testId="metric-market-cap"
        />
        <MetricCard
          label="GLOBAL EXPENDITURE"
          value={`$${(stats?.total_expenditure || 0).toFixed(0)}B`}
          subtext={`FY ${stats?.expenditure_year || 2024}`}
          icon={Globe}
          testId="metric-expenditure"
        />
        <MetricCard
          label="ACTIVE PLAYERS"
          value={stats?.players_count || 0}
          icon={Building2}
          testId="metric-players"
        />
        <MetricCard
          label="M&A ACTIVITIES"
          value={stats?.ma_count || 0}
          icon={Handshake}
          testId="metric-ma"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Market Leaders */}
        <Card className="lg:col-span-2 bg-zinc-950 border-zinc-800">
          <CardHeader className="border-b border-zinc-800 pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="font-heading text-lg text-white">Market Leaders</CardTitle>
              <Link 
                to="/market-data" 
                className="text-xs text-blue-500 hover:text-blue-400 flex items-center gap-1"
                data-testid="view-all-market"
              >
                View All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full" data-testid="market-leaders-table">
                <thead>
                  <tr className="border-b border-zinc-800">
                    <th className="text-left text-xs font-mono uppercase tracking-wider text-zinc-500 p-4">Company</th>
                    <th className="text-right text-xs font-mono uppercase tracking-wider text-zinc-500 p-4">Ticker</th>
                    <th className="text-right text-xs font-mono uppercase tracking-wider text-zinc-500 p-4">Market Cap</th>
                    <th className="text-right text-xs font-mono uppercase tracking-wider text-zinc-500 p-4">Change</th>
                  </tr>
                </thead>
                <tbody>
                  {topPlayers.map((player, idx) => (
                    <tr key={player.id} className="border-b border-zinc-800/50 hover:bg-zinc-900/50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 bg-zinc-800 rounded-sm flex items-center justify-center text-xs font-mono text-zinc-400">
                            {idx + 1}
                          </span>
                          <div>
                            <p className="text-white font-medium text-sm">{player.name}</p>
                            <p className="text-xs text-zinc-500">{player.country}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <span className="font-mono text-sm text-zinc-300">{player.ticker}</span>
                      </td>
                      <td className="p-4 text-right">
                        <span className="font-mono text-sm text-white">${player.market_cap}B</span>
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Regional Distribution */}
        <Card className="bg-zinc-950 border-zinc-800">
          <CardHeader className="border-b border-zinc-800 pb-4">
            <CardTitle className="font-heading text-lg text-white">Regional Spending</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-[200px]" data-testid="regional-chart">
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
              {regionData.slice(0, 4).map((region, idx) => (
                <div key={region.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span 
                      className="w-2 h-2 rounded-full" 
                      style={{ backgroundColor: COLORS[idx] }}
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

      {/* Bottom Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Expenditures Chart */}
        <Card className="bg-zinc-950 border-zinc-800">
          <CardHeader className="border-b border-zinc-800 pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="font-heading text-lg text-white">Top Defense Budgets</CardTitle>
              <Link 
                to="/expenditures" 
                className="text-xs text-blue-500 hover:text-blue-400 flex items-center gap-1"
              >
                View All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-[250px]" data-testid="expenditure-chart">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topExpenditures} layout="vertical">
                  <XAxis type="number" tick={{ fill: '#71717A', fontSize: 11 }} axisLine={false} tickLine={false} />
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
                        return (
                          <div className="bg-zinc-900 border border-zinc-800 p-2 rounded-sm">
                            <p className="text-white text-sm">{payload[0].payload.country}</p>
                            <p className="font-mono text-blue-500">${payload[0].value}B</p>
                            <p className="text-xs text-zinc-500">{payload[0].payload.gdp_percent}% of GDP</p>
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

        {/* Recent Intel */}
        <Card className="bg-zinc-950 border-zinc-800">
          <CardHeader className="border-b border-zinc-800 pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="font-heading text-lg text-white">Recent Intel</CardTitle>
              <Link 
                to="/announcements" 
                className="text-xs text-blue-500 hover:text-blue-400 flex items-center gap-1"
              >
                View All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-zinc-800" data-testid="recent-announcements">
              {announcements.map((item) => (
                <div key={item.id} className="p-4 hover:bg-zinc-900/50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-zinc-800 rounded-sm flex items-center justify-center flex-shrink-0">
                      <Newspaper className="w-4 h-4 text-zinc-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium line-clamp-1">{item.title}</p>
                      <p className="text-zinc-500 text-xs mt-1 line-clamp-2">{item.content}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`text-xs font-mono px-2 py-0.5 rounded-full ${
                          item.category === 'contract' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                          item.category === 'product_launch' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' :
                          item.category === 'regulatory' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
                          'bg-zinc-800 text-zinc-400 border border-zinc-700'
                        }`}>
                          {item.category.replace('_', ' ').toUpperCase()}
                        </span>
                        <span className="text-xs text-zinc-600">{item.source}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {announcements.length === 0 && (
                <div className="p-8 text-center text-zinc-500">
                  No recent announcements
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function MetricCard({ label, value, subtext, icon: Icon, trend, positive, testId }) {
  return (
    <div 
      className="bg-zinc-950 border border-zinc-800 p-4 hover:border-zinc-700 transition-colors"
      data-testid={testId}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-mono uppercase tracking-wider text-zinc-500">{label}</p>
          <p className="text-2xl font-mono font-medium text-white mt-2">{value}</p>
          {subtext && <p className="text-xs text-zinc-500 mt-1">{subtext}</p>}
          {trend && (
            <p className={`text-xs font-mono mt-2 flex items-center gap-1 ${
              positive ? 'text-green-500' : 'text-red-500'
            }`}>
              {positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {trend}
            </p>
          )}
        </div>
        <div className="w-10 h-10 bg-zinc-800 rounded-sm flex items-center justify-center">
          <Icon className="w-5 h-5 text-zinc-400" />
        </div>
      </div>
    </div>
  );
}
