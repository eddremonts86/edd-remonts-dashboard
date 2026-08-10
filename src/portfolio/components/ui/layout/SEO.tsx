import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { usePortfolioData } from '@/portfolio/contexts/PortfolioDataContext'

/**
 * Client-side, language-dependent head bits only.
 *
 * Canonical, hreflang, Open Graph, Twitter and JSON-LD are server-rendered by
 * the route heads (`src/routes/__root.tsx`, `src/routes/_landing/index.tsx`)
 * because crawlers and link unfurlers never run this component. Duplicating
 * them here would emit two of every tag once the client hydrates.
 *
 * What is genuinely client-only: the tab title and <html lang>, both of which
 * depend on the visitor's detected language.
 */
interface SEOProps {
  title?: string
}

export const SEO = ({ title }: SEOProps) => {
  const { i18n, t } = useTranslation()
  const { personalInfo } = usePortfolioData()

  const lang = i18n.language
  const siteTitle = title || `${personalInfo.name} — ${t('hero.role', personalInfo.title)}`

  return (
    <Helmet htmlAttributes={{ lang: lang === 'dk' ? 'da' : lang }}>
      <title>{siteTitle}</title>
    </Helmet>
  )
}
