import { useMutation } from '@tanstack/react-query'
import { useAuthStore } from '@/stores/auth-store'
import { login } from '../api/login'
import { toast } from 'sonner'
import { type Credentials } from '../schemas/auth'

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
