import { AuthPage } from '@/modules/auth'
import { AuthProviders } from '@/shared/providers'

/** See `_dashboard/-DashboardRoot.tsx` for why this is a separate file. */
export function AuthRoot() {
  return (
    <AuthProviders>
      <AuthPage />
    </AuthProviders>
  )
}
