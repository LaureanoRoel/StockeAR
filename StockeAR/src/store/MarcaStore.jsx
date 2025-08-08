import { create } from "zustand";
import apiClient from '../api/api';

export const useMarcaStore = create((set, get) => ({
  datamarcas: [],
  parametros: {},
  buscador: "",
  setBuscador: (p) => set({ buscador: p }),

  mostrarmarcas: async (p) => {
    try {
      const response = await apiClient.get(`/marcas/empresa/${p.id_empresa}`);
      set({ parametros: p, datamarcas: response.data });
      return response.data;
    } catch (error) {
      console.error("Error al obtener marcas:", error);
      throw error; // Lanza el error para que useQuery lo capture
    }
  },

  insertarmarca: async (p) => {
    try {
      await apiClient.post('/marcas/', p);
      const { mostrarmarcas, parametros } = get();
      await mostrarmarcas(parametros);
    } catch (error) {
      console.error("Error al insertar marca:", error);
    }
  },

  editarmarca: async (p) => {
    try {
      const { id, ...dataToUpdate } = p;
      await apiClient.put(`/marcas/${id}`, dataToUpdate);
      const { mostrarmarcas, parametros } = get();
      await mostrarmarcas(parametros);
    } catch (error) {
      console.error("Error al editar marca:", error);
    }
  },

  eliminarmarca: async (p) => {
    try {
      await apiClient.delete(`/marcas/${p.id}`);
      const { mostrarmarcas, parametros } = get();
      await mostrarmarcas(parametros);
    } catch (error) {
      console.error("Error al eliminar marca:", error);
    }
  },
  
  buscarMarca: async (p) => {
    try {
      const response = await apiClient.get(`/marcas/buscar/${p.id_empresa}`, {
        params: { descripcion: p.descripcion },
      });
      set({ datamarcas: response.data });
    } catch (error) {
      console.error("Error al buscar marcas", error);
    }
  },
}));