/**
 * Portfolio bootstrap doctor.
 *
 * Verifies — after a seed cycle — that the portfolio data is consistent and
 * complete. Prevents regressions like "Tech Arsenal vacío" or "Loading
 * testimonials..." that come from forgetting to wire a new data source.
 *
 * Checks:
 *   1. every skill listed in cv-source.json has a `techIconMap` entry
 *   2. every techIconMap path points to an existing svg in `public/tech-icons`
 *      (or to the canonical `default-tech.svg` fallback)
 *   3. every critical portfolio table has at least one row in the DB
 *
 * Exit codes:
 *   0  — everything healthy
 *   1  — at least one check failed
 *
 * Run with:  pnpm db:doctor
 */
import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import * as dotenv from 'dotenv'
import pg from 'pg'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..', '..')

if (existsSync(join(ROOT, '.env.development'))) {
  dotenv.config({ path: join(ROOT, '.env.development') })
} else {
  dotenv.config({ path: join(ROOT, '.env') })
}

interface CvSource {
  skills: string[]
}

interface DoctorIssue {
  level: 'error' | 'warning'
  message: string
}

const issues: DoctorIssue[] = []

function error(message: string) {
  issues.push({ level: 'error', message })
}

function warn(message: string) {
  issues.push({ level: 'warning', message })
}

async function loadJson<T>(path: string): Promise<T> {
  const raw = await readFile(path, 'utf8')
  return JSON.parse(raw) as T
}

/** Load techIconMap by importing the actual module (single source of truth). */
async function loadTechIconMap(): Promise<Map<string, string>> {
  const mod = (await import(
    pathToFileURL(join(ROOT, 'src/portfolio/data/techIcons.ts')).href
  )) as { techIconMap: Record<string, string> }
  return new Map(Object.entries(mod.techIconMap))
}

async function checkSkillIcons() {
  const cv = await loadJson<CvSource>(join(ROOT, 'scripts/db/data/cv-source.json'))
  const iconMap = await loadTechIconMap()

  const iconsDir = join(ROOT, 'public/tech-icons')
  const defaultIcon = 'default-tech.svg'

  for (const skill of cv.skills) {
    const path = iconMap.get(skill)
    if (!path) {
      error(`Skill "${skill}" is missing from techIconMap (will render the fallback).`)
      continue
    }
    const fileName = path.replace(/^\/tech-icons\//, '')
    if (!existsSync(join(iconsDir, fileName))) {
      error(
        `Skill "${skill}" → "${path}" references a non-existent SVG. ` +
          `Add the file or point to "/tech-icons/${defaultIcon}".`,
      )
    } else if (fileName === defaultIcon) {
      warn(`Skill "${skill}" falls back to default-tech.svg (no dedicated icon).`)
    }
  }
}

interface TableCheck {
  name: string
  table: string
  expected: number
}

const REQUIRED_TABLES: TableCheck[] = [
  { name: 'experiences', table: 'portfolio_experiences', expected: 1 },
  { name: 'projects', table: 'portfolio_projects', expected: 1 },
  { name: 'skills', table: 'portfolio_skills', expected: 1 },
  { name: 'testimonials', table: 'portfolio_testimonials', expected: 1 },
  { name: 'content blocks', table: 'portfolio_content', expected: 1 },
]

async function checkDbRows() {
  if (!process.env.DATABASE_URL) {
    error('DATABASE_URL is not set; cannot inspect the database.')
    return
  }

  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })
  try {
    for (const check of REQUIRED_TABLES) {
      try {
        const res = await pool.query<{ count: string }>(
          `SELECT COUNT(*)::text AS count FROM ${check.table}`,
        )
        const count = Number(res.rows[0]?.count ?? 0)
        if (count < check.expected) {
          error(
            `Table "${check.table}" has ${count} rows (expected ≥ ${check.expected}). ` +
              `Run "pnpm db:seed:portfolio".`,
          )
        } else {
          console.log(`  ✓ ${check.name.padEnd(15)} (${count} rows)`)
        }
      } catch (err) {
        error(
          `Table "${check.table}" is missing or unreadable: ${
            err instanceof Error ? err.message : String(err)
          }`,
        )
      }
    }
  } finally {
    await pool.end()
  }
}

async function main() {
  console.log('Portfolio data doctor')
  console.log('─────────────────────')

  await checkSkillIcons()
  await checkDbRows()

  const errors = issues.filter((i) => i.level === 'error')
  const warnings = issues.filter((i) => i.level === 'warning')

  if (warnings.length > 0) {
    console.log('\nWarnings:')
    for (const w of warnings) console.log(`  ⚠ ${w.message}`)
  }

  if (errors.length > 0) {
    console.log('\nErrors:')
    for (const e of errors) console.log(`  ✗ ${e.message}`)
    console.log(`\n✗ ${errors.length} issue(s) need attention.`)
    process.exit(1)
  }

  console.log(
    `\n✓ Portfolio data healthy${warnings.length ? ` (${warnings.length} warning${warnings.length === 1 ? '' : 's'})` : ''}.`,
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
