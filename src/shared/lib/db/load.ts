/**
 * Dynamic import helper for the database connection.
 * Used in server functions to avoid bundling the DB driver into the client build.
 *
 * IMPORTANT: We import the explicit `/index` subpath because vite.config.ts
 * aliases the bare `@/shared/lib/db` specifier to `browser.ts` during build
 * (TanStack Start's Vite plugin does not set isSsrBuild=true for its server
 * bundle, so a bare-specifier alias would stub the DB on the server too).
 */
export async function loadDb() {
  const { getDb } = await import('@/shared/lib/db/index')
  return getDb()
}
