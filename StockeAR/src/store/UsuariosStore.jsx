import { create } from "zustand";
import apiClient from '../api/api';

export const useUsuariosStore = create((set) => ({
  datausuarios: [],

  mostrarusuarios: async (p) => {
    try {
      const response = await apiClient.get(`/usuarios/empresa/${p.id_empresa}`);
      set({ datausuarios: response.data });
      return response.data;
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      return [];
    }
  },

  insertarusuarios: async (p) => {
    try {
     
      await apiClient.post('/usuarios/', p);
    } catch (error) {
      console.error("Error al insertar usuario:", error);
    }
  },
}));