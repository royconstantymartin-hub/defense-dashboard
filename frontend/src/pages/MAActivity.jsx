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
import { Search, ArrowRight, DollarSign, Calendar, Building2 } from "lucide-react";
import { format } from "date-fns";

const STATUS_OPTIONS = [
  { value: "all", label: "All Status" },
  { value: "announced", label: "Announced" },
  { value: "pending", label: "Pending" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

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
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'pending':
        return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'announced':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'cancelled':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      default:
        return 'bg-zinc-800 text-zinc-400 border-zinc-700';
    }
  };

  const totalDealValue = filteredActivities.reduce((sum, a) => sum + a.deal_value, 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div data-testid="ma-activity-page" className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="font-heading text-3xl font-bold text-white tracking-tight">
          M&A Activity
        </h1>
        <p className="text-zinc-500 text-sm mt-1">Mergers, Acquisitions & Strategic Deals</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-zinc-950 border-zinc-800 p-4">
          <p className="text-xs font-mono uppercase tracking-wider text-zinc-500">TOTAL DEALS</p>
          <p className="text-2xl font-mono font-medium text-white mt-2">{filteredActivities.length}</p>
        </Card>
        <Card className="bg-zinc-950 border-zinc-800 p-4">
          <p className="text-xs font-mono uppercase tracking-wider text-zinc-500">TOTAL VALUE</p>
          <p className="text-2xl font-mono font-medium text-white mt-2">${(totalDealValue / 1000).toFixed(1)}B</p>
        </Card>
        <Card className="bg-zinc-950 border-zinc-800 p-4">
          <p className="text-xs font-mono uppercase tracking-wider text-zinc-500">PENDING</p>
          <p className="text-2xl font-mono font-medium text-amber-500 mt-2">
            {activities.filter(a => a.status === 'pending').length}
          </p>
        </Card>
        <Card className="bg-zinc-950 border-zinc-800 p-4">
          <p className="text-xs font-mono uppercase tracking-wider text-zinc-500">COMPLETED</p>
          <p className="text-2xl font-mono font-medium text-green-500 mt-2">
            {activities.filter(a => a.status === 'completed').length}
          </p>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <Input
            placeholder="Search by company name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600"
            data-testid="search-ma"
          />
        </div>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-full sm:w-48 bg-zinc-900 border-zinc-800 text-white" data-testid="status-filter">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-900 border-zinc-800">
            {STATUS_OPTIONS.map(opt => (
              <SelectItem key={opt.value} value={opt.value} className="text-white focus:bg-zinc-800">
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Activities List */}
      <div className="space-y-4" data-testid="ma-activities-list">
        {filteredActivities.map((activity) => (
          <Card 
            key={activity.id} 
            className="bg-zinc-950 border-zinc-800 hover:border-zinc-700 transition-colors"
            data-testid={`ma-item-${activity.id}`}
          >
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                {/* Companies */}
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-zinc-800 rounded-sm flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-zinc-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{activity.acquirer}</p>
                      <p className="text-xs text-zinc-500 font-mono">ACQUIRER</p>
                    </div>
                  </div>
                  
                  <div className="w-12 flex justify-center">
                    <ArrowRight className="w-5 h-5 text-blue-500" />
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-zinc-800 rounded-sm flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-zinc-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{activity.target}</p>
                      <p className="text-xs text-zinc-500 font-mono">TARGET</p>
                    </div>
                  </div>
                </div>

                {/* Deal Info */}
                <div className="flex flex-wrap items-center gap-6">
                  <div className="text-center">
                    <p className="text-xs font-mono uppercase tracking-wider text-zinc-500">DEAL VALUE</p>
                    <p className="text-xl font-mono font-medium text-white mt-1">
                      ${activity.deal_value >= 1000 
                        ? `${(activity.deal_value / 1000).toFixed(1)}B` 
                        : `${activity.deal_value}M`
                      }
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-xs font-mono uppercase tracking-wider text-zinc-500">TYPE</p>
                    <p className="text-sm text-zinc-300 mt-1 capitalize">{activity.deal_type.replace('_', ' ')}</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-xs font-mono uppercase tracking-wider text-zinc-500">DATE</p>
                    <p className="text-sm text-zinc-300 mt-1">
                      {format(new Date(activity.announced_date), 'MMM yyyy')}
                    </p>
                  </div>
                  
                  <span className={`text-xs font-mono px-3 py-1 rounded-full border ${getStatusStyle(activity.status)}`}>
                    {activity.status.toUpperCase()}
                  </span>
                </div>
              </div>
              
              <p className="text-zinc-400 text-sm mt-4 border-t border-zinc-800 pt-4">
                {activity.description}
              </p>
            </CardContent>
          </Card>
        ))}
        
        {filteredActivities.length === 0 && (
          <div className="text-center py-12 text-zinc-500">
            No M&A activities found
          </div>
        )}
      </div>
    </div>
  );
}
