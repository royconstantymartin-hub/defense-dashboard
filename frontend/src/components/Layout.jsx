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
  X,
  Rss,
  Bell
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
  { path: "/follow", icon: Rss, label: "Follow" },
];

export default function Layout() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-white border-r border-slate-200 shadow-sm
        transform transition-transform duration-200 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-5 border-b border-slate-100">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg shadow-purple-200">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-heading font-bold text-slate-900 tracking-tight">DEFENSE</h1>
                <p className="text-[10px] font-mono text-purple-600 tracking-widest">INTELLIGENCE HUB</p>
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
                    flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-all duration-200
                    ${isActive 
                      ? 'bg-purple-50 text-purple-700 font-medium border-l-2 border-purple-600 -ml-[2px]' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }
                  `}
                  data-testid={`nav-${item.path === '/' ? 'dashboard' : item.path.slice(1)}`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-purple-600' : ''}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            <div className="pt-4 border-t border-slate-100 mt-4">
              <Link
                to="/admin"
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-all duration-200
                  ${location.pathname === '/admin'
                    ? 'bg-purple-50 text-purple-700 font-medium border-l-2 border-purple-600 -ml-[2px]' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
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
          <div className="p-3 border-t border-slate-100">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-purple-700" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-slate-900 text-sm font-medium truncate">{user.name}</p>
                      <p className="text-xs text-slate-500 truncate">{user.email}</p>
                    </div>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-white border-slate-200">
                  <DropdownMenuItem onClick={logout} className="text-rose-600 focus:text-rose-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
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
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
              data-testid="mobile-menu-toggle"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="hidden lg:flex items-center gap-2">
              <span className="text-xs font-medium text-slate-500">SYSTEM STATUS:</span>
              <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-xs font-medium">OPERATIONAL</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-purple-600 rounded-full" />
            </button>
            <span className="text-sm font-medium text-slate-600">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'short', 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
              })}
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
