'use client'

import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { SelectDropdown } from '@/components/select-dropdown'
import { itemTypes } from '../data/data'
import { type Item } from '../data/schema'

type ItemActionDialogProps = {
  currentRow?: Item
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ItemsActionDialog({
  currentRow,
  open,
  onOpenChange,
}: ItemActionDialogProps) {
  const { t } = useTranslation('items')
  const isEdit = !!currentRow

  const formSchema = useMemo(
    () =>
      z.object({
        name: z.string().min(1, t('dialog.form.validation.name_required')),
        description: z
          .string()
          .min(1, t('dialog.form.validation.description_required')),
        price: z.number().min(1, t('dialog.form.validation.price_required')),
        type: z.string().min(1, t('dialog.form.validation.type_required')),
        status: z.string().min(1, t('dialog.form.validation.status_required')),
        isEdit: z.boolean(),
      }),
    [t]
  )

  type ItemForm = z.infer<typeof formSchema>

  const form = useForm<ItemForm>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
          ...currentRow,
          isEdit,
        }
      : {
          name: '',
          description: '',
          price: 0,
          type: '',
          status: '',
          isEdit,
        },
  })

  const onSubmit = (values: ItemForm) => {
    form.reset()
    showSubmittedData(values)
    onOpenChange(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset()
        onOpenChange(state)
      }}
    >
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader className='text-start'>
          <DialogTitle>
            {isEdit ? t('dialog.edit.title') : t('dialog.add.title')}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? t('dialog.edit.description')
              : t('dialog.add.description')}
          </DialogDescription>
        </DialogHeader>
        <div className='h-105 w-[calc(100%+0.75rem)] overflow-y-auto py-1 pe-3'>
          <Form {...form}>
            <form
              id='item-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 px-0.5'
            >
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-end'>
                      {t('dialog.form.name')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('dialog.form.placeholders.name')}
                        className='col-span-4'
                        autoComplete='off'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-end'>
                      {t('dialog.form.description')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('dialog.form.placeholders.description')}
                        className='col-span-4'
                        autoComplete='off'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='price'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-end'>
                      {t('dialog.form.price')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('dialog.form.placeholders.price')}
                        className='col-span-4'
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='type'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-end'>
                      {t('dialog.form.type')}
                    </FormLabel>
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder={t('dialog.form.placeholders.type')}
                      className='col-span-4'
                      items={itemTypes.map(({ value }) => ({
                        label: t(`table.filters.type_options.${value}`),
                        value,
                      }))}
                    />
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='status'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-end'>
                      {t('dialog.form.status')}
                    </FormLabel>
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder={t('dialog.form.placeholders.status')}
                      className='col-span-4'
                      items={[
                        {
                          label: t('table.filters.status_options.available'),
                          value: 'available',
                        },
                        {
                          label: t('table.filters.status_options.unavailable'),
                          value: 'unavailable',
                        },
                        {
                          label: t('table.filters.status_options.discontinued'),
                          value: 'discontinued',
                        },
                      ]}
                    />
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <DialogFooter>
          <Button type='submit' form='item-form'>
            {t('dialog.form.save')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
