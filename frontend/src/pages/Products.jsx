import { useEffect, useState } from "react";
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
import { Search, Package, Building2, Plane, Ship, Target, Cpu, Rocket, Shield, GitCompare, X, Check, Clock, Database, ArrowUpDown, Filter, ExternalLink } from "lucide-react";

const CATEGORIES = [
  { value: "all", label: "All Categories", icon: Package },
  { value: "aircraft", label: "Aircraft", icon: Plane },
  { value: "naval", label: "Naval", icon: Ship },
  { value: "land", label: "Land Systems", icon: Target },
  { value: "missile", label: "Missiles", icon: Rocket },
  { value: "cyber", label: "Cyber", icon: Cpu },
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
  { value: "Rheinmetall", label: "Rheinmetall" },
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
];

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
  const [compareMode, setCompareMode] = useState(false);
  const [selectedForCompare, setSelectedForCompare] = useState([]);
  const [showComparison, setShowComparison]= useState(false);

  const goToCompanyProfile = (e, manufacturer) => {
    e.stopPropagation();
    navigate(`/market-data?q=${encodeURIComponent(manufacturer)}`);
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
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">TOTAL PRODUCTS</p>
            <p className="text-2xl font-mono font-bold text-slate-900 mt-2">{products.length}</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">AIRCRAFT</p>
            <p className="text-2xl font-mono font-bold text-blue-600 mt-2">
              {products.filter(p => p.category === 'aircraft').length}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">LAND SYSTEMS</p>
            <p className="text-2xl font-mono font-bold text-amber-600 mt-2">
              {products.filter(p => p.category === 'land').length}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">ACTIVE</p>
            <p className="text-2xl font-mono font-bold text-emerald-600 mt-2">
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
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(ev) => {
                      ev.target.style.display = 'none';
                      ev.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div className="w-full h-full items-center justify-center" style={{ display: product.image_url ? 'none' : 'flex' }}>
                  <Icon className="w-16 h-16 text-slate-300" />
                </div>
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
                      className="flex items-center gap-1.5 mt-1 group text-left"
                      title={`Voir la fiche ${product.manufacturer}`}
                    >
                      {logoUrl && (
                        <img
                          src={logoUrl}
                          alt={product.manufacturer}
                          className="w-4 h-4 rounded object-contain"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      )}
                      <p className="text-xs text-slate-500 group-hover:text-purple-600 transition-colors">
                        {product.manufacturer}
                      </p>
                      <ExternalLink className="w-3 h-3 text-slate-300 group-hover:text-purple-500 transition-colors" />
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

      {/* Comparison Modal */}
      {showComparison && (
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
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl rounded-xl"
            onClick={(e) => e.stopPropagation()}
          >
          <Card
            className="bg-white border-slate-200 w-full shadow-none rounded-xl overflow-hidden"
            data-testid="product-detail-modal"
          >
            {/* Header Image */}
            <div className="h-56 bg-gradient-to-br from-slate-100 to-slate-50 relative">
              {selectedProduct.image_url ? (
                <img
                  src={selectedProduct.image_url}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                  onError={(ev) => {
                    ev.target.style.display = 'none';
                    ev.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div className="w-full h-full items-center justify-center" style={{ display: selectedProduct.image_url ? 'none' : 'flex' }}>
                {(() => {
                  const Icon = getCategoryIcon(selectedProduct.category);
                  return <Icon className="w-24 h-24 text-slate-300" />;
                })()}
              </div>
              <span className={`absolute top-4 right-4 text-xs font-medium px-3 py-1 rounded-full border ${getStatusStyle(selectedProduct.status)}`}>
                {selectedProduct.status.toUpperCase()}
              </span>
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 left-4 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-lg flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <CardContent className="p-6 space-y-6">
              {/* Title */}
              <div>
                <h2 className="font-heading text-2xl font-bold text-slate-900">{selectedProduct.name}</h2>
                <button
                  onClick={(e) => goToCompanyProfile(e, selectedProduct.manufacturer)}
                  className="flex items-center gap-2 mt-2 group text-left"
                  title={`Voir la fiche ${selectedProduct.manufacturer}`}
                >
                  {getLogo(selectedProduct.manufacturer) && (
                    <img
                      src={getLogo(selectedProduct.manufacturer)}
                      alt={selectedProduct.manufacturer}
                      className="w-5 h-5 rounded object-contain"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  )}
                  <p className="text-slate-500 group-hover:text-purple-600 transition-colors">
                    {selectedProduct.manufacturer}
                  </p>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-purple-500 transition-colors" />
                </button>
              </div>
              
              {/* Type Tags */}
              <div className="flex flex-wrap gap-2">
                <span className={`text-sm font-medium px-3 py-1 rounded-full border capitalize ${getCategoryColor(selectedProduct.category)}`}>
                  {selectedProduct.category}
                </span>
                <span className="text-sm bg-slate-100 text-slate-600 border border-slate-200 px-3 py-1 rounded-full capitalize">
                  {selectedProduct.product_type.replace('_', ' ')}
                </span>
              </div>
              
              {/* Specifications */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                  TECHNICAL SPECIFICATIONS
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(selectedProduct.specifications).map(([key, value]) => (
                    <div key={key} className="bg-slate-50 border border-slate-100 p-3 rounded-lg">
                      <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                        {key.replace('_', ' ')}
                      </p>
                      <p className="text-slate-900 font-mono mt-1">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Materials */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                  MATERIALS & COMPOSITES
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.materials.map((material, idx) => (
                    <span key={idx} className="text-sm bg-purple-50 text-purple-700 border border-purple-200 px-3 py-1 rounded-full">
                      {material}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          </div>
        </div>
      )}
    </div>
  );
}
