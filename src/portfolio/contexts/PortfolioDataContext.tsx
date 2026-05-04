/**
 * PortfolioDataContext
 *
 * Fetches all portfolio data from the DB (same server functions used by the
 * dashboard) and provides it to portfolio components with the EXACT same
 * shape as the old static cvData.ts, so no visual component needs to change.
 */

import { useQuery } from '@tanstack/react-query'
import { Mail } from 'lucide-react'
import { createContext, useContext, type ReactNode } from 'react'
import { getContentBlocks } from '@/modules/portfolio/server/content'
import { getExperiences } from '@/modules/portfolio/server/experiences'
import { getProjects } from '@/modules/portfolio/server/projects'
import { getSkills } from '@/modules/portfolio/server/skills'
import {
  FacebookIcon,
  GithubIcon,
  LinkedinIcon,
} from '@/portfolio/components/ui/icons/SocialIcons'

// ── Helpers ──────────────────────────────────────────────────────────────────

/** ISO date → "DD/MM/YYYY" */
function fmtDate(iso: string | null | undefined): string {
  if (!iso) return ''
  const d = new Date(iso)
  const day = String(d.getUTCDate()).padStart(2, '0')
  const month = String(d.getUTCMonth() + 1).padStart(2, '0')
  const year = d.getUTCFullYear()
  return `${day}/${month}/${year}`
}

/** Build period string matching cvData format: "DD/MM/YYYY - Present" */
function buildPeriod(start: string | null | undefined, end: string | null | undefined): string {
  const s = fmtDate(start)
  const e = end ? fmtDate(end) : 'Present'
  return `${s} - ${e}`
}

/** Pick translation for locale, fallback to 'en' */
function pickTr<T extends { locale: string }>(
  translations: T[],
  locale: string,
): T | undefined {
  return translations.find((t) => t.locale === locale) ?? translations.find((t) => t.locale === 'en')
}

// ── Types (matching cvData shapes exactly) ───────────────────────────────────

export interface CvPersonalInfo {
  name: string
  title: string
  description: string
  email: string
  phone: string
  location: string
  socials: Array<{
    name: string
    url: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon: any
  }>
}

export interface CvExperience {
  id: number
  period: string
  company: string
  location: string
  url: string
  role: string
  description: string
}

export interface CvProject {
  id: string
  title: string
  image: string
  link: string
  category: string
}

export interface CvStats {
  years: number
  companies: number
  technologies: number
  lighthouse: number
}

interface PortfolioData {
  personalInfo: CvPersonalInfo
  experiences: CvExperience[]
  skills: string[]
  projects: CvProject[]
  stats: CvStats
  isLoading: boolean
}

// ── Defaults (shown while loading, match static cvData values) ───────────────

const DEFAULT_PERSONAL_INFO: CvPersonalInfo = {
  name: 'Eduardo Inerarte',
  title: 'Senior Frontend Engineer with Full-Stack Roots',
  description:
    'Frontend-first engineer with full-stack roots and nearly two decades of experience since 2007.',
  email: 'eddremonts86@gmail.com',
  phone: '(+45) 61436173',
  location: 'Copenhagen, Denmark',
  socials: [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/eduardo-inerarte-643843bb', icon: LinkedinIcon },
    { name: 'GitHub', url: 'https://github.com/eddremonts86', icon: GithubIcon },
    { name: 'Facebook', url: 'https://www.facebook.com/edd.remonts', icon: FacebookIcon },
    { name: 'Email', url: 'mailto:eddremonts86@gmail.com', icon: Mail },
  ],
}

// ── Context ───────────────────────────────────────────────────────────────────

const DEFAULT_STATS: CvStats = {
  years: 18,
  companies: 12,
  technologies: 32,
  lighthouse: 98,
}

const PortfolioDataCtx = createContext<PortfolioData>({
  personalInfo: DEFAULT_PERSONAL_INFO,
  experiences: [],
  skills: [],
  projects: [],
  stats: DEFAULT_STATS,
  isLoading: true,
})

