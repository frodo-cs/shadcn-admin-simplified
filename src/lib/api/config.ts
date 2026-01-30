import type { IAuthAdapter } from './adapters/auth/auth-base.adapter'
import type { IItemAdapter } from './adapters/items/item-base.adapter'

// MOCK
import { AuthAdapterMock } from './adapters/auth/auth-mock.adapter'
import { ItemAdapterMock } from './adapters/items/item-mock.adapter'
import { SettingsAdapterMock } from './adapters/settings/settings-mock.adapter'

// V1
import { AuthAdapterV1 } from './adapters/auth/auth-v1.adapter'
import { ItemAdapterV1 } from './adapters/items/item-v1.adapter'
import { SettingsAdapterV1 } from './adapters/settings/settings-v1.adapter'
import { ISettingsAdapter } from './adapters/settings/settings-base.adapter'

const IS_MOCK = import.meta.env.VITE_ENVIRONMENT === 'mock'
const API_BASE_URL = IS_MOCK
  ? ''
  : import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1'

const ADAPTERS = {
  v1: {
    auth: AuthAdapterV1,
    items: ItemAdapterV1,
    settings: SettingsAdapterV1,
  },
  mock: {
    auth: AuthAdapterMock,
    items: ItemAdapterMock,
    settings: SettingsAdapterMock,
  },
}

type AdapterVersion = keyof typeof ADAPTERS

function getAdapterVersion() {
  const version = (import.meta.env.VITE_ENVIRONMENT || 'mock') as AdapterVersion
  return ADAPTERS[version]
}

function createAuthAdapter(): IAuthAdapter {
  const adapterVersion = getAdapterVersion()
  const AdapterClass = adapterVersion.auth
  return new AdapterClass(API_BASE_URL)
}

function createItemsAdapter(): IItemAdapter {
  const adapterVersion = getAdapterVersion()
  const AdapterClass = adapterVersion.items
  return new AdapterClass(API_BASE_URL)
}

function createSettingsAdapter(): ISettingsAdapter {
  const adapterVersion = getAdapterVersion()
  const AdapterClass = adapterVersion.settings
  return new AdapterClass(API_BASE_URL)
}

export const authAdapter = createAuthAdapter()
export const itemsAdapter = createItemsAdapter()
export const settingsAdapter = createSettingsAdapter()
