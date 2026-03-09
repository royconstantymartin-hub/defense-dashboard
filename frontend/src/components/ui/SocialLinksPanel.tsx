import { ExternalLink } from 'lucide-react';

export function SocialLinksPanel({ links }: { links: Array<{ label: string; url?: string }> }) {
  return (
    <div className="rounded-xl border border-border bg-panel p-4">
      <h3 className="mb-2 text-xs uppercase tracking-[0.12em] text-textMuted">Social Links</h3>
      <div className="space-y-2">
        {links.map((item) => (
          <div key={item.label} className="text-sm">
            {item.url ? (
              <a href={item.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-accent hover:underline">
                {item.label} <ExternalLink size={12} />
              </a>
            ) : (
              <span className="text-textMuted">{item.label}: not available</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
