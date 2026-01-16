import { useState, useMemo } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from '@tanstack/react-router'
import { Loader2, LogIn } from 'lucide-react'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '@/stores/auth-store'
import { sleep, cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/password-input'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLFormElement> {
  redirectTo?: string
}

export function UserAuthForm({
  className,
  redirectTo,
  ...props
}: UserAuthFormProps) {
  const { t } = useTranslation('auth')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { auth } = useAuthStore()

  const formSchema = useMemo(
    () =>
      z.object({
        username: z
          .string()
          .min(2, { message: t('sign_in.validation.username_min') })
          .max(30, { message: t('sign_in.validation.username_max') }),
        email: z
          .string()
          .min(1, { message: t('sign_in.validation.email_required') })
          .email({ message: t('sign_in.validation.email_invalid') }),
        password: z
          .string()
          .min(1, { message: t('sign_in.validation.password_required') })
          .min(7, { message: t('sign_in.validation.password_min') }),
      }),
    [t]
  )

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)

    toast.promise(sleep(2000), {
      loading: t('sign_in.toast.loading'),
      success: () => {
        setIsLoading(false)
        const mockUser = {
          accountNo: 'ACC001',
          email: data.email,
          username: data.username,
          role: ['user'],
          exp: Date.now() + 24 * 60 * 60 * 1000,
        }

        auth.setUser(mockUser)
        auth.setAccessToken('mock-access-token')

        const targetPath = redirectTo || '/'
        navigate({ to: targetPath, replace: true })

        return t('sign_in.toast.success', { email: data.username })
      },
      error: t('sign_in.toast.error'),
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('grid gap-3', className)}
        {...props}
      >
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('sign_in.form.username_label')}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t('sign_in.form.username_placeholder')}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('sign_in.form.email_label')}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t('sign_in.form.email_placeholder')}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem className='relative'>
              <FormLabel>{t('sign_in.form.password_label')}</FormLabel>
              <FormControl>
                <PasswordInput placeholder='********' {...field} />
              </FormControl>
              <FormMessage />
              <Link
                to='/forgot-password'
                className='absolute end-0 -top-0.5 text-sm font-medium text-muted-foreground hover:opacity-75'
              >
                {t('sign_in.forgot_password_link')}
              </Link>
            </FormItem>
          )}
        />
        <Button className='mt-2' disabled={isLoading}>
          {isLoading ? (
            <Loader2 className='me-2 size-4 animate-spin' />
          ) : (
            <LogIn className='me-2 size-4' />
          )}
          {t('sign_in.title')}
        </Button>
      </form>
    </Form>
  )
}
