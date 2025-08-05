// store/UsuariosStore.jsx
import { create } from "zustand";
import apiClient from '../api/api';

export const useUsuariosStore = create((set) => ({
  datausuarios: [],

  // Obtener todos los usuarios (requeriría un nuevo endpoint en el backend)
  mostrarusuarios: async (p) => {
    try {
      // Ejemplo: un endpoint que trae todos los usuarios de una empresa
      const response = await apiClient.get(`/usuarios/empresa/${p.id_empresa}`);
      set({ datausuarios: response.data });
      return response.data;
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      return [];
    }
  },

  // La inserción de usuarios ahora se hace desde el endpoint de registro público,
  // pero podrías tener una función para que un admin cree usuarios.
  insertarusuarios: async (p) => {
    try {
      // Llama al endpoint de registro que ya creamos
      await apiClient.post('/usuarios/', p);
      // Aquí podrías querer refrescar la lista de usuarios si la estás mostrando
    } catch (error) {
      console.error("Error al insertar usuario:", error);
    }
  },
}));