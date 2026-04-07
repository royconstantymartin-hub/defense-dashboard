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

/**
 * Returns a Clearbit logo URL for the given company name, or null if unknown.
 */
export function getLogoDomain(name) {
  return COMPANY_LOGOS[name] ?? null;
}

export function getClearbitUrl(name) {
  const domain = getLogoDomain(name);
  return domain ? `https://logo.clearbit.com/${domain}` : null;
}

export function getGoogleFaviconUrl(name) {
  const domain = getLogoDomain(name);
  return domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=64` : null;
}
