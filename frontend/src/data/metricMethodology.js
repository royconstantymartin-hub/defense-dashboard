// ─────────────────────────────────────────────────────────────────────────────
// Metric methodology dictionary  (V2 — Chantier 4 « Harmonisation méthodologique »)
//
// Problème adressé : aujourd'hui une même colonne ne mesure pas la même chose
// d'un pays à l'autre (ex. les drones de l'Ukraine excluent ~8M de FPV/an, mais
// d'autres pays incluent leurs munitions rôdeuses). Ce registre documente, pour
// chaque métrique, CE QUI EST COMPTÉ et CE QUI EST EXCLU, afin que la donnée soit
// interprétable et comparable. Affiché en infobulle sur chaque tuile/section.
// ─────────────────────────────────────────────────────────────────────────────

export const METRIC_METHODOLOGY = {
  fighters: {
    label: "Combat Aircraft",
    counts: "Avions de combat à voilure fixe en service (chasse, attaque, bombardiers).",
    excludes: "Appareils en commande, en développement, en réserve longue ou à l'entraînement.",
    unit: "appareils en service",
    primary_source: "IISS",
  },
  helicopters: {
    label: "Rotary Wing",
    counts: "Hélicoptères militaires en service (attaque, transport, naval).",
    excludes: "Appareils civils réquisitionnés et machines stockées.",
    unit: "appareils en service",
    primary_source: "IISS",
  },
  drones: {
    label: "Drones & UAVs",
    counts: "Systèmes de drones non consommables distincts (ISR, MALE/HALE, UCAV).",
    excludes: "Munitions rôdeuses et FPV consommables (comptées à part, volumes non homogènes entre pays).",
    unit: "modèles / systèmes",
    primary_source: "GFP",
    caveat: "Métrique hétérogène — privilégier la lecture qualitative au comptage brut.",
  },
  tanks: {
    label: "Main Battle Tanks",
    counts: "Chars de combat (MBT) et chars légers en service actif.",
    excludes: "Chars en stockage / réserve mobilisable (volumes considérables pour certains pays).",
    unit: "chars en service",
    primary_source: "IISS",
  },
  armored_vehicles: {
    label: "Armored Vehicles",
    counts: "Véhicules blindés (IFV, APC, MRAP, reconnaissance) en service.",
    excludes: "Véhicules logistiques non blindés et matériels stockés.",
    unit: "véhicules en service",
    primary_source: "IISS",
  },
  aircraft_carriers: {
    label: "Aircraft Carriers",
    counts: "Porte-aéronefs (CVN/CV), porte-aéronefs légers et porte-hélicoptères amphibies (LHD).",
    excludes: "Navires en construction ou en réserve.",
    unit: "navires en service",
    primary_source: "IISS",
  },
  surface_combatants: {
    label: "Surface Combatants",
    counts: "Bâtiments de combat de surface principaux (frégates, destroyers, corvettes).",
    excludes: "Patrouilleurs côtiers, navires auxiliaires et de soutien.",
    unit: "navires en service",
    primary_source: "IISS",
  },
  submarines: {
    label: "Submarines",
    counts: "Sous-marins d'attaque (SSN/SSK) et lanceurs d'engins (SSBN) en service.",
    excludes: "Unités en désarmement ou en grand carénage prolongé.",
    unit: "sous-marins en service",
    primary_source: "IISS",
  },
  air_defense: {
    label: "Air Defense",
    counts: "Systèmes sol-air majeurs (batteries SAM, défense antimissile, SHORAD).",
    excludes: "Armes antiaériennes individuelles (MANPADS) comptées séparément.",
    unit: "systèmes / batteries",
    primary_source: "GFP",
    caveat: "Granularité variable selon les pays — interpréter avec prudence.",
  },
  missiles: {
    label: "Missiles",
    counts: "Stocks de missiles de croisière, balistiques et de frappe (estimations agrégées).",
    excludes: "Munitions guidées air-sol tactiques de courte portée.",
    unit: "missiles (estimation)",
    primary_source: "GFP",
    caveat: "Estimations agrégées — incertitude élevée.",
  },
};

export function getMethodology(metricKey) {
  return METRIC_METHODOLOGY[metricKey] || null;
}
