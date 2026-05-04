import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import { expect, test } from 'vitest';

// Adjust the import path to your actual schema
// import { portfolioProjects } from '../../src/shared/lib/db/schema';

const DATABASE_URL = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5433/tanstack_template';

// Minimal table name for raw query fallback
const PROJECTS_TABLE = 'portfolio_projects';

test('Seed script inserts all projects', async () => {
  const pool = new pg.Pool({ connectionString: DATABASE_URL });
  const db = drizzle(pool);

  // If you have a Drizzle schema, use:
  // const projects = await db.select().from(portfolioProjects);
  // Otherwise, use a raw query:
  const { rows } = await pool.query(`SELECT COUNT(*)::int FROM ${PROJECTS_TABLE}`);
  expect(rows[0].count).toBe(13);

  await pool.end();
});
