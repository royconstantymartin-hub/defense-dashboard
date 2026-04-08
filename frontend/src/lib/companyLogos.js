// Maps company names to their logo domains.
// Used by MarketData, CompanyProfileSheet, and Dashboard to render logos.
export const COMPANY_LOGOS = {
  // USA — Major Primes
  "Lockheed Martin": "lockheedmartin.com",
  "Raytheon Technologies": "rtx.com",
  "Boeing Defense": "boeing.com",
  "Northrop Grumman": "northropgrumman.com",
  "General Dynamics": "gd.com",
  "L3Harris Technologies": "l3harris.com",
  "Huntington Ingalls": "huntingtoningalls.com",
  "Leidos Holdings": "leidos.com",
  "SAIC": "saic.com",
  "Booz Allen Hamilton": "boozallen.com",
  // USA — Mid-Tier
  "General Atomics": "ga.com",
  "Textron": "textron.com",
  "Kratos Defense": "kratosdefense.com",
  "Mercury Systems": "mrcy.com",
  "AeroVironment": "avinc.com",
  "Maxar Technologies": "maxar.com",
  "Curtiss-Wright": "curtisswright.com",
  "TransDigm": "transdigm.com",
  "Hexcel": "hexcel.com",
  "Spirit AeroSystems": "spiritaero.com",
  "Triumph Group": "triumphgroup.com",
  "Parsons Corporation": "parsons.com",
  "BWX Technologies": "bwxt.com",
  "CACI International": "caci.com",
  "ManTech International": "mantech.com",
  "Palantir Technologies": "palantir.com",
  "Rocket Lab": "rocketlabusa.com",
  "Collins Aerospace": "collinsaerospace.com",
  "Pratt & Whitney": "prattwhitney.com",
  "General Electric Aviation": "ge.com",
  "Honeywell Aerospace": "honeywell.com",
  "Ball Aerospace": "ball.com",
  "HEICO Corporation": "heico.com",
  "Kaman Aerospace": "kaman.com",
  "Astronics Corporation": "astronics.com",
  "Sierra Nevada Corporation": "sncorp.com",
  "Anduril Industries": "anduril.com",
  "Shield AI": "shield.ai",
  "Peraton": "peraton.com",
  "V2X Inc": "v2x.com",
  "Axon Enterprise": "axon.com",
  "OSI Systems": "osi-systems.com",
  "Redwire Corporation": "redwirespace.com",
  "DRS Technologies": "leonardodrs.com",
  "MDA Space": "mda.space",
  "AAR Corp": "aarcorp.com",
  "Ducommun": "ducommun.com",
  "Moog Inc": "mooginc.com",
  "API Technologies": "apitech.com",
  "General Dynamics Mission Systems Canada": "gd.com",
  "Harris Corporation": "l3harris.com",
  "Orbital ATK": "northropgrumman.com",
  // UK
  "BAE Systems": "baesystems.com",
  "Rolls-Royce Holdings": "rolls-royce.com",
  "Babcock International": "babcock.co.uk",
  "QinetiQ": "qinetiq.com",
  "Chemring Group": "chemring.co.uk",
  "Ultra Electronics": "ultra.group",
  "Meggitt": "meggitt.com",
  "Cohort": "cohortplc.com",
  // France
  "Thales": "thalesgroup.com",
  "Thales Nederland": "thalesgroup.com",
  "Airbus Defence & Space": "airbus.com",
  "Airbus Defence Spain": "airbus.com",
  "Leonardo": "leonardo.com",
  "Safran": "safran-group.com",
  "Dassault Aviation": "dassault-aviation.com",
  "MBDA": "mbda-systems.com",
  "Naval Group": "naval-group.com",
  "Nexter Systems": "knds.com",
  "KNDS": "knds.com",
  "Arquus": "arquus-defense.com",
  "CS Group": "cs-group.com",
  "Sofradir": "lynred.com",
  // Germany
  "Rheinmetall": "rheinmetall.com",
  "Krauss-Maffei Wegmann": "kmweg.de",
  "Diehl Defence": "diehl.com",
  "Hensoldt": "hensoldt.net",
  "MTU Aero Engines": "mtu.de",
  "Renk Group": "renk.eu",
  "ThyssenKrupp Marine": "thyssenkrupp-marine-systems.com",
  // Italy
  "Fincantieri": "fincantieri.com",
  "Elettronica": "elt.it",
  "Avio": "avio.com",
  // Scandinavia
  "Saab AB": "saab.com",
  "Nammo": "nammo.com",
  "Nammo Lapua": "nammo.com",
  "Kongsberg Defence": "kongsberg.com",
  "Patria": "patria.fi",
  // Iberian Peninsula
  "Indra Sistemas": "indracompany.com",
  "Navantia": "navantia.es",
  // Benelux
  "Damen Shipyards": "damen.com",
  "CMI Defence": "cmigroupe.com",
  "FN Herstal": "fnherstal.com",
  // Switzerland
  "Pilatus Aircraft": "pilatus-aircraft.com",
  "RUAG": "ruag.com",
  // Eastern Europe
  "Polska Grupa Zbrojeniowa": "pgzsa.pl",
  "WB Electronics": "wbelectronics.pl",
  "Czechoslovak Group": "czechoslovakgroup.cz",
  "Aero Vodochody": "aero.cz",
  // Israel
  "Elbit Systems": "elbitsystems.com",
  "Israel Aerospace Industries": "iai.co.il",
  "Rafael Advanced Defense": "rafael.co.il",
  // Japan
  "Mitsubishi Heavy Industries": "mhi.com",
  "Kawasaki Heavy Industries": "khi.co.jp",
  "IHI Corporation": "ihi.co.jp",
  "NEC Corporation": "nec.com",
  "Fujitsu Defense": "fujitsu.com",
  "Japan Steel Works": "jsw.co.jp",
  // South Korea
  "Hanwha Aerospace": "hanwhaaerospace.com",
  "Hanwha Defense": "hanwhadefense.com",
  "Korea Aerospace Industries": "koreaaero.com",
  "Hyundai Rotem": "hyundai-rotem.com",
  "LIG Nex1": "lignex1.com",
  // Singapore
  "ST Engineering": "stengg.com",
  "Singapore Technologies Aerospace": "stengg.com",
  // India
  "Bharat Electronics": "bel-india.in",
  "Hindustan Aeronautics": "hal-india.co.in",
  "Bharat Dynamics": "bdl-india.in",
  "Mazagon Dock": "mazagondock.in",
  "Cochin Shipyard": "cochinshipyard.in",
  "BEML": "bemlindia.in",
  // Australia
  "CEA Technologies": "ceatechnologies.com.au",
  "Electro Optic Systems": "eos-aus.com",
  "Austal": "austal.com",
  // Middle East & Africa
  "EDGE Group": "edgegroup.ae",
  "Emirates Defence Industries": "edi.ae",
  "SAMI": "sami.com.sa",
  "Paramount Group": "paramountgroup.biz",
  "Denel": "denel.co.za",
  // China
  "AVIC": "avic.com",
  "NORINCO": "norinco.com",
  "CSSC": "cssc.net.cn",
  "CASIC": "casic.com.cn",
  "CETC": "cetc.com.cn",
  // Turkey
  "Turkish Aerospace Industries": "tai.com.tr",
  "Aselsan": "aselsan.com",
  "Roketsan": "roketsan.com.tr",
  "STM": "stm.com.tr",
  "Baykar": "baykartech.com",
  // Latin America
  "Taurus Armas": "taurusarmas.com.br",
  "Embraer Defense": "embraer.com",
  "Avibras": "avibras.com.br",
  // Canada
  "CAE Inc": "cae.com",
};

