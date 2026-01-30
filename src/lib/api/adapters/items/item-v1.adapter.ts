import { ENDPOINTS } from '@/constants'
import { apiClient } from '../../axios-instance'
import type { Item, ItemStatus, ItemType } from '@/features/items/schemas/item'
import type { IItemAdapter } from './item-base.adapter'

interface ItemResponseMockDTO {
  id: string
  name: string
  price: number
  description: string
  status: string
  type: string
  createdAt: string
  updatedAt: string
}

export class ItemAdapterV1 implements IItemAdapter {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  private transform(dto: ItemResponseMockDTO): Item {
    return {
      id: dto.id,
      name: dto.name,
      price: dto.price,
      description: dto.description,
      status: dto.status as ItemStatus,
      type: dto.type as ItemType,
      createdAt: new Date(dto.createdAt),
      updatedAt: new Date(dto.updatedAt),
    }
  }

  async getAll(): Promise<Item[]> {
    const response = await apiClient.get(
      `${this.baseUrl}/${ENDPOINTS.ITEMS.GET}`
    )
    return response.data.map((item: ItemResponseMockDTO) =>
      this.transform(item)
    )
  }

  async create(
    item: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Item> {
    const response = await apiClient.post(
      `${this.baseUrl}/${ENDPOINTS.ITEMS.GET}`,
      item
    )
    return this.transform(response.data)
  }

  async update(id: string, item: Partial<Item>): Promise<Item> {
    const response = await apiClient.put(
      `${this.baseUrl}/${ENDPOINTS.ITEMS.GET}/${id}`,
      item
    )
    return this.transform(response.data)
  }

  async delete(id: string): Promise<void> {
    await apiClient.delete(`${this.baseUrl}/${ENDPOINTS.ITEMS.GET}/${id}`)
  }
}
