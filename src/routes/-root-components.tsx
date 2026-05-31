import * as Sentry from '@sentry/react'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { HeadContent, Scripts } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { SkipLink } from '@/components/ui/skip-link'
import { useDevtoolsVisibility } from '@/modules/settings'
import { AppProviders } from '@/shared/providers'
import { RootErrorContent } from './-root-components/RootErrorContent'

const ReactQueryDevtools = React.lazy(() =>
  import('@tanstack/react-query-devtools').then((d) => ({
    default: d.ReactQueryDevtools,
  })),
)

function DevtoolsWrapper() {
  const visible = useDevtoolsVisibility()

  if (!import.meta.env.DEV || !visible) return null

  return (
    <>
      <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'TanStack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
      <React.Suspense fallback={null}>
        <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
      </React.Suspense>
    </>
  )
}

export function RootDocument({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation()
  const lang = i18n.language ?? 'en'

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased" suppressHydrationWarning>
        <SkipLink />
        <AppProviders>
          <main id="main-content">{children}</main>
          <DevtoolsWrapper />
        </AppProviders>
        <Scripts />
      </body>
    </html>
  )
}

export function RootErrorBoundary({ error }: { error: Error }) {
  // Log error to Sentry
  Sentry.captureException(error)

  return <RootErrorContent error={error} />
}
