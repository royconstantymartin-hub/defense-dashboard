import { useEffect, useState, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
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
import { Search, Package, Building2, Plane, Ship, Target, Cpu, Rocket, GitCompare, X, Check, Clock, Database, Filter, ExternalLink, Radio } from "lucide-react";
import CompanyProfileSheet from "@/components/CompanyProfileSheet";

const CATEGORIES = [
  { value: "all", label: "All Categories", icon: Package },
  { value: "aircraft", label: "Aircraft", icon: Plane },
  { value: "naval", label: "Naval", icon: Ship },
  { value: "land", label: "Land Systems", icon: Target },
  { value: "missile", label: "Missiles", icon: Rocket },
  { value: "radar", label: "Radar Systems", icon: Radio },
  { value: "cyber", label: "Cyber / EW", icon: Cpu },
  { value: "space", label: "Space", icon: Rocket },
];

const MANUFACTURERS = [
  { value: "all", label: "All Manufacturers" },
  { value: "Lockheed Martin", label: "Lockheed Martin" },
  { value: "Raytheon Technologies", label: "Raytheon Technologies" },
  { value: "General Dynamics", label: "General Dynamics" },
  { value: "Northrop Grumman", label: "Northrop Grumman" },
  { value: "Boeing Defense", label: "Boeing Defense" },
  { value: "BAE Systems", label: "BAE Systems" },
  { value: "Airbus Defence & Space", label: "Airbus Defence & Space" },
  { value: "Dassault Aviation", label: "Dassault Aviation" },
  { value: "MBDA", label: "MBDA" },
  { value: "Thales", label: "Thales" },
  { value: "Leonardo", label: "Leonardo" },
  { value: "Rheinmetall", label: "Rheinmetall" },
  { value: "Hensoldt", label: "Hensoldt" },
  { value: "General Atomics", label: "General Atomics" },
  { value: "Saab AB", label: "Saab AB" },
  { value: "Naval Group", label: "Naval Group" },
  { value: "Krauss-Maffei Wegmann", label: "Krauss-Maffei Wegmann" },
  { value: "Hanwha Defense", label: "Hanwha Defense" },
  { value: "Rafael Advanced Defense", label: "Rafael Advanced Defense" },
  { value: "Israel Aerospace Industries", label: "Israel Aerospace Industries" },
  { value: "Elbit Systems", label: "Elbit Systems" },
  { value: "Kongsberg Defence", label: "Kongsberg Defence" },
  { value: "Baykar", label: "Baykar" },
  { value: "Nexter Systems", label: "Nexter Systems" },
  { value: "Fincantieri", label: "Fincantieri" },
  { value: "Huntington Ingalls", label: "Huntington Ingalls" },
  { value: "L3Harris Technologies", label: "L3Harris Technologies" },
  { value: "Hyundai Rotem", label: "Hyundai Rotem" },
  { value: "AeroVironment", label: "AeroVironment" },
  { value: "Sikorsky", label: "Sikorsky" },
];

// Wikipedia article title overrides for products whose names differ from their article titles
const WIKI_TITLES = {
  "F-35 Lightning II": "Lockheed Martin F-35 Lightning II",
  "F-22 Raptor": "Lockheed Martin F-22 Raptor",
  "Rafale F4": "Dassault Rafale",
  "Eurofighter Typhoon": "Eurofighter Typhoon",
  "Gripen E": "Saab JAS 39 Gripen",
  "KF-21 Boramae": "KAI KF-21 Boramae",
  "Patriot PAC-3": "MIM-104 Patriot",
  "S-400 Triumf": "S-400 missile system",
  "Iron Dome": "Iron Dome",
  "THAAD": "Terminal High Altitude Area Defense",
  "Virginia-class Submarine": "Virginia-class submarine",
  "Astute-class Submarine": "Astute-class submarine",
  "Barracuda-class Submarine": "Suffren-class submarine",
  "M1A2 Abrams SEPv3": "M1 Abrams",
  "Leopard 2A7+": "Leopard 2",
  "K2 Black Panther": "K2 Black Panther",
  "Leclerc": "AMX-56 Leclerc",
  "MQ-9 Reaper": "General Atomics MQ-9 Reaper",
  "Bayraktar TB2": "Bayraktar TB2",
  "K9 Thunder": "K9 Thunder",
  "CAESAR": "CAESAR howitzer",
  "PzH 2000": "Panzerhaubitze 2000",
  "Type 26 Frigate": "Type 26 frigate",
  "FREMM Frigate": "FREMM multipurpose frigate",
  "F-15EX Eagle II": "McDonnell Douglas F-15 Eagle",
  "F/A-18E/F Super Hornet": "Boeing F/A-18E/F Super Hornet",
  "Su-57 Felon": "Sukhoi Su-57",
  "J-20 Mighty Dragon": "Chengdu J-20",
  "HAL Tejas Mk2": "HAL Tejas",
  "B-21 Raider": "Northrop Grumman B-21 Raider",
  "B-2 Spirit": "Northrop Grumman B-2 Spirit",
  "A-10 Thunderbolt II": "Fairchild Republic A-10 Thunderbolt II",
  "AH-64E Apache Guardian": "Boeing AH-64 Apache",
  "UH-60M Black Hawk": "Sikorsky UH-60 Black Hawk",
  "NH90": "NHIndustries NH90",
  "Tigre HAD": "Eurocopter Tiger",
  "CH-47F Chinook": "Boeing CH-47 Chinook",
  "V-22 Osprey": "Bell Boeing V-22 Osprey",
  "C-17 Globemaster III": "Boeing C-17 Globemaster III",
  "A400M Atlas": "Airbus A400M Atlas",
  "KC-46 Pegasus": "Boeing KC-46 Pegasus",
  "MQ-4C Triton": "Northrop Grumman MQ-4C Triton",
  "RQ-4 Global Hawk": "Northrop Grumman RQ-4 Global Hawk",
  "XQ-58 Valkyrie": "Kratos XQ-58 Valkyrie",
  "Bayraktar TB3": "Bayraktar TB3",
  "Switchblade 600": "AeroVironment Switchblade",
  "Tomahawk Block V": "Tomahawk (missile)",
  "SCALP/Storm Shadow": "Storm Shadow",
  "AGM-158 JASSM-ER": "AGM-158 JASSM",
  "Meteor BVRAAM": "MBDA Meteor",
  "AIM-120D AMRAAM": "AIM-120 AMRAAM",
  "Hellfire AGM-114R": "AGM-114 Hellfire",
  "Javelin FGM-148": "FGM-148 Javelin",
  "NSM Naval Strike Missile": "Naval Strike Missile",
  "Harpoon Block II": "AGM-84 Harpoon",
  "ASTER 30 SAMP/T": "Aster 30",
  "David's Sling": "David's Sling",
  "AGM-183A ARRW": "AGM-183 ARRW",
  "Kinzhal": "Kh-47M2 Kinzhal",
  "Arleigh Burke Flight III": "Arleigh Burke-class destroyer",
  "Type 45 Daring-class": "Type 45 destroyer",
  "Horizon-class Frigate": "Horizon-class frigate",
  "Mistral-class LHD": "Mistral-class amphibious assault ship",
  "Gerald R. Ford-class": "Gerald R. Ford-class aircraft carrier",
  "Queen Elizabeth-class": "Queen Elizabeth-class aircraft carrier",
  "Charles de Gaulle": "French aircraft carrier Charles de Gaulle",
  "Columbia-class Submarine": "Columbia-class submarine",
  "Dreadnought-class Submarine": "Dreadnought-class submarine",
  "Le Triomphant-class": "Le Triomphant-class submarine",
  "Challenger 3": "Challenger 2",
  "T-14 Armata": "T-14 Armata",
  "Merkava Mk 4M": "Merkava",
  "VBCI": "VBCI",
  "CV90 Mk IV": "CV90",
  "Puma IFV": "Puma (IFV)",
  "Boxer MRAV": "Boxer (armoured fighting vehicle)",
  "Stryker ICVV": "Stryker",
  "M270 MLRS": "M270 Multiple Launch Rocket System",
  "HIMARS": "M142 HIMARS",
  "ARCHER 155mm": "Archer artillery system",
  "GPS III Satellite": "GPS Block III",
  "SBIRS GEO": "Space Based Infrared System",
  "X-37B Space Plane": "Boeing X-37",
  "AN/ALQ-99 Jammer": "EA-18G Growler",
  "F-16 Block 70/72": "General Dynamics F-16 Fighting Falcon",
  "E-7A Wedgetail": "Boeing E-7",
  "P-8A Poseidon": "Boeing P-8 Poseidon",
  "E-2D Advanced Hawkeye": "Northrop Grumman E-2 Hawkeye",
  "KC-135 Stratotanker": "Boeing KC-135 Stratotanker",
  "MQ-1C Gray Eagle": "General Atomics MQ-1C Gray Eagle",
  "Namer APC": "Namer",
  "Bradley M2A4": "M2 Bradley",
  "Zumwalt-class Destroyer": "Zumwalt-class destroyer",
  "Starstreak HVM": "Starstreak",
  "BrahMos": "BrahMos",
  "SM-6 Standard Missile": "RIM-174 Standard ERAM",
  "Arjun Mk-1A": "Arjun (tank)",
  "Su-35S Flanker-E": "Sukhoi Su-35",
  "Tornado IDS": "Panavia Tornado",
  "AV-8B Harrier II": "McDonnell Douglas AV-8B Harrier II",
  "Heron TP": "IAI Heron",
  "Wing Loong II": "CAIG Wing Loong II",
  "AC-130J Ghostrider": "Lockheed AC-130",
  "Taurus KEPD 350": "Taurus (missile)",
  "IRIS-T SLM": "IRIS-T",
  "Arrow 3": "Arrow 3",
  "Barak 8 LRSAM": "Barak 8",
  "RIM-161 SM-3": "RIM-161 Standard Missile 3",
  "Type 055 Destroyer": "Type 055 destroyer",
  "INS Vikrant": "INS Vikrant (2013)",
  "K21 IFV": "K21 infantry fighting vehicle",
  "JLTV": "Joint Light Tactical Vehicle",
  "M109A7 Paladin": "M109 howitzer",
  "AS-90 Braveheart": "AS-90",
  "SPY-6 AMDR": "AN/SPY-6",
  "AN/TPY-2": "AN/TPY-2",
  "EA-18G Growler": "Boeing EA-18G Growler",
  "RC-135V/W Rivet Joint": "Boeing RC-135",
  "Exocet MM40 Block 3": "Exocet",
  "RBS-15 Mk4": "RBS-15",
  "Visby-class Corvette": "Visby-class corvette",
  "Type 212 Submarine": "Type 212 submarine",
  "Soryu-class Submarine": "Sōryū-class submarine",
  "AGM-88G AARGM-ER": "AGM-88 HARM",
  "SSBN Le Terrible": "Le Triomphant-class submarine",
  "Marder IFV": "Marder (IFV)",
  "AMX-10RC": "AMX-10 RC",
  "Altay Tank": "Altay (tank)",
  "Sa'ar 6 Corvette": "Sa'ar 6-class corvette",
  "Gowind-class Corvette": "Gowind-class corvette",
  "Constellation-class Frigate": "Constellation-class frigate",
  "MEKO A-200": "MEKO",
  "Independence-class LCS": "Independence-class littoral combat ship",
  "NASAMS": "NASAMS",
  "Mistral MANPADS": "Mistral (missile)",
  "Stinger FIM-92": "FIM-92 Stinger",
  "Spike NLOS": "Spike (missile)",
  "Spike ER2": "Spike (missile)",
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
  "Dassault Aviation": "dassault-aviation.com",
  "Safran": "safran-group.com",
  "Rheinmetall": "rheinmetall.com",
  "Saab AB": "saab.com",
  "Naval Group": "naval-group.com",
  "Hensoldt": "hensoldt.net",
  "MBDA": "mbda-systems.com",
  "Kongsberg Defence": "kongsberg.com",
  "Hanwha Defense": "hanwha.com",
  "Elbit Systems": "elbitsystems.com",
  "Rafael Advanced Defense": "rafael.co.il",
  "Israel Aerospace Industries": "iai.co.il",
  "General Dynamics": "gd.com",
  "Huntington Ingalls": "hii.com",
  "Sikorsky": "lockheedmartin.com",
};

export default function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedManufacturer, setSelectedManufacturer] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [profileName, setProfileName] = useState(null);
  const [compareMode, setCompareMode] = useState(false);
  const [selectedForCompare, setSelectedForCompare] = useState([]);
  const [showComparison, setShowComparison]= useState(false);

  // Wikipedia image fallback: fetched client-side when DB image_url is missing or broken
  const [wikiImages, setWikiImages] = useState({});   // productId → url
  const [failedPrimary, setFailedPrimary] = useState(new Set()); // productIds where image_url 404'd
  const fetchedIds = useRef(new Set());

  const fetchWikiImage = useCallback(async (productId, productName) => {
    if (fetchedIds.current.has(productId)) return;
    fetchedIds.current.add(productId);
    const title = (WIKI_TITLES[productName] || productName).replace(/ /g, '_');
    try {
      const r = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`
      );
      if (r.ok) {
        const d = await r.json();
        if (d.thumbnail?.source) {
          const src = d.thumbnail.source.replace(/\/\d+px-/, '/600px-');
          setWikiImages(prev => ({ ...prev, [productId]: src }));
        }
      }
    } catch {}
  }, []);

  // Auto-fetch Wikipedia images for all products missing an image_url
  useEffect(() => {
    filteredProducts.forEach(p => {
      if (!p.image_url) fetchWikiImage(p.id, p.name);
    });
  }, [filteredProducts, fetchWikiImage]);

  const goToCompanyProfile = (e, manufacturer) => {
    e.stopPropagation();
    setProfileName(manufacturer);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API}/products`);
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products;
    
    if (selectedCategory !== "all") {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    
    if (selectedManufacturer !== "all") {
      filtered = filtered.filter(p => p.manufacturer === selectedManufacturer);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(term) || 
        p.product_type.toLowerCase().includes(term) ||
        p.manufacturer.toLowerCase().includes(term)
      );
    }
    
    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, selectedManufacturer, products]);

  const getCategoryIcon = (category) => {
    const cat = CATEGORIES.find(c => c.value === category);
    return cat?.icon || Package;
  };

  const getLogo = (manufacturer) => {
    const domain = COMPANY_LOGOS[manufacturer];
    return domain ? `https://logo.clearbit.com/${domain}` : null;
  };

  const toggleProductForCompare = (product) => {
    if (selectedForCompare.find(p => p.id === product.id)) {
      setSelectedForCompare(selectedForCompare.filter(p => p.id !== product.id));
    } else if (selectedForCompare.length < 3) {
      setSelectedForCompare([...selectedForCompare, product]);
    }
  };

  const startComparison = () => {
    if (selectedForCompare.length >= 2) {
      setShowComparison(true);
    }
  };

  const clearComparison = () => {
    setSelectedForCompare([]);
    setCompareMode(false);
    setShowComparison(false);
  };

  const getAllSpecKeys = () => {
    const keys = new Set();
    selectedForCompare.forEach(p => {
      Object.keys(p.specifications).forEach(k => keys.add(k));
    });
    return Array.from(keys);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'development':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'retired':
        return 'bg-slate-100 text-slate-500 border-slate-200';
      default:
        return 'bg-slate-100 text-slate-500 border-slate-200';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'aircraft': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'naval': return 'bg-cyan-50 text-cyan-700 border-cyan-200';
      case 'land': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'missile': return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'radar': return 'bg-teal-50 text-teal-700 border-teal-200';
      case 'cyber': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'space': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      default: return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div data-testid="products-page" className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-slate-900 tracking-tight">
            Product Portfolio
          </h1>
          <p className="text-slate-500 text-sm mt-1">Defense Systems & Equipment Catalog</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 bg-white border border-slate-200 rounded-lg px-3 py-2">
          <Clock className="w-3.5 h-3.5" />
          <span>Last updated: {new Date().toLocaleDateString()}</span>
          <span className="text-slate-300">|</span>
          <Database className="w-3.5 h-3.5" />
          <span>Source: Manufacturers, Jane's</span>
        </div>
      </div>

      {/* Compare Mode Bar */}
      {compareMode && (
        <Card className="bg-purple-50 border-purple-200 shadow-sm">
          <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <GitCompare className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-slate-900 font-medium">Compare Mode Active</p>
                <p className="text-sm text-slate-600">
                  Select 2-3 products to compare ({selectedForCompare.length}/3 selected)
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                onClick={startComparison}
                disabled={selectedForCompare.length < 2}
                className="bg-purple-700 hover:bg-purple-800 text-white"
                data-testid="start-comparison-btn"
              >
                Compare ({selectedForCompare.length})
              </Button>
              <Button 
                variant="outline" 
                onClick={clearComparison}
                className="border-slate-300 text-slate-700 hover:bg-slate-100"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Selected Products Preview */}
      {compareMode && selectedForCompare.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedForCompare.map(product => (
            <div 
              key={product.id}
              className="flex items-center gap-2 bg-white border border-purple-200 rounded-lg px-3 py-2 shadow-sm"
            >
              <span className="text-sm text-slate-900 font-medium">{product.name}</span>
              <button 
                onClick={() => toggleProductForCompare(product)}
                className="text-slate-400 hover:text-rose-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">TOTAL</p>
            <p className="text-2xl font-mono font-bold text-slate-900 mt-1">{products.length}</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">AIRCRAFT</p>
            <p className="text-2xl font-mono font-bold text-blue-600 mt-1">
              {products.filter(p => p.category === 'aircraft').length}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">MISSILES</p>
            <p className="text-2xl font-mono font-bold text-rose-600 mt-1">
              {products.filter(p => p.category === 'missile').length}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">LAND</p>
            <p className="text-2xl font-mono font-bold text-amber-600 mt-1">
              {products.filter(p => p.category === 'land').length}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">RADAR</p>
            <p className="text-2xl font-mono font-bold text-teal-600 mt-1">
              {products.filter(p => p.category === 'radar').length}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">ACTIVE</p>
            <p className="text-2xl font-mono font-bold text-emerald-600 mt-1">
              {products.filter(p => p.status === 'active').length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400"
            data-testid="search-products"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-48 bg-white border-slate-200 text-slate-700" data-testid="category-filter">
            <Filter className="w-4 h-4 mr-2 text-slate-400" />
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent className="bg-white border-slate-200">
            {CATEGORIES.map(c => (
              <SelectItem key={c.value} value={c.value} className="text-slate-700 focus:bg-purple-50">
                {c.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedManufacturer} onValueChange={setSelectedManufacturer}>
          <SelectTrigger className="w-full sm:w-56 bg-white border-slate-200 text-slate-700" data-testid="manufacturer-filter">
            <Building2 className="w-4 h-4 mr-2 text-slate-400" />
            <SelectValue placeholder="Manufacturer" />
          </SelectTrigger>
          <SelectContent className="bg-white border-slate-200 max-h-80">
            {MANUFACTURERS.map(m => (
              <SelectItem key={m.value} value={m.value} className="text-slate-700 focus:bg-purple-50">
                {m.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          variant={compareMode ? "default" : "outline"}
          onClick={() => setCompareMode(!compareMode)}
          className={compareMode 
            ? "bg-purple-700 hover:bg-purple-800 text-white" 
            : "border-slate-200 text-slate-700 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200"
          }
          data-testid="compare-mode-btn"
        >
          <GitCompare className="w-4 h-4 mr-2" />
          Compare
        </Button>
      </div>

      {/* Products Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" data-testid="products-grid">
        {filteredProducts.map((product) => {
          const Icon = getCategoryIcon(product.category);
          const isSelectedForCompare = selectedForCompare.find(p => p.id === product.id);
          const logoUrl = getLogo(product.manufacturer);
          return (
            <Card 
              key={product.id}
              className={`bg-white border-slate-200 shadow-sm hover:shadow-lg hover:border-purple-200 transition-all duration-300 cursor-pointer overflow-hidden ${
                isSelectedForCompare ? 'ring-2 ring-purple-500 border-purple-500' : ''
              }`}
              onClick={(e) => compareMode ? toggleProductForCompare(product) : setSelectedProduct(product)}
              data-testid={`product-card-${product.id}`}
            >
              {/* Image or Placeholder */}
              <div className="h-40 bg-gradient-to-br from-slate-100 to-slate-50 relative">
                {(() => {
                  const primaryFailed = failedPrimary.has(product.id);
                  const imgSrc = primaryFailed
                    ? wikiImages[product.id]
                    : (product.image_url || wikiImages[product.id]);
                  return imgSrc ? (
                    <img
                      src={imgSrc}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(ev) => {
                        if (!primaryFailed && imgSrc === product.image_url) {
                          // Primary URL broke — fetch Wikipedia and re-render
                          setFailedPrimary(prev => new Set([...prev, product.id]));
                          fetchWikiImage(product.id, product.name);
                        } else {
                          // Wiki image also failed — just show icon
                          ev.target.style.display = 'none';
                          if (ev.target.nextSibling) ev.target.nextSibling.style.display = 'flex';
                        }
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Icon className="w-16 h-16 text-slate-300" />
                    </div>
                  );
                })()}
                <span className={`absolute top-2 right-2 text-xs font-medium px-2 py-0.5 rounded-full border ${getStatusStyle(product.status)}`}>
                  {product.status.toUpperCase()}
                </span>
                {compareMode && (
                  <div className={`absolute top-2 left-2 w-6 h-6 rounded-lg flex items-center justify-center ${
                    isSelectedForCompare ? 'bg-purple-600' : 'bg-white border border-slate-200'
                  }`}>
                    {isSelectedForCompare && <Check className="w-4 h-4 text-white" />}
                  </div>
                )}
              </div>
              
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="text-slate-900 font-medium text-sm">{product.name}</h3>
                    <button
                      onClick={(e) => goToCompanyProfile(e, product.manufacturer)}
                      className="flex items-center gap-1.5 mt-1.5 group text-left bg-slate-50 hover:bg-purple-50 border border-slate-200 hover:border-purple-200 rounded-lg px-2 py-1 transition-all"
                      title={`View ${product.manufacturer} profile`}
                    >
                      {logoUrl ? (
                        <img
                          src={logoUrl}
                          alt={product.manufacturer}
                          className="w-4 h-4 rounded object-contain shrink-0"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      ) : (
                        <Building2 className="w-3.5 h-3.5 text-slate-400 group-hover:text-purple-500 shrink-0 transition-colors" />
                      )}
                      <p className="text-xs text-slate-600 group-hover:text-purple-700 font-medium transition-colors truncate max-w-[120px]">
                        {product.manufacturer}
                      </p>
                      <ExternalLink className="w-3 h-3 text-slate-300 group-hover:text-purple-500 transition-colors shrink-0" />
                    </button>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1.5 mt-3">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full border capitalize ${getCategoryColor(product.category)}`}>
                    {product.category}
                  </span>
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full capitalize">
                    {product.product_type.replace('_', ' ')}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12 text-slate-500 bg-white rounded-lg border border-slate-200">
          No products found matching your criteria
        </div>
      )}

      {/* Comparison Modal – portaled to body to escape CSS transform containing block */}
      {showComparison && createPortal(
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto"
          onClick={() => setShowComparison(false)}
        >
          <Card 
            className="bg-white border-slate-200 w-full max-w-6xl my-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            data-testid="comparison-modal"
          >
            <CardHeader className="border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                    <GitCompare className="w-5 h-5 text-purple-600" />
                  </div>
                  <CardTitle className="font-heading text-xl text-slate-900">Product Comparison</CardTitle>
                </div>
                <Button 
                  variant="ghost" 
                  onClick={() => setShowComparison(false)}
                  className="text-slate-400 hover:text-slate-900"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6 overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 p-4 w-40">
                      ATTRIBUTE
                    </th>
                    {selectedForCompare.map(product => (
                      <th key={product.id} className="text-center p-4">
                        <div className="flex flex-col items-center gap-2">
                          {(() => {
                            const CmpIcon = getCategoryIcon(product.category);
                            return (
                              <div className="w-20 h-20 rounded-lg border border-slate-200 overflow-hidden bg-slate-100 relative flex items-center justify-center">
                                <CmpIcon className="w-10 h-10 text-slate-300 absolute" />
                                {product.image_url && (
                                  <img
                                    src={product.image_url}
                                    alt={product.name}
                                    className="w-full h-full object-cover relative z-10"
                                    onError={(ev) => { ev.target.style.display = 'none'; }}
                                  />
                                )}
                              </div>
                            );
                          })()}
                          <span className="text-slate-900 font-medium text-sm">{product.name}</span>
                          <span className="text-xs text-slate-500">{product.manufacturer}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Category */}
                  <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                    <td className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Category</td>
                    {selectedForCompare.map(product => (
                      <td key={product.id} className="p-4 text-center">
                        <span className={`text-sm font-medium px-3 py-1 rounded-full border capitalize ${getCategoryColor(product.category)}`}>
                          {product.category}
                        </span>
                      </td>
                    ))}
                  </tr>
                  {/* Type */}
                  <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                    <td className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Type</td>
                    {selectedForCompare.map(product => (
                      <td key={product.id} className="p-4 text-center">
                        <span className="text-sm text-slate-700 capitalize">{product.product_type.replace('_', ' ')}</span>
                      </td>
                    ))}
                  </tr>
                  {/* Status */}
                  <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                    <td className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Status</td>
                    {selectedForCompare.map(product => (
                      <td key={product.id} className="p-4 text-center">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${getStatusStyle(product.status)}`}>
                          {product.status.toUpperCase()}
                        </span>
                      </td>
                    ))}
                  </tr>
                  {/* Specifications */}
                  {getAllSpecKeys().map(specKey => (
                    <tr key={specKey} className="border-b border-slate-100 hover:bg-slate-50/50">
                      <td className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        {specKey.replace('_', ' ')}
                      </td>
                      {selectedForCompare.map(product => (
                        <td key={product.id} className="p-4 text-center">
                          <span className="text-sm font-mono text-slate-900">
                            {product.specifications[specKey] || '-'}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                  {/* Materials */}
                  <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                    <td className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Materials</td>
                    {selectedForCompare.map(product => (
                      <td key={product.id} className="p-4">
                        <div className="flex flex-wrap justify-center gap-1">
                          {product.materials.map((m, idx) => (
                            <span key={idx} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                              {m}
                            </span>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>,
        document.body
      )}

      {/* Product Detail Modal – portaled to body to escape CSS transform containing block */}
      {selectedProduct && createPortal(
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            style={{ maxHeight: 'min(90vh, 720px)' }}
            onClick={(e) => e.stopPropagation()}
            data-testid="product-detail-modal"
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-3 right-3 z-20 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors shadow-sm"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header Image – fixed height, never collapses */}
            <div className="h-52 bg-gradient-to-br from-slate-100 to-slate-50 flex-shrink-0 relative">
              {(() => {
                const modalPrimaryFailed = failedPrimary.has(selectedProduct.id);
                const modalImgSrc = modalPrimaryFailed
                  ? wikiImages[selectedProduct.id]
                  : (selectedProduct.image_url || wikiImages[selectedProduct.id]);
                if (modalImgSrc) {
                  return (
                    <img
                      src={modalImgSrc}
                      alt={selectedProduct.name}
                      className="w-full h-full object-cover"
                      onError={(ev) => {
                        if (!modalPrimaryFailed && modalImgSrc === selectedProduct.image_url) {
                          setFailedPrimary(prev => new Set([...prev, selectedProduct.id]));
                          fetchWikiImage(selectedProduct.id, selectedProduct.name);
                        } else {
                          ev.target.style.display = 'none';
                        }
                      }}
                    />
                  );
                }
                const DIcon = getCategoryIcon(selectedProduct.category);
                return <DIcon className="w-20 h-20 text-slate-200 absolute inset-0 m-auto" />;
              })()}
              <span className={`absolute top-3 left-3 text-xs font-medium px-2.5 py-1 rounded-full border ${getStatusStyle(selectedProduct.status)}`}>
                {selectedProduct.status.toUpperCase()}
              </span>
            </div>

            {/* Scrollable body */}
            <div className="overflow-y-auto flex-1 p-6 space-y-5">
              {/* Title + manufacturer */}
              <div>
                <h2 className="font-heading text-xl font-bold text-slate-900 leading-tight">{selectedProduct.name}</h2>
                <button
                  onClick={(e) => goToCompanyProfile(e, selectedProduct.manufacturer)}
                  className="flex items-center gap-2 mt-2 group text-left bg-slate-50 hover:bg-purple-50 border border-slate-200 hover:border-purple-200 rounded-lg px-2.5 py-1.5 transition-all"
                  title={`View ${selectedProduct.manufacturer} profile`}
                >
                  {getLogo(selectedProduct.manufacturer) ? (
                    <img
                      src={getLogo(selectedProduct.manufacturer)}
                      alt={selectedProduct.manufacturer}
                      className="w-5 h-5 rounded object-contain shrink-0"
                      onError={(ev) => { ev.target.style.display = 'none'; }}
                    />
                  ) : (
                    <Building2 className="w-4 h-4 text-slate-400 group-hover:text-purple-500 shrink-0 transition-colors" />
                  )}
                  <span className="text-sm text-slate-600 group-hover:text-purple-700 font-medium transition-colors">
                    {selectedProduct.manufacturer}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-300 group-hover:text-purple-500 transition-colors" />
                </button>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full border capitalize ${getCategoryColor(selectedProduct.category)}`}>
                  {selectedProduct.category}
                </span>
                <span className="text-xs bg-slate-100 text-slate-600 border border-slate-200 px-2.5 py-1 rounded-full capitalize">
                  {selectedProduct.product_type.replace(/_/g, ' ')}
                </span>
              </div>

              {/* Specs */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Technical Specifications</p>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(selectedProduct.specifications).map(([key, value]) => (
                    <div key={key} className="bg-slate-50 border border-slate-100 px-3 py-2.5 rounded-lg">
                      <p className="text-xs font-medium uppercase tracking-wider text-slate-400">{key.replace(/_/g, ' ')}</p>
                      <p className="text-slate-900 font-mono text-sm mt-0.5">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Materials */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Materials & Composites</p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProduct.materials.map((material, idx) => (
                    <span key={idx} className="text-xs bg-purple-50 text-purple-700 border border-purple-100 px-2.5 py-1 rounded-full">
                      {material}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Company Profile Sheet */}
      <CompanyProfileSheet name={profileName} onClose={() => setProfileName(null)} />
    </div>
  );
}
