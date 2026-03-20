'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { BarChart3, BellRing, BriefcaseBusiness, Building2, Factory, Gavel, Globe2, Radar, TrendingUp, X } from 'lucide-react';

const navigationGroups = [
  {
    group: 'Intelligence',
    items: [
      { href: '/dashboard', label: 'Dashboard', icon: BarChart3 },
      { href: '/announcements', label: 'Announcements', icon: BellRing },
      { href: '/mna-tracker', label: 'M&A Activity', icon: BriefcaseBusiness },
    ]
  },
  {
    group: 'Data Domains',
    items: [
      { href: '/expenditures', label: 'Market Data', icon: TrendingUp },
      { href: '/companies', label: 'Companies', icon: Building2 },
      { href: '/expenditures', label: 'Expenditures', icon: Globe2 },
      { href: '/regulations', label: 'Regulations', icon: Gavel },
      { href: '/products', label: 'Products', icon: Factory },
      { href: '/follow', label: 'Follow', icon: BellRing },
    ]
  }
];

export function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-72 flex-col border-r border-border bg-panel lg:h-screen">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border p-4">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-accent p-2 text-white shadow-sm">
            <Radar size={18} />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-text">Defense</p>
            <p className="text-[10px] uppercase tracking-widest text-accent">Intelligence Hub</p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="rounded-md p-1 text-textMuted hover:bg-panelSoft hover:text-text lg:hidden"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Nav groups */}
      <nav className="flex-1 overflow-y-auto p-3">
        {navigationGroups.map((section) => (
          <div key={section.group} className="mb-5">
            <p className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-textMuted">
              {section.group}
            </p>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || (item.href === '/dashboard' && pathname === '/');
                return (
                  <Link
                    href={item.href}
                    key={item.label}
                    onClick={onClose}
                    className={clsx(
                      'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
                      isActive
                        ? 'border border-accent/30 bg-accent/10 text-accent'
                        : 'border border-transparent text-textMuted hover:border-border hover:bg-panelSoft hover:text-text'
                    )}
                  >
                    <Icon size={16} />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
