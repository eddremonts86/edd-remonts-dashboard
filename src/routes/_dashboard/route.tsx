import { createFileRoute, redirect } from '@tanstack/react-router'
import { ensureAppAuthSession } from '@/shared/lib/auth/app-auth.functions'
import { DashboardRoot } from './-DashboardRoot'

export const Route = createFileRoute('/_dashboard')({
  beforeLoad: async () => {
    try {
      await ensureAppAuthSession()
    } catch {
      throw redirect({
        to: '/auth',
      })
    }
  },
  component: DashboardRoot,
})
