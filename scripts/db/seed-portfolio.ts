/**
 * Seed portfolio tables from local data files (self-contained — no external repo dependency).
 * Run once after the initial migration:  pnpm db:seed:portfolio
 */
import { existsSync } from 'fs'
import * as dotenv from 'dotenv'
import { drizzle } from 'drizzle-orm/node-postgres'
import pg from 'pg'
import {
  portfolioProjects,
  portfolioProjectTranslations,
  portfolioExperiences,
  portfolioExperienceTranslations,
  portfolioContent,
  portfolioSkills,
  portfolioTestimonials,
  portfolioTestimonialTranslations,
} from '../../src/shared/lib/db/schema'

interface ExperienceItem {
  role: string
  description: string
}

interface CvSource {
  personalInfo: {
    name: string
    email: string
    phone: string
    location: string
    linkedinUrl: string
    githubUrl: string
    facebookUrl: string
  }
  experiences: Array<{
    id: number
    period: string
    company: string
    location: string
    url: string
  }>
  skills: string[]
}

interface ExpTranslationsData {
  en: Record<string, ExperienceItem>
  es: Record<string, ExperienceItem>
  dk: Record<string, ExperienceItem>
}

if (existsSync('.env.development')) {
  dotenv.config({ path: '.env.development' })
} else {
  dotenv.config({ path: '.env' })
}

// Import JSON data using dynamic import for ESM compatibility
let cvSource: CvSource
let expTranslationsData: ExpTranslationsData

async function loadJsonData() {
  cvSource = (await import('./data/cv-source.json', { with: { type: 'json' } })).default as CvSource
  expTranslationsData = (
    await import('./data/experience-translations.json', { with: { type: 'json' } })
  ).default as ExpTranslationsData
}

