import { useTranslation } from 'react-i18next'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useItems } from './items-provider'

export function ItemsPrimaryButtons() {
  const { t } = useTranslation('items')
  const { setOpen } = useItems()
  return (
    <div className='flex gap-2'>
      <Button className='space-x-1' onClick={() => setOpen('add')}>
        <span>{t('primary_button')}</span> <Plus size={18} />
      </Button>
    </div>
  )
}
