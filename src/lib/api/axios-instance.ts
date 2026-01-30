import axios from 'axios'
import { useAuthStore } from '@/stores/auth-store'
import { ENDPOINTS, ROUTES } from '@/constants'
import { toast } from 'sonner'

export const apiClient = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      const isLoginRequest = error.config?.url?.includes(
        `/${ENDPOINTS.AUTH.LOGIN}`
      )
      if (!isLoginRequest) {
        useAuthStore.getState().logout()
        window.location.href = ROUTES.SIGN_IN
        toast.error(error.message)
      }
    }

    if (error.response?.status === 403) {
      toast.error(error.message)
    }

    if (error.response?.status >= 500) {
      toast.error(error.message)
    }

    return Promise.reject(error)
  }
)
