import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { createItem } from '../api/create-item'

export const useCreateItem = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation('items')

  return useMutation({
    mutationFn: createItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] })
      toast.success(t('messages.create_success'))
    },
    onError: () => {
      toast.error(t('messages.create_error'))
    },
  })
}
