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
  "Huntington Ingalls": "hii.com",
  "Axon Enterprise": "axon.com",
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
  "Viasat": "viasat.com",
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
  "Airbus Defence & Space": "airbus.com",
  "Airbus Defence Spain": "airbus.com",
  "Leonardo": "leonardo.com",
  "Safran": "safran-group.com",
  "Dassault Aviation": "dassault-aviation.com",
  "MBDA": "mbda-systems.com",
  "Naval Group": "naval-group.com",
  "Nexter Systems": "knds.com",
  "KNDS": "knds.com",
  "KNDS France": "knds.com",
  "Arquus": "arquus-defense.com",
  // Joint programs / subsidiaries
  "Sikorsky": "lockheedmartin.com",
  "Oshkosh Defense": "oshkoshdefense.com",
  "ARTEC": "artec-vehicle.com",
  "Norinco": "norinco.com",
  "Ghost Robotics": "ghostrobotics.io",
  "Quantum Systems": "quantum-systems.com",
  "Harmattan AI": "harmattan.ai",
  "CS Group": "cs-group.com",
  "Sofradir": "lynred.com",
  // Germany
  "Rheinmetall": "rheinmetall.com",
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
  "Rostec": "rostec.ru",
  "Almaz-Antey": "almaz-antey.ru",
  "United Aircraft Corporation": "uacrussia.ru",
  // New companies
  "Exail Technologies": "exail-technologies.com",
  "Teledyne Technologies": "teledyne.com",
  "SERCO Group": "serco.com",
  "Milrem Robotics": "milremrobotics.com",
  "Terma A/S": "terma.com",
  "Dynamit Nobel Defence": "dynamit-nobel-defence.de",
  "Theon Sensors": "theon.com",
  "PZL Mielec": "pzlmielec.pl",
  // Private players — previously missing
  "Helsing": "helsing.ai",
  "STM Savunma": "stm.com.tr",
  "Blue Bear Systems": "bbsr.co.uk",
  "Basecamp Research": "basecamp-research.com",
  // France — additional entries
  "Exail Technologies": "exail.com",
  "Eutelsat": "eutelsat.com",
  "Comand AI": "comand.ai",
  "CS Group": "cs-group.com",
  // Ukraine
  "Ukroboronprom": "ukroboronprom.com",
  "Antonov": "antonov.com",
  "UkrSpecSystems": "ukrspecsystems.com",
  "Skyeton": "skyeton.com",
  "Kvertus": "kvertus.com",
  "LUCH Design Bureau": "luch.gov.ua",
  "Infozahyst": "infozahyst.com",
  "Motor Sich": "motorsich.com",
  "Tencore": "tencore.com.ua",
  "Ukrainian Armor": "ukrainianarmor.com",
  // Israel — acquired/state-owned
  "Israel Military Industries": "elbitsystems.com",
  // Russia
  "Kalashnikov Concern": "kalashnikov.com",
  // Saudi Arabia
  "Military Industries Corporation": "mic.com.sa",
  // India — state entities
  "Ordnance Factory Board": "ofbindia.gov.in",
  // Thales subsidiaries
  "Thales Nederland": "thalesgroup.com",
  "Thales Netherlands": "thalesgroup.com",
  "Thales Norway": "thalesgroup.com",
  // Germany — industrial
  "Atlas Elektronik": "atlas-elektronik.com",
  "Krauss-Maffei Wegmann": "kmweg.de",
  "Rohde & Schwarz": "rohde-schwarz.com",
  // Italy
  "Beretta Group": "beretta.com",
  // UK
  "Cobham": "cobham.com",
  "Cobham Advanced Electronics": "cobham.com",
  // USA
  "Cubic Corporation": "cubic.com",
  // Sweden / Scandinavia
  "Aimpoint AB": "aimpoint.com",
  "Weibel Scientific": "weibel.dk",
  // Spain
  "Expal Systems": "expal.com",
  "ITP Aero": "itpaero.com",
  "SENER Aerospace": "sener.es",
  // Turkey
  "FNSS Defence Systems": "fnss.com.tr",
  "Atlas Elektronik Turkey": "atlas-elektronik.com",
  // Netherlands
  "Fokker Technologies": "fokker.com",
  "GKN Fokker": "gknaerospace.com",
  // Belgium
  "SABCA": "sabca.be",
  // UAE
  "Halcon": "halcon.ae",
  // Argentina
  "INVAP": "invap.com.ar",
  "INVAP SE": "invap.com.ar",
  // India — private
  "Adani Defence and Aerospace": "adanidefence.com",
  "Larsen & Toubro Defence": "lntdefence.com",
  "Mahindra Defence Systems": "mahindradefence.com",
  "Tata Advanced Systems": "tataadvancedsystems.com",
  "Insta DefSec": "insta.fi",
  // Middle East
  "Arab Organization for Industrialization": "aoi.com.eg",
  "Advanced Electronics Company": "aec.com.sa",
  "KADDB": "kaddb.jo",
  // Brazil
  "AEL Sistemas": "aelsistemas.com.br",
  // Canada
  "PAL Aerospace": "palaerospace.com",
  // Pakistan
  "Pakistan Aeronautical Complex": "pac.org.pk",
  "Pakistan Ordnance Factories": "pof.gov.pk",
  // South Korea — JVs
  "Samsung Thales": "hanwhathales.com",
  // Thailand
  "Chaiseri Metal and Rubber": "chaiseri.com",
  // Poland
  "Mesko": "mesko.com.pl",
  // Bulgaria
  "Kintex JSC": "kintex.bg",
  // Serbia
  "Yugoimport SDPR": "yugoimport.com",
  // UK subsidiaries
  "BAE Systems Hägglunds": "baesystems.com",
  "Chemring Nobel": "chemring.co.uk",
  // Singapore subsidiary
  "ST Aerospace": "stengg.com",
  // Japan
  "Japan Marine United": "jmuc.co.jp",
  // French JV
  "Roxel": "roxelgroup.com",
  // Companies surfaced from M&A activity (added June 2026)
  "Firefly Aerospace": "fireflyspace.com",
  "Colt CZ Group": "cz-group.eu",
  "Meloche Group": "melocheinc.com",
  "A&B Aerospace": "abaerospace.com",
  // Switzerland (General Dynamics acquisition)
  "MOWAG": "gd.com",
  // Missing companies — case variants and subsidiaries
  "Aerojet Rocketdyne": "aerojetrocketdyne.com",
  "Bharat Forge": "bharatforge.com",
  "Defendtex": "defendtex.com",
  "Hanwha Systems": "hanwhasystems.com",
  "Leonardo DRS": "leonardodrs.com",
  "Mitsubishi Electric Defense": "mitsubishielectric.com",
  "NEC Defense Systems": "nec.com",
  "Otokar": "otokar.com",
  "Saab Dynamics": "saab.com",
  "Sabca": "sabca.be",
  "Serco Group": "serco.com",
  "ideaForge Technology": "ideaforgetech.com",
  // Defense Tech Startups
  "Harmattan AI": "harmattan.ai",
  "Harmattan.ai": "harmattan.ai",
  "Harmattan": "harmattan.ai",
  "Hermeus": "hermeus.com",
  "Saildrone": "saildrone.com",
  "Skydio": "skydio.com",
  "Epirus": "epirusinc.com",
  "True Anomaly": "trueanomaly.space",
  "Ursa Major Technologies": "ursamajor.com",
  "Ursa Major": "ursamajor.com",
  "Mach Industries": "machindustries.co",
  "Capella Space": "capellaspace.com",
  "Rebellion Defense": "rebelliondefense.com",
  "HawkEye 360": "he360.com",
  "Vannevar Labs": "vannevarlabs.com",
  "Dedrone": "dedrone.com",
  "Fortem Technologies": "fortemtech.com",
  "Overland AI": "overlandai.com",
  "Castelion": "castelion.com",
  "Applied Intuition": "appliedintuition.com",
  "Divergent Technologies": "divergent3d.com",
  "Sierra Space": "sierraspace.com",
  "Firestorm Labs": "firestormlabs.co",
  "DroneShield": "droneshield.com",
  "Iris Automation": "irisautomation.ai",
  "Safran AI": "safranai.com",
  "Sarcos Technology": "sarcos.com",
  "Palantir Technologies": "palantir.com",
  "Joby Aviation": "jobyaviation.com",
  "Reliable Robotics": "reliable.co",
  "Wisk Aero": "wisk.aero",
  "Archer Aviation": "archer.com",
  "Beta Technologies": "beta.team",
  "Boom Supersonic": "boomsupersonic.com",
  "Relativity Space": "relativityspace.com",
  "ABL Space Systems": "ablspacesystems.com",
  "Voyager Space": "voyagerspace.com",
  // France — Defense startups
  "CAILabs": "cailabs.com",
  "ECA Group": "ecagroup.com",
  "Lacroix Defense": "lacroix-defense.com",
  "Parrot Defense": "parrot.com",
  "Delair": "delair.aero",
  "Cerbair": "cerbair.com",
  "Unseenlabs": "unseenlabs.space",
  "Novadem": "novadem.com",
  "Texelis": "texelis.com",
  "Lynred": "lynred.com",
  "Turgis & Gaillard": "turgisgaillard.com",
  "Alta Ares": "altaares.com",
  "Shark Robotics": "shark-robotics.com",
  // USA — New defense tech companies
  "Saronic Technologies": "saronic.com",
  "Allen Control Systems": "allencontrolsystems.com",
  "Darkhive": "darkhive.ai",
  "HavocAI": "havocai.com",
  "Neros Technologies": "neros.tech",
  "Firehawk Aerospace": "firehawkaerospace.com",
  "AndrenaM": "andrenam.com",
  "Rampart Communications": "rampartcommunications.com",
  "OmniTeq": "omniteq.com",
  "AIKIDO Technologies": "aikidotechnologies.com",
  "Parry Labs": "parrylabs.com",
  "DEFCON AI": "defconai.com",
  "Duality AI": "duality.ai",
  "Exlabs": "exlabs.com",
  "Albedo Space": "albedo.space",
  "Turion Space": "turionspace.com",
  "Castelion": "castelion.com",
  "Chaos Industries": "chaosinc.com",
  "Picogrid": "picogrid.com",
  "Xona Space Systems": "xonaspace.com",
  // Finland / Northern Europe
  "ICEYE": "iceye.com",
  "SensusQ": "sensusq.com",
  // Germany — new
  "Alpine Eagle": "alpineeagle.com",
  "ARX Robotics": "arx-robotics.com",
  "Stark Defence": "stark-defence.com",
  // Baltics
  "Origin Robotics": "origin-robotics.com",
  "Farsight Vision": "farsightvision.com",
  "Defendec": "defendec.com",
  "Frankenburg Technologies": "frankenburg.tech",
  // Southern Europe
  "Tekever": "tekever.com",
  "Sateliot": "sateliot.space",
  // UK — new
  "Open Cosmos": "open-cosmos.com",
  // Israel — new
  "D-Fend Solutions": "d-fendsolutions.com",
  "Xtend": "xtend.me",
  "SpearUAV": "spearuav.com",
  "Orca AI": "orca.ai",
  // India — new
  "NewSpace Research and Technologies": "newspace.co.in",
  "Raphe mPhibr": "mphibr.com",
  "Tonbo Imaging": "tonboimaging.com",
  // Canada
  "Kraken Robotics": "krakenrobotics.com",
  // UAE — new
  "Aerodrome Group": "aerodrome-group.com",
  "Calidus": "calidus.ae",
  // South Korea — new
  "Nearthlab": "nearthlab.com",
  "Hancom InSpace": "inspace.co.kr",
  // Singapore
  "ShieldWorks AI": "shieldworks.ai",
  // Australia — new
  "Athena AI": "sightlineintelligence.com",
  "High Earth Orbit Robotics": "heorobotics.com",
  "SYPAQ Systems": "sypaq.com.au",
  "Advanced Navigation": "advancednavigation.com",
  "DroneShield": "droneshield.com",
  // Baltic states
  "SAF Tehnika": "saftehnika.com",
  "Dati Group": "datigroup.com",
  "Brolis Semiconductors": "brolis-semicon.com",
  "Teltonika Networks": "teltonika-networks.com",
  // Poland — additional
  "HSW": "hsw.pl",
  "PCO SA": "pcosa.com.pl",
  "AMZ-Kutno": "amz.com.pl",
  // Romania
  "Romarm": "romarm.ro",
  "IAR SA": "iar.ro",
  // Czech Republic — additional
  "RETIA": "retia.cz",
  "Tatra Defence Vehicle": "tatra.cz",
  // Greece
  "Intracom Defense Electronics": "intracomdefense.com",
  "Hellenic Aerospace Industry": "haicorp.com",
  // Portugal
  "OGMA": "ogma.pt",
  // Denmark — additional
  "Systematic A/S": "systematic.com",
  // Italy — additional
  "Beretta Defence": "beretta.com",
  "Piaggio Aerospace": "piaggioaerospace.it",
  // Austria
  "Steyr Arms": "steyr-arms.com",
  "Diamond Aircraft": "diamondaircraft.com",
  // UK — additional
  "Smiths Detection": "smithsdetection.com",
  "Marshall Aerospace": "marshallaerospace.com",
  // Taiwan
  "AIDC": "aidc.com.tw",
  "NCSIST": "ncsist.org.tw",
  // Indonesia
  "PT Dirgantara Indonesia": "indonesian-aerospace.com",
  "Pindad": "pindad.com",
  // Malaysia
  "Destini Berhad": "destini.com.my",
  // Vietnam
  "Viettel Military Industry": "viettel.com.vn",
  // Indonesia — additional
  "PT LEN Industri": "len.co.id",
  // China — additional
  "CASC": "spacechina.com",
  "CSIC": "csic.com.cn",
  "AVIC Helicopter": "avic.com.cn",
  "China Electronics Technology Group": "cetc.com.cn",
  "NORINCO International": "norinco.com",
  "Poly Technologies": "polytechnologies.com",
  "DJI Defense": "dji.com",
  // Poland — additional
  "ZM Mesko": "mesko.com.pl",
  "Bumar-Łabędy": "bumarlabedy.pl",
  "ZM Tarnów": "zmtarnow.pl",
  "RADMOR": "radmor.com.pl",
  "OBRUM": "obrum.pl",
  "Hertz Systems": "hertzsystems.pl",
  // Australia — additional
  "EOS Defence Systems": "eos-aus.com",
  // AI / Defense Tech startups
  "Tycho.AI": "tycho.ai",
  // Italy — additional
  "Acciai Speciali Terni": "arvedi.it",
  // France/Germany — KNDS
  "KNDS France (Nexter)": "knds.com",
  // Finland — additional
  "Patria Finland": "patriagroup.com",
  // Canada — additional
  "Kraken Robotics": "krakenrobotics.com",
  // UAE — additional
  "Calidus": "calidus.ae",
  // USA — additional defense tech
  "Saronic Technologies": "saronic.com",
  "Chaos Industries": "chaosinc.com",
  "Xona Space Systems": "xonaspace.com",
  "Albedo Space": "albedo.space",
  "Firehawk Aerospace": "firehawkaerospace.com",
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
  // Textron — no confirmed Wikipedia logo, falls through to Clearbit (textron.com)
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
  "Safran":                        WP + "Logo_Safran.svg",
  "Dassault Aviation":             WP + "Dassault_Aviation_Logo.jpg",
  "MBDA":                          WP + "MBDA-Logo.svg",
  "Naval Group":                   WP + "Naval_Group_logo.svg",
  // France/Germany — KNDS group (merged from Nexter + KMW in 2015)
  "KNDS":                          WP + "KNDS_logo.svg",
  "KNDS France":                   WP + "KNDS_logo.svg",
  "KNDS Deutschland":              WP + "KNDS_logo.svg",
  // France — Land vehicle manufacturers
  "Arquus":                        WP + "Logo_Arquus.svg",
  "Texelis":                       WP + "Logo_Texelis.svg",
  // Germany
  "Rheinmetall":                   WP + "Rheinmetall_Logo_2021.svg",
  "Diehl Defence":                 "https://upload.wikimedia.org/wikipedia/commons/f/f0/Diehl_Logo.svg",
  "Hensoldt":                      WP + "Hensoldt_Logo_2020.svg",
  "ThyssenKrupp Marine":           "https://upload.wikimedia.org/wikipedia/commons/1/13/Thyssenkrupp_AG_Logo_2015.svg",
  // Italy
  "Leonardo":                      WP + "Logo_Leonardo.svg",
  "Fincantieri":                   WP + "Fincantieri_logo.svg",
  // Sweden / Norway / Finland
  "Saab AB":                       WP + "Saab_wordmark_blue.svg",
  "Saab Kockums":                  WP + "Saab_wordmark_blue.svg",
  "Kongsberg Defence":             WP + "Kongsberg_logo.svg",
  "Patria":                        WP + "Patria_(Finnish_company)_logo.svg",
  // Spain
  "Indra Sistemas":                WP + "Indra-Sistemas-Logo.svg",
  "Navantia":                      WP + "Navantia logo 2019.svg",
  // Benelux
  "FN Herstal":                    WP + "FN-Herstal-logo.svg",
  // Switzerland
  "Pilatus Aircraft":              WP + "Pilatus_Aircraft_logo.svg",
  // Israel
  "Elbit Systems":                 "https://upload.wikimedia.org/wikipedia/en/7/74/Elbit_Systems_logo-en.svg",
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
  "ST Engineering":                "https://upload.wikimedia.org/wikipedia/en/7/7b/ST_Engineering_Logo.svg",
  // Turkey
  "Turkish Aerospace Industries":  WP + "Turkish_Aerospace_Industries_logo.svg",
  "Aselsan":                       WP + "ASELSAN_logo.svg",
  // Australia
  "Austal":                        WP + "Austal_logo.svg",
  // Canada
  "CAE Inc":                       WP + "CAE_inc._logo_2022.svg",
  // Latin America
  "Embraer Defense":               WP + "Embraer_logo.svg",
  // USA — mid-tier
  "Huntington Ingalls":            WP + "Huntington_Ingalls_Industries_logo.svg",
  "Axon Enterprise":               WP + "Axon_Enterprise_logo.svg",
  "Triumph Group":                 WP + "Triumph_Group_logo.svg",
  "ManTech International":         WP + "ManTech International logo.png",
  "Hexcel":                        WP + "Hexcel_logo.svg",
  // V2X Inc has no Wikipedia Commons logo — falls through to Clearbit (v2x.com)
  // Viasat has no Wikipedia Commons logo — falls through to Clearbit (viasat.com)
  "Redwire Corporation":           WP + "Redwire logo.svg",
  "HEICO Corporation":             WP + "HEICO_logo.png",
  // Parsons Corporation — falls through to Clearbit (parsons.com)
  "SAIC":                          WP + "SAIC_logo.svg",
  "Leidos Holdings":               WP + "Leidos_logo_2013.svg",
  "Mercury Systems":               WP + "Mercury_Systems_logo.svg",
  "AeroVironment":                 WP + "AeroVironment Logo.png",
  "Curtiss-Wright":                WP + "Curtiss-Wright_logo.svg",
  "Moog Inc":                      WP + "MOOG Logo.png",
  "CACI International":            WP + "CACI_logo.svg",
  "Peraton":                       WP + "Peraton_logo.svg",
  "Collins Aerospace":             WP + "Collins_Aerospace_logo.svg",
  "Pratt & Whitney":               WP + "Pratt_%26_Whitney_logo.svg",
  "General Electric Aviation":     WP + "General_Electric_logo.svg",
  "Kaman Aerospace":               WP + "Kaman_Corporation_logo.svg",
  "Maxar Technologies":            WP + "Maxar_Technologies_logo.svg",
  // Sierra Nevada Corporation — no confirmed Wikipedia logo, falls through to Clearbit (sncorp.com)
  // Shield AI has no Wikipedia Commons logo — falls through to Clearbit (shield.ai)
  "General Atomics":               WP + "General_Atomics_logo.svg",
  "Spirit AeroSystems":            WP + "Spirit_AeroSystems_logo.svg",
  "BWX Technologies":              WP + "BWX_Technologies_logo.svg",
  "TransDigm":                     WP + "TransDigm_Group_logo.svg",
  // Japan — additional
  "IHI Corporation":               "https://upload.wikimedia.org/wikipedia/commons/0/0d/IHI_logo.svg",
  "NEC Corporation":               WP + "NEC_logo.svg",
  "Fujitsu Defense":               WP + "Fujitsu_logo.svg",
  // South Korea — additional
  "Hyundai Rotem":                 WP + "Hyundai Rotem logo.svg",
  // India — additional
  "Cochin Shipyard":               "https://upload.wikimedia.org/wikipedia/en/2/22/Cochin_Shipyard_SVG_Logo.svg",
  // Scandinavia
  "Nammo":                         WP + "Nammo_logo.svg",
  // Germany — additional
  "MTU Aero Engines":              WP + "MTU_Aero_Engines_Logo.svg",
  "Renk Group":                    WP + "RENK_AG_logo.svg",
  "ThyssenKrupp Marine":           "https://upload.wikimedia.org/wikipedia/commons/1/13/Thyssenkrupp_AG_Logo_2015.svg",
  // Middle East — falls through to Clearbit for SAMI/Paramount (no confirmed Wikipedia logos)
  // Ukraine — falls through to Clearbit for smaller entities
  "Ukroboronprom":                 WP + "Ukroboronprom_logo.svg",
  "Antonov":                       WP + "Antonov Design Bureau Logo.png",
  "Motor Sich":                    WP + "Motor_Sich_logo.svg",
  // Russia — additional
  "Rostec":                        WP + "Rostec_logo.svg",
  "Almaz-Antey":                   WP + "Almaz-Antey_Logo.svg",
  "Uralvagonzavod":                WP + "Uralvagonzavod_logo.svg",
  "RSK MiG":                       WP + "Mikoyan_logo.svg",
  "Tupolev":                       WP + "Tupolev_logo.svg",
  "Sevmash":                       WP + "Sevmash_logo.svg",
  "Tactical Missiles Corporation": WP + "Tactical_Missiles_Corporation_logo.svg",
  // USA — additional manufacturers
  "Sikorsky":                      WP + "Sikorsky_Aircraft_Corporation_logo.svg",
  "Oshkosh Defense":               WP + "Oshkosh_Corporation_logo.svg",
  "Ghost Robotics":                WP + "Ghost_Robotics_logo.svg",
  // Norinco (case variant used in Products)
  "Norinco":                       "https://iconape.com/wp-content/png_logo_vector/norinco-logo.png",
  // Italy
  // Elettronica has no Wikipedia Commons logo — falls through to Clearbit (elt.it)
  "Avio":                          WP + "Avio_logo.svg",
  // UK — additional
  "Cohort":                        WP + "Cohort_plc_logo.svg",
  "Chemring Group":                WP + "Chemring_logo.svg",
  // Switzerland
  "RUAG":                          WP + "RUAG AG logo.svg",
  // Poland
  "Polska Grupa Zbrojeniowa":      WP + "PGZ_logo.svg",
  "WB Electronics":                "https://upload.wikimedia.org/wikipedia/en/4/49/WB_Group_corporate_logo.png",
  "Mesko":                         WP + "Mesko_logo.svg",
  // Czech Republic / Slovakia
  "Aero Vodochody":                WP + "Aero_Vodochody_logo.svg",
  "Czechoslovak Group":            WP + "Czechoslovak_Group_logo.svg",
  // Benelux
  "Damen Shipyards":               WP + "Damen logo.svg",
  "CMI Defence":                   WP + "CMI_Defence_logo.svg",
  // UAE
  "Emirates Defence Industries":   WP + "Emirates_Defence_Industries_logo.svg",
  "EDGE Group":                    WP + "EDGE_Group_logo.svg",
  "Halcon":                        WP + "Halcon_logo.svg",
  // South Africa
  "Denel":                         WP + "Denel_logo.svg",
  "Paramount Group":               WP + "Paramount_Group_logo.svg",
  // Canada — additional
  "MDA Space":                     WP + "MDA_Ltd._logo.svg",
  // Australia — additional
  "Austal":                        WP + "Austal_logo.svg",
  // Latin America
  "Taurus Armas":                  WP + "Taurus Logo.svg",
  // USA — additional
  "Anduril Industries":            WP + "Anduril_Industries_Logo.svg",
  // Kratos Defense — no confirmed Wikipedia logo, falls through to Clearbit (kratosdefense.com)
  "Teledyne Technologies":         WP + "Teledyne logo.svg",
  "SERCO Group":                   WP + "Serco_logo.svg",
  "Serco Group":                   WP + "Serco_logo.svg",
  // Turkey
  "Roketsan":                      WP + "Roketsan_logo.svg",
  "Baykar":                        WP + "BaykarLogo.png",
  "Havelsan":                      WP + "Havelsan_logo.svg",
  "STM":                           WP + "STM_Savunma_logo.svg",
  "STM Savunma":                   WP + "STM_Savunma_logo.svg",
  "FNSS Defence Systems":          WP + "FNSS_logo.svg",
  // South Korea
  "LIG Nex1":                      WP + "LIG Nex1 CI Logo.svg",
  "Hyundai Rotem":                 WP + "Hyundai Rotem logo.svg",
  // Estonia
  "Milrem Robotics":               WP + "Milrem_Robotics_logo.svg",
  // Denmark
  "Terma A/S":                     WP + "Terma logo.jpeg",
  // India — direct CDN URLs (Wikipedia filenames incorrect; Indian govt sites return globe favicon)
  "Hindustan Aeronautics":         "https://companieslogo.com/img/orig/HAL.NS_BIG-46cfe121.png",
  "Bharat Electronics":            "https://companieslogo.com/img/orig/BEL.NS_BIG-b2d0690e.png",
  "Bharat Dynamics":               "https://bdl-india.in/sites/default/files/bhar-d.png",
  "Mazagon Dock":                  "https://mazagondock.in/Assets/images/logo.svg",
  "BEML":                          "https://companieslogo.com/img/orig/BEML.NS_BIG-9e6d12c7.png",
  // China — direct CDN URLs (Clearbit blocks .cn; Wikipedia filenames unreliable)
  "AVIC":                          "https://cdn.worldvectorlogo.com/logos/aviation-industry-corporation-of-china-avic-.svg",
  "NORINCO":                       "https://iconape.com/wp-content/png_logo_vector/norinco-logo.png",
  "CSSC":                          "https://companieslogo.com/img/orig/600150.SS-2ef2328e.png",
  "CASIC":                         WP + "China_Aerospace_Science_and_Industry_Corporation_logo.svg",
  "CETC":                          WP + "China_Electronics_Technology_Group_Corporation_logo.svg",
  "CSGC":                          WP + "China_South_Industries_Group_Corporation_logo.svg",
  // Russia — direct URLs (Clearbit blocks .ru)
  "Rostec":                        "https://www.rostec.ru/local/templates/rostec2/assets/img/logo.svg",
  "United Aircraft Corporation":   WP + "United_Aircraft_Corporation_logo.svg",
  "United Shipbuilding Corporation": WP + "United_Shipbuilding_Corporation_logo.svg",
  "Almaz-Antey":                   WP + "Almaz-Antey_Logo.svg",
  // Saudi Arabia
  "SAMI":                          "https://upload.wikimedia.org/wikipedia/commons/1/1f/SAMI_Logo.svg",
  "Military Industries Corporation": WP + "MIC_Saudi_logo.svg",
  // Italy — additional
  "Beretta Defence":            WP + "Beretta_logo.svg",
  // Germany — additional
  "Helsing":                    WP + "Helsing_logo.svg",
  // Taiwan
  "AIDC":                       "https://upload.wikimedia.org/wikipedia/en/a/a8/Aerospace_Industrial_Development_Corporation_logo.png",
  // Indonesia
  "PT Dirgantara Indonesia":    WP + "Indonesian_Aerospace.svg",
  "Pindad":                     WP + "Logo_PT_Pindad.svg",
  // Czech Republic
  "Tatra Defence Vehicle":      WP + "Tatra_logo.svg",
  // Vietnam
  "Viettel Military Industry":  WP + "Viettel_logo.svg",
  // Australia
  "DroneShield":                WP + "DroneShield_logo.svg",
  // UK additional
  "Smiths Detection":           WP + "Smiths_Detection_logo.svg",
  // Finland
  "ICEYE":                      WP + "ICEYE_logo.svg",
  // Germany — additional industrials
  "Krauss-Maffei Wegmann":      WP + "Krauss-Maffei_Wegmann_logo.svg",
  "Rohde & Schwarz":            WP + "Rohde_%26_Schwarz_Logo.svg",
  // Italy — Beretta group
  "Beretta Group":              WP + "Beretta_logo.svg",
  // UK — Cobham
  "Cobham":                     "https://upload.wikimedia.org/wikipedia/commons/8/8d/Cobham_plc_logo.svg",
  "Cobham Advanced Electronics": "https://upload.wikimedia.org/wikipedia/commons/8/8d/Cobham_plc_logo.svg",
  // USA — Cubic
  "Cubic Corporation":          WP + "Cubic_Corporation_logo.svg",
  // Thales subsidiaries — use parent logo
  "Thales Nederland":           WP + "Thales_Logo.svg",
  "Thales Netherlands":         WP + "Thales_Logo.svg",
  "Thales Norway":              WP + "Thales_Logo.svg",
  // Sweden
  "BAE Systems Hägglunds":      WP + "BAE_Systems_logo.svg",
  // Norway
  "Chemring Nobel":             WP + "Chemring_logo.svg",
  // Spain
  "Expal Systems":              WP + "Expal_Systems_logo.svg",
  // Netherlands
  "Fokker Technologies":        WP + "Fokker_logo.svg",
  // India — private groups
  "Larsen & Toubro Defence":    "https://upload.wikimedia.org/wikipedia/en/a/a1/Larsen%26Toubro_logo.svg",
  "Adani Defence and Aerospace": "https://upload.wikimedia.org/wikipedia/commons/d/d4/Adani_logo_2012.svg",
  "Tata Advanced Systems":      WP + "Tata_logo.svg",
  // Israel
  "Israel Military Industries": WP + "Elbit_Systems_logo.svg",
  // Russia
  "Kalashnikov Concern":        WP + "Kalashnikov_Concern_logo.svg",
  // Brazil
  "AEL Sistemas":               WP + "AEL_Sistemas_logo.svg",
  // Japan
  "Japan Marine United":        "https://upload.wikimedia.org/wikipedia/commons/e/e2/Japan_Marine_United_logo.gif",
  // New companies added June 2026
  "PT LEN Industri":            WP + "Logo_PT_LEN_Industri.svg",
  "CASC":                       WP + "China_Aerospace_Science_and_Technology_Corporation_logo.svg",
  "CSIC":                       WP + "China_Shipbuilding_Industry_Corporation_logo.svg",
  "AVIC Helicopter":            WP + "Aviation_Industry_Corporation_of_China_logo.svg",
  "NORINCO International":      WP + "Norinco_logo.svg",
  "Poly Technologies":          WP + "Poly_Technologies_logo.svg",
  "DJI Defense":                WP + "DJI_logo.svg",
  "ZM Mesko":                   WP + "Mesko_logo.svg",
  "Bumar-Łabędy":               WP + "Bumar_Labedy_logo.svg",
  "ZM Tarnów":                  WP + "ZM_Tarnow_logo.svg",
  "RADMOR":                     WP + "RADMOR_logo.svg",
  "EOS Defence Systems":        WP + "EOS_Defence_Systems_logo.svg",
  "KNDS France (Nexter)":       WP + "KNDS_logo.svg",
  "Patria Finland":             WP + "Patria_(Finnish_company)_logo.svg",
  // Additional missing companies
  "Aerojet Rocketdyne":         WP + "Aerojet_Rocketdyne_logo.svg",
  "Hanwha Systems":             WP + "Hanwha_logo.svg",
  "Leonardo DRS":               WP + "Leonardo_DRS_logo.svg",
  "Mitsubishi Electric Defense": WP + "Mitsubishi_Electric_logo.svg",
  "NEC Defense Systems":        WP + "NEC_logo.svg",
  "Otokar":                     WP + "Otokar_logo.svg",
  "Saab Dynamics":              WP + "Saab_wordmark_blue.svg",
  "Sabca":                      WP + "SABCA_logo.svg",
  "Bharat Forge":               WP + "Bharat_Forge_logo.svg",
  "ideaForge Technology":       WP + "IdeasForge_logo.svg",
  // ── Verified direct logo URLs (curl-checked 200 + image/*, June 2026) ──────
  // These take priority over the favicon chain and are used when a company has
  // no reliable Wikipedia Commons file and no favicon at its domain.
  "Raphe mPhibr":               "https://cdn.prod.website-files.com/64cb501935377f51369fa3c5/650029b2207c106cc4696201_raphe.svg",
  "Kvertus":                    "https://kvertus.com/wp-content/uploads/2025/09/Kvertus.svg",
  "NewSpace Research and Technologies": "https://newspace.co.in/wp-content/uploads/2024/05/NewSpace-Logo-200x37.png",
  "Frankenburg Technologies":   "https://frankenburg.tech/wp-content/uploads/2026/02/Frankenburg-Tech-Logo-Black_Transparent-163x79.png",
  "Theon Sensors":              "https://media.theon.com/zksgumfy/transparentlogo.svg",
  "Infozahyst":                 "https://infozahyst.com/wp-content/themes/infoz/design/img/logo.svg",
  "Dati Group":                 "https://cdn.prod.website-files.com/6012e786f1a69fda9a85c413/66fa5594e44a93083c51886a_DatiGroup_Logotips_RGB_tumsi_zals.svg",
  "Brolis Semiconductors":      "https://brolis-semicon.com/wp-content/themes/brolis-defence/img/logo.png",
  "Steyr Arms":                 "https://upload.wikimedia.org/wikipedia/en/4/4c/Steyr_Mannlicher.svg",
  "Ultra Electronics":          "https://upload.wikimedia.org/wikipedia/en/0/08/Ultra_Electronics_logo.jpg",
  "Avibras":                    "https://upload.wikimedia.org/wikipedia/commons/4/4d/Avibras_logo.png",
  "Piaggio Aerospace":          "https://upload.wikimedia.org/wikipedia/commons/9/9c/Piaggio_Aerospace_Logo.svg",
  "Diamond Aircraft":           "https://upload.wikimedia.org/wikipedia/commons/0/0d/Diamond_Aircraft_logo.svg",
  "Reaction Engines":           "https://upload.wikimedia.org/wikipedia/en/1/12/Reaction_Engines_logo_2019.svg",
  "Japan Steel Works":          "https://upload.wikimedia.org/wikipedia/commons/7/73/JSW.svg",
  "Mahindra Defence Systems":   "https://upload.wikimedia.org/wikipedia/commons/8/89/Mahindra_logo.svg",
  "CEA Technologies":           "https://upload.wikimedia.org/wikipedia/en/b/b1/CEA_Technologies_transparent_logo.gif",
  "Elettronica":                "https://upload.wikimedia.org/wikipedia/commons/d/de/ELT_Group_Logo.svg",
  "OGMA":                       "https://upload.wikimedia.org/wikipedia/commons/1/1b/Logo_OGMA.jpg",
  // Names that also appear on the M&A page (shared via logoUrlsFor)
  "Bombardier":                 "https://upload.wikimedia.org/wikipedia/commons/9/98/Bombardier_2024.svg",
  "Hispasat":                   "https://upload.wikimedia.org/wikipedia/commons/9/93/Hispasat_logo_2022.svg",
  "De Havilland Canada":        "https://upload.wikimedia.org/wikipedia/en/2/26/De_Havilland_Canada_logo.svg",
  "Diehl":                      "https://upload.wikimedia.org/wikipedia/commons/f/f0/Diehl_Logo.svg",
  "Diehl Stiftung":             "https://upload.wikimedia.org/wikipedia/commons/f/f0/Diehl_Logo.svg",
  "ThyssenKrupp Marine Systems": "https://upload.wikimedia.org/wikipedia/commons/1/13/Thyssenkrupp_AG_Logo_2015.svg",
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

