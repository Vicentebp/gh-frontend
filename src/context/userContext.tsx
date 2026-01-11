import { useState, createContext, useEffect, useContext } from "react";

import { loginService, signInService } from "../services/auth";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState();

  const signIn = async (name: string, email: string, password: string) => {
    try {
      await signInService(name, email, password);
      alert("Usuario criado");
    } catch (error) {
      console.log(error.message);
      alert("Erro");
    }
  };

  const login = async (email: string, password: string) => {
    try {
      // await loginService(email, password);
      alert("Usuario logado");
    } catch (error) {
      console.log(error.message);
      alert("Erro");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        signIn,
        login,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
