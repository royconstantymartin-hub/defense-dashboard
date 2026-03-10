import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "@/App";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Package, Building2, Plane, Ship, Target, Cpu, Rocket, Shield, GitCompare, X, Check } from "lucide-react";

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
  { value: "Raytheon", label: "Raytheon" },
  { value: "General Dynamics", label: "General Dynamics" },
  { value: "Northrop Grumman", label: "Northrop Grumman" },
  { value: "BAE Systems", label: "BAE Systems" },
  { value: "Dassault", label: "Dassault" },
  { value: "Rheinmetall", label: "Rheinmetall" },
  { value: "General Atomics", label: "General Atomics" },
];

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedManufacturer, setSelectedManufacturer] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [compareMode, setCompareMode] = useState(false);
  const [selectedForCompare, setSelectedForCompare] = useState([]);
  const [showComparison, setShowComparison] = useState(false);

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
        p.product_type.toLowerCase().includes(term)
      );
    }
    
    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, selectedManufacturer, products]);

  const getCategoryIcon = (category) => {
    const cat = CATEGORIES.find(c => c.value === category);
    return cat?.icon || Package;
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

  const getAllMaterials = () => {
    const materials = new Set();
    selectedForCompare.forEach(p => {
      p.materials.forEach(m => materials.add(m));
    });
    return Array.from(materials);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'development':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'retired':
        return 'bg-zinc-800 text-zinc-400 border-zinc-700';
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
    <div data-testid="products-page" className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="font-heading text-3xl font-bold text-white tracking-tight">
          Product Portfolio
        </h1>
        <p className="text-zinc-500 text-sm mt-1">Defense Systems & Equipment Catalog</p>
      </div>

      {/* Compare Mode Bar */}
      {compareMode && (
        <Card className="bg-blue-500/10 border-blue-500/30">
          <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <GitCompare className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-white font-medium">Compare Mode Active</p>
                <p className="text-sm text-zinc-400">
                  Select 2-3 products to compare ({selectedForCompare.length}/3 selected)
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                onClick={startComparison}
                disabled={selectedForCompare.length < 2}
                className="bg-blue-600 hover:bg-blue-700"
                data-testid="start-comparison-btn"
              >
                Compare ({selectedForCompare.length})
              </Button>
              <Button 
                variant="outline" 
                onClick={clearComparison}
                className="border-zinc-700 text-zinc-300"
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
              className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-sm px-3 py-2"
            >
              <span className="text-sm text-white">{product.name}</span>
              <button 
                onClick={() => toggleProductForCompare(product)}
                className="text-zinc-500 hover:text-red-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-zinc-950 border-zinc-800 p-4">
          <p className="text-xs font-mono uppercase tracking-wider text-zinc-500">TOTAL PRODUCTS</p>
          <p className="text-2xl font-mono font-medium text-white mt-2">{products.length}</p>
        </Card>
        <Card className="bg-zinc-950 border-zinc-800 p-4">
          <p className="text-xs font-mono uppercase tracking-wider text-zinc-500">AIRCRAFT</p>
          <p className="text-2xl font-mono font-medium text-blue-500 mt-2">
            {products.filter(p => p.category === 'aircraft').length}
          </p>
        </Card>
        <Card className="bg-zinc-950 border-zinc-800 p-4">
          <p className="text-xs font-mono uppercase tracking-wider text-zinc-500">LAND SYSTEMS</p>
          <p className="text-2xl font-mono font-medium text-green-500 mt-2">
            {products.filter(p => p.category === 'land').length}
          </p>
        </Card>
        <Card className="bg-zinc-950 border-zinc-800 p-4">
          <p className="text-xs font-mono uppercase tracking-wider text-zinc-500">ACTIVE</p>
          <p className="text-2xl font-mono font-medium text-white mt-2">
            {products.filter(p => p.status === 'active').length}
          </p>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600"
            data-testid="search-products"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-48 bg-zinc-900 border-zinc-800 text-white" data-testid="category-filter">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-900 border-zinc-800">
            {CATEGORIES.map(c => (
              <SelectItem key={c.value} value={c.value} className="text-white focus:bg-zinc-800">
                {c.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedManufacturer} onValueChange={setSelectedManufacturer}>
          <SelectTrigger className="w-full sm:w-48 bg-zinc-900 border-zinc-800 text-white" data-testid="manufacturer-filter">
            <SelectValue placeholder="Manufacturer" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-900 border-zinc-800">
            {MANUFACTURERS.map(m => (
              <SelectItem key={m.value} value={m.value} className="text-white focus:bg-zinc-800">
                {m.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          variant={compareMode ? "default" : "outline"}
          onClick={() => setCompareMode(!compareMode)}
          className={compareMode ? "bg-blue-600 hover:bg-blue-700" : "border-zinc-700 text-zinc-300 hover:text-white"}
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
          return (
            <Card 
              key={product.id}
              className={`bg-zinc-950 border-zinc-800 hover:border-zinc-700 transition-colors cursor-pointer overflow-hidden ${
                isSelectedForCompare ? 'ring-2 ring-blue-500 border-blue-500' : ''
              }`}
              onClick={() => compareMode ? toggleProductForCompare(product) : setSelectedProduct(product)}
              data-testid={`product-card-${product.id}`}
            >
              {/* Image or Placeholder */}
              <div className="h-40 bg-zinc-900 relative">
                {product.image_url ? (
                  <img 
                    src={product.image_url} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-950">
                    <Icon className="w-16 h-16 text-zinc-700" />
                  </div>
                )}
                <span className={`absolute top-2 right-2 text-xs font-mono px-2 py-0.5 rounded-full border ${getStatusStyle(product.status)}`}>
                  {product.status.toUpperCase()}
                </span>
                {compareMode && (
                  <div className={`absolute top-2 left-2 w-6 h-6 rounded-sm flex items-center justify-center ${
                    isSelectedForCompare ? 'bg-blue-600' : 'bg-zinc-800 border border-zinc-700'
                  }`}>
                    {isSelectedForCompare && <Check className="w-4 h-4 text-white" />}
                  </div>
                )}
              </div>
              
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="text-white font-medium text-sm">{product.name}</h3>
                    <p className="text-xs text-zinc-500 flex items-center gap-1 mt-1">
                      <Building2 className="w-3 h-3" />
                      {product.manufacturer}
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mt-3">
                  <span className="text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full capitalize">
                    {product.category}
                  </span>
                  <span className="text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full capitalize">
                    {product.product_type.replace('_', ' ')}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12 text-zinc-500">
          No products found matching your criteria
        </div>
      )}

      {/* Comparison Modal */}
      {showComparison && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto"
          onClick={() => setShowComparison(false)}
        >
          <Card 
            className="bg-zinc-950 border-zinc-800 w-full max-w-6xl my-8"
            onClick={(e) => e.stopPropagation()}
            data-testid="comparison-modal"
          >
            <CardHeader className="border-b border-zinc-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <GitCompare className="w-6 h-6 text-blue-500" />
                  <CardTitle className="font-heading text-xl text-white">Product Comparison</CardTitle>
                </div>
                <Button 
                  variant="ghost" 
                  onClick={() => setShowComparison(false)}
                  className="text-zinc-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6 overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-zinc-800">
                    <th className="text-left text-xs font-mono uppercase tracking-wider text-zinc-500 p-4 w-40">
                      ATTRIBUTE
                    </th>
                    {selectedForCompare.map(product => (
                      <th key={product.id} className="text-center p-4">
                        <div className="flex flex-col items-center gap-2">
                          {product.image_url ? (
                            <img 
                              src={product.image_url} 
                              alt={product.name}
                              className="w-20 h-20 object-cover rounded-sm"
                            />
                          ) : (
                            <div className="w-20 h-20 bg-zinc-800 rounded-sm flex items-center justify-center">
                              {(() => {
                                const Icon = getCategoryIcon(product.category);
                                return <Icon className="w-10 h-10 text-zinc-600" />;
                              })()}
                            </div>
                          )}
                          <span className="text-white font-medium text-sm">{product.name}</span>
                          <span className="text-xs text-zinc-500">{product.manufacturer}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Category */}
                  <tr className="border-b border-zinc-800/50">
                    <td className="p-4 text-xs font-mono uppercase tracking-wider text-zinc-500">Category</td>
                    {selectedForCompare.map(product => (
                      <td key={product.id} className="p-4 text-center">
                        <span className="text-sm text-white capitalize">{product.category}</span>
                      </td>
                    ))}
                  </tr>
                  {/* Type */}
                  <tr className="border-b border-zinc-800/50">
                    <td className="p-4 text-xs font-mono uppercase tracking-wider text-zinc-500">Type</td>
                    {selectedForCompare.map(product => (
                      <td key={product.id} className="p-4 text-center">
                        <span className="text-sm text-white capitalize">{product.product_type.replace('_', ' ')}</span>
                      </td>
                    ))}
                  </tr>
                  {/* Status */}
                  <tr className="border-b border-zinc-800/50">
                    <td className="p-4 text-xs font-mono uppercase tracking-wider text-zinc-500">Status</td>
                    {selectedForCompare.map(product => (
                      <td key={product.id} className="p-4 text-center">
                        <span className={`text-xs font-mono px-2 py-0.5 rounded-full border ${getStatusStyle(product.status)}`}>
                          {product.status.toUpperCase()}
                        </span>
                      </td>
                    ))}
                  </tr>
                  {/* Specifications */}
                  {getAllSpecKeys().map(specKey => (
                    <tr key={specKey} className="border-b border-zinc-800/50">
                      <td className="p-4 text-xs font-mono uppercase tracking-wider text-zinc-500">
                        {specKey.replace('_', ' ')}
                      </td>
                      {selectedForCompare.map(product => (
                        <td key={product.id} className="p-4 text-center">
                          <span className="text-sm font-mono text-white">
                            {product.specifications[specKey] || '-'}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                  {/* Materials */}
                  <tr className="border-b border-zinc-800/50">
                    <td className="p-4 text-xs font-mono uppercase tracking-wider text-zinc-500">Materials</td>
                    {selectedForCompare.map(product => (
                      <td key={product.id} className="p-4">
                        <div className="flex flex-wrap justify-center gap-1">
                          {product.materials.map((m, idx) => (
                            <span key={idx} className="text-xs bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded-full">
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
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto"
          onClick={() => setSelectedProduct(null)}
        >
          <Card 
            className="bg-zinc-950 border-zinc-800 w-full max-w-2xl my-8"
            onClick={(e) => e.stopPropagation()}
            data-testid="product-detail-modal"
          >
            {/* Header Image */}
            <div className="h-48 bg-zinc-900 relative">
              {selectedProduct.image_url ? (
                <img 
                  src={selectedProduct.image_url} 
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-950">
                  {(() => {
                    const Icon = getCategoryIcon(selectedProduct.category);
                    return <Icon className="w-24 h-24 text-zinc-700" />;
                  })()}
                </div>
              )}
              <span className={`absolute top-4 right-4 text-xs font-mono px-3 py-1 rounded-full border ${getStatusStyle(selectedProduct.status)}`}>
                {selectedProduct.status.toUpperCase()}
              </span>
            </div>
            
            <CardContent className="p-6 space-y-6">
              {/* Title */}
              <div>
                <h2 className="font-heading text-2xl font-bold text-white">{selectedProduct.name}</h2>
                <p className="text-zinc-400 flex items-center gap-2 mt-1">
                  <Building2 className="w-4 h-4" />
                  {selectedProduct.manufacturer}
                </p>
              </div>
              
              {/* Type Tags */}
              <div className="flex flex-wrap gap-2">
                <span className="text-sm bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-full capitalize">
                  {selectedProduct.category}
                </span>
                <span className="text-sm bg-zinc-800 text-zinc-300 border border-zinc-700 px-3 py-1 rounded-full capitalize">
                  {selectedProduct.product_type.replace('_', ' ')}
                </span>
              </div>
              
              {/* Specifications */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-500 mb-3">
                  TECHNICAL SPECIFICATIONS
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(selectedProduct.specifications).map(([key, value]) => (
                    <div key={key} className="bg-zinc-900 border border-zinc-800 p-3 rounded-sm">
                      <p className="text-xs font-mono uppercase tracking-wider text-zinc-500">
                        {key.replace('_', ' ')}
                      </p>
                      <p className="text-white font-mono mt-1">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Materials */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-500 mb-3">
                  MATERIALS & COMPOSITES
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.materials.map((material, idx) => (
                    <span key={idx} className="text-sm bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full">
                      {material}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
