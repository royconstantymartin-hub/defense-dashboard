'use client';

import Image from 'next/image';
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
          {
            key: 'name',
            label: 'Product',
            sortable: true,
            render: (row) => (
              <div className="flex items-center gap-3">
                {row.image_url ? (
                  <div className="relative h-10 w-16 flex-shrink-0 overflow-hidden rounded border border-border bg-[#0f1624]">
                    <Image
                      src={row.image_url}
                      alt={row.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                ) : (
                  <div className="h-10 w-16 flex-shrink-0 rounded border border-border bg-[#0f1624]" />
                )}
                <span>
                  {row.wikipedia_url ? (
                    <a
                      href={row.wikipedia_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {row.name}
                    </a>
                  ) : (
                    row.name
                  )}
                </span>
              </div>
            ),
          },
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
