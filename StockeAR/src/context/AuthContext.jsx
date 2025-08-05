// context/AuthContext.jsx
import { createContext, useContext, useEffect } from "react";
import { useAuthStore } from "../store/AuthStore"; // 1. Importamos nuestro store de Zustand

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  // 2. Obtenemos el estado y las funciones que necesitamos del store
  const { user, checkAuth, signOut } = useAuthStore();
  
  // 3. Al cargar la app, llamamos a checkAuth para ver si hay un token válido
  useEffect(() => {
    checkAuth();
  }, []); // El array vacío asegura que se ejecute solo una vez

  // 4. Pasamos el usuario y la función signOut del store al contexto
  return (
    <AuthContext.Provider value={{ user, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Este hook no cambia
export const UserAuth = () => {
  return useContext(AuthContext);
};