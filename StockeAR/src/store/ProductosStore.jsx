import { create } from "zustand";
import apiClient from '../api/api';

export const useProductosStore = create((set, get) => ({
  productos: [],
  parametros: {},
  buscador: "",
  setBuscador: (p) => set({ buscador: p }),

  mostrarProductos: async (p) => {
    try {
      const response = await apiClient.get(`/productos/empresa/${p.id_empresa}`);
      set({ productos: response.data, parametros: p });
      return response.data;
    } catch (error) {
      console.error("Error al obtener productos:", error);
      throw error;
    }
  },

  crearProducto: async (p) => {
    try {
      await apiClient.post('/productos/', p);
      const { mostrarProductos, parametros } = get();
      if (parametros?.id_empresa) {
        await mostrarProductos({ id_empresa: parametros.id_empresa });
      }
    } catch (error) {
      console.error("Error al crear el producto:", error);
    }
  },

  editarProducto: async (p) => {
    try {
      const { id, ...dataToUpdate } = p;
      await apiClient.put(`/productos/${id}`, dataToUpdate);
      const { mostrarProductos, parametros } = get();
      if (parametros?.id_empresa) {
        await mostrarProductos({ id_empresa: parametros.id_empresa });
      }
    } catch (error) {
      console.error("Error al editar el producto:", error);
    }
  },
  
  eliminarProducto: async (p) => {
    try {
      await apiClient.delete(`/productos/${p.id}`);
      const { mostrarProductos, parametros } = get();
      if (parametros?.id_empresa) {
        await mostrarProductos({ id_empresa: parametros.id_empresa });
      }
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  },
}));