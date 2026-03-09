const data = {
  kpis: [
    { label: 'Tracked Companies', value: '1,284', trend: '+3.2%', dir: 'up' },
    { label: 'Open M&A Situations', value: '46', trend: '+8.1%', dir: 'up' },
    { label: 'Verified Sources (30d)', value: '312', trend: '+11.4%', dir: 'up' },
    { label: 'Regulatory Alerts', value: '29', trend: '-2.4%', dir: 'down' }
  ],
  announcements: [
    { title: 'NATO ISR procurement expansion approved', region: 'Europe', date: '2026-03-01', tag: 'Strategic', tagClass: 'b-purple', source: 'NATO ACT', publisher: 'Official', trust: 'Official' },
    { title: 'US DoD hypersonics contract update', region: 'North America', date: '2026-02-26', tag: 'Priority', tagClass: 'b-blue', source: 'US DoD', publisher: 'Official', trust: 'Official' },
    { title: 'APAC naval offset policy draft released', region: 'APAC', date: '2026-02-22', tag: 'Regulatory', tagClass: 'b-amber', source: 'Defense News', publisher: 'Media', trust: 'Specialist' }
  ],
  mna: [
    { title: 'Lockheed Martin → Orbital Shield ($2.1B)', date: '2026-02-28', tag: 'Announced', tagClass: 'b-blue', source: 'Janes', trust: 'Specialist' },
    { title: 'Rheinmetall → BlueCurrent Robotics ($410M)', date: '2026-02-24', tag: 'Pending', tagClass: 'b-amber', source: 'Reuters', trust: 'Tier 1' }
  ],
  market: [
    { company: 'Thales', logo: '', country: 'France', flag: '🇫🇷', segment: 'Defense Electronics' },
    { company: 'Rheinmetall', logo: '', country: 'Germany', flag: '🇩🇪', segment: 'Land Systems' },
    { company: 'Lockheed Martin', logo: '', country: 'United States', flag: '🇺🇸', segment: 'Aerospace' }
  ],
  expenditures: [
    { country: 'United States', flag: '🇺🇸', spend: '$916B', gdp: '3.4%', source: 'SIPRI' },
    { country: 'United Kingdom', flag: '🇬🇧', spend: '$74B', gdp: '2.3%', source: 'SIPRI' },
    { country: 'France', flag: '🇫🇷', spend: '$67B', gdp: '2.1%', source: 'SIPRI' }
  ],
  regulations: [
    { title: 'EU Foreign Subsidies Screening update', date: '2026-01-15', tag: 'Pending', tagClass: 'b-amber', source: 'EU Commission', trust: 'Official' },
    { title: 'US CMMC Level 2 expansion notice', date: '2026-04-01', tag: 'Priority', tagClass: 'b-blue', source: 'US DoD', trust: 'Official' }
  ],
  products: [
    { product: 'Aquila Radar Block II', company: 'Thales', status: 'Procurement', statusClass: 'b-purple', source: 'Janes' },
    { product: 'PAC-Next Interceptor', company: 'Lockheed Martin', status: 'In Service', statusClass: 'b-green', source: 'US DoD' }
  ],
  follow: [
    { entity: 'NATO Allied Command Transformation', type: 'official', platform: 'website', note: 'Capability targets update published.', date: '2026-03-01' },
    { entity: 'Defense News', type: 'media', platform: 'website', note: 'European procurement cycle analysis.', date: '2026-02-27' },
    { entity: 'Strategic Defence Analysis Desk', type: 'analysis', platform: 'x', note: 'Commentary monitored; no new post ingested.', date: '2026-02-26' }
  ]
};

const initials = (name) => name.split(' ').map(s => s[0]).join('').slice(0,2).toUpperCase();
const el = (html) => { const d = document.createElement('div'); d.innerHTML = html.trim(); return d.firstChild; };

function renderKpis() {
  const root = document.getElementById('kpis');
  root.innerHTML = '';
  data.kpis.forEach(k => root.appendChild(el(`
    <article class="kpi">
      <div class="label">${k.label}</div>
      <div class="value">${k.value}</div>
      <div class="trend ${k.dir}">${k.trend}</div>
    </article>`)));
}

function sourceMeta(a) {
  return `<span class="source"><span class="source-logo">${initials(a.source)}</span>${a.source}</span><span class="badge b-green">${a.trust}</span>`;
}

function renderAnnouncements(items = data.announcements) {
  const root = document.getElementById('announcementsList'); root.innerHTML = '';
  items.forEach(a => root.appendChild(el(`
    <article class="item">
      <div class="item-top"><div class="item-title">${a.title}</div><span class="badge ${a.tagClass}">${a.tag}</span></div>
      <div class="meta"><span>${a.region}</span><span>•</span><span>${a.date}</span></div>
      <div class="meta">${sourceMeta(a)}</div>
    </article>`)));
}