export function PortfolioDataProvider({ children }: { children: ReactNode }) {
  const { data: contentBlocks = [], isLoading: loadingContent } = useQuery({
    queryKey: ['portfolio', 'content'],
    queryFn: () => getContentBlocks(),
    staleTime: 5 * 60 * 1000,
  })

  const { data: dbExperiences = [], isLoading: loadingExp } = useQuery({
    queryKey: ['portfolio', 'experiences'],
    queryFn: () => getExperiences(),
    staleTime: 5 * 60 * 1000,
  })

  const { data: dbSkills = [], isLoading: loadingSkills } = useQuery({
    queryKey: ['portfolio', 'skills'],
    queryFn: () => getSkills(),
    staleTime: 5 * 60 * 1000,
  })

  const { data: dbProjects = [], isLoading: loadingProjects } = useQuery({
    queryKey: ['portfolio', 'projects'],
    queryFn: () => getProjects(),
    staleTime: 5 * 60 * 1000,
  })

  const isLoading = loadingContent || loadingExp || loadingSkills || loadingProjects

  // ── Map content blocks → personalInfo ──────────────────────────────────────
  function block(key: string): string {
    return contentBlocks.find((b) => b.key === key)?.valueEn ?? ''
  }

  const personalInfo: CvPersonalInfo = {
    name: block('hero.name') || DEFAULT_PERSONAL_INFO.name,
    title: block('hero.title') || DEFAULT_PERSONAL_INFO.title,
    description: block('about.bio') || DEFAULT_PERSONAL_INFO.description,
    email: block('contact.email') || DEFAULT_PERSONAL_INFO.email,
    phone: block('contact.phone') || DEFAULT_PERSONAL_INFO.phone,
    location: block('contact.location') || DEFAULT_PERSONAL_INFO.location,
    socials: [
      {
        name: 'LinkedIn',
        url: block('social.linkedin') || DEFAULT_PERSONAL_INFO.socials[0].url,
        icon: LinkedinIcon,
      },
      {
        name: 'GitHub',
        url: block('social.github') || DEFAULT_PERSONAL_INFO.socials[1].url,
        icon: GithubIcon,
      },
      {
        name: 'Facebook',
        url: block('social.facebook') || DEFAULT_PERSONAL_INFO.socials[2].url,
        icon: FacebookIcon,
      },
      {
        name: 'Email',
        url: `mailto:${block('contact.email') || DEFAULT_PERSONAL_INFO.email}`,
        icon: Mail,
      },
    ],
  }

  // ── Map DB experiences → cvData shape ──────────────────────────────────────
  // sort_order 0 = most recent (Schilling, id=12). id = 12 - sortOrder
  const experiences: CvExperience[] = [...dbExperiences]
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
    .map((exp) => {
      const tr = pickTr(exp.translations, 'en')
      return {
        id: 12 - (exp.sortOrder ?? 0),
        period: buildPeriod(exp.periodStart, exp.periodEnd),
        company: exp.company,
        location: exp.location ?? '',
        url: exp.url ?? '',
        role: tr?.role ?? '',
        description: tr?.description ?? '',
      }
    })

  // ── Map DB skills → string[] ──────────────────────────────────────────────
  const skills: string[] = [...dbSkills]
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
    .map((s) => s.name)

  // ── Map DB projects → cvData shape ────────────────────────────────────────
  const projects: CvProject[] = [...dbProjects]
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
    .map((p) => ({
      id: p.id,
      title: p.title,
      image: p.coverImageUrl ?? '',
      link: p.link ?? '',
      category: p.category ?? 'Frontend',
    }))

  // ── Stats from DB content blocks (fall back to defaults if not seeded) ───
  const stats: CvStats = {
    years: Number(block('stats.years')) || DEFAULT_STATS.years,
    companies: Number(block('stats.companies')) || DEFAULT_STATS.companies,
    technologies: Number(block('stats.technologies').replace('+', '')) || DEFAULT_STATS.technologies,
    lighthouse: Number(block('stats.lighthouse')) || DEFAULT_STATS.lighthouse,
  }

  return (
    <PortfolioDataCtx.Provider value={{ personalInfo, experiences, skills, projects, stats, isLoading }}>
      {children}
    </PortfolioDataCtx.Provider>
  )
}

export function usePortfolioData(): PortfolioData {
  return useContext(PortfolioDataCtx)
}
