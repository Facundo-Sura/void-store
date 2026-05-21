"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import type { User, LoginCredentials } from "@/lib/types";
import { authApi } from "@/lib/api/auth";
import { usersApi } from "@/lib/api/users";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface AuthContextValue extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: {
    email: string;
    name: string;
    password: string;
    avatar: string;
  }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("void-auth-token");
}

function setStoredToken(token: string | null) {
  if (typeof window === "undefined") return;
  if (token) {
    localStorage.setItem("void-auth-token", token);
  } else {
    localStorage.removeItem("void-auth-token");
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });
  const router = useRouter();

  // Check for existing session on mount
  useEffect(() => {
    const token = getStoredToken();
    if (!token) {
      setState({ user: null, isLoading: false, isAuthenticated: false });
      return;
    }

    authApi
      .getProfile()
      .then((user) => {
        setState({ user, isLoading: false, isAuthenticated: true });
      })
      .catch(() => {
        setStoredToken(null);
        setState({ user: null, isLoading: false, isAuthenticated: false });
      });
  }, []);

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      const response = await authApi.login(credentials);
      setStoredToken(response.access_token);
      setState({
        user: response.user,
        isLoading: false,
        isAuthenticated: true,
      });
      router.push("/");
    },
    [router],
  );

  const register = useCallback(
    async (data: {
      email: string;
      name: string;
      password: string;
      avatar: string;
    }) => {
      await usersApi.create({
        ...data,
        role: "customer",
      });
      // Auto-login after registration
      await login({ email: data.email, password: data.password });
    },
    [login],
  );

  const logout = useCallback(() => {
    setStoredToken(null);
    setState({ user: null, isLoading: false, isAuthenticated: false });
    router.push("/");
  }, [router]);

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
