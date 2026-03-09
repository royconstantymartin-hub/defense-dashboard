export function SectionCard({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-border bg-panel p-3">
      <div className="mb-2">
        <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-textMuted">{title}</h2>
        {subtitle ? <p className="mt-1 text-[11px] text-textMuted">{subtitle}</p> : null}
      </div>
      {children}
    </section>
  );
}
