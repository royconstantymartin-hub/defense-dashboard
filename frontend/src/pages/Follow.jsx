import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  ExternalLink,
  Search,
  Newspaper,
  Building2,
  BookOpen,
  Globe2,
  ShieldCheck,
  BarChart3,
} from "lucide-react";

// ─── Curated source catalogue ──────────────────────────────────────────────
// Each source is manually verified and categorised.
// No scraped content — users navigate directly to the primary source.

const CATEGORIES = [
  { id: "all",        label: "Toutes",              icon: Globe2 },
  { id: "press",      label: "Presse spécialisée",  icon: Newspaper },
  { id: "institution",label: "Institutions",        icon: ShieldCheck },
  { id: "thinktank",  label: "Think tanks",         icon: BookOpen },
  { id: "market",     label: "Données marché",      icon: BarChart3 },
  { id: "industry",   label: "Industriels",         icon: Building2 },
];

const SOURCES = [
  // ── Presse spécialisée ──────────────────────────────────────────────────
  {
    id: "janes",
    name: "Jane's",
    description: "Référence mondiale pour l'intelligence défense & sécurité. Couverture des équipements, programmes, ordres de bataille.",
    url: "https://www.janes.com",
    category: "press",
    lang: ["EN"],
    tags: ["équipements", "programmes", "renseignement"],
    paywall: true,
  },
  {
    id: "defensenews",
    name: "Defense News",
    description: "Actualité défense internationale, contrats, politiques d'acquisitions, budgets. Publication de référence du groupe Sightline Media.",
    url: "https://www.defensenews.com",
    category: "press",
    lang: ["EN"],
    tags: ["contrats", "acquisitions", "budget"],
    paywall: false,
  },
  {
    id: "breakingdefense",
    name: "Breaking Defense",
    description: "Couverture approfondie des politiques d'acquisition US, Europe et Indo-Pacifique. Fort en analyse budgétaire et Pentagon.",
    url: "https://breakingdefense.com",
    category: "press",
    lang: ["EN"],
    tags: ["politique", "budget", "acquisition"],
    paywall: false,
  },
  {
    id: "aviationweek",
    name: "Aviation Week & Space Technology",
    description: "Référence aéronautique, aérospatiale et défense. Programmes d'avions de combat, UAV, espace militaire.",
    url: "https://aviationweek.com",
    category: "press",
    lang: ["EN"],
    tags: ["aviation", "espace", "programmes"],
    paywall: true,
  },
  {
    id: "thewarzone",
    name: "The War Zone (The Drive)",
    description: "Analyses détaillées sur les systèmes d'armes, conflits en cours, doctrine militaire. Très fort sur les dossiers techniques US.",
    url: "https://www.thedrive.com/the-war-zone",
    category: "press",
    lang: ["EN"],
    tags: ["systèmes", "conflits", "doctrine"],
    paywall: false,
  },
  {
    id: "opex360",
    name: "Opex 360",
    description: "Premier site francophone d'actualité défense & sécurité. Opérations extérieures, DGA, programmes français.",
    url: "https://www.opex360.com",
    category: "press",
    lang: ["FR"],
    tags: ["France", "opérations", "DGA"],
    paywall: false,
  },
  {
    id: "metadefense",
    name: "Meta-Défense",
    description: "Analyses stratégiques et industrielles de la défense européenne, avec focus sur les programmes franco-européens.",
    url: "https://www.meta-defense.fr",
    category: "press",
    lang: ["FR"],
    tags: ["Europe", "programmes", "industrie"],
    paywall: false,
  },
  {
    id: "ttj",
    name: "Tout sur les Marchés Publics Défense (BOAMP)",
    description: "Bulletin officiel des annonces des marchés publics. Source primaire pour les appels d'offres de la DGA et ministères.",
    url: "https://www.boamp.fr",
    category: "press",
    lang: ["FR"],
    tags: ["marchés publics", "appels d'offres", "DGA"],
    paywall: false,
  },
  {
    id: "europeandefencematters",
    name: "European Defence Matters",
    description: "Magazine de l'Agence Européenne de Défense. Programmes coopératifs, PESCO, FED.",
    url: "https://eda.europa.eu/webzine",
    category: "press",
    lang: ["EN"],
    tags: ["Europe", "PESCO", "coopération"],
    paywall: false,
  },

  // ── Institutions ────────────────────────────────────────────────────────
  {
    id: "dga",
    name: "DGA – Direction Générale de l'Armement",
    description: "Communiqués officiels, programmes d'armement, marchés notifiés, rapport annuel de performance. Source primaire française.",
    url: "https://www.defense.gouv.fr/dga",
    category: "institution",
    lang: ["FR"],
    tags: ["France", "programmes", "marchés"],
    paywall: false,
  },
  {
    id: "nato_newsroom",
    name: "NATO Newsroom",
    description: "Communiqués de presse, discours, documents officiels de l'OTAN. Décisions du Conseil, budget, capacités.",
    url: "https://www.nato.int/cps/en/natohq/news.htm",
    category: "institution",
    lang: ["EN", "FR"],
    tags: ["OTAN", "politiques", "capacités"],
    paywall: false,
  },
  {
    id: "dod",
    name: "U.S. Department of Defense – Press Releases",
    description: "Contrats notifiés quotidiennement, annonces budgétaires, publications officielles du Pentagone.",
    url: "https://www.defense.gov/News/Releases/",
    category: "institution",
    lang: ["EN"],
    tags: ["USA", "contrats", "budget"],
    paywall: false,
  },
  {
    id: "eda",
    name: "European Defence Agency (EDA)",
    description: "Données sur les dépenses défense européennes, coopération R&D, programmes PESCO.",
    url: "https://eda.europa.eu",
    category: "institution",
    lang: ["EN"],
    tags: ["Europe", "R&D", "coopération"],
    paywall: false,
  },
  {
    id: "uk_mod",
    name: "UK Ministry of Defence",
    description: "Annonces de contrats, stratégie défense, white papers. Données de dépenses publiées annuellement.",
    url: "https://www.gov.uk/government/organisations/ministry-of-defence",
    category: "institution",
    lang: ["EN"],
    tags: ["UK", "contrats", "stratégie"],
    paywall: false,
  },
  {
    id: "bundeswehr",
    name: "Bundeswehr / BMVg",
    description: "Ministère fédéral allemand de la Défense. Programmes, Zeitenwende, budget défense allemand.",
    url: "https://www.bmvg.de",
    category: "institution",
    lang: ["DE"],
    tags: ["Allemagne", "programmes", "budget"],
    paywall: false,
  },

  // ── Think tanks & recherche ─────────────────────────────────────────────
  {
    id: "sipri",
    name: "SIPRI – Stockholm International Peace Research Institute",
    description: "Base de référence mondiale sur les dépenses militaires, transferts d'armes, arsenaux nucléaires. Données annuelles libres d'accès.",
    url: "https://www.sipri.org",
    category: "thinktank",
    lang: ["EN"],
    tags: ["dépenses", "transferts", "données"],
    paywall: false,
  },
  {
    id: "iiss",
    name: "IISS – International Institute for Strategic Studies",
    description: "Military Balance (référence annuelle sur les capacités militaires mondiales), analyses stratégiques.",
    url: "https://www.iiss.org",
    category: "thinktank",
    lang: ["EN"],
    tags: ["capacités", "stratégie", "Military Balance"],
    paywall: true,
  },
  {
    id: "irsem",
    name: "IRSEM – Institut de Recherche Stratégique de l'École Militaire",
    description: "Think tank français rattaché au ministère des Armées. Études stratégiques, géopolitique, industrie de défense.",
    url: "https://www.irsem.fr",
    category: "thinktank",
    lang: ["FR", "EN"],
    tags: ["France", "stratégie", "géopolitique"],
    paywall: false,
  },
  {
    id: "ifri_securite",
    name: "IFRI – Programme Sécurité & Défense",
    description: "Institut Français des Relations Internationales. Travaux sur l'industrie de défense européenne, BITD, autonomie stratégique.",
    url: "https://www.ifri.org/fr/espaces-thematiques/securite-defense",
    category: "thinktank",
    lang: ["FR", "EN"],
    tags: ["Europe", "BITD", "autonomie stratégique"],
    paywall: false,
  },
  {
    id: "csis",
    name: "CSIS – Center for Strategic and International Studies",
    description: "Think tank washingtonien. Acquisition défense, industrie, Indo-Pacifique, cybersécurité.",
    url: "https://www.csis.org/programs/defense-industrial-initiatives-group",
    category: "thinktank",
    lang: ["EN"],
    tags: ["USA", "acquisition", "industrie"],
    paywall: false,
  },
  {
    id: "rand",
    name: "RAND Corporation",
    description: "Études approfondies sur l'acquisition, la planification capacitaire, la dissuasion et les stratégies militaires.",
    url: "https://www.rand.org/topics/military.html",
    category: "thinktank",
    lang: ["EN"],
    tags: ["planification", "acquisition", "dissuasion"],
    paywall: false,
  },
  {
    id: "fondation_recherche",
    name: "FRS – Fondation pour la Recherche Stratégique",
    description: "Expertise française en non-prolifération, stratégie nucléaire, contrôle des armements et export.",
    url: "https://www.frstrategie.org",
    category: "thinktank",
    lang: ["FR"],
    tags: ["nucléaire", "export", "contrôle armements"],
    paywall: false,
  },

  // ── Données marché ──────────────────────────────────────────────────────
  {
    id: "sam_gov",
    name: "SAM.gov – U.S. Federal Contract Opportunities",
    description: "Source officielle US des appels d'offres et contrats fédéraux. Indispensable pour le marché défense américain.",
    url: "https://sam.gov/content/opportunities",
    category: "market",
    lang: ["EN"],
    tags: ["USA", "contrats", "appels d'offres"],
    paywall: false,
  },
  {
    id: "ted",
    name: "TED – Tenders Electronic Daily (UE)",
    description: "Supplément au Journal officiel de l'UE. Marchés publics européens dont achats de défense.",
    url: "https://ted.europa.eu",
    category: "market",
    lang: ["FR", "EN"],
    tags: ["Europe", "marchés publics", "appels d'offres"],
    paywall: false,
  },
  {
    id: "nato_nspa",
    name: "NATO Support and Procurement Agency (NSPA)",
    description: "Opportunités d'acquisition OTAN, marchés logistiques, munitions, services.",
    url: "https://www.nspa.nato.int/business/procurement",
    category: "market",
    lang: ["EN"],
    tags: ["OTAN", "logistique", "acquisition"],
    paywall: false,
  },
  {
    id: "aerospace_forecast",
    name: "Aerospace & Defense Industry Monitor (ASD)",
    description: "Association ASD Eurospace. Données industrielles sur le secteur aérospatiale & défense européen.",
    url: "https://www.asd-europe.org",
    category: "market",
    lang: ["EN"],
    tags: ["Europe", "industrie", "statistiques"],
    paywall: false,
  },

  // ── Industriels ─────────────────────────────────────────────────────────
  {
    id: "airbus_defence",
    name: "Airbus Defence & Space – Newsroom",
    description: "Communiqués officiels Airbus D&S. Programmes, contrats, partenariats, résultats financiers.",
    url: "https://www.airbus.com/en/newsroom",
    category: "industry",
    lang: ["EN", "FR"],
    tags: ["Airbus", "programmes", "contrats"],
    paywall: false,
  },
  {
    id: "thales_newsroom",
    name: "Thales Group – Salle de presse",
    description: "Actualités Thales : contrats, innovations, résultats, partenariats. Électronique défense & sécurité.",
    url: "https://www.thalesgroup.com/en/worldwide/press_releases",
    category: "industry",
    lang: ["EN", "FR"],
    tags: ["Thales", "électronique", "contrats"],
    paywall: false,
  },
  {
    id: "safran_newsroom",
    name: "Safran – Actualités",
    description: "Moteurs, équipements aéronautiques et défense. Programmes LEAP, Rafale, hélicoptères.",
    url: "https://www.safran-group.com/fr/media/actualites",
    category: "industry",
    lang: ["FR", "EN"],
    tags: ["Safran", "moteurs", "Rafale"],
    paywall: false,
  },
  {
    id: "mbda_newsroom",
    name: "MBDA – Communiqués de presse",
    description: "Missilier européen. Contrats, programmes Meteor, Mistral, ASMP-A, CAMM.",
    url: "https://www.mbda-systems.com/press-releases/",
    category: "industry",
    lang: ["EN", "FR"],
    tags: ["missiles", "programmes", "MBDA"],
    paywall: false,
  },
];

