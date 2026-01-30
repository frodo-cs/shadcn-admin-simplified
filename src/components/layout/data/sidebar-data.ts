import { LayoutDashboard, Settings, UserCog, Users } from 'lucide-react'
import { type SidebarData } from '../types'
import { ROUTES } from '@/constants'

export const sidebarData: SidebarData = {
  navGroups: [
    {
      title: 'general:title',
      items: [
        {
          title: 'general:dashboard',
          url: ROUTES.HOME,
          icon: LayoutDashboard,
        },
        // TODO: add sidebar items
        {
          title: 'items:title',
          url: ROUTES.ITEMS,
          icon: Users,
        },
      ],
    },
    {
      title: 'settings:title',
      items: [
        {
          title: 'settings:title',
          icon: Settings,
          items: [
            {
              title: 'settings:profile.title',
              url: ROUTES.SETTINGS,
              icon: UserCog,
            },
            {
              title: 'settings:appearance.title',
              url: ROUTES.APPEARANCE,
              icon: UserCog,
            },
          ],
        },
      ],
    },
  ],
}
