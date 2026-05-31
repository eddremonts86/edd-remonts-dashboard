import { createInstance } from 'i18next'
import { initReactI18next } from 'react-i18next'
import { LANGUAGES } from '@/portfolio/data/languages'
import translationDK from '@/portfolio/locales/dk/translation.json'
import translationEN from '@/portfolio/locales/en/translation.json'
import translationES from '@/portfolio/locales/es/translation.json'

const resources = {
  en: { translation: translationEN },
  es: { translation: translationES },
  dk: { translation: translationDK },
}

const portfolioI18n = createInstance()

// Always initialize with 'en' to guarantee server-rendered HTML and client hydration match perfectly.
// Client language is dynamically loaded on mount inside PortfolioRoot.tsx.
const defaultLanguage = LANGUAGES[0].code

portfolioI18n.use(initReactI18next).init({
  resources,
  lng: defaultLanguage,
  fallbackLng: LANGUAGES[0].code,
  interpolation: {
    escapeValue: false,
  },
})

export default portfolioI18n
