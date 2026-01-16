import { Languages, Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function LanguageSwitch() {
  const { i18n, t } = useTranslation('general')

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon' className='scale-95 rounded-full'>
          <Languages className='size-[1.2rem] transition-all' />
          <span className='sr-only'>{t('language.toggle')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-40'>
        <DropdownMenuItem onClick={() => changeLanguage('en')}>
          {t('language.en')}
          <Check
            size={14}
            className={cn('ms-auto', i18n.language !== 'en' && 'hidden')}
          />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage('es')}>
          {t('language.es')}
          <Check
            size={14}
            className={cn('ms-auto', i18n.language !== 'es' && 'hidden')}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
