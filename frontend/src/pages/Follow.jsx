import { useEffect, useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Twitter, 
  Linkedin, 
  Heart, 
  MessageCircle, 
  Repeat2, 
  Share, 
  ExternalLink,
  Building2,
  Shield,
  Newspaper,
  User,
  TrendingUp,
  Clock,
  CheckCircle2
} from "lucide-react";

// Mock data for social posts - Replace with real API integration
const MOCK_TWITTER_POSTS = [
  {
    id: "tw1",
    platform: "twitter",
    author: {
      name: "U.S. Department of Defense",
      handle: "@DeptofDefense",
      avatar: null,
      verified: true,
      type: "institutional"
    },
    content: "The @usaborforce has successfully completed the first test flight of the Next Generation Air Dominance (NGAD) platform. This marks a significant milestone in maintaining air superiority for decades to come. #NGAD #AirForce",
    timestamp: "2h",
    likes: 4520,
    retweets: 1823,
    replies: 342,
    url: "https://twitter.com/DeptofDefense"
  },
  {
    id: "tw2",
    platform: "twitter",
    author: {
      name: "Lockheed Martin",
      handle: "@LockheedMartin",
      avatar: null,
      verified: true,
      type: "company"
    },
    content: "Breaking: We've been awarded a $2.5B contract for 48 F-35 Lightning II aircraft for our international partners. This investment strengthens global security and interoperability. Full details: lmt.co/f35contract",
    timestamp: "4h",
    likes: 2891,
    retweets: 1205,
    replies: 187,
    url: "https://twitter.com/LockheedMartin"
  },
  {
    id: "tw3",
    platform: "twitter",
    author: {
      name: "NATO",
      handle: "@NATO",
      avatar: null,
      verified: true,
      type: "institutional"
    },
    content: "🇪🇺 European allies commit to 2.5% GDP defense spending target by 2028. This historic agreement ensures collective security and burden-sharing across the Alliance. Read the full communiqué: nato.int/2024summit",
    timestamp: "6h",
    likes: 8934,
    retweets: 4521,
    replies: 892,
    url: "https://twitter.com/NATO"
  },
  {
    id: "tw4",
    platform: "twitter",
    author: {
      name: "Defense News",
      handle: "@Defense_News",
      avatar: null,
      verified: true,
      type: "media"
    },
    content: "EXCLUSIVE: Rheinmetall announces €3.2B expansion of ammunition production capacity. CEO says move is 'essential for European security.' Full analysis and implications for NATO supply chains ⬇️",
    timestamp: "8h",
    likes: 1456,
    retweets: 723,
    replies: 98,
    url: "https://twitter.com/Defense_News"
  },
  {
    id: "tw5",
    platform: "twitter",
    author: {
      name: "BAE Systems",
      handle: "@BAaborSystems",
      avatar: null,
      verified: true,
      type: "company"
    },
    content: "Our Type 26 frigate program reaches new milestone with the launch of HMS Birmingham. The most advanced anti-submarine warfare vessel ever built for the Royal Navy. 🚢 #Type26 #RoyalNavy",
    timestamp: "12h",
    likes: 3210,
    retweets: 1102,
    replies: 234,
    url: "https://twitter.com/BAESystems"
  },
  {
    id: "tw6",
    platform: "twitter",
    author: {
      name: "Dr. Mark Cancian",
      handle: "@MarkCancian",
      avatar: null,
      verified: true,
      type: "analyst"
    },
    content: "Thread 🧵 on the implications of the latest DoD budget request: 1/ The $886B request prioritizes Pacific deterrence, but industrial base constraints remain the elephant in the room...",
    timestamp: "1d",
    likes: 892,
    retweets: 456,
    replies: 67,
    url: "https://twitter.com/MarkCancian"
  }
];

