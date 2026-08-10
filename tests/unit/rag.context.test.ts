import { readdirSync } from 'node:fs'
import { join } from 'node:path'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  buildActionInstructions,
  buildAppNavigationContext,
  detectActionIntent,
  detectIntent,
  injectDynamicContext,
  loadAppKnowledge,
} from '@/modules/ai/rag/context'

// db.select({ total: count() }).from(table) resolves to [{ total }].
vi.mock('@/shared/lib/db', () => {
  const mockDb = { select: vi.fn(() => ({ from: vi.fn().mockResolvedValue([{ total: 0 }]) })) }
  return { db: mockDb, getDb: vi.fn(() => mockDb) }
})

vi.mock('@/shared/lib/db/schema', () => ({
  users: { name: 'users' },
  portfolioExperiences: { name: 'portfolio_experiences' },
  portfolioProjects: { name: 'portfolio_projects' },
  portfolioSkills: { name: 'portfolio_skills' },
  portfolioTestimonials: { name: 'portfolio_testimonials' },
  portfolioServices: { name: 'portfolio_services' },
  portfolioContent: { name: 'portfolio_content' },
}))

vi.mock('drizzle-orm', () => ({ count: vi.fn(), desc: vi.fn() }))

beforeEach(() => {
  vi.clearAllMocks()
})

// ---------------------------------------------------------------------------
// The guard that matters
// ---------------------------------------------------------------------------

/** Every /dashboard URL the router will actually serve, read off the filesystem. */
function realDashboardRoutes(): Set<string> {
  const root = join(process.cwd(), 'src/routes/_dashboard')
  const urls = new Set<string>()

  const walk = (dir: string, prefix: string) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (entry.name.startsWith('-')) continue // layout-private components
      if (entry.isDirectory()) {
        walk(join(dir, entry.name), `${prefix}/${entry.name}`)
        continue
      }
      if (!entry.name.endsWith('.tsx')) continue
      if (entry.name === 'route.tsx') continue // pathless layout, not a page
      const base = entry.name.replace(/\.tsx$/, '')
      urls.add(base === 'index' ? prefix : `${prefix}/${base}`)
    }
  }

  walk(root, '')
  return urls
}

describe('app knowledge describes the app that exists', () => {
  // The knowledge base shipped from a template and still described Acme Inc:
  // todos, transactions, categories, analytics, a team page. None of them are
  // routes here, so the assistant spent every conversation sending people to
  // URLs that 404. Nothing caught it, because nothing compared the two.
  it('references no page the router cannot serve', async () => {
    const knowledge = await loadAppKnowledge()
    const real = realDashboardRoutes()

    const referenced = [
      ...knowledge!.navigation.main.map((item) => item.url),
      ...knowledge!.navigation.secondary.map((item) => item.url),
      ...Object.keys(knowledge!.pages),
    ].filter((url): url is string => typeof url === 'string' && url.startsWith('/dashboard'))

    expect(referenced.length).toBeGreaterThan(10)
    expect(referenced.filter((url) => !real.has(url))).toEqual([])
  })

  it('describes every route the router serves', async () => {
    const knowledge = await loadAppKnowledge()
    const documented = new Set(Object.keys(knowledge!.pages))
    expect([...realDashboardRoutes()].filter((url) => !documented.has(url))).toEqual([])
  })

  it('points every quick answer at a real page', async () => {
    const knowledge = await loadAppKnowledge()
    const real = realDashboardRoutes()
    const answers = Object.values(knowledge!.commonQuestions.whereToFind)

    const cited = answers.flatMap((answer) => answer.match(/\/dashboard[\w/-]*/g) ?? [])
    expect(cited.length).toBeGreaterThan(5)
    expect(cited.filter((url) => !real.has(url))).toEqual([])
  })

  it('carries bilingual labels for every nav item', async () => {
    const knowledge = await loadAppKnowledge()
    for (const item of knowledge!.navigation.main) {
      expect(item.label.length).toBeGreaterThan(0)
      expect(item.labelEs.length).toBeGreaterThan(0)
    }
  })
})

// ---------------------------------------------------------------------------
// Intent detection
// ---------------------------------------------------------------------------

