// store/CategoriasStore.jsx
import { create } from "zustand";
import apiClient from '../api/api'; // 1. Importamos el cliente de API centralizado

export const useCategoriasStore = create((set, get) => ({
  // --- Estados del Store (sin cambios) ---
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

  // --- Funciones de API (reescritas) ---

  // 2. Obtener todas las categorías de una empresa
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

  // 3. Insertar una nueva categoría
  insertarcategorias: async (p) => {
    try {
      await apiClient.post('/categorias/', p); // p es { descripcion: "...", empresa_id: ... }
      const { mostrarcategorias, parametros } = get();
      await mostrarcategorias(parametros); // Refresca la lista
    } catch (error) {
      console.error("Error al insertar categoría:", error);
    }
  },

  // 4. Editar una categoría existente
  editarcategorias: async (p) => {
    try {
      // Separamos el id de los datos a actualizar
      const { id, ...dataToUpdate } = p;
      await apiClient.put(`/categorias/${id}`, dataToUpdate);
      const { mostrarcategorias, parametros } = get();
      await mostrarcategorias(parametros); // Refresca la lista
    } catch (error) {
      console.error("Error al editar categoría:", error);
    }
  },

  // 5. Eliminar una categoría
  eliminarcategorias: async (p) => {
    try {
      await apiClient.delete(`/categorias/${p.id}`);
      const { mostrarcategorias, parametros } = get();
      await mostrarcategorias(parametros); // Refresca la lista
    } catch (error) {
      console.error("Error al eliminar categoría:", error);
    }
  },

  // 6. Buscar categorías por descripción
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