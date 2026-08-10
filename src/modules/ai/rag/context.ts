import { count } from 'drizzle-orm'
import {
  portfolioContent,
  portfolioExperiences,
  portfolioProjects,
  portfolioServices,
  portfolioSkills,
  portfolioTestimonials,
  users,
} from '@/shared/lib/db/schema'

// ---------------------------------------------------------------------------
// Intent Detection
// ---------------------------------------------------------------------------

// One member per section this dashboard actually has. The list used to carry
// todos, transactions, categories, analytics and team, none of which exist
// here — the assistant was routing people to /dashboard/todos and friends,
// which 404.
type Intent =
  | 'users'
  | 'dashboard'
  | 'portfolio'
  | 'experiences'
  | 'skills'
  | 'projects'
  | 'testimonials'
  | 'services'
  | 'content'
  | 'translations'
  | 'settings'
  | 'help'
  | 'navigation'
  | 'status'

// ---------------------------------------------------------------------------
// Action Detection (CRUD operations)
// ---------------------------------------------------------------------------

type ActionType = 'create' | 'edit' | 'delete'
type ActionEntity =
  | 'user'
  | 'experience'
  | 'skill'
  | 'project'
  | 'testimonial'
  | 'service'
  | 'content'

interface ActionIntent {
  action: ActionType
  entity: ActionEntity
}

const ACTION_KEYWORDS: Record<ActionType, string[]> = {
  create: [
    'crea',
    'crear',
    'create',
    'add',
    'añadir',
    'añade',
    'agregar',
    'agrega',
    'nueva',
    'nuevo',
    'new',
    'registra',
    'registrar',
    'genera',
    'generar',
    'haz',
    'hazme',
    'pon',
    'ponme',
    'make',
  ],
  edit: [
    'edita',
    'editar',
    'edit',
    'update',
    'actualiza',
    'actualizar',
    'modifica',
    'modificar',
    'cambia',
    'cambiar',
    'change',
    'modify',
  ],
  delete: [
    'elimina',
    'eliminar',
    'delete',
    'remove',
    'borra',
    'borrar',
    'quita',
    'quitar',
    'remueve',
    'remover',
  ],
}

const ENTITY_KEYWORDS: Record<ActionEntity, string[]> = {
  user: ['usuario', 'usuarios', 'user', 'users', 'miembro', 'member'],
  experience: ['experiencia', 'experiencias', 'experience', 'experiences', 'empleo', 'job', 'cargo'],
  skill: ['habilidad', 'habilidades', 'skill', 'skills', 'tecnología', 'tecnologia', 'technology'],
  project: ['proyecto', 'proyectos', 'project', 'projects'],
  testimonial: ['testimonio', 'testimonios', 'testimonial', 'testimonials', 'reseña', 'review'],
  service: ['servicio', 'servicios', 'service', 'services'],
  content: ['contenido', 'bloque', 'bloques', 'content block', 'content'],
}

function detectActionIntent(query: string): ActionIntent | null {
  const lowerQuery = query.toLowerCase()

  let detectedAction: ActionType | null = null
  let detectedEntity: ActionEntity | null = null

  for (const [action, keywords] of Object.entries(ACTION_KEYWORDS)) {
    if (keywords.some((kw) => lowerQuery.includes(kw))) {
      detectedAction = action as ActionType
      break
    }
  }

  if (!detectedAction) return null

  for (const [entity, keywords] of Object.entries(ENTITY_KEYWORDS)) {
    if (keywords.some((kw) => lowerQuery.includes(kw))) {
      detectedEntity = entity as ActionEntity
      break
    }
  }

  if (!detectedEntity) return null

  return { action: detectedAction, entity: detectedEntity }
}

// ---------------------------------------------------------------------------

