import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "@/App";
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
import { Search, Newspaper, Building2, Calendar, ExternalLink } from "lucide-react";
import { format } from "date-fns";

const CATEGORIES = [
  { value: "all", label: "All Categories" },
  { value: "contract", label: "Contracts" },
  { value: "partnership", label: "Partnerships" },
  { value: "product_launch", label: "Product Launch" },
  { value: "regulatory", label: "Regulatory" },
];

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [filteredAnnouncements, setFilteredAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get(`${API}/announcements`);
        setAnnouncements(response.data);
        setFilteredAnnouncements(response.data);
        if (response.data.length > 0) {
          setSelectedAnnouncement(response.data[0]);
        }
      } catch (error) {
        console.error("Error fetching announcements:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  useEffect(() => {
    let filtered = announcements;
    
    if (selectedCategory !== "all") {
      filtered = filtered.filter(a => a.category === selectedCategory);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(a => 
        a.title.toLowerCase().includes(term) || 
        a.content.toLowerCase().includes(term) ||
        (a.company && a.company.toLowerCase().includes(term))
      );
    }
    
    setFilteredAnnouncements(filtered);
  }, [searchTerm, selectedCategory, announcements]);

  const getCategoryStyle = (category) => {
    switch (category) {
      case 'contract':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'product_launch':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'regulatory':
        return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'partnership':
        return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
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
    <div data-testid="announcements-page" className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="font-heading text-3xl font-bold text-white tracking-tight">
          Announcements
        </h1>
        <p className="text-zinc-500 text-sm mt-1">Defense Industry News & Updates</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <Input
            placeholder="Search announcements..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600"
            data-testid="search-announcements"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-48 bg-zinc-900 border-zinc-800 text-white" data-testid="category-filter">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-900 border-zinc-800">
            {CATEGORIES.map(cat => (
              <SelectItem key={cat.value} value={cat.value} className="text-white focus:bg-zinc-800">
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Master-Detail Layout */}
      <div className="grid lg:grid-cols-5 gap-6">
        {/* List */}
        <div className="lg:col-span-2 space-y-2" data-testid="announcements-list">
          {filteredAnnouncements.map((announcement) => (
            <div
              key={announcement.id}
              onClick={() => setSelectedAnnouncement(announcement)}
              className={`
                p-4 border rounded-sm cursor-pointer transition-all duration-200
                ${selectedAnnouncement?.id === announcement.id 
                  ? 'bg-zinc-900 border-blue-500/50' 
                  : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
                }
              `}
              data-testid={`announcement-item-${announcement.id}`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-sm flex items-center justify-center flex-shrink-0 ${
                  selectedAnnouncement?.id === announcement.id ? 'bg-blue-500/20' : 'bg-zinc-800'
                }`}>
                  <Newspaper className={`w-4 h-4 ${
                    selectedAnnouncement?.id === announcement.id ? 'text-blue-500' : 'text-zinc-400'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium line-clamp-2">{announcement.title}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`text-xs font-mono px-2 py-0.5 rounded-full border ${getCategoryStyle(announcement.category)}`}>
                      {announcement.category.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {filteredAnnouncements.length === 0 && (
            <div className="text-center py-12 text-zinc-500">
              No announcements found
            </div>
          )}
        </div>

        {/* Detail View */}
        <Card className="lg:col-span-3 bg-zinc-950 border-zinc-800" data-testid="announcement-detail">
          {selectedAnnouncement ? (
            <>
              <CardHeader className="border-b border-zinc-800">
                <div className="space-y-3">
                  <span className={`inline-flex text-xs font-mono px-2 py-0.5 rounded-full border ${getCategoryStyle(selectedAnnouncement.category)}`}>
                    {selectedAnnouncement.category.replace('_', ' ').toUpperCase()}
                  </span>
                  <CardTitle className="font-heading text-xl text-white">
                    {selectedAnnouncement.title}
                  </CardTitle>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      {format(new Date(selectedAnnouncement.date), 'MMM dd, yyyy')}
                    </span>
                    {selectedAnnouncement.company && (
                      <span className="flex items-center gap-1.5">
                        <Building2 className="w-4 h-4" />
                        {selectedAnnouncement.company}
                      </span>
                    )}
                    <span className="flex items-center gap-1.5">
                      <ExternalLink className="w-4 h-4" />
                      {selectedAnnouncement.source}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-zinc-300 leading-relaxed">{selectedAnnouncement.content}</p>
              </CardContent>
            </>
          ) : (
            <CardContent className="flex items-center justify-center h-64 text-zinc-500">
              Select an announcement to view details
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}
