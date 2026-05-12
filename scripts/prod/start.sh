#!/bin/sh
# Production bootstrap for edd-remonts-dashboard.
# Runs drizzle migrations + idempotent seeds, then exec-replaces with the HTTP server.
# All seeds are non-fatal: if they fail, the server still starts so the site stays up.
set -e

echo "[prod-start] running drizzle migrations…"
pnpm db:migrate

echo "[prod-start] seeding admin (idempotent)…"
pnpm db:seed:admin || echo "[prod-start] seed:admin failed (non-fatal, continuing)"

echo "[prod-start] seeding portfolio (idempotent)…"
pnpm db:seed:portfolio || echo "[prod-start] seed:portfolio failed (non-fatal, continuing)"

echo "[prod-start] launching server on :${PORT:-3000}…"
exec node server.prod.mjs
