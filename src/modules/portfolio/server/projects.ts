import { createServerFn } from '@tanstack/react-start'
import { createId } from '@paralleldrive/cuid2'
import { asc, eq } from 'drizzle-orm'
import { z } from 'zod'
import { loadDb } from '@/shared/lib/db/load'
import { portfolioProjectTranslations, portfolioProjects } from '@/shared/lib/db/schema'
import type { Project, ProjectInput } from '../types'

const projTransSchema = z.object({
  locale: z.string(),
  description: z.string().optional(),
  problem: z.string().optional(),
  context: z.string().optional(),
  role: z.string().optional(),
  decisions: z.string().optional(),
  complexity: z.string().optional(),
  results: z.string().optional(),
})
const projInputSchema = z.object({
  title: z.string(),
  coverImageUrl: z.string().optional(),
  link: z.string().optional(),
  repositoryUrl: z.string().optional(),
  internalImageUrl: z.string().optional(),
  category: z.string().optional(),
  scaleLabel: z.string().optional(),
  impactLabel: z.string().optional(),
  architectureLabel: z.string().optional(),
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
      id: p.id,
      title: p.title,
      coverImageUrl: p.coverImageUrl ?? undefined,
      link: p.link ?? undefined,
      repositoryUrl: p.repositoryUrl ?? undefined,
      internalImageUrl: p.internalImageUrl ?? undefined,
      category: p.category,
      scaleLabel: p.scaleLabel,
      impactLabel: p.impactLabel,
      architectureLabel: p.architectureLabel,
      featured: p.featured,
      sortOrder: p.sortOrder,
      translations: translations
        .filter((t) => t.projectId === p.id)
        .map((t) => ({
          locale: t.locale as Project['translations'][number]['locale'],
          description: t.description,
          problem: t.problem,
          context: t.context,
          role: t.role,
          decisions: t.decisions,
          complexity: t.complexity,
          results: t.results,
        })),
    }))
  },
)

export const createProject = createServerFn({ method: 'POST' })
  .inputValidator(projInputSchema)
  .handler(async ({ data }): Promise<Project> => {
    const db = await loadDb()
    const id = createId()
    await db.insert(portfolioProjects).values({
      id,
      title: data.title,
      coverImageUrl: data.coverImageUrl,
      link: data.link,
      repositoryUrl: data.repositoryUrl,
      internalImageUrl: data.internalImageUrl,
      category: data.category ?? 'Frontend',
      scaleLabel: data.scaleLabel ?? '',
      impactLabel: data.impactLabel ?? '',
      architectureLabel: data.architectureLabel ?? '',
      featured: data.featured ?? false,
      sortOrder: data.sortOrder ?? 0,
    })
    if (data.translations.length > 0) {
      await db.insert(portfolioProjectTranslations).values(
        data.translations.map((t) => ({
          projectId: id,
          locale: t.locale,
          description: t.description ?? '',
          problem: t.problem ?? '',
          context: t.context ?? '',
          role: t.role ?? '',
          decisions: t.decisions ?? '',
          complexity: t.complexity ?? '',
          results: t.results ?? '',
        })),
      )
    }
    return {
      id,
      title: data.title,
      coverImageUrl: data.coverImageUrl,
      link: data.link,
      repositoryUrl: data.repositoryUrl,
      internalImageUrl: data.internalImageUrl,
      category: data.category ?? 'Frontend',
      scaleLabel: data.scaleLabel ?? '',
      impactLabel: data.impactLabel ?? '',
      architectureLabel: data.architectureLabel ?? '',
      featured: data.featured ?? false,
      sortOrder: data.sortOrder ?? 0,
      translations: data.translations.map((t) => ({
        locale: t.locale as ProjectInput['translations'][number]['locale'],
        description: t.description ?? '',
        problem: t.problem ?? '',
        context: t.context ?? '',
        role: t.role ?? '',
        decisions: t.decisions ?? '',
        complexity: t.complexity ?? '',
        results: t.results ?? '',
      })),
    }
  })

export const updateProject = createServerFn({ method: 'POST' })
  .inputValidator(projSchema)
  .handler(async ({ data }): Promise<void> => {
    const db = await loadDb()
    const { id, translations, ...fields } = data
    await db
      .update(portfolioProjects)
      .set({
        ...fields,
        scaleLabel: fields.scaleLabel ?? '',
        impactLabel: fields.impactLabel ?? '',
        architectureLabel: fields.architectureLabel ?? '',
        updatedAt: new Date(),
      })
      .where(eq(portfolioProjects.id, id))
    for (const t of translations) {
      await db
        .insert(portfolioProjectTranslations)
        .values({
          projectId: id,
          locale: t.locale,
          description: t.description ?? '',
          problem: t.problem ?? '',
          context: t.context ?? '',
          role: t.role ?? '',
          decisions: t.decisions ?? '',
          complexity: t.complexity ?? '',
          results: t.results ?? '',
        })
        .onConflictDoUpdate({
          target: [portfolioProjectTranslations.projectId, portfolioProjectTranslations.locale],
          set: {
            description: t.description ?? '',
            problem: t.problem ?? '',
            context: t.context ?? '',
            role: t.role ?? '',
            decisions: t.decisions ?? '',
            complexity: t.complexity ?? '',
            results: t.results ?? '',
          },
        })
    }
  })

export const deleteProject = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ id: z.string() }))
  .handler(async ({ data }): Promise<void> => {
    const db = await loadDb()
    await db.delete(portfolioProjects).where(eq(portfolioProjects.id, data.id))
  })
