import { defineConfig, devices } from '@playwright/test'

const AUTH_E2E_DB_PORT = '5433'
const AUTH_E2E_DB_URL = `postgresql://postgres:postgres@127.0.0.1:${AUTH_E2E_DB_PORT}/tanstack_template_auth_e2e`
const AUTH_E2E_BASE_URL = 'http://127.0.0.1:3100'

export default defineConfig({
  testDir: './tests/e2e',
  testMatch: /auth(\.(approval|logout|signup))?\.local\.spec\.ts/,
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: 'html',
  use: {
    baseURL: AUTH_E2E_BASE_URL,
    locale: 'en-US',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium-auth-local',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    // DB_PORT and DATABASE_URL have to be on the *first* command too. They were
    // only on the half after the &&, so `auth:e2e:prepare` ran without them and
    // fell back to a hardcoded 127.0.0.1:5437 while compose published 5432 and
    // the app expected 5433. Three ports, one of which nothing listened on.
    command:
      `DB_PORT=${AUTH_E2E_DB_PORT} DATABASE_URL=${AUTH_E2E_DB_URL} pnpm auth:e2e:prepare && ` +
      `DATABASE_URL=${AUTH_E2E_DB_URL} ` +
      `BETTER_AUTH_URL=${AUTH_E2E_BASE_URL} VITE_BETTER_AUTH_URL=${AUTH_E2E_BASE_URL} ` +
      'AUTH_MODE=local VITE_AUTH_MODE=local ' +
      'SKIP_AUTH=0 VITE_SKIP_AUTH=0 VITE_E2E=0 DISABLE_TANSTACK_VITE_DEVTOOLS=true ' +
      'pnpm exec vite dev --host 127.0.0.1 --port 3100',
    url: AUTH_E2E_BASE_URL,
    reuseExistingServer: false,
    timeout: 120 * 1000,
  },
})
