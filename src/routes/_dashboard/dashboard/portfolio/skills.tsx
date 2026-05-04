import { createFileRoute } from '@tanstack/react-router'
import { SkillsPage } from '@/modules/portfolio/pages/SkillsPage'

export const Route = createFileRoute('/_dashboard/dashboard/portfolio/skills')({
  component: SkillsPage,
})
