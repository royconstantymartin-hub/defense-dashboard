import { ExternalLink } from 'lucide-react';
import type { SourceMeta } from '@/lib/types';
import { TrustTierBadge } from '@/components/ui/TrustTierBadge';

export function SourceBadge({ source }: { source: SourceMeta }) {
  const initial = source.source_name.slice(0, 2).toUpperCase();
  return (
    <div className="flex items-center justify-between gap-2 rounded-md border border-border bg-panel px-2 py-1.5">
      <div className="flex min-w-0 items-center gap-2">
        {source.source_logo_url ? (
          <img src={source.source_logo_url} alt={source.source_name} className="h-5 w-5 rounded object-cover" />
        ) : (
          <div className="inline-flex h-5 w-5 items-center justify-center rounded bg-panelSoft text-[9px] text-textMuted">{initial}</div>
        )}
        <div className="min-w-0">
          <p className="truncate text-[11px] font-medium text-text">{source.source_name}</p>
          <p className="truncate text-[10px] text-textMuted">{source.publisher} · {source.publication_date ?? `Retrieved ${source.retrieved_at.slice(0,10)}`}</p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-1.5">
        <TrustTierBadge tier={source.trust_tier} />
        <a href={source.source_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[10px] text-accent hover:underline">
          Open <ExternalLink size={10} />
        </a>
      </div>
    </div>
  );
}
