import { useMemo } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from '@tanstack/react-router'
import { Loader2, LogIn } from 'lucide-react'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { cn, getErrorMessage } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useLogin } from '../hooks/use-login'
import type { AuthUser } from '@/lib/api/adapters/auth/auth-base.adapter'
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
  const navigate = useNavigate()

  const formSchema = useMemo(
    () =>
      z.object({
        identifier: z
          .string()
          .min(2, { message: t('sign_in.validation.identifier_min') })
          .max(30, { message: t('sign_in.validation.identifier_max') }),
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
      identifier: '',
      password: '',
    },
  })

  const { mutate: login, isPending } = useLogin()

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast.promise(
      new Promise<AuthUser>((resolve, reject) => {
        login(data, {
          onSuccess: (user: AuthUser) => {
            const targetPath = redirectTo || '/'
            navigate({ to: targetPath, replace: true })
            resolve(user)
          },
          onError: (error: Error) => {
            reject(error)
          },
        })
      }),
      {
        loading: t('sign_in.toast.loading'),
        success: (user: AuthUser) =>
          t('sign_in.toast.success', { identifier: user.username || data.identifier }),
        error: (error: unknown) =>
          t('sign_in.toast.error', { error: getErrorMessage(error) }),
      }
    )
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
          name='identifier'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('sign_in.form.identifier_label')}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t('sign_in.form.identifier_placeholder')}
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
        <Button className='mt-2' disabled={isPending}>
          {isPending ? (
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
