import { createServerFn } from '@tanstack/react-start'
import { createId } from '@paralleldrive/cuid2'
import { asc, eq } from 'drizzle-orm'
import { z } from 'zod'
import { loadDb } from '@/shared/lib/db/load'
import { portfolioProjectTranslations, portfolioProjects } from '@/shared/lib/db/schema'
import type { Project, ProjectInput } from '../types'

const projTransSchema = z.object({ locale: z.string(), description: z.string().optional() })
const projInputSchema = z.object({
  title: z.string(),
  coverImageUrl: z.string().optional(),
  link: z.string().optional(),
  category: z.string().optional(),
  featured: z.boolean().optional(),
  sortOrder: z.number().optional(),
  translations: z.array(projTransSchema),
})
const projSchema = projInputSchema.extend({ id: z.string() })

export const getProjects = createServerFn({ method: 'GET' }).handler(
  async (): Promise<Project[]> => {
    const db = await loadDb()
    const rows = await db.select().from(portfolioProjects).orderBy(asc(portfolioProjects.sortOrder))
    const translations = await db.select().from(portfolioProjectTranslations)

    return rows.map((p) => ({
      ...p,
      translations: translations
        .filter((t) => t.projectId === p.id)
        .map((t) => ({
          locale: t.locale as Project['translations'][number]['locale'],
          description: t.description,
        })),
    }))
  },
)

export const createProject = createServerFn({ method: 'POST' })
  .inputValidator(projInputSchema)
  .handler(async ({ data }): Promise<Project> => {
    const db = await loadDb()
    const id = createId()
    await db.insert(portfolioProjects).values({ id, ...data })
    if (data.translations.length > 0) {
      await db.insert(portfolioProjectTranslations).values(
        data.translations.map((t) => ({ projectId: id, ...t })),
      )
    }
    return { id, ...data }
  })

export const updateProject = createServerFn({ method: 'POST' })
  .inputValidator(projSchema)
  .handler(async ({ data }): Promise<void> => {
    const db = await loadDb()
    const { id, translations, ...fields } = data
    await db.update(portfolioProjects).set({ ...fields, updatedAt: new Date() }).where(eq(portfolioProjects.id, id))
    for (const t of translations) {
      await db
        .insert(portfolioProjectTranslations)
        .values({ projectId: id, ...t })
        .onConflictDoUpdate({
          target: [portfolioProjectTranslations.projectId, portfolioProjectTranslations.locale],
          set: { description: t.description },
        })
    }
  })

export const deleteProject = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ id: z.string() }))
  .handler(async ({ data }): Promise<void> => {
    const db = await loadDb()
    await db.delete(portfolioProjects).where(eq(portfolioProjects.id, data.id))
  })
