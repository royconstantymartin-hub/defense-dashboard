import { TrendingDown, TrendingUp } from 'lucide-react';
import type { Kpi } from '@/lib/types';

export function KpiCard({ kpi }: { kpi: Kpi }) {
  return (
    <article className="rounded-xl border border-border bg-panel p-4 shadow-panel">
      <p className="text-xs uppercase tracking-[0.1em] text-textMuted">{kpi.label}</p>
      <div className="mt-2 flex items-end justify-between">
        <p className="text-2xl font-semibold text-text">{kpi.value}</p>
        {kpi.trend ? (
          <span className={`inline-flex items-center gap-1 text-xs font-medium ${kpi.trend.direction === 'up' ? 'text-positive' : 'text-negative'}`}>
            {kpi.trend.direction === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {kpi.trend.value}
          </span>
        ) : null}
      </div>
    </article>
  );
}
