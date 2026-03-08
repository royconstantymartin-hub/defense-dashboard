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
import { Search, Package, Building2, Plane, Ship, Target, Cpu, Rocket, Shield } from "lucide-react";

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
      </div>

      {/* Products Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" data-testid="products-grid">
        {filteredProducts.map((product) => {
          const Icon = getCategoryIcon(product.category);
          return (
            <Card 
              key={product.id}
              className="bg-zinc-950 border-zinc-800 hover:border-zinc-700 transition-colors cursor-pointer overflow-hidden"
              onClick={() => setSelectedProduct(product)}
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
