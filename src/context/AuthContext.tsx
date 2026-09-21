import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type UserRole = "admin" | "customer";

export type AuthUser = {
  email: string;
  name: string;
  role: UserRole;
};

type AuthContextValue = {
  user: AuthUser | null;
  signIn: (email: string, password: string, role: UserRole) => Promise<void>;
  signOut: () => void;
};

const AUTH_KEY = "apexstore-auth";
const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const saved = localStorage.getItem(AUTH_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    else localStorage.removeItem(AUTH_KEY);
  }, [user]);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    async signIn(email, password, role) {
      const cleanEmail = email.trim().toLowerCase();
      if (!cleanEmail || !password.trim()) throw new Error("Enter your email and password.");
      if (password.trim().length < 6) throw new Error("Password must contain at least 6 characters.");

      const name = cleanEmail.split("@")[0]
        .replace(/[._-]+/g, " ")
        .replace(/\b\w/g, (letter) => letter.toUpperCase());

      setUser({ email: cleanEmail, name, role });
    },
    signOut() {
      setUser(null);
    },
  }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
