import { useTranslation } from 'react-i18next'
import { Link } from '@tanstack/react-router'
import { useExperiences } from '../api/experiences.queries'
import { useProjects } from '../api/projects.queries'
import { useSkills } from '../api/skills.queries'
import { useTestimonials } from '../api/testimonials.queries'

interface StatCardProps {
  title: string
  count: number
  to: string
}

function StatCard({ title, count, to }: StatCardProps) {
  return (
    <Link
      to={to}
      className="group rounded-2xl border border-border bg-card p-6 transition-colors hover:bg-muted/40"
    >
      <p className="text-sm text-muted-foreground">{title}</p>
      <p className="mt-2 text-4xl font-light tabular-nums text-foreground">{count}</p>
    </Link>
  )
}

export function PortfolioOverviewPage() {
  const { t } = useTranslation()
  const { data: experiences = [] } = useExperiences()
  const { data: skills = [] } = useSkills()
  const { data: projects = [] } = useProjects()
  const { data: testimonials = [] } = useTestimonials()

  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">{t('sidebar.portfolio', 'Portfolio')}</h1>
        <p className="mt-1 text-muted-foreground">
          {t('portfolio.overview.description', 'Manage all portfolio content from one place.')}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title={t('sidebar.portfolio.experiences', 'Experiences')} count={experiences.length} to="/dashboard/portfolio/experiences" />
        <StatCard title={t('sidebar.portfolio.skills', 'Skills')} count={skills.length} to="/dashboard/portfolio/skills" />
        <StatCard title={t('sidebar.portfolio.projects', 'Projects')} count={projects.length} to="/dashboard/portfolio/projects" />
        <StatCard title={t('sidebar.portfolio.testimonials', 'Testimonials')} count={testimonials.length} to="/dashboard/portfolio/testimonials" />
      </div>
    </div>
  )
}
