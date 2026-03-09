import { ExternalLink } from 'lucide-react';
import type { FollowItem } from '@/lib/types';
import { PlatformBadge } from '@/components/ui/PlatformBadge';
import { CompanyLogoAvatar } from '@/components/ui/CompanyLogoAvatar';
import { EmptyState } from '@/components/ui/EmptyState';

export function FollowFeedList({ items }: { items: FollowItem[] }) {
  if (!items.length) {
    return <EmptyState compact title="No monitored items in this view" description="Entities remain tracked; no recent item matched your current filters." />;
  }

  return (
    <div className="rounded-lg border border-border bg-[#0d131f]">
      <div className="divide-y divide-border">
        {items.map((item) => (
          <div key={item.id} className="flex items-start gap-2.5 p-2.5">
            <CompanyLogoAvatar name={item.entity_name} logoUrl={item.logo_url || item.avatar_url} size="sm" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="truncate text-xs font-semibold text-text">{item.entity_name}</p>
                <PlatformBadge platform={item.platform} />
              </div>
              <p className="mt-1 text-sm text-text">{item.headline ?? 'No latest item title available'}</p>
              <p className="mt-1 line-clamp-2 text-xs text-textMuted">{item.preview ?? 'Feed unavailable; profile metadata only.'}</p>
              <div className="mt-1.5 flex items-center justify-between text-[11px]">
                <span className="text-textMuted">{item.publication_or_retrieval_date}</span>
                <a href={item.direct_link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-accent hover:underline">
                  Open link <ExternalLink size={11} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
