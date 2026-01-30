import { ENDPOINTS } from '@/constants'
import { apiClient } from '../../axios-instance'
import type { User } from '@/features/settings/schemas/user'
import type { ISettingsAdapter } from './settings-base.adapter'

interface UserResponseMockDTO {
  id: string
  username: string
  email: string
  createdAt: string
  updatedAt: string
}

export class SettingsAdapterV1 implements ISettingsAdapter {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  private transform(dto: UserResponseMockDTO): User {
    return {
      id: dto.id,
      username: dto.username,
      email: dto.email,
      createdAt: new Date(dto.createdAt),
      updatedAt: new Date(dto.updatedAt),
    }
  }

  async getUser(): Promise<User> {
    const response = await apiClient.get(
      `${this.baseUrl}/${ENDPOINTS.SETTINGS.GET}`
    )
    return response.data.map(this.transform)
  }
}
