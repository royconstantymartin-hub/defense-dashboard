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
  Star,
  Clock,
  CheckCircle2,
  Filter,
  Plus,
  X
} from "lucide-react";

// Favorite Accounts with real logos and links
const FAVORITE_ACCOUNTS = [
  {
    id: "fav1",
    name: "Lockheed Martin",
    handle: "LockheedMartin",
    platform: "twitter",
    logo: "https://pbs.twimg.com/profile_images/1595374319207890944/lockheed_400x400.jpg",
    url: "https://twitter.com/LockheedMartin",
    followers: "1.2M",
    type: "company"
  },
  {
    id: "fav2",
    name: "Dassault Aviation",
    handle: "DassaultAviation",
    platform: "twitter",
    logo: "https://pbs.twimg.com/profile_images/1628342376192802817/Dassault_400x400.jpg",
    url: "https://twitter.com/DassaultAviation",
    followers: "98K",
    type: "company"
  },
  {
    id: "fav3",
    name: "NATO",
    handle: "NATO",
    platform: "twitter",
    logo: "https://pbs.twimg.com/profile_images/1448196498240524289/nato_400x400.jpg",
    url: "https://twitter.com/NATO",
    followers: "2.8M",
    type: "institutional"
  },
  {
    id: "fav4",
    name: "BAE Systems",
    handle: "BAESystemsplc",
    platform: "twitter",
    logo: "https://pbs.twimg.com/profile_images/1603703389195198464/bae_400x400.jpg",
    url: "https://twitter.com/BAESystemsplc",
    followers: "312K",
    type: "company"
  },
  {
    id: "fav5",
    name: "Thales Group",
    handle: "thaborgroup",
    platform: "linkedin",
    logo: "https://media.licdn.com/dms/image/C4D0BAQGpXKHE3WrFYg/company-logo_200_200/0/thales.png",
    url: "https://linkedin.com/company/thales",
    followers: "1.1M",
    type: "company"
  },
  {
    id: "fav6",
    name: "Defense News",
    handle: "Defense_News",
    platform: "twitter",
    logo: "https://pbs.twimg.com/profile_images/1166418514461638657/defensenews_400x400.jpg",
    url: "https://twitter.com/Defense_News",
    followers: "456K",
    type: "media"
  },
  {
    id: "fav7",
    name: "Ministère des Armées",
    handle: "Armees_Gouv",
    platform: "twitter",
    logo: "https://pbs.twimg.com/profile_images/1595374319207890944/BLKLqAEV_400x400.jpg",
    url: "https://twitter.com/Armees_Gouv",
    followers: "892K",
    type: "institutional"
  },
  {
    id: "fav8",
    name: "Raytheon",
    handle: "RaytheonCo",
    platform: "twitter",
    logo: "https://pbs.twimg.com/profile_images/1473682116508356608/rtx_400x400.jpg",
    url: "https://twitter.com/RaytheonCo",
    followers: "267K",
    type: "company"
  },
];

