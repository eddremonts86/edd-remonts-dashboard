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
      className="flex border border-subtle rounded-full bg-surface/80 p-0.5 select-none shrink-0 backdrop-blur-md"
      role="radiogroup"
      aria-label={t('a11y.selectLanguage', 'Select language')}
    >
      {LANGUAGES.map((lang) => {
        const isSelected = i18n.language === lang.code
        const fullName = lang.code === 'en' ? 'English' : lang.code === 'es' ? 'Español' : 'Dansk'
        return (
          <button
            key={lang.code}
            onClick={() => i18n.changeLanguage(lang.code)}
            className={`flex h-7 min-w-[32px] items-center justify-center rounded-full px-2 transition-all duration-300 font-mono text-[9px] font-bold cursor-pointer ${
              isSelected
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'text-foreground/60 hover:text-foreground hover:bg-foreground/[0.05]'
            }`}
            role="radio"
            aria-checked={isSelected}
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
