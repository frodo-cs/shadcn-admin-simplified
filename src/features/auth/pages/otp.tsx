import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { AuthLayout } from '../layout/auth-layout'
import { OtpForm } from '../components/otp-form'
import { ROUTES } from '@/constants'

export function Otp() {
  const { t } = useTranslation('auth')

  return (
    <AuthLayout>
      <Card className='gap-4'>
        <CardHeader>
          <CardTitle className='text-base tracking-tight'>
            {t('otp.title')}
          </CardTitle>
          <CardDescription>{t('otp.description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <OtpForm />
        </CardContent>
        <CardFooter>
          <p className='px-8 text-center text-sm text-muted-foreground'>
            {t('otp.question')}{' '}
            <Link
              to={ROUTES.SIGN_IN}
              className='underline underline-offset-4 hover:text-primary'
            >
              {t('otp.resend_link')}
            </Link>
            .
          </p>
        </CardFooter>
      </Card>
    </AuthLayout>
  )
}
