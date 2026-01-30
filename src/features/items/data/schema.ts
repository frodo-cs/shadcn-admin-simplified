import { z } from 'zod'

const itemStatusSchema = z.union([
  z.literal('available'),
  z.literal('unavailable'),
  z.literal('discontinued'),
])
export type ItemStatus = z.infer<typeof itemStatusSchema>

const itemTypeSchema = z.union([
  z.literal('service'),
  z.literal('product'),
  z.literal('combo'),
])

export type ItemType = z.infer<typeof itemTypeSchema>

const itemSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  status: itemStatusSchema,
  type: itemTypeSchema,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Item = z.infer<typeof itemSchema>

export const itemListSchema = z.array(itemSchema)
