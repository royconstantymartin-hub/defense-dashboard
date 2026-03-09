'use client';

import { useMemo, useState } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { FollowEntityCard } from '@/components/ui/FollowEntityCard';
import { FollowFeedList } from '@/components/ui/FollowFeedList';
import { SectionCard } from '@/components/ui/SectionCard';
import { followEntities, followItems } from '@/lib/demo-data';
import { EmptyState } from '@/components/ui/EmptyState';

const tabs = [
  { key: 'authority', label: 'Authorities' },
  { key: 'company', label: 'Companies' },
  { key: 'executive', label: 'Executives' },
  { key: 'media', label: 'Media' },
  { key: 'analyst', label: 'Analysts' },
] as const;

export default function FollowPage() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]['key']>('authority');
  const [keyword, setKeyword] = useState('');
  const [officialOnly, setOfficialOnly] = useState(false);
  const [activeOnly, setActiveOnly] = useState(true);

  const entities = useMemo(
    () =>
      followEntities.filter((e) => {
        if (e.entity_type !== activeTab) return false;
        if (officialOnly && !e.is_official) return false;
        if (activeOnly && !e.is_active) return false;
        if (keyword && !`${e.entity_name} ${e.description ?? ''}`.toLowerCase().includes(keyword.toLowerCase())) return false;
        return true;
      }),
    [activeTab, keyword, officialOnly, activeOnly]
  );

  const matchedItems = followItems.filter((item) => entities.some((e) => e.id === item.follow_entity_id));

  return (
    <main className="container space-y-3">
      <PageHeader title="Follow" subtitle="Curated defense monitoring workspace for official, media, and analyst signals." />

      <section className="rounded-lg border border-border bg-panel p-2.5">
        <div className="flex flex-wrap items-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`rounded border px-2.5 py-1 text-[11px] uppercase tracking-wide ${
                activeTab === tab.key ? 'border-accent/50 bg-accent/10 text-text' : 'border-border text-textMuted hover:text-text'
              }`}
            >
              {tab.label}
            </button>
          ))}
          <div className="ml-auto flex flex-wrap items-center gap-2">
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Keyword"
              className="h-8 rounded border border-border bg-panelSoft px-2.5 text-xs text-text outline-none"
            />
            <label className="inline-flex items-center gap-1 text-xs text-textMuted">
              <input type="checkbox" checked={officialOnly} onChange={(e) => setOfficialOnly(e.target.checked)} /> Official only
            </label>
            <label className="inline-flex items-center gap-1 text-xs text-textMuted">
              <input type="checkbox" checked={activeOnly} onChange={(e) => setActiveOnly(e.target.checked)} /> Active only
            </label>
          </div>
        </div>
      </section>

      <div className="grid gap-3 xl:grid-cols-[1.1fr,1fr]">
        <SectionCard title="Tracked Entities" subtitle="Clearly labeled by source class: official, media, or commentary.">
          <div className="space-y-2">
            {entities.length ? entities.map((entity) => <FollowEntityCard key={entity.id} entity={entity} />) : <EmptyState compact title="No entities match current filters" description="Try broadening type/keyword filters." />}
          </div>
        </SectionCard>

        <SectionCard title="Latest Monitored Items" subtitle="High-signal updates list, not an infinite social feed.">
          <FollowFeedList items={matchedItems} />
        </SectionCard>
      </div>
    </main>
  );
}
