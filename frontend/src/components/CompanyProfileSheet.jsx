import { useEffect, useState, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API, useAuth } from "@/App";
import { getLogoUrls } from "@/lib/companyLogos";
import {
  Sheet, SheetContent,
} from "@/components/ui/sheet";
import { format, formatDistanceToNow } from "date-fns";
import {
  Globe, Linkedin, MapPin, Calendar, ArrowRight, ExternalLink,
  Users, TrendingUp, DollarSign, Building2, Newspaper, X,
  StickyNote, Send, Trash2, LogIn, Package, ChevronRight,
  Rocket, Globe2,
} from "lucide-react";

// ── Country → ISO 3166-1 alpha-2 flag code ────────────────────────────────
const COUNTRY_CODES = {
  "USA": "us", "United States": "us",
  "UK": "gb", "United Kingdom": "gb",
  "France": "fr",
  "Germany": "de",
  "Italy": "it",
  "Spain": "es",
  "Israel": "il",
  "Russia": "ru",
  "China": "cn",
  "Japan": "jp",
  "South Korea": "kr",
  "India": "in",
  "Turkey": "tr",
  "Sweden": "se",
  "Norway": "no",
  "Netherlands": "nl",
  "Australia": "au",
  "Canada": "ca",
  "Poland": "pl",
  "Ukraine": "ua",
  "Brazil": "br",
  "South Africa": "za",
  "Singapore": "sg",
  "Switzerland": "ch",
  "Austria": "at",
  "Finland": "fi",
  "Greece": "gr",
  "Portugal": "pt",
  "Belgium": "be",
  "Denmark": "dk",
  "Czech Republic": "cz",
  "Romania": "ro",
  "UAE": "ae",
  "Saudi Arabia": "sa",
  "Estonia": "ee",
};

// ── ISO code → display name (for export markets) ────────────────────────────
const COUNTRY_NAMES = {
  us: "USA", gb: "UK", de: "Germany", it: "Italy",
  es: "Spain", il: "Israel", ru: "Russia", cn: "China", jp: "Japan",
  kr: "South Korea", in: "India", tr: "Turkey", se: "Sweden", no: "Norway",
  nl: "Netherlands", au: "Australia", ca: "Canada", pl: "Poland", ua: "Ukraine",
  br: "Brazil", za: "South Africa", sg: "Singapore", ch: "Switzerland",
  at: "Austria", fi: "Finland", gr: "Greece", pt: "Portugal", be: "Belgium",
  dk: "Denmark", cz: "Czech Rep.", ro: "Romania", ae: "UAE", sa: "Saudi Arabia",
  qa: "Qatar", om: "Oman", kw: "Kuwait", eg: "Egypt", ma: "Morocco",
  in: "India", th: "Thailand", id: "Indonesia", my: "Malaysia", ph: "Philippines",
  nz: "New Zealand", az: "Azerbaijan", hu: "Hungary", bg: "Bulgaria",
  lt: "Lithuania", lv: "Latvia", ee: "Estonia", sk: "Slovakia", hr: "Croatia",
  si: "Slovenia", cy: "Cyprus", mt: "Malta", ke: "Kenya", ng: "Nigeria",
  et: "Ethiopia", ug: "Uganda", dj: "Djibouti", so: "Somalia", pk: "Pakistan",
  co: "Colombia", cl: "Chile", pe: "Peru", ar: "Argentina", tw: "Taiwan",
  sl: "Sierra Leone", bf: "Burkina Faso", ky: "Cayman Is.",
};

// ── helpers ────────────────────────────────────────────────────────────────

const AVATAR_COLORS = [
  "from-purple-600 to-purple-800",
  "from-blue-600 to-blue-800",
  "from-emerald-600 to-emerald-800",
  "from-amber-600 to-amber-800",
  "from-rose-600 to-rose-800",
  "from-indigo-600 to-indigo-800",
  "from-teal-600 to-teal-800",
  "from-orange-600 to-orange-800",
];

const STOCK_PHOTO_DOMAINS = [
  "unsplash.com", "gettyimages.com", "istockphoto.com", "shutterstock.com",
  "depositphotos.com", "pexels.com", "dreamstime.com", "123rf.com",
  "alamy.com", "stock.adobe.com", "pixabay.com", "stocksy.com",
  "canstockphoto.com",
];

