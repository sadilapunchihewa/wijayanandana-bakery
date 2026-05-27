import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const apiClient = axios.create({
  baseURL,
  timeout: 10000,
})

apiClient.interceptors.request.use(
  (config) => {
    const stored = window.localStorage.getItem('wijaya_auth')
    if (stored) {
      try {
        const { token } = JSON.parse(stored)
        if (token) {
          // eslint-disable-next-line no-param-reassign
          config.headers.Authorization = `Bearer ${token}`
        }
      } catch {
        // ignore
      }
    }
    return config
  },
  (error) => Promise.reject(error),
)

