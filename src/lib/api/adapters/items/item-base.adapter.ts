import { Item } from '@/features/items/data/schema'

export interface IItemAdapter {
  getAll(): Promise<Item[]>
}