function isStockPhoto(url) {
  if (!url) return false;
  const low = url.toLowerCase();
  return STOCK_PHOTO_DOMAINS.some((d) => low.includes(d));
}

const COMPANY_NEWS_STOCK_PHOTOS = {
  CONTRACT: [
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80",
  ],
  TECHNOLOGY: [
    "https://images.unsplash.com/photo-1759610545704-9bbee32cb17c?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=400&q=80",
  ],
  CONFLICT: [
    "https://images.unsplash.com/photo-1668724982255-1a3e0c72b814?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1708342421457-9c59f4843fe1?auto=format&fit=crop&w=400&q=80",
  ],
  POLICY: [
    "https://images.unsplash.com/photo-1742252306330-453455bd7526?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=400&q=80",
  ],
  GEOPOLITICS: [
    "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1531266752426-aad472b7bbf4?auto=format&fit=crop&w=400&q=80",
  ],
  "M&A": [
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=400&q=80",
  ],
  INDUSTRY: [
    "https://images.unsplash.com/photo-1759610545704-9bbee32cb17c?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1708342421457-9c59f4843fe1?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1668724982255-1a3e0c72b814?auto=format&fit=crop&w=400&q=80",
  ],
};

function NewsArticleThumb({ article, wrapperClass, showLogo = true }) {
  const [imgError, setImgError] = useState(false);
  const [logoErr, setLogoErr] = useState(false);
  const photos = COMPANY_NEWS_STOCK_PHOTOS[article.category] || COMPANY_NEWS_STOCK_PHOTOS.INDUSTRY;
  const [photoIdx, setPhotoIdx] = useState(() => {
    const seed = article.url || article.title || "";
    const hash = [...seed].reduce((acc, c) => acc + c.charCodeAt(0), 0);
    return hash % photos.length;
  });
  const [allPhotosFailed, setAllPhotosFailed] = useState(false);

  const domain = (() => { try { return article.url ? new URL(article.url).hostname : ""; } catch { return ""; } })();
  const isGoogleDomain = !domain || domain.includes("google.com");
  const isGoogleLogo = article.sourceLogo?.includes("news.google.com");
  const effectiveLogo = !isGoogleLogo ? article.sourceLogo : null;
  const logoUrl = !logoErr
    ? (effectiveLogo || (!isGoogleDomain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=64` : null))
    : null;

  const displayImage = !imgError && article.image && !isStockPhoto(article.image);

  const handlePhotoError = () => {
    if (photoIdx + 1 < photos.length) setPhotoIdx(photoIdx + 1);
    else setAllPhotosFailed(true);
  };

  return (
    <div className={`relative overflow-hidden ${wrapperClass}`}>
      {displayImage ? (
        <img
          src={article.image}
          alt=""
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={() => setImgError(true)}
        />
      ) : !allPhotosFailed ? (
        <img
          src={photos[photoIdx]}
          alt=""
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={handlePhotoError}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300" />
      )}
      {!displayImage && showLogo && logoUrl && (
        <div className="absolute bottom-1 right-1 w-5 h-5 rounded bg-white/90 flex items-center justify-center shadow-sm">
          <img
            src={logoUrl}
            alt=""
            className="w-3.5 h-3.5 object-contain"
            onError={() => setLogoErr(true)}
          />
        </div>
      )}
    </div>
  );
}

function avatarColor(name = "") {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) & 0xffff;
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
}

function initials(name = "") {
  return name.split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

function CompanyLogo({ name, domain, size = "lg" }) {
  const urls = useMemo(() => {
    const curated = getLogoUrls(name);
    if (curated.length > 0) return curated;
    if (domain) {
      const skipFavicon = [".cn", ".ru"].some((tld) => domain.endsWith(tld));
      return [
        `https://logo.clearbit.com/${domain}`,
        ...(!skipFavicon ? [`https://www.google.com/s2/favicons?domain=https://${domain}&sz=128`] : []),
      ];
    }
    return [];
  }, [name, domain]);
  const [idx, setIdx] = useState(0);
  const sizeClass = size === "lg" ? "w-16 h-16" : "w-10 h-10";
  const textClass = size === "lg" ? "text-xl" : "text-sm";

  useEffect(() => { setIdx(0); }, [name, domain]);

  const imgClass = `${sizeClass} rounded-2xl object-contain bg-white border border-white/20 shadow-lg p-1.5`;

  if (idx < urls.length) {
    return (
      <img src={urls[idx]} alt={name} className={imgClass} onError={() => setIdx((i) => i + 1)} />
    );
  }

  return (
    <div className={`${sizeClass} bg-gradient-to-br ${avatarColor(name)} rounded-2xl flex items-center justify-center shadow-lg shrink-0`}>
      <span className={`${textClass} font-bold text-white tracking-tight`}>{initials(name)}</span>
    </div>
  );
}

