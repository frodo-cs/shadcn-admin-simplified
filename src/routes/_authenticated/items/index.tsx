import z from 'zod'
import { createFileRoute } from '@tanstack/react-router'
import { Items } from '@/features/items'
import { itemTypes } from '@/features/items/data/data'

const itemsSearchSchema = z.object({
  page: z.number().optional().catch(1),
  pageSize: z.number().optional().catch(10),
  // Facet filters
  status: z
    .array(
      z.union([
        z.literal('available'),
        z.literal('unavailable'),
        z.literal('discontinued'),
      ])
    )
    .optional()
    .catch([]),
  type: z
    .array(z.enum(itemTypes.map((r) => r.value as (typeof itemTypes)[number]['value'])))
    .optional()
    .catch([]),
  // Per-column text filter
  name: z.string().optional().catch(''),
})

export const Route = createFileRoute('/_authenticated/items/')({
  validateSearch: itemsSearchSchema,
  component: Items,
})
