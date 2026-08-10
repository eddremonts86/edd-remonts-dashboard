# Landing production-readiness — consolidated findings

Run date: 2026-08-10 · Branch: `main` @ `2fca399` · Pipeline: `/ai-os-review-all` (adapted)

> ⚠️ **DEGRADED: single-context.** The skill prescribes parallel sub-agents for
> Assessment A (audit) + Assessment B (critique). This session runs
> single-context by policy, so both assessments were produced sequentially by
> one reader. Coverage is unaffected; independence of the two lenses is weaker
> than the skill intends.
>
> ⚠️ **DEGRADED: skill written for a different repo.** `/ai-os-review-all`
> targets BuilderHunt. The following prescribed inputs **do not exist here** and
> were replaced (see "Deviations"): `scripts/audit/saas-review-walk.ts`,
> `scripts/db/seed-test-users.ts`, `scripts/ai-os/generate-image.sh`,
> `docs/ui-audit/route-inventory.md`, the 9-slot image registry, and every
> Phase 4/5 component path.

---

## Phase 0 — Gate baseline (recorded, not clean)

| Gate | Result |
| --- | --- |
| `pnpm type-check` | ✅ pass |
| `pnpm lint --quiet` | ✅ pass |
| `pnpm test:unit` | ❌ **8 failed / 176 passed** (4 files) |

Failing files — **all dashboard/AI, none touch the landing**:

- `tests/unit/rag.context.test.ts` (4)
- `tests/unit/shared/ui/DataTable.test.tsx` (2)
- `tests/integration/shared/ui/UnifiedDataTable.integration.test.tsx` (1)
- `tests/integration/config-loading.test.ts` (1)

The skill says abort when Phase 0 gates fail. These are **pre-existing** and
outside the landing blast radius, so the gate for this pipeline is redefined as
**"no new failures against this baseline"**. That is a deviation and it is
recorded here rather than hidden.

---

## P0 — Ships broken / invisible

### P0-1 · The production Docker image cannot serve a single request

`Dockerfile:30` runs `RUN pnpm build` in the `builder` stage. `ENV
NODE_ENV=production` is only set at `Dockerfile:36`, in the *later* `prod`
stage. So the app is **compiled in development mode and then run in production
mode**.

Reproduced locally:

```
$ pnpm build                      # no NODE_ENV, exactly as the Dockerfile does it
$ NODE_ENV=production node server.prod.mjs
$ curl localhost:3410/
{"status":500,"unhandled":true,"message":"HTTPError"}

TypeError: jsxDEV is not a function
    at RootDocument (dist/server/assets/router-Dlx9CAfr.js:821:73)
```

Evidence of the dev build leaking into `dist/`:

| Artifact | `pnpm build` | `NODE_ENV=production pnpm build` |
| --- | --- | --- |
| server chunks importing `react/jsx-dev-runtime` | **45** | 0 |
| client chunks containing `jsxDEV` | 33 | 1 |
| client chunks containing the React **development** build | **yes** | no |
| entry chunk | 500 KB gz | 434 KB gz |

Not caused by `@tanstack/devtools-vite` — rebuilding with
`DISABLE_TANSTACK_VITE_DEVTOOLS=true` still emitted `jsxDEV` in 33 client / 45
server chunks. The trigger is the missing `NODE_ENV` at build time.

**Fix:** set `ENV NODE_ENV=production` before `RUN pnpm build` in the builder
stage (and add a CI assertion that `dist/` contains no `jsx-dev-runtime`).

### P0-2 · Google, LinkedIn and Slack see a loading screen, not a portfolio

`src/portfolio/App.tsx:36` opens with `useState(true)` and renders `<Preloader>`
until a client-side animation finishes. SSR therefore emits **6,812 bytes** whose
entire visible text is:

> Eduardo Inerarte - Senior Frontend Engineer · Skip to content · Loading
> experience · 2026 Eduardo Inerarte · A Living Portfolio · 0 % · Stand by

