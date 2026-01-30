import type { Item } from '@/features/items/schemas/item'

export interface IItemAdapter {
  getAll(): Promise<Item[]>
  create(item: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>): Promise<Item>
  update(id: string, item: Partial<Item>): Promise<Item>
  delete(id: string): Promise<void>
}
