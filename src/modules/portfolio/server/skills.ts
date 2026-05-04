import { createServerFn } from '@tanstack/react-start'
import { createId } from '@paralleldrive/cuid2'
import { asc, eq } from 'drizzle-orm'
import { z } from 'zod'
import { loadDb } from '@/shared/lib/db/load'
import { portfolioSkills } from '@/shared/lib/db/schema'
import type { Skill, SkillInput } from '../types'

const skillInputSchema = z.object({
  name: z.string(),
  iconSlug: z.string().optional(),
  category: z.string().optional(),
  proficiency: z.number().optional(),
  visible: z.boolean().optional(),
  sortOrder: z.number().optional(),
})
const skillSchema = skillInputSchema.extend({ id: z.string() })

export const getSkills = createServerFn({ method: 'GET' }).handler(
  async (): Promise<Skill[]> => {
    const db = await loadDb()
    return db.select().from(portfolioSkills).orderBy(asc(portfolioSkills.sortOrder))
  },
)

export const createSkill = createServerFn({ method: 'POST' })
  .inputValidator(skillInputSchema)
  .handler(async ({ data }): Promise<Skill> => {
    const db = await loadDb()
    const id = createId()
    await db.insert(portfolioSkills).values({ id, ...data })
    return { id, ...data } as Skill
  })

export const updateSkill = createServerFn({ method: 'POST' })
  .inputValidator(skillSchema)
  .handler(async ({ data }): Promise<void> => {
    const db = await loadDb()
    const { id, ...rest } = data
    await db.update(portfolioSkills).set(rest).where(eq(portfolioSkills.id, id))
  })

export const deleteSkill = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ id: z.string() }))
  .handler(async ({ data }): Promise<void> => {
    const db = await loadDb()
    await db.delete(portfolioSkills).where(eq(portfolioSkills.id, data.id))
  })