const INTENT_KEYWORDS: Record<Intent, string[]> = {
  users: [
    'user',
    'usuario',
    'usuarios',
    'admin',
    'administrador',
    'rol',
    'role',
    'miembro',
    'member',
  ],
  portfolio: ['portafolio', 'portfolio', 'sitio público', 'sitio publico', 'public site'],
  experiences: [
    'experiencia',
    'experiencias',
    'experience',
    'experiences',
    'empleo',
    'empleos',
    'job',
    'jobs',
    'cargo',
    'puesto',
    'trayectoria',
    'career',
    'historial',
  ],
  skills: [
    'habilidad',
    'habilidades',
    'skill',
    'skills',
    'tecnología',
    'tecnologia',
    'tecnologías',
    'tecnologias',
    'technology',
    'technologies',
    'stack',
  ],
  testimonials: [
    'testimonio',
    'testimonios',
    'testimonial',
    'testimonials',
    'reseña',
    'resena',
    'review',
    'reviews',
    'recomendación',
    'recomendacion',
  ],
  services: ['servicio', 'servicios', 'service', 'services', 'oferta', 'offering'],
  content: [
    'contenido',
    'bloque',
    'bloques',
    'content',
    'copy',
    'texto',
    'textos',
    'hero',
    'sobre mí',
    'sobre mi',
    'about',
  ],
  translations: [
    'traducción',
    'traduccion',
    'traducciones',
    'translation',
    'translations',
    'traducir',
    'translate',
    'danés',
    'danes',
    'danish',
    'español',
    'espanol',
    'spanish',
    'inglés',
    'ingles',
    'english',
  ],
  dashboard: [
    'dashboard',
    'panel',
    'inicio',
    'home',
    'estadísticas',
    'estadisticas',
    'stats',
    'contador',
    'contadores',
    'counter',
    'counters',
    'cuántos',
    'cuantos',
    'how many',
    'total',
    'totales',
    'resumen',
    'overview',
  ],
  projects: ['project', 'projects', 'proyecto', 'proyectos'],
  settings: [
    'settings',
    'configuración',
    'configuracion',
    'ajustes',
    'idioma',
    'language',
    'tema',
    'theme',
    'dark',
    'light',
    'oscuro',
    'claro',
  ],
  help: ['help', 'ayuda', 'asistente', 'assistant', 'chat', 'ia', 'ai'],
  navigation: [
    'donde',
    'dónde',
    'where',
    'cómo llego',
    'como llego',
    'how to find',
    'navigate',
    'navegar',
    'ir a',
    'go to',
    'página',
    'pagina',
    'page',
    'sección',
    'seccion',
    'section',
    'menú',
    'menu',
    'sidebar',
    'barra lateral',
    'ver lista',
    'ver la lista',
    'ver los',
    'ver las',
    'lista de',
    'encontrar',
    'find',
    'acceder',
    'access',
    'abrir',
    'open',
    'mostrar',
    'show',
    'url',
    'enlace',
    'link',
  ],
  status: ['status', 'estado', 'system', 'sistema', 'health', 'salud'],
}

function detectIntent(query: string): Intent[] {
  const intents: Intent[] = []
  const lowerQuery = query.toLowerCase()

  for (const [intent, keywords] of Object.entries(INTENT_KEYWORDS)) {
    if (keywords.some((kw) => lowerQuery.includes(kw))) {
      intents.push(intent as Intent)
    }
  }

  return intents
}

// ---------------------------------------------------------------------------
// Application Knowledge Base (always injected as base context)
// ---------------------------------------------------------------------------

interface AppKnowledge {
  navigation: {
    main: Array<{
      label: string
      labelEs: string
      url: string
      description?: string
      descriptionEs?: string
    }>
    secondary: Array<{
      label: string
      labelEs: string
      url?: string
      action?: string
    }>
  }
  pages: Record<
    string,
    {
      title: string
      titleEs: string
      features: string[]
      actions?: string[]
    }
  >
  commonQuestions: {
    whereToFind: Record<string, string>
    howTo: Record<string, string>
  }
}

