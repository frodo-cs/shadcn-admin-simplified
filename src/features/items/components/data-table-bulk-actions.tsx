import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { type Table } from '@tanstack/react-table'
import { Trash2, CheckCircle, XCircle, Ban } from 'lucide-react'
import { toast } from 'sonner'
import { sleep } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { DataTableBulkActions as BulkActionsToolbar } from '@/components/data-table'
import { type ItemStatus } from '../data/schema'
import { ItemsMultiDeleteDialog } from './items-multi-delete-dialog'

type DataTableBulkActionsProps<TData> = {
  table: Table<TData>
}

export function DataTableBulkActions<TData>({
  table,
}: DataTableBulkActionsProps<TData>) {
  const { t } = useTranslation('items')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const selectedRows = table.getFilteredSelectedRowModel().rows

  const handleBulkStatusChange = (status: ItemStatus) => {
    toast.promise(sleep(2000), {
      loading: t('bulk_actions.toast.loading'),
      success: () => {
        table.resetRowSelection()
        const count = selectedRows.length
        const statusLabel = t(`table.filters.status_options.${status}`)
        return count > 1
          ? t('bulk_actions.toast.success', { count, status: statusLabel })
          : t('bulk_actions.toast.success_single', {
              count,
              status: statusLabel,
            })
      },
      error: t('bulk_actions.toast.error'),
    })
  }

  return (
    <>
      <BulkActionsToolbar table={table} entityName={'item'}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              onClick={() => handleBulkStatusChange('available')}
              className='size-8'
              aria-label={t('bulk_actions.set_available')}
              title={t('bulk_actions.set_available')}
            >
              <CheckCircle size={16} />
              <span className='sr-only'>{t('bulk_actions.set_available')}</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t('bulk_actions.set_available')}</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              onClick={() => handleBulkStatusChange('unavailable')}
              className='size-8'
              aria-label={t('bulk_actions.set_unavailable')}
              title={t('bulk_actions.set_unavailable')}
            >
              <XCircle size={16} />
              <span className='sr-only'>
                {t('bulk_actions.set_unavailable')}
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t('bulk_actions.set_unavailable')}</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              onClick={() => handleBulkStatusChange('discontinued')}
              className='size-8'
              aria-label={t('bulk_actions.set_discontinued')}
              title={t('bulk_actions.set_discontinued')}
            >
              <Ban size={16} />
              <span className='sr-only'>
                {t('bulk_actions.set_discontinued')}
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t('bulk_actions.set_discontinued')}</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='destructive'
              size='icon'
              onClick={() => setShowDeleteConfirm(true)}
              className='size-8'
              aria-label={t('dialog.multi_delete.title', {
                count: selectedRows.length,
              })}
              title={t('dialog.multi_delete.title', {
                count: selectedRows.length,
              })}
            >
              <Trash2 size={16} />
              <span className='sr-only'>
                {t('dialog.multi_delete.title', { count: selectedRows.length })}
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              {t('dialog.multi_delete.title', { count: selectedRows.length })}
            </p>
          </TooltipContent>
        </Tooltip>
      </BulkActionsToolbar>

      <ItemsMultiDeleteDialog
        table={table}
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
      />
    </>
  )
}
