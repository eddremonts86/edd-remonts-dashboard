// Portfolio domain types

export type Locale = 'en' | 'es' | 'dk'
export const LOCALES: Locale[] = ['en', 'es', 'dk']

// ── Experiences ───────────────────────────────────────────────────────────────

export interface ExperienceTranslation {
  locale: Locale
  role: string
  description: string
}

export interface Experience {
  id: string
  company: string
  location: string
  periodStart?: string
  periodEnd?: string // undefined = "Present"
  url?: string
  sortOrder: number
  translations: ExperienceTranslation[]
}

export type ExperienceInput = Omit<Experience, 'id'>

// ── Skills ────────────────────────────────────────────────────────────────────

export interface Skill {
  id: string
  name: string
  iconSlug?: string
  category: string
  proficiency: number
  visible: boolean
  sortOrder: number
}

export type SkillInput = Omit<Skill, 'id'>

// ── Projects ──────────────────────────────────────────────────────────────────

export interface ProjectTranslation {
  locale: Locale
  description: string
  problem: string
  context: string
  role: string
  decisions: string
  complexity: string
  results: string
}

export interface Project {
  id: string
  title: string
  coverImageUrl?: string
  link?: string
  repositoryUrl?: string
  internalImageUrl?: string
  category: string
  scaleLabel: string
  impactLabel: string
  architectureLabel: string
  featured: boolean
  sortOrder: number
  translations: ProjectTranslation[]
}

export type ProjectInput = Omit<Project, 'id'>

// ── Testimonials ──────────────────────────────────────────────────────────────

export interface TestimonialTranslation {
  locale: Locale
  quote: string
}

export interface Testimonial {
  id: string
  authorName: string
  authorRole: string
  authorCompany: string
  avatarUrl?: string
  visible: boolean
  sortOrder: number
  translations: TestimonialTranslation[]
}

export type TestimonialInput = Omit<Testimonial, 'id'>

// ── Content blocks ────────────────────────────────────────────────────────────

export interface ContentBlock {
  key: string
  valueEn: string
  valueEs: string
  valueDk: string
}

export type ContentBlockInput = ContentBlock

// ── Services ──────────────────────────────────────────────────────────────────

export interface ServiceTranslation {
  locale: Locale
  title: string
  description: string
}

export interface Service {
  id: string
  iconSlug: string
  visible: boolean
  sortOrder: number
  translations: ServiceTranslation[]
}

export type ServiceInput = Omit<Service, 'id'>

// ── Translations ──────────────────────────────────────────────────────────────

export interface TranslationRow {
  locale: Locale
  translationKey: string
  value: string
}
