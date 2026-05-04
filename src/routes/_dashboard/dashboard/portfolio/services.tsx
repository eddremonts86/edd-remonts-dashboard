import { createFileRoute } from '@tanstack/react-router'
import { ServicesPage } from '@/modules/portfolio/pages/ServicesPage'

export const Route = createFileRoute('/_dashboard/dashboard/portfolio/services')({
  component: ServicesPage,
})
