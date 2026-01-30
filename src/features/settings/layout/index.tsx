import { Outlet } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Separator } from '@/components/ui/separator'
import { Main } from '@/components/layout/main'
import { MainContent } from '@/components/layout/main-content'


export function Settings() {
  const { t } = useTranslation('settings')

  return (
    <MainContent>
      <Main fixed>
        <div className='space-y-0.5'>
          <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>
            {t('title')}
          </h1>
        </div>
        <Separator className='my-4 lg:my-6' />
        <div className='flex flex-1 flex-col space-y-2 overflow-hidden md:space-y-2 lg:flex-row lg:space-y-0 lg:space-x-12'>
          <Outlet />
        </div>
      </Main>
    </MainContent>
  )
}
