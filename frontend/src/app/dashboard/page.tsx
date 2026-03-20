'use client';

import Link from 'next/link';
import { Clock, Database, TrendingUp, TrendingDown } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { DataTable } from '@/components/ui/DataTable';
import { FilterBar } from '@/components/ui/FilterBar';
import { KpiCard } from '@/components/ui/KpiCard';
import { SectionCard } from '@/components/ui/SectionCard';
import { SourceBadge } from '@/components/ui/SourceBadge';
import { CompanyLogoAvatar } from '@/components/ui/CompanyLogoAvatar';
import { CountryFlagDisplay } from '@/components/ui/CountryFlagDisplay';
import { announcementRows, dashboardKpis, expenditureRows, maRows, companies, regulationRows, marketLeaders } from '@/lib/demo-data';

function nowLabel() {
  return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

export default function DashboardPage() {
  return (
    <main className="container space-y-4">
      <PageHeader title="Mission Control" subtitle="Global Defense Intelligence Overview" />

      {/* Timestamp row */}
      <div className="flex flex-wrap items-center gap-4 rounded-xl border border-border bg-panel px-4 py-3 text-xs text-textMuted">
        <span className="flex items-center gap-1.5"><Clock size={13} />Last updated: {nowLabel()}</span>
        <span className="hidden text-border sm:block">|</span>
        <span className="flex items-center gap-1.5"><Database size={13} />Source: Multiple</span>
      </div>

      {/* KPI cards */}
      <section className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {dashboardKpis.map((kpi) => (
          <KpiCard key={kpi.label} kpi={kpi} />
        ))}
      </section>

      {/* Market Leaders */}
      <SectionCard
        title="Market Leaders"
        subtitle={<Link href="/companies" className="text-xs font-medium text-accent hover:underline">View All →</Link>}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-[10px] uppercase tracking-widest text-textMuted">
                <th className="py-2 text-left font-medium">#</th>
                <th className="py-2 text-left font-medium">Company</th>
                <th className="py-2 text-left font-medium">Ticker</th>
                <th className="py-2 text-right font-medium">Market Cap</th>
                <th className="py-2 text-right font-medium">Change</th>
              </tr>
            </thead>
            <tbody>
              {marketLeaders.map((row) => (
                <tr key={row.rank} className="border-b border-border/50 last:border-0 hover:bg-panelSoft">
                  <td className="py-2.5 pr-3 text-xs font-semibold text-textMuted">{row.rank}</td>
                  <td className="py-2.5">
                    <div className="flex items-center gap-2">
                      <CountryFlagDisplay countryCode={row.country_code} />
                      <span className="font-medium text-text">{row.name}</span>
                    </div>
                    <p className="text-[11px] text-textMuted">{row.country_code === 'US' ? 'USA' : row.country_code === 'FR' ? 'France' : row.country_code === 'GB' ? 'UK' : row.country_code === 'DE' ? 'Germany' : row.country_code}</p>
                  </td>
                  <td className="py-2.5 font-semibold text-accent">{row.ticker}</td>
                  <td className="py-2.5 text-right font-medium text-text">{row.market_cap}</td>
                  <td className="py-2.5 text-right">
                    <span className={`inline-flex items-center gap-0.5 text-xs font-medium ${row.change_direction === 'up' ? 'text-positive' : 'text-negative'}`}>
                      {row.change_direction === 'up' ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                      {row.change}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      {/* Main grid */}
      <section className="grid gap-4 2xl:grid-cols-12">
        <div className="space-y-4 2xl:col-span-7">
          <SectionCard title="Top Companies" subtitle="Enriched profiles with logos and official links.">
            <DataTable
              columns={[
                { key: 'name', label: 'Company', render: (row) => <div className="flex items-center gap-2"><CompanyLogoAvatar name={row.name} logoUrl={row.logo_url} size="sm" />{row.name}</div> },
                { key: 'country_name', label: 'Country', render: (row) => <div className="flex items-center gap-2"><CountryFlagDisplay countryCode={row.country_code} />{row.country_name}</div> },
                { key: 'segment', label: 'Segment' },
                { key: 'status', label: 'Status', badge: true },
              ]}
              rows={companies}
              rowLinkBase="/company"
            />
          </SectionCard>

          <SectionCard title="Recent M&A" subtitle="Deal intelligence with verified origin.">
            <DataTable
              columns={[
                { key: 'acquirer', label: 'Acquirer', sortable: true },
                { key: 'target', label: 'Target', sortable: true },
                { key: 'value', label: 'Deal Value', sortable: true },
                { key: 'stage', label: 'Stage', badge: true },
                { key: 'source', label: 'Source', render: (row) => <SourceBadge source={row.source} /> },
              ]}
              rows={maRows}
            />
          </SectionCard>
        </div>

        <div className="space-y-4 2xl:col-span-5">
          <SectionCard title="Recent Announcements" subtitle="Traceable by source and publication date.">
            <FilterBar filters={['Official only', 'Tier 1', 'Specialist']} />
            <DataTable
              columns={[
                { key: 'headline', label: 'Headline', sortable: true },
                { key: 'region', label: 'Region', sortable: true },
                { key: 'status', label: 'Status', badge: true },
                { key: 'source', label: 'Source', render: (row) => <SourceBadge source={row.source} /> },
              ]}
              rows={announcementRows}
            />
          </SectionCard>

          <SectionCard title="Top Spending Countries" subtitle="Dataset-backed expenditure records.">
            <DataTable
              columns={[
                { key: 'country_code', label: 'Flag', render: (row) => <CountryFlagDisplay countryCode={row.country_code} /> },
                { key: 'country', label: 'Country', sortable: true },
                { key: 'spend', label: 'Spend', sortable: true },
                { key: 'source', label: 'Source', render: (row) => <SourceBadge source={row.source} /> },
              ]}
              rows={expenditureRows}
            />
          </SectionCard>

          <SectionCard title="Latest Regulations" subtitle="Compliance updates with trusted provenance.">
            <DataTable
              columns={[
                { key: 'jurisdiction', label: 'Jurisdiction', sortable: true },
                { key: 'policy', label: 'Policy', sortable: true },
                { key: 'status', label: 'Status', badge: true },
                { key: 'source', label: 'Source', render: (row) => <SourceBadge source={row.source} /> },
              ]}
              rows={regulationRows}
            />
          </SectionCard>

          <Link href="/follow" className="inline-flex rounded-md border border-accent/40 bg-accent/10 px-3 py-2 text-sm text-text hover:border-accent">Open Follow Monitoring Workspace →</Link>
        </div>
      </section>
    </main>
  );
}
