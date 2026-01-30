import { useMutation } from '@tanstack/react-query'
import { useAuthStore } from '@/stores/auth-store'
import { login } from '../api/login'
import type { Credentials } from '@/lib/api/adapters/auth/auth-base.adapter'
import { toast } from 'sonner'

export const useLogin = () => {
  const { setAuth } = useAuthStore()

  return useMutation({
    mutationFn: (credentials: Credentials) => login(credentials),
    onSuccess: (user) => {
      setAuth(user, 'token')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}
