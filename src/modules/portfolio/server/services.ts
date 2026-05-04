import { createServerFn } from '@tanstack/react-start'
import { createId } from '@paralleldrive/cuid2'
import { asc, eq } from 'drizzle-orm'
import { z } from 'zod'
import { loadDb } from '@/shared/lib/db/load'
import {
  portfolioServiceTranslations,
  portfolioServices,
} from '@/shared/lib/db/schema'
import type { Service } from '../types'

const svcTransSchema = z.object({
  locale: z.string(),
  title: z.string(),
  description: z.string().optional().default(''),
})
const svcInputSchema = z.object({
  iconSlug: z.string().optional().default('code'),
  visible: z.boolean().optional().default(true),
  sortOrder: z.number().optional().default(0),
  translations: z.array(svcTransSchema),
})
const svcSchema = svcInputSchema.extend({ id: z.string() })

// ── Read ──────────────────────────────────────────────────────────────────────

export const getServices = createServerFn({ method: 'GET' }).handler(
  async (): Promise<Service[]> => {
    const db = await loadDb()

    const rows = await db
      .select()
      .from(portfolioServices)
      .orderBy(asc(portfolioServices.sortOrder))

    const translations = await db.select().from(portfolioServiceTranslations)

    return rows.map((svc) => ({
      ...svc,
      translations: translations
        .filter((t) => t.serviceId === svc.id)
        .map((t) => ({
          locale: t.locale as Service['translations'][number]['locale'],
          title: t.title,
          description: t.description,
        })),
    }))
  },
)

// ── Create ────────────────────────────────────────────────────────────────────

export const createService = createServerFn({ method: 'POST' })
  .inputValidator(svcInputSchema)
  .handler(async ({ data }): Promise<Service> => {
    const db = await loadDb()
    const id = createId()

    await db.insert(portfolioServices).values({
      id,
      iconSlug: data.iconSlug ?? 'code',
      visible: data.visible ?? true,
      sortOrder: data.sortOrder ?? 0,
    })

    if (data.translations.length > 0) {
      await db.insert(portfolioServiceTranslations).values(
        data.translations.map((t) => ({
          serviceId: id,
          locale: t.locale,
          title: t.title,
          description: t.description ?? '',
        })),
      )
    }

    return {
      id,
      iconSlug: data.iconSlug ?? 'code',
      visible: data.visible ?? true,
      sortOrder: data.sortOrder ?? 0,
      translations: data.translations.map((t) => ({
        locale: t.locale as Service['translations'][number]['locale'],
        title: t.title,
        description: t.description ?? '',
      })),
    }
  })

// ── Update ────────────────────────────────────────────────────────────────────

export const updateService = createServerFn({ method: 'POST' })
  .inputValidator(svcSchema)
  .handler(async ({ data }): Promise<void> => {
    const db = await loadDb()

    await db
      .update(portfolioServices)
      .set({
        iconSlug: data.iconSlug,
        visible: data.visible,
        sortOrder: data.sortOrder,
        updatedAt: new Date(),
      })
      .where(eq(portfolioServices.id, data.id))

    for (const t of data.translations) {
      await db
        .insert(portfolioServiceTranslations)
        .values({ serviceId: data.id, locale: t.locale, title: t.title, description: t.description ?? '' })
        .onConflictDoUpdate({
          target: [portfolioServiceTranslations.serviceId, portfolioServiceTranslations.locale],
          set: { title: t.title, description: t.description ?? '' },
        })
    }
  })

// ── Delete ────────────────────────────────────────────────────────────────────

export const deleteService = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ id: z.string() }))
  .handler(async ({ data }): Promise<void> => {
    const db = await loadDb()
    await db.delete(portfolioServices).where(eq(portfolioServices.id, data.id))
  })
