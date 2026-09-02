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
      // viewport-fit=cover is what makes env(safe-area-inset-*) report a real
      // number. StickyNav and Footer already pad by those insets, and without
      // this they resolve to 0 — which is invisible in a browser tab and puts
      // the nav under the clock once the app is installed and the status bar
      // is translucent.
      { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
      { title: DEFAULT_TITLE },
      { name: 'description', content: DEFAULT_DESCRIPTION },
      { name: 'author', content: SITE_NAME },
      { name: 'robots', content: 'index, follow' },
      // One entry only: React's head manager dedupes by `name`, so a
      // light/dark pair collapses to whichever comes last. The site's default
      // presentation is dark, so that is the value worth keeping.
      { name: 'theme-color', content: '#0a0a0a' },
      // iOS reads none of the manifest. Installed from Safari, these four are
      // the entire configuration: without them the shortcut opens in a browser
      // tab with a white status bar and a screenshot for an icon.
      { name: 'mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      { name: 'apple-mobile-web-app-title', content: 'Eduardo Inerarte' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      { rel: 'manifest', href: '/manifest.json' },
      // Also the icon iOS uses for the home-screen shortcut.
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/icons/apple-touch-icon.png' },
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
