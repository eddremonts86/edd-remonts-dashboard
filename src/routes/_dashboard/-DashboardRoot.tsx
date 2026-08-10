import { DashboardLayout } from '@/modules/dashboard'
import { AuthProviders } from '@/shared/providers'

/**
 * Dashboard shell with its auth providers.
 *
 * Kept in its own file, and referenced from the route as a bare identifier,
 * because TanStack Start's code splitter only lifts `component:` out of the
 * eagerly-imported route module when it is a plain reference. An inline
 * `component: () => <AuthProviders>…</AuthProviders>` leaves the Clerk import
 * in the route module, which `routeTree.gen.ts` imports statically — putting it
 * straight back on the landing page's critical path.
 */
export function DashboardRoot() {
  return (
    <AuthProviders>
      <DashboardLayout />
    </AuthProviders>
  )
}
