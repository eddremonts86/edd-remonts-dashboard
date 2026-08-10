import * as React from 'react'

/**
 * The auth context, split out from `app-auth.tsx` on purpose.
 *
 * `app-auth.tsx` imports Clerk's hooks at module scope. Anything that touched
 * it — including the root error boundary — pulled @clerk/tanstack-react-start
 * into the chunk every landing visitor downloads. Consumers that only need the
 * context type or a tolerant read import this file instead, which has no
 * dependency beyond React.
 */

export type AppAuthProviderKind = 'bypass' | 'clerk' | 'better-auth' | null

export interface AppAuthUser {
  id: string
  email: string
  name: string
  image: string | null
  role: string | null
}

export interface AppAuthContextValue {
  authMode: 'local' | 'clerk' | 'hybrid'
  provider: AppAuthProviderKind
  isLoaded: boolean
  isAuthenticated: boolean
  userId: string | null
  user: AppAuthUser | null
  canSignOut: boolean
  signOut: () => Promise<void>
}

export const AppAuthContext = React.createContext<AppAuthContextValue | undefined>(undefined)

/**
 * Reads the auth context without requiring a provider.
 *
 * The auth providers are mounted per route (`/auth`, `/_dashboard`), not on the
 * root shell, so anything that can render outside them — the error boundary
 * above all — must cope with their absence rather than throw a second error
 * while handling the first.
 */
export function useOptionalAppAuth(): AppAuthContextValue | undefined {
  return React.useContext(AppAuthContext)
}
