import { itemsAdapter } from '@/lib/api/config'
import type { Item } from '../data/schema'

export const getItems = async (): Promise<Item[]> => {
  const items = await itemsAdapter.getAll()
  return items
}
