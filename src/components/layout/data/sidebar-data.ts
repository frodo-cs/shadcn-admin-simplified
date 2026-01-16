import { LayoutDashboard, Settings, UserCog, Users } from 'lucide-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  navGroups: [
    {
      title: 'general:title',
      items: [
        {
          title: 'general:dashboard',
          url: '/',
          icon: LayoutDashboard,
        },
        {
          title: 'users:title',
          url: '/users',
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
              url: '/settings',
              icon: UserCog,
            },
            {
              title: 'settings:appearance.title',
              url: '/settings/appearance',
              icon: UserCog,
            },
          ],
        },
      ],
    },
  ],
}