function getStatusStyle(status) {
  switch (status) {
    case "completed":    return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "active":       return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "pending":      return "bg-amber-50 text-amber-700 border-amber-200";
    case "under_review": return "bg-orange-50 text-orange-700 border-orange-200";
    case "announced":    return "bg-blue-50 text-blue-700 border-blue-200";
    case "cancelled":    return "bg-rose-50 text-rose-700 border-rose-200";
    case "dissolved":    return "bg-slate-100 text-slate-500 border-slate-200";
    case "exited":       return "bg-purple-50 text-purple-700 border-purple-200";
    default:             return "bg-slate-100 text-slate-600 border-slate-200";
  }
}

function formatValue(dealValue, isDisclosed = true) {
  if (!isDisclosed) return "Undisclosed";
  if (!dealValue || dealValue === 0) return "—";
  return dealValue >= 1000 ? `$${(dealValue / 1000).toFixed(1)}B` : `$${dealValue}M`;
}

function formatStatus(s) {
  const map = { under_review: "Under Review", joint_venture: "Joint Venture" };
  return map[s] ?? (s ? s.charAt(0).toUpperCase() + s.slice(1) : "");
}

function relativeTime(isoStr) {
  try {
    return formatDistanceToNow(new Date(isoStr), { addSuffix: true });
  } catch {
    return "";
  }
}

// ── main component ─────────────────────────────────────────────────────────

