import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

// English
import dataTableEn from '../locales/en/data-table.json'
import errorEn from '../locales/en/error.json'
import generalEn from '../locales/en/general.json'
import settingsEn from '../locales/en/settings.json'
import itemsEn from '../locales/en/items.json'
import authEn from '../locales/en/auth.json'
import configEn from '../locales/en/config.json'

// Spanish
import dataTableEs from '../locales/es/data-table.json'
import errorEs from '../locales/es/error.json'
import generalEs from '../locales/es/general.json'
import settingsEs from '../locales/es/settings.json'
import itemsEs from '../locales/es/items.json'
import authEs from '../locales/es/auth.json'
import configEs from '../locales/es/config.json'

const resources = {
  en: {
    general: generalEn,
    settings: settingsEn,
    items: itemsEn,
    error: errorEn,
    dataTable: dataTableEn,
    auth: authEn,
    config: configEn,
  },
  es: {
    general: generalEs,
    settings: settingsEs,
    items: itemsEs,
    error: errorEs,
    dataTable: dataTableEs,
    auth: authEs,
    config: configEs,
  },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
