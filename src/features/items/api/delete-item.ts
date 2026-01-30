import { itemsAdapter } from '@/lib/api/config'

export const deleteItem = async (id: string): Promise<void> => {
  await itemsAdapter.delete(id)
}