// ─── Component ──────────────────────────────────────────────────────────────

const LANG_COLORS = {
  FR: "bg-blue-50 text-blue-700 border-blue-200",
  EN: "bg-slate-50 text-slate-600 border-slate-200",
  DE: "bg-yellow-50 text-yellow-700 border-yellow-200",
};

export default function Follow() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = SOURCES.filter(s => {
    const matchCat = activeCategory === "all" || s.category === activeCategory;
    const q = search.toLowerCase();
    const matchSearch = !q
      || s.name.toLowerCase().includes(q)
      || s.description.toLowerCase().includes(q)
      || s.tags.some(t => t.toLowerCase().includes(q));
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-slate-900 tracking-tight">
            Sources de référence
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Catalogue de sources vérifiées — presse, institutions, think tanks, données marché
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 max-w-sm">
          <span className="text-amber-500">ℹ</span>
          <span>
            Ces sources sont des liens directs vers les publications primaires. Aucun contenu n'est reproduit ici.
          </span>
        </div>
      </div>

      {/* Search + Category filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Rechercher une source, un tag..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 border-slate-200 text-sm"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map(cat => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeCategory === cat.id
                    ? "bg-purple-700 text-white"
                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results count */}
      <p className="text-xs text-slate-400">
        {filtered.length} source{filtered.length > 1 ? "s" : ""} affichée{filtered.length > 1 ? "s" : ""}
      </p>

      {/* Source grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(source => (
          <a
            key={source.id}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            <Card className="bg-white border-slate-200 shadow-sm h-full hover:border-purple-300 hover:shadow-md transition-all duration-200">
              <CardContent className="p-4 flex flex-col gap-3 h-full">
                {/* Top row */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-slate-900 group-hover:text-purple-700 transition-colors leading-tight">
                      {source.name}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5 font-mono truncate">{source.url.replace("https://", "")}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-purple-500 flex-shrink-0 mt-0.5 transition-colors" />
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed flex-1">
                  {source.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100">
                  {/* Languages */}
                  <div className="flex gap-1">
                    {source.lang.map(l => (
                      <span
                        key={l}
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${LANG_COLORS[l] ?? "bg-slate-50 text-slate-600 border-slate-200"}`}
                      >
                        {l}
                      </span>
                    ))}
                  </div>
                  {/* Tags + paywall indicator */}
                  <div className="flex items-center gap-1 flex-wrap justify-end">
                    {source.paywall && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 font-medium">
                        Payant
                      </span>
                    )}
                    {source.tags.slice(0, 2).map(tag => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-[10px] px-1.5 py-0 bg-slate-50 text-slate-500 border border-slate-100 font-normal"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-slate-400">
          <Search className="w-8 h-8 mb-3 opacity-40" />
          <p className="text-sm">Aucune source ne correspond à cette recherche.</p>
        </div>
      )}
    </div>
  );
}
