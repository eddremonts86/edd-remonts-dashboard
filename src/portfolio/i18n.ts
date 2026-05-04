import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { LANGUAGES, resolveBrowserLang } from '@/portfolio/data/languages';
import { STORAGE_KEYS } from '@/portfolio/lib/storageKeys';

import translationDK from '@/portfolio/locales/dk/translation.json';
import translationEN from '@/portfolio/locales/en/translation.json';
import translationES from '@/portfolio/locales/es/translation.json';

const resources = {
  en: { translation: translationEN },
  es: { translation: translationES },
  dk: { translation: translationDK },
};

const portfolioI18n = createInstance();

// Retrieve saved language or default to generic browser navigator
const savedLanguage =
  typeof window !== 'undefined'
    ? (localStorage.getItem(STORAGE_KEYS.lang) || resolveBrowserLang(navigator.language))
    : LANGUAGES[0].code;

portfolioI18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage,
  fallbackLng: LANGUAGES[0].code,
  interpolation: {
    escapeValue: false,
  },
});

export default portfolioI18n;
