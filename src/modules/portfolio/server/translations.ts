import { createServerFn } from '@tanstack/react-start'
import { and, eq } from 'drizzle-orm'
import { z } from 'zod'
import { loadDb } from '@/shared/lib/db/load'
import { portfolioTranslations } from '@/shared/lib/db/schema'
import type { Locale, TranslationRow } from '../types'

const translationRowSchema = z.object({
  locale: z.string(),
  translationKey: z.string(),
  value: z.string(),
  updatedAt: z.string().optional(),
})

export const getTranslations = createServerFn({ method: 'GET' })
  .inputValidator(z.object({ locale: z.string() }))
  .handler(async ({ data }): Promise<TranslationRow[]> => {
    const db = await loadDb()
    const rows = await db
      .select()
      .from(portfolioTranslations)
      .where(eq(portfolioTranslations.locale, data.locale))
    return rows.map((r) => ({
      locale: r.locale as Locale,
      translationKey: r.translationKey,
      value: r.value,
    }))
  })

export const getAllTranslations = createServerFn({ method: 'GET' }).handler(
  async (): Promise<TranslationRow[]> => {
    const db = await loadDb()
    const rows = await db.select().from(portfolioTranslations)
    return rows.map((r) => ({
      locale: r.locale as Locale,
      translationKey: r.translationKey,
      value: r.value,
    }))
  },
)

export const upsertTranslation = createServerFn({ method: 'POST' })
  .inputValidator(translationRowSchema)
  .handler(async ({ data }): Promise<void> => {
    const db = await loadDb()
    await db
      .insert(portfolioTranslations)
      .values({ ...data, updatedAt: new Date() })
      .onConflictDoUpdate({
        target: [portfolioTranslations.locale, portfolioTranslations.translationKey],
        set: { value: data.value, updatedAt: new Date() },
      })
  })

export const upsertTranslations = createServerFn({ method: 'POST' })
  .inputValidator(z.array(translationRowSchema))
  .handler(async ({ data }): Promise<void> => {
    const db = await loadDb()
    for (const row of data) {
      await db
        .insert(portfolioTranslations)
        .values({ ...row, updatedAt: new Date() })
        .onConflictDoUpdate({
          target: [portfolioTranslations.locale, portfolioTranslations.translationKey],
          set: { value: row.value, updatedAt: new Date() },
        })
    }
  })

export const deleteTranslation = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ locale: z.string(), translationKey: z.string() }))
  .handler(async ({ data }): Promise<void> => {
    const db = await loadDb()
    await db
      .delete(portfolioTranslations)
      .where(
        and(
          eq(portfolioTranslations.locale, data.locale),
          eq(portfolioTranslations.translationKey, data.translationKey),
        ),
      )
  })
