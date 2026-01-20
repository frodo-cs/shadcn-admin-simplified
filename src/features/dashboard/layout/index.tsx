import { useTranslation } from 'react-i18next'
import { Main } from '@/components/layout/main'
import { MainContent } from '@/components/layout/main-content'

export function Dashboard() {
  const { t } = useTranslation('general')

  return (
    <MainContent>
      <Main>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight'>
            {t('dashboard')}
          </h1>
        </div>
        {/* CONTENT */}
      </Main>
    </MainContent>
  )
}
