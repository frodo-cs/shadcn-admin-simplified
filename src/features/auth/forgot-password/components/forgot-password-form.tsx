import { useState, useMemo } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { ArrowRight, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
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

export function ForgotPasswordForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLFormElement>) {
  const { t } = useTranslation('auth')
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const formSchema = useMemo(
    () =>
      z.object({
        email: z
          .string()
          .min(1, {
            message: t('forgot_password.validation.email_required'),
          })
          .email({
            message: t('forgot_password.validation.email_invalid'),
          }),
      }),
    [t]
  )

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '' },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)

    toast.promise(sleep(2000), {
      loading: t('forgot_password.form.loading'),
      success: () => {
        setIsLoading(false)
        form.reset()
        navigate({ to: '/otp' })
        return t('forgot_password.form.success', { email: data.email })
      },
      error: t('forgot_password.form.error'),
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('grid gap-2', className)}
        {...props}
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('forgot_password.form.email_label')}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t('forgot_password.form.email_placeholder')}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='mt-2' disabled={isLoading}>
          {t('forgot_password.form.submit')}
          {isLoading ? (
            <Loader2 className='ms-2 size-4 animate-spin' />
          ) : (
            <ArrowRight className='ms-2 size-4' />
          )}
        </Button>
      </form>
    </Form>
  )
}
