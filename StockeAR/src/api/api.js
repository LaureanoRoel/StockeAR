// src/api/api.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000', // La URL base de tu backend FastAPI
});

// Este interceptor es la clave: se ejecutará antes de cada petición.
// Su trabajo es tomar el token del localStorage y añadirlo a los encabezados.
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;