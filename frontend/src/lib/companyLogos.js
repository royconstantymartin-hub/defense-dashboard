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
  "Helsing": "helsing.ai",
  // Italy
  "Fincantieri": "fincantieri.com",
  "Elettronica": "elt.it",
  "Avio": "avio.com",
  // Scandinavia
  "Saab AB": "saab.com",
  "Saab Kockums": "saabkockums.se",
  "Nammo": "nammo.com",
  "Nammo Lapua": "nammo.com",
  "Kongsberg Defence": "kongsberg.com",
  "Patria": "patria.fi",
  // Iberian Peninsula
  "Indra Sistemas": "indracompany.com",
  "Navantia": "navantia.es",
  // Benelux
  "Damen Shipyards": "damen.com",
  "Damen Naval": "damen.com",
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
  "Havelsan": "havelsan.com.tr",
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
  "Hanwha Ocean": "hanwhaocean.com",
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
  "AVIC": "avic.com.cn",
  "NORINCO": "norinco.com",
  "CSSC": "cssc.net.cn",
  "CASIC": "casic.com.cn",
  "CETC": "cetc.com.cn",
  "CSGC": "csgc.com.cn",
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
  // Russia
  "Sevmash": "sevmash.ru",
  // New companies
  "Exail Technologies": "exail-technologies.com",
  "Teledyne Technologies": "teledyne.com",
  "SERCO Group": "serco.com",
  "Milrem Robotics": "milremrobotics.com",
  "Terma A/S": "terma.com",
  "Dynamit Nobel Defence": "dynamit-nobel-defence.de",
  "Theon Sensors": "theonsensors.com",
  "PZL Mielec": "pzl.mielec.pl",
  // Defense Tech Startups
  "Harmattan.ai": "harmattan.ai",
  "Harmattan": "harmattan.ai",
  "Hermeus": "hermeus.com",
  "Skydio": "skydio.com",
  "Epirus": "epirusinc.com",
  "True Anomaly": "trueanomaly.space",
  "Ursa Major": "ursamajor.com",
  "Mach Industries": "machindustries.co",
  "Capella Space": "capellaspace.com",
  "Rebellion Defense": "rebelliondefense.com",
  "Preligens": "preligens.com",
  "Sarcos Technology": "sarcos.com",
  "Palantir Technologies": "palantir.com",
  "Windtree Therapeutics": "windtree.com",
  "Joby Aviation": "jobyaviation.com",
  "Reliable Robotics": "reliable.co",
  "Wisk Aero": "wisk.aero",
  "Archer Aviation": "archer.com",
  "Beta Technologies": "beta.team",
  "Boom Supersonic": "boomsupersonic.com",
  "Relativity Space": "relativityspace.com",
  "Astra Space": "astra.com",
  "ABL Space Systems": "ablspacesystems.com",
  "Voyager Space": "voyagerspace.com",
  "Sierra Space": "sierraspace.com",
  "Nuro": "nuro.ai",
};

