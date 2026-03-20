import { TrendingDown, TrendingUp } from 'lucide-react';
import type { Kpi } from '@/lib/types';

export function KpiCard({ kpi }: { kpi: Kpi }) {
  const Icon = kpi.icon;
  return (
    <article className="rounded-xl border border-border bg-panel p-4 shadow-panel">
      <div className="flex items-start justify-between gap-2">
        <p className="text-[11px] font-medium uppercase tracking-widest text-textMuted">{kpi.label}</p>
        {Icon && (
          <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
            <Icon size={15} />
          </span>
        )}
      </div>
      <div className="mt-2">
        <p className="text-2xl font-bold text-text">{kpi.value}</p>
        {kpi.subtitle && <p className="mt-0.5 text-xs text-textMuted">{kpi.subtitle}</p>}
        {kpi.trend && (
          <span className={`mt-1 inline-flex items-center gap-1 text-xs font-medium ${kpi.trend.direction === 'up' ? 'text-positive' : 'text-negative'}`}>
            {kpi.trend.direction === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {kpi.trend.value}
          </span>
        )}
      </div>
    </article>
  );
}