async function main() {
  // --- Drizzle ORM DB connection ---
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })
  const db = drizzle(pool)
  // Helper to parse periods like "2020-2022" or "2020-present"
  function parsePeriod(period: string): { start: string; end: string } {
    const [start, end] = period.split('-').map((s) => s.trim())
    return { start, end }
  }
  await loadJsonData()

  // ── Experiences ────────────────────────────────────────────────────────────
  function normalizeDate(dateStr: string): string | null {
    if (!dateStr) return null
    // Accepts DD/MM/YYYY or YYYY-MM-DD, returns YYYY-MM-DD
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) {
      const [day, month, year] = dateStr.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    }
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      return dateStr
    }
    return null
  }

  const experiences = cvSource.experiences
    .sort((a, b) => b.id - a.id)
    .map((exp, idx) => {
      const { start, end } = parsePeriod(exp.period)
      return {
        id: `exp-${exp.id}`,
        _sourceId: exp.id,
        company: exp.company,
        location: exp.location,
        periodStart: normalizeDate(start),
        periodEnd:
          end && (end.toLowerCase().includes('present') || end.toLowerCase().includes('actual'))
            ? null
            : normalizeDate(end),
        url: exp.url || null,
        sortOrder: idx,
      }
    })

  await db
    .insert(portfolioExperiences)
    .values(experiences.map(({ _sourceId: _s, ...row }) => row))
    .onConflictDoNothing()

  const expTranslations = experiences.flatMap(({ id, _sourceId }) => {
    const enItem = expTranslationsData.en[String(_sourceId)]
    const esItem = expTranslationsData.es[String(_sourceId)]
    const dkItem = expTranslationsData.dk[String(_sourceId)]
    return [
      {
        experienceId: id,
        locale: 'en',
        role: enItem?.role ?? '',
        description: enItem?.description ?? '',
      },
      {
        experienceId: id,
        locale: 'es',
        role: esItem?.role ?? enItem?.role ?? '',
        description: esItem?.description ?? enItem?.description ?? '',
      },
      {
        experienceId: id,
        locale: 'dk',
        role: dkItem?.role ?? enItem?.role ?? '',
        description: dkItem?.description ?? enItem?.description ?? '',
      },
    ]
  })

  await db.insert(portfolioExperienceTranslations).values(expTranslations).onConflictDoNothing()
  console.log(`  ✓ ${experiences.length} experiences + ${expTranslations.length} translations`)

  // ── Content blocks ─────────────────────────────────────────────────────────
  const pi = cvSource.personalInfo
  const contentRows = [
    { key: 'hero.name', valueEn: pi.name, valueEs: pi.name, valueDk: pi.name },
    {
      key: 'hero.title',
      valueEn: 'Senior Frontend Engineer with Full-Stack Roots',
      valueEs: 'Ingeniero Frontend Senior con Raíces Full-Stack',
      valueDk: 'Senior Frontend Ingeniør med Full-Stack Rødder',
    },
    {
      key: 'hero.tagline',
      valueEn:
        'Frontend-first engineer with full-stack roots and nearly two decades of experience.',
      valueEs: 'Ingeniero Frontend con raíces full-stack y casi dos décadas de experiencia.',
      valueDk: 'Frontend-ingeniør med full-stack baggrund og næsten to årtiers erfaring.',
    },
    { key: 'contact.email', valueEn: pi.email, valueEs: pi.email, valueDk: pi.email },
    { key: 'contact.phone', valueEn: pi.phone, valueEs: pi.phone, valueDk: pi.phone },
    { key: 'contact.location', valueEn: pi.location, valueEs: pi.location, valueDk: pi.location },
    {
      key: 'social.linkedin',
      valueEn: pi.linkedinUrl,
      valueEs: pi.linkedinUrl,
      valueDk: pi.linkedinUrl,
    },
    { key: 'social.github', valueEn: pi.githubUrl, valueEs: pi.githubUrl, valueDk: pi.githubUrl },
    {
      key: 'social.facebook',
      valueEn: pi.facebookUrl,
      valueEs: pi.facebookUrl,
      valueDk: pi.facebookUrl,
    },
    { key: 'stats.years', valueEn: '18', valueEs: '18', valueDk: '18' },
    { key: 'stats.companies', valueEn: '12', valueEs: '12', valueDk: '12' },
    { key: 'stats.technologies', valueEn: '30+', valueEs: '30+', valueDk: '30+' },
    { key: 'stats.lighthouse', valueEn: '98', valueEs: '98', valueDk: '98' },
    { key: 'stats.usersServed', valueEn: '40000+', valueEs: '40000+', valueDk: '40000+' },
    {
      key: 'stats.usersServedLabel',
      valueEn: 'Users served',
      valueEs: 'Usuarios atendidos',
      valueDk: 'Brugere betjent',
    },
    { key: 'stats.migrations', valueEn: '16+', valueEs: '16+', valueDk: '16+' },
    {
      key: 'stats.migrationsLabel',
      valueEn: 'Migrations delivered',
      valueEs: 'Migraciones entregadas',
      valueDk: 'Migrationer leveret',
    },
    { key: 'stats.uptime', valueEn: '99.95', valueEs: '99.95', valueDk: '99.95' },
    { key: 'stats.uptimeLabel', valueEn: 'Uptime', valueEs: 'Disponibilidad', valueDk: 'Oppetid' },
    { key: 'stats.teamsLed', valueEn: '9+', valueEs: '9+', valueDk: '9+' },
    {
      key: 'stats.teamsLedLabel',
      valueEn: 'Teams led',
      valueEs: 'Equipos liderados',
      valueDk: 'Teams ledet',
    },
    {
      key: 'hero.positioningLine1',
      valueEn: 'Frontend Systems',
      valueEs: 'Sistemas Frontend',
      valueDk: 'Frontend-systemer',
    },
    {
      key: 'hero.positioningLine2',
      valueEn: 'Product Engineer.',
      valueEs: 'Product Engineer.',
      valueDk: 'Product Engineer.',
    },
    {
      key: 'hero.positioningDescription',
      valueEn:
        'Product engineer focused on data-intensive interfaces, frontend systems architecture, and measurable product outcomes.',
      valueEs:
        'Ingeniero de producto enfocado en interfaces intensivas en datos, arquitectura frontend y resultados medibles.',
      valueDk:
        'Product engineer med fokus pa dataintensive interfaces, frontend-arkitektur og malbare resultater.',
    },
    {
      key: 'authority.eyebrow',
      valueEn: 'Engineering Authority',
      valueEs: 'Autoridad de Ingenieria',
      valueDk: 'Engineering authority',
    },
    {
      key: 'authority.title',
      valueEn: 'From execution to systems leadership',
      valueEs: 'De ejecucion a liderazgo de sistemas',
      valueDk: 'Fra eksekvering til systemledelse',
    },
    {
      key: 'authority.subtitle',
      valueEn:
        'I design and lead frontend systems for complex products, combining architecture quality with business impact.',
      valueEs:
        'Diseno y lidero sistemas frontend para productos complejos, uniendo arquitectura y resultados de negocio.',
      valueDk:
        'Jeg designer og leder frontend-systemer for komplekse produkter med fokus pa arkitektur og effekt.',
    },
    {
      key: 'authority.principles',
      valueEn:
        'Composition over inheritance for maintainability\nType-safe contracts across domain boundaries\nPerformance budgets as product requirements\nAccessibility-first UI architecture',
      valueEs:
        'Composicion sobre herencia para mantenibilidad\nContratos tipados entre dominios\nPresupuestos de performance como requisito\nArquitectura UI con accesibilidad primero',
      valueDk:
        'Komposition frem for arv for vedligeholdelse\nType-sikre kontrakter mellem domaener\nPerformance-budgetter som produktkrav\nTilgaengelighed forst i UI-arkitektur',
    },
    {
      key: 'authority.architecture',
      valueEn:
        'Domain-driven UI modules, explicit ownership, and typed interfaces that scale across teams.',
      valueEs:
        'Modulos UI por dominio, ownership explicito e interfaces tipadas que escalan entre equipos.',
      valueDk:
        'Domaenedrevet UI, tydeligt ejerskab og type-sikre grenseflader der skalerer pa tværs af teams.',
    },
    {
      key: 'authority.dx',
      valueEn: 'Reusable CRUD workflows, strict conventions, and predictable delivery pipelines.',
      valueEs: 'Workflows CRUD reutilizables, convenciones estrictas y pipelines predecibles.',
      valueDk: 'Genbrugelige CRUD-flow, stramme konventioner og forudsigelige leveringspipelines.',
    },
    {
      key: 'authority.testing',
      valueEn: 'Unit and E2E coverage around critical user journeys, with quality gates in CI.',
      valueEs: 'Cobertura unit y E2E en journeys criticos con quality gates en CI.',
      valueDk: 'Unit- og E2E-daekning omkring kritiske brugerrejser med quality gates i CI.',
    },
    {
      key: 'authority.performance',
      valueEn: 'Rendering strategy, payload control, and instrumentation to keep UX fast at scale.',
      valueEs:
        'Estrategia de renderizado, control de payload e instrumentacion para UX rapida a escala.',
      valueDk: 'Render-strategi, payload-kontrol og instrumentering for hurtig UX i stor skala.',
    },
    {
      key: 'authority.ai',
      valueEn:
        'AI-assisted planning, implementation, and review loops to improve speed without sacrificing rigor.',
      valueEs:
        'Planificacion, implementacion y revision asistidas por IA para mayor velocidad sin perder rigor.',
      valueDk:
        'AI-assisteret planlaegning, implementering og review for mere hastighed uden at miste kvalitet.',
    },
    {
      key: 'authority.notes',
      valueEn:
        'Most frontend failures are architecture failures, not framework failures.\nState management usually reflects domain modeling quality.\nTypeScript increases confidence, but boundaries create resilience.\nPerformance is a UX feature, not a late optimization.',
      valueEs:
        'La mayoria de fallos frontend son de arquitectura, no de framework.\nEl estado suele reflejar la calidad del modelado de dominio.\nTypeScript aumenta confianza, pero los limites crean resiliencia.\nPerformance es una funcionalidad UX, no una optimizacion tardia.',
      valueDk:
        'De fleste frontend-fejl er arkitekturfejl, ikke framework-fejl.\nState management afspejler ofte kvaliteten af domaenemodellering.\nTypeScript giver tillid, men graenser skaber robusthed.\nPerformance er en UX-funktion, ikke en sen optimering.',
    },
    {
      key: 'site.title',
      valueEn: 'Edd Remonts — Senior Frontend Engineer',
      valueEs: 'Edd Remonts — Ingeniero Frontend Senior',
      valueDk: 'Edd Remonts — Senior Frontend Ingeniør',
    },
    {
      key: 'site.description',
      valueEn:
        'Portfolio of Eduardo Inerarte (Edd Remonts), Senior Frontend Engineer based in Copenhagen.',
      valueEs:
        'Portfolio de Eduardo Inerarte (Edd Remonts), Ingeniero Frontend Senior en Copenhague.',
      valueDk: 'Portfolio af Eduardo Inerarte (Edd Remonts), Senior Frontend Ingeniør i København.',
    },
    {
      key: 'site.url',
      valueEn: 'https://eddremonts.dk',
      valueEs: 'https://eddremonts.dk',
      valueDk: 'https://eddremonts.dk',
    },
  ]

  // ── Projects (static) ─────────────────────────────────────────────────────
  const staticProjects = [
    {
      id: 'zunzun',
      title: 'Zunzun.io',
      coverImageUrl: '/projects/zunzun-cover.png',
      link: 'https://www.zunzun.io/',
      category: 'Full Stack',
      featured: false,
      sortOrder: 0,
      translations: [
        { locale: 'en', description: '' },
        { locale: 'es', description: '' },
        { locale: 'dk', description: '' },
      ],
    },
    {
      id: 'hbo-notify',
      title: 'HBO - Be Notified',
      coverImageUrl: '/projects/hbo-notify-cover.png',
      link: 'https://demo-hbo-landing.netlify.app/versions/v1/getnotified/',
      category: 'Frontend',
      featured: false,
      sortOrder: 1,
      translations: [
        { locale: 'en', description: '' },
        { locale: 'es', description: '' },
        { locale: 'dk', description: '' },
      ],
    },
    {
      id: 'voirlematch',
      title: 'Voirlematch.fr',
      coverImageUrl: '/projects/voirlematch-cover.png',
      link: 'https://www.voirlematch.fr/',
      category: 'Frontend',
      featured: false,
      sortOrder: 2,
      translations: [
        { locale: 'en', description: '' },
        { locale: 'es', description: '' },
        { locale: 'dk', description: '' },
      ],
    },
    {
      id: 'hbo-signup',
      title: 'HBO - Sign up',
      coverImageUrl: '/projects/hbo-signup-cover.png',
      link: 'https://demo-hbo-landing.netlify.app/versions/v1/voucher/',
      category: 'Frontend',
      featured: false,
      sortOrder: 3,
      translations: [
        { locale: 'en', description: '' },
        { locale: 'es', description: '' },
        { locale: 'dk', description: '' },
      ],
    },
    {
      id: 'sportal',
      title: 'Sportal.se',
      coverImageUrl: '/projects/sportal-cover.png',
      link: 'https://www.sportal.se/',
      category: 'Full Stack',
      featured: false,
      sortOrder: 4,
      translations: [
        { locale: 'en', description: '' },
        { locale: 'es', description: '' },
        { locale: 'dk', description: '' },
      ],
    },
    {
      id: 'live-fodbold',
      title: 'Live-fodbold.dk',
      coverImageUrl: '/projects/live-fodbold-cover.png',
      link: 'https://www.live-fodbold.dk/',
      category: 'Full Stack',
      featured: false,
      sortOrder: 5,
      translations: [
        { locale: 'en', description: '' },
        { locale: 'es', description: '' },
        { locale: 'dk', description: '' },
      ],
    },
    {
      id: 'radio-guama',
      title: 'Radio Guama',
      coverImageUrl: '/projects/radio-guama-cover.png',
      link: 'http://www.rguama.icrt.cu/',
      category: 'Frontend',
      featured: false,
      sortOrder: 6,
      translations: [
        { locale: 'en', description: '' },
        { locale: 'es', description: '' },
        { locale: 'dk', description: '' },
      ],
    },
    {
      id: 'livefodboldstreams',
      title: 'Livefodboldstreams.dk',
      coverImageUrl: '/projects/livefodboldstreams-cover.png',
      link: 'https://www.livefodboldstreams.dk/',
      category: 'Frontend',
      featured: false,
      sortOrder: 7,
      translations: [
        { locale: 'en', description: '' },
        { locale: 'es', description: '' },
        { locale: 'dk', description: '' },
      ],
    },
    {
      id: 'counties',
      title: 'Counties App',
      coverImageUrl: '/projects/counties-cover.png',
      link: 'https://monosolutiosapps.netlify.app/',
      category: 'Frontend',
      featured: false,
      sortOrder: 8,
      translations: [
        { locale: 'en', description: '' },
        { locale: 'es', description: '' },
        { locale: 'dk', description: '' },
      ],
    },
    {
      id: 'watchonlinehorseracing',
      title: 'Watch Online Horse Racing',
      coverImageUrl: '/projects/watchonlinehorseracing-cover.png',
      link: 'https://www.watchonlinehorseracing.co.uk/',
      category: 'Full Stack',
      featured: false,
      sortOrder: 9,
      translations: [
        { locale: 'en', description: '' },
        { locale: 'es', description: '' },
        { locale: 'dk', description: '' },
      ],
    },
    {
      id: 'sefodbold',
      title: 'Sefodbold.dk',
      coverImageUrl: '/projects/sefodbold-cover.png',
      link: 'https://www.sefodbold.dk/',
      category: 'Frontend',
      featured: false,
      sortOrder: 10,
      translations: [
        { locale: 'en', description: '' },
        { locale: 'es', description: '' },
        { locale: 'dk', description: '' },
      ],
    },
    {
      id: 'windows-terminal',
      title: 'Windows Terminal Config Generator',
      coverImageUrl: '/projects/windows-terminal-cover.jpg',
      link: 'https://windowsterminalsetting.netlify.app/',
      category: 'Full Stack',
      featured: false,
      sortOrder: 11,
      translations: [
        { locale: 'en', description: '' },
        { locale: 'es', description: '' },
        { locale: 'dk', description: '' },
      ],
    },
    {
      id: 'sesport',
      title: 'Sesport',
      coverImageUrl: '/projects/sesport-cover.png',
      link: 'https://www.sesport.dk/fodbold',
      category: 'Frontend',
      featured: false,
      sortOrder: 12,
      translations: [
        { locale: 'en', description: '' },
        { locale: 'es', description: '' },
        { locale: 'dk', description: '' },
      ],
    },
  ]

  await db
    .insert(portfolioProjects)
    .values(staticProjects.map(({ translations: _translations, ...row }) => row))
    .onConflictDoNothing()

  const projectTranslations = staticProjects.flatMap((proj) =>
    proj.translations.map((t) => ({
      projectId: proj.id,
      locale: t.locale,
      description: t.description,
    })),
  )
  await db.insert(portfolioProjectTranslations).values(projectTranslations).onConflictDoNothing()
  console.log(`  ✓ ${staticProjects.length} projects + ${projectTranslations.length} translations`)

  // ── Content blocks insert ──────────────────────────────────────────────────
  await db
    .insert(portfolioContent)
    .values(contentRows.map((r) => ({ ...r, updatedAt: new Date() })))
    .onConflictDoNothing()
  console.log(`  ✓ ${contentRows.length} content blocks`)

  // ── Skills ─────────────────────────────────────────────────────────────────
  // Categorize skills from cv-source.json so the dashboard CRUD has useful
  // grouping out of the box. Icon slugs match TechIcon's known set.
  const SKILL_META: Record<string, { iconSlug?: string; category: string; proficiency?: number }> =
    {
      React: { iconSlug: 'react', category: 'Frontend', proficiency: 5 },
      'Vue.js': { iconSlug: 'vue', category: 'Frontend', proficiency: 5 },
      'Next.js': { iconSlug: 'next', category: 'Frontend', proficiency: 5 },
      'Nuxt.js': { iconSlug: 'nuxt', category: 'Frontend', proficiency: 4 },
      TypeScript: { iconSlug: 'typescript', category: 'Languages', proficiency: 5 },
      JavaScript: { iconSlug: 'javascript', category: 'Languages', proficiency: 5 },
      'Tailwind CSS': { iconSlug: 'tailwind', category: 'Frontend', proficiency: 5 },
      HTML5: { iconSlug: 'html', category: 'Frontend', proficiency: 5 },
      CSS3: { iconSlug: 'css', category: 'Frontend', proficiency: 5 },
      SCSS: { iconSlug: 'sass', category: 'Frontend', proficiency: 4 },
      SASS: { iconSlug: 'sass', category: 'Frontend', proficiency: 4 },
      'Framer Motion': { iconSlug: 'framer', category: 'Frontend', proficiency: 4 },
      'Radix UI': { iconSlug: 'radix', category: 'Frontend', proficiency: 4 },
      'React Hook Form': { iconSlug: 'reacthookform', category: 'Frontend', proficiency: 4 },
      Recharts: { iconSlug: 'recharts', category: 'Frontend', proficiency: 4 },
      i18next: { iconSlug: 'i18next', category: 'Frontend', proficiency: 4 },
      'TanStack Start': { iconSlug: 'tanstack', category: 'Frontend', proficiency: 5 },
      'TanStack Router': { iconSlug: 'tanstack', category: 'Frontend', proficiency: 5 },
      'TanStack Query': { iconSlug: 'tanstack', category: 'Frontend', proficiency: 5 },
      'TanStack Form': { iconSlug: 'tanstack', category: 'Frontend', proficiency: 4 },
      'TanStack Table': { iconSlug: 'tanstack', category: 'Frontend', proficiency: 4 },
      'Node.js': { iconSlug: 'node', category: 'Backend', proficiency: 4 },
      PHP: { iconSlug: 'php', category: 'Backend', proficiency: 4 },
      Laravel: { iconSlug: 'laravel', category: 'Backend', proficiency: 4 },
      Symfony: { iconSlug: 'symfony', category: 'Backend', proficiency: 3 },
      PostgreSQL: { iconSlug: 'postgres', category: 'Database', proficiency: 4 },
      PostGIS: { iconSlug: 'postgis', category: 'Database', proficiency: 3 },
      MySQL: { iconSlug: 'mysql', category: 'Database', proficiency: 4 },
      'Drizzle ORM': { iconSlug: 'drizzle', category: 'Database', proficiency: 4 },
      ChromaDB: { iconSlug: 'chroma', category: 'Database', proficiency: 3 },
      'Better Auth': { iconSlug: 'betterauth', category: 'Backend', proficiency: 4 },
      'Anthropic Claude': { iconSlug: 'anthropic', category: 'AI', proficiency: 4 },
      OpenAI: { iconSlug: 'openai', category: 'AI', proficiency: 4 },
      Ollama: { iconSlug: 'ollama', category: 'AI', proficiency: 3 },
      Stripe: { iconSlug: 'stripe', category: 'Backend', proficiency: 3 },
      'MapLibre GL': { iconSlug: 'maplibre', category: 'Frontend', proficiency: 3 },
      Docker: { iconSlug: 'docker', category: 'Infrastructure', proficiency: 4 },
      Nginx: { iconSlug: 'nginx', category: 'Infrastructure', proficiency: 3 },
      Apache: { iconSlug: 'apache', category: 'Infrastructure', proficiency: 3 },
      Linux: { iconSlug: 'linux', category: 'Infrastructure', proficiency: 4 },
      bash: { iconSlug: 'bash', category: 'Tooling', proficiency: 4 },
      macOS: { iconSlug: 'apple', category: 'Tooling', proficiency: 4 },
      Git: { iconSlug: 'git', category: 'Tooling', proficiency: 5 },
      'GitHub Actions': { iconSlug: 'githubactions', category: 'Tooling', proficiency: 4 },
      Netlify: { iconSlug: 'netlify', category: 'Infrastructure', proficiency: 4 },
      Vitest: { iconSlug: 'vitest', category: 'Testing', proficiency: 4 },
      Playwright: { iconSlug: 'playwright', category: 'Testing', proficiency: 4 },
      Cypress: { iconSlug: 'cypress', category: 'Testing', proficiency: 4 },
      ESLint: { iconSlug: 'eslint', category: 'Tooling', proficiency: 5 },
      Prettier: { iconSlug: 'prettier', category: 'Tooling', proficiency: 5 },
      Vite: { iconSlug: 'vite', category: 'Tooling', proficiency: 5 },
      Zod: { iconSlug: 'zod', category: 'Languages', proficiency: 4 },
      pnpm: { iconSlug: 'pnpm', category: 'Tooling', proficiency: 5 },
      Drupal: { iconSlug: 'drupal', category: 'CMS', proficiency: 3 },
      WordPress: { iconSlug: 'wordpress', category: 'CMS', proficiency: 3 },
      Jira: { iconSlug: 'jira', category: 'Tooling', proficiency: 4 },
      Confluence: { iconSlug: 'confluence', category: 'Tooling', proficiency: 4 },
      Axios: { iconSlug: 'axios', category: 'Frontend', proficiency: 4 },
      'date-fns': { iconSlug: 'datefns', category: 'Frontend', proficiency: 4 },
      Lucide: { iconSlug: 'lucide', category: 'Frontend', proficiency: 4 },
      'DnD Kit': { iconSlug: 'dndkit', category: 'Frontend', proficiency: 3 },
      Clerk: { iconSlug: 'clerk', category: 'Backend', proficiency: 3 },
    }

  const skillRows = cvSource.skills.map((name, index) => {
    const meta = SKILL_META[name] ?? { category: 'General' }
    return {
      id: `skill-${name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')}`,
      name,
      iconSlug: meta.iconSlug ?? null,
      category: meta.category,
      proficiency: meta.proficiency ?? 3,
      visible: true,
      sortOrder: index,
    }
  })

  await db.insert(portfolioSkills).values(skillRows).onConflictDoNothing()
  console.log(`  ✓ ${skillRows.length} skills`)

  // ── Testimonials ───────────────────────────────────────────────────────────
  const testimonialsSeed: Array<{
    id: string
    authorName: string
    authorRole: string
    authorCompany: string
    sortOrder: number
    translations: Array<{ locale: 'en' | 'es' | 'dk'; quote: string }>
  }> = [
    {
      id: 'jonas-warrer',
      authorName: 'Jonas Warrer',
      authorRole: 'Managing Director',
      authorCompany: 'Media Gaming Innovation Group',
      sortOrder: 0,
      translations: [
        {
          locale: 'en',
          quote:
            'Eduardo will be an asset for any company that employs him – in particular tech companies with a multitude of cultures – and he has my highest recommendations.',
        },
        {
          locale: 'es',
          quote:
            'Eduardo será un gran activo para cualquier empresa que lo contrate, en especial para compañías tecnológicas multiculturales. Cuenta con mi más alta recomendación.',
        },
        {
          locale: 'dk',
          quote:
            'Eduardo vil være et aktiv for enhver virksomhed, der ansætter ham – især teknologivirksomheder med en mangfoldighed af kulturer – og han har mine varmeste anbefalinger.',
        },
      ],
    },
    {
      id: 'sarah-braun',
      authorName: 'Sarah Braun',
      authorRole: 'Backend Developer',
      authorCompany: 'GiG',
      sortOrder: 1,
      translations: [
        {
          locale: 'en',
          quote:
            "He can work entirely independently, but also in close cooperation. He has shown that he can deliver a viable product with minimal requirements, substituting what's missing, as well as following extensive requirements closely.",
        },
        {
          locale: 'es',
          quote:
            'Puede trabajar de forma totalmente independiente, pero también en estrecha colaboración. Ha demostrado poder entregar un producto viable con requisitos mínimos, así como seguir de cerca requisitos muy detallados.',
        },
        {
          locale: 'dk',
          quote:
            'Han kan arbejde helt selvstændigt, men også i tæt samarbejde. Han har vist, at han kan levere et levedygtigt produkt med minimale krav, og samtidig følge omfattende krav tæt.',
        },
      ],
    },
    {
      id: 'sergi-torres',
      authorName: 'Sergi Torres',
      authorRole: 'Engineering Lead',
      authorCompany: 'Xarxa de Transmissions Santiago',
      sortOrder: 2,
      translations: [
        {
          locale: 'en',
          quote:
            'Eduardo has been always a focused individual, with the will and focus to learn everything we required from him. The energy he always brought to the workplace was also very valued.',
        },
        {
          locale: 'es',
          quote:
            'Eduardo siempre ha sido una persona enfocada y con una gran voluntad de aprender. Su energía en el lugar de trabajo siempre fue muy valorada.',
        },
        {
          locale: 'dk',
          quote:
            'Eduardo har altid været en fokuseret person med viljen og fokus til at lære alt, vi krævede af ham. Den energi, han altid bragte med på arbejdspladsen, var også meget værdsat.',
        },
      ],
    },
    {
      id: 'naveen-kumar',
      authorName: 'Naveen Kumar Vasudevan',
      authorRole: 'Team Lead',
      authorCompany: 'GiG',
      sortOrder: 3,
      translations: [
        {
          locale: 'en',
          quote:
            'Eduardo Inerarte has exceptional frontend skills, and was our lead frontend developer. He had also been assigned to lead the outsourcing team that handles our legacy sites and he did a commendable job there.',
        },
        {
          locale: 'es',
          quote:
            'Eduardo Inerarte tiene habilidades excepcionales en frontend y fue nuestro desarrollador principal. También se le asignó liderar el equipo que maneja nuestros sitios antiguos e hizo un trabajo encomiable allí.',
        },
        {
          locale: 'dk',
          quote:
            'Eduardo Inerarte har enestående frontend-færdigheder og var vores lead frontend-udvikler. Han blev også sat til at lede outsourcing-teamet, der håndterer vores legacy-sites, og han gjorde et fremragende arbejde der.',
        },
      ],
    },
  ]

  await db
    .insert(portfolioTestimonials)
    .values(
      testimonialsSeed.map((t) => ({
        id: t.id,
        authorName: t.authorName,
        authorRole: t.authorRole,
        authorCompany: t.authorCompany,
        visible: true,
        sortOrder: t.sortOrder,
      })),
    )
    .onConflictDoNothing()

  const testimonialTranslations = testimonialsSeed.flatMap((t) =>
    t.translations.map((tr) => ({ testimonialId: t.id, locale: tr.locale, quote: tr.quote })),
  )
  await db
    .insert(portfolioTestimonialTranslations)
    .values(testimonialTranslations)
    .onConflictDoNothing()
  console.log(
    `  ✓ ${testimonialsSeed.length} testimonials + ${testimonialTranslations.length} translations`,
  )

  await pool.end()
}
main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
