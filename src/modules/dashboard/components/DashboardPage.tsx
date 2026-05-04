import {
  IconBriefcase,
  IconCode,
  IconFolderCode,
  IconQuote,
  IconUsers,
} from '@tabler/icons-react'
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { WidgetRefreshButton, WidgetRefreshingIndicator } from '@/modules/core/widget'
import { useDashboardStats } from '../api/dashboard.queries'

interface KpiCardProps {
  title: string
  value: number | undefined
  description: string
  icon: React.ReactNode
  isLoading: boolean
  isFetching: boolean
  onRefresh: () => void
  to: string
}

function KpiCard({ title, value, description, icon, isLoading, isFetching, onRefresh, to }: KpiCardProps) {
  return (
    <Link to={to} className="block group">
      <Card className="transition-colors group-hover:bg-muted/40 cursor-pointer h-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <div className="flex items-center gap-1">
            {isFetching && <WidgetRefreshingIndicator />}
            <WidgetRefreshButton isRefreshing={isFetching} onRefresh={onRefresh} />
            {icon}
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="h-8 w-24 animate-pulse bg-muted rounded" />
          ) : (
            <div className="text-2xl font-bold">{value ?? 0}</div>
          )}
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        </CardContent>
      </Card>
    </Link>
  )
}

const QUICK_LINKS = [
  { labelKey: 'sidebar.portfolio.experiences', fallback: 'Experiences', to: '/dashboard/portfolio/experiences' },
  { labelKey: 'sidebar.portfolio.skills', fallback: 'Skills & Tech', to: '/dashboard/portfolio/skills' },
  { labelKey: 'sidebar.portfolio.projects', fallback: 'Projects', to: '/dashboard/portfolio/projects' },
  { labelKey: 'sidebar.portfolio.testimonials', fallback: 'Testimonials', to: '/dashboard/portfolio/testimonials' },
  { labelKey: 'sidebar.portfolio.services', fallback: 'Services', to: '/dashboard/portfolio/services' },
  { labelKey: 'sidebar.portfolio.content', fallback: 'Content Blocks', to: '/dashboard/portfolio/content' },
  { labelKey: 'sidebar.portfolio.translations', fallback: 'Translations', to: '/dashboard/portfolio/translations' },
] as const

export function DashboardPage() {
  const { t } = useTranslation()
  const { data, isLoading, isFetching, refetch } = useDashboardStats()

  const sharedProps = { isLoading, isFetching, onRefresh: refetch }
  const iconCls = 'h-4 w-4 text-muted-foreground'

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            {t('dashboard.title', 'Dashboard')}
          </h2>
          <p className="text-muted-foreground">
            {t('dashboard.subtitle', 'Overview of your portfolio.')}
          </p>
        </div>
      </div>

      {/* KPI grid */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
        <KpiCard
          {...sharedProps}
          title={t('dashboard.stats.totalUsers', 'Total Users')}
          value={data?.totalUsers}
          description={t('dashboard.stats.registeredUsers', 'Registered users')}
          icon={<IconUsers className={iconCls} />}
          to="/dashboard/users"
        />
        <KpiCard
          {...sharedProps}
          title={t('dashboard.stats.totalExperiences', 'Experiences')}
          value={data?.totalExperiences}
          description={t('dashboard.stats.workExperiences', 'Work experiences')}
          icon={<IconBriefcase className={iconCls} />}
          to="/dashboard/portfolio/experiences"
        />
        <KpiCard
          {...sharedProps}
          title={t('dashboard.stats.totalProjects', 'Projects')}
          value={data?.totalProjects}
          description={t('dashboard.stats.portfolioProjects', 'Portfolio projects')}
          icon={<IconFolderCode className={iconCls} />}
          to="/dashboard/portfolio/projects"
        />
        <KpiCard
          {...sharedProps}
          title={t('dashboard.stats.totalSkills', 'Skills')}
          value={data?.totalSkills}
          description={t('dashboard.stats.technologiesListed', 'Technologies listed')}
          icon={<IconCode className={iconCls} />}
          to="/dashboard/portfolio/skills"
        />
        <KpiCard
          {...sharedProps}
          title={t('dashboard.stats.totalTestimonials', 'Testimonials')}
          value={data?.totalTestimonials}
          description={t('dashboard.stats.clientTestimonials', 'Client testimonials')}
          icon={<IconQuote className={iconCls} />}
          to="/dashboard/portfolio/testimonials"
        />
      </div>

      {/* Quick access */}
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-3">
          {t('dashboard.quickAccess.title', 'Quick Access')}
        </h3>
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-7">
          {QUICK_LINKS.map(({ labelKey, fallback, to }) => (
            <Link
              key={to}
              to={to}
              className="rounded-lg border border-border bg-card px-4 py-3 text-center text-sm font-medium text-foreground transition-colors hover:bg-muted/40"
            >
              {t(labelKey, fallback)}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
