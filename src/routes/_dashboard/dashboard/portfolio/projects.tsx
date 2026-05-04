import { createFileRoute } from '@tanstack/react-router'
import { ProjectsPage } from '@/modules/portfolio/pages/ProjectsPage'

export const Route = createFileRoute('/_dashboard/dashboard/portfolio/projects')({
  component: ProjectsPage,
})
