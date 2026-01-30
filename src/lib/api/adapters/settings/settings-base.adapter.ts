import { type User } from '@/features/settings/schemas/user'

export interface ISettingsAdapter {
  getUser(): Promise<User>
}
