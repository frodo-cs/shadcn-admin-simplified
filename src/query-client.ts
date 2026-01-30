import { AxiosError } from 'axios'
import { QueryCache, QueryClient } from '@tanstack/react-query'
import { type Router } from '@tanstack/react-router'
import { toast } from 'sonner'
import i18n from '@/config/i18n'
import { useAuthStore } from '@/stores/auth-store'
import { handleServerError } from '@/lib/handle-server-error'
import { ENDPOINTS, ROUTES } from './constants'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let routerInstance: Router<any> | null = null

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function setRouterInstance(router: Router<any>) {
  routerInstance = router
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        // eslint-disable-next-line no-console
        if (import.meta.env.DEV) console.log({ failureCount, error })

        if (failureCount >= 0 && import.meta.env.DEV) return false
        if (failureCount > 3 && import.meta.env.PROD) return false

        return !(
          error instanceof AxiosError &&
          [401, 403].includes(error.response?.status ?? 0)
        )
      },
      refetchOnWindowFocus: import.meta.env.PROD,
      staleTime: 10 * 1000, // 10s
    },
    mutations: {
      onError: (error) => {
        handleServerError(error)

        if (error instanceof AxiosError) {
          if (error.response?.status === 304) {
            toast.error(i18n.t('error:toasts.content_not_modified'))
          }
        }
      },
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          const isLoginRequest = error.config?.url?.includes(
            `/${ENDPOINTS.AUTH.LOGIN}`
          )
          if (!isLoginRequest && routerInstance) {
            toast.error(i18n.t('error:toasts.session_expired'))
            useAuthStore.getState().logout()
            const redirect = `${routerInstance.history.location.href}`
            routerInstance.navigate({
              to: ROUTES.SIGN_IN,
              search: { redirect },
            })
          }
        }
        if (error.response?.status === 500) {
          toast.error(i18n.t('error:toasts.internal_server_error'))
          if (import.meta.env.PROD && routerInstance) {
            routerInstance.navigate({ to: ROUTES.SERVER_ERROR })
          }
        }
        if (error.response?.status === 403 && routerInstance) {
          routerInstance.navigate({ to: ROUTES.FORBIDDEN, replace: true })
        }
      }
    },
  }),
})
