import { useTranslation } from 'react-i18next'

/**
 * Skip to main content link for accessibility.
 * Hidden by default, visible on focus.
 */
export function SkipLink() {
  const { t } = useTranslation()

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-foreground focus:px-4 focus:py-2 focus:text-background focus:shadow-lg"
    >
      {t('a11y.skipToContent', 'Skip to main content')}
    </a>
  )
}
