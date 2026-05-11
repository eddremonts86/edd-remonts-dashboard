/**
 * Seed script for edd-remonts-dashboard.
 * Run: pnpm db:seed
 */

import { createId } from '@paralleldrive/cuid2'
import { loadDb } from '@/shared/lib/db/load'
import { portfolioSkills } from '@/shared/lib/db/schema'

const SKILLS = [
  'React', 'Vue.js', 'Next.js', 'Nuxt.js', 'TypeScript', 'JavaScript',
  'Tailwind CSS', 'HTML5', 'CSS3', 'SCSS', 'SASS', 'Node.js', 'PHP',
  'Laravel', 'Symfony', 'MySQL', 'PostgreSQL', 'Nginx', 'Apache', 'Git',
  'GitHub Actions', 'Docker', 'Linux', 'bash', 'macOS', 'Cypress', 'Vitest',
  'Jira', 'Confluence', 'Framer Motion', 'Drupal', 'WordPress',
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
