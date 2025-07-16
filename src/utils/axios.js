// src/utils/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para añadir el token a todas las solicitudes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // O donde guardes tu token
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;  // Ajusta según el formato que espera tu API
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;