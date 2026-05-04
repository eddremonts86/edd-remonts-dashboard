# Spec: Dashboard Portfolio Widgets

## Objective

Replace the generic "Getting Started" template on `/dashboard` (the main index page) with
meaningful KPI widgets that give Eduardo an at-a-glance overview of his portfolio data.

**Target user:** Eduardo (portfolio owner), sole admin of the dashboard.

**Success looks like:**
- Opening `/dashboard` shows portfolio entity counts (experiences, projects, skills, testimonials)
- Each stat card is a clickable shortcut to the relevant portfolio management section
- Style is consistent with the existing "Total Users" widget (shadcn/ui `Card`)
- Data is fetched server-side via `getDashboardStatsFn` (single efficient query, no N+1)

## Tech Stack

- TanStack Start (React 18 + SSR), TanStack Query
- Drizzle ORM + PostgreSQL
- shadcn/ui Cards, Tabler Icons
- i18next for labels
- TypeScript strict

## Commands

```bash
# Dev server (from workspace root, targets edd-remonts-dashboard)
pnpm dev:server

# Type check
cd apps/edd-remonts-dashboard && pnpm tsc --noEmit

# Lint
cd apps/edd-remonts-dashboard && pnpm lint
```

## Project Structure

Files touched by this spec:

```
apps/edd-remonts-dashboard/src/modules/dashboard/
  api/dashboard.fn.ts          ← extend DashboardStats + handler with COUNT queries
  components/DashboardPage.tsx ← replace "Getting Started" card with KPI grid + quick links
```

## Code Style

```tsx
// Each KPI widget:
<Link to="/dashboard/portfolio/experiences">
  <Card className="cursor-pointer transition-colors hover:bg-muted/40">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">
        {t('dashboard.stats.totalExperiences', 'Total Experiences')}
      </CardTitle>
      <div className="flex items-center gap-1">
        {isFetching && <WidgetRefreshingIndicator />}
        <WidgetRefreshButton isRefreshing={isFetching} onRefresh={refetch} />
        <IconBriefcase className="h-4 w-4 text-muted-foreground" />
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{data?.totalExperiences ?? 0}</div>
      <p className="text-xs text-muted-foreground mt-1">
        {t('dashboard.stats.workExperiences', 'Work experiences')}
      </p>
    </CardContent>
  </Card>
</Link>
```

## Widgets Plan

| Widget | Icon | Value source | Link |
|---|---|---|---|
| Total Users | `IconUsers` | `COUNT(users)` | `/dashboard/users` |
| Total Experiences | `IconBriefcase` | `COUNT(portfolioExperiences)` | `/dashboard/portfolio/experiences` |
| Total Projects | `IconFolderCode` | `COUNT(portfolioProjects)` | `/dashboard/portfolio/projects` |
| Total Skills | `IconCode` | `COUNT(portfolioSkills)` | `/dashboard/portfolio/skills` |
| Total Testimonials | `IconQuote` | `COUNT(portfolioTestimonials)` | `/dashboard/portfolio/testimonials` |

Followed by a **Quick Access** grid replacing the "Getting Started" placeholder.

## Boundaries

- **Always:** Keep the existing "Total Users" widget; run `tsc --noEmit` before declaring done
- **Ask first:** Adding new DB tables; changing sidebar navigation
- **Never:** Remove the Users widget; hardcode counts; change routes

## Success Criteria

- [ ] `/dashboard` shows 5 KPI cards (users + 4 portfolio entities) with real DB counts
- [ ] Each card links to its management page
- [ ] Quick access section replaces the "Getting Started" placeholder
- [ ] Zero TypeScript errors
- [ ] No "0" values — counts are loaded in the same server function call as `totalUsers`
