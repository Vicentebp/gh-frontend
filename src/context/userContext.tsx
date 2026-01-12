import { useState, createContext, useEffect, useContext, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router";
import { loginService, signInService } from "../services/auth";
import { jwtDecode } from "jwt-decode";
import type { User } from "../types";
import Cookies from "js-cookie";
export interface AuthContextType {
  user: User | undefined;
  signIn: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logOut: () => string;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const location = useLocation();
  useEffect(() => {
    if (!user && token) {
      const userData = jwtDecode(token) as User;
      setUser(userData);
      navigate("/tasks");
    }
  }, []);

  useEffect(() => {
    if (!user && !location.pathname.startsWith("/login") && !token) {
      navigate("/login");
    }
  }, [location]);

  const signIn = async (name: string, email: string, password: string) => {
    try {
      await signInService(name, email, password);
      alert("Usuario criado");
    } catch (error) {
      alert(error.response.data);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const token = await loginService(email, password);
      Cookies.set("token", token);
      const userData = jwtDecode(token) as User;
      setUser(userData);
      navigate("/tasks");
    } catch (error) {
      alert(error.response.data);
    }
  };
  const logOut = () => {
    Cookies.remove("token");
    alert("Usuario deslogado");
    navigate("/login");
    return "Usuario deslogado";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        login,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
