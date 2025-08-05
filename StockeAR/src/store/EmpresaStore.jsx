// store/EmpresaStore.jsx
import { create } from "zustand";
import apiClient from '../api/api';

export const useEmpresaStore = create((set) => ({
  listaempresas: [],

  mostrarempresas: async () => {
    try {
      const response = await apiClient.get('/empresas/');
      set({ listaempresas: response.data });
      return response.data;
    } catch (error) {
      console.error("Error al obtener empresas:", error);
      return [];
    }
  },

  // --- AÑADIDO: Función para contar usuarios activada ---
  contarusuariosXempresa: async (p) => {
    try {
      const response = await apiClient.get(`/empresas/${p.id_empresa}/contar_usuarios`);
      return response.data;
    } catch (error) {
      console.error("Error al contar usuarios por empresa", error);
    }
  }
}));