describe('detectIntent', () => {
  it('detects users in English and Spanish', () => {
    expect(detectIntent('How many users are registered?')).toContain('users')
    expect(detectIntent('Cuantos usuarios hay?')).toContain('users')
  })

  it('detects each portfolio section', () => {
    expect(detectIntent('show my work experience')).toContain('experiences')
    expect(detectIntent('que proyectos tengo?')).toContain('projects')
    expect(detectIntent('list my skills')).toContain('skills')
    expect(detectIntent('los testimonios de clientes')).toContain('testimonials')
    expect(detectIntent('what services do I offer?')).toContain('services')
    expect(detectIntent('quiero traducir al danés')).toContain('translations')
  })

  it('detects navigation questions in both languages', () => {
    expect(detectIntent('Donde puedo ver los usuarios?')).toContain('navigation')
    expect(detectIntent('Where can I find the settings?')).toContain('navigation')
  })

  it('detects settings and help', () => {
    expect(detectIntent('cambiar el idioma en ajustes')).toContain('settings')
    expect(detectIntent('open the AI assistant')).toContain('help')
  })

  it('detects several intents in one question', () => {
    const intents = detectIntent('Donde veo mis proyectos y usuarios?')
    expect(intents).toContain('navigation')
    expect(intents).toContain('projects')
    expect(intents).toContain('users')
  })

  it('returns nothing for unrelated questions', () => {
    expect(detectIntent('What is the capital of France?')).toEqual([])
    expect(detectIntent('')).toEqual([])
  })
})

// ---------------------------------------------------------------------------
// Context assembly
// ---------------------------------------------------------------------------

describe('injectDynamicContext', () => {
  it('always describes the app structure', async () => {
    const context = await injectDynamicContext('Donde estan mis proyectos?', 'es')
    expect(context).toContain('/dashboard')
    expect(context).toContain('/dashboard/portfolio/projects')
    expect(context).toContain('/dashboard/users')
  })

  it('answers in the requested language', async () => {
    expect(await injectDynamicContext('Muestra el panel de control', 'es')).toContain(
      'Panel de Control',
    )
    expect(await injectDynamicContext('Show me the dashboard', 'en')).toContain('Dashboard')
  })

  it('adds live counts for data questions', async () => {
    const context = await injectDynamicContext('How many projects do I have?', 'en')
    expect(context).toContain('[Live Counts')
    expect(context).toContain('Projects:')
    expect(context).toContain('/dashboard/portfolio/projects')
  })

  it('counts every portfolio section when asked about the portfolio as a whole', async () => {
    const context = await injectDynamicContext('give me an overview of my portfolio', 'en')
    for (const label of ['Experiences:', 'Projects:', 'Skills:', 'Testimonials:']) {
      expect(context).toContain(label)
    }
  })

  it('never puts user names or emails in the prompt', async () => {
    // Counts travel to whichever provider is configured; personal data must not.
    const context = await injectDynamicContext('list all users', 'en')
    expect(context).toContain('Users:')
    expect(context).not.toMatch(/@[\w.-]+\.\w+/)
  })

  it('adds quick answers for navigation questions', async () => {
    const context = await injectDynamicContext('Where can I manage my skills?', 'en')
    expect(context).toContain('Quick Answers')
    expect(context).toContain('/dashboard/portfolio/skills')
  })

  it('adds the page detail for a matched section', async () => {
    const context = await injectDynamicContext('What can I do with testimonials?', 'en')
    expect(context).toContain('[Page: Testimonials (/dashboard/portfolio/testimonials)]')
    expect(context).toContain('Features:')
  })
})

describe('buildAppNavigationContext', () => {
  it('uses Spanish labels for es', async () => {
    const knowledge = await loadAppKnowledge()
    const context = buildAppNavigationContext(knowledge!, 'es')
    expect(context).toContain('Panel de Control')
    expect(context).toContain('Portafolio')
    expect(context).toContain('/dashboard/portfolio/experiences')
  })

  it('uses English labels for en', async () => {
    const knowledge = await loadAppKnowledge()
    const context = buildAppNavigationContext(knowledge!, 'en')
    expect(context).toContain('Dashboard')
    expect(context).toContain('Portfolio')
    expect(context).not.toContain('Panel de Control')
  })
})

