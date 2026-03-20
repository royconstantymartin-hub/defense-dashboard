'use client';

import { useState } from 'react';
import { Bell, Menu } from 'lucide-react';
import { Sidebar } from '@/components/layout/Sidebar';

function todayLabel() {
  return new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bg text-text">
      {/* Mobile top bar */}
      <div className="flex items-center justify-between border-b border-border bg-panel px-4 py-3 lg:hidden">
        <button
          onClick={() => setOpen(true)}
          className="rounded-md p-1.5 text-textMuted hover:bg-panelSoft hover:text-text"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
        <div className="flex items-center gap-3">
          <button className="relative rounded-md p-1.5 text-textMuted hover:bg-panelSoft">
            <Bell size={18} />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-accent" />
          </button>
          <span className="text-xs text-textMuted">{todayLabel()}</span>
        </div>
      </div>

      <div className="lg:flex">
        {/* Backdrop */}
        {open && (
          <div
            className="fixed inset-0 z-40 bg-text/30 lg:hidden"
            onClick={() => setOpen(false)}
          />
        )}

        {/* Sidebar drawer */}
        <div
          className={`fixed inset-y-0 left-0 z-50 transition-transform duration-300 lg:static lg:translate-x-0 lg:block ${open ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <Sidebar onClose={() => setOpen(false)} />
        </div>

        {/* Main content */}
        <div className="flex-1 p-4 lg:p-6">{children}</div>
      </div>
    </div>
  );
}
