import { Shield, UserCheck, Users } from 'lucide-react'
import { type ItemStatus } from './schema'

export const itemStatuses = new Map<ItemStatus, string>([
  [
    'available',
    'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200',
  ],
  ['unavailable', 'bg-neutral-300/40 border-neutral-300'],
  [
    'discontinued',
    'bg-sky-200/40 text-sky-900 dark:text-sky-100 border-sky-300',
  ],
])

export const itemTypes = [
  {
    label: 'Service',
    value: 'service',
    icon: Shield,
  },
  {
    label: 'Product',
    value: 'product',
    icon: UserCheck,
  },
  {
    label: 'Combo',
    value: 'combo',
    icon: Users,
  },
] as const
