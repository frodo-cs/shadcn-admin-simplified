import { ENDPOINTS } from '@/constants'
import { apiClient } from '../../axios-instance'
import type { IAuthAdapter } from './auth-base.adapter'
import type { AuthUser, Credentials } from '@/features/auth/schemas/auth'

interface LoginResponseV1DTO {
  accessToken: string
  user: {
    username: string
    email: string
    role: string[]
  }
}

export class AuthAdapterV1 implements IAuthAdapter {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  private transform(dto: LoginResponseV1DTO): AuthUser {
    return {
      username: dto.user.username,
      email: dto.user.email,
      role: dto.user.role,
    }
  }

  async login(credentials: Credentials): Promise<AuthUser> {
    const response = await apiClient.post<LoginResponseV1DTO>(
      `${this.baseUrl}/${ENDPOINTS.AUTH.LOGIN}`,
      {
        identifier: credentials.identifier,
        password: credentials.password,
      }
    )

    return this.transform(response.data)
  }
}
