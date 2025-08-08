import { createContext, useContext, useEffect } from "react";
import { useAuthStore } from "../store/AuthStore"; 

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

  const { user, checkAuth, signOut } = useAuthStore();
  
  useEffect(() => {
    checkAuth();
  }, []); 

  return (
    <AuthContext.Provider value={{ user, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};


export const UserAuth = () => {
  return useContext(AuthContext);
};