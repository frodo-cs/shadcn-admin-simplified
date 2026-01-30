import { useTranslation } from 'react-i18next'
import { ContentSection } from '../components/content-section'
import { ProfileForm } from '../components/profile-form'
import { useSettings } from '../hooks/use-settings'

export function SettingsProfile() {
  const { t } = useTranslation()
  const { data: user, isLoading } = useSettings()

  if (isLoading) return <div>{t('general:loading')}</div>

  return (
    <ContentSection title='profile.title' desc='profile.description'>
      <ProfileForm initialData={user} />
    </ContentSection>
  )
}
