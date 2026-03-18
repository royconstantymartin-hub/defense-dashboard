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
    { code:'US', name:'United States', flag:'🇺🇸' },{ code:'FR', name:'France', flag:'🇫🇷' },{ code:'DE', name:'Germany', flag:'🇩🇪' },
    { code:'GB', name:'United Kingdom', flag:'🇬🇧' },{ code:'IT', name:'Italy', flag:'🇮🇹' },{ code:'SE', name:'Sweden', flag:'🇸🇪' },
    { code:'NO', name:'Norway', flag:'🇳🇴' }
  ],
  companies: [
    { id:'c1', name:'Lockheed Martin', logo:'', country:'US', ticker:'LMT', exchange:'NYSE', price:468.21, change:1.2, marketCap:112.4, currency:'USD', revenue:67.6, specialization:'Aerospace / Missile Defense', website:'https://www.lockheedmartin.com/', ir:'https://investors.lockheedmartin.com/', linkedin:'https://www.linkedin.com/company/lockheed-martin/', x:'https://x.com/LockheedMartin', description:'Prime contractor across aerospace, missile defense and integrated mission systems.', listed:true },
    { id:'c2', name:'RTX', logo:'', country:'US', ticker:'RTX', exchange:'NYSE', price:103.35, change:-0.8, marketCap:137.2, currency:'USD', revenue:68.9, specialization:'Aerospace / Propulsion', website:'https://www.rtx.com/', ir:'https://investors.rtx.com/', linkedin:'https://www.linkedin.com/company/rtx/', x:'https://x.com/RTX_News', description:'Major defense and aerospace supplier covering missiles, sensors and propulsion.', listed:true },
    { id:'c3', name:'BAE Systems', logo:'', country:'GB', ticker:'BA.', exchange:'LSE', price:14.12, change:0.4, marketCap:44.8, currency:'GBP', revenue:27.3, specialization:'Naval / Air / Land', website:'https://www.baesystems.com/', ir:'https://investors.baesystems.com/', linkedin:'https://www.linkedin.com/company/bae-systems/', x:'https://x.com/BAESystemsplc', description:'Integrated defense prime with broad land, sea and air portfolio.', listed:true },
    { id:'c4', name:'Thales', logo:'', country:'FR', ticker:'HO', exchange:'Euronext Paris', price:152.4, change:1.9, marketCap:32.2, currency:'EUR', revenue:18.4, specialization:'Defense Electronics', website:'https://www.thalesgroup.com/', ir:'https://www.thalesgroup.com/en/investor', linkedin:'https://www.linkedin.com/company/thales/', x:'https://x.com/thalesgroup', description:'Defense electronics and mission systems specialist.', listed:true },
    { id:'c5', name:'Rheinmetall', logo:'', country:'DE', ticker:'RHM', exchange:'Xetra', price:497.0, change:2.3, marketCap:21.9, currency:'EUR', revenue:9.8, specialization:'Land Systems / Munitions', website:'https://www.rheinmetall.com/', ir:'https://www.rheinmetall.com/en/investor-relations', linkedin:'https://www.linkedin.com/company/rheinmetall/', x:'', description:'Land systems and munitions supplier driving European rearmament.', listed:true },
    { id:'c6', name:'Leonardo', logo:'', country:'IT', ticker:'LDO', exchange:'Borsa Italiana', price:25.6, change:-0.4, marketCap:14.7, currency:'EUR', revenue:15.3, specialization:'Helicopters / Electronics', website:'https://www.leonardo.com/', ir:'https://www.leonardo.com/en/investors', linkedin:'https://www.linkedin.com/company/leonardo-company/', x:'', description:'European aerospace and defense contractor.', listed:true },
    { id:'c7', name:'Saab', logo:'', country:'SE', ticker:'SAAB-B', exchange:'Nasdaq Stockholm', price:87.3, change:1.1, marketCap:13.1, currency:'SEK', revenue:6.2, specialization:'Air Defense / Sensors', website:'https://www.saab.com/', ir:'https://www.saab.com/investors', linkedin:'https://www.linkedin.com/company/saab/', x:'', description:'Swedish defense company focused on sensors and air/sea systems.', listed:true },
    { id:'c8', name:'Kongsberg', logo:'', country:'NO', ticker:'KOG', exchange:'Oslo Børs', price:84.1, change:0.7, marketCap:12.4, currency:'NOK', revenue:4.9, specialization:'Naval / Missile / C2', website:'https://www.kongsberg.com/', ir:'https://www.kongsberg.com/investor-relations/', linkedin:'https://www.linkedin.com/company/kongsberg/', x:'', description:'Nordic defense and maritime systems provider.', listed:true }
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
    { id:'p1', name:'Aegis Next C2', companyId:'c1', category:'C2', status:'in service', sourceId:'s1' },
    { id:'p2', name:'FalconEye ISR Suite', companyId:'c4', category:'ISR', status:'procurement', sourceId:'s5' },
    { id:'p3', name:'Lynx IFV', companyId:'c5', category:'Land Platform', status:'procurement', sourceId:'s2' },
    { id:'p4', name:'Giraffe X', companyId:'c7', category:'Radar', status:'development', sourceId:'s2' }
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

const xFeedState = { status: 'loading', data: [], error: null, lastFetched: null };

const views = ['dashboard','announcements','mna','market','companies','companyProfile','country','regulations','products','follow'];
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
  follow:['Follow Workspace','Curated monitoring for official, media and commentary sources.']
};