// Direct Wikipedia Commons logo URLs — confirmed filenames, never blocked by ad-blockers.
// Special:FilePath redirects to the actual CDN URL transparently in <img> tags.
const WP = "https://commons.wikimedia.org/wiki/Special:FilePath/";
export const COMPANY_WIKI_LOGOS = {
  // USA
  "Lockheed Martin":               WP + "Lockheed_Martin_logo.svg",
  "Raytheon Technologies":         WP + "Raytheon_(RTX)_logo.svg",
  "Boeing Defense":                WP + "Boeing_full_logo.svg",
  "Northrop Grumman":              WP + "Northrop_Grumman_logo_blue-on-clear_2020.svg",
  "General Dynamics":              WP + "General_Dynamics_logo.svg",
  "L3Harris Technologies":         WP + "L3Harris_Technologies_logo.svg",
  "Leidos Holdings":               WP + "Leidos_logo_2013.svg",
  "Booz Allen Hamilton":           WP + "Booz_Allen_Hamilton_logo.svg",
  "Textron":                       WP + "Textron_logo.svg",
  "Palantir Technologies":         WP + "Palantir_Technologies_logo.svg",
  "Honeywell Aerospace":           WP + "Honeywell_logo.svg",
  "General Electric Aviation":     WP + "General_Electric_logo.svg",
  "TransDigm":                     WP + "TransDigm_Group_logo.svg",
  "Rocket Lab":                    WP + "Rocket_Lab_logo.svg",
  // UK
  "BAE Systems":                   WP + "BAE_Systems_logo.svg",
  "Rolls-Royce Holdings":          WP + "Rolls_royce_holdings_logo.svg",
  "Babcock International":         WP + "Babcock_new_logo.svg",
  "QinetiQ":                       WP + "QinetiQ-Logo.svg",
  // France
  "Airbus Defence & Space":        WP + "Airbus_Logo_2017.svg",
  "Airbus Defence Spain":          WP + "Airbus_Logo_2017.svg",
  "Airbus":                        WP + "Airbus_Logo_2017.svg",
  "Airbus Helicopters":            WP + "Airbus_Logo_2017.svg",
  "Indra":                         WP + "Indra_Sistemas_logo.svg",
  "Thales":                        WP + "Thales_Logo.svg",
  "Thales Nederland":              WP + "Thales_Logo.svg",
  "Safran":                        WP + "Logo_Safran.svg",
  "Dassault Aviation":             WP + "Dassault_Aviation_Logo.jpg",
  "MBDA":                          WP + "MBDA-Logo.svg",
  "Naval Group":                   WP + "Naval_Group_logo.svg",
  // Germany
  "Rheinmetall":                   WP + "Rheinmetall_Logo_2021.svg",
  "Krauss-Maffei Wegmann":         WP + "KMW-logo.svg",
  "Diehl Defence":                 WP + "Diehl_Defence_Logo.svg",
  "Hensoldt":                      WP + "Hensoldt_Logo_2020.svg",
  "ThyssenKrupp Marine":           WP + "Thyssenkrupp_Logo.svg",
  // Italy
  "Leonardo":                      WP + "Logo_Leonardo.svg",
  "Fincantieri":                   WP + "Fincantieri_logo.svg",
  // Sweden / Norway
  "Saab AB":                       WP + "Saab_wordmark_blue.svg",
  "Saab Kockums":                  WP + "Saab_wordmark_blue.svg",
  "Kongsberg Defence":             WP + "Kongsberg_logo.svg",
  // Spain
  "Indra Sistemas":                WP + "Indra_Sistemas_logo.svg",
  "Navantia":                      WP + "Navantia.svg",
  // Benelux
  "FN Herstal":                    WP + "FN-Herstal-logo.svg",
  // Switzerland
  "Pilatus Aircraft":              WP + "Pilatus_Aircraft_logo.svg",
  // Israel
  "Elbit Systems":                 WP + "Elbit_Systems_logo.svg",
  "Israel Aerospace Industries":   WP + "IAI_Corporation_Logo.svg",
  "Rafael Advanced Defense":       WP + "RAFAEL_logo.png",
  // Japan
  "Mitsubishi Heavy Industries":   WP + "Mhi_logo_en.svg",
  "Mitsubishi/Kawasaki":           WP + "Mhi_logo_en.svg",
  "Kawasaki Heavy Industries":     WP + "Kawasaki_Heavy_Industries_Logo.svg",
  // South Korea
  "Korea Aerospace Industries":    WP + "Korea_Aerospace_Industries_logo.svg",
  "Hanwha Aerospace":              WP + "Hanwha_Aerospace_logo.svg",
  "Hanwha Defense":                WP + "Hanwha_logo.svg",
  "Hanwha Ocean":                  WP + "Hanwha_logo.svg",
  // Russia
  "Rostec":                        WP + "Rostec_logo.svg",
  "United Shipbuilding Corporation": WP + "United_Shipbuilding_Corporation_logo.svg",
  // Singapore
  "ST Engineering":                WP + "Singapore_Technologies_Engineering_logo.svg",
  // Turkey
  "Turkish Aerospace Industries":  WP + "Turkish_Aerospace_Industries_logo.svg",
  "Aselsan":                       WP + "ASELSAN_logo.svg",
  // Australia
  "Austal":                        WP + "Austal_logo.svg",
  // Canada
  "CAE Inc":                       WP + "CAE_inc._logo_2022.svg",
  // Latin America
  "Embraer Defense":               WP + "Embraer_logo.svg",
  // USA — additional
  "Anduril Industries":            WP + "Anduril_Industries_Logo.svg",
  "Kratos Defense":                WP + "Kratos_Defense_%26_Security_Solutions_logo.svg",
  "Teledyne Technologies":         WP + "Teledyne_Technologies_logo.svg",
  "SERCO Group":                   WP + "Serco_logo.svg",
  // Turkey
  "Roketsan":                      WP + "Roketsan_logo.svg",
  "Baykar":                        WP + "Baykar_logo.png",
  "Havelsan":                      WP + "Havelsan_logo.svg",
  // South Korea
  "LIG Nex1":                      WP + "LIG_Nex1_logo.svg",
  "Hyundai Rotem":                 WP + "Hyundai_Rotem_Logo.svg",
  // Estonia
  "Milrem Robotics":               WP + "Milrem_Robotics_logo.svg",
  // Denmark
  "Terma A/S":                     WP + "Terma_logo.svg",
  // India
  "Hindustan Aeronautics":         WP + "Hindustan_Aeronautics_Limited_Logo.svg",
  "Bharat Electronics":            WP + "Bharat_Electronics_Limited_logo.svg",
  "Bharat Dynamics":               WP + "Bharat_Dynamics_Limited_logo.svg",
  "Mazagon Dock":                  WP + "Mazagon_Dock_Shipbuilders_Limited_logo.svg",
  // China
  "AVIC":                          WP + "Avic_logo.svg",
  "NORINCO":                       WP + "Norinco_logo.svg",
  "CSSC":                          WP + "China_State_Shipbuilding_Corporation_logo.svg",
  "CASIC":                         WP + "China_Aerospace_Science_and_Industry_Corporation_logo.svg",
  // Russia
  "United Aircraft Corporation":   WP + "United_Aircraft_Corporation_logo.svg",
  "United Shipbuilding Corporation": WP + "United_Shipbuilding_Corporation_logo.svg",
  "Almaz-Antey":                   WP + "Almaz-Antey_Logo.svg",
  // South Africa
  "Denel":                         WP + "Denel_logo.svg",
  // UAE
  "EDGE Group":                    WP + "EDGE_Group_logo.svg",
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

// Returns Wikipedia logo if available, then clearbit fallback, then null
export function getClearbitUrl(name) {
  if (COMPANY_WIKI_LOGOS[name]) return COMPANY_WIKI_LOGOS[name];
  const domain = COMPANY_LOGOS[name];
  if (domain) return `https://logo.clearbit.com/${domain}`;
  return null;
}

// Returns ordered list of logo URLs to try: [wikipedia?, clearbit?]
// Allows the UI to fall through each URL on error before showing a letter avatar.
export function getLogoUrls(name) {
  const urls = [];
  if (COMPANY_WIKI_LOGOS[name]) urls.push(COMPANY_WIKI_LOGOS[name]);
  const domain = COMPANY_LOGOS[name];
  if (domain) urls.push(`https://logo.clearbit.com/${domain}`);
  return urls;
}
