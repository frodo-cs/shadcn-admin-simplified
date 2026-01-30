'use client'

import { useState } from 'react'
import { useTranslation, Trans } from 'react-i18next'
import { AlertTriangle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useDeleteItem } from '../hooks/use-delete-item'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { type Item } from '../schemas/item'

type ItemDeleteDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: Item
}

export function ItemsDeleteDialog({
  open,
  onOpenChange,
  currentRow,
}: ItemDeleteDialogProps) {
  const { t } = useTranslation('items')
  const [value, setValue] = useState('')

  const { mutate: deleteItem, isPending } = useDeleteItem()

  const handleDelete = () => {
    if (value.trim() !== currentRow.name) return

    deleteItem(currentRow.id, {
      onSuccess: () => {
        onOpenChange(false)
        setValue('')
      },
    })
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      disabled={value.trim() !== currentRow.name || isPending}
      title={
        <span className='text-destructive'>
          <AlertTriangle
            className='me-1 inline-block stroke-destructive'
            size={18}
          />{' '}
          {t('dialog.delete.title')}
        </span>
      }
      desc={
        <div className='space-y-4'>
          <div className='mb-2'>
            <Trans
              i18nKey='dialog.delete.desc'
              ns='items'
              values={{ name: currentRow.name }}
              components={[
                <br key='br' />,
                <span key='name' className='font-bold' />,
              ]}
            />
          </div>

          <Label className='my-2'>
            {t('dialog.delete.label')}
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={t('dialog.delete.confirm_placeholder')}
            />
          </Label>

          <Alert variant='destructive'>
            <AlertTitle>{t('dialog.delete.warning')}</AlertTitle>
            <AlertDescription>
              {t('dialog.delete.warning_desc')}
            </AlertDescription>
          </Alert>
        </div>
      }
      confirmText={t('dialog.delete.confirm_btn')}
      destructive
    />
  )
}
