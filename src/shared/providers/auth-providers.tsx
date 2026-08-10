import { ClerkProvider } from '@clerk/tanstack-react-start'
import type { ReactNode } from 'react'
import { AppAuthProvider } from '@/shared/lib/auth/app-auth'
import { getClerkPublishableKey, isClerkEnabled } from '@/shared/lib/auth/config'

/**
 * Auth providers, mounted per route rather than on the root shell.
 *
 * These used to live in `AppProviders`, which `RootDocument` renders for every
 * route. That put @clerk/tanstack-react-start (~73 KB brotli) plus the
 * better-auth client on the critical path of the public landing page, which
 * has no account, no session and no sign-in affordance.
 *
 * Mount this in the layouts that actually deal with a user: `/auth` and
 * `/_dashboard`. Code that can render outside them — the root error boundary —
 * must use `useOptionalAppAuth` from `app-auth.context`.
 */
const PUBLISHABLE_KEY = getClerkPublishableKey()
const SHOULD_USE_CLERK_PROVIDER = isClerkEnabled() && !!PUBLISHABLE_KEY

export function AuthProviders({ children }: { children: ReactNode }) {
  if (SHOULD_USE_CLERK_PROVIDER && PUBLISHABLE_KEY) {
    return (
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <AppAuthProvider>{children}</AppAuthProvider>
      </ClerkProvider>
    )
  }

  return <AppAuthProvider>{children}</AppAuthProvider>
}