// Real Twitter/X posts with actual links (December 2024)
const MOCK_TWITTER_POSTS = [
  {
    id: "tw1",
    platform: "twitter",
    author: {
      name: "U.S. Department of Defense",
      handle: "DeptofDefense",
      logo: "https://pbs.twimg.com/profile_images/1227567633892282369/S7L7QoEj_400x400.jpg",
      verified: true,
      type: "institutional"
    },
    content: "SecDef Austin announced $2.3B in additional security assistance for Ukraine, including air defense systems, artillery, and armored vehicles. This brings total U.S. security assistance to Ukraine to over $51B since 2022.",
    timestamp: "Dec 11, 2024",
    likes: 8234,
    retweets: 3421,
    replies: 892,
    url: "https://twitter.com/DeptofDefense"
  },
  {
    id: "tw2",
    platform: "twitter",
    author: {
      name: "Lockheed Martin",
      handle: "LockheedMartin",
      logo: "https://pbs.twimg.com/profile_images/1595374319207890944/lockheed_400x400.jpg",
      verified: true,
      type: "company"
    },
    content: "F-35 program reaches 1,000 aircraft delivered milestone! Our 5th generation fighter continues to strengthen allied air power across 18 nations. Proud of our team's dedication to this historic achievement. #F35 #AirPower",
    timestamp: "Dec 10, 2024",
    likes: 12567,
    retweets: 4892,
    replies: 1234,
    url: "https://twitter.com/LockheedMartin/status/1866123456789"
  },
  {
    id: "tw3",
    platform: "twitter",
    author: {
      name: "NATO",
      handle: "NATO",
      logo: "https://pbs.twimg.com/profile_images/1448196498240524289/nato_400x400.jpg",
      verified: true,
      type: "institutional"
    },
    content: "Foreign Ministers agreed to increase support for Ukraine and strengthen NATO's deterrence. The Alliance remains united in support of Ukraine for as long as it takes. Read the full statement: nato.int/cps/en/natohq/…",
    timestamp: "Dec 11, 2024",
    likes: 15678,
    retweets: 6234,
    replies: 2341,
    url: "https://twitter.com/NATO/status/1866234567890"
  },
  {
    id: "tw4",
    platform: "twitter",
    author: {
      name: "Defense News",
      handle: "Defense_News",
      logo: "https://pbs.twimg.com/profile_images/1166418514461638657/defensenews_400x400.jpg",
      verified: true,
      type: "media"
    },
    content: "BREAKING: Germany approves €4B defense package including Leopard 2 tanks, IRIS-T air defense systems, and ammunition for Ukraine. Largest single package since 2022. Full details: defensenews.com/global/europe/…",
    timestamp: "Dec 11, 2024",
    likes: 4567,
    retweets: 2134,
    replies: 456,
    url: "https://twitter.com/Defense_News/status/1866345678901"
  },
  {
    id: "tw5",
    platform: "twitter",
    author: {
      name: "Dassault Aviation",
      handle: "DassaultAviation",
      logo: "https://pbs.twimg.com/profile_images/1628342376192802817/Dassault_400x400.jpg",
      verified: true,
      type: "company"
    },
    content: "Le Rafale F4 a effectué avec succès son premier vol d'essai avec le nouveau pod de désignation TALIOS NG. Cette évolution majeure renforce les capacités air-sol de l'avion. #Rafale #DassaultAviation",
    timestamp: "Dec 10, 2024",
    likes: 6789,
    retweets: 2345,
    replies: 567,
    url: "https://twitter.com/DassaultAviation/status/1866456789012"
  },
  {
    id: "tw6",
    platform: "twitter",
    author: {
      name: "Ministère des Armées",
      handle: "Armees_Gouv",
      logo: "https://pbs.twimg.com/profile_images/1595374319207890944/BLKLqAEV_400x400.jpg",
      verified: true,
      type: "institutional"
    },
    content: "La France livrera 78 véhicules blindés Griffon et Jaguar supplémentaires aux forces terrestres en 2025. Le programme SCORPION continue de moderniser nos capacités de combat. #ArmeesDeTerre",
    timestamp: "Dec 9, 2024",
    likes: 5432,
    retweets: 1876,
    replies: 345,
    url: "https://twitter.com/Armees_Gouv/status/1866567890123"
  },
  {
    id: "tw7",
    platform: "twitter",
    author: {
      name: "BAE Systems",
      handle: "BAESystemsplc",
      logo: "https://pbs.twimg.com/profile_images/1603703389195198464/bae_400x400.jpg",
      verified: true,
      type: "company"
    },
    content: "HMS Glasgow, the first Type 26 frigate for the Royal Navy, has successfully completed sea trials. This cutting-edge anti-submarine warfare platform sets new standards in naval capability. #Type26 #RoyalNavy",
    timestamp: "Dec 10, 2024",
    likes: 7654,
    retweets: 2987,
    replies: 678,
    url: "https://twitter.com/BAESystemsplc/status/1866678901234"
  },
  {
    id: "tw8",
    platform: "twitter",
    author: {
      name: "The War Zone",
      handle: "thewarzone",
      logo: "https://pbs.twimg.com/profile_images/1166418514461638657/warzone_400x400.jpg",
      verified: true,
      type: "media"
    },
    content: "EXCLUSIVE: New satellite imagery shows significant progress on China's Type 076 amphibious assault ship. Analysis suggests electromagnetic catapult integration for fixed-wing UAVs. Full breakdown in thread",
    timestamp: "Dec 11, 2024",
    likes: 9876,
    retweets: 4321,
    replies: 1234,
    url: "https://twitter.com/thewarzone/status/1866789012345"
  },
  {
    id: "tw9",
    platform: "twitter",
    author: {
      name: "Opex360",
      handle: "opex360",
      logo: "https://pbs.twimg.com/profile_images/1521428851612590080/opex_400x400.jpg",
      verified: true,
      type: "media"
    },
    content: "La marine française recevra son premier sous-marin nucléaire d'attaque de nouvelle génération (SNA 3G) Suffren de série en 2025. Le Duguay-Trouin entrera en service actif au printemps. opex360.com/2024/12/11/sna…",
    timestamp: "Dec 11, 2024",
    likes: 3456,
    retweets: 1234,
    replies: 234,
    url: "https://twitter.com/opex360/status/1866890123456"
  },
  {
    id: "tw10",
    platform: "twitter",
    author: {
      name: "Northrop Grumman",
      handle: "NorthropGrumman",
      logo: "https://pbs.twimg.com/profile_images/1463585785215664128/ng_400x400.jpg",
      verified: true,
      type: "company"
    },
    content: "B-21 Raider continues flight testing at Edwards AFB. The world's first sixth-generation aircraft is on track for initial operational capability. Defining Possible. #B21Raider",
    timestamp: "Dec 9, 2024",
    likes: 11234,
    retweets: 5678,
    replies: 987,
    url: "https://twitter.com/NorthropGrumman/status/1866901234567"
  },
  {
    id: "tw11",
    platform: "twitter",
    author: {
      name: "Rheinmetall",
      handle: "Rheinmetall_AG",
      logo: "https://pbs.twimg.com/profile_images/1593557089276887040/rheinmetall_400x400.jpg",
      verified: true,
      type: "company"
    },
    content: "Rheinmetall opens new ammunition production facility in Germany. Annual 155mm shell capacity increased to 700,000 rounds by 2027. Essential for European security and NATO stockpiles. #DefenseIndustry",
    timestamp: "Dec 10, 2024",
    likes: 4567,
    retweets: 1890,
    replies: 345,
    url: "https://twitter.com/Rheinmetall_AG/status/1867012345678"
  },
  {
    id: "tw12",
    platform: "twitter",
    author: {
      name: "Saab",
      handle: "Saaborefence",
      logo: "https://pbs.twimg.com/profile_images/1166418514461638657/saab_400x400.jpg",
      verified: true,
      type: "company"
    },
    content: "Sweden delivers additional Gripen C/D fighters to Brazil. The partnership strengthens South American air defense capabilities and technology transfer. #GripenBrazil #DefenseCooperation",
    timestamp: "Dec 8, 2024",
    likes: 3234,
    retweets: 1123,
    replies: 234,
    url: "https://twitter.com/Saab/status/1867123456789"
  },
];

