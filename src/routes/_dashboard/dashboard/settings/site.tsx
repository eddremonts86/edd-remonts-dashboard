import { createFileRoute } from '@tanstack/react-router'
import { SiteMetaSettings } from '@/modules/settings/ui/SiteMetaSettings'

export const Route = createFileRoute('/_dashboard/dashboard/settings/site')({
  component: SiteMetaSettings,
})
