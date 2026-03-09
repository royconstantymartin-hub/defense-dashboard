import clsx from 'clsx';

const styles: Record<string, string> = {
  authority: 'border-positive/30 bg-positive/10 text-positive',
  company: 'border-accent/30 bg-accent/10 text-accent',
  media: 'border-purple/30 bg-purple/10 text-purple',
  analyst: 'border-amber/30 bg-amber/10 text-amber',
  executive: 'border-slate-500/40 bg-slate-600/20 text-slate-200',
  regulator: 'border-amber/30 bg-amber/10 text-amber',
  armed_force: 'border-positive/30 bg-positive/10 text-positive'
};

export function EntityTypeBadge({ entityType }: { entityType: string }) {
  return (
    <span
      className={clsx(
        'rounded-md border px-2 py-0.5 text-[10px] uppercase tracking-wide',
        styles[entityType] ?? 'border-border text-textMuted'
      )}
    >
      {entityType.replace('_', ' ')}
    </span>
  );
}