// Returns Wikipedia logo if available, then a live favicon source, then null.
// NOTE: Clearbit (logo.clearbit.com) was shut down end-2025 and now serves a
// generic grey placeholder image at HTTP 200 — it never triggers onError, so it
// would mask every real logo behind it. We no longer use it anywhere.
export function getClearbitUrl(name) {
  if (COMPANY_WIKI_LOGOS[name]) return COMPANY_WIKI_LOGOS[name];
  const domain = COMPANY_LOGOS[name];
  if (domain) return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
  return null;
}

// TLDs where the favicon services return a generic placeholder (or are blocked).
// Companies on these TLDs rely on their hardcoded COMPANY_WIKI_LOGOS entry.
export const FAVICON_SKIP_TLDS = [".cn", ".ru", ".gov.in", ".co.in", "-india.in", ".gov.ua", ".org.tw", ".com.tw"];

// Returns ordered list of logo URLs to try: [wikipedia?, google-favicon?, ddg-favicon?]
// Both favicon services return a clean HTTP 404 for domains that do not resolve,
// so onError fires correctly and we fall through to the coloured letter avatar.
// Clearbit was removed: now that it is dead it only ever served a grey globe that
// stuck (HTTP 200) and hid the real logo underneath.
export function getLogoUrls(name) {
  const urls = [];
  if (COMPANY_WIKI_LOGOS[name]) urls.push(COMPANY_WIKI_LOGOS[name]);
  const domain = COMPANY_LOGOS[name];
  if (domain) {
    const skipFavicon = FAVICON_SKIP_TLDS.some((tld) => domain.endsWith(tld));
    if (!skipFavicon) {
      urls.push(`https://www.google.com/s2/favicons?domain=${domain}&sz=128`);
      urls.push(`https://icons.duckduckgo.com/ip3/${domain}.ico`);
    }
  }
  return urls;
}
