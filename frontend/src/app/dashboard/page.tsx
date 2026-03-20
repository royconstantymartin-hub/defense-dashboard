'use client';

import Link from 'next/link';
import { PageHeader } from '@/components/layout/PageHeader';
import { DataTable } from '@/components/ui/DataTable';
import { FilterBar } from '@/components/ui/FilterBar';
import { KpiCard } from '@/components/ui/KpiCard';
import { SectionCard } from '@/components/ui/SectionCard';
import { SourceBadge } from '@/components/ui/SourceBadge';
import { CompanyLogoAvatar } from '@/components/ui/CompanyLogoAvatar';
import { CountryFlagDisplay } from '@/components/ui/CountryFlagDisplay';
import { announcementRows, dashboardKpis, expenditureRows, maRows, companies, regulationRows } from '@/lib/demo-data';

export default function DashboardPage() {
  return (
    <main className="container space-y-4">
      <PageHeader title="Strategic Command Center" subtitle="Real-time defense intelligence with traceable sources and curated monitoring." />

      <section className="rounded-2xl border border-border bg-gradient-to-r from-panel via-panelSoft to-panel p-5 shadow-panel">
        <p className="text-xs uppercase tracking-[0.16em] text-textMuted">Operational overview</p>
        <p className="mt-2 text-sm text-textMuted">Every signal below links to a source record with trust tier and open-source URL.</p>
      </section>

      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {dashboardKpis.map((kpi) => (
          <KpiCard key={kpi.label} kpi={kpi} />
        ))}
      </section>

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
