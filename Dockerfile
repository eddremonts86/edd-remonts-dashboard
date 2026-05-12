FROM node:22-bookworm-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./

RUN pnpm install --frozen-lockfile

FROM base AS dev

WORKDIR /app

COPY . .

EXPOSE 3000

CMD ["pnpm", "dev:server", "--host", "0.0.0.0", "--port", "3000"]

FROM base AS builder

WORKDIR /app

COPY . .

RUN pnpm build

FROM node:22-bookworm-slim AS prod

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV NODE_ENV=production

RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./

# Reuse node_modules from base — native binaries (sharp, onnxruntime, esbuild)
# are already compiled there. No need to reinstall or re-run build scripts.
COPY --from=base /app/node_modules ./node_modules

# Strip devDependencies, keep only production deps
RUN pnpm prune --prod

COPY --from=builder /app/dist ./dist
COPY server.prod.mjs ./server.prod.mjs

# Files needed at runtime for migrations + idempotent seeds (db:migrate, db:seed:admin, db:seed:portfolio).
# tsx and drizzle-kit are kept in dependencies so they survive `pnpm prune --prod` above.
COPY drizzle ./drizzle
COPY drizzle.config.ts ./drizzle.config.ts
COPY tsconfig.json ./tsconfig.json
COPY scripts ./scripts
COPY src ./src
# `tsx --env-file=.env ...` (used by db:migrate / db:seed:admin) needs the file to exist.
# The real env vars come from docker-compose env_file / Coolify panel; this stub is empty.
RUN touch .env

EXPOSE 3000

CMD ["./scripts/prod/start.sh"]