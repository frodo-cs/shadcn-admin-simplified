import { useTranslation } from 'react-i18next'
import { getRouteApi } from '@tanstack/react-router'
import { Main } from '@/components/layout/main'
import { ItemsDialogs } from './components/items-dialogs'
import { ItemsPrimaryButtons } from './components/items-primary-buttons'
import { ItemsProvider } from './components/items-provider'
import { ItemsTable } from './components/items-table'
import { MainContent } from '@/components/layout/main-content'
import { useItems } from './hooks/use-items'

const route = getRouteApi('/_authenticated/items/')

export function Items() {
  const { t } = useTranslation('items')
  const search = route.useSearch()
  const navigate = route.useNavigate()

  const { data: items, isLoading } = useItems()

  if (isLoading) return <div>{t('general.loading', { ns: 'general' })}</div>

  return (
    <ItemsProvider>
      <MainContent>
        <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
          <div className='flex flex-wrap items-end justify-between gap-2'>
            <div>
              <h2 className='text-2xl font-bold tracking-tight'>{t('title')}</h2>
              <p className='text-muted-foreground'>
                {t('subtitle')}
              </p>
            </div>
            <ItemsPrimaryButtons />
          </div>
          <ItemsTable data={items ?? []} search={search} navigate={navigate} />
        </Main>
      </MainContent>
      <ItemsDialogs />
    </ItemsProvider>
  )
}
