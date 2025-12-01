import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("turismap_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem("turismap_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("turismap_user");
    }
  }, [user]);

  const login = async (credentials) => {
    try {
      // Fazer requisição para o backend depois

      // Mock de usuário
      const mockUser = {
        id: 1,
        nome: credentials.email.split("@")[0],
        email: credentials.email,
        role: "USER",
      };

      setUser(mockUser);
      localStorage.setItem("turismap_user", JSON.stringify(mockUser));
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false, error: "Falha ao fazer login" };
    }
  };

  const register = async (userData) => {
    try {
      // Fazer requisição para o backend

      // Mock de criarção de conta
      const mockUser = {
        id: Date.now(),
        nome: userData.nome,
        email: userData.email,
        role: "USER",
      };

      setUser(mockUser);
      localStorage.setItem("turismap_user", JSON.stringify(mockUser));
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false, error: "Falha ao criar conta" };
    }
  };

  const logout = () => {
    setUser(null);
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
