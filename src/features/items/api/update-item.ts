import { itemsAdapter } from '@/lib/api/config'
import type { Item } from '../schemas/item'

export const updateItem = async (
  id: string,
  item: Partial<Item>
): Promise<Item> => {
  return await itemsAdapter.update(id, item)
}
