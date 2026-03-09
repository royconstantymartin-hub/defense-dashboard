import clsx from 'clsx';

const toneClasses: Record<string, string> = {
  active: 'bg-positive/15 text-positive border-positive/30',
  announced: 'bg-accent/15 text-accent border-accent/30',
  pending: 'bg-amber/15 text-amber border-amber/30',
  regulatory: 'bg-amber/15 text-amber border-amber/30',
  strategic: 'bg-purple/15 text-purple border-purple/30',
  priority: 'bg-accent/15 text-accent border-accent/30',
  'in service': 'bg-positive/15 text-positive border-positive/30',
  procurement: 'bg-purple/15 text-purple border-purple/30',
  public: 'bg-accent/15 text-accent border-accent/30',
  private: 'bg-slate-600/20 text-slate-200 border-slate-500/40'
};

export function StatusBadge({ value }: { value: string }) {
  const key = value.toLowerCase();
  return (
    <span className={clsx('rounded-full border px-2 py-0.5 text-xs font-medium tracking-wide', toneClasses[key] ?? 'bg-slate-600/20 text-slate-200 border-slate-500/40')}>
      {value}
    </span>
  );
}
