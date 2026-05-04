import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createService, deleteService, getServices, updateService } from '../../../src/modules/portfolio/server/services'
import { loadDb } from '@/shared/lib/db/load'

vi.mock('@tanstack/react-start', () => ({
  createServerFn: () => {
    const chain: {
      inputValidator: () => typeof chain
      handler: (fn: (args: unknown) => unknown) => (args: unknown) => Promise<unknown>
    } = {
      inputValidator: () => chain,
      handler: (fn) => async (args) => fn(args),
    }
    return chain
  },
}))

vi.mock('@/shared/lib/db/load', () => ({
  loadDb: vi.fn(),
}))

vi.mock('@paralleldrive/cuid2', () => ({
  createId: () => 'test-service-id',
}))

describe('Services CRUD server functions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('getServices returns mapped services with translations', async () => {
    const dbMock = {
      select: vi.fn(() => ({
        from: vi.fn(() => ({
          orderBy: vi.fn().mockResolvedValue([
            { id: 'svc-1', iconSlug: 'code', visible: true, sortOrder: 0, createdAt: new Date(), updatedAt: new Date() },
          ]),
        })),
      })),
    }
    // Second select call (translations)
    let callCount = 0
    dbMock.select = vi.fn(() => {
      callCount++
      if (callCount === 1) {
        return {
          from: vi.fn(() => ({
            orderBy: vi.fn().mockResolvedValue([
              { id: 'svc-1', iconSlug: 'code', visible: true, sortOrder: 0, createdAt: new Date(), updatedAt: new Date() },
            ]),
          })),
        }
      }
      return {
        from: vi.fn().mockResolvedValue([
          { serviceId: 'svc-1', locale: 'en', title: 'Web Dev', description: 'I build things.' },
        ]),
      }
    })

    vi.mocked(loadDb).mockResolvedValue(dbMock as never)

    const result = await (getServices as () => Promise<unknown>)()
    expect(Array.isArray(result)).toBe(true)
  })

  it('createService inserts rows and returns service', async () => {
    const dbMock = {
      insert: vi.fn(() => ({
        values: vi.fn().mockResolvedValue(undefined),
      })),
    }

    vi.mocked(loadDb).mockResolvedValue(dbMock as never)

    const result = await (createService as (args: unknown) => Promise<unknown>)({
      data: {
        iconSlug: 'code',
        visible: true,
        sortOrder: 1,
        translations: [
          { locale: 'en', title: 'Web Development', description: 'Building modern web apps.' },
        ],
      },
    })

    expect(dbMock.insert).toHaveBeenCalledTimes(2)
    expect((result as { id: string }).id).toBe('test-service-id')
  })

  it('updateService patches fields', async () => {
    const insertValues = vi.fn(() => ({
      onConflictDoUpdate: vi.fn().mockResolvedValue(undefined),
    }))
    const dbMock = {
      update: vi.fn(() => ({
        set: vi.fn(() => ({
          where: vi.fn().mockResolvedValue(undefined),
        })),
      })),
      delete: vi.fn(() => ({
        where: vi.fn().mockResolvedValue(undefined),
      })),
      insert: vi.fn(() => ({
        values: insertValues,
      })),
    }

    vi.mocked(loadDb).mockResolvedValue(dbMock as never)

    await (updateService as (args: unknown) => Promise<unknown>)({
      data: {
        id: 'svc-1',
        iconSlug: 'shield',
        visible: false,
        sortOrder: 5,
        translations: [{ locale: 'en', title: 'Security', description: 'We keep you safe.' }],
      },
    })

    expect(dbMock.update).toHaveBeenCalled()
  })

  it('deleteService removes the row', async () => {
    const dbMock = {
      delete: vi.fn(() => ({
        where: vi.fn().mockResolvedValue(undefined),
      })),
    }

    vi.mocked(loadDb).mockResolvedValue(dbMock as never)

    await (deleteService as (args: unknown) => Promise<unknown>)({
      data: { id: 'svc-1' },
    })

    expect(dbMock.delete).toHaveBeenCalled()
  })
})

