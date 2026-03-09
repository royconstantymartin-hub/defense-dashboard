'use client';

import { DataTable } from '@/components/ui/DataTable';
import { FilterBar } from '@/components/ui/FilterBar';
import { PageHeader } from '@/components/layout/PageHeader';
import { SourceBadge } from '@/components/ui/SourceBadge';
import { productRows } from '@/lib/demo-data';

export default function ProductsPage() {
  return (
    <main className="container space-y-4">
      <PageHeader title="Defense Product Catalog" subtitle="Product intelligence tied to traceable sources." />
      <FilterBar filters={['Category', 'Manufacturer', 'Lifecycle', 'Trust tier']} />
      <DataTable
        columns={[
          { key: 'name', label: 'Product', sortable: true },
          { key: 'category', label: 'Category', sortable: true },
          { key: 'manufacturer', label: 'Manufacturer', sortable: true },
          { key: 'status', label: 'Status', badge: true },
          { key: 'source', label: 'Source', render: (row) => <SourceBadge source={row.source} /> }
        ]}
        rows={productRows}
      />
    </main>
  );
}
