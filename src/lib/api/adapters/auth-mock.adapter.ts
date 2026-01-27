import { apiClient } from '../axios-instance'
import type { IAuthAdapter, Credentials, AuthUser } from './base-auth.adapter'

interface LoginResponseMockDTO {
  accessToken: string
  user: {
    username: string
    email: string
    role: string[]
  }
}

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

export class AuthAdapterMock implements IAuthAdapter {
  private transform(dto: LoginResponseMockDTO): AuthUser {
    return {
      username: dto.user.username,
      email: dto.user.email,
      role: dto.user.role,
    }
  }

  async login(credentials: Credentials): Promise<AuthUser> {
    const response = await apiClient.post<LoginResponseMockDTO>(
      `${API_BASE_URL}/auth/login`,
      {
        identifier: credentials.identifier,
        password: credentials.password,
      }
    )

    return this.transform(response.data)
  }

  async logout(): Promise<{ success: boolean }> {
    await apiClient.post(`${API_BASE_URL}/auth/logout`)
    return { success: true }
  }
}
