import { useQuery } from '@tanstack/react-query'
import { getUser } from '../api/get-user'

export const useSettings = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(),
  })
}
