import { settingsAdapter } from '@/lib/api/config'
import type { User } from '../schemas/user'

export const getUser = async (): Promise<User> => {
  const items = await settingsAdapter.getUser()
  return items
}
