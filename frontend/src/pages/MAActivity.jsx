import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "@/App";
import { FALLBACK_API_DATA } from "@/data/fallbackApiData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, ArrowRight, DollarSign, Calendar, Building2, Clock, Database, Filter, TrendingUp } from "lucide-react";
import { format } from "date-fns";

const STATUS_OPTIONS = [
  { value: "all", label: "All Status" },
  { value: "announced", label: "Announced" },
  { value: "pending", label: "Pending" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

// Company logo domains
const COMPANY_LOGOS = {
  "Lockheed Martin": "lockheedmartin.com",
  "Raytheon Technologies": "rtx.com",
  "L3Harris": "l3harris.com",
  "Northrop Grumman": "northropgrumman.com",
  "General Dynamics": "gd.com",
  "BAE Systems": "baesystems.com",
  "Thales": "thalesgroup.com",
  "Leonardo": "leonardo.com",
  "Airbus": "airbus.com",
  "Rheinmetall": "rheinmetall.com",
  "EDGE Group": "edgegroup.ae",
  "Hanwha": "hanwha.com",
  "RTX": "rtx.com",
  "Safran": "safran-group.com",
  "KNDS": "knds.de",
};

export default function MAActivity() {
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get(`${API}/ma-activities`);
        setActivities(response.data);
        setFilteredActivities(response.data);
      } catch (error) {
        console.error("Error fetching M&A activities:", error);
        setActivities(FALLBACK_API_DATA.ma_activities);
        setFilteredActivities(FALLBACK_API_DATA.ma_activities);

      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
  }, []);

  useEffect(() => {
    let filtered = activities;
    
    if (selectedStatus !== "all") {
      filtered = filtered.filter(a => a.status === selectedStatus);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(a => 
        a.acquirer.toLowerCase().includes(term) || 
        a.target.toLowerCase().includes(term) ||
        a.description.toLowerCase().includes(term)
      );
    }
    
    setFilteredActivities(filtered);
  }, [searchTerm, selectedStatus, activities]);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'announced':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'cancelled':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  const getLogo = (companyName) => {
    const domain = COMPANY_LOGOS[companyName];
    return domain ? `https://logo.clearbit.com/${domain}` : null;
  };

  const totalDealValue = filteredActivities.reduce((sum, a) => sum + a.deal_value, 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div data-testid="ma-activity-page" className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-slate-900 tracking-tight">
            M&A Activity
          </h1>
          <p className="text-slate-500 text-sm mt-1">Mergers, Acquisitions & Strategic Deals</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 bg-white border border-slate-200 rounded-lg px-3 py-2">
          <Clock className="w-3.5 h-3.5" />
          <span>Updated: {new Date().toLocaleDateString()}</span>
          <span className="text-slate-300">|</span>
          <Database className="w-3.5 h-3.5" />
          <span>Bloomberg, Reuters, SEC</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">TOTAL DEALS</p>
            <p className="text-2xl font-mono font-bold text-slate-900 mt-2">{filteredActivities.length}</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">TOTAL VALUE</p>
            <p className="text-2xl font-mono font-bold text-slate-900 mt-2">${(totalDealValue / 1000).toFixed(1)}B</p>
            <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> Record year
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">PENDING</p>
            <p className="text-2xl font-mono font-bold text-amber-600 mt-2">
              {activities.filter(a => a.status === 'pending').length}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">COMPLETED</p>
            <p className="text-2xl font-mono font-bold text-emerald-600 mt-2">
              {activities.filter(a => a.status === 'completed').length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search by company name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400"
            data-testid="search-ma"
          />
        </div>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-full sm:w-48 bg-white border-slate-200 text-slate-700" data-testid="status-filter">
            <Filter className="w-4 h-4 mr-2 text-slate-400" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-white border-slate-200">
            {STATUS_OPTIONS.map(opt => (
              <SelectItem key={opt.value} value={opt.value} className="text-slate-700 focus:bg-purple-50">
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Activities List */}
      <div className="space-y-4" data-testid="ma-activities-list">
        {filteredActivities.map((activity) => {
          const acquirerLogo = getLogo(activity.acquirer);
          const targetLogo = getLogo(activity.target);
          return (
            <Card 
              key={activity.id} 
              className="bg-white border-slate-200 shadow-sm hover:shadow-lg hover:border-purple-200 transition-all duration-300"
              data-testid={`ma-item-${activity.id}`}
            >
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  {/* Companies */}
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex items-center gap-3">
                      {acquirerLogo ? (
                        <img 
                          src={acquirerLogo} 
                          alt={activity.acquirer}
                          className="w-12 h-12 rounded-xl object-contain bg-white border border-slate-100 shadow-sm"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      ) : (
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                          <Building2 className="w-6 h-6 text-purple-600" />
                        </div>
                      )}
                      <div>
                        <p className="text-slate-900 font-medium">{activity.acquirer}</p>
                        <p className="text-xs text-slate-500 font-mono">ACQUIRER</p>
                      </div>
                    </div>
                    
                    <div className="w-12 flex justify-center">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <ArrowRight className="w-5 h-5 text-purple-600" />
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      {targetLogo ? (
                        <img 
                          src={targetLogo} 
                          alt={activity.target}
                          className="w-12 h-12 rounded-xl object-contain bg-white border border-slate-100 shadow-sm"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      ) : (
                        <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                          <Building2 className="w-6 h-6 text-slate-400" />
                        </div>
                      )}
                      <div>
                        <p className="text-slate-900 font-medium">{activity.target}</p>
                        <p className="text-xs text-slate-500 font-mono">TARGET</p>
                      </div>
                    </div>
                  </div>

                  {/* Deal Info */}
                  <div className="flex flex-wrap items-center gap-6">
                    <div className="text-center">
                      <p className="text-xs font-medium uppercase tracking-wider text-slate-500">DEAL VALUE</p>
                      <p className="text-xl font-mono font-bold text-purple-700 mt-1">
                        ${activity.deal_value >= 1000 
                          ? `${(activity.deal_value / 1000).toFixed(1)}B` 
                          : `${activity.deal_value}M`
                        }
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-xs font-medium uppercase tracking-wider text-slate-500">TYPE</p>
                      <p className="text-sm text-slate-700 mt-1 capitalize bg-slate-100 px-2 py-0.5 rounded">
                        {activity.deal_type.replace('_', ' ')}
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-xs font-medium uppercase tracking-wider text-slate-500">DATE</p>
                      <p className="text-sm text-slate-700 mt-1">
                        {format(new Date(activity.announced_date), 'MMM yyyy')}
                      </p>
                    </div>
                    
                    <span className={`text-xs font-medium px-3 py-1.5 rounded-full border ${getStatusStyle(activity.status)}`}>
                      {activity.status.toUpperCase()}
                    </span>
                  </div>
                </div>
                
                <p className="text-slate-500 text-sm mt-4 border-t border-slate-100 pt-4">
                  {activity.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
        
        {filteredActivities.length === 0 && (
          <div className="text-center py-12 text-slate-500 bg-white rounded-lg border border-slate-200">
            No M&A activities found
          </div>
        )}
      </div>
    </div>
  );
}
