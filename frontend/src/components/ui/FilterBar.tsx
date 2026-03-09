export function FilterBar({ filters }: { filters: string[] }) {
  return (
    <div className="mb-4 flex flex-wrap gap-2 rounded-xl border border-border bg-panel p-2">
      {filters.map((filter) => (
        <button key={filter} className="rounded-md border border-border bg-panelSoft px-3 py-1.5 text-xs text-textMuted transition hover:border-accent/40 hover:text-text">
          {filter}
        </button>
      ))}
    </div>
  );
}
