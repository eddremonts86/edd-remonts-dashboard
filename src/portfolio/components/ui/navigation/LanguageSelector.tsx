import { useTranslation } from 'react-i18next'
import { LANGUAGES } from '@/portfolio/data/languages'

/**
 * Language selector as an accessible radio group.
 * Uses standard language codes (en, es, da) with full language names for screen readers.
 */
export const LanguageSelector = () => {
  const { i18n, t } = useTranslation()

  if (LANGUAGES.length <= 1) return null

  return (
    <div
      className="flex border border-border-default/50 rounded-full bg-surface/50 p-1 gap-1 select-none shrink-0 backdrop-blur-md"
      aria-label={t('a11y.selectLanguage', 'Select language')}
    >
      {LANGUAGES.map((lang) => {
        const isSelected = i18n.language === lang.code
        let fullName = 'Dansk'
        if (lang.code === 'en') fullName = 'English'
        else if (lang.code === 'es') fullName = 'Español'
        return (
          <button
            key={lang.code}
            type="button"
            onClick={() => i18n.changeLanguage(lang.code)}
            className={`flex h-7 min-w-8 items-center justify-center rounded-full px-2.5 transition-all duration-200 font-mono text-[12px] font-bold cursor-pointer ${
              isSelected
                ? 'bg-foreground text-background shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-foreground/5 scale-105 z-10'
                : 'text-foreground/72 hover:text-foreground/80 hover:bg-foreground/4'
            }`}
            aria-label={t('a11y.changeLanguageTo', 'Change language to {{language}}', {
              language: fullName,
            })}
            title={fullName}
          >
            {lang.code.toUpperCase()}
          </button>
        )
      })}
    </div>
  )
}
