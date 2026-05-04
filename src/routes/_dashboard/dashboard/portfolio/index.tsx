import { createFileRoute } from '@tanstack/react-router'
import { PortfolioOverviewPage } from '@/modules/portfolio/pages/PortfolioOverviewPage'

export const Route = createFileRoute('/_dashboard/dashboard/portfolio/')({
  component: PortfolioOverviewPage,
})
