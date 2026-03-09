'use client';

import { DataTable } from '@/components/ui/DataTable';
import { FilterBar } from '@/components/ui/FilterBar';
import { PageHeader } from '@/components/layout/PageHeader';
import { CompanyLogoAvatar } from '@/components/ui/CompanyLogoAvatar';
import { CountryFlagDisplay } from '@/components/ui/CountryFlagDisplay';
import { companies, countries } from '@/lib/demo-data';

export default function CompaniesPage() {
  return (
    <main className="container space-y-4">
      <PageHeader title="Companies Database" subtitle="Enriched company profiles with logos, links, and country context." />
      <FilterBar filters={['Country', 'Segment', 'Ownership', 'Has official links']} />
      <DataTable
        columns={[
          {
            key: 'name',
            label: 'Company',
            sortable: true,
            render: (row) => (
              <div className="flex items-center gap-2">
                <CompanyLogoAvatar name={row.name} logoUrl={row.logo_url} size="sm" />
                <span>{row.name}</span>
              </div>
            )
          },
          {
            key: 'country_code',
            label: 'Country',
            render: (row) => {
              const c = countries.find((x) => x.country_code === row.country_code);
              return <div className="flex items-center gap-2"><CountryFlagDisplay countryCode={row.country_code} flagEmoji={c?.flag_emoji} />{row.country_name}</div>;
            }
          },
          { key: 'segment', label: 'Segment', sortable: true },
          { key: 'status', label: 'Status', badge: true }
        ]}
        rows={companies}
        rowLinkBase="/company"
      />
    </main>
  );
}