23,579 characters of real content exist — **none of it is server-rendered**. For
a page whose stated job is to be found by founders, there is nothing to index
and nothing to quote.

### P0-3 · `rel="canonical"` points at `https://example.com`

`src/routes/__root.tsx:10`:

```ts
const BASE_URL = import.meta.env.VITE_PUBLIC_URL || 'https://example.com'
```

`VITE_PUBLIC_URL` is set in **neither** `.env`, `.env.example`, nor
`.env.production.example`. The served HTML contains:

```html
<link rel="canonical" href="https://example.com"/>
<link rel="alternate" hreflang="en" href="https://example.com"/>
<link rel="alternate" hreflang="es" href="https://example.com/?lang=es"/>
<link rel="alternate" hreflang="da" href="https://example.com/?lang=da"/>
<link rel="alternate" hreflang="x-default" href="https://example.com"/>
```

Meanwhile `public/robots.txt` and `public/sitemap.xml` both declare
`https://eddremonts.dk`. The canonical actively instructs Google to attribute
the page to someone else's domain.

### P0-4 · No Open Graph card

The full server-rendered `<meta>` set is **five tags**: `charSet`, `viewport`,
`description`, `og:locale`, `og:locale:alternate`. There is no `og:title`,
`og:description`, `og:image`, `og:url`, `og:type`, and no `twitter:card`.

A founder pasting the link into Slack, LinkedIn or X gets a bare grey rectangle.
This is the cheapest high-leverage fix on the list.

### P0-5 · Production server ships every asset uncompressed

```
$ curl -H 'Accept-Encoding: gzip, br' -D - localhost:3410/assets/index-CtNiQaKO.js
HTTP/1.1 200 OK
Content-Length: 1510799        # no Content-Encoding header
```

1,510,799 bytes on the wire for a chunk that gzips to 444 KB — **3.4× the
necessary bytes**, on every asset. Measured landing total: **2,755 KB
transferred** (1,858 KB of it JS).

`Cache-Control: public, max-age=31536000, immutable` on hashed assets is
correct — that part is already right.

### P0-6 · No security headers on the Node production path

`netlify.toml` declares `X-Frame-Options`, `X-Content-Type-Options`,
`Referrer-Policy`, `X-XSS-Protection`. The Dockerfile's actual runtime is
`server.prod.mjs`, which sets **none** of them, and no CSP or HSTS exists on
either path. `netlify.toml`'s plugin is also commented out at
`vite.config.ts:2` and `.netlify/output/static` is never produced — the Netlify
target does not currently build.

---

## P1 — Costs you founder attention

### P1-1 · LCP 2,948 ms on localhost — and the LCP element is the preloader

Measured against the production server over loopback (**zero network
latency**):

| Metric | Value |
| --- | --- |
| TTFB | 10 ms |
| FCP | 128 ms |
| **LCP** | **2,948 ms** |
| LCP element | `DIV.overflow-hidden` (hero, revealed after the preloader) |

FCP is fast because the preloader paints instantly; LCP is slow because real
content is withheld for ~3 s by choice. On a real 4G handset this lands in the
6–10 s range. Google's "good" threshold is 2,500 ms.

The hero copy claims **"100% Core Web Vitals"**. The page making the claim does
not currently meet it. That is the credibility risk, not just the metric.

### P1-2 · Every landing visitor downloads Clerk, better-auth and an OpenAI SDK

The 434 KB gz / 1,475 KB raw entry chunk (`index-*.js`) is on the landing's
critical path. Fingerprints inside it:

| Library | Hits | Needed to view the portfolio? |
| --- | --- | --- |
| `clerk` / `@clerk` | 401 / 15 | no — `/auth` + `/dashboard` only |
| `openai` | 40 | no — dashboard AI features |
| `i18next` | 13 | yes |
| `better-auth` | 6 | no |
| `Sentry` | 3 | arguable |

Critical-path JS for `/` is **533 KB gzipped** across 20 modulepreloads, before
CSS (36 KB gz) and images. Splitting auth/AI out of the shared entry is the
single largest performance win available.