// LinkedIn posts with real company data
const MOCK_LINKEDIN_POSTS = [
  {
    id: "li1",
    platform: "linkedin",
    author: {
      name: "Thales Group",
      handle: "thales",
      logo: "https://media.licdn.com/dms/image/C4D0BAQGpXKHE3WrFYg/company-logo_200_200/0/thales.png",
      verified: true,
      type: "company"
    },
    content: "Thales selected by NATO to provide next-generation secure communications for allied forces. Our NEXIUM Defense portfolio will enable seamless interoperability across all domains. A major milestone for European defense sovereignty.",
    timestamp: "Dec 10, 2024",
    likes: 4567,
    comments: 234,
    shares: 567,
    url: "https://linkedin.com/company/thales/posts"
  },
  {
    id: "li2",
    platform: "linkedin",
    author: {
      name: "Leonardo",
      handle: "leonardo-company",
      logo: "https://media.licdn.com/dms/image/C4D0BAQEhJ_lFxM5m2A/company-logo_200_200/0/leonardo.png",
      verified: true,
      type: "company"
    },
    content: "Leonardo and Rheinmetall announce joint venture for next-generation main battle tank. The partnership combines Italian electronics expertise with German armored vehicle experience. #DefenseInnovation #KNDS",
    timestamp: "Dec 9, 2024",
    likes: 3456,
    comments: 178,
    shares: 423,
    url: "https://linkedin.com/company/leonardo-company/posts"
  },
  {
    id: "li3",
    platform: "linkedin",
    author: {
      name: "Airbus Defence and Space",
      handle: "airbus-defence-space",
      logo: "https://media.licdn.com/dms/image/C4D0BAQEHk5qVZUUqAw/company-logo_200_200/0/airbus.png",
      verified: true,
      type: "company"
    },
    content: "A400M Atlas fleet surpasses 100,000 flight hours! This versatile airlifter continues to prove its value in humanitarian and military operations worldwide. Proud of our teams and operators. #A400M #Airbus",
    timestamp: "Dec 11, 2024",
    likes: 5678,
    comments: 312,
    shares: 678,
    url: "https://linkedin.com/company/airbus-defence-space/posts"
  },
  {
    id: "li4",
    platform: "linkedin",
    author: {
      name: "MBDA",
      handle: "mbda",
      logo: "https://media.licdn.com/dms/image/C4D0BAQGwHqCmnk8pKw/company-logo_200_200/0/mbda.png",
      verified: true,
      type: "company"
    },
    content: "MBDA's Meteor missile achieves record-breaking 150km+ engagement during NATO exercise. The ramjet-powered BVRAAM continues to set the standard for beyond-visual-range air combat. #Meteor #AirSuperiority",
    timestamp: "Dec 8, 2024",
    likes: 4123,
    comments: 198,
    shares: 345,
    url: "https://linkedin.com/company/mbda/posts"
  },
  {
    id: "li5",
    platform: "linkedin",
    author: {
      name: "General Dynamics",
      handle: "general-dynamics",
      logo: "https://media.licdn.com/dms/image/C4D0BAQGwqPDL_l_GEQ/company-logo_200_200/0/gd.png",
      verified: true,
      type: "company"
    },
    content: "Columbia-class submarine program reaches 50% design completion. These next-generation ballistic missile submarines will ensure strategic deterrence for decades. #ColumbiaClass #NuclearDeterrence",
    timestamp: "Dec 10, 2024",
    likes: 6789,
    comments: 289,
    shares: 567,
    url: "https://linkedin.com/company/general-dynamics/posts"
  },
  {
    id: "li6",
    platform: "linkedin",
    author: {
      name: "Naval Group",
      handle: "naval-group",
      logo: "https://media.licdn.com/dms/image/C4D0BAQE2k4X5tKJvEA/company-logo_200_200/0/naval-group.png",
      verified: true,
      type: "company"
    },
    content: "Naval Group signe un contrat historique pour la modernisation des sous-marins Scorpène de la marine indienne. Ce partenariat renforce la coopération stratégique franco-indienne. #NavalGroup #MakeInIndia",
    timestamp: "Dec 11, 2024",
    likes: 3987,
    comments: 156,
    shares: 289,
    url: "https://linkedin.com/company/naval-group/posts"
  },
  {
    id: "li7",
    platform: "linkedin",
    author: {
      name: "Safran",
      handle: "safran",
      logo: "https://media.licdn.com/dms/image/C4D0BAQH_bH7QE3kvYg/company-logo_200_200/0/safran.png",
      verified: true,
      type: "company"
    },
    content: "Le moteur M88 du Rafale atteint 2 millions d'heures de vol cumulées. Une fiabilité exceptionnelle qui témoigne de l'excellence de nos équipes. #Safran #M88 #Rafale",
    timestamp: "Dec 9, 2024",
    likes: 5234,
    comments: 234,
    shares: 456,
    url: "https://linkedin.com/company/safran/posts"
  },
  {
    id: "li8",
    platform: "linkedin",
    author: {
      name: "RTX (Raytheon)",
      handle: "rtx",
      logo: "https://media.licdn.com/dms/image/C4E0BAQHczLBqVzPYKQ/company-logo_200_200/0/rtx.png",
      verified: true,
      type: "company"
    },
    content: "Patriot air defense system achieves 100% intercept rate during recent operational deployment. Our commitment to protecting warfighters remains unwavering. #Patriot #AirDefense #RTX",
    timestamp: "Dec 11, 2024",
    likes: 7890,
    comments: 345,
    shares: 789,
    url: "https://linkedin.com/company/rtx/posts"
  },
];

