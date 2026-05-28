import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export const api = axios.create({
  baseURL: API_URL,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
    return Promise.reject(error)
  }
)

export const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

export const detectAcne = (formData) => {
  return api.post('/api/detect', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

export const saveHistory = (data) => api.post('/api/history', data)
export const getHistory = () => api.get('/api/history')
export const deleteHistory = (id) => api.delete(`/api/history/${id}`)

export const getFavoriteProducts = () => api.get('/api/favorites')
export const saveFavoriteProduct = (product) => api.post('/api/favorites', { product })
export const deleteFavoriteProduct = (id) => api.delete(`/api/favorites/${id}`)

export const getProducts = (params = {}) => api.get('/api/products', { params })
export const getProductById = (id) => api.get(`/api/products/${id}`)
