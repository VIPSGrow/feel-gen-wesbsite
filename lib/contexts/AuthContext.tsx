"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import api from "@/lib/api";
import type { User } from "@/lib/types/User";
import serverCallFuction from "../constantFunction";
import { ContactData } from "../types/Setting";

interface AuthContextType {
  user: User | null;
  setting: [] | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    phone: string;
    name: string;
    email: string;
    password: string;
    distributor_code?: number | null;
  }) => Promise<void>;
  logout: () => void;
  fetchUser: () => Promise<void>;
  getSettingByKey: (key: string) => ContactData | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [setting, setSetting] = useState(null);
  const fetchSetting = async () => {
    try {
      const res = await serverCallFuction("GET", "api/settings");
      console.log("data called- ", res);


      if (res.success) {
        setSetting(res?.data);
      } else {
        // setUser(null);
        // setIsAuthenticated(false);
        // Cookies.remove("token");
      }
    } catch (err) {
      console.log("error - ", err);
      setSetting(null);
    } finally {
    }
  };


  const getSettingByKey = (key: string): ContactData | null => {
    if (!setting || !Array.isArray(setting)) return null;

    const e_setting = setting.find((item) => item.setting_key === key);

    // Return just the value for easier use, or the whole object if preferred
    return e_setting ? e_setting.setting_value : null;
  };

  const fetchUser = async () => {
    try {
      const res = await serverCallFuction("GET", "api/ecom/auth/me");
      console.log("fetchUser response:", res);
      if (res.status) {
        Cookies.set("user", JSON.stringify(res.user), { expires: 1 });
        setUser(res?.user);
        setIsAuthenticated(true);
      } else {
        // setUser(null);
        // setIsAuthenticated(false);
        // Cookies.remove("token");
      }
    } catch (err) {
      console.error("fetchUser error:", err);
      setUser(null);
      setIsAuthenticated(false);
      Cookies.remove("token");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = Cookies.get("token");
    fetchSetting();
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await api.post("/ecom/auth/login", { email, password });
      if (res.data.token) {
        Cookies.set("token", res.data.token, { expires: 1 });
        await fetchUser();
        router.push("/");
        router.refresh();
      }
    } catch (err: unknown) {
      const apiErr = err as { response?: { data?: { message?: string } } };
      throw new Error(apiErr.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: {
    phone: string;
    name: string;
    email: string;
    password: string;
    distributor_code?: number | null;
  }) => {
    setLoading(true);
    try {
      const res = await api.post("/ecom/auth/register", data);
      if (res.data.status) {
        router.push("/login");
      }
    } catch (err: unknown) {
      const apiErr = err as { response?: { data?: { message?: string } } };
      throw new Error(apiErr.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    setIsAuthenticated(false);
    router.push("/");
    router.refresh();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setting,
        isAuthenticated,
        loading,
        login,
        register,
        logout,
        fetchUser,
        getSettingByKey,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