### P1-3 · 21 MB ONNX WASM binary published to the client

```
21M  dist/client/assets/ort-wasm-simd-threaded.jsep-B0T3yYHD.wasm
```

From the `@chroma-core/default-embed` → `onnxruntime` chain. Not fetched by the
landing, so it costs no page weight — but it is publicly served and inflates
`dist/client` to 39 MB, which slows every deploy and image push.

### P1-4 · Images shipped raw

| File | Size | Note |
| --- | --- | --- |
| `public/edd/edd_light.jpg` | 1.9 MB | no WebP/AVIF variant |
| `public/edd/edd_dark.jpg` | 1.4 MB | no WebP/AVIF variant |
| `public/projects/live-fodbold-cover.png` | 808 KB | PNG for a photo |
| 13 more project covers | 219–628 KB | all PNG |

Worst single case measured at runtime: `schilling-cover.png` — **500 KB
downloaded, 1024 px natural, rendered at 18 px wide.** ~10 MB of images total,
no `srcset`, no modern formats.

### P1-5 · The public page shows an empty state

The "Más proyectos" table renders **"Aún no hay proyectos para este filtro."**
on first paint, with the DB up and seeded. A founder's first interaction with
the project index is an empty grid.

### P1-6 · React logs a DOM error on every page load

```
Invalid DOM property `hreflang`. Did you mean `hrefLang`?
```

From the `links` array at `src/routes/__root.tsx:41-46`. Cosmetic, but a
frontend engineer's portfolio throwing a React error in the console on load is
the wrong first impression for anyone who opens devtools — and some will.

---

## P2 — Craft (design-taste-frontend §4.7 pre-flight)

| Check | Budget | Actual | Verdict |
| --- | --- | --- | --- |
| §4.7 eyebrow restraint | ≤ `ceil(14/3)` = **5** | **119** | ❌ **24× over** |
| §9.G zero em-dashes | 0 | 14 | ❌ (see note) |
| §4.7 hero stack ≤ 4 text + 1+1 CTA | 4 + 2 | 4 text + **3 CTAs** | ⚠️ |
| §4.7 hero subtext ≤ 20 words | 20 | **38** | ❌ |
| §4.7 no section-number eyebrows | none | `01 /`, `02 /`, `/01`…`/05`, `REEL 02-04`, `EXP.01-05` | ❌ |
| §9.F no div-built fake product UI | none | `edd.config.ts` code-editor mock (EXP.05) | ⚠️ deliberate — labelled "honesto sobre ser teatro" |
| §4.7 no split-header | none | not present | ✅ |
| §4.7 ≤ 2 consecutive zigzag splits | 2 | not present | ✅ |
| single `h1` | 1 | 1 | ✅ |
| image `alt` coverage | 100% | 100% (6/6) | ✅ |
| unlabelled buttons/links | 0 | 0 | ✅ |

**The eyebrow count is the headline craft finding.** 119 uppercase
letter-spaced micro-labels across 14 sections (`/ MÉTRICAS DE RENDIMIENTO
VERIFICADAS`, `/ CURATED TECHNOLOGIES`, `REEL 02`, `CONTEXTO`, `COMPLEJIDAD`,
`DECISIONES`, `RESULTADOS`, `/ PRUEBA DE VALOR`, `ESTADO: MEDIDO Y REPORTADO`…).
Individually each looks like precision. At 119 they read as a template applied
uniformly, which is the opposite of the intended signal.

**Em-dash note.** The skill bans `—` unconditionally. Fourteen occur here, in
Spanish and Danish copy where the em-dash is correct typography (`El movimiento
que se puede apagar es oficio; el que no, es decoración`, `6.2MB → 350KB`, etc).
**Flagged, not auto-stripped** — blanket-replacing them would damage correct
Spanish. Your call.

### Length

