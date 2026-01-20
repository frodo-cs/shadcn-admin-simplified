import { createFileRoute } from '@tanstack/react-router'
import { SettingsProfile } from '@/features/settings/pages/profile'

export const Route = createFileRoute('/_authenticated/settings/')({
  component: SettingsProfile,
})
