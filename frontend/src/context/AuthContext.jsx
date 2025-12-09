import { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("app_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem("app_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("app_user");
    }
  }, [user]);

  const login = async (credentials) => {
    try {
      setIsLoading(true);
      const response = await authAPI.login(credentials);
      
      const userData = {
        id: response.data.id,
        nome: response.data.name,
        email: credentials.email,
        token: response.data.token,
        role: response.data.role || "USER",
      };

      setUser(userData);
      localStorage.setItem("app_user", JSON.stringify(userData));
      return { success: true };
    } catch (error) {
      console.error('Erro no login:', error);
      const message = error.response?.data?.message || 
                     error.response?.data?.error || 
                     "Falha ao fazer login.";
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setIsLoading(true);
      await authAPI.register(userData);
      
      // fazer login automaticamente
      const loginResult = await login({
        email: userData.email,
        senha: userData.senha
      });
      
      return loginResult;
    } catch (error) {
      console.error('Erro no registro:', error);
      const message = error.response?.data?.message || 
                     error.response?.data?.error || 
                     "Falha ao criar conta.";
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("app_user");
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    isAdmin: user?.role === "ADMIN",
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
