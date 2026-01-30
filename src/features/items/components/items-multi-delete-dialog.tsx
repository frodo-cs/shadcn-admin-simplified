'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { type Table } from '@tanstack/react-table'
import { AlertTriangle } from 'lucide-react'
import { toast } from 'sonner'
import { sleep } from '@/lib/utils'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ConfirmDialog } from '@/components/confirm-dialog'

type ItemMultiDeleteDialogProps<TData> = {
  open: boolean
  onOpenChange: (open: boolean) => void
  table: Table<TData>
}

const CONFIRM_WORD = 'DELETE'

export function ItemsMultiDeleteDialog<TData>({
  open,
  onOpenChange,
  table,
}: ItemMultiDeleteDialogProps<TData>) {
  const { t } = useTranslation('items')
  const [value, setValue] = useState('')

  const selectedRows = table.getFilteredSelectedRowModel().rows

  const handleDelete = () => {
    if (value.trim() !== CONFIRM_WORD) {
      toast.error(
        t('dialog.multi_delete.confirm_placeholder', { word: CONFIRM_WORD })
      )
      return
    }

    onOpenChange(false)

    toast.promise(sleep(2000), {
      loading: t('dialog.multi_delete.toast.loading'),
      success: () => {
        setValue('')
        table.resetRowSelection()
        const count = selectedRows.length
        return count > 1
          ? t('dialog.multi_delete.toast.success', { count })
          : t('dialog.multi_delete.toast.success_single', { count })
      },
      error: t('dialog.multi_delete.toast.error'),
    })
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      disabled={value.trim() !== CONFIRM_WORD}
      title={
        <span className='text-destructive'>
          <AlertTriangle
            className='me-1 inline-block stroke-destructive'
            size={18}
          />{' '}
          {selectedRows.length > 1
            ? t('dialog.multi_delete.title', { count: selectedRows.length })
            : t('dialog.multi_delete.title_single', {
                count: selectedRows.length,
              })}
        </span>
      }
      desc={
        <div className='space-y-4'>
          <p className='mb-2'>{t('dialog.multi_delete.desc')}</p>

          <Label className='my-4 flex flex-col items-start gap-1.5'>
            <span className=''>
              {t('dialog.multi_delete.confirm_word_desc', {
                word: CONFIRM_WORD,
              })}
            </span>
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={t('dialog.multi_delete.confirm_placeholder', {
                word: CONFIRM_WORD,
              })}
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
