// src/axios.js o donde lo configures
import axios from 'axios';

const api = axios.create({
  // Usar URL relativa para aprovechar el proxy de Nginx
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;