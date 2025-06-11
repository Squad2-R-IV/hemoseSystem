import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthState {
  token: string | null;
  userId: string | null;
  roles: string[];
}

interface AuthContextProps extends AuthState {
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

function decodeToken(token: string): { userId: string | null; roles: string[] } {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return {
      userId: payload.id ?? null,
      roles: Array.isArray(payload.roles) ? payload.roles : [],
    };
  } catch {
    return { userId: null, roles: [] };
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({ token: null, userId: null, roles: [] });

  useEffect(() => {
    const stored = localStorage.getItem("token");
    if (stored) {
      const { userId, roles } = decodeToken(stored);
      setState({ token: stored, userId, roles });
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    const { userId, roles } = decodeToken(token);
    setState({ token, userId, roles });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setState({ token: null, userId: null, roles: [] });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
