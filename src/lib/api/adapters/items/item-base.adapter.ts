import type { Item } from '@/features/items/schemas/item'

export interface IItemAdapter {
  getAll(): Promise<Item[]>
}
