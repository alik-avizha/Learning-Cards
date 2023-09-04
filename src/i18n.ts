import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import enTranslation from './common/locales/en/translation.json'
import ruTranslation from './common/locales/ru/translation.json'

const preferredLanguage = localStorage.getItem('i18nextLng') || 'en'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    returnEmptyString: false,
    debug: true,
    fallbackLng: 'en',
    resources: {
      en: enTranslation,
      ru: ruTranslation,
    },
    lng: preferredLanguage,
  })

export default i18n
