import { useTranslation } from 'react-i18next'
// The context module, not `app-auth` itself: that one imports Clerk's hooks at
// module scope, and this boundary sits on the root shell — importing it there
// put the whole Clerk client on the landing page's critical path.
import { useOptionalAppAuth } from '@/shared/lib/auth/app-auth.context'
import { isClientAuthBypassEnabled } from '@/shared/lib/auth/bypass'
import { ErrorStateView } from '@/shared/ui/feedback/ErrorStateView'

export function RootErrorContent({ error }: { error: Error }) {
  // Undefined when an error escapes outside /auth or /_dashboard — a landing
  // crash, say. Treated as signed out, which is the correct read there.
  const auth = useOptionalAppAuth()
  const { t } = useTranslation('errors')
  const isAuthBypassEnabled = isClientAuthBypassEnabled()

  const isAuthenticated = isAuthBypassEnabled || (auth?.isAuthenticated ?? false)
  const role = auth?.user?.role ?? undefined

  return (
    <ErrorStateView
      title={t('boundary.title', '¡Ups! Algo salió mal')}
      description={t('boundary.description', 'Ha ocurrido un error inesperado.')}
      isAuthenticated={isAuthBypassEnabled || (auth?.isLoaded ? isAuthenticated : false)}
      errorDetails={error}
      userRole={role}
    />
  )
}