const MOCK_LINKEDIN_POSTS = [
  {
    id: "li1",
    platform: "linkedin",
    author: {
      name: "Thales Group",
      handle: "thaborles",
      avatar: null,
      verified: true,
      type: "company"
    },
    content: "🚀 Thales unveils next-generation radar system for European air defense. Our Ground Fire 300 represents a quantum leap in detection capabilities, offering 360° surveillance with unprecedented range and precision. This technology will be the cornerstone of European IAMD for the next 30 years.",
    timestamp: "3h",
    likes: 2341,
    comments: 89,
    shares: 234,
    url: "https://linkedin.com/company/thales"
  },
  {
    id: "li2",
    platform: "linkedin",
    author: {
      name: "Leonardo DRS",
      handle: "leonardodrs",
      avatar: null,
      verified: true,
      type: "company"
    },
    content: "Excited to announce our partnership with @US Army on the Next Generation Combat Vehicle program. Our advanced sensor suite will provide unprecedented situational awareness for armored formations. #Defense #Innovation #NGCV",
    timestamp: "5h",
    likes: 1567,
    comments: 45,
    shares: 167,
    url: "https://linkedin.com/company/leonardo-drs"
  },
  {
    id: "li3",
    platform: "linkedin",
    author: {
      name: "French Ministry of Armed Forces",
      handle: "armaborefr",
      avatar: null,
      verified: true,
      type: "institutional"
    },
    content: "🇫🇷 La France renforce sa coopération avec l'Allemagne sur le SCAF (Système de Combat Aérien du Futur). Cette étape majeure consolide l'autonomie stratégique européenne. Le démonstrateur volera en 2029.",
    timestamp: "8h",
    likes: 4521,
    comments: 234,
    shares: 567,
    url: "https://linkedin.com/company/ministere-des-armees"
  },
  {
    id: "li4",
    platform: "linkedin",
    author: {
      name: "Jane's by S&P Global",
      handle: "janes",
      avatar: null,
      verified: true,
      type: "media"
    },
    content: "📊 NEW REPORT: Global Defense Market Outlook 2024-2034. Key findings:\n• 4.2% CAGR projected\n• Asia-Pacific fastest growing region\n• Unmanned systems: 12% annual growth\n• Cyber & space: Critical investment areas\n\nDownload the executive summary →",
    timestamp: "1d",
    likes: 3892,
    comments: 156,
    shares: 892,
    url: "https://linkedin.com/company/janes"
  },
  {
    id: "li5",
    platform: "linkedin",
    author: {
      name: "Raytheon",
      handle: "raytheon",
      avatar: null,
      verified: true,
      type: "company"
    },
    content: "Our Patriot PAC-3 system has achieved a remarkable 95% intercept rate in recent operational deployments. This success validates decades of continuous improvement and our commitment to protecting warfighters and civilians alike.",
    timestamp: "2d",
    likes: 5672,
    comments: 298,
    shares: 1023,
    url: "https://linkedin.com/company/raytheon"
  }
];

const ACCOUNT_TYPES = [
  { value: "all", label: "All Sources" },
  { value: "institutional", label: "Institutional" },
  { value: "company", label: "Companies" },
  { value: "analyst", label: "Analysts" },
  { value: "media", label: "Media" },
];

