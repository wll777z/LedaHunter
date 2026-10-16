/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-key */
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  avatar_url?: string | null;
  created_at: string;
  plan: string;
  workspace_id?: string;
}

interface AuthContextValue {
  me: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (email: string, password: string, name: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [me, setMe] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    refresh();
  }, []);

  async function refresh() {
    setLoading(true);
    try {
      const res = await fetch("/api/me");
      if (res.status === 401) {
        setMe(null);
      } else {
        const data = await res.json();
        setMe(data.user ?? null);
      }
    } catch {
      setMe(null);
    } finally {
      setLoading(false);
    }
  }

  async function signIn(email: string, password: string) {
    const res = await fetch("/api/auth/sign-in", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error ?? "Falha no login");
    }
    const data = await res.json();
    setMe(data.user ?? null);
  }

  async function signUp(email: string, password: string, name: string) {
    const res = await fetch("/api/auth/sign-up", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error ?? "Falha no cadastro");
    }
    const data = await res.json();
    setMe(data.user ?? null);
  }

  async function signOut() {
    await fetch("/api/auth/sign-out", { method: "POST" });
    setMe(null);
  }

  return (
    <AuthContext.Provider value={{ me, loading, signIn, signUp, signOut, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}

export function Protected({ children }: { children: React.ReactNode }) {
  const { me, loading } = useAuth();
  if (loading) {
    return null;
  }
  if (!me) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}
