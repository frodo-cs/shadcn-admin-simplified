import { useState, useMemo } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
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
import { Loader2 } from 'lucide-react'

export function SignUpForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLFormElement>) {
  const { t } = useTranslation('auth')
  const [isLoading, setIsLoading] = useState(false)

  const formSchema = useMemo(
    () =>
      z
        .object({
          username: z
            .string()
            .min(1, t('sign_up.validation.username_required'))
            .min(2, t('sign_up.validation.username_min'))
            .max(30, t('sign_up.validation.username_max')),
          email: z
            .string()
            .min(1, { message: t('sign_up.validation.email_required') })
            .email({ message: t('sign_up.validation.email_invalid') }),
          password: z
            .string()
            .min(1, { message: t('sign_up.validation.password_required') })
            .min(7, { message: t('sign_up.validation.password_min') }),
          confirmPassword: z.string().min(1, {
            message: t('sign_up.validation.confirm_password_required'),
          }),
        })
        .refine((data) => data.password === data.confirmPassword, {
          message: t('sign_up.validation.password_mismatch'),
          path: ['confirmPassword'],
        }),
    [t]
  )

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)
    console.log(data)
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
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
              <FormLabel>{t('sign_up.form.username_label')}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t('sign_up.form.username_placeholder')}
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
              <FormLabel>{t('sign_up.form.email_label')}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t('sign_up.form.email_placeholder')}
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
            <FormItem>
              <FormLabel>{t('sign_up.form.password_label')}</FormLabel>
              <FormControl>
                <PasswordInput placeholder='********' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('sign_up.form.confirm_password_label')}</FormLabel>
              <FormControl>
                <PasswordInput placeholder='********' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='mt-2' disabled={isLoading}>
          {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
          {t('sign_up.submit')}
        </Button>
      </form>
    </Form>
  )
}
