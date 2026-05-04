import { createFileRoute } from '@tanstack/react-router'
import { TranslationsPage } from '@/modules/portfolio/pages/TranslationsPage'

export const Route = createFileRoute('/_dashboard/dashboard/portfolio/translations')({
  component: TranslationsPage,
})
