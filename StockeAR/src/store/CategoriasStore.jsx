import { create } from "zustand";
import apiClient from '../api/api';

export const useCategoriasStore = create((set, get) => ({
  buscador: "",
  setBuscador: (p) => {
    set({ buscador: p });
  },
  datacategorias: [],
  categoriasItemSelect: [],
  parametros: {},
  selectcategorias: (p) => {
    set({ categoriasItemSelect: p });
  },


  mostrarcategorias: async (p) => {
    try {
      const response = await apiClient.get(`/categorias/empresa/${p.id_empresa}`);
      set({ parametros: p, datacategorias: response.data });
      if (response.data.length > 0) {
        set({ categoriasItemSelect: response.data[0] });
      }
      return response.data;
    } catch (error) {
      console.error("Error al obtener categorías:", error);
      return [];
    }
  },

  insertarcategorias: async (p) => {
    try {
      await apiClient.post('/categorias/', p); 
      const { mostrarcategorias, parametros } = get();
      await mostrarcategorias(parametros); 
    } catch (error) {
      console.error("Error al insertar categoría:", error);
    }
  },

  editarcategorias: async (p) => {
    try {
      const { id, ...dataToUpdate } = p;
      await apiClient.put(`/categorias/${id}`, dataToUpdate);
      const { mostrarcategorias, parametros } = get();
      await mostrarcategorias(parametros);
    } catch (error) {
      console.error("Error al editar categoría:", error);
    }
  },

  eliminarcategorias: async (p) => {
    try {
      await apiClient.delete(`/categorias/${p.id}`);
      const { mostrarcategorias, parametros } = get();
      await mostrarcategorias(parametros); 
    } catch (error) {
      console.error("Error al eliminar categoría:", error);
    }
  },

  buscarcategorias: async (p) => {
    try {
      const response = await apiClient.get(`/categorias/buscar/${p.id_empresa}`, {
        params: { descripcion: p.descripcion }
      });
      set({ datacategorias: response.data });
    } catch (error) {
      console.error("Error al buscar categorías:", error);
    }
  },
}));