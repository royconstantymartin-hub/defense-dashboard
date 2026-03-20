'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Search, SlidersHorizontal } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { productRows } from '@/lib/demo-data';

const CATEGORIES = ['All Categories', ...Array.from(new Set(productRows.map((p) => p.category))).sort()];
const MANUFACTURERS = ['All Manufacturers', ...Array.from(new Set(productRows.map((p) => p.manufacturer))).sort()];

export default function ProductsPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All Categories');
  const [manufacturer, setManufacturer] = useState('All Manufacturers');

  const filtered = productRows.filter((p) => {
    const q = search.toLowerCase();
    const matchSearch = !q || p.name.toLowerCase().includes(q) || p.manufacturer.toLowerCase().includes(q);
    const matchCat = category === 'All Categories' || p.category === category;
    const matchMfr = manufacturer === 'All Manufacturers' || p.manufacturer === manufacturer;
    return matchSearch && matchCat && matchMfr;
  });

  const total = productRows.length;
  const aircraft = productRows.filter((p) => p.category.toLowerCase().includes('aircraft') || p.category.toLowerCase().includes('fighter') || p.category.toLowerCase().includes('bomber') || p.category.toLowerCase().includes('heli')).length;
  const landSystems = productRows.filter((p) => p.category.toLowerCase().includes('ifv') || p.category.toLowerCase().includes('tank') || p.category.toLowerCase().includes('land') || p.category.toLowerCase().includes('armored')).length;
  const active = productRows.filter((p) => p.status.toLowerCase() === 'active').length;

  const kpis = [
    { label: 'Total Products', value: total },
    { label: 'Aircraft', value: aircraft, color: 'text-accent' },
    { label: 'Land Systems', value: landSystems, color: 'text-amber' },
    { label: 'Active', value: active, color: 'text-positive' },
  ];

  return (
    <main className="container space-y-4">
      <PageHeader title="Product Portfolio" subtitle="Defense Systems & Equipment Catalog" />

      {/* Meta bar */}
      <div className="flex flex-wrap items-center gap-4 rounded-xl border border-border bg-panel px-4 py-3 text-sm text-textMuted">
        <span>🕐 Last updated: {new Date().toISOString().slice(0, 10)}</span>
        <span className="hidden sm:block text-border">|</span>
        <span>🗄 Source: Manufacturers, Jane&apos;s</span>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {kpis.map((k) => (
          <article key={k.label} className="rounded-2xl border border-border bg-panel p-4 shadow-panel">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-textMuted">{k.label}</p>
            <p className={`mt-2 text-3xl font-bold ${k.color ?? 'text-text'}`}>{k.value}</p>
          </article>
        ))}
      </div>

      {/* Filters */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 rounded-xl border border-border bg-panel px-3 py-2.5 text-sm text-textMuted">
          <Search size={16} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="flex-1 bg-transparent outline-none placeholder:text-textMuted"
          />
        </label>
        <div className="flex gap-2">
          <label className="flex flex-1 items-center gap-2 rounded-xl border border-border bg-panel px-3 py-2.5 text-sm text-textMuted">
            <SlidersHorizontal size={14} />
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="flex-1 bg-transparent outline-none text-text">
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </label>
          <label className="flex flex-1 items-center gap-2 rounded-xl border border-border bg-panel px-3 py-2.5 text-sm text-textMuted">
            <SlidersHorizontal size={14} />
            <select value={manufacturer} onChange={(e) => setManufacturer(e.target.value)} className="flex-1 bg-transparent outline-none text-text">
              {MANUFACTURERS.map((m) => <option key={m}>{m}</option>)}
            </select>
          </label>
        </div>
        <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-panel py-2.5 text-sm font-medium text-text hover:border-accent/50 hover:bg-accent/5">
          ⇄ Compare
        </button>
      </div>

      {/* Card grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <article key={p.id} className="overflow-hidden rounded-2xl border border-border bg-panel shadow-panel">
            <div className="relative h-48 bg-panelSoft">
              {p.image_url ? (
                <Image src={p.image_url} alt={p.name} fill className="object-cover" unoptimized />
              ) : (
                <div className="flex h-full items-center justify-center text-4xl text-border">🛡</div>
              )}
              <div className="absolute right-3 top-3">
                <StatusBadge status={p.status} />
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-text">
                {p.wikipedia_url ? (
                  <a href={p.wikipedia_url} target="_blank" rel="noopener noreferrer" className="hover:text-accent hover:underline">
                    {p.name}
                  </a>
                ) : p.name}
              </h3>
              <p className="mt-0.5 text-sm text-textMuted">{p.manufacturer}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-0.5 text-xs font-medium text-accent">{p.category}</span>
                {p.source.source_name && (
                  <span className="rounded-full border border-border bg-panelSoft px-3 py-0.5 text-xs text-textMuted">{p.source.source_name}</span>
                )}
              </div>
            </div>
          </article>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full py-12 text-center text-textMuted">No products match your filters.</div>
        )}
      </div>
    </main>
  );
}
