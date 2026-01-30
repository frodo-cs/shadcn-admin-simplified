import { useQuery } from '@tanstack/react-query'
import { useAuthStore } from '@/stores/auth-store'
import { getUser } from '../api/get-user'
import type { User } from '../schemas/user'

export const useSettings = () => {
  const storedUser = useAuthStore((state) => state.user)

  return useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(),
    enabled: !storedUser,
    initialData: storedUser
      ? ({
          ...storedUser,
          id: 'stored-user',
          createdAt: new Date(),
          updatedAt: new Date(),
        } as User)
      : undefined,
    staleTime: 1000 * 60 * 60,
  })
}
