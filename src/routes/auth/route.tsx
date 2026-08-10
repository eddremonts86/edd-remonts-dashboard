import { createFileRoute, redirect } from '@tanstack/react-router'
import { getAppAuthSession } from '@/shared/lib/auth/app-auth.functions'
import { AuthRoot } from './-AuthRoot'

export const Route = createFileRoute('/auth')({
  beforeLoad: async () => {
    const session = await getAppAuthSession()

    if (session.userId) {
      throw redirect({
        to: '/dashboard',
      })
    }
  },
  component: AuthRoot,
})
