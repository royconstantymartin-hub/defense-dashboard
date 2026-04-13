import { useEffect, useState } from "react";
import axios from "axios";
import { API, useAuth, useT } from "@/App";
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
  Lock,
  Database,
  RefreshCw,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

export default function Admin() {
  const { user, token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [seedResult, setSeedResult] = useState(null);

  const tDbTab      = useT({ en: "Database",                                    fr: "Base de données" });
  const tDbTitle    = useT({ en: "Database Initialization",                     fr: "Initialisation de la base de données" });
  const tDbDesc     = useT({ en: "Load reference data: companies, M&A, expenditures, regulations, contracts, products.", fr: "Charge les données de référence : entreprises, M&A, dépenses, réglementations, contrats, produits." });
  const tNote1      = useT({ en: "• Idempotent — existing entries are not overwritten",       fr: "• Opération idempotente — les entrées existantes ne sont pas écrasées" });
  const tNote2      = useT({ en: "• M&A records are upserted (existing data enriched)",       fr: "• Les M&A sont upsertés (enrichissement des données existantes)" });
  const tNote3      = useT({ en: "• Admin role required",                                     fr: "• Rôle admin requis" });
  const tSeedBtn    = useT({ en: "Initialize Database",                          fr: "Initialiser la base de données" });
  const tSeeding    = useT({ en: "Initializing…",                                fr: "Initialisation en cours…" });
  const tSeedOk     = useT({ en: "Success",                                      fr: "Succès" });
  const tCompanies  = useT({ en: "companies",                                    fr: "entreprises" });
  const tAnnoun     = useT({ en: "announcements",                                fr: "annonces" });
  const tContracts  = useT({ en: "contracts",                                    fr: "contrats" });

  const authHeaders = {
    Authorization: `Bearer ${token}`
  };

  const handleSeed = async () => {
    setSeeding(true);
    setSeedResult(null);
    try {
      const res = await axios.post(`${API}/seed-data`, {}, { headers: authHeaders });
      setSeedResult({ ok: true, data: res.data });
      toast.success(tSeedOk);
    } catch (err) {
      const msg = err.response?.data?.detail || err.message;
      setSeedResult({ ok: false, msg });
      toast.error(msg);
    } finally {
      setSeeding(false);
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4" data-testid="admin-login-required">
        <Lock className="w-16 h-16 text-slate-400" />
        <h2 className="font-heading text-xl text-slate-900">Authentication Required</h2>
        <p className="text-slate-500 text-center max-w-md">
          Please login to access the admin panel and manage defense industry data.
        </p>
        <Link to="/login">
          <Button className="bg-purple-700 hover:bg-purple-800">
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
        <h1 className="font-heading text-3xl font-bold text-slate-900 tracking-tight">
          Admin Panel
        </h1>
        <p className="text-slate-500 text-sm mt-1">Manage Defense Industry Data</p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="announcements" className="space-y-6">
        <TabsList className="bg-slate-100 border border-slate-200 p-1 flex-wrap h-auto gap-1">
          <TabsTrigger value="database" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Database className="w-4 h-4 mr-2" />
            {tDbTab}
          </TabsTrigger>
          <TabsTrigger value="announcements" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Newspaper className="w-4 h-4 mr-2" />
            Announcements
          </TabsTrigger>
          <TabsTrigger value="ma" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Handshake className="w-4 h-4 mr-2" />
            M&A
          </TabsTrigger>
          <TabsTrigger value="players" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Building2 className="w-4 h-4 mr-2" />
            Players
          </TabsTrigger>
          <TabsTrigger value="expenditures" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Globe className="w-4 h-4 mr-2" />
            Expenditures
          </TabsTrigger>
          <TabsTrigger value="regulations" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <FileText className="w-4 h-4 mr-2" />
            Regulations
          </TabsTrigger>
          <TabsTrigger value="products" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Package className="w-4 h-4 mr-2" />
            Products
          </TabsTrigger>
        </TabsList>

        {/* Database Tab */}
        <TabsContent value="database">
          <div className="space-y-6 max-w-2xl">
            <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <Database className="w-5 h-5 text-purple-700" />
                </div>
                <div>
                  <h3 className="text-slate-900 font-semibold">{tDbTitle}</h3>
                  <p className="text-slate-500 text-sm">{tDbDesc}</p>
                </div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs text-slate-500 space-y-1">
                <p>{tNote1}</p>
                <p>{tNote2}</p>
                <p>{tNote3}</p>
              </div>
              <button
                onClick={handleSeed}
                disabled={seeding}
                className="flex items-center gap-2 px-4 py-2.5 bg-purple-700 hover:bg-purple-800 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
              >
                {seeding
                  ? <><RefreshCw className="w-4 h-4 animate-spin" /> {tSeeding}</>
                  : <><Database className="w-4 h-4" /> {tSeedBtn}</>
                }
              </button>
              {seedResult && (
                <div className={`flex items-start gap-2 text-sm rounded-lg p-3 border ${
                  seedResult.ok
                    ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                    : "bg-rose-50 border-rose-200 text-rose-600"
                }`}>
                  <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
                  {seedResult.ok ? (
                    <span>
                      {tSeedOk} — {seedResult.data.companies} {tCompanies} · {seedResult.data.announcements} {tAnnoun} · {seedResult.data.contracts} {tContracts}
                    </span>
                  ) : (
                    <span>{seedResult.msg}</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </TabsContent>

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
      <Card className="bg-white border-slate-200">
        <CardHeader className="border-b border-slate-200">
          <CardTitle className="text-slate-900 flex items-center gap-2">
            <Plus className="w-5 h-5" /> Add Announcement
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="text-slate-600">Title</Label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="bg-white border-slate-200 text-slate-900"
                required
              />
            </div>
            <div>
              <Label className="text-slate-600">Content</Label>
              <Textarea
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                className="bg-white border-slate-200 text-slate-900"
                rows={3}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-slate-600">Source</Label>
                <Input
                  value={form.source}
                  onChange={(e) => setForm({ ...form, source: e.target.value })}
                  className="bg-white border-slate-200 text-slate-900"
                  required
                />
              </div>
              <div>
                <Label className="text-slate-600">Category</Label>
                <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                  <SelectTrigger className="bg-white border-slate-200 text-slate-900">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-slate-200">
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="partnership">Partnership</SelectItem>
                    <SelectItem value="product_launch">Product Launch</SelectItem>
                    <SelectItem value="regulatory">Regulatory</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label className="text-slate-600">Company (optional)</Label>
              <Input
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="bg-white border-slate-200 text-slate-900"
              />
            </div>
            <Button type="submit" className="w-full bg-purple-700 hover:bg-purple-800">
              Add Announcement
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-white border-slate-200">
        <CardHeader className="border-b border-slate-200">
          <CardTitle className="text-slate-900">Recent Announcements</CardTitle>
        </CardHeader>
        <CardContent className="pt-4 max-h-[500px] overflow-y-auto">
          <div className="space-y-2">
            {items.slice(0, 10).map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-lg">
                <div className="flex-1 min-w-0">
                  <p className="text-slate-900 text-sm font-medium truncate">{item.title}</p>
                  <p className="text-xs text-slate-500">{item.category}</p>
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
  const [piloting, setPiloting] = useState(false);
  const [pilotResult, setPilotResult] = useState(null);
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

  const handlePilotSeed = async () => {
    if (!window.confirm("Ceci va SUPPRIMER tous les deals M&A existants et les remplacer par les 15 deals pilotes. Confirmer ?")) return;
    setPiloting(true);
    setPilotResult(null);
    try {
      const res = await axios.post(`${API}/ma-activities/seed-pilot`, {}, { headers: authHeaders });
      setPilotResult({ ok: true, data: res.data });
      toast.success(`Pilot chargé — ${res.data.deals} deals`);
      fetchItems();
    } catch (err) {
      const msg = err.response?.data?.detail || err.message;
      setPilotResult({ ok: false, msg });
      toast.error(msg);
    } finally {
      setPiloting(false);
    }
  };

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
    <div className="space-y-6">
      {/* Pilot Seed Banner */}
      <Card className="bg-white border-amber-200">
        <CardContent className="pt-4 pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <p className="text-slate-900 font-semibold text-sm">M&A Pilot — 15 deals curatés</p>
              <p className="text-slate-500 text-xs mt-0.5">
                Réinitialise la collection avec 15 deals vérifiés (logos, sources, rationale). Supprime tous les deals existants.
              </p>
              {pilotResult && (
                <p className={`text-xs mt-1 font-medium ${pilotResult.ok ? "text-emerald-600" : "text-rose-600"}`}>
                  {pilotResult.ok ? `✓ ${pilotResult.data.deals} deals chargés` : pilotResult.msg}
                </p>
              )}
            </div>
            <button
              onClick={handlePilotSeed}
              disabled={piloting}
              className="shrink-0 flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
            >
              {piloting
                ? <><RefreshCw className="w-4 h-4 animate-spin" /> Chargement…</>
                : <><Database className="w-4 h-4" /> Charger Pilot 15</>
              }
            </button>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
      <Card className="bg-white border-slate-200">
        <CardHeader className="border-b border-slate-200">
          <CardTitle className="text-slate-900 flex items-center gap-2">
            <Plus className="w-5 h-5" /> Add M&A Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-slate-600">Acquirer</Label>
                <Input
                  value={form.acquirer}
                  onChange={(e) => setForm({ ...form, acquirer: e.target.value })}
                  className="bg-white border-slate-200 text-slate-900"
                  required
                />
              </div>
              <div>
                <Label className="text-slate-600">Target</Label>
                <Input
                  value={form.target}
                  onChange={(e) => setForm({ ...form, target: e.target.value })}
                  className="bg-white border-slate-200 text-slate-900"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label className="text-slate-600">Deal Value (M$)</Label>
                <Input
                  type="number"
                  value={form.deal_value}
                  onChange={(e) => setForm({ ...form, deal_value: parseFloat(e.target.value) })}
                  className="bg-white border-slate-200 text-slate-900"
                  required
                />
              </div>
              <div>
                <Label className="text-slate-600">Status</Label>
                <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                  <SelectTrigger className="bg-white border-slate-200 text-slate-900">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-slate-200">
                    <SelectItem value="announced">Announced</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-slate-600">Type</Label>
                <Select value={form.deal_type} onValueChange={(v) => setForm({ ...form, deal_type: v })}>
                  <SelectTrigger className="bg-white border-slate-200 text-slate-900">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-slate-200">
                    <SelectItem value="acquisition">Acquisition</SelectItem>
                    <SelectItem value="merger">Merger</SelectItem>
                    <SelectItem value="joint_venture">Joint Venture</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label className="text-slate-600">Description</Label>
              <Textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="bg-white border-slate-200 text-slate-900"
                rows={2}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-purple-700 hover:bg-purple-800">
              Add M&A Activity
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-white border-slate-200">
        <CardHeader className="border-b border-slate-200">
          <CardTitle className="text-slate-900">Recent M&A</CardTitle>
        </CardHeader>
        <CardContent className="pt-4 max-h-[500px] overflow-y-auto">
          <div className="space-y-2">
            {items.slice(0, 10).map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-lg">
                <div className="flex-1 min-w-0">
                  <p className="text-slate-900 text-sm font-medium">{item.acquirer} → {item.target}</p>
                  <p className="text-xs text-slate-500">${item.deal_value}M • {item.status}</p>
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
      <Card className="bg-white border-slate-200">
        <CardHeader className="border-b border-slate-200">
          <CardTitle className="text-slate-900 flex items-center gap-2">
            <Plus className="w-5 h-5" /> Add Defense Player
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-slate-600">Company Name</Label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="bg-white border-slate-200 text-slate-900"
                  required
                />
              </div>
              <div>
                <Label className="text-slate-600">Ticker</Label>
                <Input
                  value={form.ticker}
                  onChange={(e) => setForm({ ...form, ticker: e.target.value })}
                  className="bg-white border-slate-200 text-slate-900"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label className="text-slate-600">Country</Label>
                <Input
                  value={form.country}
                  onChange={(e) => setForm({ ...form, country: e.target.value })}
                  className="bg-white border-slate-200 text-slate-900"
                  required
                />
              </div>
              <div>
                <Label className="text-slate-600">Market Cap (B$)</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={form.market_cap}
                  onChange={(e) => setForm({ ...form, market_cap: parseFloat(e.target.value) })}
                  className="bg-white border-slate-200 text-slate-900"
                  required
                />
              </div>
              <div>
                <Label className="text-slate-600">Stock Price ($)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={form.stock_price}
                  onChange={(e) => setForm({ ...form, stock_price: parseFloat(e.target.value) })}
                  className="bg-white border-slate-200 text-slate-900"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label className="text-slate-600">Change %</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={form.change_percent}
                  onChange={(e) => setForm({ ...form, change_percent: parseFloat(e.target.value) })}
                  className="bg-white border-slate-200 text-slate-900"
                />
              </div>
              <div>
                <Label className="text-slate-600">Revenue (B$)</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={form.revenue}
                  onChange={(e) => setForm({ ...form, revenue: parseFloat(e.target.value) })}
                  className="bg-white border-slate-200 text-slate-900"
                  required
                />
              </div>
              <div>
                <Label className="text-slate-600">Employees</Label>
                <Input
                  type="number"
                  value={form.employees}
                  onChange={(e) => setForm({ ...form, employees: parseInt(e.target.value) })}
                  className="bg-white border-slate-200 text-slate-900"
                  required
                />
              </div>
            </div>
            <div>
              <Label className="text-slate-600">Specializations</Label>
              <div className="flex gap-2">
                <Input
                  value={specInput}
                  onChange={(e) => setSpecInput(e.target.value)}
                  className="bg-white border-slate-200 text-slate-900"
                  placeholder="Add specialization"
                />
                <Button type="button" onClick={addSpec} variant="secondary">Add</Button>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {form.specializations.map((s, i) => (
                  <span key={i} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full border border-slate-200">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <Button type="submit" className="w-full bg-purple-700 hover:bg-purple-800">
              Add Player
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-white border-slate-200">
        <CardHeader className="border-b border-slate-200">
          <CardTitle className="text-slate-900">Defense Players</CardTitle>
        </CardHeader>
        <CardContent className="pt-4 max-h-[500px] overflow-y-auto">
          <div className="space-y-2">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-lg">
                <div className="flex-1 min-w-0">
                  <p className="text-slate-900 text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-slate-500">{item.ticker} • ${item.market_cap}B</p>
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
      <Card className="bg-white border-slate-200">
        <CardHeader className="border-b border-slate-200">
          <CardTitle className="text-slate-900 flex items-center gap-2">
            <Plus className="w-5 h-5" /> Add Expenditure
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-slate-600">Country</Label>
                <Input
                  value={form.country}
                  onChange={(e) => setForm({ ...form, country: e.target.value })}
                  className="bg-white border-slate-200 text-slate-900"
                  required
                />
              </div>
              <div>
                <Label className="text-slate-600">Country Code</Label>
                <Input
                  value={form.country_code}
                  onChange={(e) => setForm({ ...form, country_code: e.target.value })}
                  className="bg-white border-slate-200 text-slate-900"
                  maxLength={2}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label className="text-slate-600">Year</Label>
                <Input
                  type="number"
                  value={form.year}
                  onChange={(e) => setForm({ ...form, year: parseInt(e.target.value) })}
                  className="bg-white border-slate-200 text-slate-900"
                  required
                />
              </div>
              <div>
                <Label className="text-slate-600">Expenditure (B$)</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={form.expenditure}
                  onChange={(e) => setForm({ ...form, expenditure: parseFloat(e.target.value) })}
                  className="bg-white border-slate-200 text-slate-900"
                  required
                />
              </div>
              <div>
                <Label className="text-slate-600">% of GDP</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={form.gdp_percent}
                  onChange={(e) => setForm({ ...form, gdp_percent: parseFloat(e.target.value) })}
                  className="bg-white border-slate-200 text-slate-900"
                  required
                />
              </div>
            </div>
            <div>
              <Label className="text-slate-600">Region</Label>
              <Select value={form.region} onValueChange={(v) => setForm({ ...form, region: v })}>
                <SelectTrigger className="bg-white border-slate-200 text-slate-900">
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent className="bg-white border-slate-200">
                  <SelectItem value="North America">North America</SelectItem>
                  <SelectItem value="Europe">Europe</SelectItem>
                  <SelectItem value="Asia-Pacific">Asia-Pacific</SelectItem>
                  <SelectItem value="Middle East">Middle East</SelectItem>
                  <SelectItem value="South America">South America</SelectItem>
                  <SelectItem value="Africa">Africa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full bg-purple-700 hover:bg-purple-800">
              Add Expenditure
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-white border-slate-200">
        <CardHeader className="border-b border-slate-200">
          <CardTitle className="text-slate-900">Expenditure Data</CardTitle>
        </CardHeader>
        <CardContent className="pt-4 max-h-[500px] overflow-y-auto">
          <div className="space-y-2">
            {items.slice(0, 15).map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-lg">
                <div className="flex-1 min-w-0">
                  <p className="text-slate-900 text-sm font-medium">{item.country}</p>
                  <p className="text-xs text-slate-500">${item.expenditure}B • {item.gdp_percent}% GDP</p>
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
      <Card className="bg-white border-slate-200">
        <CardHeader className="border-b border-slate-200">
          <CardTitle className="text-slate-900 flex items-center gap-2">
            <Plus className="w-5 h-5" /> Add Regulation
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="text-slate-600">Title</Label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="bg-white border-slate-200 text-slate-900"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-slate-600">Country</Label>
                <Input
                  value={form.country}
                  onChange={(e) => setForm({ ...form, country: e.target.value })}
                  className="bg-white border-slate-200 text-slate-900"
                  required
                />
              </div>
              <div>
                <Label className="text-slate-600">Category</Label>
                <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                  <SelectTrigger className="bg-white border-slate-200 text-slate-900">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-slate-200">
                    <SelectItem value="offset">Offset</SelectItem>
                    <SelectItem value="export_control">Export Control</SelectItem>
                    <SelectItem value="procurement">Procurement</SelectItem>
                    <SelectItem value="itar">ITAR</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label className="text-slate-600">Description</Label>
              <Textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="bg-white border-slate-200 text-slate-900"
                rows={2}
                required
              />
            </div>
            <div>
              <Label className="text-slate-600">Effective Date</Label>
              <Input
                type="date"
                value={form.effective_date}
                onChange={(e) => setForm({ ...form, effective_date: e.target.value })}
                className="bg-white border-slate-200 text-slate-900"
                required
              />
            </div>
            <div>
              <Label className="text-slate-600">Requirements</Label>
              <div className="flex gap-2">
                <Input
                  value={reqInput}
                  onChange={(e) => setReqInput(e.target.value)}
                  className="bg-white border-slate-200 text-slate-900"
                  placeholder="Add requirement"
                />
                <Button type="button" onClick={addReq} variant="secondary">Add</Button>
              </div>
              <div className="space-y-1 mt-2">
                {form.requirements.map((r, i) => (
                  <p key={i} className="text-xs text-slate-500">• {r}</p>
                ))}
              </div>
            </div>
            <Button type="submit" className="w-full bg-purple-700 hover:bg-purple-800">
              Add Regulation
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-white border-slate-200">
        <CardHeader className="border-b border-slate-200">
          <CardTitle className="text-slate-900">Regulations</CardTitle>
        </CardHeader>
        <CardContent className="pt-4 max-h-[500px] overflow-y-auto">
          <div className="space-y-2">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-lg">
                <div className="flex-1 min-w-0">
                  <p className="text-slate-900 text-sm font-medium truncate">{item.title}</p>
                  <p className="text-xs text-slate-500">{item.country} • {item.category}</p>
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
      <Card className="bg-white border-slate-200">
        <CardHeader className="border-b border-slate-200">
          <CardTitle className="text-slate-900 flex items-center gap-2">
            <Plus className="w-5 h-5" /> Add Product
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-slate-600">Name</Label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="bg-white border-slate-200 text-slate-900"
                  required
                />
              </div>
              <div>
                <Label className="text-slate-600">Manufacturer</Label>
                <Input
                  value={form.manufacturer}
                  onChange={(e) => setForm({ ...form, manufacturer: e.target.value })}
                  className="bg-white border-slate-200 text-slate-900"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label className="text-slate-600">Category</Label>
                <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                  <SelectTrigger className="bg-white border-slate-200 text-slate-900">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-slate-200">
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
                <Label className="text-slate-600">Product Type</Label>
                <Input
                  value={form.product_type}
                  onChange={(e) => setForm({ ...form, product_type: e.target.value })}
                  className="bg-white border-slate-200 text-slate-900"
                  placeholder="e.g. fighter"
                  required
                />
              </div>
              <div>
                <Label className="text-slate-600">Status</Label>
                <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                  <SelectTrigger className="bg-white border-slate-200 text-slate-900">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-slate-200">
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="development">Development</SelectItem>
                    <SelectItem value="retired">Retired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label className="text-slate-600">Image URL (optional)</Label>
              <Input
                value={form.image_url}
                onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                className="bg-white border-slate-200 text-slate-900"
                placeholder="https://..."
              />
            </div>
            <div>
              <Label className="text-slate-600">Specifications</Label>
              <div className="flex gap-2">
                <Input
                  value={specKey}
                  onChange={(e) => setSpecKey(e.target.value)}
                  className="bg-white border-slate-200 text-slate-900"
                  placeholder="Key"
                />
                <Input
                  value={specValue}
                  onChange={(e) => setSpecValue(e.target.value)}
                  className="bg-white border-slate-200 text-slate-900"
                  placeholder="Value"
                />
                <Button type="button" onClick={addSpec} variant="secondary">Add</Button>
              </div>
              <div className="mt-2 space-y-1">
                {Object.entries(form.specifications).map(([k, v]) => (
                  <p key={k} className="text-xs text-slate-500">{k}: {v}</p>
                ))}
              </div>
            </div>
            <div>
              <Label className="text-slate-600">Materials</Label>
              <div className="flex gap-2">
                <Input
                  value={materialInput}
                  onChange={(e) => setMaterialInput(e.target.value)}
                  className="bg-white border-slate-200 text-slate-900"
                  placeholder="Add material"
                />
                <Button type="button" onClick={addMaterial} variant="secondary">Add</Button>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {form.materials.map((m, i) => (
                  <span key={i} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full border border-slate-200">{m}</span>
                ))}
              </div>
            </div>
            <Button type="submit" className="w-full bg-purple-700 hover:bg-purple-800">
              Add Product
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-white border-slate-200">
        <CardHeader className="border-b border-slate-200">
          <CardTitle className="text-slate-900">Products</CardTitle>
        </CardHeader>
        <CardContent className="pt-4 max-h-[500px] overflow-y-auto">
          <div className="space-y-2">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-lg">
                <div className="flex-1 min-w-0">
                  <p className="text-slate-900 text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-slate-500">{item.manufacturer} • {item.category}</p>
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
