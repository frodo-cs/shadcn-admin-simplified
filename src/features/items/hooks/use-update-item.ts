import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { updateItem } from '../api/update-item'
import type { Item } from '../schemas/item'

export const useUpdateItem = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation('items')

  return useMutation({
    mutationFn: ({ id, item }: { id: string; item: Partial<Item> }) =>
      updateItem(id, item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] })
      toast.success(t('messages.update_success'))
    },
    onError: () => {
      toast.error(t('messages.update_error'))
    },
  })
}
