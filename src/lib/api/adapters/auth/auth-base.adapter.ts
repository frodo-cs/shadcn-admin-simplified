import type { AuthUser, Credentials } from '@/features/auth/schemas/auth'

export interface IAuthAdapter {
  login(credentials: Credentials): Promise<AuthUser>
}
