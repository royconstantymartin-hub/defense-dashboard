'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Clock, Database, Search, Filter, Scale } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { productRows } from '@/lib/demo-data';

function countCategory(cat: string) {
  return productRows.filter((p) => p.category === cat).length;
}

function countActive() {
  return productRows.filter((p) => p.status === 'In Service').length;
}

export default function ProductsPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All Categories');
  const [manufacturer, setManufacturer] = useState('All Manufacturers');

  const categories = ['All Categories', ...Array.from(new Set(productRows.map((p) => p.category))).sort()];
  const manufacturers = ['All Manufacturers', ...Array.from(new Set(productRows.map((p) => p.manufacturer))).sort()];

  const total = productRows.length;
  const aircraft = countCategory('Aircraft');
  const landSystems = countCategory('Land Systems');
  const active = countActive();

  const filtered = productRows.filter((p) => {
    const q = search.toLowerCase();
    if (q && !p.name.toLowerCase().includes(q) && !p.manufacturer.toLowerCase().includes(q) && !p.category.toLowerCase().includes(q)) return false;
    if (category !== 'All Categories' && p.category !== category) return false;
    if (manufacturer !== 'All Manufacturers' && p.manufacturer !== manufacturer) return false;
    return true;
  });

  return (
    <main className="container space-y-4">
      <PageHeader title="Product Portfolio" subtitle="Defense Systems & Equipment Catalog" />

      {/* Timestamp row */}
      <div className="flex flex-wrap items-center gap-4 rounded-xl border border-border bg-panel px-4 py-3 text-xs text-textMuted">
        <span className="flex items-center gap-1.5"><Clock size={13} />Last updated: {new Date().toLocaleDateString('en-CA')}</span>
        <span className="hidden text-border sm:block">|</span>
        <span className="flex items-center gap-1.5"><Database size={13} />Source: Manufacturers, Jane&apos;s</span>
      </div>

      {/* KPI stats */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'TOTAL PRODUCTS', value: total, color: 'text-text' },
          { label: 'AIRCRAFT', value: aircraft, color: 'text-accent' },
          { label: 'LAND SYSTEMS', value: landSystems, color: 'text-amber' },
          { label: 'ACTIVE', value: active, color: 'text-positive' },
        ].map((k) => (
          <div key={k.label} className="rounded-xl border border-border bg-panel p-4 shadow-panel">
            <p className="text-[10px] font-medium uppercase tracking-widest text-textMuted">{k.label}</p>
            <p className={`mt-2 text-3xl font-bold ${k.color}`}>{k.value}</p>
          </div>
        ))}
      </section>

      {/* Filters row */}
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <label className="flex flex-1 items-center gap-2 rounded-xl border border-border bg-panel px-3 py-2.5 text-sm text-textMuted focus-within:border-accent/40">
          <Search size={15} />
          <input
            className="w-full bg-transparent outline-none placeholder:text-textMuted"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
        <div className="flex gap-2">
          <label className="flex items-center gap-2 rounded-xl border border-border bg-panel px-3 py-2.5 text-sm text-textMuted">
            <Filter size={14} />
            <select className="bg-transparent outline-none" value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map((c) => <option key={c}>{c}</option>)}
            </select>
          </label>
          <label className="flex items-center gap-2 rounded-xl border border-border bg-panel px-3 py-2.5 text-sm text-textMuted">
            <Database size={14} />
            <select className="bg-transparent outline-none" value={manufacturer} onChange={(e) => setManufacturer(e.target.value)}>
              {manufacturers.map((m) => <option key={m}>{m}</option>)}
            </select>
          </label>
          <button className="flex items-center gap-2 rounded-xl border border-border bg-panel px-3 py-2.5 text-sm text-textMuted hover:border-accent/40 hover:text-text">
            <Scale size={14} />
            <span className="hidden sm:inline">Compare</span>
          </button>
        </div>
      </div>

      {/* Product card grid */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.length === 0 && (
          <div className="col-span-full py-16 text-center text-sm text-textMuted">No products match your filters.</div>
        )}
        {filtered.map((p) => (
          <article key={p.id} className="overflow-hidden rounded-2xl border border-border bg-panel shadow-panel transition-shadow hover:shadow-md">
            <div className="relative h-48 bg-panelSoft">
              {p.image_url ? (
                <Image src={p.image_url} alt={p.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover" unoptimized />
              ) : (
                <div className="flex h-full items-center justify-center text-5xl opacity-30">🛡</div>
              )}
              <span className={`absolute right-3 top-3 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white ${p.status === 'In Service' ? 'bg-positive' : 'bg-amber'}`}>
                {p.status === 'In Service' ? 'ACTIVE' : p.status.toUpperCase()}
              </span>
            </div>
            <div className="p-4">
              {p.wikipedia_url ? (
                <a href={p.wikipedia_url} target="_blank" rel="noopener noreferrer" className="font-semibold text-text hover:text-accent hover:underline">
                  {p.name}
                </a>
              ) : (
                <p className="font-semibold text-text">{p.name}</p>
              )}
              <p className="mt-0.5 text-sm text-textMuted">{p.manufacturer}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-[11px] font-medium text-accent">{p.category}</span>
                {p.subcategory && (
                  <span className="rounded-full border border-border px-2.5 py-0.5 text-[11px] text-textMuted">{p.subcategory}</span>
                )}
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