**23,579 characters ≈ 4,000 words** on one page. Two full case studies with
CONTEXTO / COMPLEJIDAD / DECISIONES / RESULTADOS / DECISION LOG, five "why work
with me" entries, five leadership lessons, five ways-of-working entries, a
build log, a skills marquee and a timeline. A hiring founder scans for 30–60
seconds. Right now the page asks for twenty minutes and front-loads a 3-second
preloader before the first word.

### Mobile (375×812)

- Two floating badges overlay content bottom-left and bottom-right; the
  left one sits on top of "Copenhague, DK".
- Three stacked full-width CTAs push the availability card below the fold.
- Hero remains legible; type scale holds.

---

## Morphicons — feasibility

Researched <https://www.morphicons.com> and unpacked the published artifact.

| Fact | Value |
| --- | --- |
| npm package | `morphicons` |
| Latest | `1.6.0`, **published 2 days ago** (2026-08-08) |
| Licence / deps | MIT / **zero runtime dependencies** |
| Size | 138.6 kB unpacked, ~6.5 kB gzipped core |
| Entry for us | `morphicons/react` → `<MorphIcon>` (forwardRef, `MorphHandle`) |
| Input | Lucide `IconNode` or a raw `d` string — **already our icon format** |
| Physics | `smooth` (ζ=1.00), `snappy` (ζ=0.73), `bouncy` (ζ=0.40) |
| Accessibility | `label` prop → `role="img"` + `<title>`; without it `aria-hidden` |
| Reduced motion | `reducedMotion="user"` degrades a morph to an instant swap |

It fits: we already use `lucide-react` across 24 portfolio files, it is a shared
single `requestAnimationFrame` loop rather than per-icon timers, and the
`reducedMotion="user"` prop satisfies "evitar animaciones" for anyone who has
asked the OS to reduce motion.

**The one real concern: the package is two days old.** One maintainer, eleven
versions, no track record. For a page that must not break in front of founders
I would **pin the exact version** (`"morphicons": "1.6.0"`, no caret) and
confine it to a single `MorphingIcon` wrapper so it can be swapped for a static
Lucide icon by editing one file. Vendoring the MIT `dist/` into `src/vendor/` is
the paranoid alternative if you prefer zero supply-chain surface.

**Where it earns its place (≤ 6 icons, state-change triggered only — never
looping, never decorative):**

1. `ThemeToggle` — sun ⇄ moon ⇄ monitor, on click (`snappy`)
2. `CommandPalette` trigger — search ⇄ x, on open/close (`snappy`)
3. `ContactForm` submit — send ⇄ loader ⇄ circle-check, on state (`smooth`)
4. Copy-to-clipboard — copy ⇄ check, on success (`snappy`)
5. `ProjectsGallery` filter chips — chevron ⇄ x when active (`smooth`)
6. `StickyNav` mobile trigger — menu ⇄ x (`snappy`) *(if a mobile menu exists)*

---

## Deviations from the skill, itemised

| Skill prescribes | Reality here | Substituted |
| --- | --- | --- |
| Port 3010 | `.claude/launch.json` already pins 3210 | 3210 (dev) + 3410 (prod build) |
| `scripts/audit/saas-review-walk.ts` | absent | in-browser multi-viewport walk (desktop 1280, mobile 375) + prod-server probe |
| `pnpm db:seed:test-users` | script absent | not needed — landing is public, no roles |
| 4 roles × 70 routes | this repo's public surface is a single route `/` | `/` at 2 viewports + prod SSR HTML |
| Phase 4.A slot registry (9 BuilderHunt images) | product does not exist | dropped; real image work here is compressing the 10 MB already present |
| Phase 4.B `StickyStack` "how it works" | no such section | dropped |
| Phase 5 dashboard polish | different components entirely | dropped (out of `--landing` scope anyway) |
| Pre-known findings F1–F8 | BuilderHunt bugs | not applicable; none observed |

Aesthetic-direction verbs (`bolder`, `quieter`, `colorize`, `delight`) were
**not** applied — excluded by skill §11.D.
