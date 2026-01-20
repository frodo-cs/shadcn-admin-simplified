import { createFileRoute } from '@tanstack/react-router'
import { SettingsAppearance } from '@/features/settings/pages/appearance'

export const Route = createFileRoute('/_authenticated/settings/appearance')({
  component: SettingsAppearance,
})