function renderMna(items = data.mna) {
  const root = document.getElementById('mnaList'); root.innerHTML = '';
  items.forEach(m => root.appendChild(el(`
    <article class="item">
      <div class="item-top"><div class="item-title">${m.title}</div><span class="badge ${m.tagClass}">${m.tag}</span></div>
      <div class="meta"><span>${m.date}</span></div>
      <div class="meta"><span class="source"><span class="source-logo">${initials(m.source)}</span>${m.source}</span><span class="badge b-green">${m.trust}</span></div>
    </article>`)));
}

function renderMarket(items = data.market) {
  const rows = items.map(r => `<tr>
    <td><div class="company-cell"><span class="logo">${r.logo ? `<img src="${r.logo}" alt="${r.company}"/>` : initials(r.company)}</span>${r.company}</div></td>
    <td><span class="flag">${r.flag || ''}</span> ${r.country}</td><td>${r.segment}</td></tr>`).join('');
  document.getElementById('marketTable').innerHTML = `<table class="row-table"><thead><tr><th>Company</th><th>Country</th><th>Segment</th></tr></thead><tbody>${rows}</tbody></table>`;
}

function renderExpenditures(items = data.expenditures) {
  const rows = items.map(r => `<tr><td><span class="flag">${r.flag || '🏳️'}</span> ${r.country}</td><td>${r.spend}</td><td>${r.gdp}</td><td>${r.source}</td></tr>`).join('');
  document.getElementById('expenditureTable').innerHTML = `<table class="row-table"><thead><tr><th>Country</th><th>Spend</th><th>% GDP</th><th>Source</th></tr></thead><tbody>${rows}</tbody></table>`;
}

function renderRegulations(items = data.regulations) {
  const root = document.getElementById('regulationList'); root.innerHTML = '';
  items.forEach(r => root.appendChild(el(`
    <article class="item">
      <div class="item-top"><div class="item-title">${r.title}</div><span class="badge ${r.tagClass}">${r.tag}</span></div>
      <div class="meta"><span>${r.date}</span></div>
      <div class="meta"><span class="source"><span class="source-logo">${initials(r.source)}</span>${r.source}</span><span class="badge b-green">${r.trust}</span></div>
    </article>`)));
}

function renderProducts(items = data.products) {
  const rows = items.map(r => `<tr><td>${r.product}</td><td>${r.company}</td><td><span class="badge ${r.statusClass}">${r.status}</span></td><td>${r.source}</td></tr>`).join('');
  document.getElementById('productTable').innerHTML = `<table class="row-table"><thead><tr><th>Product</th><th>Company</th><th>Status</th><th>Source</th></tr></thead><tbody>${rows}</tbody></table>`;
}

function renderFollow(items = data.follow) {
  const root = document.getElementById('followList'); root.innerHTML = '';
  items.forEach(f => {
    const cls = f.type === 'official' ? 'b-green' : f.type === 'media' ? 'b-purple' : 'b-amber';
    const label = f.type === 'official' ? 'Official Account' : f.type === 'media' ? 'Media Source' : 'Commentary';
    root.appendChild(el(`<article class="item"><div class="item-top"><div class="item-title">${f.entity}</div><span class="badge ${cls}">${label}</span></div><div class="meta"><span>${f.platform}</span><span>•</span><span>${f.date}</span></div><div class="meta">${f.note}</div></article>`));
  });
}

function bindSearch() {
  const input = document.getElementById('globalSearch');
  input.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    renderAnnouncements(data.announcements.filter(x => JSON.stringify(x).toLowerCase().includes(q)));
    renderMna(data.mna.filter(x => JSON.stringify(x).toLowerCase().includes(q)));
    renderMarket(data.market.filter(x => JSON.stringify(x).toLowerCase().includes(q)));
    renderExpenditures(data.expenditures.filter(x => JSON.stringify(x).toLowerCase().includes(q)));
    renderRegulations(data.regulations.filter(x => JSON.stringify(x).toLowerCase().includes(q)));
    renderProducts(data.products.filter(x => JSON.stringify(x).toLowerCase().includes(q)));
    renderFollow(data.follow.filter(x => JSON.stringify(x).toLowerCase().includes(q)));
  });
}

function bindFollowFilter() {
  const chips = [...document.querySelectorAll('.chip')];
  chips.forEach(chip => chip.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    const filter = chip.dataset.filter;
    renderFollow(filter === 'all' ? data.follow : data.follow.filter(x => x.type === filter));
  }));
}

renderKpis();
renderAnnouncements();
renderMna();
renderMarket();
renderExpenditures();
renderRegulations();
renderProducts();
renderFollow();
bindSearch();
bindFollowFilter();
