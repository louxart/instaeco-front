// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/apiClient";

// contexto
const AuthContext = createContext(null);

// provider
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    const fetchMe = async () => {
      try {
        const res = await api.get("/auth/me");
        if (!cancelled) {
          setUser(res.data);
        }
      } catch (e) {
        if (!cancelled) {
          console.error("Error en /auth/me:", e);
          localStorage.removeItem("token");
          setUser(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchMe();

    return () => {
      cancelled = true;
    };
  }, []);

  const login = (token, usuario) => {
    localStorage.setItem("token", token);
    setUser(usuario);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// hook
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth debe usarse dentro de un <AuthProvider>");
  }
  return ctx;
}
