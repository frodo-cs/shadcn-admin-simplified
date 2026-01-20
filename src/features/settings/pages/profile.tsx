import { ContentSection } from '../components/content-section'
import { ProfileForm } from '../components/profile-form'

export function SettingsProfile() {
  return (
    <ContentSection title='profile.title' desc='profile.description'>
      <ProfileForm />
    </ContentSection>
  )
}
