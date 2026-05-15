// MOCK DATA — UI demonstration only. Real sourced data added in Phase 3.
const rafale = {
  official_designation: "Dassault Rafale F4",
  category_label: "Omnirole twin-engine 4.5-gen fighter",
  manufacturers: ["Dassault Aviation"],
  partner_companies: ["Thales", "Safran", "MBDA"],
  countries_of_origin: ["France"],
  country_codes: ["fr"],
  year_ioc: 2001,
  production_status: "in_production",

  total_units_produced: {
    value: 262,
    confidence: "high",
    note: null,
    sources: [{ label: "Dassault Aviation — Rapport annuel 2024", url: "https://www.dassault-aviation.com", date: "2025-03-15" }],
  },

  unit_cost_usd: {
    value: 115,
    confidence: "medium",
    note: "Coût export flyaway (2024). Le coût domestique français est estimé à 85–90 M$. Varie selon le contrat.",
    sources: [
      { label: "Air & Cosmos — Export Rafale", url: "https://www.air-cosmos.com", date: "2024-11-10" },
      { label: "DGA — LFI 2025", url: "https://www.defense.gouv.fr", date: "2024-10-01" },
    ],
  },
  unit_cost_year: 2024,
  operator_countries_count: 7,

  production_rate_per_year: {
    value: 26,
    confidence: "high",
    note: "Cadence prévue à 35/an entre 2029 et 2030 pour honorer le carnet de commandes.",
    sources: [{ label: "Air & Cosmos — LFI 2026", url: "https://www.air-cosmos.com", date: "2025-01-20" }],
  },

  variants: [
    {
      name: "Rafale C",
      role: "Monoplace terrestre multirôle",
      key_differences: ["Poste de pilotage monoplace", "Cellule terrestre standard", "Version la plus commandée par l'Armée de l'Air française"],
      units_produced: { value: 108, confidence: "medium", note: null, sources: [] },
      operators: ["France"],
    },
    {
      name: "Rafale B",
      role: "Biplace terrestre entraînement / frappe",
      key_differences: ["Deux sièges côte à côte", "Permet embarquement d'un opérateur armes ou instructeur", "Utilisé pour la composante nucléaire aéroportée"],
      units_produced: { value: 117, confidence: "medium", note: null, sources: [] },
      operators: ["France", "Égypte", "Qatar", "Grèce", "Croatie", "EAU", "Inde", "Indonésie", "Serbie"],
    },
    {
      name: "Rafale M",
      role: "Monoplace embarqué (Marine nationale)",
      key_differences: ["Train d'atterrissage renforcé pour catapulte et brin d'arrêt", "Perche de ravitaillement rétractable", "Crosse d'arrêt plus courte"],
      units_produced: { value: 57, confidence: "medium", note: null, sources: [] },
      operators: ["France (Marine nationale)"],
    },
    {
      name: "Rafale F4.1",
      role: "Standard de production actuel (depuis 2023)",
      key_differences: ["Radar RBE2-AA AESA amélioré", "Intégration pod TALIOS", "Casque HMD nouvelle génération"],
      units_produced: { value: "N/A", confidence: "low", note: "Non décliné séparément par Dassault dans ses publications.", sources: [] },
      operators: ["France", "Clients export récents"],
    },
  ],

  tech_specs: {
    length_m: "15,3 m",
    wingspan_m: "10,9 m",
    mtow_kg: "24 500 kg",
    empty_weight_kg: "10 300 kg",
    engine: "2 × Safran M88-2E4 (75 kN en PC)",
    max_speed: "Mach 1,8 (basse altitude : Mach 1,1)",
    combat_radius_km: "1 850 km (avec réservoirs)",
    service_ceiling_ft: "50 000 ft",
    crew: "1 (C/M) ou 2 (B)",
    hardpoints: "14 points d'emport",
  },
  tech_specs_confidence: "high",

  compatible_weapons: [
    "MICA EM/IR",
    "Meteor BVRAAM",
    "SCALP EG",
    "AASM Hammer",
    "Exocet AM39",
    "GBU-12 Paveway II",
    "ASMP-A (nucléaire)",
    "Napalm F2",
    "Spike ER",
  ],
  max_payload_kg: "9 500 kg",
  hardpoints_count: "14 points d'emport",

  total_ordered: {
    value: 494,
    confidence: "high",
    note: null,
    sources: [{ label: "Dassault Aviation — Carnet de commandes Q1 2025", url: "https://www.dassault-aviation.com", date: "2025-04-01" }],
  },
  total_delivered: {
    value: 262,
    confidence: "high",
    note: null,
    sources: [{ label: "Dassault Aviation — Rapport annuel 2024", url: "https://www.dassault-aviation.com", date: "2025-03-15" }],
  },
  backlog: 232,
  production_start_year: 1998,
  production_end_year: null,

  deliveries_by_country: [
    { country: "France", country_code: "fr", ordered: 286, delivered: 170, delivery_date: "En cours jusqu'en 2035" },
    { country: "Égypte",   country_code: "eg", ordered: 54,  delivered: 54,  delivery_date: "2015–2024" },
    { country: "Inde",     country_code: "in", ordered: 36,  delivered: 36,  delivery_date: "2022–2024" },
    { country: "Qatar",    country_code: "qa", ordered: 36,  delivered: 36,  delivery_date: "2022–2024" },
    { country: "Grèce",    country_code: "gr", ordered: 24,  delivered: 24,  delivery_date: "2021–2023" },
    { country: "Croatie",  country_code: "hr", ordered: 14,  delivered: 10,  delivery_date: "2024–2025" },
    { country: "EAU",      country_code: "ae", ordered: 80,  delivered: 0,   delivery_date: "2026–2031" },
    { country: "Indonésie",country_code: "id", ordered: 42,  delivered: 0,   delivery_date: "2026–2030" },
    { country: "Serbie",   country_code: "rs", ordered: 12,  delivered: 0,   delivery_date: "2027–2030" },
  ],

  export_contracts: [
    { year: 2015, customer_country: "Égypte",    customer_country_code: "eg", units: 24, contract_value_usd: 5.2,  delivery_window: "2015–2017", status: "delivered" },
    { year: 2016, customer_country: "Inde",      customer_country_code: "in", units: 36, contract_value_usd: 8.8,  delivery_window: "2022–2024", status: "delivered" },
    { year: 2016, customer_country: "Égypte",    customer_country_code: "eg", units: 30, contract_value_usd: null, delivery_window: "2018–2024", status: "delivered" },
    { year: 2021, customer_country: "Grèce",     customer_country_code: "gr", units: 24, contract_value_usd: 3.6,  delivery_window: "2021–2023", status: "delivered" },
    { year: 2021, customer_country: "Qatar",     customer_country_code: "qa", units: 36, contract_value_usd: 19.2, delivery_window: "2022–2024", status: "delivered" },
    { year: 2021, customer_country: "Croatie",   customer_country_code: "hr", units: 14, contract_value_usd: 1.05, delivery_window: "2024–2025", status: "in_delivery" },
    { year: 2021, customer_country: "EAU",       customer_country_code: "ae", units: 80, contract_value_usd: 16.0, delivery_window: "2026–2031", status: "signed" },
    { year: 2022, customer_country: "Indonésie", customer_country_code: "id", units: 42, contract_value_usd: 8.1,  delivery_window: "2026–2030", status: "signed" },
    { year: 2023, customer_country: "Serbie",    customer_country_code: "rs", units: 12, contract_value_usd: 3.0,  delivery_window: "2027–2030", status: "signed" },
  ],

  competitors: [
    {
      name: "Eurofighter Typhoon",
      manufacturer: "Airbus Defence & Space",
      summary: "Chasseur européen 4.5-gén développé en coopération (UK, Allemagne, Italie, Espagne). Comparable en supériorité aérienne, sans la capacité de dissuasion nucléaire aéroportée du Rafale.",
      dashboard_product_id: "Eurofighter Typhoon",
    },
    {
      name: "F/A-18E/F Super Hornet",
      manufacturer: "Boeing Defense",
      summary: "Multirôle américain embarqué. Principal concurrent à l'export (Australie, Canada). Offre une intégration logistique plus profonde avec les standards OTAN.",
      dashboard_product_id: "F/A-18E/F Super Hornet",
    },
    {
      name: "Gripen E",
      manufacturer: "Saab AB",
      summary: "Chasseur léger suédois. Coûts d'acquisition et d'exploitation inférieurs. Concurrent direct sur les marchés d'exportation à budget intermédiaire.",
      dashboard_product_id: "Gripen E",
    },
  ],

  last_updated: "2025-05-15",
  data_disclaimer: "Données simulées — seront remplacées par des données sourcées en Phase 3.",
};

export default rafale;
