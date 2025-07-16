import axios from 'axios'
import { useAuthStore } from '../store/auth'

// Detectar si estamos en producción
const isProd = import.meta.env.PROD

const api = axios.create({
  baseURL: isProd
    ? 'http://ec2-3-140-254-107.us-east-2.compute.amazonaws.com/api' // API real en producción
    : '/api', // Esto sigue funcionando en desarrollo por el proxy
})

api.interceptors.request.use((config) => {
  const token = useAuthStore().token
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default api
