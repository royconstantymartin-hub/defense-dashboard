'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { BarChart3, BellRing, BriefcaseBusiness, Building2, Factory, Gavel, Globe2, Radar } from 'lucide-react';

const navigationGroups = [
  {
    group: 'Intelligence',
    items: [
      { href: '/dashboard', label: 'Dashboard', icon: BarChart3 },
      { href: '/announcements', label: 'Announcements', icon: BellRing },
      { href: '/mna-tracker', label: 'M&A Tracker', icon: BriefcaseBusiness }
    ]
  },
  {
    group: 'Data Domains',
    items: [
      { href: '/companies', label: 'Companies', icon: Building2 },
      { href: '/expenditures', label: 'Expenditures', icon: Globe2 },
      { href: '/regulations', label: 'Regulations', icon: Gavel },
      { href: '/products', label: 'Products', icon: Factory },
      { href: '/follow', label: 'Follow', icon: BellRing }
    ]
  }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full border-b border-border bg-[#070b12] p-4 lg:h-screen lg:w-72 lg:border-b-0 lg:border-r">
      <div className="mb-6 flex items-center gap-3 rounded-lg border border-border bg-panel p-3">
        <div className="rounded-md bg-accent/20 p-2 text-accent">
          <Radar size={18} />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-textMuted">Defense Intelligence</p>
          <p className="text-sm font-semibold text-text">Hub Platform</p>
        </div>
      </div>

      {navigationGroups.map((section) => (
        <div key={section.group} className="mb-6">
          <p className="mb-2 px-2 text-[11px] uppercase tracking-[0.16em] text-textMuted">{section.group}</p>
          <nav className="space-y-1">
            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href === '/dashboard' && pathname === '/');
              return (
                <Link
                  href={item.href}
                  key={item.href}
                  className={clsx(
                    'flex items-center gap-3 rounded-md border px-3 py-2 text-sm transition',
                    isActive
                      ? 'border-accent/40 bg-accent/10 text-text'
                      : 'border-transparent text-textMuted hover:border-border hover:bg-panel hover:text-text'
                  )}
                >
                  <Icon size={16} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      ))}
    </aside>
  );
}
