'use client';

import { DataTable } from '@/components/ui/DataTable';
import { FilterBar } from '@/components/ui/FilterBar';
import { PageHeader } from '@/components/layout/PageHeader';
import { SourceBadge } from '@/components/ui/SourceBadge';
import { maRows } from '@/lib/demo-data';

export default function MnaTrackerPage() {
  return (
    <main className="container space-y-4">
      <PageHeader title="M&A Tracker" subtitle="Strategic transactions with verified source traceability." />
      <FilterBar filters={['Stage', 'Trust tier', 'Official filings', 'Deal size']} />
      <DataTable
        columns={[
          { key: 'acquirer', label: 'Acquirer', sortable: true },
          { key: 'target', label: 'Target', sortable: true },
          { key: 'value', label: 'Value', sortable: true },
          { key: 'stage', label: 'Stage', badge: true },
          { key: 'source', label: 'Source', render: (row) => <SourceBadge source={row.source} /> }
        ]}
        rows={maRows}
      />
    </main>
  );
}
