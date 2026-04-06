const state = {
  route: 'dashboard',
  followTab: 'all',
  xFeedTab: 'all',
  marketSort: 'marketCapUsd',
  marketDir: 'desc'
};

const db = {
  sources: [
    { id:'s1', source_name:'US Department of Defense', source_type:'official', publisher:'DoD', source_url:'https://www.defense.gov/News/Releases/', source_title:'DoD Release', publication_date:'2026-03-03', retrieved_at:'2026-03-03', last_verified_at:'2026-03-03', trust_tier:'official', source_logo_url:'' },
    { id:'s2', source_name:'Janes', source_type:'media', publisher:'Janes', source_url:'https://www.janes.com/', source_title:'Janes Report', publication_date:'2026-03-01', retrieved_at:'2026-03-01', last_verified_at:'2026-03-01', trust_tier:'specialist', source_logo_url:'' },
    { id:'s3', source_name:'Reuters', source_type:'media', publisher:'Reuters', source_url:'https://www.reuters.com/', source_title:'Reuters Market', publication_date:'2026-03-02', retrieved_at:'2026-03-02', last_verified_at:'2026-03-02', trust_tier:'tier_1', source_logo_url:'' },
    { id:'s4', source_name:'SIPRI', source_type:'dataset', publisher:'SIPRI', source_url:'https://www.sipri.org/databases/milex', source_title:'Military Expenditure DB', publication_date:'2026-02-20', retrieved_at:'2026-02-24', last_verified_at:'2026-02-24', trust_tier:'tier_1', source_logo_url:'' },
    { id:'s5', source_name:'Defense News', source_type:'media', publisher:'Defense News', source_url:'https://www.defensenews.com/', source_title:'Defense News Brief', publication_date:'2026-03-01', retrieved_at:'2026-03-01', last_verified_at:'2026-03-01', trust_tier:'specialist', source_logo_url:'' },
    { id:'s6', source_name:'Billet de France', source_type:'analyst', publisher:'Billet de France', source_url:'https://billetdefrance.fr/', source_title:'Commentary', publication_date:'2026-02-28', retrieved_at:'2026-03-01', last_verified_at:'2026-03-01', trust_tier:'secondary', source_logo_url:'' }
  ],
  countries: [
    { code:'AU', name:'Australia', flag:'🇦🇺' },
    { code:'BR', name:'Brazil', flag:'🇧🇷' },
    { code:'CA', name:'Canada', flag:'🇨🇦' },
    { code:'DE', name:'Germany', flag:'🇩🇪' },
    { code:'ES', name:'Spain', flag:'🇪🇸' },
    { code:'FR', name:'France', flag:'🇫🇷' },
    { code:'GB', name:'United Kingdom', flag:'🇬🇧' },
    { code:'IL', name:'Israel', flag:'🇮🇱' },
    { code:'IN', name:'India', flag:'🇮🇳' },
    { code:'IT', name:'Italy', flag:'🇮🇹' },
    { code:'JP', name:'Japan', flag:'🇯🇵' },
    { code:'KR', name:'South Korea', flag:'🇰🇷' },
    { code:'NO', name:'Norway', flag:'🇳🇴' },
    { code:'SE', name:'Sweden', flag:'🇸🇪' },
    { code:'SG', name:'Singapore', flag:'🇸🇬' },
    { code:'TR', name:'Turkey', flag:'🇹🇷' },
    { code:'US', name:'United States', flag:'🇺🇸' }
  ],
  companies: [
    { id:'c1', name:'Lockheed Martin', logo:'https://logo.clearbit.com/lockheedmartin.com', country:'US', ticker:'LMT', exchange:'NYSE', price:468.21, change:1.2, marketCap:112.4, currency:'USD', revenue:67.6, specialization:'Aerospace / Missile Defense', website:'https://www.lockheedmartin.com/', ir:'https://investors.lockheedmartin.com/', linkedin:'https://www.linkedin.com/company/lockheed-martin/', x:'https://x.com/LockheedMartin', description:'Prime contractor across aerospace, missile defense and integrated mission systems.', listed:true },
    { id:'c2', name:'RTX', logo:'https://logo.clearbit.com/rtx.com', country:'US', ticker:'RTX', exchange:'NYSE', price:103.35, change:-0.8, marketCap:137.2, currency:'USD', revenue:68.9, specialization:'Aerospace / Propulsion', website:'https://www.rtx.com/', ir:'https://investors.rtx.com/', linkedin:'https://www.linkedin.com/company/rtx/', x:'https://x.com/RTX_News', description:'Major defense and aerospace supplier covering missiles, sensors and propulsion.', listed:true },
    { id:'c3', name:'BAE Systems', logo:'https://logo.clearbit.com/baesystems.com', country:'GB', ticker:'BA.', yf_ticker:'BA.L', exchange:'LSE', price:14.12, change:0.4, marketCap:44.8, currency:'GBP', revenue:27.3, specialization:'Naval / Air / Land', website:'https://www.baesystems.com/', ir:'https://investors.baesystems.com/', linkedin:'https://www.linkedin.com/company/bae-systems/', x:'https://x.com/BAESystemsplc', description:'Integrated defense prime with broad land, sea and air portfolio.', listed:true },
    { id:'c4', name:'Thales', logo:'https://logo.clearbit.com/thalesgroup.com', country:'FR', ticker:'HO', yf_ticker:'HO.PA', exchange:'Euronext Paris', price:152.4, change:1.9, marketCap:32.2, currency:'EUR', revenue:18.4, specialization:'Defense Electronics', website:'https://www.thalesgroup.com/', ir:'https://www.thalesgroup.com/en/investor', linkedin:'https://www.linkedin.com/company/thales/', x:'https://x.com/thalesgroup', description:'Defense electronics and mission systems specialist.', listed:true },
    { id:'c5', name:'Rheinmetall', logo:'https://logo.clearbit.com/rheinmetall.com', country:'DE', ticker:'RHM', yf_ticker:'RHM.DE', exchange:'Xetra', price:497.0, change:2.3, marketCap:21.9, currency:'EUR', revenue:9.8, specialization:'Land Systems / Munitions', website:'https://www.rheinmetall.com/', ir:'https://www.rheinmetall.com/en/investor-relations', linkedin:'https://www.linkedin.com/company/rheinmetall/', x:'', description:'Land systems and munitions supplier driving European rearmament.', listed:true },
    { id:'c6', name:'Leonardo', logo:'https://logo.clearbit.com/leonardo.com', country:'IT', ticker:'LDO', yf_ticker:'LDO.MI', exchange:'Borsa Italiana', price:25.6, change:-0.4, marketCap:14.7, currency:'EUR', revenue:15.3, specialization:'Helicopters / Electronics', website:'https://www.leonardo.com/', ir:'https://www.leonardo.com/en/investors', linkedin:'https://www.linkedin.com/company/leonardo-company/', x:'', description:'European aerospace and defense contractor.', listed:true },
    { id:'c7', name:'Saab', logo:'https://logo.clearbit.com/saab.com', country:'SE', ticker:'SAAB-B', yf_ticker:'SAAB-B.ST', exchange:'Nasdaq Stockholm', price:87.3, change:1.1, marketCap:13.1, currency:'SEK', revenue:6.2, specialization:'Air Defense / Sensors', website:'https://www.saab.com/', ir:'https://www.saab.com/investors', linkedin:'https://www.linkedin.com/company/saab/', x:'', description:'Swedish defense company focused on sensors and air/sea systems.', listed:true },
    { id:'c8', name:'Kongsberg', logo:'https://logo.clearbit.com/kongsberg.com', country:'NO', ticker:'KOG', yf_ticker:'KOG.OL', exchange:'Oslo Børs', price:84.1, change:0.7, marketCap:12.4, currency:'NOK', revenue:4.9, specialization:'Naval / Missile / C2', website:'https://www.kongsberg.com/', ir:'https://www.kongsberg.com/investor-relations/', linkedin:'https://www.linkedin.com/company/kongsberg/', x:'', description:'Nordic defense and maritime systems provider.', listed:true },
    { id:'c9',  name:'Northrop Grumman', logo:'https://logo.clearbit.com/northropgrumman.com', country:'US', ticker:'NOC', exchange:'NYSE', price:489.30, change:-0.5, marketCap:71.2, currency:'USD', revenue:39.3, specialization:'Aerospace / Cyber / Space', website:'https://www.northropgrumman.com/', ir:'https://investors.northropgrumman.com/', linkedin:'https://www.linkedin.com/company/northrop-grumman/', x:'https://x.com/northropgrumman', description:'Aerospace, defense, and cyber security prime serving US and allied governments.', listed:true },
    { id:'c10', name:'Boeing Defense', logo:'https://logo.clearbit.com/boeing.com', country:'US', ticker:'BA', exchange:'NYSE', price:172.55, change:-1.3, marketCap:103.8, currency:'USD', revenue:24.9, specialization:'Aerospace / Space', website:'https://www.boeing.com/', ir:'https://investors.boeing.com/', linkedin:'https://www.linkedin.com/company/boeing/', x:'https://x.com/Boeing', description:'Major aerospace and defense contractor with broad military aircraft and space portfolio.', listed:true },
    { id:'c11', name:'General Dynamics', logo:'https://logo.clearbit.com/gd.com', country:'US', ticker:'GD', exchange:'NYSE', price:271.40, change:0.3, marketCap:74.6, currency:'USD', revenue:42.3, specialization:'Land Systems / Naval / IT', website:'https://www.gd.com/', ir:'https://investors.gd.com/', linkedin:'https://www.linkedin.com/company/general-dynamics/', x:'https://x.com/GeneralDynamics', description:'Diversified defense prime covering land systems, shipbuilding, and defense IT.', listed:true },
    { id:'c12', name:'L3Harris', logo:'https://logo.clearbit.com/l3harris.com', country:'US', ticker:'LHX', exchange:'NYSE', price:234.10, change:0.6, marketCap:44.1, currency:'USD', revenue:21.3, specialization:'Defense Electronics / Space', website:'https://www.l3harris.com/', ir:'https://investors.l3harris.com/', linkedin:'https://www.linkedin.com/company/l3harris-technologies/', x:'https://x.com/L3HarrisTech', description:'Defense electronics and communication systems specialist for air, land, sea and space.', listed:true },
    { id:'c13', name:'Huntington Ingalls', logo:'https://logo.clearbit.com/huntingtoningalls.com', country:'US', ticker:'HII', exchange:'NYSE', price:219.80, change:-0.9, marketCap:8.3, currency:'USD', revenue:11.5, specialization:'Naval / Shipbuilding', website:'https://www.huntingtoningalls.com/', ir:'https://investors.huntingtoningalls.com/', linkedin:'https://www.linkedin.com/company/huntington-ingalls-industries/', x:'https://x.com/hii_news', description:'America\'s largest military shipbuilder, constructing nuclear-powered submarines and surface combatants.', listed:true },
    { id:'c14', name:'TransDigm', logo:'https://logo.clearbit.com/transdigm.com', country:'US', ticker:'TDG', exchange:'NYSE', price:1248.60, change:1.1, marketCap:68.4, currency:'USD', revenue:7.9, specialization:'Aerospace Components', website:'https://www.transdigm.com/', ir:'https://investors.transdigm.com/', linkedin:'https://www.linkedin.com/company/transdigm-group/', x:'', description:'Manufacturer of highly engineered aerospace components and subsystems for defense and commercial aviation.', listed:true },
    { id:'c15', name:'Heico', logo:'https://logo.clearbit.com/heico.com', country:'US', ticker:'HEI', exchange:'NYSE', price:239.50, change:0.8, marketCap:32.7, currency:'USD', revenue:3.8, specialization:'Aerospace MRO / Components', website:'https://www.heico.com/', ir:'https://ir.heico.com/', linkedin:'https://www.linkedin.com/company/heico/', x:'', description:'Aviation parts manufacturer and MRO services provider supporting defense and commercial fleets.', listed:true },
    { id:'c16', name:'Leidos', logo:'https://logo.clearbit.com/leidos.com', country:'US', ticker:'LDOS', exchange:'NYSE', price:146.20, change:-0.2, marketCap:20.9, currency:'USD', revenue:15.4, specialization:'Defense IT / Intelligence', website:'https://www.leidos.com/', ir:'https://ir.leidos.com/', linkedin:'https://www.linkedin.com/company/leidos/', x:'https://x.com/leidos_inc', description:'Defense and intelligence IT services company supporting US and allied government missions.', listed:true },
    { id:'c17', name:'MBDA', logo:'https://logo.clearbit.com/mbda-systems.com', country:'FR', ticker:'', exchange:'Private', price:0, change:0, marketCap:10.0, currency:'EUR', revenue:4.2, specialization:'Missiles / Guided Weapons', website:'https://www.mbda-systems.com/', ir:'https://www.mbda-systems.com/', linkedin:'https://www.linkedin.com/company/mbda/', x:'https://x.com/MBDA_Systems', description:'European missile systems consortium (BAE Systems / Airbus / Leonardo) and largest missile maker in Europe.', listed:false },
    { id:'c18', name:'SAIC', logo:'https://logo.clearbit.com/saic.com', country:'US', ticker:'SAIC', exchange:'NYSE', price:0, change:0, marketCap:0, currency:'USD', revenue:7.4, specialization:'Defense IT / Intelligence', website:'https://www.saic.com/', ir:'https://investors.saic.com/', linkedin:'https://www.linkedin.com/company/saic/', x:'https://x.com/SAIC_Inc', description:'Defense IT and intelligence services contractor for US government and military.', listed:true },
    { id:'c19', name:'Booz Allen Hamilton', logo:'https://logo.clearbit.com/boozallen.com', country:'US', ticker:'BAH', exchange:'NYSE', price:0, change:0, marketCap:0, currency:'USD', revenue:10.7, specialization:'Defense IT / Consulting', website:'https://www.boozallen.com/', ir:'https://ir.boozallen.com/', linkedin:'https://www.linkedin.com/company/booz-allen-hamilton/', x:'https://x.com/BoozAllen', description:'Defense and intelligence consulting and analytics firm.', listed:true },
    { id:'c20', name:'Kratos Defense', logo:'https://logo.clearbit.com/kratosdefense.com', country:'US', ticker:'KTOS', exchange:'NASDAQ', price:0, change:0, marketCap:0, currency:'USD', revenue:1.1, specialization:'Drones / Satellites / Defense Tech', website:'https://www.kratosdefense.com/', ir:'https://ir.kratosdefense.com/', linkedin:'https://www.linkedin.com/company/kratos-defense-and-security-solutions/', x:'https://x.com/KratosDefense', description:'Drone, satellite and high-speed tactical systems developer.', listed:true },
    { id:'c21', name:'Mercury Systems', logo:'https://logo.clearbit.com/mrcy.com', country:'US', ticker:'MRCY', exchange:'NASDAQ', price:0, change:0, marketCap:0, currency:'USD', revenue:0.9, specialization:'Defense Electronics / Processing', website:'https://www.mrcy.com/', ir:'https://investors.mrcy.com/', linkedin:'https://www.linkedin.com/company/mercury-systems/', x:'', description:'Mission-critical processing and electronics for defense platforms.', listed:true },
    { id:'c22', name:'Curtiss-Wright', logo:'https://logo.clearbit.com/curtisswright.com', country:'US', ticker:'CW', exchange:'NYSE', price:0, change:0, marketCap:0, currency:'USD', revenue:3.1, specialization:'Defense Electronics / Naval', website:'https://www.curtisswright.com/', ir:'https://investors.curtisswright.com/', linkedin:'https://www.linkedin.com/company/curtiss-wright/', x:'', description:'Defense electronics and controls for naval and aerospace platforms.', listed:true },
    { id:'c23', name:'Moog Inc', logo:'https://logo.clearbit.com/moog.com', country:'US', ticker:'MOG.A', exchange:'NYSE', price:0, change:0, marketCap:0, currency:'USD', revenue:3.4, specialization:'Precision Motion / Actuation', website:'https://www.moog.com/', ir:'https://ir.moog.com/', linkedin:'https://www.linkedin.com/company/moog/', x:'', description:'Precision motion control for defense aircraft, missiles and naval systems.', listed:true },
    { id:'c24', name:'Textron', logo:'https://logo.clearbit.com/textron.com', country:'US', ticker:'TXT', exchange:'NYSE', price:0, change:0, marketCap:0, currency:'USD', revenue:13.7, specialization:'Helicopters / Aircraft / Ground Vehicles', website:'https://www.textron.com/', ir:'https://investors.textron.com/', linkedin:'https://www.linkedin.com/company/textron/', x:'https://x.com/Textron', description:'Bell helicopters, military aircraft and armored vehicles manufacturer.', listed:true },
    { id:'c25', name:'Teledyne Technologies', logo:'https://logo.clearbit.com/teledyne.com', country:'US', ticker:'TDY', exchange:'NYSE', price:0, change:0, marketCap:0, currency:'USD', revenue:5.6, specialization:'Defense Sensors / Imaging', website:'https://www.teledyne.com/', ir:'https://www.teledyne.com/en-us/investor-relations/', linkedin:'https://www.linkedin.com/company/teledyne-technologies/', x:'', description:'Sensors, imaging and instrumentation for defense and space.', listed:true },
    { id:'c26', name:'AeroVironment', logo:'https://logo.clearbit.com/avinc.com', country:'US', ticker:'AVAV', exchange:'NASDAQ', price:0, change:0, marketCap:0, currency:'USD', revenue:0.7, specialization:'UAS / Loitering Munitions', website:'https://www.avinc.com/', ir:'https://ir.avinc.com/', linkedin:'https://www.linkedin.com/company/aerovironment/', x:'https://x.com/AeroVironment', description:'Tactical drones and loitering munitions for US Army and allies.', listed:true },
    { id:'c27', name:'Parsons Corporation', logo:'https://logo.clearbit.com/parsons.com', country:'US', ticker:'PSN', exchange:'NYSE', price:0, change:0, marketCap:0, currency:'USD', revenue:6.1, specialization:'Defense IT / Infrastructure', website:'https://www.parsons.com/', ir:'https://investors.parsons.com/', linkedin:'https://www.linkedin.com/company/parsons-corporation/', x:'https://x.com/ParsonsCorp', description:'Federal defense IT, cyber and critical infrastructure engineering.', listed:true },
    { id:'c28', name:'Leonardo DRS', logo:'https://logo.clearbit.com/leonardodrs.com', country:'US', ticker:'DRS', exchange:'NASDAQ', price:0, change:0, marketCap:0, currency:'USD', revenue:2.6, specialization:'Defense Electronics / Ground Systems', website:'https://www.leonardodrs.com/', ir:'https://ir.leonardodrs.com/', linkedin:'https://www.linkedin.com/company/leonardo-drs/', x:'', description:'Defense electronics and ground vehicle systems for US DoD.', listed:true },
    { id:'c29', name:'CACI International', logo:'https://logo.clearbit.com/caci.com', country:'US', ticker:'CACI', exchange:'NYSE', price:0, change:0, marketCap:0, currency:'USD', revenue:7.1, specialization:'Defense IT / Intelligence', website:'https://www.caci.com/', ir:'https://investor.caci.com/', linkedin:'https://www.linkedin.com/company/caci-international/', x:'https://x.com/CACIIntl', description:'IT solutions and services for defense and intelligence community.', listed:true },
    { id:'c30', name:'BWX Technologies', logo:'https://logo.clearbit.com/bwxt.com', country:'US', ticker:'BWXT', exchange:'NYSE', price:0, change:0, marketCap:0, currency:'USD', revenue:2.8, specialization:'Nuclear Defense / Naval Reactors', website:'https://www.bwxt.com/', ir:'https://investors.bwxt.com/', linkedin:'https://www.linkedin.com/company/bwx-technologies/', x:'', description:'Nuclear components and reactors for US Navy submarines.', listed:true },
    { id:'c31', name:'Palantir Technologies', logo:'https://logo.clearbit.com/palantir.com', country:'US', ticker:'PLTR', exchange:'NYSE', price:0, change:0, marketCap:0, currency:'USD', revenue:2.9, specialization:'Defense AI / Data Analytics', website:'https://www.palantir.com/', ir:'https://investors.palantir.com/', linkedin:'https://www.linkedin.com/company/palantir-technologies/', x:'https://x.com/PalantirTech', description:'AI-powered analytics platforms for defense and intelligence agencies.', listed:true },
    { id:'c32', name:'Rocket Lab USA', logo:'https://logo.clearbit.com/rocketlabusa.com', country:'US', ticker:'RKLB', exchange:'NASDAQ', price:0, change:0, marketCap:0, currency:'USD', revenue:0.4, specialization:'Space Launch / Defense Satellites', website:'https://www.rocketlabusa.com/', ir:'https://investors.rocketlabusa.com/', linkedin:'https://www.linkedin.com/company/rocket-lab/', x:'https://x.com/RocketLab', description:'Small satellite launch vehicles and spacecraft for defense missions.', listed:true },
    { id:'c33', name:'Axon Enterprise', logo:'https://logo.clearbit.com/axon.com', country:'US', ticker:'AXON', exchange:'NASDAQ', price:0, change:0, marketCap:0, currency:'USD', revenue:2.0, specialization:'Public Safety Technology', website:'https://www.axon.com/', ir:'https://investor.axon.com/', linkedin:'https://www.linkedin.com/company/axon-enterprise/', x:'https://x.com/axon_us', description:'Tasers, body cameras and cloud software for law enforcement.', listed:true },
    { id:'c34', name:'Amentum Holdings', logo:'https://logo.clearbit.com/amentum.com', country:'US', ticker:'AMTM', exchange:'NYSE', price:0, change:0, marketCap:0, currency:'USD', revenue:13.0, specialization:'Defense Services / Government', website:'https://www.amentum.com/', ir:'https://investors.amentum.com/', linkedin:'https://www.linkedin.com/company/amentum/', x:'', description:'Global defense and government services contractor.', listed:true },
    { id:'c35', name:'KBR Inc', logo:'https://logo.clearbit.com/kbr.com', country:'US', ticker:'KBR', exchange:'NYSE', price:0, change:0, marketCap:0, currency:'USD', revenue:7.5, specialization:'Defense Engineering / Services', website:'https://www.kbr.com/', ir:'https://investors.kbr.com/', linkedin:'https://www.linkedin.com/company/kbr-inc/', x:'https://x.com/KBRInc', description:'Defense engineering, logistics and sustainment services worldwide.', listed:true },
    { id:'c36', name:'OSI Systems', logo:'https://logo.clearbit.com/osi-systems.com', country:'US', ticker:'OSIS', exchange:'NASDAQ', price:0, change:0, marketCap:0, currency:'USD', revenue:1.4, specialization:'Security Electronics / Detection', website:'https://www.osi-systems.com/', ir:'https://investors.osi-systems.com/', linkedin:'https://www.linkedin.com/company/osi-systems/', x:'', description:'Security inspection and optoelectronics for defense and border security.', listed:true },
    { id:'c37', name:'BigBear.ai', logo:'https://logo.clearbit.com/bigbear.ai', country:'US', ticker:'BBAI', exchange:'NYSE', price:0, change:0, marketCap:0, currency:'USD', revenue:0.2, specialization:'Defense AI / Analytics', website:'https://bigbear.ai/', ir:'https://ir.bigbear.ai/', linkedin:'https://www.linkedin.com/company/bigbear-ai/', x:'https://x.com/BigBear_ai', description:'AI decision intelligence for defense and intelligence missions.', listed:true },
    { id:'c38', name:'Olin Corporation', logo:'https://logo.clearbit.com/olin.com', country:'US', ticker:'OLN', exchange:'NYSE', price:0, change:0, marketCap:0, currency:'USD', revenue:7.0, specialization:'Ammunition / Defense Chemicals', website:'https://www.olin.com/', ir:'https://investors.olin.com/', linkedin:'https://www.linkedin.com/company/olin-corporation/', x:'', description:'Winchester ammunition and defense chemicals manufacturer.', listed:true },
    { id:'c39', name:'Vista Outdoor', logo:'https://logo.clearbit.com/vistaoutdoor.com', country:'US', ticker:'VSTO', exchange:'NYSE', price:0, change:0, marketCap:0, currency:'USD', revenue:3.0, specialization:'Ammunition / Outdoor Defense', website:'https://www.vistaoutdoor.com/', ir:'https://investors.vistaoutdoor.com/', linkedin:'https://www.linkedin.com/company/vista-outdoor/', x:'', description:'Federal, CCI and Speer ammunition brands for military and law enforcement.', listed:true },
    { id:'c40', name:'Sturm Ruger', logo:'https://logo.clearbit.com/ruger.com', country:'US', ticker:'RGR', exchange:'NYSE', price:0, change:0, marketCap:0, currency:'USD', revenue:0.5, specialization:'Firearms', website:'https://www.ruger.com/', ir:'https://www.ruger.com/corporate/html/investor_relations/', linkedin:'https://www.linkedin.com/company/ruger/', x:'', description:'American firearms manufacturer for civilian, law enforcement and military markets.', listed:true },
    { id:'c41', name:'Smith & Wesson Brands', logo:'https://logo.clearbit.com/smith-wesson.com', country:'US', ticker:'SWBI', exchange:'NASDAQ', price:0, change:0, marketCap:0, currency:'USD', revenue:0.3, specialization:'Firearms', website:'https://www.smith-wesson.com/', ir:'https://ir.aob.com/', linkedin:'https://www.linkedin.com/company/smith-wesson/', x:'', description:'Iconic American handgun and rifle manufacturer.', listed:true },
    { id:'c42', name:'Hexcel Corporation', logo:'https://logo.clearbit.com/hexcel.com', country:'US', ticker:'HXL', exchange:'NYSE', price:0, change:0, marketCap:0, currency:'USD', revenue:1.8, specialization:'Aerospace Composites / Defense Materials', website:'https://www.hexcel.com/', ir:'https://investors.hexcel.com/', linkedin:'https://www.linkedin.com/company/hexcel/', x:'', description:'Advanced composite materials for fighter jets and defense structures.', listed:true },
    { id:'c43', name:'VSE Corporation', logo:'https://logo.clearbit.com/vsecorp.com', country:'US', ticker:'VSE', exchange:'NASDAQ', price:0, change:0, marketCap:0, currency:'USD', revenue:1.9, specialization:'Defense MRO / Logistics', website:'https://www.vsecorp.com/', ir:'https://investors.vsecorp.com/', linkedin:'https://www.linkedin.com/company/vse-corporation/', x:'', description:'Aviation and defense MRO, supply chain and logistics services.', listed:true },
    { id:'c44', name:'Viasat', logo:'https://logo.clearbit.com/viasat.com', country:'US', ticker:'VSAT', exchange:'NASDAQ', price:0, change:0, marketCap:0, currency:'USD', revenue:4.5, specialization:'Defense Satellite Communications', website:'https://www.viasat.com/', ir:'https://investors.viasat.com/', linkedin:'https://www.linkedin.com/company/viasat/', x:'https://x.com/ViaSat', description:'Military satellite communications and tactical data links.', listed:true },
    { id:'c45', name:'ICF International', logo:'https://logo.clearbit.com/icf.com', country:'US', ticker:'ICFI', exchange:'NASDAQ', price:0, change:0, marketCap:0, currency:'USD', revenue:2.0, specialization:'Defense Consulting / IT', website:'https://www.icf.com/', ir:'https://investor.icf.com/', linkedin:'https://www.linkedin.com/company/icf/', x:'', description:'Management consulting and technology services for US defense and federal agencies.', listed:true },
    { id:'c46', name:'QinetiQ Group', logo:'https://logo.clearbit.com/qinetiq.com', country:'GB', ticker:'QQ.', yf_ticker:'QQ.L', exchange:'LSE', price:0, change:0, marketCap:0, currency:'GBP', revenue:2.1, specialization:'Defense R&D / Test and Evaluation', website:'https://www.qinetiq.com/', ir:'https://www.qinetiq.com/en/investors', linkedin:'https://www.linkedin.com/company/qinetiq/', x:'https://x.com/QinetiQ', description:'Defense technology research and test and evaluation services for UK MoD and allies.', listed:true },
    { id:'c47', name:'Chemring Group', logo:'https://logo.clearbit.com/chemring.co.uk', country:'GB', ticker:'CHG', yf_ticker:'CHG.L', exchange:'LSE', price:0, change:0, marketCap:0, currency:'GBP', revenue:0.67, specialization:'Munitions / Countermeasures / CBRN', website:'https://www.chemring.co.uk/', ir:'https://www.chemring.co.uk/investors', linkedin:'https://www.linkedin.com/company/chemring-group/', x:'', description:'Munitions, countermeasures and CBRN detection systems for NATO forces.', listed:true },
    { id:'c48', name:'Babcock International', logo:'https://logo.clearbit.com/babcock.co.uk', country:'GB', ticker:'BAB', yf_ticker:'BAB.L', exchange:'LSE', price:0, change:0, marketCap:0, currency:'GBP', revenue:4.6, specialization:'Naval / Nuclear Services', website:'https://www.babcock.co.uk/', ir:'https://investors.babcockinternational.com/', linkedin:'https://www.linkedin.com/company/babcock-international-group/', x:'https://x.com/BabcockIntl', description:'Naval and nuclear support services for UK Royal Navy.', listed:true },
    { id:'c49', name:'Rolls-Royce Holdings', logo:'https://logo.clearbit.com/rolls-royce.com', country:'GB', ticker:'RR.', yf_ticker:'RR.L', exchange:'LSE', price:0, change:0, marketCap:0, currency:'GBP', revenue:17.9, specialization:'Defense Jet Engines / Naval Propulsion', website:'https://www.rolls-royce.com/', ir:'https://www.rolls-royce.com/investors/', linkedin:'https://www.linkedin.com/company/rolls-royce/', x:'https://x.com/rollsroyce', description:'Military jet engines and naval nuclear propulsion systems.', listed:true },
    { id:'c50', name:'Melrose Industries', logo:'https://logo.clearbit.com/melroseplc.net', country:'GB', ticker:'MRO', yf_ticker:'MRO.L', exchange:'LSE', price:0, change:0, marketCap:0, currency:'GBP', revenue:3.0, specialization:'Aerospace Structures / Defense Components', website:'https://www.melroseplc.net/', ir:'https://www.melroseplc.net/investors/', linkedin:'https://www.linkedin.com/company/melrose-industries/', x:'', description:'GKN Aerospace structures and defense components manufacturer.', listed:true },
    { id:'c51', name:'Avon Protection', logo:'https://logo.clearbit.com/avon-protection.com', country:'GB', ticker:'AVON', yf_ticker:'AVON.L', exchange:'LSE', price:0, change:0, marketCap:0, currency:'GBP', revenue:0.1, specialization:'CBRN Protection / Ballistics', website:'https://www.avon-protection.com/', ir:'https://www.avon-protection.com/investors/', linkedin:'https://www.linkedin.com/company/avon-protection/', x:'', description:'CBRN respirators and body armor for military and first responders.', listed:true },
    { id:'c52', name:'Serco Group', logo:'https://logo.clearbit.com/serco.com', country:'GB', ticker:'SRP', yf_ticker:'SRP.L', exchange:'LSE', price:0, change:0, marketCap:0, currency:'GBP', revenue:4.5, specialization:'Defense Services / Government', website:'https://www.serco.com/', ir:'https://www.serco.com/investors/', linkedin:'https://www.linkedin.com/company/serco/', x:'https://x.com/Serco_Group', description:'Defense and government services including base operations worldwide.', listed:true },
    { id:'c53', name:'Safran', logo:'https://logo.clearbit.com/safran-group.com', country:'FR', ticker:'SAF', yf_ticker:'SAF.PA', exchange:'Euronext Paris', price:0, change:0, marketCap:0, currency:'EUR', revenue:27.0, specialization:'Propulsion / Avionics / Navigation', website:'https://www.safran-group.com/', ir:'https://www.safran-group.com/investors', linkedin:'https://www.linkedin.com/company/safran/', x:'https://x.com/Safran', description:'Aircraft engines, navigation systems and defense electronics for military aviation.', listed:true },
    { id:'c54', name:'Airbus', logo:'https://logo.clearbit.com/airbus.com', country:'FR', ticker:'AIR', yf_ticker:'AIR.PA', exchange:'Euronext Paris', price:0, change:0, marketCap:0, currency:'EUR', revenue:69.0, specialization:'Military Aircraft / Space / Helicopters', website:'https://www.airbus.com/', ir:'https://www.airbus.com/en/investors', linkedin:'https://www.linkedin.com/company/airbus/', x:'https://x.com/Airbus', description:'Military transport aircraft, Eurofighter, helicopters and space systems.', listed:true },
    { id:'c55', name:'Dassault Aviation', logo:'https://logo.clearbit.com/dassault-aviation.com', country:'FR', ticker:'AM', yf_ticker:'AM.PA', exchange:'Euronext Paris', price:0, change:0, marketCap:0, currency:'EUR', revenue:7.5, specialization:'Fighter Aircraft', website:'https://www.dassault-aviation.com/', ir:'https://www.dassault-aviation.com/en/finance/', linkedin:'https://www.linkedin.com/company/dassault-aviation/', x:'https://x.com/Dassault_OnAir', description:'Rafale fighter jet manufacturer and Falcon business aviation.', listed:true },
    { id:'c56', name:'Hensoldt AG', logo:'https://logo.clearbit.com/hensoldt.net', country:'DE', ticker:'HAG', yf_ticker:'HAG.DE', exchange:'Xetra', price:0, change:0, marketCap:0, currency:'EUR', revenue:2.3, specialization:'Defense Sensors / Radar / Optronics', website:'https://www.hensoldt.net/', ir:'https://www.hensoldt.net/investors/', linkedin:'https://www.linkedin.com/company/hensoldt/', x:'https://x.com/HENSOLDT', description:'Radar, optronics and electronic warfare sensors for Bundeswehr and export.', listed:true },
    { id:'c57', name:'MTU Aero Engines', logo:'https://logo.clearbit.com/mtu.de', country:'DE', ticker:'MTX', yf_ticker:'MTX.DE', exchange:'Xetra', price:0, change:0, marketCap:0, currency:'EUR', revenue:7.5, specialization:'Defense Jet Engines / MRO', website:'https://www.mtu.de/', ir:'https://www.mtu.de/investors/', linkedin:'https://www.linkedin.com/company/mtu-aero-engines/', x:'https://x.com/MTUAeroEngines', description:'Military and civil jet engine manufacturer and MRO provider.', listed:true },
    { id:'c58', name:'Fincantieri', logo:'https://logo.clearbit.com/fincantieri.com', country:'IT', ticker:'FNC', yf_ticker:'FNC.MI', exchange:'Borsa Italiana', price:0, change:0, marketCap:0, currency:'EUR', revenue:8.5, specialization:'Naval Shipbuilding', website:'https://www.fincantieri.com/', ir:'https://www.fincantieri.com/en/investors/', linkedin:'https://www.linkedin.com/company/fincantieri/', x:'https://x.com/fincantieri', description:'Italian naval shipbuilder producing frigates, destroyers and submarines.', listed:true },
    { id:'c59', name:'Avio SpA', logo:'https://logo.clearbit.com/avio.com', country:'IT', ticker:'AV', yf_ticker:'AV.MI', exchange:'Borsa Italiana', price:0, change:0, marketCap:0, currency:'EUR', revenue:0.5, specialization:'Space Propulsion / Defense Launch', website:'https://www.avio.com/', ir:'https://www.avio.com/en/investors', linkedin:'https://www.linkedin.com/company/avio/', x:'', description:'Vega rocket propulsion and solid rocket motors for defense and space.', listed:true },
    { id:'c60', name:'Indra Sistemas', logo:'https://logo.clearbit.com/indracompany.com', country:'ES', ticker:'IDR', yf_ticker:'IDR.MC', exchange:'BME', price:0, change:0, marketCap:0, currency:'EUR', revenue:4.3, specialization:'Defense Electronics / Air Traffic', website:'https://www.indracompany.com/', ir:'https://www.indracompany.com/en/investors', linkedin:'https://www.linkedin.com/company/indra/', x:'https://x.com/IndraSistemas', description:'Spanish defense electronics, radar and command systems for NATO forces.', listed:true },
    { id:'c61', name:'ASELSAN', logo:'https://logo.clearbit.com/aselsan.com', country:'TR', ticker:'ASELS', yf_ticker:'ASELS.IS', exchange:'Borsa Istanbul', price:0, change:0, marketCap:0, currency:'TRY', revenue:50.0, specialization:'Defense Electronics / Communications', website:'https://www.aselsan.com/', ir:'https://www.aselsan.com/en/investor-relations', linkedin:'https://www.linkedin.com/company/aselsan/', x:'https://x.com/ASELSAN_AS', description:'Turkey largest defense electronics, communications and radar systems company.', listed:true },
    { id:'c62', name:'Elbit Systems', logo:'https://logo.clearbit.com/elbitsystems.com', country:'IL', ticker:'ESLT', exchange:'NASDAQ', price:0, change:0, marketCap:0, currency:'USD', revenue:6.5, specialization:'Defense Electronics / UAVs / Optronics', website:'https://www.elbitsystems.com/', ir:'https://ir.elbitsystems.com/', linkedin:'https://www.linkedin.com/company/elbit-systems/', x:'https://x.com/ElbitSystems', description:'Israeli defense electronics, UAVs, optronics and electronic warfare systems.', listed:true },
    { id:'c63', name:'Hanwha Aerospace', logo:'https://logo.clearbit.com/hanwha.com', country:'KR', ticker:'HNWHA', yf_ticker:'272210.KS', exchange:'KRX', price:0, change:0, marketCap:0, currency:'KRW', revenue:10000.0, specialization:'Aerospace Engines / Artillery / UAVs', website:'https://www.hanwhaaerospace.com/', ir:'https://www.hanwhaaerospace.com/', linkedin:'https://www.linkedin.com/company/hanwha-aerospace/', x:'', description:'South Korean aerospace engines, K9 artillery systems and drone manufacturer.', listed:true },
    { id:'c64', name:'LIG Nex1', logo:'https://logo.clearbit.com/lignex1.com', country:'KR', ticker:'LIGNEX1', yf_ticker:'015570.KS', exchange:'KRX', price:0, change:0, marketCap:0, currency:'KRW', revenue:2300.0, specialization:'Guided Weapons / Missiles / EW', website:'https://www.lignex1.com/', ir:'https://www.lignex1.com/', linkedin:'https://www.linkedin.com/company/lignex1/', x:'', description:'South Korean guided weapons, missiles and electronic warfare systems.', listed:true },
    { id:'c65', name:'Korea Aerospace Industries', logo:'https://logo.clearbit.com/koreaaero.com', country:'KR', ticker:'KAI', yf_ticker:'047810.KS', exchange:'KRX', price:0, change:0, marketCap:0, currency:'KRW', revenue:4200.0, specialization:'Military Aircraft / Helicopters', website:'https://www.koreaaero.com/', ir:'https://www.koreaaero.com/', linkedin:'https://www.linkedin.com/company/korea-aerospace-industries-ltd/', x:'', description:'T-50 trainer jet, FA-50 light fighter and KF-21 next-generation fighter developer.', listed:true },
    { id:'c66', name:'Hanwha Systems', logo:'https://logo.clearbit.com/hanwha.com', country:'KR', ticker:'HWASYS', yf_ticker:'267260.KS', exchange:'KRX', price:0, change:0, marketCap:0, currency:'KRW', revenue:2600.0, specialization:'Defense Electronics / Radar / Satellites', website:'https://www.hanwhasystems.com/', ir:'https://www.hanwhasystems.com/', linkedin:'https://www.linkedin.com/company/hanwha-systems/', x:'', description:'South Korean defense electronics, AESA radar and reconnaissance satellites.', listed:true },
    { id:'c67', name:'Hyundai Rotem', logo:'https://logo.clearbit.com/hyundai-rotem.co.kr', country:'KR', ticker:'HROTEM', yf_ticker:'064350.KS', exchange:'KRX', price:0, change:0, marketCap:0, currency:'KRW', revenue:4600.0, specialization:'Armored Vehicles / Trains', website:'https://www.hyundai-rotem.co.kr/', ir:'https://www.hyundai-rotem.co.kr/', linkedin:'https://www.linkedin.com/company/hyundai-rotem/', x:'', description:'K2 Black Panther main battle tank and armored vehicle manufacturer.', listed:true },
    { id:'c68', name:'Mitsubishi Heavy Industries', logo:'https://logo.clearbit.com/mhi.com', country:'JP', ticker:'MHI', yf_ticker:'7011.T', exchange:'TSE', price:0, change:0, marketCap:0, currency:'JPY', revenue:5000.0, specialization:'Naval / Aerospace / Defense Systems', website:'https://www.mhi.com/', ir:'https://www.mhi.com/finance/', linkedin:'https://www.linkedin.com/company/mitsubishi-heavy-industries/', x:'https://x.com/MHI_Group', description:'Japanese defense prime for warships, fighter jets and missile defense systems.', listed:true },
    { id:'c69', name:'Kawasaki Heavy Industries', logo:'https://logo.clearbit.com/khi.co.jp', country:'JP', ticker:'KHI', yf_ticker:'7012.T', exchange:'TSE', price:0, change:0, marketCap:0, currency:'JPY', revenue:2000.0, specialization:'Naval / Submarines / Aerospace', website:'https://www.khi.co.jp/', ir:'https://www.khi.co.jp/ir/', linkedin:'https://www.linkedin.com/company/kawasaki-heavy-industries/', x:'', description:'Submarines, P-1 maritime patrol aircraft and military helicopters for JSDF.', listed:true },
    { id:'c70', name:'IHI Corporation', logo:'https://logo.clearbit.com/ihi.co.jp', country:'JP', ticker:'IHI', yf_ticker:'7013.T', exchange:'TSE', price:0, change:0, marketCap:0, currency:'JPY', revenue:1800.0, specialization:'Defense Engines / Space / Structures', website:'https://www.ihi.co.jp/', ir:'https://www.ihi.co.jp/ir/', linkedin:'https://www.linkedin.com/company/ihi-corporation/', x:'', description:'Jet engines, rocket propulsion and aerostructures for Japan defense and space.', listed:true },
    { id:'c71', name:'NEC Corporation', logo:'https://logo.clearbit.com/nec.com', country:'JP', ticker:'NEC', yf_ticker:'6701.T', exchange:'TSE', price:0, change:0, marketCap:0, currency:'JPY', revenue:3400.0, specialization:'Defense IT / C4ISR / Communications', website:'https://www.nec.com/', ir:'https://www.nec.com/en/investor/', linkedin:'https://www.linkedin.com/company/nec/', x:'https://x.com/NEC_Corporation', description:'C4ISR systems, defense communications and AI surveillance for JSDF.', listed:true },
    { id:'c72', name:'Mitsubishi Electric', logo:'https://logo.clearbit.com/mitsubishielectric.com', country:'JP', ticker:'MELEC', yf_ticker:'6503.T', exchange:'TSE', price:0, change:0, marketCap:0, currency:'JPY', revenue:5000.0, specialization:'Defense Electronics / Radar / Satellites', website:'https://www.mitsubishielectric.com/', ir:'https://www.mitsubishielectric.com/ir/', linkedin:'https://www.linkedin.com/company/mitsubishi-electric/', x:'', description:'Radar systems, missile guidance electronics and defense satellites for JSDF.', listed:true },
    { id:'c73', name:'Hindustan Aeronautics', logo:'https://logo.clearbit.com/hal-india.co.in', country:'IN', ticker:'HAL', yf_ticker:'HAL.NS', exchange:'NSE', price:0, change:0, marketCap:0, currency:'INR', revenue:350.0, specialization:'Military Aircraft / Helicopters', website:'https://hal-india.co.in/', ir:'https://hal-india.co.in/investor-relations', linkedin:'https://www.linkedin.com/company/hal-hindustan-aeronautics-limited/', x:'', description:'India state-owned manufacturer of Tejas fighter jets and Dhruv helicopters.', listed:true },
    { id:'c74', name:'Bharat Electronics', logo:'https://logo.clearbit.com/bel-india.in', country:'IN', ticker:'BEL', yf_ticker:'BEL.NS', exchange:'NSE', price:0, change:0, marketCap:0, currency:'INR', revenue:200.0, specialization:'Defense Electronics / Radar', website:'https://bel-india.in/', ir:'https://bel-india.in/investor-relations/', linkedin:'https://www.linkedin.com/company/bharat-electronics-limited/', x:'', description:'Defense electronics, radar and communication systems for Indian armed forces.', listed:true },
    { id:'c75', name:'Bharat Dynamics', logo:'https://logo.clearbit.com/bdl-india.in', country:'IN', ticker:'BDL', yf_ticker:'BDL.NS', exchange:'NSE', price:0, change:0, marketCap:0, currency:'INR', revenue:100.0, specialization:'Guided Missiles / Torpedoes', website:'https://bdl-india.in/', ir:'https://bdl-india.in/investor-relation/', linkedin:'https://www.linkedin.com/company/bharat-dynamics-limited/', x:'', description:'Surface-to-air missiles, anti-tank missiles and aerial targets for Indian forces.', listed:true },
    { id:'c76', name:'Mazagon Dock', logo:'https://logo.clearbit.com/mazagondock.in', country:'IN', ticker:'MAZDOCK', yf_ticker:'MAZDOCK.NS', exchange:'NSE', price:0, change:0, marketCap:0, currency:'INR', revenue:110.0, specialization:'Naval Shipbuilding / Submarines', website:'https://mazagondock.in/', ir:'https://mazagondock.in/investor-relations/', linkedin:'https://www.linkedin.com/company/mazagon-dock-shipbuilders-limited/', x:'', description:'Indian naval shipbuilder for submarines, destroyers and frigates.', listed:true },
    { id:'c77', name:'Garden Reach Shipbuilders', logo:'https://logo.clearbit.com/grse.in', country:'IN', ticker:'GRSE', yf_ticker:'GRSE.NS', exchange:'NSE', price:0, change:0, marketCap:0, currency:'INR', revenue:42.0, specialization:'Naval Vessels / Coast Guard', website:'https://grse.in/', ir:'https://grse.in/investor_relations/', linkedin:'https://www.linkedin.com/company/garden-reach-shipbuilders-engineers-limited/', x:'', description:'Indian shipyard building frigates, corvettes and fast patrol vessels.', listed:true },
    { id:'c78', name:'Cochin Shipyard', logo:'https://logo.clearbit.com/cochinshipyard.com', country:'IN', ticker:'COCHINSHIP', yf_ticker:'COCHINSHIP.NS', exchange:'NSE', price:0, change:0, marketCap:0, currency:'INR', revenue:90.0, specialization:'Naval Shipbuilding / Aircraft Carriers', website:'https://cochinshipyard.com/', ir:'https://cochinshipyard.com/investor-relations/', linkedin:'https://www.linkedin.com/company/cochin-shipyard/', x:'', description:'India largest shipyard, builder of INS Vikrant aircraft carrier.', listed:true },
    { id:'c79', name:'Solar Industries India', logo:'https://logo.clearbit.com/solarindustries.in', country:'IN', ticker:'SOLARIND', yf_ticker:'SOLARIND.NS', exchange:'NSE', price:0, change:0, marketCap:0, currency:'INR', revenue:60.0, specialization:'Explosives / Ammunition / Loitering Munitions', website:'https://www.solarindustries.in/', ir:'https://www.solarindustries.in/investor-relations/', linkedin:'https://www.linkedin.com/company/solar-industries-india/', x:'', description:'Defense explosives, propellants and Nagastra loitering munitions for Indian forces.', listed:true },
    { id:'c80', name:'Data Patterns India', logo:'https://logo.clearbit.com/datapatternsindia.com', country:'IN', ticker:'DATAPATT', yf_ticker:'DATAPATT.NS', exchange:'NSE', price:0, change:0, marketCap:0, currency:'INR', revenue:8.0, specialization:'Defense Electronics / Avionics', website:'https://www.datapatternsindia.com/', ir:'https://www.datapatternsindia.com/investor-relations/', linkedin:'https://www.linkedin.com/company/data-patterns/', x:'', description:'Avionics and defense electronics systems for Indian aerospace programs.', listed:true },
    { id:'c81', name:'Austal Limited', logo:'https://logo.clearbit.com/austal.com', country:'AU', ticker:'ASB', yf_ticker:'ASB.AX', exchange:'ASX', price:0, change:0, marketCap:0, currency:'AUD', revenue:1.5, specialization:'Naval Shipbuilding / Patrol Vessels', website:'https://www.austal.com/', ir:'https://www.austal.com/investors', linkedin:'https://www.linkedin.com/company/austal/', x:'https://x.com/Austal', description:'Australian shipbuilder of US Navy littoral combat ships and patrol vessels.', listed:true },
    { id:'c82', name:'Electro Optic Systems', logo:'https://logo.clearbit.com/eos-aus.com', country:'AU', ticker:'EOS', yf_ticker:'EOS.AX', exchange:'ASX', price:0, change:0, marketCap:0, currency:'AUD', revenue:0.04, specialization:'Directed Energy / Space Tracking', website:'https://www.eos-aus.com/', ir:'https://www.eos-aus.com/investors/', linkedin:'https://www.linkedin.com/company/electro-optic-systems/', x:'', description:'Remote weapon stations, directed energy and space debris tracking systems.', listed:true },
    { id:'c83', name:'CAE Inc', logo:'https://logo.clearbit.com/cae.com', country:'CA', ticker:'CAE', yf_ticker:'CAE.TO', exchange:'TSX', price:0, change:0, marketCap:0, currency:'CAD', revenue:4.3, specialization:'Flight Simulation / Defense Training', website:'https://www.cae.com/', ir:'https://ir.cae.com/', linkedin:'https://www.linkedin.com/company/cae/', x:'https://x.com/CAE_Inc', description:'Flight simulators and military training systems for air forces worldwide.', listed:true },
    { id:'c84', name:'Magellan Aerospace', logo:'https://logo.clearbit.com/magellanaerospace.com', country:'CA', ticker:'MAL', yf_ticker:'MAL.TO', exchange:'TSX', price:0, change:0, marketCap:0, currency:'CAD', revenue:0.4, specialization:'Aerospace Defense Components', website:'https://www.magellanaerospace.com/', ir:'https://www.magellanaerospace.com/investors/', linkedin:'https://www.linkedin.com/company/magellan-aerospace/', x:'', description:'Aerostructures and engine components for military aircraft and missiles.', listed:true },
    { id:'c85', name:'ST Engineering', logo:'https://logo.clearbit.com/stengg.com', country:'SG', ticker:'S63', yf_ticker:'S63.SI', exchange:'SGX', price:0, change:0, marketCap:0, currency:'SGD', revenue:9.9, specialization:'Defense / Aerospace / Smart Systems', website:'https://www.stengg.com/', ir:'https://investor.stengg.com/', linkedin:'https://www.linkedin.com/company/st-engineering/', x:'https://x.com/stengg', description:'Singapore defense and aerospace conglomerate with naval, land and cyber divisions.', listed:true },
    { id:'c86', name:'Embraer', logo:'https://logo.clearbit.com/embraer.com', country:'BR', ticker:'ERJ', exchange:'NYSE', price:0, change:0, marketCap:0, currency:'USD', revenue:4.3, specialization:'Defense Aircraft / Military Transport', website:'https://defense.embraer.com/', ir:'https://ri.embraer.com.br/', linkedin:'https://www.linkedin.com/company/embraer/', x:'https://x.com/Embraer', description:'KC-390 military transport and A-29 Super Tucano defense aircraft manufacturer.', listed:true }
  ],
  announcements: [
    { id:'a1', title:'Lockheed awarded integrated air defense contract for Baltic program', companyId:'c1', country:'US', type:'contract', sourceId:'s1', publication_date:'2026-03-03', summary:'Multi-year contract for integrated sensors and battle management capabilities.', tags:['air defense','nato'], relatedProduct:'Aegis Next C2' },
    { id:'a2', title:'Thales and Leonardo launch strategic ISR partnership for export campaign', companyId:'c4', country:'FR', type:'partnership', sourceId:'s5', publication_date:'2026-03-01', summary:'Partnership aligns surveillance payloads and mission systems for Gulf tenders.', tags:['partnership','isr'], relatedProduct:'FalconEye ISR Suite' },
    { id:'a3', title:'Rheinmetall receives export approval for armored systems package', companyId:'c5', country:'DE', type:'export approval', sourceId:'s2', publication_date:'2026-02-28', summary:'Regulatory approval received for exports to allied customer under expedited channel.', tags:['export','land systems'], relatedProduct:'Lynx IFV' },
    { id:'a4', title:'BAE Systems reports earnings beat on naval backlog growth', companyId:'c3', country:'GB', type:'earnings', sourceId:'s3', publication_date:'2026-03-02', summary:'Backlog and margin expansion driven by submarine and naval electronics programs.', tags:['earnings','naval'], relatedProduct:'' },
    { id:'a5', title:'Saab introduces upgraded radar with AI-assisted target tracking', companyId:'c7', country:'SE', type:'product launch', sourceId:'s2', publication_date:'2026-02-27', summary:'New system claims improved target discrimination in contested EW environments.', tags:['radar','product launch'], relatedProduct:'Giraffe X' }
  ],
  mna: [
    { id:'m1', acquirerId:'c2', target:'AeroSignal AI', seller:'Private investors', dealType:'Acquisition', dealValue:1.3, currency:'USD', status:'announced', announced:'2026-02-25', expectedClose:'2026-08-01', completed:'', rationale:'Strengthen onboard AI autonomy stack for missile and sensor products.', summary:'RTX acquires AeroSignal AI to expand embedded defense autonomy.', sourceId:'s3' },
    { id:'m2', acquirerId:'c5', target:'Nordic Ammunition Components', seller:'Founder-led', dealType:'Majority stake', dealValue:0.41, currency:'EUR', status:'pending', announced:'2026-02-20', expectedClose:'2026-06-15', completed:'', rationale:'Secure vertically integrated munitions supply chain in Europe.', summary:'Rheinmetall signs majority investment pending regulatory review.', sourceId:'s5' },
    { id:'m3', acquirerId:'c4', target:'SignalMesh Labs', seller:'Venture fund consortium', dealType:'Acquisition', dealValue:0.22, currency:'EUR', status:'rumor', announced:'2026-03-01', expectedClose:'', completed:'', rationale:'Potential move into tactical mesh network software.', summary:'Market reports indicate Thales in talks with SignalMesh Labs.', sourceId:'s6' }
  ],
  regulations: [
    { id:'r1', title:'EU foreign subsidies screening update', country:'FR', category:'regulation', status:'pending', effective:'2026-07-01', sourceId:'s3' },
    { id:'r2', title:'US CMMC scope expanded for additional defense suppliers', country:'US', category:'regulation', status:'active', effective:'2026-04-01', sourceId:'s1' },
    { id:'r3', title:'UK defense export licensing reforms', country:'GB', category:'export control', status:'pending', effective:'2026-09-01', sourceId:'s5' }
  ],
  expenditures: [
    { id:'e1', country:'US', spend:916, gdp:3.4, year:2025, sourceId:'s4' },
    { id:'e2', country:'GB', spend:74, gdp:2.3, year:2025, sourceId:'s4' },
    { id:'e3', country:'FR', spend:67, gdp:2.1, year:2025, sourceId:'s4' },
    { id:'e4', country:'DE', spend:83, gdp:2.2, year:2025, sourceId:'s4' },
    { id:'e5', country:'IT', spend:39, gdp:1.8, year:2025, sourceId:'s4' }
  ],
  products: [
    { id:'p1', name:'Ground Master 200', companyId:'c4', category:'Radar', status:'in service', sourceId:'s2', imageUrl:'https://upload.wikimedia.org/wikipedia/commons/5/56/GM200_in_Evreux.jpg', wikiUrl:'https://en.wikipedia.org/wiki/Ground_Master_200' },
    { id:'p2', name:'Crotale NG', companyId:'c4', category:'Missile Defense', status:'in service', sourceId:'s2', imageUrl:'https://upload.wikimedia.org/wikipedia/commons/8/8f/Unit%C3%A9_de_tir_Crotale.jpg', wikiUrl:'https://en.wikipedia.org/wiki/Crotale_(missile)' },
    { id:'p3', name:'Lynx KF41', companyId:'c5', category:'IFV', status:'in service', sourceId:'s2', imageUrl:'https://upload.wikimedia.org/wikipedia/commons/b/b5/Lynx_KF41.jpg', wikiUrl:'https://en.wikipedia.org/wiki/Lynx_(Rheinmetall_armoured_fighting_vehicle)' },
    { id:'p4', name:'Puma IFV', companyId:'c5', category:'IFV', status:'in service', sourceId:'s2', imageUrl:'https://upload.wikimedia.org/wikipedia/commons/a/aa/Puma.IFV.JPG', wikiUrl:'https://en.wikipedia.org/wiki/Puma_(German_infantry_fighting_vehicle)' },
    { id:'p5', name:'F-35 Lightning II', companyId:'c1', category:'Fighter Aircraft', status:'in service', sourceId:'s1', imageUrl:'https://upload.wikimedia.org/wikipedia/commons/d/db/New_era_in_combat_air_power_begins_with_F-35A_Lightning_II_151014-F-LS255-230.jpg', wikiUrl:'https://en.wikipedia.org/wiki/Lockheed_Martin_F-35_Lightning_II' },
    { id:'p6', name:'PAC-3 MSE', companyId:'c1', category:'Missile Defense', status:'in service', sourceId:'s1', imageUrl:'https://upload.wikimedia.org/wikipedia/commons/5/5e/MIM-104_Patriot.JPG', wikiUrl:'https://en.wikipedia.org/wiki/MIM-104_Patriot' }
  ],
  follow: [
    { id:'f1', name:'NATO Allied Command Transformation', kind:'authority', class:'official', platform:'website', country:'BE', description:'Capability development and force transformation updates.', profile:'https://www.act.nato.int/', latest:'Updated integrated air defense guidance published.' },
    { id:'f2', name:'US Department of Defense', kind:'authority', class:'official', platform:'website', country:'US', description:'Official procurement and release updates.', profile:'https://www.defense.gov/', latest:'Hypersonics acquisition update posted.' },
    { id:'f3', name:'Defense News', kind:'media', class:'media', platform:'website', country:'US', description:'Defense-specialist reporting.', profile:'https://www.defensenews.com/', latest:'European procurement cycle analysis.' },
    { id:'f4', name:'Janes', kind:'media', class:'media', platform:'website', country:'GB', description:'Defense intelligence media outlet.', profile:'https://www.janes.com/', latest:'Ground systems export outlook.' },
    { id:'f5', name:'Strategic Defence Analysis Desk', kind:'analyst', class:'analysis', platform:'x', country:'GB', description:'Commentary and open-source analysis.', profile:'https://x.com/', latest:'No new post ingested; profile tracked.' }
  ],
  xPosts: [
    { id:'xp1', displayName:'NATO ACT', handle:'NATO_ACT', profileUrl:'https://x.com/NATO_ACT', text:'We are pleased to announce the publication of the NATO Warfighting Capstone Concept companion document. This document outlines key capability priorities for Alliance transformation.', publishedAt:'2026-03-17T09:00:00Z', category:'institutional' },
    { id:'xp2', displayName:'US Dept of Defense', handle:'DeptofDefense', profileUrl:'https://x.com/DeptofDefense', text:'Secretary of Defense announces new strategic guidance on integrated deterrence. The full statement covers all-domain operations, partner capacity building, and updated posture review findings.', publishedAt:'2026-03-16T14:30:00Z', category:'institutional' },
    { id:'xp3', displayName:'European Defence Agency', handle:'EDA_Eu', profileUrl:'https://x.com/EDA_Eu', text:'EDA launches collaborative research programme on autonomous systems for maritime patrol. Participating nations: FR, DE, IT, ES, NL. Programme runs 2026\u20132029 with first deliverable in Q4 2026.', publishedAt:'2026-03-15T11:00:00Z', category:'institutional' },
    { id:'xp4', displayName:'Lockheed Martin', handle:'LockheedMartin', profileUrl:'https://x.com/LockheedMartin', text:'Lockheed Martin has been awarded a contract to provide integrated air and missile defense capabilities for NATO\'s Baltic region. This award strengthens transatlantic security and Alliance readiness.', publishedAt:'2026-03-17T07:00:00Z', category:'industry' },
    { id:'xp5', displayName:'Rheinmetall', handle:'Rheinmetall', profileUrl:'https://x.com/Rheinmetall', text:'Scaling production of 155mm artillery ammunition to meet European demand. Our D\u00fcsseldorf facility has tripled output since 2023. European security and sovereignty remain our core mission.', publishedAt:'2026-03-16T08:15:00Z', category:'industry' },
    { id:'xp6', displayName:'BAE Systems', handle:'BAESystemsplc', profileUrl:'https://x.com/BAESystemsplc', text:'BAE Systems reports strong FY2025 results driven by naval backlog growth. Submarine programme deliveries remain on schedule. Order book stands at a record \u00a337B. Full results on our investor portal.', publishedAt:'2026-03-14T13:00:00Z', category:'industry' },
    { id:'xp7', displayName:'RUSI', handle:'RUSI_org', profileUrl:'https://x.com/RUSI_org', text:'New analysis: European defense procurement cycles remain misaligned with operational urgency. Our latest report examines structural barriers and proposes a framework for accelerated acquisition. Read at rusi.org', publishedAt:'2026-03-17T10:30:00Z', category:'think_tanks' },
    { id:'xp8', displayName:'CSIS Defense', handle:'CSISdefense', profileUrl:'https://x.com/CSISdefense', text:'CSIS publishes new defense industrial base assessment. Key finding: allied munitions stockpiles remain below NATO targets in 6 of 10 metrics. Full report available at csis.org', publishedAt:'2026-03-16T16:00:00Z', category:'think_tanks' },
    { id:'xp9', displayName:'IISS', handle:'IISS_org', profileUrl:'https://x.com/IISS_org', text:'The Military Balance 2026 is now available. This year\'s edition covers 171 countries and features in-depth analysis of drone warfare, AI integration in C2 systems, and European rearmament trends.', publishedAt:'2026-03-13T09:00:00Z', category:'think_tanks' }
  ]
};

