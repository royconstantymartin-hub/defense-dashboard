'use client';

import { DataTable } from '@/components/ui/DataTable';
import { FilterBar } from '@/components/ui/FilterBar';
import { PageHeader } from '@/components/layout/PageHeader';
import { SourceBadge } from '@/components/ui/SourceBadge';
import { CountryFlagDisplay } from '@/components/ui/CountryFlagDisplay';
import { regulationRows } from '@/lib/demo-data';

export default function RegulationsPage() {
  return (
    <main className="container space-y-4">
      <PageHeader title="Regulations & Offset Policies" subtitle="Regulatory intelligence with source provenance." />
      <FilterBar filters={['Jurisdiction', 'Policy type', 'Status', 'Official only']} />
      <DataTable
        columns={[
          { key: 'jurisdiction', label: 'Jurisdiction', sortable: true },
          { key: 'country_code', label: 'Flag', render: (row) => <CountryFlagDisplay countryCode={row.country_code} /> },
          { key: 'policy', label: 'Policy', sortable: true },
          { key: 'status', label: 'Status', badge: true },
          { key: 'source', label: 'Source', render: (row) => <SourceBadge source={row.source} /> }
        ]}
        rows={regulationRows}
      />
    </main>
  );
}
