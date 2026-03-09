'use client';

import { DataTable } from '@/components/ui/DataTable';
import { FilterBar } from '@/components/ui/FilterBar';
import { PageHeader } from '@/components/layout/PageHeader';
import { SourceBadge } from '@/components/ui/SourceBadge';
import { CountryFlagDisplay } from '@/components/ui/CountryFlagDisplay';
import { expenditureRows } from '@/lib/demo-data';

export default function ExpendituresPage() {
  return (
    <main className="container space-y-4">
      <PageHeader title="Defense Expenditures" subtitle="Country-level spending with dataset lineage." />
      <FilterBar filters={['Region', 'Year', 'Dataset', 'Trust tier']} />
      <DataTable
        columns={[
          { key: 'country_code', label: 'Flag', render: (row) => <CountryFlagDisplay countryCode={row.country_code} /> },
          { key: 'country', label: 'Country', sortable: true },
          { key: 'year', label: 'Year', sortable: true },
          { key: 'spend', label: 'Spend (USD)', sortable: true },
          { key: 'gdp', label: '% GDP', sortable: true },
          { key: 'source', label: 'Source', render: (row) => <SourceBadge source={row.source} /> }
        ]}
        rows={expenditureRows}
      />
    </main>
  );
}
