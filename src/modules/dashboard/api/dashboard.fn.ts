import { createServerFn } from '@tanstack/react-start'
import { count } from 'drizzle-orm'
import { z } from 'zod'
import { loadDb } from '@/shared/lib/db/load'
import {
  portfolioExperiences,
  portfolioProjects,
  portfolioSkills,
  portfolioTestimonials,
  users,
} from '@/shared/lib/db/schema'
import { isE2E } from '@/shared/lib/env'

export interface DashboardStats {
  totalUsers: number
  totalExperiences: number
  totalProjects: number
  totalSkills: number
  totalTestimonials: number
}

export const getDashboardStatsFn = createServerFn({ method: 'GET' })
  .inputValidator(z.void())
  .handler(async (): Promise<DashboardStats> => {
    if (isE2E) {
      return { totalUsers: 5, totalExperiences: 12, totalProjects: 13, totalSkills: 32, totalTestimonials: 4 }
    }

    const db = await loadDb()
    const [
      [{ total: totalUsers }],
      [{ total: totalExperiences }],
      [{ total: totalProjects }],
      [{ total: totalSkills }],
      [{ total: totalTestimonials }],
    ] = await Promise.all([
      db.select({ total: count() }).from(users),
      db.select({ total: count() }).from(portfolioExperiences),
      db.select({ total: count() }).from(portfolioProjects),
      db.select({ total: count() }).from(portfolioSkills),
      db.select({ total: count() }).from(portfolioTestimonials),
    ])

    return {
      totalUsers: Number(totalUsers) || 0,
      totalExperiences: Number(totalExperiences) || 0,
      totalProjects: Number(totalProjects) || 0,
      totalSkills: Number(totalSkills) || 0,
      totalTestimonials: Number(totalTestimonials) || 0,
    }
  })
