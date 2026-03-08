import { useEffect, useState } from "react";
import axios from "axios";
import { API, useAuth } from "@/App";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  Plus, 
  Trash2, 
  Newspaper, 
  Handshake, 
  Building2, 
  Globe, 
  FileText, 
  Package,
  Lock
} from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

export default function Admin() {
  const { user, token } = useAuth();
  const [loading, setLoading] = useState(false);

  const authHeaders = {
    Authorization: `Bearer ${token}`
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4" data-testid="admin-login-required">
        <Lock className="w-16 h-16 text-zinc-700" />
        <h2 className="font-heading text-xl text-white">Authentication Required</h2>
        <p className="text-zinc-500 text-center max-w-md">
          Please login to access the admin panel and manage defense industry data.
        </p>
        <Link to="/login">
          <Button className="bg-blue-600 hover:bg-blue-700">
            Login to Continue
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div data-testid="admin-page" className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="font-heading text-3xl font-bold text-white tracking-tight">
          Admin Panel
        </h1>
        <p className="text-zinc-500 text-sm mt-1">Manage Defense Industry Data</p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="announcements" className="space-y-6">
        <TabsList className="bg-zinc-900 border border-zinc-800 p-1">
          <TabsTrigger value="announcements" className="data-[state=active]:bg-zinc-800">
            <Newspaper className="w-4 h-4 mr-2" />
            Announcements
          </TabsTrigger>
          <TabsTrigger value="ma" className="data-[state=active]:bg-zinc-800">
            <Handshake className="w-4 h-4 mr-2" />
            M&A
          </TabsTrigger>
          <TabsTrigger value="players" className="data-[state=active]:bg-zinc-800">
            <Building2 className="w-4 h-4 mr-2" />
            Players
          </TabsTrigger>
          <TabsTrigger value="expenditures" className="data-[state=active]:bg-zinc-800">
            <Globe className="w-4 h-4 mr-2" />
            Expenditures
          </TabsTrigger>
          <TabsTrigger value="regulations" className="data-[state=active]:bg-zinc-800">
            <FileText className="w-4 h-4 mr-2" />
            Regulations
          </TabsTrigger>
          <TabsTrigger value="products" className="data-[state=active]:bg-zinc-800">
            <Package className="w-4 h-4 mr-2" />
            Products
          </TabsTrigger>
        </TabsList>

        {/* Announcements Tab */}
        <TabsContent value="announcements">
          <AnnouncementsAdmin authHeaders={authHeaders} />
        </TabsContent>

        {/* M&A Tab */}
        <TabsContent value="ma">
          <MAAdmin authHeaders={authHeaders} />
        </TabsContent>

        {/* Players Tab */}
        <TabsContent value="players">
          <PlayersAdmin authHeaders={authHeaders} />
        </TabsContent>

        {/* Expenditures Tab */}
        <TabsContent value="expenditures">
          <ExpendituresAdmin authHeaders={authHeaders} />
        </TabsContent>

        {/* Regulations Tab */}
        <TabsContent value="regulations">
          <RegulationsAdmin authHeaders={authHeaders} />
        </TabsContent>

        {/* Products Tab */}
        <TabsContent value="products">
          <ProductsAdmin authHeaders={authHeaders} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Announcements Admin Component
function AnnouncementsAdmin({ authHeaders }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    content: "",
    source: "",
    category: "contract",
    company: ""
  });

  const fetchItems = async () => {
    try {
      const res = await axios.get(`${API}/announcements`);
      setItems(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/announcements`, form, { headers: authHeaders });
      toast.success("Announcement created!");
      setForm({ title: "", content: "", source: "", category: "contract", company: "" });
      fetchItems();
    } catch (err) {
      toast.error("Failed to create announcement");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/announcements/${id}`, { headers: authHeaders });
      toast.success("Announcement deleted!");
      fetchItems();
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Card className="bg-zinc-950 border-zinc-800">
        <CardHeader className="border-b border-zinc-800">
          <CardTitle className="text-white flex items-center gap-2">
            <Plus className="w-5 h-5" /> Add Announcement
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="text-zinc-400">Title</Label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="bg-zinc-900 border-zinc-800 text-white"
                required
              />
            </div>
            <div>
              <Label className="text-zinc-400">Content</Label>
              <Textarea
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                className="bg-zinc-900 border-zinc-800 text-white"
                rows={3}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-zinc-400">Source</Label>
                <Input
                  value={form.source}
                  onChange={(e) => setForm({ ...form, source: e.target.value })}
                  className="bg-zinc-900 border-zinc-800 text-white"
                  required
                />
              </div>
              <div>
                <Label className="text-zinc-400">Category</Label>
                <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                  <SelectTrigger className="bg-zinc-900 border-zinc-800 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-800">
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="partnership">Partnership</SelectItem>
                    <SelectItem value="product_launch">Product Launch</SelectItem>
                    <SelectItem value="regulatory">Regulatory</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label className="text-zinc-400">Company (optional)</Label>
              <Input
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="bg-zinc-900 border-zinc-800 text-white"
              />
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Add Announcement
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-zinc-950 border-zinc-800">
        <CardHeader className="border-b border-zinc-800">
          <CardTitle className="text-white">Recent Announcements</CardTitle>
        </CardHeader>
        <CardContent className="pt-4 max-h-[500px] overflow-y-auto">
          <div className="space-y-2">
            {items.slice(0, 10).map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-zinc-900 rounded-sm">
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm truncate">{item.title}</p>
                  <p className="text-xs text-zinc-500">{item.category}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// M&A Admin Component
function MAAdmin({ authHeaders }) {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    acquirer: "",
    target: "",
    deal_value: 0,
    status: "announced",
    deal_type: "acquisition",
    description: ""
  });

  const fetchItems = async () => {
    const res = await axios.get(`${API}/ma-activities`);
    setItems(res.data);
  };

  useEffect(() => { fetchItems(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/ma-activities`, form, { headers: authHeaders });
      toast.success("M&A activity created!");
      setForm({ acquirer: "", target: "", deal_value: 0, status: "announced", deal_type: "acquisition", description: "" });
      fetchItems();
    } catch (err) {
      toast.error("Failed to create");
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/ma-activities/${id}`, { headers: authHeaders });
    toast.success("Deleted!");
    fetchItems();
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Card className="bg-zinc-950 border-zinc-800">
        <CardHeader className="border-b border-zinc-800">
          <CardTitle className="text-white flex items-center gap-2">
            <Plus className="w-5 h-5" /> Add M&A Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-zinc-400">Acquirer</Label>
                <Input
                  value={form.acquirer}
                  onChange={(e) => setForm({ ...form, acquirer: e.target.value })}
                  className="bg-zinc-900 border-zinc-800 text-white"
                  required
                />
              </div>
              <div>
                <Label className="text-zinc-400">Target</Label>
                <Input
                  value={form.target}
                  onChange={(e) => setForm({ ...form, target: e.target.value })}
                  className="bg-zinc-900 border-zinc-800 text-white"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label className="text-zinc-400">Deal Value (M$)</Label>
                <Input
                  type="number"
                  value={form.deal_value}
                  onChange={(e) => setForm({ ...form, deal_value: parseFloat(e.target.value) })}
                  className="bg-zinc-900 border-zinc-800 text-white"
                  required
                />
              </div>
              <div>
                <Label className="text-zinc-400">Status</Label>
                <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                  <SelectTrigger className="bg-zinc-900 border-zinc-800 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-800">
                    <SelectItem value="announced">Announced</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-zinc-400">Type</Label>
                <Select value={form.deal_type} onValueChange={(v) => setForm({ ...form, deal_type: v })}>
                  <SelectTrigger className="bg-zinc-900 border-zinc-800 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-800">
                    <SelectItem value="acquisition">Acquisition</SelectItem>
                    <SelectItem value="merger">Merger</SelectItem>
                    <SelectItem value="joint_venture">Joint Venture</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label className="text-zinc-400">Description</Label>
              <Textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="bg-zinc-900 border-zinc-800 text-white"
                rows={2}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Add M&A Activity
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-zinc-950 border-zinc-800">
        <CardHeader className="border-b border-zinc-800">
          <CardTitle className="text-white">Recent M&A</CardTitle>
        </CardHeader>
        <CardContent className="pt-4 max-h-[500px] overflow-y-auto">
          <div className="space-y-2">
            {items.slice(0, 10).map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-zinc-900 rounded-sm">
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm">{item.acquirer} → {item.target}</p>
                  <p className="text-xs text-zinc-500">${item.deal_value}M • {item.status}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Players Admin Component
function PlayersAdmin({ authHeaders }) {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    name: "",
    ticker: "",
    country: "",
    market_cap: 0,
    stock_price: 0,
    change_percent: 0,
    revenue: 0,
    employees: 0,
    specializations: []
  });
  const [specInput, setSpecInput] = useState("");

  const fetchItems = async () => {
    const res = await axios.get(`${API}/defense-players`);
    setItems(res.data);
  };

  useEffect(() => { fetchItems(); }, []);

  const addSpec = () => {
    if (specInput.trim()) {
      setForm({ ...form, specializations: [...form.specializations, specInput.trim()] });
      setSpecInput("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/defense-players`, form, { headers: authHeaders });
      toast.success("Player created!");
      setForm({ name: "", ticker: "", country: "", market_cap: 0, stock_price: 0, change_percent: 0, revenue: 0, employees: 0, specializations: [] });
      fetchItems();
    } catch (err) {
      toast.error("Failed to create");
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/defense-players/${id}`, { headers: authHeaders });
    toast.success("Deleted!");
    fetchItems();
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Card className="bg-zinc-950 border-zinc-800">
        <CardHeader className="border-b border-zinc-800">
          <CardTitle className="text-white flex items-center gap-2">
            <Plus className="w-5 h-5" /> Add Defense Player
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-zinc-400">Company Name</Label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="bg-zinc-900 border-zinc-800 text-white"
                  required
                />
              </div>
              <div>
                <Label className="text-zinc-400">Ticker</Label>
                <Input
                  value={form.ticker}
                  onChange={(e) => setForm({ ...form, ticker: e.target.value })}
                  className="bg-zinc-900 border-zinc-800 text-white"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label className="text-zinc-400">Country</Label>
                <Input
                  value={form.country}
                  onChange={(e) => setForm({ ...form, country: e.target.value })}
                  className="bg-zinc-900 border-zinc-800 text-white"
                  required
                />
              </div>
              <div>
                <Label className="text-zinc-400">Market Cap (B$)</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={form.market_cap}
                  onChange={(e) => setForm({ ...form, market_cap: parseFloat(e.target.value) })}
                  className="bg-zinc-900 border-zinc-800 text-white"
                  required
                />
              </div>
              <div>
                <Label className="text-zinc-400">Stock Price ($)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={form.stock_price}
                  onChange={(e) => setForm({ ...form, stock_price: parseFloat(e.target.value) })}
                  className="bg-zinc-900 border-zinc-800 text-white"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label className="text-zinc-400">Change %</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={form.change_percent}
                  onChange={(e) => setForm({ ...form, change_percent: parseFloat(e.target.value) })}
                  className="bg-zinc-900 border-zinc-800 text-white"
                />
              </div>
              <div>
                <Label className="text-zinc-400">Revenue (B$)</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={form.revenue}
                  onChange={(e) => setForm({ ...form, revenue: parseFloat(e.target.value) })}
                  className="bg-zinc-900 border-zinc-800 text-white"
                  required
                />
              </div>
              <div>
                <Label className="text-zinc-400">Employees</Label>
                <Input
                  type="number"
                  value={form.employees}
                  onChange={(e) => setForm({ ...form, employees: parseInt(e.target.value) })}
                  className="bg-zinc-900 border-zinc-800 text-white"
                  required
                />
              </div>
            </div>
            <div>
              <Label className="text-zinc-400">Specializations</Label>
              <div className="flex gap-2">
                <Input
                  value={specInput}
                  onChange={(e) => setSpecInput(e.target.value)}
                  className="bg-zinc-900 border-zinc-800 text-white"
                  placeholder="Add specialization"
                />
                <Button type="button" onClick={addSpec} variant="secondary">Add</Button>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {form.specializations.map((s, i) => (
                  <span key={i} className="text-xs bg-zinc-800 text-zinc-300 px-2 py-1 rounded-full">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Add Player
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-zinc-950 border-zinc-800">
        <CardHeader className="border-b border-zinc-800">
          <CardTitle className="text-white">Defense Players</CardTitle>
        </CardHeader>
        <CardContent className="pt-4 max-h-[500px] overflow-y-auto">
          <div className="space-y-2">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-zinc-900 rounded-sm">
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm">{item.name}</p>
                  <p className="text-xs text-zinc-500">{item.ticker} • ${item.market_cap}B</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Expenditures Admin Component
function ExpendituresAdmin({ authHeaders }) {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    country: "",
    country_code: "",
    year: 2024,
    expenditure: 0,
    gdp_percent: 0,
    region: ""
  });

  const fetchItems = async () => {
    const res = await axios.get(`${API}/expenditures`);
    setItems(res.data);
  };

  useEffect(() => { fetchItems(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/expenditures`, form, { headers: authHeaders });
      toast.success("Expenditure created!");
      setForm({ country: "", country_code: "", year: 2024, expenditure: 0, gdp_percent: 0, region: "" });
      fetchItems();
    } catch (err) {
      toast.error("Failed to create");
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/expenditures/${id}`, { headers: authHeaders });
    toast.success("Deleted!");
    fetchItems();
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Card className="bg-zinc-950 border-zinc-800">
        <CardHeader className="border-b border-zinc-800">
          <CardTitle className="text-white flex items-center gap-2">
            <Plus className="w-5 h-5" /> Add Expenditure
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-zinc-400">Country</Label>
                <Input
                  value={form.country}
                  onChange={(e) => setForm({ ...form, country: e.target.value })}
                  className="bg-zinc-900 border-zinc-800 text-white"
                  required
                />
              </div>
              <div>
                <Label className="text-zinc-400">Country Code</Label>
                <Input
                  value={form.country_code}
                  onChange={(e) => setForm({ ...form, country_code: e.target.value })}
                  className="bg-zinc-900 border-zinc-800 text-white"
                  maxLength={2}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label className="text-zinc-400">Year</Label>
                <Input
                  type="number"
                  value={form.year}
                  onChange={(e) => setForm({ ...form, year: parseInt(e.target.value) })}
                  className="bg-zinc-900 border-zinc-800 text-white"
                  required
                />
              </div>
              <div>
                <Label className="text-zinc-400">Expenditure (B$)</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={form.expenditure}
                  onChange={(e) => setForm({ ...form, expenditure: parseFloat(e.target.value) })}
                  className="bg-zinc-900 border-zinc-800 text-white"
                  required
                />
              </div>
              <div>
                <Label className="text-zinc-400">% of GDP</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={form.gdp_percent}
                  onChange={(e) => setForm({ ...form, gdp_percent: parseFloat(e.target.value) })}
                  className="bg-zinc-900 border-zinc-800 text-white"
                  required
                />
              </div>
            </div>
            <div>
              <Label className="text-zinc-400">Region</Label>
              <Select value={form.region} onValueChange={(v) => setForm({ ...form, region: v })}>
                <SelectTrigger className="bg-zinc-900 border-zinc-800 text-white">
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800">
                  <SelectItem value="North America">North America</SelectItem>
                  <SelectItem value="Europe">Europe</SelectItem>
                  <SelectItem value="Asia-Pacific">Asia-Pacific</SelectItem>
                  <SelectItem value="Middle East">Middle East</SelectItem>
                  <SelectItem value="South America">South America</SelectItem>
                  <SelectItem value="Africa">Africa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Add Expenditure
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-zinc-950 border-zinc-800">
        <CardHeader className="border-b border-zinc-800">
          <CardTitle className="text-white">Expenditure Data</CardTitle>
        </CardHeader>
        <CardContent className="pt-4 max-h-[500px] overflow-y-auto">
          <div className="space-y-2">
            {items.slice(0, 15).map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-zinc-900 rounded-sm">
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm">{item.country}</p>
                  <p className="text-xs text-zinc-500">${item.expenditure}B • {item.gdp_percent}% GDP</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Regulations Admin Component
function RegulationsAdmin({ authHeaders }) {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    title: "",
    country: "",
    category: "export_control",
    description: "",
    requirements: [],
    effective_date: ""
  });
  const [reqInput, setReqInput] = useState("");

  const fetchItems = async () => {
    const res = await axios.get(`${API}/regulations`);
    setItems(res.data);
  };

  useEffect(() => { fetchItems(); }, []);

  const addReq = () => {
    if (reqInput.trim()) {
      setForm({ ...form, requirements: [...form.requirements, reqInput.trim()] });
      setReqInput("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/regulations`, form, { headers: authHeaders });
      toast.success("Regulation created!");
      setForm({ title: "", country: "", category: "export_control", description: "", requirements: [], effective_date: "" });
      fetchItems();
    } catch (err) {
      toast.error("Failed to create");
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/regulations/${id}`, { headers: authHeaders });
    toast.success("Deleted!");
    fetchItems();
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Card className="bg-zinc-950 border-zinc-800">
        <CardHeader className="border-b border-zinc-800">
          <CardTitle className="text-white flex items-center gap-2">
            <Plus className="w-5 h-5" /> Add Regulation
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="text-zinc-400">Title</Label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="bg-zinc-900 border-zinc-800 text-white"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-zinc-400">Country</Label>
                <Input
                  value={form.country}
                  onChange={(e) => setForm({ ...form, country: e.target.value })}
                  className="bg-zinc-900 border-zinc-800 text-white"
                  required
                />
              </div>
              <div>
                <Label className="text-zinc-400">Category</Label>
                <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                  <SelectTrigger className="bg-zinc-900 border-zinc-800 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-800">
                    <SelectItem value="offset">Offset</SelectItem>
                    <SelectItem value="export_control">Export Control</SelectItem>
                    <SelectItem value="procurement">Procurement</SelectItem>
                    <SelectItem value="itar">ITAR</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label className="text-zinc-400">Description</Label>
              <Textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="bg-zinc-900 border-zinc-800 text-white"
                rows={2}
                required
              />
            </div>
            <div>
              <Label className="text-zinc-400">Effective Date</Label>
              <Input
                type="date"
                value={form.effective_date}
                onChange={(e) => setForm({ ...form, effective_date: e.target.value })}
                className="bg-zinc-900 border-zinc-800 text-white"
                required
              />
            </div>
            <div>
              <Label className="text-zinc-400">Requirements</Label>
              <div className="flex gap-2">
                <Input
                  value={reqInput}
                  onChange={(e) => setReqInput(e.target.value)}
                  className="bg-zinc-900 border-zinc-800 text-white"
                  placeholder="Add requirement"
                />
                <Button type="button" onClick={addReq} variant="secondary">Add</Button>
              </div>
              <div className="space-y-1 mt-2">
                {form.requirements.map((r, i) => (
                  <p key={i} className="text-xs text-zinc-400">• {r}</p>
                ))}
              </div>
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Add Regulation
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-zinc-950 border-zinc-800">
        <CardHeader className="border-b border-zinc-800">
          <CardTitle className="text-white">Regulations</CardTitle>
        </CardHeader>
        <CardContent className="pt-4 max-h-[500px] overflow-y-auto">
          <div className="space-y-2">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-zinc-900 rounded-sm">
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm truncate">{item.title}</p>
                  <p className="text-xs text-zinc-500">{item.country} • {item.category}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Products Admin Component
function ProductsAdmin({ authHeaders }) {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    name: "",
    manufacturer: "",
    category: "aircraft",
    product_type: "",
    specifications: {},
    materials: [],
    status: "active",
    image_url: ""
  });
  const [specKey, setSpecKey] = useState("");
  const [specValue, setSpecValue] = useState("");
  const [materialInput, setMaterialInput] = useState("");

  const fetchItems = async () => {
    const res = await axios.get(`${API}/products`);
    setItems(res.data);
  };

  useEffect(() => { fetchItems(); }, []);

  const addSpec = () => {
    if (specKey.trim() && specValue.trim()) {
      setForm({ ...form, specifications: { ...form.specifications, [specKey]: specValue } });
      setSpecKey("");
      setSpecValue("");
    }
  };

  const addMaterial = () => {
    if (materialInput.trim()) {
      setForm({ ...form, materials: [...form.materials, materialInput.trim()] });
      setMaterialInput("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/products`, form, { headers: authHeaders });
      toast.success("Product created!");
      setForm({ name: "", manufacturer: "", category: "aircraft", product_type: "", specifications: {}, materials: [], status: "active", image_url: "" });
      fetchItems();
    } catch (err) {
      toast.error("Failed to create");
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/products/${id}`, { headers: authHeaders });
    toast.success("Deleted!");
    fetchItems();
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Card className="bg-zinc-950 border-zinc-800">
        <CardHeader className="border-b border-zinc-800">
          <CardTitle className="text-white flex items-center gap-2">
            <Plus className="w-5 h-5" /> Add Product
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-zinc-400">Name</Label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="bg-zinc-900 border-zinc-800 text-white"
                  required
                />
              </div>
              <div>
                <Label className="text-zinc-400">Manufacturer</Label>
                <Input
                  value={form.manufacturer}
                  onChange={(e) => setForm({ ...form, manufacturer: e.target.value })}
                  className="bg-zinc-900 border-zinc-800 text-white"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label className="text-zinc-400">Category</Label>
                <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                  <SelectTrigger className="bg-zinc-900 border-zinc-800 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-800">
                    <SelectItem value="aircraft">Aircraft</SelectItem>
                    <SelectItem value="naval">Naval</SelectItem>
                    <SelectItem value="land">Land</SelectItem>
                    <SelectItem value="missile">Missile</SelectItem>
                    <SelectItem value="cyber">Cyber</SelectItem>
                    <SelectItem value="space">Space</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-zinc-400">Product Type</Label>
                <Input
                  value={form.product_type}
                  onChange={(e) => setForm({ ...form, product_type: e.target.value })}
                  className="bg-zinc-900 border-zinc-800 text-white"
                  placeholder="e.g. fighter"
                  required
                />
              </div>
              <div>
                <Label className="text-zinc-400">Status</Label>
                <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                  <SelectTrigger className="bg-zinc-900 border-zinc-800 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-800">
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="development">Development</SelectItem>
                    <SelectItem value="retired">Retired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label className="text-zinc-400">Image URL (optional)</Label>
              <Input
                value={form.image_url}
                onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                className="bg-zinc-900 border-zinc-800 text-white"
                placeholder="https://..."
              />
            </div>
            <div>
              <Label className="text-zinc-400">Specifications</Label>
              <div className="flex gap-2">
                <Input
                  value={specKey}
                  onChange={(e) => setSpecKey(e.target.value)}
                  className="bg-zinc-900 border-zinc-800 text-white"
                  placeholder="Key"
                />
                <Input
                  value={specValue}
                  onChange={(e) => setSpecValue(e.target.value)}
                  className="bg-zinc-900 border-zinc-800 text-white"
                  placeholder="Value"
                />
                <Button type="button" onClick={addSpec} variant="secondary">Add</Button>
              </div>
              <div className="mt-2 space-y-1">
                {Object.entries(form.specifications).map(([k, v]) => (
                  <p key={k} className="text-xs text-zinc-400">{k}: {v}</p>
                ))}
              </div>
            </div>
            <div>
              <Label className="text-zinc-400">Materials</Label>
              <div className="flex gap-2">
                <Input
                  value={materialInput}
                  onChange={(e) => setMaterialInput(e.target.value)}
                  className="bg-zinc-900 border-zinc-800 text-white"
                  placeholder="Add material"
                />
                <Button type="button" onClick={addMaterial} variant="secondary">Add</Button>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {form.materials.map((m, i) => (
                  <span key={i} className="text-xs bg-zinc-800 text-zinc-300 px-2 py-1 rounded-full">{m}</span>
                ))}
              </div>
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Add Product
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-zinc-950 border-zinc-800">
        <CardHeader className="border-b border-zinc-800">
          <CardTitle className="text-white">Products</CardTitle>
        </CardHeader>
        <CardContent className="pt-4 max-h-[500px] overflow-y-auto">
          <div className="space-y-2">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-zinc-900 rounded-sm">
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm">{item.name}</p>
                  <p className="text-xs text-zinc-500">{item.manufacturer} • {item.category}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
