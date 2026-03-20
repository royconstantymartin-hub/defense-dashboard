import { TrendingDown, TrendingUp } from 'lucide-react';
import type { Kpi } from '@/lib/types';

export function KpiCard({ kpi }: { kpi: Kpi }) {
  return (
    <article className="rounded-2xl border border-border bg-panel p-5 shadow-panel">
      <div className="mb-3 flex items-start justify-between">
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-textMuted">{kpi.label}</p>
        {kpi.icon && (
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/15 text-accent">
            <kpi.icon size={16} />
          </span>
        )}
      </div>
      <p className="text-3xl font-bold text-text">{kpi.value}</p>
      {kpi.subtitle && <p className="mt-0.5 text-xs text-textMuted">{kpi.subtitle}</p>}
      {kpi.trend && (
        <span className={`mt-2 inline-flex items-center gap-1 text-xs font-semibold ${kpi.trend.direction === 'up' ? 'text-positive' : 'text-negative'}`}>
          {kpi.trend.direction === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {kpi.trend.value}
        </span>
      )}
    </article>
  );
}