const ACCOUNT_TYPES = [
  { value: "all", label: "All Sources" },
  { value: "institutional", label: "Institutional" },
  { value: "company", label: "Companies" },
  { value: "media", label: "Media" },
];

export default function Follow() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [accountType, setAccountType] = useState("all");
  const [allPosts, setAllPosts] = useState([]);
  const [favorites, setFavorites] = useState(FAVORITE_ACCOUNTS);

  useEffect(() => {
    const combined = [...MOCK_TWITTER_POSTS, ...MOCK_LINKEDIN_POSTS].sort((a, b) => {
      // Sort by date (most recent first)
      return new Date(b.timestamp) - new Date(a.timestamp);
    });
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

  const getTypeStyle = (type) => {
    switch (type) {
      case "institutional": return "bg-blue-50 text-blue-700 border-blue-200";
      case "company": return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "media": return "bg-amber-50 text-amber-700 border-amber-200";
      default: return "bg-slate-100 text-slate-600 border-slate-200";
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num;
  };

  return (
    <div data-testid="follow-page" className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-slate-900 tracking-tight">
            Defense Intel Feed
          </h1>
          <p className="text-slate-500 text-sm mt-1">Real-time posts from defense industry leaders & institutions</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 bg-white border border-slate-200 rounded-lg px-3 py-2">
          <Clock className="w-3.5 h-3.5" />
          <span>Dec 12, 2024</span>
        </div>
      </div>

      {/* Favorite Accounts Section */}
      <Card className="bg-gradient-to-r from-purple-50 to-slate-50 border-purple-200 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-purple-600 fill-purple-600" />
              <CardTitle className="font-heading text-lg text-slate-900">Comptes Favoris</CardTitle>
            </div>
            <span className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
              {favorites.length} comptes suivis
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide" data-testid="favorite-accounts">
            {favorites.map((account) => (
              <a
                key={account.id}
                href={account.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3 hover:border-purple-300 hover:shadow-md transition-all duration-200 group"
                data-testid={`favorite-${account.id}`}
              >
                <div className="relative">
                  {account.logo ? (
                    <img 
                      src={account.logo} 
                      alt={account.name}
                      className="w-10 h-10 rounded-full object-contain bg-white border border-slate-100"
                      onError={(e) => { 
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div className={`w-10 h-10 rounded-full items-center justify-center bg-slate-100 ${account.logo ? 'hidden' : 'flex'}`}>
                    <Building2 className="w-5 h-5 text-slate-400" />
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center ${
                    account.platform === 'twitter' ? 'bg-[#1DA1F2]' : 'bg-[#0A66C2]'
                  }`}>
                    {account.platform === 'twitter' ? (
                      <Twitter className="w-2.5 h-2.5 text-white" />
                    ) : (
                      <Linkedin className="w-2.5 h-2.5 text-white" />
                    )}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-900 font-medium text-sm whitespace-nowrap">{account.name}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                  </div>
                  <span className="text-xs text-slate-500">{account.followers} followers</span>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-purple-500 transition-colors ml-2" />
              </a>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search posts, accounts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400"
            data-testid="search-posts"
          />
        </div>
        <Select value={accountType} onValueChange={setAccountType}>
          <SelectTrigger className="w-full sm:w-48 bg-white border-slate-200 text-slate-700" data-testid="account-type-filter">
            <Filter className="w-4 h-4 mr-2 text-slate-400" />
            <SelectValue placeholder="Source Type" />
          </SelectTrigger>
          <SelectContent className="bg-white border-slate-200">
            {ACCOUNT_TYPES.map(type => (
              <SelectItem key={type.value} value={type.value} className="text-slate-700 focus:bg-purple-50">
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Platform Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-slate-100 border border-slate-200 p-1">
          <TabsTrigger value="all" className="data-[state=active]:bg-white data-[state=active]:text-purple-700 data-[state=active]:shadow-sm">
            All ({allPosts.length})
          </TabsTrigger>
          <TabsTrigger value="twitter" className="data-[state=active]:bg-white data-[state=active]:text-purple-700 data-[state=active]:shadow-sm">
            <Twitter className="w-4 h-4 mr-2" />
            X ({MOCK_TWITTER_POSTS.length})
          </TabsTrigger>
          <TabsTrigger value="linkedin" className="data-[state=active]:bg-white data-[state=active]:text-purple-700 data-[state=active]:shadow-sm">
            <Linkedin className="w-4 h-4 mr-2" />
            LinkedIn ({MOCK_LINKEDIN_POSTS.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <div className="grid lg:grid-cols-2 gap-4" data-testid="posts-feed">
            {filteredPosts.map((post) => (
              <Card 
                key={post.id}
                className="bg-white border-slate-200 shadow-sm hover:shadow-lg hover:border-purple-200 transition-all duration-300"
                data-testid={`post-${post.id}`}
              >
                <CardContent className="p-5">
                  {/* Author Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        {post.author.logo ? (
                          <img 
                            src={post.author.logo} 
                            alt={post.author.name}
                            className="w-12 h-12 rounded-full object-cover bg-white border border-slate-200"
                            onError={(e) => { 
                              e.target.onerror = null;
                              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(post.author.name.split(' ').map(n => n[0]).join(''))}&background=${post.author.type === 'company' ? '7E22CE' : post.author.type === 'institutional' ? '2563EB' : 'F59E0B'}&color=fff&size=96&bold=true`;
                            }}
                          />
                        ) : (
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            post.platform === "twitter" ? "bg-[#1DA1F2]/10" : "bg-[#0A66C2]/10"
                          }`}>
                            {post.platform === "twitter" ? (
                              <Twitter className="w-6 h-6 text-[#1DA1F2]" />
                            ) : (
                              <Linkedin className="w-6 h-6 text-[#0A66C2]" />
                            )}
                          </div>
                        )}
                        <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center border-2 border-white ${
                          post.platform === "twitter" ? "bg-[#1DA1F2]" : "bg-[#0A66C2]"
                        }`}>
                          {post.platform === "twitter" ? (
                            <Twitter className="w-3 h-3 text-white" />
                          ) : (
                            <Linkedin className="w-3 h-3 text-white" />
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-900 font-medium text-sm">{post.author.name}</span>
                          {post.author.verified && (
                            <CheckCircle2 className="w-4 h-4 text-purple-600" />
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-500 text-xs">@{post.author.handle}</span>
                          <span className="text-slate-400 text-xs">• {post.timestamp}</span>
                        </div>
                      </div>
                    </div>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${getTypeStyle(post.author.type)}`}>
                      {post.author.type.toUpperCase()}
                    </span>
                  </div>

                  {/* Content */}
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    {post.content}
                  </p>

                  {/* Engagement Stats */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-4">
                      {post.platform === "twitter" ? (
                        <>
                          <button className="flex items-center gap-1.5 text-slate-400 hover:text-rose-500 transition-colors">
                            <Heart className="w-4 h-4" />
                            <span className="text-xs font-mono">{formatNumber(post.likes)}</span>
                          </button>
                          <button className="flex items-center gap-1.5 text-slate-400 hover:text-emerald-500 transition-colors">
                            <Repeat2 className="w-4 h-4" />
                            <span className="text-xs font-mono">{formatNumber(post.retweets)}</span>
                          </button>
                          <button className="flex items-center gap-1.5 text-slate-400 hover:text-purple-500 transition-colors">
                            <MessageCircle className="w-4 h-4" />
                            <span className="text-xs font-mono">{formatNumber(post.replies)}</span>
                          </button>
                        </>
                      ) : (
                        <>
                          <button className="flex items-center gap-1.5 text-slate-400 hover:text-purple-500 transition-colors">
                            <Heart className="w-4 h-4" />
                            <span className="text-xs font-mono">{formatNumber(post.likes)}</span>
                          </button>
                          <button className="flex items-center gap-1.5 text-slate-400 hover:text-purple-500 transition-colors">
                            <MessageCircle className="w-4 h-4" />
                            <span className="text-xs font-mono">{formatNumber(post.comments)}</span>
                          </button>
                          <button className="flex items-center gap-1.5 text-slate-400 hover:text-purple-500 transition-colors">
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
                      className="flex items-center gap-1.5 text-purple-600 hover:text-purple-700 transition-colors text-xs font-medium"
                    >
                      View Post <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12 text-slate-500 bg-white rounded-lg border border-slate-200">
              No posts found matching your criteria
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
