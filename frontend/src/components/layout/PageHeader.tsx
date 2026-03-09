import { Bell, Download, Search } from 'lucide-react';

export function PageHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <header className="mb-4 flex flex-col gap-4 border-b border-border pb-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-text">{title}</h1>
        <p className="mt-1 text-sm text-textMuted">{subtitle}</p>
      </div>
      <div className="flex w-full items-center gap-2 lg:w-auto">
        <label className="flex min-w-[280px] flex-1 items-center gap-2 rounded-md border border-border bg-panel px-3 py-2 text-sm text-textMuted lg:flex-none">
          <Search size={16} />
          <input className="w-full bg-transparent outline-none placeholder:text-textMuted" placeholder="Search companies, contracts, countries..." />
        </label>
        <button className="rounded-md border border-border bg-panel px-3 py-2 text-sm text-text hover:border-accent/40">
          <Download size={16} />
        </button>
        <button className="rounded-md border border-border bg-panel px-3 py-2 text-sm text-text hover:border-accent/40">
          <Bell size={16} />
        </button>
      </div>
    </header>
  );
}