// ---------------------------------------------------------------------------
// Action intent
// ---------------------------------------------------------------------------

describe('detectActionIntent', () => {
  it('detects create for real entities', () => {
    expect(detectActionIntent('crea un proyecto nuevo')).toEqual({
      action: 'create',
      entity: 'project',
    })
    expect(detectActionIntent('add a testimonial')).toEqual({
      action: 'create',
      entity: 'testimonial',
    })
    expect(detectActionIntent('añadir un usuario')).toEqual({ action: 'create', entity: 'user' })
  })

  it('detects edit and delete', () => {
    expect(detectActionIntent('actualiza mi experiencia')).toEqual({
      action: 'edit',
      entity: 'experience',
    })
    expect(detectActionIntent('delete that service')).toEqual({
      action: 'delete',
      entity: 'service',
    })
  })

  // ACTION_KEYWORDS is wide on purpose — people ask in two languages and rarely
  // use the verb the schema was named after. Each of these is a distinct entry.
  it.each([
    ['crea un proyecto', 'create'],
    ['agrega un proyecto', 'create'],
    ['registra un proyecto', 'create'],
    ['hazme un proyecto', 'create'],
    ['nuevo proyecto', 'create'],
    ['make a project', 'create'],
    ['edita el proyecto', 'edit'],
    ['modifica el proyecto', 'edit'],
    ['cambia el proyecto', 'edit'],
    ['update the project', 'edit'],
    ['borra el proyecto', 'delete'],
    ['quita el proyecto', 'delete'],
    ['elimina el proyecto', 'delete'],
    ['remove the project', 'delete'],
  ])('reads "%s" as %s', (query, action) => {
    expect(detectActionIntent(query)).toEqual({ action, entity: 'project' })
  })

  it('returns null without both an action and an entity', () => {
    expect(detectActionIntent('cuantos proyectos tengo?')).toBeNull()
    expect(detectActionIntent('crear algo')).toBeNull()
    expect(detectActionIntent('donde estan los proyectos?')).toBeNull()
    expect(detectActionIntent('')).toBeNull()
  })
})

describe('buildActionInstructions', () => {
  it('sends the user to the page that owns the record', () => {
    const text = buildActionInstructions({ action: 'create', entity: 'project' }, 'en')
    expect(text).toContain('/dashboard/portfolio/projects')
    expect(text).toContain('create')
  })

  it.each([
    ['es', 'Spanish'],
    ['dk', 'Danish'],
    ['en', 'English'],
  ])('tells the model to answer %s callers in %s', (locale, language) => {
    // The block itself stays English: it is a prompt, not user-facing copy.
    // It used to splice Spanish nouns into English sentences ("wants to crear
    // a proyecto"), which is exactly the register confusion it should prevent.
    const text = buildActionInstructions({ action: 'create', entity: 'testimonial' }, locale)
    expect(text).toContain(`Answer in ${language}.`)
    expect(text).toContain('/dashboard/portfolio/testimonials')
  })

  it('never promises a confirmation button', () => {
    // There is no action-fence parser and no button in the UI. Promising one
    // is how the assistant used to end every create request.
    for (const action of ['create', 'edit', 'delete'] as const) {
      const text = buildActionInstructions({ action, entity: 'project' }, 'en')
      expect(text).not.toContain('```action')
      expect(text).not.toMatch(/click the button/i)
    }
  })

  it('warns that deleting reaches the public site', () => {
    const text = buildActionInstructions({ action: 'delete', entity: 'project' }, 'en')
    expect(text).toMatch(/permanent/i)
    expect(text).toMatch(/public site/i)
  })
})

describe('injectDynamicContext with actions', () => {
  it('routes a create request to its page', async () => {
    const context = await injectDynamicContext('crea un proyecto nuevo llamado GeoLocal', 'es')
    expect(context).toContain('[ACTION REQUESTED]')
    expect(context).toContain('/dashboard/portfolio/projects')
  })

  it('stays quiet for questions that ask for nothing', async () => {
    const context = await injectDynamicContext('cuantos proyectos tengo?', 'es')
    expect(context).not.toContain('[ACTION REQUESTED]')
  })
})
