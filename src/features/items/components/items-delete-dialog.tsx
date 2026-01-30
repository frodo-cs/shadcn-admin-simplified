'use client'

import { useState } from 'react'
import { useTranslation, Trans } from 'react-i18next'
import { AlertTriangle } from 'lucide-react'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { type Item } from '../data/schema'

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

  const handleDelete = () => {
    if (value.trim() !== currentRow.name) return

    onOpenChange(false)
    showSubmittedData(currentRow, 'The following item has been deleted:')
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      disabled={value.trim() !== currentRow.name}
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
              components={[<br key='br' />, <span key='name' className='font-bold' />]}
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