export default function Follow() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [accountType, setAccountType] = useState("all");
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    // Combine and sort posts by recency
    const combined = [...MOCK_TWITTER_POSTS, ...MOCK_LINKEDIN_POSTS].sort(() => Math.random() - 0.5);
    setAllPosts(combined);
  }, []);

  const filterPosts = (posts) => {
    let filtered = posts;

    if (activeTab !== "all") {
      filtered = filtered.filter(p => p.platform === activeTab);
    }

    if (accountType !== "all") {
      filtered = filtered.filter(p => p.author.type === accountType);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(p =>
        p.content.toLowerCase().includes(term) ||
        p.author.name.toLowerCase().includes(term) ||
        p.author.handle.toLowerCase().includes(term)
      );
    }

    return filtered;
  };

  const filteredPosts = filterPosts(allPosts);

  const getTypeIcon = (type) => {
    switch (type) {
      case "institutional": return Shield;
      case "company": return Building2;
      case "analyst": return User;
      case "media": return Newspaper;
      default: return User;
    }
  };

  const getTypeStyle = (type) => {
    switch (type) {
      case "institutional": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "company": return "bg-green-500/10 text-green-500 border-green-500/20";
      case "analyst": return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      case "media": return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      default: return "bg-zinc-800 text-zinc-400 border-zinc-700";
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num;
  };

  return (
    <div data-testid="follow-page" className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="font-heading text-3xl font-bold text-white tracking-tight">
          Defense Intel Feed
        </h1>
        <p className="text-zinc-500 text-sm mt-1">Latest posts from defense industry leaders, institutions & analysts</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-zinc-950 border-zinc-800 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#1DA1F2]/10 rounded-sm flex items-center justify-center">
              <Twitter className="w-5 h-5 text-[#1DA1F2]" />
            </div>
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-zinc-500">X POSTS</p>
              <p className="text-xl font-mono font-medium text-white">{MOCK_TWITTER_POSTS.length}</p>
            </div>
          </div>
        </Card>
        <Card className="bg-zinc-950 border-zinc-800 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#0A66C2]/10 rounded-sm flex items-center justify-center">
              <Linkedin className="w-5 h-5 text-[#0A66C2]" />
            </div>
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-zinc-500">LINKEDIN</p>
              <p className="text-xl font-mono font-medium text-white">{MOCK_LINKEDIN_POSTS.length}</p>
            </div>
          </div>
        </Card>
        <Card className="bg-zinc-950 border-zinc-800 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-zinc-800 rounded-sm flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-zinc-500">TRENDING</p>
              <p className="text-xl font-mono font-medium text-white">12</p>
            </div>
          </div>
        </Card>
        <Card className="bg-zinc-950 border-zinc-800 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-zinc-800 rounded-sm flex items-center justify-center">
              <Clock className="w-5 h-5 text-zinc-400" />
            </div>
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-zinc-500">UPDATED</p>
              <p className="text-xl font-mono font-medium text-white">Now</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <Input
            placeholder="Search posts, accounts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600"
            data-testid="search-posts"
          />
        </div>
        <Select value={accountType} onValueChange={setAccountType}>
          <SelectTrigger className="w-full sm:w-48 bg-zinc-900 border-zinc-800 text-white" data-testid="account-type-filter">
            <SelectValue placeholder="Source Type" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-900 border-zinc-800">
            {ACCOUNT_TYPES.map(type => (
              <SelectItem key={type.value} value={type.value} className="text-white focus:bg-zinc-800">
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Platform Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-zinc-900 border border-zinc-800 p-1">
          <TabsTrigger value="all" className="data-[state=active]:bg-zinc-800">
            All Platforms
          </TabsTrigger>
          <TabsTrigger value="twitter" className="data-[state=active]:bg-zinc-800">
            <Twitter className="w-4 h-4 mr-2" />
            X / Twitter
          </TabsTrigger>
          <TabsTrigger value="linkedin" className="data-[state=active]:bg-zinc-800">
            <Linkedin className="w-4 h-4 mr-2" />
            LinkedIn
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <div className="grid lg:grid-cols-2 gap-4" data-testid="posts-feed">
            {filteredPosts.map((post) => {
              const TypeIcon = getTypeIcon(post.author.type);
              return (
                <Card 
                  key={post.id}
                  className="bg-zinc-950 border-zinc-800 hover:border-zinc-700 transition-colors"
                  data-testid={`post-${post.id}`}
                >
                  <CardContent className="p-5">
                    {/* Author Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          post.platform === "twitter" ? "bg-[#1DA1F2]/10" : "bg-[#0A66C2]/10"
                        }`}>
                          {post.platform === "twitter" ? (
                            <Twitter className="w-6 h-6 text-[#1DA1F2]" />
                          ) : (
                            <Linkedin className="w-6 h-6 text-[#0A66C2]" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-white font-medium text-sm">{post.author.name}</span>
                            {post.author.verified && (
                              <CheckCircle2 className="w-4 h-4 text-blue-500" />
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-zinc-500 text-xs">@{post.author.handle}</span>
                            <span className="text-zinc-600 text-xs">• {post.timestamp}</span>
                          </div>
                        </div>
                      </div>
                      <span className={`text-xs font-mono px-2 py-0.5 rounded-full border ${getTypeStyle(post.author.type)}`}>
                        {post.author.type.toUpperCase()}
                      </span>
                    </div>

                    {/* Content */}
                    <p className="text-zinc-300 text-sm leading-relaxed mb-4">
                      {post.content}
                    </p>

                    {/* Engagement Stats */}
                    <div className="flex items-center justify-between pt-3 border-t border-zinc-800">
                      <div className="flex items-center gap-4">
                        {post.platform === "twitter" ? (
                          <>
                            <button className="flex items-center gap-1.5 text-zinc-500 hover:text-red-500 transition-colors">
                              <Heart className="w-4 h-4" />
                              <span className="text-xs font-mono">{formatNumber(post.likes)}</span>
                            </button>
                            <button className="flex items-center gap-1.5 text-zinc-500 hover:text-green-500 transition-colors">
                              <Repeat2 className="w-4 h-4" />
                              <span className="text-xs font-mono">{formatNumber(post.retweets)}</span>
                            </button>
                            <button className="flex items-center gap-1.5 text-zinc-500 hover:text-blue-500 transition-colors">
                              <MessageCircle className="w-4 h-4" />
                              <span className="text-xs font-mono">{formatNumber(post.replies)}</span>
                            </button>
                          </>
                        ) : (
                          <>
                            <button className="flex items-center gap-1.5 text-zinc-500 hover:text-blue-500 transition-colors">
                              <Heart className="w-4 h-4" />
                              <span className="text-xs font-mono">{formatNumber(post.likes)}</span>
                            </button>
                            <button className="flex items-center gap-1.5 text-zinc-500 hover:text-blue-500 transition-colors">
                              <MessageCircle className="w-4 h-4" />
                              <span className="text-xs font-mono">{formatNumber(post.comments)}</span>
                            </button>
                            <button className="flex items-center gap-1.5 text-zinc-500 hover:text-blue-500 transition-colors">
                              <Share className="w-4 h-4" />
                              <span className="text-xs font-mono">{formatNumber(post.shares)}</span>
                            </button>
                          </>
                        )}
                      </div>
                      <a 
                        href={post.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-zinc-500 hover:text-white transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12 text-zinc-500">
              No posts found matching your criteria
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* API Notice */}
      <Card className="bg-amber-500/5 border-amber-500/20">
        <CardContent className="p-4 flex items-start gap-3">
          <div className="w-8 h-8 bg-amber-500/10 rounded-sm flex items-center justify-center flex-shrink-0">
            <Shield className="w-4 h-4 text-amber-500" />
          </div>
          <div>
            <p className="text-amber-500 text-sm font-medium">Demo Mode</p>
            <p className="text-zinc-400 text-xs mt-1">
              Currently showing sample data. Connect your Twitter/X API keys in the Admin panel to enable real-time feeds from defense industry accounts.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
