import { authAdapter } from '@/lib/api/config'
import type { AuthUser, Credentials } from '../schemas/auth'

export const login = async (credentials: Credentials): Promise<AuthUser> => {
  const user = await authAdapter.login(credentials)
  return user
}
