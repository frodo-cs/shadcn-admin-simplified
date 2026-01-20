import { ContentSection } from '../components/content-section'
import { AppearanceForm } from '../components/appearance-form'

export function SettingsAppearance() {
  return (
    <ContentSection title='appearance.title' desc='appearance.description'>
      <AppearanceForm />
    </ContentSection>
  )
}
