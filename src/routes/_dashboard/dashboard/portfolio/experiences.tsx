import { createFileRoute } from '@tanstack/react-router'
import { ExperiencesPage } from '@/modules/portfolio/pages/ExperiencesPage'

export const Route = createFileRoute('/_dashboard/dashboard/portfolio/experiences')({
  component: ExperiencesPage,
})
