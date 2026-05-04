import { createFileRoute } from '@tanstack/react-router'
import { PortfolioRoot } from '@/portfolio/PortfolioRoot'

export const Route = createFileRoute('/_landing/')({
  component: PortfolioRoot,
})
