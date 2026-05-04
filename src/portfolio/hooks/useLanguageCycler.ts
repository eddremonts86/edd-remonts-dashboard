import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { LANGUAGES } from '@/portfolio/data/languages';
import { STORAGE_KEYS } from '@/portfolio/lib/storageKeys';

interface UseLanguageCyclerReturn {
  currentLang: string;
  nextLang: string;
  toggle: () => void;
}

export function useLanguageCycler(): UseLanguageCyclerReturn {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  const currentIndex = LANGUAGES.findIndex((l) => l.code === currentLang);
  const nextLang = LANGUAGES[(currentIndex + 1) % LANGUAGES.length]?.code ?? 'en';

  const toggle = useCallback(() => {
    const nextIndex = (LANGUAGES.findIndex((l) => l.code === i18n.language) + 1) % LANGUAGES.length;
    const nextCode = LANGUAGES[nextIndex].code;
    i18n.changeLanguage(nextCode);
    document.documentElement.lang = nextCode;
    localStorage.setItem(STORAGE_KEYS.lang, nextCode);
  }, [i18n]);

  return { currentLang, nextLang, toggle };
}
