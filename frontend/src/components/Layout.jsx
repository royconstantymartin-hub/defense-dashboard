import { Outlet, Link, useLocation } from "react-router-dom";
import { useAuth, API } from "@/App";
import axios from "axios";
import {
  Activity,
  Globe,
  Package,
  Handshake,
  TrendingUp,
  Settings,
  LogOut,
  User,
  Menu,
  X,
  Rss,
  Bell,
  Lock,
  Radar,
  BookOpen,
  GraduationCap,
  Home
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { path: "/home", icon: Home, label: "Home" },
  { path: "/", icon: TrendingUp, label: "Market Activity" },
  { path: "/announcements", icon: Activity, label: "Announcements" },
  { path: "/ma-activity", icon: Handshake, label: "M&A Activity", inProgress: true },
  { path: "/private-players", icon: Lock, label: "Defense Players" },
  { path: "/expenditures", icon: Globe, label: "Countries" },
  { path: "/products", icon: Package, label: "Products" },
  { path: "/follow", icon: Rss, label: "Sources" },
  { path: "/lexicon", icon: BookOpen, label: "Lexicon" },
  { path: "/quiz", icon: GraduationCap, label: "Quiz" },
  { path: "/world-monitor", icon: Radar, label: "World Monitor" },
];

export default function Layout() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [systemStatus, setSystemStatus] = useState("checking");

  useEffect(() => {
    const check = () => {
      axios.get(`${API}/`, { timeout: 5000 })
        .then(() => setSystemStatus("ok"))
        .catch(() => setSystemStatus("degraded"));
    };
    check();
    const id = setInterval(check, 60000);
    return () => clearInterval(id);
  }, []);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notifLoading, setNotifLoading] = useState(false);
  const [hasNew, setHasNew] = useState(true);
  const notifRef = useRef(null);

  useEffect(() => {
    if (!notifOpen) return;
    setNotifLoading(true);
    axios.get(`${API}/announcements?limit=5`)
      .then(res => setNotifications((res.data || []).slice(0, 5)))
      .catch(() => setNotifications([]))
      .finally(() => setNotifLoading(false));
    setHasNew(false);
  }, [notifOpen]);

  useEffect(() => {
    if (!notifOpen) return;
    const handle = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [notifOpen]);

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
              <img src="/favicon.png" alt="Defense Dashboard" className="w-10 h-10 object-contain" />
              <div>
                <h1 className="font-heading font-bold text-slate-900 tracking-tight">DEFENSE</h1>
                <p className="text-[10px] font-mono text-blue-400 tracking-widest">INTELLIGENCE HUB</p>
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
                      ? 'bg-blue-50 text-blue-900 font-semibold border-l-2 border-blue-800 -ml-[2px]'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }
                  `}
                  data-testid={`nav-${item.path === '/' ? 'dashboard' : item.path.slice(1)}`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-800' : ''}`} />
                  <span className="flex-1">{item.label}</span>
                  {item.inProgress && (
                    <span className="text-[9px] font-mono font-semibold tracking-wider bg-amber-100 text-amber-700 border border-amber-300 rounded px-1 py-0.5 leading-none">
                      WIP
                    </span>
                  )}
                </Link>
              );
            })}

            {user && (
              <div className="pt-4 border-t border-slate-100 mt-4">
                <Link
                  to="/admin"
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-all duration-200
                    ${location.pathname === '/admin'
                      ? 'bg-blue-50 text-blue-900 font-semibold border-l-2 border-blue-800 -ml-[2px]'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }
                  `}
                  data-testid="nav-admin"
                >
                  <Settings className="w-4 h-4" />
                  <span>Admin Panel</span>
                </Link>
              </div>
            )}
          </nav>

          {/* User Section */}
          <div className="p-3 border-t border-slate-100">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors">
                    <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-slate-700" />
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
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
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
              {systemStatus === "ok" && (
                <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-xs font-medium">OPERATIONAL</span>
                </span>
              )}
              {systemStatus === "degraded" && (
                <span className="flex items-center gap-1.5 bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
                  <span className="text-xs font-medium">DEGRADED</span>
                </span>
              )}
              {systemStatus === "checking" && (
                <span className="flex items-center gap-1.5 bg-slate-100 text-slate-500 px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-pulse" />
                  <span className="text-xs font-medium">CHECKING</span>
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setNotifOpen(o => !o)}
                className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors relative"
              >
                <Bell className="w-5 h-5" />
                {hasNew && <span className="absolute top-1 right-1 w-2 h-2 bg-blue-700 rounded-full" />}
              </button>

              {notifOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-lg z-50">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
                    <span className="text-sm font-semibold text-slate-900">Recent Announcements</span>
                    <Link
                      to="/announcements"
                      onClick={() => setNotifOpen(false)}
                      className="text-xs text-blue-700 hover:text-blue-900 font-medium"
                    >
                      View all →
                    </Link>
                  </div>

                  <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                    {notifLoading && (
                      <p className="text-xs text-slate-400 text-center py-6">Loading…</p>
                    )}
                    {!notifLoading && notifications.length === 0 && (
                      <p className="text-xs text-slate-400 text-center py-6">No announcements yet.</p>
                    )}
                    {!notifLoading && notifications.map((n, i) => (
                      <Link
                        key={i}
                        to="/announcements"
                        onClick={() => setNotifOpen(false)}
                        className="block px-4 py-3 hover:bg-slate-50 transition-colors"
                      >
                        <p className="text-xs font-medium text-slate-800 line-clamp-2 leading-snug">{n.title}</p>
                        <p className="text-xs text-slate-400 mt-1">{n.source || n.company || "—"}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <span className="hidden sm:flex items-center bg-slate-100 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-600">
              {new Date().toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
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
