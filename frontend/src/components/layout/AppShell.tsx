import { Sidebar } from '@/components/layout/Sidebar';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bg text-text lg:flex">
      <Sidebar />
      <div className="flex-1 p-4 lg:p-6">{children}</div>
    </div>
  );
}
