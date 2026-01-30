import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { deleteItem } from '../api/delete-item'

export const useDeleteItem = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation('items')

  return useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] })
      toast.success(t('messages.delete_success'))
    },
    onError: () => {
      toast.error(t('messages.delete_error'))
    },
  })
}
