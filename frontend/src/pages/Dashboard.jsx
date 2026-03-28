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
  Globe,
  ArrowRight,
  Clock,
  Database
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

const COLORS = ['#7E22CE', '#A855F7', '#10B981', '#F59E0B', '#3B82F6', '#06B6D4', '#EC4899'];

// Country code mapping for flags
const COUNTRY_FLAGS = {
  "USA": "us", "UK": "gb", "France": "fr", "Germany": "de", "Italy": "it",
  "EU": "eu", "Spain": "es", "Sweden": "se", "Norway": "no", "Israel": "il",
  "Japan": "jp", "South Korea": "kr", "India": "in", "Australia": "au",
  "Brazil": "br", "Canada": "ca", "Turkey": "tr", "UAE": "ae", "Singapore": "sg",
  "China": "cn", "Russia": "ru", "Poland": "pl", "Czech Republic": "cz",
  "Switzerland": "ch", "Netherlands": "nl", "Belgium": "be", "Finland": "fi",
  "South Africa": "za", "Saudi Arabia": "sa", "United States": "us",
  "United Kingdom": "gb"
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
};

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [players, setPlayers] = useState([]);
  const [recentNews, setRecentNews] = useState([]);
  const [expenditures, setExpenditures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, playersRes, newsRes, expendituresRes] = await Promise.all([
          axios.get(`${API}/dashboard/stats`),
          axios.get(`${API}/defense-players`),
          axios.get(`${API}/news?limit=5`),
          axios.get(`${API}/expenditures?year=2024`)
        ]);
        setStats(statsRes.data);
        setPlayers(playersRes.data);
        setRecentNews(newsRes.data);
        setExpenditures(expendituresRes.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getFlag = (country) => {
    const code = COUNTRY_FLAGS[country];
    return code ? `https://flagcdn.com/w40/${code}.png` : null;
  };

  const getLogo = (companyName) => {
    const domain = COMPANY_LOGOS[companyName];
    return domain ? `https://logo.clearbit.com/${domain}` : null;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full" />
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
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-slate-900 tracking-tight">
            Mission Control
          </h1>
          <p className="text-slate-500 text-sm mt-1">Global Defense Intelligence Overview</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 bg-white border border-slate-200 rounded-lg px-3 py-2">
          <Clock className="w-3.5 h-3.5" />
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
          <span className="text-slate-300">|</span>
          <Database className="w-3.5 h-3.5" />
          <span>Source: Multiple</span>
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
        <Card className="lg:col-span-2 bg-white border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-100 pb-4 bg-slate-50/50">
            <div className="flex items-center justify-between">
              <CardTitle className="font-heading text-lg text-slate-900">Market Leaders</CardTitle>
              <Link 
                to="/market-data" 
                className="text-xs text-purple-600 hover:text-purple-700 flex items-center gap-1 font-medium"
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
                  <tr className="border-b border-slate-100 bg-slate-50/30">
                    <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 p-4">Company</th>
                    <th className="text-right text-xs font-semibold uppercase tracking-wider text-slate-500 p-4">Ticker</th>
                    <th className="text-right text-xs font-semibold uppercase tracking-wider text-slate-500 p-4">Market Cap</th>
                    <th className="text-right text-xs font-semibold uppercase tracking-wider text-slate-500 p-4">Change</th>
                  </tr>
                </thead>
                <tbody>
                  {topPlayers.map((player, idx) => {
                    const logoUrl = getLogo(player.name);
                    const flagUrl = getFlag(player.country);
                    return (
                      <tr key={player.id} className="border-b border-slate-100 hover:bg-purple-50/30 transition-colors">
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
                        <td className="p-4 text-right">
                          <span className="font-mono text-sm text-purple-700 font-medium bg-purple-50 px-2 py-0.5 rounded">
                            {player.ticker}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <span className="font-mono text-sm text-slate-900 font-semibold">${player.market_cap}B</span>
                        </td>
                        <td className="p-4 text-right">
                          <span className={`font-mono text-sm flex items-center justify-end gap-1 ${
                            player.change_percent >= 0 ? 'text-emerald-600' : 'text-rose-600'
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
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Regional Distribution */}
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-100 pb-4 bg-slate-50/50">
            <CardTitle className="font-heading text-lg text-slate-900">Regional Spending</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-[200px]" data-testid="regional-chart">
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
                            <p className="text-slate-900 text-sm font-medium">{payload[0].name}</p>
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
              {regionData.slice(0, 4).map((region, idx) => (
                <div key={region.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span 
                      className="w-2 h-2 rounded-full" 
                      style={{ backgroundColor: COLORS[idx] }}
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

      {/* Bottom Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Expenditures Chart */}
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-100 pb-4 bg-slate-50/50">
            <div className="flex items-center justify-between">
              <CardTitle className="font-heading text-lg text-slate-900">Top Defense Budgets</CardTitle>
              <Link 
                to="/expenditures" 
                className="text-xs text-purple-600 hover:text-purple-700 flex items-center gap-1 font-medium"
              >
                View All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-[250px]" data-testid="expenditure-chart">
              <ResponsiveContainer width="100%" height="100%" minWidth={200}>
                <BarChart data={topExpenditures} layout="vertical">
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
                        return (
                          <div className="bg-white border border-slate-200 p-3 rounded-lg shadow-lg">
                            <p className="text-slate-900 text-sm font-medium">{payload[0].payload.country}</p>
                            <p className="font-mono text-purple-700 font-semibold">${payload[0].value}B</p>
                            <p className="text-xs text-slate-500">{payload[0].payload.gdp_percent}% of GDP</p>
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

        {/* Recent Intel */}
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-100 pb-4 bg-slate-50/50">
            <div className="flex items-center justify-between">
              <CardTitle className="font-heading text-lg text-slate-900">Recent Intel</CardTitle>
              <Link
                to="/news"
                className="text-xs text-purple-600 hover:text-purple-700 flex items-center gap-1 font-medium"
              >
                View All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100" data-testid="recent-announcements">
              {recentNews.map((item, idx) => (
                <a
                  key={item.url || idx}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 hover:bg-purple-50/30 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Newspaper className="w-4 h-4 text-purple-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-slate-900 text-sm font-medium line-clamp-2">{item.title}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${
                          item.category === 'CONTRACT'    ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                          item.category === 'TECHNOLOGY'  ? 'bg-purple-50  text-purple-700  border-purple-200' :
                          item.category === 'CONFLICT'    ? 'bg-red-50     text-red-700     border-red-200'    :
                          item.category === 'POLICY'      ? 'bg-amber-50   text-amber-700   border-amber-200'  :
                          item.category === 'GEOPOLITICS' ? 'bg-sky-50     text-sky-700     border-sky-200'    :
                          item.category === 'M&A'         ? 'bg-blue-50    text-blue-700    border-blue-200'   :
                          'bg-slate-50 text-slate-600 border-slate-200'
                        }`}>
                          {item.category || 'INDUSTRY'}
                        </span>
                        <span className="text-xs text-slate-500">{item.source}</span>
                        {item.source_count > 1 && (
                          <span className="text-xs text-orange-500 font-medium">🔥 {item.source_count} sources</span>
                        )}
                      </div>
                    </div>
                  </div>
                </a>
              ))}
              {recentNews.length === 0 && (
                <div className="p-8 text-center text-slate-500">
                  No recent news
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
    <Card 
      className="bg-white border-slate-200 shadow-sm hover:shadow-lg hover:border-purple-200 transition-all duration-300"
      data-testid={testId}
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">{label}</p>
            <p className="text-2xl font-mono font-bold text-slate-900 mt-2">{value}</p>
            {subtext && <p className="text-xs text-slate-500 mt-1">{subtext}</p>}
            {trend && (
              <p className={`text-xs font-mono mt-2 flex items-center gap-1 ${
                positive ? 'text-emerald-600' : 'text-rose-600'
              }`}>
                {positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {trend}
              </p>
            )}
          </div>
          <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
            <Icon className="w-5 h-5 text-purple-600" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
