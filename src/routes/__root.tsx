import { createRootRoute } from '@tanstack/react-router'
import { NotFoundPage } from '@/components/composite/NotFoundPage'
import { initSentry } from '@/shared/lib/sentry'
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  HREFLANG_ALTERNATES,
  SITE_NAME,
  SITE_URL,
} from '@/shared/lib/seo'
import appCss from '@/shared/styles/globals.css?url'
import { RootDocument, RootErrorBoundary } from './-root-components'

// Initialize Sentry
initSentry()

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: DEFAULT_TITLE },
      { name: 'description', content: DEFAULT_DESCRIPTION },
      { name: 'author', content: SITE_NAME },
      { name: 'robots', content: 'index, follow' },
      // One entry only: React's head manager dedupes by `name`, so a
      // light/dark pair collapses to whichever comes last. The site's default
      // presentation is dark, so that is the value worth keeping.
      { name: 'theme-color', content: '#0a0a0a' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      { rel: 'manifest', href: '/manifest.json' },
      { rel: 'canonical', href: SITE_URL },
      // React needs the camelCase prop; `hreflang` logs
      // "Invalid DOM property `hreflang`" on every render.
      ...HREFLANG_ALTERNATES.map(({ hrefLang, href }) => ({
        rel: 'alternate',
        hrefLang,
        href,
      })),
    ],
  }),

  shellComponent: RootDocument,
  errorComponent: RootErrorBoundary,
  notFoundComponent: NotFoundPage,
})
