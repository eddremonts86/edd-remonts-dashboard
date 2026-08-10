import { LazyMotion, domAnimation } from 'framer-motion'
import { NuqsAdapter } from 'nuqs/adapters/tanstack-router'
import type { ReactNode } from 'react'
import { Toaster } from '@/components/ui/toaster'
import { TooltipProvider } from '@/components/ui/tooltip'
import { I18nProvider } from './i18n-provider'
import { QueryProvider } from './query-provider'
import { ThemeProvider } from './theme-provider'

interface AppProvidersProps {
  children: ReactNode
}

/**
 * Root providers wrapper. Order matters: outermost providers should be the most
 * "global".
 *
 * Auth is deliberately absent — see `./auth-providers`. Clerk and the
 * better-auth client are mounted by `/auth` and `/_dashboard`, so the public
 * landing page does not download an auth stack it never uses.
 */
export function AppProviders({ children }: AppProvidersProps) {
  return (
    <NuqsAdapter>
      <LazyMotion features={domAnimation}>
        <I18nProvider>
          <ThemeProvider defaultTheme="system">
            <QueryProvider>
              <TooltipProvider>{children}</TooltipProvider>
              <Toaster />
            </QueryProvider>
          </ThemeProvider>
        </I18nProvider>
      </LazyMotion>
    </NuqsAdapter>
  )
}

export { AuthProviders } from './auth-providers'
