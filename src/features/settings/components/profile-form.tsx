import { useMemo } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { showSubmittedData } from '@/lib/show-submitted-data'
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

export function ProfileForm() {
  const { t } = useTranslation('settings')

  const formSchema = useMemo(
    () =>
      z.object({
        username: z
          .string()
          .min(1, t('profile.validation.username_required'))
          .min(2, t('profile.validation.username_min'))
          .max(30, t('profile.validation.username_max')),
        email: z
          .string()
          .min(1, { message: t('profile.validation.email_required') })
          .email({ message: t('profile.validation.email_invalid') }),
      }),
    [t]
  )

  type ProfileFormValues = z.infer<typeof formSchema>

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
    },
    mode: 'onChange',
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => showSubmittedData(data))}
        className='space-y-8'
      >
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('profile.form.username.label')}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t('profile.form.username.placeholder')}
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
              <FormLabel>{t('profile.form.email.label')}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t('profile.form.email.placeholder')}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit'>{t('profile.form.submit')}</Button>
      </form>
    </Form>
  )
}
