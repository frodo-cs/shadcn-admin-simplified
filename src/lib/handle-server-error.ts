import { toast } from 'sonner'
import { getErrorMessage } from './utils'

export function handleServerError(error: unknown) {
  const message = getErrorMessage(error)
  toast.error(message)
}
