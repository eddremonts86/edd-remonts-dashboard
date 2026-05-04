import { createServerFn } from '@tanstack/react-start'
import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { loadDb } from '@/shared/lib/db/load'
import { portfolioContent } from '@/shared/lib/db/schema'
import type { ContentBlock } from '../types'

const contentBlockSchema = z.object({
  key: z.string(),
  valueEn: z.string(),
  valueEs: z.string().optional(),
  valueDk: z.string().optional(),
})

export const getContentBlocks = createServerFn({ method: 'GET' }).handler(
  async (): Promise<ContentBlock[]> => {
    const db = await loadDb()
    return db.select().from(portfolioContent)
  },
)

export const getContentBlock = createServerFn({ method: 'GET' })
  .inputValidator(z.object({ key: z.string() }))
  .handler(async ({ data }): Promise<ContentBlock | null> => {
    const db = await loadDb()
    const rows = await db
      .select()
      .from(portfolioContent)
      .where(eq(portfolioContent.key, data.key))
    return rows[0] ?? null
  })

export const upsertContentBlock = createServerFn({ method: 'POST' })
  .inputValidator(contentBlockSchema)
  .handler(async ({ data }): Promise<void> => {
    const db = await loadDb()
    await db
      .insert(portfolioContent)
      .values({ ...data, updatedAt: new Date() })
      .onConflictDoUpdate({
        target: portfolioContent.key,
        set: {
          valueEn: data.valueEn,
          valueEs: data.valueEs,
          valueDk: data.valueDk,
          updatedAt: new Date(),
        },
      })
  })

export const upsertContentBlocks = createServerFn({ method: 'POST' })
  .inputValidator(z.array(contentBlockSchema))
  .handler(async ({ data }): Promise<void> => {
    const db = await loadDb()
    for (const block of data) {
      await db
        .insert(portfolioContent)
        .values({ ...block, updatedAt: new Date() })
        .onConflictDoUpdate({
          target: portfolioContent.key,
          set: {
            valueEn: block.valueEn,
            valueEs: block.valueEs,
            valueDk: block.valueDk,
            updatedAt: new Date(),
          },
        })
    }
  })