let cachedKnowledge: AppKnowledge | null = null

async function resolveKnowledgePath() {
  const { resolveAiDataFilePath } = await import('@/modules/ai/server/data-paths')
  return resolveAiDataFilePath('app-knowledge.json')
}

async function loadAppKnowledge(): Promise<AppKnowledge | null> {
  if (cachedKnowledge) return cachedKnowledge

  try {
    const fsModule = 'node:fs/promises'
    const { default: fs } = await import(/* @vite-ignore */ fsModule)

    const knowledgePath = await resolveKnowledgePath()
    const content = await fs.readFile(knowledgePath, 'utf-8')
    const data = JSON.parse(content)
    cachedKnowledge = data as AppKnowledge
    return cachedKnowledge
  } catch {
    return null
  }
}

function buildAppNavigationContext(knowledge: AppKnowledge, locale: string): string {
  const isSpanish = locale.startsWith('es')
  const lines = ['[Application Navigation — Available Pages]']

  for (const item of knowledge.navigation.main) {
    const label = isSpanish ? item.labelEs : item.label
    const desc = isSpanish ? (item.descriptionEs ?? item.description) : item.description
    const suffix = desc ? ` — ${desc}` : ''
    lines.push(`• ${label}: ${item.url}${suffix}`)
  }

  for (const item of knowledge.navigation.secondary) {
    const label = isSpanish ? item.labelEs : item.label
    if (item.url) {
      lines.push(`• ${label}: ${item.url}`)
    } else if (item.action) {
      lines.push(`• ${label}: ${item.action}`)
    }
  }

  return lines.join('\n')
}

function buildPageContext(knowledge: AppKnowledge, pageUrl: string, locale: string): string {
  const page = knowledge.pages[pageUrl]
  if (!page) return ''

  const isSpanish = locale.startsWith('es')
  const title = isSpanish ? page.titleEs : page.title
  const lines = [`[Page: ${title} (${pageUrl})]`]
  lines.push(`Features: ${page.features.join('; ')}`)
  if (page.actions) {
    lines.push(`Available actions: ${page.actions.join(', ')}`)
  }
  return lines.join('\n')
}

function buildCommonAnswersContext(knowledge: AppKnowledge, intents: Intent[]): string {
  const lines: string[] = []

  // Map intents to whereToFind keys
  const intentToKey: Partial<Record<Intent, string>> = {
    users: 'users',
    dashboard: 'dashboard',
    portfolio: 'portfolio',
    experiences: 'experiences',
    skills: 'skills',
    projects: 'projects',
    testimonials: 'testimonials',
    services: 'services',
    content: 'content',
    translations: 'translations',
    settings: 'settings',
    help: 'help',
  }

  for (const intent of intents) {
    const key = intentToKey[intent]
    if (key && knowledge.commonQuestions.whereToFind[key]) {
      lines.push(knowledge.commonQuestions.whereToFind[key])
    }
  }

  return lines.length > 0 ? `[Quick Answers]\n${lines.join('\n')}` : ''
}

// ---------------------------------------------------------------------------
// Dynamic Context (data from DB)
// ---------------------------------------------------------------------------

/**
 * What the assistant can count, and where the user goes to see it.
 *
 * Counts only. The previous version pushed up to ten users' names and email
 * addresses into the prompt, which then travelled to whichever provider is
 * configured in /dashboard/settings/ia_config — OpenAI, Anthropic or MiniMax.
 * A total answers "how many users do I have" just as well without sending
 * anyone's address to a third party.
 */
