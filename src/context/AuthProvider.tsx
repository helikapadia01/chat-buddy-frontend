import React, {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useContext,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signUp, login } from "../services/authService";

interface AuthContextProps {
  isAuthenticated: boolean;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    console.log("AuthProvider mounted");
  }, []);

  const handleSignUp = async (
    name: string,
    email: string,
    password: string
  ) => {
    await signUp(name, email, password);
    setIsAuthenticated(true);
    await AsyncStorage.setItem("isAuthenticated", "true");
  };

  const handleLogin = async (email: string, password: string) => {
    await login(email, password);
    setIsAuthenticated(true);
    await AsyncStorage.setItem("isAuthenticated", "true");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    AsyncStorage.removeItem("isAuthenticated");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        signUp: handleSignUp,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  console.log("useAuth context:", context); // Debugging log
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
