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
import Admin from "@/pages/Admin";
import Login from "@/pages/Login";

const DEFAULT_BACKEND_URL = "https://weapontech-analytics.preview.emergentagent.com";

const resolveBackendUrl = () => {
  const candidates = [
    process.env.REACT_APP_BACKEND_URL,
    process.env.REACT_APP_API_URL,
    process.env.REACT_APP_BASE_API_URL,
    DEFAULT_BACKEND_URL,
  ];

  const chosen = candidates.find((candidate) => typeof candidate === "string" && candidate.trim().length > 0);
  return chosen.replace(/\/+$/, "");
};

export const API = `${resolveBackendUrl()}/api`;

// Auth Context
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

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

function App() {
  useEffect(() => {
    // Seed data on first load
    const seedData = async () => {
      try {
        await axios.post(`${API}/seed-data`);
      } catch (error) {
        console.log("Data already seeded or error:", error.message);
      }
    };
    seedData();
  }, []);

  return (
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
            <Route path="admin" element={<Admin />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