const COUNT_SOURCES = [
  { intent: 'users' as const, label: 'Users', url: '/dashboard/users', table: users },
  {
    intent: 'experiences' as const,
    label: 'Experiences',
    url: '/dashboard/portfolio/experiences',
    table: portfolioExperiences,
  },
  {
    intent: 'projects' as const,
    label: 'Projects',
    url: '/dashboard/portfolio/projects',
    table: portfolioProjects,
  },
  {
    intent: 'skills' as const,
    label: 'Skills',
    url: '/dashboard/portfolio/skills',
    table: portfolioSkills,
  },
  {
    intent: 'testimonials' as const,
    label: 'Testimonials',
    url: '/dashboard/portfolio/testimonials',
    table: portfolioTestimonials,
  },
  {
    intent: 'services' as const,
    label: 'Services',
    url: '/dashboard/portfolio/services',
    table: portfolioServices,
  },
  {
    intent: 'content' as const,
    label: 'Content blocks',
    url: '/dashboard/portfolio/content',
    table: portfolioContent,
  },
]

/** Asking about the portfolio as a whole means asking about all of its sections. */
const PORTFOLIO_INTENTS: Intent[] = [
  'experiences',
  'projects',
  'skills',
  'testimonials',
  'services',
  'content',
]

async function fetchDynamicContext(intents: Intent[]): Promise<string | null> {
  const wide = intents.includes('portfolio') || intents.includes('dashboard')
  const wanted = COUNT_SOURCES.filter(
    (source) =>
      intents.includes(source.intent) || (wide && PORTFOLIO_INTENTS.includes(source.intent)),
  )
  if (intents.includes('dashboard') && !wanted.some((s) => s.intent === 'users')) {
    wanted.unshift(COUNT_SOURCES[0])
  }

  const sections: string[] = []

  try {
    if (wanted.length > 0) {
      // Use the explicit /index subpath to bypass vite.config.ts's
      // browser-stub alias (see src/shared/lib/db/load.ts for details).
      const { getDb } = await import('@/shared/lib/db/index')
      const db = getDb()

      const rows = await Promise.all(
        wanted.map(async (source) => {
          const result = await db.select({ total: count() }).from(source.table)
          const total = Number(result?.[0]?.total ?? 0)
          return `${source.label}: ${total} — see ${source.url}`
        }),
      )

      sections.push(['[Live Counts — read from the database for this question]', ...rows].join('\n'))
    }

    if (intents.includes('status')) {
      sections.push(
        [
          `[System Status]`,
          `Time: ${new Date().toISOString()}`,
          `Environment: ${process.env.NODE_ENV}`,
        ].join('\n'),
      )
    }

    return sections.length > 0 ? sections.join('\n\n') : null
  } catch (error) {
    console.error('Error fetching dynamic context from DB:', error)
    return null
  }
}

// ---------------------------------------------------------------------------
// Action Instructions (injected when user wants to perform an action)
// ---------------------------------------------------------------------------

/**
 * Where each kind of record is actually created and edited.
 *
 * This used to hand the model a JSON schema per entity and tell it to emit a
 * fenced ```action block, then promise the user a confirmation button. Nothing
 * ever parsed that fence and no such button exists anywhere in the app, so the
 * assistant was reliably promising a control the user could not find. Pointing
 * at the page that does the job is the honest answer, and it works today.
 */
const ENTITY_PAGES: Record<ActionEntity, { label: string; url: string }> = {
  user: { label: 'user', url: '/dashboard/users' },
  experience: { label: 'experience', url: '/dashboard/portfolio/experiences' },
  skill: { label: 'skill', url: '/dashboard/portfolio/skills' },
  project: { label: 'project', url: '/dashboard/portfolio/projects' },
  testimonial: { label: 'testimonial', url: '/dashboard/portfolio/testimonials' },
  service: { label: 'service', url: '/dashboard/portfolio/services' },
  content: { label: 'content block', url: '/dashboard/portfolio/content' },
}

const ACTION_WORDS: Record<ActionType, { gerund: string; past: string }> = {
  create: { gerund: 'creating', past: 'created' },
  edit: { gerund: 'editing', past: 'edited' },
  delete: { gerund: 'deleting', past: 'deleted' },
}

