import type { IAuthAdapter } from './adapters/auth/auth-base.adapter'
import type { IItemAdapter } from './adapters/items/item-base.adapter'

// MOCK
import { AuthAdapterMock } from './adapters/auth/auth-mock.adapter'
import { ItemAdapterMock } from './adapters/items/item-mock.adapter'

// V1
import { AuthAdapterV1 } from './adapters/auth/auth-v1.adapter'
import { ItemAdapterV1 } from './adapters/items/item-v1.adapter'

const IS_MOCK = import.meta.env.VITE_ENVIRONMENT === 'mock'
const API_BASE_URL = IS_MOCK
  ? ''
  : import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1'

const ADAPTERS = {
  v1: {
    auth: AuthAdapterV1,
    items: ItemAdapterV1,
  },
  mock: {
    auth: AuthAdapterMock,
    items: ItemAdapterMock,
  },
}

export type AdapterVersion = keyof typeof ADAPTERS

function createAuthAdapter(): IAuthAdapter {
  const version = (import.meta.env.VITE_ENVIRONMENT || 'mock') as AdapterVersion
  const AdapterClass = ADAPTERS[version].auth
  return new AdapterClass(API_BASE_URL)
}

function createItemsAdapter(): IItemAdapter {
  const version = (import.meta.env.VITE_ENVIRONMENT || 'mock') as AdapterVersion
  const AdapterClass = ADAPTERS[version].items
  return new AdapterClass(API_BASE_URL)
}

export const authAdapter = createAuthAdapter()
export const itemsAdapter = createItemsAdapter()
