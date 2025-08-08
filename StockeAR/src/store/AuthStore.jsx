import { create } from "zustand";
import apiClient from '../api/api';

export const useAuthStore = create((set, get) => ({
  user: null,
  error: null,

  setUser: (user) => set({ user }),

  signInWithEmail: async (p) => {
    set({ error: null });
    try {
      const formData = new URLSearchParams();
      formData.append('username', p.correo);
      formData.append('password', p.pass);

      const response = await apiClient.post('/auth/token', formData);
      
      const { user, access_token } = response.data;
      
      localStorage.setItem('authToken', access_token);
      set({ user: user });
      
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      set({ user: null, error: "Datos incorrectos. Inténtalo de nuevo." });
      localStorage.removeItem('authToken'); 
    }
  },

  signOut: () => {
    localStorage.removeItem('authToken');
    set({ user: null, error: null });
  },

  checkAuth: async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      get().signOut();
      return;
    }
    
    try {
      const response = await apiClient.get('/usuarios/me'); 
      set({ user: response.data });
    } catch (error) {
      console.error("Token inválido o expirado", error);
      get().signOut();
    }
  }
}));