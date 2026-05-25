import { useEffect, useState, createContext, useContext } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import { Toaster } from "@/components/ui/sonner";

// Pages
import Layout from "@/components/Layout";
import Dashboard from "@/pages/Dashboard";
import Announcements from "@/pages/Announcements";
import MAActivity from "@/pages/MAActivity";
import MarketData from "@/pages/MarketData";
import Expenditures from "@/pages/Expenditures";
import Regulations from "@/pages/Regulations";
import Products from "@/pages/Products";
import Follow from "@/pages/Follow";
import Bookmarks from "@/pages/Bookmarks";
import Contracts from "@/pages/Contracts";
import Admin from "@/pages/Admin";
import Login from "@/pages/Login";
import PrivatePlayers from "@/pages/PrivatePlayers";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

// Global timeout: prevent requests from hanging indefinitely when backend is slow
axios.defaults.timeout = 20000;

// ── Language Context ──────────────────────────────────────────────────────────
export const LanguageContext = createContext({ lang: "en", setLang: () => {} });

export const useLang = () => useContext(LanguageContext);

/** Inline translation helper. Usage: useT({ en: "Hello" }) */
export const useT = (strings) => {
  const { lang } = useLang();
  return strings[lang] ?? strings.en;
};

// ── Auth Context ──────────────────────────────────────────────────────────────
export const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          const response = await axios.get(`${API}/auth/me`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUser(response.data);
        } catch (error) {
          localStorage.removeItem("token");
          setToken(null);
        }
      }
      setLoading(false);
    };
    initAuth();
  }, [token]);

  const login = async (email, password) => {
    const response = await axios.post(`${API}/auth/login`, { email, password });
    const { access_token, user } = response.data;
    localStorage.setItem("token", access_token);
    setToken(access_token);
    setUser(user);
    return user;
  };

  const register = async (email, password, name) => {
    const response = await axios.post(`${API}/auth/register`, { email, password, name });
    const { access_token, user } = response.data;
    localStorage.setItem("token", access_token);
    setToken(access_token);
    setUser(user);
    return user;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const updateAuth = (access_token, updatedUser) => {
    localStorage.setItem("token", access_token);
    setToken(access_token);
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading, updateAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

function App() {
  // Seed data is now admin-only — auto-seeding removed.
  // Use Admin Panel > "Seed Data" button to initialize the database.
  return (
    <LanguageContext.Provider value={{ lang: "en", setLang: () => {} }}>
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" richColors />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="announcements" element={<Announcements />} />
            <Route path="ma-activity" element={<MAActivity />} />
            <Route path="market-data" element={<MarketData />} />
            <Route path="expenditures" element={<Expenditures />} />
            <Route path="regulations" element={<Regulations />} />
            <Route path="products" element={<Products />} />
            <Route path="follow" element={<Follow />} />
            <Route path="bookmarks" element={<Bookmarks />} />
            <Route path="contracts" element={<Contracts />} />
            <Route path="private-players" element={<PrivatePlayers />} />
            <Route path="admin" element={<Admin />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </LanguageContext.Provider>
  );
}

export default App;
