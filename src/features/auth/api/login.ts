import { authAdapter } from '@/lib/api/config'
import type {
  Credentials,
  AuthUser,
} from '@/lib/api/adapters/base-auth.adapter'

export const login = async (credentials: Credentials): Promise<AuthUser> => {
  const user = await authAdapter.login(credentials)
  return user
}

