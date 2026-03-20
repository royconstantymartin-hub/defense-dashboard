import type React from 'react';

export function SectionCard({ title, subtitle, children }: { title: string; subtitle?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-border bg-panel p-3">
      <div className="mb-2 flex items-start justify-between gap-2">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-textMuted">{title}</h2>
          {subtitle && typeof subtitle === 'string' ? <p className="mt-1 text-[11px] text-textMuted">{subtitle}</p> : subtitle}
        </div>
      </div>
      {children}
    </section>
  );
}
