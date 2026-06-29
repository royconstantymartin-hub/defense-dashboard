// ─────────────────────────────────────────────────────────────────────────────
// Metric methodology dictionary  (V2 — workstream C4 "Metric harmonisation")
//
// Problem addressed: today the same column does not measure the same thing from
// one country to another (e.g. Ukraine's drone count excludes ~8M FPV/year while
// other countries fold their loitering munitions in). This registry documents,
// for each metric, WHAT IS COUNTED and WHAT IS EXCLUDED, so the figure is
// interpretable and comparable. Surfaced as a tooltip on each tile/section.
// ─────────────────────────────────────────────────────────────────────────────

export const METRIC_METHODOLOGY = {
  fighters: {
    label: "Combat Aircraft",
    counts: "Fixed-wing combat aircraft in service (fighters, attack, bombers).",
    excludes: "Aircraft on order, in development, in long-term reserve or in a training role.",
    unit: "aircraft in service",
    primary_source: "IISS",
  },
  helicopters: {
    label: "Rotary Wing",
    counts: "Military helicopters in service (attack, transport, naval).",
    excludes: "Requisitioned civilian airframes and stored aircraft.",
    unit: "aircraft in service",
    primary_source: "IISS",
  },
  drones: {
    label: "Drones & UAVs",
    counts: "Distinct non-expendable drone systems (ISR, MALE/HALE, UCAV).",
    excludes: "Expendable loitering munitions and FPV drones (counted separately; volumes not comparable across countries).",
    unit: "models / systems",
    primary_source: "GFP",
    caveat: "Heterogeneous metric — prefer the qualitative reading over the raw count.",
  },
  tanks: {
    label: "Main Battle Tanks",
    counts: "Main battle tanks (MBT) and light tanks in active service.",
    excludes: "Tanks in storage / mobilisation reserve (substantial for some countries).",
    unit: "tanks in service",
    primary_source: "IISS",
  },
  armored_vehicles: {
    label: "Armored Vehicles",
    counts: "Armoured vehicles (IFV, APC, MRAP, reconnaissance) in service.",
    excludes: "Unarmoured logistics vehicles and stored equipment.",
    unit: "vehicles in service",
    primary_source: "IISS",
  },
  aircraft_carriers: {
    label: "Aircraft Carriers",
    counts: "Carriers (CVN/CV), light carriers and amphibious assault ships (LHD).",
    excludes: "Vessels under construction or in reserve.",
    unit: "ships in service",
    primary_source: "IISS",
  },
  surface_combatants: {
    label: "Surface Combatants",
    counts: "Principal surface combatants (frigates, destroyers, corvettes).",
    excludes: "Coastal patrol craft, auxiliaries and support vessels.",
    unit: "ships in service",
    primary_source: "IISS",
  },
  submarines: {
    label: "Submarines",
    counts: "Attack submarines (SSN/SSK) and ballistic-missile submarines (SSBN) in service.",
    excludes: "Units being decommissioned or in extended refit.",
    unit: "submarines in service",
    primary_source: "IISS",
  },
  air_defense: {
    label: "Air Defense",
    counts: "Major ground-based air-defence systems (SAM batteries, BMD, SHORAD).",
    excludes: "Man-portable air-defence systems (MANPADS), counted separately.",
    unit: "systems / batteries",
    primary_source: "GFP",
    caveat: "Granularity varies by country — interpret with caution.",
  },
  missiles: {
    label: "Missiles",
    counts: "Stocks of cruise, ballistic and strike missiles (aggregate estimates).",
    excludes: "Short-range tactical air-to-ground guided munitions.",
    unit: "missiles (estimate)",
    primary_source: "GFP",
    caveat: "Aggregate estimates — high uncertainty.",
  },
};

export function getMethodology(metricKey) {
  return METRIC_METHODOLOGY[metricKey] || null;
}
