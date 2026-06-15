import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Role = "admin" | "user";

type User = {
  role: Role;
  name: string;
  email: string;
};

interface AuthContextType {
  user: User | null;
  login: (role: Role, email: string, name?: string) => void;
  register: (name: string, email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const STORAGE_KEY = "cityos-auth";

function readStoredUser(): User | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

function writeStoredUser(user: User | null) {
  if (typeof window === "undefined") return;
  if (user) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  } else {
    window.localStorage.removeItem(STORAGE_KEY);
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => readStoredUser());

  useEffect(() => {
    writeStoredUser(user);
  }, [user]);

  const value = useMemo(
    () => ({
      user,
      login(role: Role, email: string, name = "") {
        setUser({ role, email, name });
      },
      register(name: string, email: string) {
        setUser({ role: "user", email, name });
      },
      logout() {
        setUser(null);
      },
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