export default function CompanyProfileSheet({ name, onClose }) {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [data, setData]         = useState(null);
  const [loading, setLoading]   = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [articles, setArticles] = useState([]);
  const [stockPrice, setStockPrice] = useState(null);
  const [productCount, setProductCount] = useState(null);

  // Analyst notes
  const [notes, setNotes]           = useState([]);
  const [noteText, setNoteText]     = useState("");
  const [notesLoading, setNotesLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const textareaRef = useRef(null);

  // Load notes whenever the company changes and user is logged in
  useEffect(() => {
    if (!name || !token) { setNotes([]); return; }
    setNotesLoading(true);
    axios.get(`${API}/notes`, {
      params: { company_name: name },
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => setNotes(r.data))
      .catch(() => setNotes([]))
      .finally(() => setNotesLoading(false));
  }, [name, token]);

  const submitNote = async () => {
    const content = noteText.trim();
    if (!content || !token) return;
    setSubmitting(true);
    try {
      const res = await axios.post(`${API}/notes`,
        { company_name: name, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotes((prev) => [res.data, ...prev]);
      setNoteText("");
    } catch { /* silent */ }
    finally { setSubmitting(false); }
  };

  const deleteNote = async (noteId) => {
    // Optimistic
    setNotes((prev) => prev.filter((n) => n.id !== noteId));
    try {
      await axios.delete(`${API}/notes/${noteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch {
      // Refetch on error
      axios.get(`${API}/notes`, { params: { company_name: name }, headers: { Authorization: `Bearer ${token}` } })
        .then((r) => setNotes(r.data)).catch(() => {});
    }
  };

  useEffect(() => {
    if (!name) { setData(null); setArticles([]); setStockPrice(null); setProductCount(null); setNotFound(false); return; }
    setLoading(true);
    setNotFound(false);
    setData(null);
    setArticles([]);
    setStockPrice(null);
    setProductCount(null);

    Promise.all([
      axios.get(`${API}/companies/${encodeURIComponent(name)}`),
      axios.get(`${API}/news/company?name=${encodeURIComponent(name)}&limit=5`).catch(() => ({ data: [] })),
      axios.get(`${API}/products`).catch(() => ({ data: [] })),
    ])
      .then(([profileRes, newsRes, productsRes]) => {
        const profile = profileRes.data;
        setData(profile);
        setArticles(newsRes.data || []);

        // Count products for this manufacturer
        const allProducts = productsRes.data || [];
        const count = allProducts.filter(
          (p) => p.manufacturer?.toLowerCase() === name.toLowerCase()
        ).length;
        setProductCount(count);

        // Fetch live stock price if company is public
        const ticker = profile?.profile?.ticker;
        if (ticker && ticker !== "PRIVATE" && !ticker.startsWith("PRIV")) {
          axios.get(`${API}/stock-prices?tickers=${encodeURIComponent(ticker)}`)
            .then((r) => {
              const entry = (r.data || []).find(
                (s) => s.ticker?.toUpperCase() === ticker.toUpperCase()
              );
              if (entry) setStockPrice(entry);
            })
            .catch(() => {});
        }
      })
      .catch((e) => {
        if (e?.response?.status === 404) setNotFound(true);
      })
      .finally(() => setLoading(false));
  }, [name]);

  const p  = data?.profile;
  const ma = data?.ma_activities ?? [];

  return (
    <Sheet open={!!name} onOpenChange={(open) => { if (!open) onClose(); }}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto p-0 gap-0">

        {/* ── Hero Header ── */}
        <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-purple-900 px-6 pt-8 pb-6">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-start gap-4">
            <CompanyLogo
              name={name || ""}
              size="lg"
              domain={(() => {
                if (!p?.website) return null;
                try {
                  const url = p.website.startsWith("http") ? p.website : `https://${p.website}`;
                  return new URL(url).hostname;
                } catch { return p.website.split("/")[0].toLowerCase() || null; }
              })()}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-bold text-white leading-tight">{name}</h2>
                {p?.country && COUNTRY_CODES[p.country] && (
                  <img
                    src={`https://flagcdn.com/w40/${COUNTRY_CODES[p.country]}.png`}
                    alt={p.country}
                    title={p.country}
                    className="h-4 w-auto rounded-sm opacity-90 shrink-0"
                  />
                )}
              </div>
              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                {p?.ticker && (
                  <span className="font-mono text-xs bg-white/15 text-white px-2 py-0.5 rounded-md border border-white/20">
                    {p.ticker}
                  </span>
                )}
                {p?.is_public !== undefined && (
                  <span className={`text-xs px-2 py-0.5 rounded-md font-medium ${
                    p.is_public
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      : "bg-slate-500/30 text-slate-300 border border-slate-500/30"
                  }`}>
                    {p.is_public ? "Public" : "Private"}
                  </span>
                )}
                {p?.headquarters && (
                  <span className="text-xs text-slate-300 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {p.headquarters}
                  </span>
                )}
              </div>
              {/* Stock price row */}
              {stockPrice && (
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="font-mono text-sm font-bold text-white">
                    ${stockPrice.price?.toFixed(2)}
                  </span>
                  <span className={`text-xs font-mono font-semibold px-1.5 py-0.5 rounded ${
                    stockPrice.change_percent >= 0
                      ? "text-emerald-300 bg-emerald-500/20"
                      : "text-rose-300 bg-rose-500/20"
                  }`}>
                    {stockPrice.change_percent >= 0 ? "+" : ""}
                    {stockPrice.change_percent?.toFixed(2)}%
                  </span>
                </div>
              )}
              {p?.founded_year && (
                <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Founded {p.founded_year}
                </p>
              )}
            </div>
          </div>

          {/* External links in header */}
          {(p?.website || p?.linkedin) && (
            <div className="flex gap-3 mt-4">
              {p.website && (
                <a
                  href={p.website.startsWith("http") ? p.website : `https://${p.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-white/70 hover:text-white bg-white/10 hover:bg-white/20 transition-colors px-3 py-1.5 rounded-lg border border-white/10"
                >
                  <Globe className="w-3.5 h-3.5" />
                  Website
                </a>
              )}
              {p.linkedin && (
                <a
                  href={p.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-white/70 hover:text-white bg-white/10 hover:bg-white/20 transition-colors px-3 py-1.5 rounded-lg border border-white/10"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  LinkedIn
                </a>
              )}
            </div>
          )}
        </div>

        {/* ── Loading ── */}
        {loading && (
          <div className="flex justify-center py-16">
            <div className="animate-spin w-7 h-7 border-2 border-purple-600 border-t-transparent rounded-full" />
          </div>
        )}

        {!loading && (notFound || (!p && name)) && (
          <div className="mt-10 mx-6 rounded-xl border border-amber-200 bg-amber-50 p-6 text-center space-y-4">
            {/* Icon */}
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto">
              <Building2 className="w-6 h-6 text-amber-500" />
            </div>

            {/* Company name */}
            <div>
              <p className="text-sm font-bold text-slate-800">{name}</p>
              <p className="text-xs font-semibold text-amber-600 mt-0.5 uppercase tracking-wider">
                Profile in progress
              </p>
            </div>

            {/* Explanation */}
            <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
              This company appears in M&amp;A deals but its full profile hasn't been enriched
              yet. You can request it — we'll prioritise based on demand.
            </p>

            {/* CTA — pre-filled GitHub issue */}
            <a
              href={`https://github.com/royconstantymartin-hub/defense-dashboard/issues/new?title=${encodeURIComponent(`Profile request: ${name}`)}&labels=profile-request&body=${encodeURIComponent(`## Profile request\n\n**Company:** ${name}\n\n**Context:** This company appears in M&A activity but has no profile.\n\nPlease add a full company profile including: headquarters, founding year, specializations, key programmes, and description.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 border border-purple-700 rounded-lg px-4 py-2.5 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Request this profile
            </a>
          </div>
        )}

        {!loading && p && (
          <div className="divide-y divide-slate-100">

            {/* ── Key Metrics ── */}
            <div className="px-6 py-5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Key Figures</p>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-gradient-to-br from-purple-50 to-purple-50/50 border border-purple-100 rounded-xl p-3 text-center">
                  <div className="w-7 h-7 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <TrendingUp className="w-3.5 h-3.5 text-purple-600" />
                  </div>
                  <p className="text-[10px] font-medium uppercase tracking-wider text-purple-500">Market Cap</p>
                  <p className="text-base font-bold text-slate-900 mt-0.5 font-mono">
                    {p.market_cap ? `$${p.market_cap}B` : "—"}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-50/50 border border-emerald-100 rounded-xl p-3 text-center">
                  <div className="w-7 h-7 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <p className="text-[10px] font-medium uppercase tracking-wider text-emerald-500">Revenue</p>
                  <p className="text-base font-bold text-slate-900 mt-0.5 font-mono">
                    {p.revenue ? `$${p.revenue}B` : "—"}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-50/50 border border-blue-100 rounded-xl p-3 text-center">
                  <div className="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Users className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                  <p className="text-[10px] font-medium uppercase tracking-wider text-blue-500">Employees</p>
                  <p className="text-base font-bold text-slate-900 mt-0.5 font-mono">
                    {p.employees ? (p.employees >= 1000 ? `${(p.employees / 1000).toFixed(0)}K` : p.employees) : "—"}
                  </p>
                </div>
              </div>
            </div>

            {/* ── About ── */}
            {p.description && (
              <div className="px-6 py-5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">About</p>
                <p className="text-sm text-slate-600 leading-relaxed">{p.description}</p>
              </div>
            )}

            {/* ── Specializations ── */}
            {p.specializations?.length > 0 && (
              <div className="px-6 py-5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">
                  Products &amp; Capabilities
                </p>
                <div className="flex flex-wrap gap-2">
                  {p.specializations.map((s) => (
                    <span
                      key={s}
                      className="text-xs bg-purple-50 text-purple-700 border border-purple-100 px-2.5 py-1 rounded-full font-medium"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* ── Key Programs ── */}
            {p.programs?.length > 0 && (
              <div className="px-6 py-5">
                <div className="flex items-center gap-2 mb-3">
                  <Rocket className="w-3.5 h-3.5 text-slate-400" />
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Key Programs</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {p.programs.map((prog) => (
                    <span
                      key={prog}
                      className="text-xs bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-1 rounded-full font-medium"
                    >
                      {prog}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* ── Export Markets ── */}
            {p.export_countries?.length > 0 && (
              <div className="px-6 py-5">
                <div className="flex items-center gap-2 mb-3">
                  <Globe2 className="w-3.5 h-3.5 text-slate-400" />
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Export Markets</p>
                  <span className="ml-auto text-[10px] text-slate-400 font-mono">{p.export_countries.length} countries</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {p.export_countries.map((code) => (
                    <div key={code} className="flex flex-col items-center gap-1">
                      <img
                        src={`https://flagcdn.com/w40/${code}.png`}
                        alt={COUNTRY_NAMES[code] || code.toUpperCase()}
                        title={COUNTRY_NAMES[code] || code.toUpperCase()}
                        className="w-8 h-5 object-cover rounded shadow-sm border border-slate-100"
                        onError={(e) => { e.target.style.display = "none"; }}
                      />
                      <span className="text-[9px] text-slate-400 font-medium leading-none">
                        {COUNTRY_NAMES[code] || code.toUpperCase()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Associated Products ── */}
            {productCount !== null && productCount > 0 && (
              <div className="px-6 py-5">
                <div className="flex items-center gap-2 mb-3">
                  <Package className="w-3.5 h-3.5 text-slate-400" />
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Products</p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    navigate(`/products?manufacturer=${encodeURIComponent(name)}`);
                  }}
                  className="flex items-center justify-between w-full bg-purple-50 hover:bg-purple-100 border border-purple-100 hover:border-purple-200 rounded-xl px-4 py-3 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 group-hover:bg-purple-200 rounded-lg flex items-center justify-center transition-colors">
                      <Package className="w-4 h-4 text-purple-600" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-purple-800">
                        {productCount} product{productCount !== 1 ? "s" : ""} in catalog
                      </p>
                      <p className="text-xs text-purple-500">View in Products page</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-purple-400 group-hover:text-purple-600 transition-colors" />
                </button>
              </div>
            )}

            {/* ── Latest News ── */}
            <div className="px-6 py-5">
              <div className="flex items-center gap-2 mb-3">
                <Newspaper className="w-3.5 h-3.5 text-slate-400" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Latest News</p>
              </div>
              {articles.length === 0 ? (
                <p className="text-xs text-slate-400 py-2">No recent articles found.</p>
              ) : (
                <div className="space-y-3">
                  {articles.map((article, i) => (
                    i === 0 ? (
                      /* ── Hero article (first) ── */
                      <a
                        key={i}
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block rounded-xl overflow-hidden border border-slate-100 hover:border-purple-200 hover:shadow-md transition-all group"
                      >
                        <div className="w-full h-40 bg-slate-100 overflow-hidden">
                          <NewsArticleThumb article={article} wrapperClass="w-full h-full" showLogo={true} />
                        </div>
                        <div className="p-3">
                          <p className="text-sm font-semibold text-slate-800 group-hover:text-purple-700 transition-colors line-clamp-3 leading-snug">
                            {article.title}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs font-semibold text-purple-600 bg-purple-50 border border-purple-100 px-2 py-0.5 rounded-full">{article.source}</span>
                            <span className="text-xs text-slate-400">{relativeTime(article.publishedAt)}</span>
                            <ExternalLink className="w-3 h-3 text-slate-300 group-hover:text-purple-400 ml-auto transition-colors" />
                          </div>
                        </div>
                      </a>
                    ) : (
                      /* ── Compact articles (rest) ── */
                      <a
                        key={i}
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group border border-transparent hover:border-slate-100"
                      >
                        <div className="w-16 h-14 flex-shrink-0 rounded-lg overflow-hidden bg-slate-100">
                          <NewsArticleThumb article={article} wrapperClass="w-full h-full" showLogo={true} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-800 group-hover:text-purple-700 transition-colors line-clamp-2 leading-snug">
                            {article.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-slate-400 font-medium">{article.source}</span>
                            <span className="text-slate-200">·</span>
                            <span className="text-xs text-slate-400">{relativeTime(article.publishedAt)}</span>
                          </div>
                        </div>
                      </a>
                    )
                  ))}
                </div>
              )}
            </div>

            {/* ── M&A Activity — segmented by role ── */}
            {ma.length > 0 && (() => {
              const n = name?.toLowerCase() ?? "";
              const asAcquirer   = ma.filter((a) => ["acquisition", "merger"].includes(a.deal_type) && a.acquirer?.toLowerCase().includes(n));
              const asInvestor   = ma.filter((a) => ["strategic_investment", "minority_stake"].includes(a.deal_type) && a.acquirer?.toLowerCase().includes(n));
              const asJV         = ma.filter((a) => a.deal_type === "joint_venture");
              const asTarget     = ma.filter((a) => a.target?.toLowerCase().includes(n) && !a.acquirer?.toLowerCase().includes(n));

              const DealRow = ({ a }) => (
                <div key={a.id} className="border border-slate-100 rounded-xl p-3.5 bg-slate-50/50 hover:bg-white hover:shadow-sm transition-all">
                  <div className="flex justify-between items-start gap-2 mb-1.5">
                    <span className="text-xs font-semibold text-slate-800 leading-snug">
                      {a.acquirer}
                      <ArrowRight className="inline w-3 h-3 mx-1 text-slate-400" />
                      {a.target}
                    </span>
                    <span className="text-[10px] text-slate-400 shrink-0 font-mono">
                      {format(new Date(a.announced_date), "MMM yyyy")}
                    </span>
                  </div>
                  {a.description && (
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{a.description}</p>
                  )}
                  <div className="flex items-center gap-3 mt-2 flex-wrap">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${getStatusStyle(a.status)}`}>
                      {formatStatus(a.status)}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {formatValue(a.deal_value, a.is_disclosed ?? true)}
                    </span>
                    {a.stake_percentage != null && (
                      <span className="text-[10px] text-slate-400 font-mono">{a.stake_percentage}%</span>
                    )}
                    {a.source_url && (
                      <a href={a.source_url} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1 text-[10px] text-purple-600 hover:text-purple-800 font-medium ml-auto">
                        <ExternalLink className="w-3 h-3" /> Source
                      </a>
                    )}
                  </div>
                </div>
              );

              const Section = ({ title, items }) => items.length === 0 ? null : (
                <div className="mb-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">{title}</p>
                  <div className="space-y-2">{items.map((a) => <DealRow key={a.id} a={a} />)}</div>
                </div>
              );

              return (
                <div className="px-6 py-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">M&amp;A Activity</p>
                    <span className="ml-auto text-[10px] text-slate-400 font-mono">{ma.length} deal{ma.length > 1 ? "s" : ""}</span>
                  </div>
                  <Section title="Acquisitions" items={asAcquirer} />
                  <Section title="Investments" items={asInvestor} />
                  <Section title="Joint Ventures & Partnerships" items={asJV} />
                  <Section title="As Target" items={asTarget} />
                </div>
              );
            })()}

            {/* ── Analyst Notes ── */}
            <div className="px-6 py-5">
              <div className="flex items-center gap-2 mb-3">
                <StickyNote className="w-3.5 h-3.5 text-slate-400" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Analyst Notes</p>
              </div>

              {!token ? (
                <div className="flex items-center gap-2 text-xs text-slate-400 py-2">
                  <LogIn className="w-4 h-4" />
                  <span>Log in to add notes</span>
                </div>
              ) : (
                <>
                  {/* Input */}
                  <div className="flex gap-2 mb-4">
                    <textarea
                      ref={textareaRef}
                      rows={2}
                      value={noteText}
                      onChange={(e) => setNoteText(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) submitNote(); }}
                      placeholder="Add an analyst note… (Ctrl+Enter to submit)"
                      className="flex-1 text-sm text-slate-800 border border-slate-200 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-purple-300 placeholder:text-slate-400"
                    />
                    <button
                      onClick={submitNote}
                      disabled={!noteText.trim() || submitting}
                      className="self-end p-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-40 text-white rounded-lg transition-colors"
                      title="Submit note"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Notes list */}
                  {notesLoading ? (
                    <div className="flex justify-center py-4">
                      <div className="animate-spin w-5 h-5 border-2 border-purple-400 border-t-transparent rounded-full" />
                    </div>
                  ) : notes.length === 0 ? (
                    <p className="text-xs text-slate-400 py-1">No notes yet for this company.</p>
                  ) : (
                    <div className="space-y-2">
                      {notes.map((note) => (
                        <div key={note.id} className="bg-amber-50 border border-amber-100 rounded-xl p-3 group">
                          <p className="text-sm text-slate-800 leading-relaxed whitespace-pre-wrap">{note.content}</p>
                          <div className="flex items-center justify-between mt-2">
                            <div className="text-[10px] text-slate-400 flex items-center gap-1.5">
                              <span className="font-medium text-slate-500">{note.user_name || "You"}</span>
                              <span>·</span>
                              <span>{formatDistanceToNow(new Date(note.created_at), { addSuffix: true })}</span>
                            </div>
                            {note.user_id === user?.id && (
                              <button
                                onClick={() => deleteNote(note.id)}
                                className="opacity-0 group-hover:opacity-100 p-1 rounded text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-all"
                                title="Delete note"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>

          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
