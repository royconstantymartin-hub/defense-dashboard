import { Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/App";
import { 
  Shield, 
  Activity, 
  Globe, 
  FileText, 
  Package, 
  LayoutDashboard,
  Handshake,
  TrendingUp,
  Settings,
  LogOut,
  User,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { path: "/", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/announcements", icon: Activity, label: "Announcements" },
  { path: "/ma-activity", icon: Handshake, label: "M&A Activity" },
  { path: "/market-data", icon: TrendingUp, label: "Market Data" },
  { path: "/expenditures", icon: Globe, label: "Expenditures" },
  { path: "/regulations", icon: FileText, label: "Regulations" },
  { path: "/products", icon: Package, label: "Products" },
];

export default function Layout() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0A0A0B] flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-[#121214] border-r border-zinc-800
        transform transition-transform duration-200 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b border-zinc-800">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-sm flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-heading font-bold text-white tracking-tight">DEFENSE</h1>
                <p className="text-[10px] font-mono text-zinc-500 tracking-widest">INTELLIGENCE HUB</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 text-sm rounded-sm transition-all duration-200
                    ${isActive 
                      ? 'bg-zinc-800 text-white border-l-2 border-blue-500 -ml-[2px]' 
                      : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-white'
                    }
                  `}
                  data-testid={`nav-${item.path === '/' ? 'dashboard' : item.path.slice(1)}`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            <div className="pt-4 border-t border-zinc-800 mt-4">
              <Link
                to="/admin"
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2.5 text-sm rounded-sm transition-all duration-200
                  ${location.pathname === '/admin'
                    ? 'bg-zinc-800 text-white border-l-2 border-blue-500 -ml-[2px]' 
                    : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-white'
                  }
                `}
                data-testid="nav-admin"
              >
                <Settings className="w-4 h-4" />
                <span>Admin Panel</span>
              </Link>
            </div>
          </nav>

          {/* User Section */}
          <div className="p-3 border-t border-zinc-800">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-sm transition-colors">
                    <div className="w-8 h-8 bg-zinc-700 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-white text-sm truncate">{user.name}</p>
                      <p className="text-xs text-zinc-500 truncate">{user.email}</p>
                    </div>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-zinc-900 border-zinc-800">
                  <DropdownMenuItem onClick={logout} className="text-red-400 focus:text-red-400">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-3 px-3 py-2 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-sm transition-colors"
                data-testid="nav-login"
              >
                <User className="w-4 h-4" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="h-14 bg-[#121214] border-b border-zinc-800 flex items-center justify-between px-4 lg:px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 text-zinc-400 hover:text-white"
            data-testid="mobile-menu-toggle"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="hidden lg:flex items-center gap-2">
            <span className="text-xs font-mono text-zinc-500">SYSTEM STATUS:</span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-mono text-green-500">OPERATIONAL</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-zinc-500">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'short', 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
              }).toUpperCase()}
            </span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
