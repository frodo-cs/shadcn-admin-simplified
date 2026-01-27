// import { AuthAdapterV1 } from './adapters/auth-v1.adapter'
import { AuthAdapterMock } from './adapters/auth-mock.adapter'
import type { IAuthAdapter } from './adapters/base-auth.adapter'

const ADAPTERS = {
  //   v1: AuthAdapterV1,
  mock: AuthAdapterMock,
} as const

export type AdapterVersion = keyof typeof ADAPTERS

function createAuthAdapter(): IAuthAdapter {
  const version = (import.meta.env.VITE_API_VERSION || 'mock') as AdapterVersion
  const AdapterClass = ADAPTERS[version]
  return new AdapterClass()
}

export const authAdapter = createAuthAdapter()
