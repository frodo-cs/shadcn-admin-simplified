import { useTranslation } from 'react-i18next'

export function MaintenanceError() {
  const { t } = useTranslation('error')

  return (
    <div className='h-svh'>
      <div className='m-auto flex h-full w-full flex-col items-center justify-center gap-2'>
        <h1 className='text-[7rem] leading-tight font-bold'>503</h1>
        <span className='font-medium'>{t('maintenance.title')}</span>
        <p className='text-center text-balance text-muted-foreground'>
          {t('maintenance.description')}
        </p>
      </div>
    </div>
  )
}
