import { type AuthUser } from '@/lib/api/adapters/auth/auth-base.adapter'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface AuthState {
  user: AuthUser | null
  accessToken: string | null
  setAuth: (user: AuthUser, token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      setAuth: (user, accessToken) => set({ user, accessToken }),
      logout: () => set({ user: null, accessToken: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
