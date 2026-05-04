import { createServerFn } from '@tanstack/react-start'
import { createId } from '@paralleldrive/cuid2'
import { asc, eq } from 'drizzle-orm'
import { z } from 'zod'
import { loadDb } from '@/shared/lib/db/load'
import { portfolioTestimonialTranslations, portfolioTestimonials } from '@/shared/lib/db/schema'
import type { Testimonial, TestimonialInput } from '../types'

const testTransSchema = z.object({ locale: z.string(), quote: z.string() })
const testInputSchema = z.object({
  authorName: z.string(),
  authorRole: z.string().optional(),
  authorCompany: z.string().optional(),
  avatarUrl: z.string().optional(),
  visible: z.boolean().optional(),
  sortOrder: z.number().optional(),
  translations: z.array(testTransSchema),
})
const testSchema = testInputSchema.extend({ id: z.string() })

export const getTestimonials = createServerFn({ method: 'GET' }).handler(
  async (): Promise<Testimonial[]> => {
    const db = await loadDb()
    const rows = await db
      .select()
      .from(portfolioTestimonials)
      .orderBy(asc(portfolioTestimonials.sortOrder))
    const translations = await db.select().from(portfolioTestimonialTranslations)

    return rows.map((t) => ({
      ...t,
      translations: translations
        .filter((tr) => tr.testimonialId === t.id)
        .map((tr) => ({
          locale: tr.locale as Testimonial['translations'][number]['locale'],
          quote: tr.quote,
        })),
    }))
  },
)

export const createTestimonial = createServerFn({ method: 'POST' })
  .inputValidator(testInputSchema)
  .handler(async ({ data }): Promise<Testimonial> => {
    const db = await loadDb()
    const id = createId()
    await db.insert(portfolioTestimonials).values({ id, ...data })
    if (data.translations.length > 0) {
      await db.insert(portfolioTestimonialTranslations).values(
        data.translations.map((t) => ({ testimonialId: id, ...t })),
      )
    }
    return { id, ...data }
  })

export const updateTestimonial = createServerFn({ method: 'POST' })
  .inputValidator(testSchema)
  .handler(async ({ data }): Promise<void> => {
    const db = await loadDb()
    const { id, translations, ...fields } = data
    await db.update(portfolioTestimonials).set(fields).where(eq(portfolioTestimonials.id, id))
    for (const t of translations) {
      await db
        .insert(portfolioTestimonialTranslations)
        .values({ testimonialId: id, ...t })
        .onConflictDoUpdate({
          target: [portfolioTestimonialTranslations.testimonialId, portfolioTestimonialTranslations.locale],
          set: { quote: t.quote },
        })
    }
  })

export const deleteTestimonial = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ id: z.string() }))
  .handler(async ({ data }): Promise<void> => {
    const db = await loadDb()
    await db.delete(portfolioTestimonials).where(eq(portfolioTestimonials.id, data.id))
  })
