/**
 * Canonical site metadata, shared by the server-rendered route heads.
 *
 * Everything a crawler or a link unfurler reads must live here and be emitted
 * through TanStack Router's `head()`. react-helmet-async runs client-side only:
 * Slack, LinkedIn and X never execute JS, so tags injected by Helmet are
 * invisible to them. Helmet is kept for the user-facing tab title and <html lang>.
 */

/**
 * The public origin. Defaults to the real domain rather than a placeholder —
 * an unset env var used to emit `rel="canonical" href="https://example.com"`,
 * which handed the page's ranking to another domain.
 */
export const SITE_URL = (import.meta.env.VITE_PUBLIC_URL || 'https://profile.eduardoinerarte.dk').replace(
  /\/$/,
  '',
)

export const SITE_NAME = 'Eduardo Inerarte'

export const OG_IMAGE = `${SITE_URL}/og/og-cover.jpg`

/** Matches the three locales the portfolio ships (`dk` is our key for `da`). */
export const HREFLANG_ALTERNATES = [
  { hrefLang: 'en', href: SITE_URL },
  { hrefLang: 'es', href: `${SITE_URL}/?lang=es` },
  { hrefLang: 'da', href: `${SITE_URL}/?lang=dk` },
  { hrefLang: 'x-default', href: SITE_URL },
] as const

/**
 * Server-rendered copy is English: it matches `x-default` and `hreflang="en"`.
 * The visitor's own language is applied client-side by `<SEO />`.
 */
export const DEFAULT_TITLE = 'Eduardo Inerarte — Staff Frontend Engineer & Technical Leader'

export const DEFAULT_DESCRIPTION =
  'Staff Frontend Engineer in Copenhagen. 18 years shipping interfaces where the proof is measurable: a 94% bundle cut, sub-12ms interactions, and design systems adopted by 20+ engineers.'

/** Open Graph + Twitter card. Absolute URLs only — unfurlers do not resolve relative paths. */
export function socialMeta({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  url = SITE_URL,
  image = OG_IMAGE,
} = {}) {
  return [
    { property: 'og:type', content: 'profile' },
    { property: 'og:site_name', content: SITE_NAME },
    { property: 'og:url', content: url },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:image', content: image },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image:alt', content: `${SITE_NAME} — portfolio cover` },
    // Only `og:locale` — React's head manager dedupes by `property`, so a
    // repeated `og:locale:alternate` silently loses all but the last entry.
    // The hreflang <link>s in the root head carry the alternates instead.
    { property: 'og:locale', content: 'en_US' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: image },
    { name: 'twitter:image:alt', content: `${SITE_NAME} — portfolio cover` },
  ]
}

/** Person + ProfilePage graph, emitted server-side so Google reads it on first crawl. */
export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: SITE_NAME,
        jobTitle: 'Staff Frontend Engineer & Technical Leader',
        description: DEFAULT_DESCRIPTION,
        url: SITE_URL,
        image: OG_IMAGE,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Copenhagen',
          addressCountry: 'DK',
        },
        knowsLanguage: ['en', 'es', 'da'],
        knowsAbout: [
          'React',
          'TypeScript',
          'Vite',
          'Design Systems',
          'Micro-Frontends',
          'Monorepos',
          'Web Performance',
          'Frontend Architecture',
        ],
        sameAs: [
          'https://github.com/eddremonts86',
          'https://www.linkedin.com/in/eduardo-inerarte-643843bb',
        ],
      },
      {
        '@type': 'ProfilePage',
        '@id': `${SITE_URL}/#profilepage`,
        url: SITE_URL,
        name: DEFAULT_TITLE,
        description: DEFAULT_DESCRIPTION,
        inLanguage: 'en',
        mainEntity: { '@id': `${SITE_URL}/#person` },
      },
    ],
  }
}