const views = ['dashboard','announcements','mna','market','companies','companyProfile','country','regulations','products','follow','recentIntel'];
const pageMeta = {
  dashboard:['Strategic Command Dashboard','Curated, clickable, source-traceable defense intelligence.'],
  announcements:['Announcements','Structured announcements with source provenance and detailed views.'],
  mna:['M&A Tracker','Compact feed with rich deal drill-down.'],
  market:['Market Data','Listed defense companies sorted by market cap.'],
  companies:['Companies','Searchable intelligence profiles and relationships.'],
  companyProfile:['Company Profile','Company identity dossier with linked intelligence.'],
  country:['Country Brief','Country-linked spending, regulations, and announcements.'],
  regulations:['Regulations','Policy and compliance updates with trusted sources.'],
  products:['Products','Defense product tracking with source context.'],
  follow:['Follow Workspace','Curated monitoring for official, media and commentary sources.'],
  recentIntel:['Recent Intel','Live defense news feed from The Defense Post.']
};


const fxToUsd = { USD:1, EUR:1.09, GBP:1.28, SEK:0.095, NOK:0.094, TRY:0.030, ILS:0.27, KRW:0.00072, JPY:0.0068, INR:0.012, AUD:0.65, CAD:0.74, SGD:0.75, BRL:0.19 };
const toUsdCap = (company) => company.marketCap * (fxToUsd[company.currency] || 1);
const formatUsdB = (value) => `$${value.toFixed(1)}B USD`;
function relativeDate(iso) {
  const d = Date.now() - new Date(iso).getTime();
  const m = Math.floor(d / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}
function truncatePost(text, max = 280) {
  return text.length <= max ? { body: text, cut: false } : { body: text.slice(0, max - 1) + '\u2026', cut: true };
}

const byId = (id) => document.getElementById(id);
const initials = (txt='') => txt.split(' ').map(x=>x[0]).join('').slice(0,2).toUpperCase() || 'NA';
const country = (code) => db.countries.find(c=>c.code===code);
const company = (id) => db.companies.find(c=>c.id===id);
const source = (id) => db.sources.find(s=>s.id===id);
const typeBadge = (type) => ({
  'contract':'b-blue','partnership':'b-purple','product launch':'b-green','export approval':'b-amber','regulation':'b-amber','restructuring':'b-amber','earnings':'b-blue'
}[type] || 'b-blue');
const dealStatusClass = (s)=>({ rumor:'b-amber', announced:'b-blue', pending:'b-amber', completed:'b-green', cancelled:'b-amber' }[s]||'b-blue');

function logoNode(name, logo='') {
  const ini = initials(name);
  if(logo) return `<span class="logo logo-has-img"><img src="${logo}" alt="${name}" onerror="this.parentNode.textContent='${ini}';this.parentNode.classList.remove('logo-has-img')"/></span>`;
  return `<span class="logo">${ini}</span>`;
}
function sourceBadge(srcId){
  const s = source(srcId);
  if(!s) return '';
  return `<span class="source-badge clickable" data-source="${s.id}"><span class="source-logo">${initials(s.source_name)}</span>${s.source_name}<span class="badge ${s.trust_tier==='official'?'b-green':s.trust_tier==='tier_1'?'b-blue':s.trust_tier==='specialist'?'b-purple':'b-amber'}">${s.trust_tier}</span></span>`;
}
function setRoute(route){
  state.route = route;
  views.forEach(v=>byId(`${v}View`).classList.remove('active'));
  byId(`${route}View`).classList.add('active');
  document.querySelectorAll('.nav-link').forEach(n=>n.classList.toggle('active', n.dataset.route===route));
  const [title,sub] = pageMeta[route]; byId('pageTitle').textContent=title; byId('pageSubtitle').textContent=sub;
}

function renderDashboard(){
  const topMarket = [...db.companies].filter(c=>c.listed).sort((a,b)=>toUsdCap(b)-toUsdCap(a)).slice(0,5);
  byId('dashboardView').innerHTML = `
    <div class="kpi-grid">
      ${[
        ['Tracked Companies', db.companies.length, '+4.1%', 'up'],
        ['Open M&A Situations', db.mna.length, '+12.0%','up'],
        ['Announcements (30d)', db.announcements.length, '+8.3%','up'],
        ['Verified Sources', db.sources.length, '+1 source','up']
      ].map(k=>`<article class="kpi"><div class="label">${k[0]}</div><div class="value">${k[1]}</div><div class="trend ${k[3]}">${k[2]}</div></article>`).join('')}
    </div>
    <div class="grid-2">
      <article class="panel"><h3>Recent Announcements</h3><div class="table-wrap"><table class="table"><thead><tr><th>Title</th><th>Type</th><th>Source</th></tr></thead><tbody>
      ${db.announcements.slice(0,5).map(a=>`<tr class="clickable" data-announcement="${a.id}"><td>${a.title}</td><td><span class="badge ${typeBadge(a.type)}">${a.type}</span></td><td>${sourceBadge(a.sourceId)}</td></tr>`).join('')}
      </tbody></table></div></article>
      <article class="panel"><h3>Recent M&A</h3><div class="table-wrap"><table class="table"><thead><tr><th>Deal</th><th>Status</th><th>Source</th></tr></thead><tbody>
      ${db.mna.map(m=>`<tr class="clickable" data-deal="${m.id}"><td>${company(m.acquirerId).name} → ${m.target}</td><td><span class="badge ${dealStatusClass(m.status)}">${m.status}</span></td><td>${sourceBadge(m.sourceId)}</td></tr>`).join('')}
      </tbody></table></div></article>
    </div>
    <div class="grid-3">
      <article class="panel"><h3>Top Listed by Market Cap</h3><div class="table-wrap"><table class="table"><thead><tr><th>Company</th><th>MCap</th><th>Ticker</th></tr></thead><tbody>
      ${topMarket.map(c=>`<tr class="clickable" data-company="${c.id}"><td><div class="company-cell">${logoNode(c.name,c.logo)}${c.name}</div></td><td>${formatUsdB(toUsdCap(c))}</td><td>${c.ticker}</td></tr>`).join('')}
      </tbody></table></div></article>
      <article class="panel"><h3>Latest Regulations</h3><div class="table-wrap"><table class="table"><thead><tr><th>Regulation</th><th>Status</th></tr></thead><tbody>
      ${db.regulations.map(r=>`<tr><td>${r.title}</td><td><span class="badge ${r.status==='active'?'b-green':'b-amber'}">${r.status}</span></td></tr>`).join('')}</tbody></table></div></article>
      <article class="panel"><h3>Quick Access</h3>
        <p class="muted">Move to structured follow monitoring workspace and market intelligence board.</p>
        <button class="tab-btn active" data-go="follow">Open Follow Workspace</button>
        <button class="tab-btn" data-go="market">Open Market Data</button>
      </article>
    </div>`;
}

function renderAnnouncements(){
  byId('announcementsView').innerHTML = `<article class="panel"><h3>Announcements Feed</h3><div class="table-wrap"><table class="table"><thead><tr><th>Title</th><th>Company</th><th>Country</th><th>Type</th><th>Source</th><th>Date</th></tr></thead><tbody>
  ${db.announcements.map(a=>{const c=company(a.companyId); return `<tr class="clickable" data-announcement="${a.id}"><td>${a.title}</td><td class="clickable" data-company="${c.id}">${c.name}</td><td class="clickable" data-country="${a.country}">${country(a.country)?.flag||a.country} ${country(a.country)?.name||a.country}</td><td><span class="badge ${typeBadge(a.type)}">${a.type}</span></td><td>${sourceBadge(a.sourceId)}</td><td>${a.publication_date}</td></tr>`}).join('')}
  </tbody></table></div></article>`;
}

function renderMna(){
  byId('mnaView').innerHTML = `<article class="panel"><h3>M&A Deals</h3><div class="table-wrap"><table class="table"><thead><tr><th>Acquirer</th><th>Target</th><th>Type</th><th>Value</th><th>Status</th><th>Date</th><th>Source</th></tr></thead><tbody>
  ${db.mna.map(m=>`<tr class="clickable" data-deal="${m.id}"><td class="clickable" data-company="${m.acquirerId}">${company(m.acquirerId).name}</td><td>${m.target}</td><td>${m.dealType}</td><td>${m.dealValue}B ${m.currency}</td><td><span class="badge ${dealStatusClass(m.status)}">${m.status}</span></td><td>${m.announced}</td><td>${sourceBadge(m.sourceId)}</td></tr>`).join('')}
  </tbody></table></div></article>`;
}

function renderMarket(){
  const listed = [...db.companies].filter(c=>c.listed);
  const sortVal = (c) => state.marketSort==='marketCapUsd' ? toUsdCap(c) : c[state.marketSort];
  listed.sort((a,b)=>(state.marketDir==='desc'?-1:1)*(sortVal(a)-sortVal(b)));

  const sortGroups = [
    { label:'Market Cap', opts:[{sort:'marketCapUsd',dir:'desc',label:'Largest first'},{sort:'marketCapUsd',dir:'asc',label:'Smallest first'}] },
    { label:'Daily Change', opts:[{sort:'change',dir:'desc',label:'Biggest gainers'},{sort:'change',dir:'asc',label:'Biggest losers'}] }
  ];

  byId('marketView').innerHTML = `<article class="panel"><h3>Listed Defense Companies</h3>
    <div class="filters">
      <input id="marketSearch" class="input" placeholder="Search company or ticker" />
      <select id="countryFilter" class="select"><option value="">All Countries</option>${[...new Set(listed.map(c=>c.country))].map(c=>`<option>${c}</option>`).join('')}</select>
      <select id="specFilter" class="select"><option value="">All Specializations</option>${[...new Set(listed.map(c=>c.specialization))].map(s=>`<option>${s}</option>`).join('')}</select>
    </div>
    <div class="sort-controls">
      ${sortGroups.map(g=>`<div class="sort-group"><span class="sort-group-label">${g.label}</span>${g.opts.map(o=>`<button class="sort-btn${state.marketSort===o.sort&&state.marketDir===o.dir?' active':''}" data-setsort="${o.sort}" data-setdir="${o.dir}">${o.label}</button>`).join('')}</div>`).join('')}
    </div>
    <div class="table-wrap"><table class="table"><thead><tr><th>Company</th><th>Market Cap (USD)</th><th>Ticker</th><th>Exchange</th><th>Price</th><th>Daily %</th><th>Revenue</th><th>Specialization</th></tr></thead><tbody id="marketRows"></tbody></table></div>
  </article>`;
  const drawRows = () => {
    const q = byId('marketSearch').value.toLowerCase();
    const cf = byId('countryFilter').value;
    const sf = byId('specFilter').value;
    const rows = listed.filter(c => (!q || `${c.name} ${c.ticker}`.toLowerCase().includes(q)) && (!cf || c.country===cf) && (!sf || c.specialization===sf));
    byId('marketRows').innerHTML = rows.map(c=>`<tr class="clickable" data-company="${c.id}"><td><div class="company-cell">${logoNode(c.name,c.logo)}${c.name} <span class="flag">${country(c.country)?.flag||c.country}</span></div></td><td>${formatUsdB(toUsdCap(c))}</td><td>${c.ticker}</td><td>${c.exchange}</td><td>${c.price.toFixed(2)} ${c.currency}</td><td class="${c.change>=0?'up':'down'}">${c.change>=0?'+':''}${c.change}%</td><td>${c.revenue.toFixed(1)}B</td><td>${c.specialization}</td></tr>`).join('');
  };
  drawRows();
  byId('marketSearch').addEventListener('input', drawRows);
  byId('countryFilter').addEventListener('change', drawRows);
  byId('specFilter').addEventListener('change', drawRows);
}

function renderCompanies(){
  byId('companiesView').innerHTML = `<article class="panel"><h3>Company Intelligence Profiles</h3><div class="table-wrap"><table class="table"><thead><tr><th>Company</th><th>Country</th><th>Ticker</th><th>MCap</th><th>Specialization</th></tr></thead><tbody>
  ${db.companies.map(c=>`<tr class="clickable" data-company="${c.id}"><td><div class="company-cell">${logoNode(c.name,c.logo)}${c.name}</div></td><td class="clickable" data-country="${c.country}">${country(c.country)?.flag||c.country} ${country(c.country)?.name||c.country}</td><td>${c.ticker}</td><td>${formatUsdB(toUsdCap(c))}</td><td>${c.specialization}</td></tr>`).join('')}
  </tbody></table></div></article>`;
}

function renderCompanyProfile(companyId){
  const c = company(companyId); if(!c) return;
  const relA = db.announcements.filter(a=>a.companyId===companyId);
  const relM = db.mna.filter(m=>m.acquirerId===companyId || m.target===c.name);
  const relP = db.products.filter(p=>p.companyId===companyId);
  const relF = db.follow.filter(f=>f.name.toLowerCase().includes(c.name.split(' ')[0].toLowerCase()));
  setRoute('companyProfile');
  byId('companyProfileView').innerHTML = `<div class="grid-2">
    <article class="panel"><h3>Company Identity</h3>
      <div class="company-cell">${logoNode(c.name,c.logo)}<div><strong>${c.name}</strong><div class="muted">${country(c.country)?.flag||c.country} ${country(c.country)?.name||c.country}</div></div></div>
      <p>${c.description}</p>
      <p><strong>Ticker/Exchange:</strong> ${c.ticker} / ${c.exchange}</p>
      <p><strong>Market Cap (USD normalized):</strong> ${formatUsdB(toUsdCap(c))} · <strong>Reported:</strong> ${c.marketCap.toFixed(1)}B ${c.currency} · <strong>Price:</strong> ${c.price.toFixed(2)} ${c.currency}</p>
      <p><strong>Specialization:</strong> ${c.specialization}</p>
    </article>
    <article class="panel"><h3>Official & Social Links</h3>
      <p><a class="link" href="${c.website}" target="_blank">Website</a></p>
      <p><a class="link" href="${c.ir}" target="_blank">Investor Relations</a></p>
      <p><a class="link" href="${c.linkedin}" target="_blank">LinkedIn</a></p>
      ${c.x?`<p><a class="link" href="${c.x}" target="_blank">X</a></p>`:''}
    </article>
  </div>
  <div class="grid-2">
    <article class="panel"><h3>Related Announcements</h3>${relA.length?`<div class="table-wrap"><table class="table"><tbody>${relA.map(a=>`<tr class="clickable" data-announcement="${a.id}"><td>${a.title}</td></tr>`).join('')}</tbody></table></div>`:'<p class="muted">No linked announcements.</p>'}</article>
    <article class="panel"><h3>Related M&A Deals</h3>${relM.length?`<div class="table-wrap"><table class="table"><tbody>${relM.map(m=>`<tr class="clickable" data-deal="${m.id}"><td>${company(m.acquirerId).name} → ${m.target}</td></tr>`).join('')}</tbody></table></div>`:'<p class="muted">No linked deals.</p>'}</article>
  </div>
  <div class="grid-2">
    <article class="panel"><h3>Products</h3>${relP.length?`<div class="table-wrap"><table class="table"><tbody>${relP.map(p=>`<tr><td>${p.name}</td><td>${p.category}</td></tr>`).join('')}</tbody></table></div>`:'<p class="muted">No linked products.</p>'}</article>
    <article class="panel"><h3>Related Follow Accounts</h3>${relF.length?`<div class="table-wrap"><table class="table"><tbody>${relF.map(f=>`<tr><td>${f.name}</td><td>${f.kind}</td><td><a class="link" href="${f.profile}" target="_blank">profile</a></td></tr>`).join('')}</tbody></table></div>`:'<p class="muted">No linked follow accounts.</p>'}</article>
  </div>`;
}

function renderCountry(code){
  const c = country(code); if(!c) return;
  const anns = db.announcements.filter(a=>a.country===code);
  const regs = db.regulations.filter(r=>r.country===code);
  const exp = db.expenditures.filter(e=>e.country===code);
  const co = db.companies.filter(x=>x.country===code);
  setRoute('country');
  byId('countryView').innerHTML = `<div class="grid-2">
    <article class="panel"><h3>Country Brief</h3><p><strong>${c.flag} ${c.name}</strong> (${c.code})</p><p>Linked companies: ${co.length}</p><p>Announcements: ${anns.length}</p></article>
    <article class="panel"><h3>Expenditure Summary</h3>${exp.length?exp.map(e=>`<p>${e.year}: $${e.spend}B (${e.gdp}% GDP) — ${sourceBadge(e.sourceId)}</p>`).join(''):'<p class="muted">No expenditure data.</p>'}</article>
  </div>
  <div class="grid-2">
    <article class="panel"><h3>Recent Announcements</h3>${anns.length?anns.map(a=>`<p class="clickable" data-announcement="${a.id}">• ${a.title}</p>`).join(''):'<p class="muted">No announcements.</p>'}</article>
    <article class="panel"><h3>Regulations</h3>${regs.length?regs.map(r=>`<p>• ${r.title}</p>`).join(''):'<p class="muted">No regulations.</p>'}</article>
  </div>`;
}

function renderRegulations(){
  byId('regulationsView').innerHTML = `<article class="panel"><h3>Regulations</h3><div class="table-wrap"><table class="table"><thead><tr><th>Title</th><th>Country</th><th>Status</th><th>Source</th></tr></thead><tbody>
  ${db.regulations.map(r=>`<tr><td>${r.title}</td><td class="clickable" data-country="${r.country}">${country(r.country)?.flag||r.country} ${country(r.country)?.name||r.country}</td><td><span class="badge ${r.status==='active'?'b-green':'b-amber'}">${r.status}</span></td><td>${sourceBadge(r.sourceId)}</td></tr>`).join('')}
  </tbody></table></div></article>`;
}

function renderProducts(){
  byId('productsView').innerHTML = `<article class="panel"><h3>Products</h3><div class="table-wrap"><table class="table"><thead><tr><th>Product</th><th>Category</th><th>Company</th><th>Status</th><th>Source</th></tr></thead><tbody>
  ${db.products.map(p=>`<tr><td><div style="display:flex;align-items:center;gap:10px">${p.imageUrl?`<img src="${p.imageUrl}" alt="${p.name}" style="width:64px;height:40px;object-fit:cover;border-radius:4px;border:1px solid rgba(255,255,255,0.1);flex-shrink:0">`:'<div style="width:64px;height:40px;border-radius:4px;border:1px solid rgba(255,255,255,0.1);background:#0f1624;flex-shrink:0"></div>'}<span>${p.wikiUrl?`<a href="${p.wikiUrl}" target="_blank" rel="noopener noreferrer" style="color:inherit;text-decoration:none" onmouseover="this.style.textDecoration='underline'" onmouseout="this.style.textDecoration='none'">${p.name}</a>`:p.name}</span></div></td><td>${p.category}</td><td class="clickable" data-company="${p.companyId}">${company(p.companyId).name}</td><td><span class="badge ${p.status==='in service'?'b-green':'b-purple'}">${p.status}</span></td><td>${sourceBadge(p.sourceId)}</td></tr>`).join('')}
  </tbody></table></div></article>`;
}

function renderFollow(){
  const tabs = ['all','authority','company','executive','media','analyst'];
  const xCats = [['all','All'],['industry','Industry'],['institutional','Institutional'],['think_tanks','Think Tanks']];
  const list = db.follow.filter(f=>state.followTab==='all' ? true : f.kind===state.followTab);
  byId('followView').innerHTML = `
    <article class="panel"><h3>Follow Workspace</h3>
      <div class="follow-tabs">${tabs.map(t=>`<button class="tab-btn ${state.followTab===t?'active':''}" data-followtab="${t}">${t}</button>`).join('')}</div>
      <div class="table-wrap"><table class="table"><thead><tr><th>Entity</th><th>Type</th><th>Class</th><th>Platform</th><th>Country</th><th>Latest</th><th>Profile</th></tr></thead><tbody>
      ${list.map(f=>`<tr><td><div class="company-cell">${logoNode(f.name)}${f.name}</div></td><td>${f.kind}</td><td><span class="badge ${f.class==='official'?'b-green':f.class==='media'?'b-purple':'b-amber'}">${f.class}</span></td><td>${f.platform}</td><td class="clickable" data-country="${f.country}">${country(f.country)?.flag||f.country}</td><td>${f.latest}</td><td><a class="link" href="${f.profile}" target="_blank">open</a></td></tr>`).join('')}
      </tbody></table></div>
    </article>
    <article class="panel">
      <div class="x-feed-head">
        <h3 style="margin:0">X Feed</h3>
        <div class="follow-tabs" style="margin:0">${xCats.map(([k,v])=>`<button class="tab-btn ${state.xFeedTab===k?'active':''}" data-xfeedtab="${k}">${v}</button>`).join('')}</div>
      </div>
      <div id="xFeedContent" style="margin-top:8px">${renderXFeedContent()}</div>
    </article>`;
  if (!xFeedState.lastFetched) fetchXFeed();
}

function renderXFeedContent(){
  if(xFeedState.status==='loading'){
    const skel=`<div class="x-post-card x-skeleton"><div class="x-skel-row"></div><div class="x-skel-line"></div><div class="x-skel-line x-skel-short"></div><div class="x-skel-date"></div></div>`;
    return `<div class="x-post-grid">${skel.repeat(3)}</div>`;
  }
  if(xFeedState.status==='error'){
    return `<div class="x-feed-error">\u26a0 Failed to load feed. <button class="tab-btn" style="margin-left:8px" data-xfeedrefresh>Retry</button></div>`;
  }
  const posts=(xFeedState.data||[]).filter(p=>state.xFeedTab==='all'||p.category===state.xFeedTab);
  if(!posts.length) return `<p class="muted" style="padding:10px 2px">No posts in this category.</p>`;
  return `<div class="x-post-grid">${posts.map(p=>{
    const {body,cut}=truncatePost(p.text);
    return `<article class="x-post-card">
      <div class="x-post-header"><span class="x-post-avatar">${initials(p.displayName)}</span><div><div class="x-post-name">${p.displayName}</div><div class="x-post-handle">@${p.handle}</div></div></div>
      <p class="x-post-body">${body}${cut?` <a class="link" href="${p.profileUrl}" target="_blank">read more</a>`:''}</p>
      <div class="x-post-footer"><span class="x-post-date">${relativeDate(p.publishedAt)}</span><a class="link x-post-xlink" href="${p.profileUrl}" target="_blank">\u2197 x.com</a></div>
    </article>`;
  }).join('')}</div>${xFeedState.lastFetched?`<p class="muted x-feed-meta">Updated ${relativeDate(xFeedState.lastFetched)}</p>`:''}`;
}

async function fetchXFeed(){
  xFeedState.status='loading';
  const el=byId('xFeedContent'); if(el) el.innerHTML=renderXFeedContent();
  try{
    await new Promise(r=>setTimeout(r,500));
    xFeedState.data=db.xPosts;
    xFeedState.status='ok';
    xFeedState.lastFetched=new Date().toISOString();
    xFeedState.error=null;
  }catch(err){
    xFeedState.status='error';
    xFeedState.error=err.message;
  }
  const el2=byId('xFeedContent'); if(el2) el2.innerHTML=renderXFeedContent();
}

function openAnnouncement(id){
  const a = db.announcements.find(x=>x.id===id); if(!a) return;
  const c = company(a.companyId); const s = source(a.sourceId); const co = country(a.country);
  openModal(`
    <div class="detail-head"><h2 class="detail-title">Announcement Detail</h2><span class="badge ${typeBadge(a.type)}">${a.type}</span></div>
    <div class="detail-grid">
      <section class="detail-block"><h4>Summary</h4><p><strong>${a.title}</strong></p><p>${a.summary}</p><p><strong>Tags:</strong> ${a.tags.join(', ')}</p><p><strong>Related product/program:</strong> ${a.relatedProduct || 'n/a'}</p></section>
      <section class="detail-block"><h4>Context</h4><p><strong>Company:</strong> <span class="clickable" data-company="${c.id}">${c.name}</span></p><p><strong>Country:</strong> <span class="clickable" data-country="${co.code}">${co.flag} ${co.name}</span></p><p><strong>Publication date:</strong> ${a.publication_date}</p></section>
      <section class="detail-block"><h4>Source</h4><p>${sourceBadge(s.id)}</p><p><strong>Source title:</strong> ${s.source_title}</p><p><strong>Publisher:</strong> ${s.publisher}</p><p><a class="link" target="_blank" href="${s.source_url}">Open source URL</a></p></section>
    </div>
  `);
}

function openDeal(id){
  const m = db.mna.find(x=>x.id===id); if(!m) return; const ac=company(m.acquirerId); const s=source(m.sourceId);
  openModal(`
    <div class="detail-head"><h2 class="detail-title">M&A Deal Detail</h2><span class="badge ${dealStatusClass(m.status)}">${m.status}</span></div>
    <div class="detail-grid">
      <section class="detail-block"><h4>Deal Structure</h4>
        <p><strong>Acquirer:</strong> <span class="clickable" data-company="${ac.id}">${ac.name}</span></p>
        <p><strong>Target:</strong> ${m.target}</p>
        <p><strong>Seller:</strong> ${m.seller || 'n/a'}</p>
        <p><strong>Type:</strong> ${m.dealType}</p>
        <p><strong>Value:</strong> ${m.dealValue}B ${m.currency}</p>
      </section>
      <section class="detail-block"><h4>Timeline</h4>
        <p><strong>Announced:</strong> ${m.announced}</p>
        <p><strong>Expected close:</strong> ${m.expectedClose || 'n/a'}</p>
        <p><strong>Completed:</strong> ${m.completed || 'n/a'}</p>
      </section>
      <section class="detail-block"><h4>Rationale & Source</h4>
        <p><strong>One-line summary:</strong> ${m.summary}</p>
        <p><strong>Strategic rationale:</strong> ${m.rationale}</p>
        <p>${sourceBadge(s.id)}</p>
        <p><strong>Source title:</strong> ${s.source_title}</p>
        <p><strong>Publisher:</strong> ${s.publisher}</p>
        <p><a class="link" target="_blank" href="${s.source_url}">Open source URL</a></p>
      </section>
    </div>
  `);
}

function openSource(id){
  const s=source(id); if(!s) return;
  openModal(`<div class="detail-head"><h2 class="detail-title">Source Detail</h2></div>
    <div class="detail-grid"><section class="detail-block"><h4>Identity</h4><p><strong>${s.source_name}</strong> (${s.source_type})</p><p>Publisher: ${s.publisher}</p><p>Trust tier: ${s.trust_tier}</p></section>
    <section class="detail-block"><h4>Traceability</h4><p>Source title: ${s.source_title}</p><p>Publication date: ${s.publication_date}</p><p>Retrieved: ${s.retrieved_at}</p><p>Verified: ${s.last_verified_at}</p><p><a class="link" href="${s.source_url}" target="_blank">Open source URL</a></p></section></div>`);
}

function openModal(html){
  byId('detailContent').innerHTML = html;
  byId('detailModal').showModal();
}

function bindGlobal(){
  document.body.addEventListener('click',(e)=>{
    const t = e.target.closest('[data-route],[data-announcement],[data-deal],[data-company],[data-country],[data-go],[data-source],[data-followtab],[data-sort],[data-setsort]');
    if(!t) return;
    if(t.dataset.route) setRoute(t.dataset.route);
    if(t.dataset.go){ setRoute(t.dataset.go); renderCurrent(); }
    if(t.dataset.announcement) openAnnouncement(t.dataset.announcement);
    if(t.dataset.deal) openDeal(t.dataset.deal);
    if(t.dataset.company) renderCompanyProfile(t.dataset.company);
    if(t.dataset.country) renderCountry(t.dataset.country);
    if(t.dataset.source) openSource(t.dataset.source);
    if(t.dataset.followtab){ state.followTab=t.dataset.followtab; renderFollow(); }
    if(t.dataset.xfeedtab!==undefined){ state.xFeedTab=t.dataset.xfeedtab; document.querySelectorAll('[data-xfeedtab]').forEach(b=>b.classList.toggle('active',b.dataset.xfeedtab===state.xFeedTab)); const el=byId('xFeedContent'); if(el) el.innerHTML=renderXFeedContent(); }
    if(t.dataset.xfeedrefresh!==undefined) fetchXFeed();
    if(t.dataset.sort){ state.marketSort = t.dataset.sort; state.marketDir = state.marketDir==='desc'?'asc':'desc'; renderMarket(); }
    if(t.dataset.setsort){ state.marketSort=t.dataset.setsort; state.marketDir=t.dataset.setdir||'desc'; renderMarket(); }
  });
  byId('closeModal').addEventListener('click',()=>byId('detailModal').close());
}

function renderCurrent(){
  renderDashboard(); renderAnnouncements(); renderMna(); renderMarket(); renderCompanies(); renderRegulations(); renderProducts(); renderFollow();
}

function bindSearch(){
  const input = byId('globalSearch'); const out = byId('searchResults');
  input.addEventListener('input',()=>{
    const q = input.value.trim().toLowerCase();
    if(!q){ out.classList.add('hidden'); out.innerHTML=''; return; }
    const results = [];
    db.companies.forEach(c=>{ if(`${c.name} ${c.ticker}`.toLowerCase().includes(q)) results.push({type:'company', id:c.id, title:`${c.name} (${c.ticker})`, sub:`${country(c.country)?.flag||''} ${country(c.country)?.name||c.country}`}); });
    db.countries.forEach(c=>{ if(`${c.name} ${c.code}`.toLowerCase().includes(q)) results.push({type:'country', id:c.code, title:`${c.flag||''} ${c.name}`, sub:c.code}); });
    db.products.forEach(p=>{ if(p.name.toLowerCase().includes(q)) results.push({type:'product', id:p.id, title:p.name, sub:'Product'}); });
    db.sources.forEach(s=>{ if(s.source_name.toLowerCase().includes(q)) results.push({type:'source', id:s.id, title:s.source_name, sub:`${s.source_type} · ${s.trust_tier}`}); });
    out.innerHTML = results.slice(0,8).map(r=>`<div class="search-item" data-searchtype="${r.type}" data-searchid="${r.id}"><strong>${r.title}</strong><div class="muted">${r.sub}</div></div>`).join('') || '<div class="search-item">No results</div>';
    out.classList.remove('hidden');
  });
  out.addEventListener('click',(e)=>{
    const t = e.target.closest('[data-searchtype]'); if(!t) return;
    const type=t.dataset.searchtype,id=t.dataset.searchid;
    if(type==='company') renderCompanyProfile(id);
    if(type==='country') renderCountry(id);
    if(type==='product') setRoute('products');
    if(type==='source') openSource(id);
    out.classList.add('hidden'); input.value='';
  });
}

async function fetchLiveStockPrices(){
  try {
    const res = await fetch('/api/v1/stock-prices', { signal: AbortSignal.timeout(8000) });
    if(!res.ok) return;
    const data = await res.json();
    data.forEach(item => {
      const c = db.companies.find(x => x.ticker === item.ticker);
      if(c){ c.price = item.price; c.change = item.change_pct; if(item.market_cap > 0) c.marketCap = item.market_cap; }
    });
    renderCurrent();
  } catch(_){ /* backend not running — use hardcoded data */ }
}

renderCurrent();
setRoute('dashboard');
bindGlobal();
bindSearch();
fetchLiveStockPrices();
