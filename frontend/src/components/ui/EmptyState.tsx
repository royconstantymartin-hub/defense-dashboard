export function EmptyState({ title, description, compact = false }: { title: string; description: string; compact?: boolean }) {
  return (
    <div className={`rounded-xl border border-dashed border-border bg-panelSoft text-center ${compact ? 'p-4' : 'p-10'}`}>
      <p className={`${compact ? 'text-sm' : 'text-base'} font-semibold text-text`}>{title}</p>
      <p className="mt-1 text-xs text-textMuted">{description}</p>
    </div>
  );
}
