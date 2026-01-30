import { createRouter } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/auth-store'
import { routeTree } from './routeTree.gen'
import { queryClient, setRouterInstance } from './query-client'

export const router = createRouter({
  routeTree,
  context: {
    queryClient,
    auth: {
      user: useAuthStore.getState().user,
      logout: useAuthStore.getState().logout,
    },
  },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
})

setRouterInstance(router)

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
