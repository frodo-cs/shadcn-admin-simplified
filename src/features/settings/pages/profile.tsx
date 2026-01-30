import { ContentSection } from '../components/content-section'
import { ProfileForm } from '../components/profile-form'
import { useSettings } from '../hooks/use-settings'
import { CustomSpinner } from '@/components/custom-spinner'

export function SettingsProfile() {
  const { data: user, isLoading } = useSettings()

  if (isLoading) return <CustomSpinner />

  return (
    <ContentSection title='profile.title' desc='profile.description'>
      <ProfileForm initialData={user} />
    </ContentSection>
  )
}