const fxToUsd = { USD:1, EUR:1.09, GBP:1.28, SEK:0.095, NOK:0.094 };
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
  return logo ? `<span class="logo"><img src="${logo}" alt="${name}"/></span>` : `<span class="logo">${initials(name)}</span>`;
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
  listed.sort((a,b)=>(state.marketDir==='desc'?1:-1)*((state.marketSort==='marketCapUsd'?toUsdCap(b):b[state.marketSort])-(state.marketSort==='marketCapUsd'?toUsdCap(a):a[state.marketSort])));
  byId('marketView').innerHTML = `<article class="panel"><h3>Listed Defense Companies</h3>
    <div class="filters">
      <input id="marketSearch" class="input" placeholder="Search company or ticker" />
      <select id="countryFilter" class="select"><option value="">All Countries</option>${[...new Set(listed.map(c=>c.country))].map(c=>`<option>${c}</option>`).join('')}</select>
      <select id="specFilter" class="select"><option value="">All Specializations</option>${[...new Set(listed.map(c=>c.specialization))].map(s=>`<option>${s}</option>`).join('')}</select>
    </div>
    <div class="table-wrap"><table class="table"><thead><tr><th>Company</th><th class="clickable" data-sort="marketCapUsd">Market Cap (USD) ↓</th><th>Ticker</th><th>Exchange</th><th>Price</th><th>Daily</th><th>Revenue</th><th>Specialization</th></tr></thead><tbody id="marketRows"></tbody></table></div>
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
  byId('productsView').innerHTML = `<article class="panel"><h3>Products</h3><div class="table-wrap"><table class="table"><thead><tr><th>Product</th><th>Company</th><th>Status</th><th>Source</th></tr></thead><tbody>
  ${db.products.map(p=>`<tr><td>${p.name}</td><td class="clickable" data-company="${p.companyId}">${company(p.companyId).name}</td><td><span class="badge ${p.status==='in service'?'b-green':'b-purple'}">${p.status}</span></td><td>${sourceBadge(p.sourceId)}</td></tr>`).join('')}
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
    const t = e.target.closest('[data-route],[data-announcement],[data-deal],[data-company],[data-country],[data-go],[data-source],[data-followtab],[data-sort],[data-xfeedtab],[data-xfeedrefresh]');
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

renderCurrent();
setRoute('dashboard');
bindGlobal();
bindSearch();
setInterval(fetchXFeed, 15 * 60 * 1000);
