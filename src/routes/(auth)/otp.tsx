import { createFileRoute } from '@tanstack/react-router'
import { Otp } from '@/features/auth/pages/otp'

export const Route = createFileRoute('/(auth)/otp')({
  component: Otp,
})
