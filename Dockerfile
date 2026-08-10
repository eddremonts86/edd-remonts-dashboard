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

# MUST be set before `pnpm build`. Without it the React plugin emits the dev
# JSX transform (`jsxDEV`) and bundles React's development build; the prod
# stage then runs with NODE_ENV=production, where `react/jsx-dev-runtime`
# has no `jsxDEV` export — every route 500s with
# "TypeError: jsxDEV is not a function".
ENV NODE_ENV=production

COPY . .

RUN pnpm build

# Fail the image build rather than shipping a dev bundle: no server chunk may
# import react/jsx-dev-runtime.
RUN if grep -rq "react/jsx-dev-runtime" dist/server; then \
      echo "FATAL: dist/server contains the dev JSX runtime — build ran without NODE_ENV=production" >&2; \
      exit 1; \
    fi

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