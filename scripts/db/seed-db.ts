/**
 * Seed script for edd-remonts-dashboard.
 * Run: pnpm db:seed
 */

import { createId } from '@paralleldrive/cuid2'
import { loadDb } from '@/shared/lib/db/load'
import { portfolioSkills } from '@/shared/lib/db/schema'

const SKILLS = [
  // Frontend
  'React', 'Vue.js', 'Next.js', 'Nuxt.js', 'TypeScript', 'JavaScript',
  'Tailwind CSS', 'HTML5', 'CSS3', 'SCSS', 'SASS', 'Framer Motion',
  'Radix UI', 'React Hook Form', 'Recharts', 'i18next',
  // Full-stack / meta-frameworks
  'TanStack Start', 'TanStack Router', 'TanStack Query', 'TanStack Form', 'TanStack Table',
  // Backend & runtime
  'Node.js', 'PHP', 'Laravel', 'Symfony',
  // Databases & ORM
  'PostgreSQL', 'PostGIS', 'MySQL', 'Drizzle ORM', 'ChromaDB',
  // Auth
  'Better Auth',
  // AI / LLM
  'Anthropic Claude', 'OpenAI', 'Ollama',
  // Payments
  'Stripe',
  // Maps
  'MapLibre GL',
  // Infra & DevOps
  'Docker', 'Nginx', 'Apache', 'Linux', 'bash', 'macOS',
  'Git', 'GitHub Actions', 'Netlify',
  // Testing & quality
  'Vitest', 'Playwright', 'Cypress', 'ESLint', 'Prettier',
  // Tooling
  'Vite', 'Zod', 'pnpm',
  // CMS & legacy
  'Drupal', 'WordPress',
  // Project management
  'Jira', 'Confluence',
  // HTTP & utilities
  'Axios', 'date-fns', 'Lucide', 'DnD Kit',
  // Auth (additional)
  'Clerk',
]

async function main() {
  const db = await loadDb()

  // Skills
  const existing = await db.select({ name: portfolioSkills.name }).from(portfolioSkills)
  const existingNames = new Set(existing.map((s) => s.name))
  const toInsert = SKILLS.filter((name) => !existingNames.has(name))

  if (toInsert.length > 0) {
    await db.insert(portfolioSkills).values(
      toInsert.map((name, i) => ({
        id: createId(),
        name,
        visible: true,
        sortOrder: existingNames.size + i,
      })),
    )
    console.log(`Seeded ${toInsert.length} skills.`)
  } else {
    console.log('Skills already seeded, skipping.')
  }

  console.log('Seed complete.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
