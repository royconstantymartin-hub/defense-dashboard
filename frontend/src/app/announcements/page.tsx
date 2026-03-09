'use client';

import { PageHeader } from '@/components/layout/PageHeader';
import { DataTable } from '@/components/ui/DataTable';
import { FilterBar } from '@/components/ui/FilterBar';
import { SectionCard } from '@/components/ui/SectionCard';
import { SourceBadge } from '@/components/ui/SourceBadge';
import { announcementRows } from '@/lib/demo-data';

export default function AnnouncementsPage() {
  return (
    <main className="container space-y-4">
      <PageHeader title="Announcements" subtitle="Traceable defense market updates from trusted sources." />
      <SectionCard title="Announcement Feed" subtitle="Each record includes verifiable source metadata.">
        <FilterBar filters={['Keyword', 'Region', 'Official only', 'Trust tier']} />
        <DataTable
          columns={[
            { key: 'headline', label: 'Headline', sortable: true },
            { key: 'region', label: 'Region', sortable: true },
            { key: 'status', label: 'Status', badge: true },
            { key: 'source', label: 'Source', render: (row) => <SourceBadge source={row.source} /> }
          ]}
          rows={announcementRows}
        />
      </SectionCard>
    </main>
  );
}