/** The prompt is English; this only tells the model which language to answer in. */
function replyLanguage(locale: string): string {
  if (locale.startsWith('es')) return 'Spanish'
  if (locale.startsWith('dk') || locale.startsWith('da')) return 'Danish'
  return 'English'
}

function buildActionInstructions(actionIntent: ActionIntent, locale: string): string {
  const entity = ENTITY_PAGES[actionIntent.entity]
  const words = ACTION_WORDS[actionIntent.action]

  return [
    `[ACTION REQUESTED]`,
    // "asking about" rather than "wants to": "where do I edit my testimonials?"
    // trips the same keywords as "edit my testimonial", and the honest answer
    // to both is the same page. No need to guess which one they meant.
    `The user is asking about ${words.gerund} a ${entity.label}.`,
    `The chat has no write access to the database, so you cannot do it for them.`,
    `Tell them to go to ${entity.url}, which is where a ${entity.label} is ${words.past}, and walk them through it.`,
    `Do not invent a confirmation button and do not emit an "action" code block. Neither exists.`,
    actionIntent.action === 'delete'
      ? `Warn them that deleting is permanent and also removes the record from the public site.`
      : `Portfolio records carry English, Spanish and Danish text; point at /dashboard/portfolio/translations if the change affects copy.`,
    `Answer in ${replyLanguage(locale)}.`,
  ].join('\n')
}

// ---------------------------------------------------------------------------
// Main Export
// ---------------------------------------------------------------------------

export async function injectDynamicContext(query: string, locale: string = 'en'): Promise<string> {
  const intents = detectIntent(query)
  const actionIntent = detectActionIntent(query)
  const contextParts: string[] = []

  try {
    // 1. Always inject app navigation context so the AI knows about the app structure
    const knowledge = await loadAppKnowledge()
    if (knowledge) {
      contextParts.push(buildAppNavigationContext(knowledge, locale))

      // If asking about navigation or "where to find", add quick answers
      if (intents.includes('navigation') || intents.length > 0) {
        const quickAnswers = buildCommonAnswersContext(knowledge, intents)
        if (quickAnswers) contextParts.push(quickAnswers)
      }

      // Add specific page context for matched intents
      const intentToUrl: Partial<Record<Intent, string>> = {
        dashboard: '/dashboard',
        users: '/dashboard/users',
        portfolio: '/dashboard/portfolio',
        experiences: '/dashboard/portfolio/experiences',
        skills: '/dashboard/portfolio/skills',
        projects: '/dashboard/portfolio/projects',
        testimonials: '/dashboard/portfolio/testimonials',
        services: '/dashboard/portfolio/services',
        content: '/dashboard/portfolio/content',
        translations: '/dashboard/portfolio/translations',
        settings: '/dashboard/settings',
        help: '/dashboard/help',
      }

      for (const intent of intents) {
        const url = intentToUrl[intent]
        if (url) {
          const pageCtx = buildPageContext(knowledge, url, locale)
          if (pageCtx) contextParts.push(pageCtx)
        }
      }
    }

    // 2. Inject dynamic data from DB for data-related intents
    if (intents.length > 0) {
      const dataCtx = await fetchDynamicContext(intents)
      if (dataCtx) contextParts.push(dataCtx)
    }

    // 3. Inject action instructions when user wants to perform a CRUD operation
    if (actionIntent) {
      const actionInstructions = buildActionInstructions(actionIntent, locale)
      if (actionInstructions) contextParts.push(actionInstructions)
    }
  } catch (error) {
    console.error('Error injecting dynamic context:', error)
  }

  return contextParts.join('\n\n')
}

// Export for testing
export {
  buildActionInstructions,
  buildAppNavigationContext,
  detectActionIntent,
  detectIntent,
  fetchDynamicContext,
  loadAppKnowledge,
}
export type { ActionEntity, ActionIntent, ActionType, AppKnowledge, Intent }
