import { createRootRoute } from '@tanstack/react-router'
import { NotFoundPage } from '@/components/composite/NotFoundPage'
import { initSentry } from '@/shared/lib/sentry'
import appCss from '@/shared/styles/globals.css?url'
import { RootDocument, RootErrorBoundary } from './-root-components'

// Initialize Sentry
initSentry()

const BASE_URL = import.meta.env.VITE_PUBLIC_URL || 'https://example.com'

export const Route = createRootRoute({
  head: () => {
    const languages = [
      { code: 'en', href: BASE_URL },
      { code: 'es', href: `${BASE_URL}/?lang=es` },
      { code: 'da', href: `${BASE_URL}/?lang=da` },
    ]

    return {
      meta: [
        { charSet: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { title: 'Eduardo Inerarte - Senior Frontend Engineer' },
        {
          name: 'description',
          content:
            'Senior Frontend Engineer specializing in React, TypeScript, and modern web architectures. Building measurable, high-performance digital experiences.',
        },
        // Open Graph locale alternates
        { property: 'og:locale', content: 'en' },
        { property: 'og:locale:alternate', content: 'es' },
        { property: 'og:locale:alternate', content: 'da' },
      ],
      links: [
        { rel: 'stylesheet', href: appCss },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'manifest', href: '/manifest.json' },
        // Canonical URL
        { rel: 'canonical', href: BASE_URL },
        // Hreflang alternates for multi-language SEO
        ...languages.map((lang) => ({
          rel: 'alternate',
          hreflang: lang.code,
          href: lang.href,
        })),
        // Default x-default
        { rel: 'alternate', hreflang: 'x-default', href: BASE_URL },
      ],
    }
  },

  shellComponent: RootDocument,
  errorComponent: RootErrorBoundary,
  notFoundComponent: NotFoundPage,
})
