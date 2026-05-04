import { createFileRoute } from '@tanstack/react-router'
import { ContentBlocksPage } from '@/modules/portfolio/pages/ContentBlocksPage'

export const Route = createFileRoute('/_dashboard/dashboard/portfolio/content')({
  component: ContentBlocksPage,
})