// Direct Wikipedia Commons logo URLs — most reliable source, never blocked by ad-blockers.
// Special:FilePath redirects to the actual CDN URL transparently in <img> tags.
const WP = "https://commons.wikimedia.org/wiki/Special:FilePath/";
export const COMPANY_WIKI_LOGOS = {
  // USA
  "Lockheed Martin":               WP + "Lockheed_Martin_logo.svg",
  "Raytheon Technologies":         WP + "Raytheon_Technologies_logo.svg",
  "Boeing Defense":                WP + "Boeing_Full_Logotype.svg",
  "Northrop Grumman":              WP + "Northrop_Grumman_2011_logo.svg",
  "General Dynamics":              WP + "General_Dynamics_logo.svg",
  "L3Harris Technologies":         WP + "L3Harris_Technologies_logo.svg",
  "Leidos Holdings":               WP + "Leidos_logo.svg",
  "Booz Allen Hamilton":           WP + "Booz_Allen_Hamilton_logo.svg",
  "SAIC":                          WP + "SAIC_logo.svg",
  "Textron":                       WP + "Textron_logo.svg",
  "Palantir Technologies":         WP + "Palantir_Technologies_logo.svg",
  "Honeywell Aerospace":           WP + "Honeywell_logo.svg",
  "General Electric Aviation":     WP + "General_Electric_logo.svg",
  "Rolls-Royce Holdings":          WP + "Rolls-Royce_Holdings_logo.svg",
  "TransDigm":                     WP + "TransDigm_logo.svg",
  "Huntington Ingalls":            WP + "Huntington_Ingalls_Industries_logo.svg",
  "Parsons Corporation":           WP + "Parsons_Corporation_logo.svg",
  "Rocket Lab":                    WP + "Rocket_Lab_logo.svg",
  "AeroVironment":                 WP + "AeroVironment_logo.svg",
  // UK
  "BAE Systems":                   WP + "BAE_Systems_logo.svg",
  "Babcock International":         WP + "Babcock_International_Group_logo.svg",
  "QinetiQ":                       WP + "QinetiQ_logo.svg",
  // France
  "Airbus Defence & Space":        WP + "Airbus_Logo_2017.svg",
  "Airbus Defence Spain":          WP + "Airbus_Logo_2017.svg",
  "Thales":                        WP + "Thales_logo.svg",
  "Thales Nederland":              WP + "Thales_logo.svg",
  "Safran":                        WP + "Safran_logo.svg",
  "Dassault Aviation":             WP + "Logo_Dassault_Aviation.svg",
  "Naval Group":                   WP + "Naval_Group_logo.svg",
  "MBDA":                          WP + "MBDA_logo.svg",
  // Germany
  "Rheinmetall":                   WP + "Rheinmetall_logo.svg",
  "Hensoldt":                      WP + "Hensoldt_logo.svg",
  "MTU Aero Engines":              WP + "MTU_Aero_Engines_logo.svg",
  // Italy
  "Leonardo":                      WP + "Leonardo_(company)_logo.svg",
  "Fincantieri":                   WP + "Fincantieri_logo.svg",
  // Sweden / Norway
  "Saab AB":                       WP + "Saab_group.svg",
  "Kongsberg Defence":             WP + "Kongsberg_Gruppen_logo.svg",
  "Nammo":                         WP + "Nammo_logo.svg",
  // Spain
  "Indra Sistemas":                WP + "Indra_Sistemas_logo.svg",
  // Israel
  "Elbit Systems":                 WP + "Elbit_Systems_logo.svg",
  "Israel Aerospace Industries":   WP + "Israel_Aerospace_Industries_logo.svg",
  // Japan
  "Mitsubishi Heavy Industries":   WP + "Mitsubishi_Heavy_Industries_logo.svg",
  "Kawasaki Heavy Industries":     WP + "Kawasaki_Heavy_Industries_logo.svg",
  "IHI Corporation":               WP + "IHI_Corporation_logo.svg",
  // South Korea
  "Hanwha Aerospace":              WP + "Hanwha_logo.svg",
  "Korea Aerospace Industries":    WP + "Korea_Aerospace_Industries_logo.svg",
  // India
  "Hindustan Aeronautics":         WP + "HAL_logo.svg",
  "Bharat Electronics":            WP + "Bharat_Electronics_Limited_logo.png",
  "Bharat Dynamics":               WP + "Bharat_Dynamics_Limited_logo.png",
  "Mazagon Dock":                  WP + "Mazagon_Dock_Shipbuilders_logo.png",
  // Singapore
  "ST Engineering":                WP + "Singapore_Technologies_Engineering_logo.svg",
  // Australia
  "Austal":                        WP + "Austal_logo.svg",
  // Turkey
  "Turkish Aerospace Industries":  WP + "TUSAS_logo.svg",
  "Aselsan":                       WP + "Aselsan_logo.svg",
  "Baykar":                        WP + "Baykar_logo.png",
  // Latin America
  "Embraer Defense":               WP + "Embraer_logo.svg",
};

export function getLogoDomain(name) {
  return COMPANY_LOGOS[name] ?? null;
}

/**
 * Returns the best available logo URL for a company:
 * 1. Wikipedia Commons (hardcoded, reliable, never blocked)
 * 2. null (caller shows letter avatar)
 */
export function getLogoUrl(name) {
  return COMPANY_WIKI_LOGOS[name] ?? null;
}

// Kept for backward compat
export function getClearbitUrl(name) {
  return getLogoUrl(name);
}
