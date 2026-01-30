import { ENDPOINTS } from '@/constants'
import { apiClient } from '../../axios-instance'
import { AuthUser, Credentials, IAuthAdapter } from './auth-base.adapter'

interface LoginResponseMockDTO {
  accessToken: string
  user: {
    username: string
    email: string
    role: string[]
  }
}

export class AuthAdapterMock implements IAuthAdapter {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  private transform(dto: LoginResponseMockDTO): AuthUser {
    return {
      username: dto.user.username,
      email: dto.user.email,
      role: dto.user.role,
    }
  }

  async login(credentials: Credentials): Promise<AuthUser> {
    const response = await apiClient.post<LoginResponseMockDTO>(
      `${this.baseUrl}/${ENDPOINTS.AUTH.LOGIN}`,
      {
        identifier: credentials.identifier,
        password: credentials.password,
      }
    )

    return this.transform(response.data)
  }
}
