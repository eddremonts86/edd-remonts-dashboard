import { createServerFn } from '@tanstack/react-start'
import { createId } from '@paralleldrive/cuid2'
import { asc, eq } from 'drizzle-orm'
import { z } from 'zod'
import { loadDb } from '@/shared/lib/db/load'
import {
  portfolioExperienceTranslations,
  portfolioExperiences,
} from '@/shared/lib/db/schema'
import type { Experience, ExperienceInput } from '../types'

const translationSchema = z.object({ locale: z.string(), role: z.string(), description: z.string().optional() })
const expInputSchema = z.object({
  company: z.string(),
  location: z.string().optional(),
  periodStart: z.string().optional(),
  periodEnd: z.string().optional(),
  url: z.string().optional(),
  sortOrder: z.number().optional(),
  translations: z.array(translationSchema),
})
const expSchema = expInputSchema.extend({ id: z.string() })

// ── Read ──────────────────────────────────────────────────────────────────────

export const getExperiences = createServerFn({ method: 'GET' }).handler(
  async (): Promise<Experience[]> => {
    const db = await loadDb()

    const rows = await db
      .select()
      .from(portfolioExperiences)
      .orderBy(asc(portfolioExperiences.sortOrder))

    const translations = await db
      .select()
      .from(portfolioExperienceTranslations)

    return rows.map((exp) => ({
      ...exp,
      translations: translations
        .filter((t) => t.experienceId === exp.id)
        .map((t) => ({
          locale: t.locale as Experience['translations'][number]['locale'],
          role: t.role,
          description: t.description,
        })),
    }))
  },
)

// ── Create ────────────────────────────────────────────────────────────────────

export const createExperience = createServerFn({ method: 'POST' })
  .inputValidator(expInputSchema)
  .handler(async ({ data }): Promise<Experience> => {
    const db = await loadDb()
    const id = createId()

    await db.insert(portfolioExperiences).values({
      id,
      company: data.company,
      location: data.location,
      periodStart: data.periodStart,
      periodEnd: data.periodEnd,
      url: data.url,
      sortOrder: data.sortOrder,
    })

    if (data.translations.length > 0) {
      await db.insert(portfolioExperienceTranslations).values(
        data.translations.map((t) => ({ experienceId: id, ...t })),
      )
    }

    return { id, ...data }
  })

// ── Update ────────────────────────────────────────────────────────────────────

export const updateExperience = createServerFn({ method: 'POST' })
  .inputValidator(expSchema)
  .handler(async ({ data }): Promise<void> => {
    const db = await loadDb()

    await db
      .update(portfolioExperiences)
      .set({
        company: data.company,
        location: data.location,
        periodStart: data.periodStart,
        periodEnd: data.periodEnd,
        url: data.url,
        sortOrder: data.sortOrder,
        updatedAt: new Date(),
      })
      .where(eq(portfolioExperiences.id, data.id))

    // Upsert translations
    for (const t of data.translations) {
      await db
        .insert(portfolioExperienceTranslations)
        .values({ experienceId: data.id, ...t })
        .onConflictDoUpdate({
          target: [portfolioExperienceTranslations.experienceId, portfolioExperienceTranslations.locale],
          set: { role: t.role, description: t.description },
        })
    }
  })

// ── Delete ────────────────────────────────────────────────────────────────────

export const deleteExperience = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ id: z.string() }))
  .handler(async ({ data }): Promise<void> => {
    const db = await loadDb()
    await db.delete(portfolioExperiences).where(eq(portfolioExperiences.id, data.id))
  })
