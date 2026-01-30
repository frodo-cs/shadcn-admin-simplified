import { itemsAdapter } from '@/lib/api/config'
import type { Item } from '../schemas/item'

export const createItem = async (
  item: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Item> => {
  return await itemsAdapter.create(item)
}
