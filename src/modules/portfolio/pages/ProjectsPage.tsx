import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Textarea } from '@/components/ui/textarea'
import {
  useCreateProject,
  useDeleteProject,
  useProjects,
  useUpdateProject,
} from '../api/projects.queries'
import type { Project, ProjectInput } from '../types'

const LOCALES = ['en', 'es', 'dk'] as const

const EMPTY: ProjectInput = {
  title: '',
  coverImageUrl: '',
  link: '',
  repositoryUrl: '',
  internalImageUrl: '',
  category: '',
  scaleLabel: '',
  impactLabel: '',
  architectureLabel: '',
  featured: false,
  sortOrder: 0,
  translations: LOCALES.map((locale) => ({
    locale,
    description: '',
    problem: '',
    context: '',
    role: '',
    decisions: '',
    complexity: '',
    results: '',
  })),
}

export function ProjectsPage() {
  const { t } = useTranslation()
  const { data: projects = [], isLoading } = useProjects()
  const createMut = useCreateProject()
  const updateMut = useUpdateProject()
  const deleteMut = useDeleteProject()

  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Project | null>(null)
  const [form, setForm] = useState<ProjectInput>(EMPTY)

  function openCreate() {
    setEditing(null)
    setForm(EMPTY)
    setOpen(true)
  }

  function openEdit(project: Project) {
    setEditing(project)
    setForm({
      title: project.title,
      coverImageUrl: project.coverImageUrl ?? '',
      link: project.link ?? '',
      repositoryUrl: project.repositoryUrl ?? '',
      internalImageUrl: project.internalImageUrl ?? '',
      category: project.category ?? '',
      scaleLabel: project.scaleLabel ?? '',
      impactLabel: project.impactLabel ?? '',
      architectureLabel: project.architectureLabel ?? '',
      featured: project.featured ?? false,
      sortOrder: project.sortOrder ?? 0,
      translations: LOCALES.map((locale) => {
        const tr = project.translations.find((item) => item.locale === locale)
        return {
          locale,
          description: tr?.description ?? '',
          problem: tr?.problem ?? '',
          context: tr?.context ?? '',
          role: tr?.role ?? '',
          decisions: tr?.decisions ?? '',
          complexity: tr?.complexity ?? '',
          results: tr?.results ?? '',
        }
      }),
    })
    setOpen(true)
  }

  function setTranslation(
    locale: (typeof LOCALES)[number],
    field: 'description' | 'problem' | 'context' | 'role' | 'decisions' | 'complexity' | 'results',
    value: string,
  ) {
    setForm((prev) => ({
      ...prev,
      translations: prev.translations.map((tr) =>
        tr.locale === locale ? { ...tr, [field]: value } : tr,
      ),
    }))
  }

  async function onSave() {
    if (editing) {
      await updateMut.mutateAsync({ ...editing, ...form })
    } else {
      await createMut.mutateAsync(form)
    }
    setOpen(false)
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground">
          {t('sidebar.portfolio.projects', 'Projects')}
        </h1>
        <Button onClick={openCreate}>{t('common.add', 'Add')}</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('projects.columns.title', 'Title')}</TableHead>
            <TableHead>{t('projects.columns.category', 'Category')}</TableHead>
            <TableHead>{t('projects.columns.impact', 'Impact')}</TableHead>
            <TableHead>{t('projects.columns.featured', 'Featured')}</TableHead>
            <TableHead className="w-24" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading && (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-muted-foreground">
                {t('common.loading', 'Loading…')}
              </TableCell>
            </TableRow>
          )}
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell className="font-medium">{project.title}</TableCell>
              <TableCell className="text-muted-foreground">{project.category}</TableCell>
              <TableCell className="max-w-xs truncate text-muted-foreground">
                {project.impactLabel || '—'}
              </TableCell>
              <TableCell>{project.featured ? '★' : '—'}</TableCell>
              <TableCell className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => openEdit(project)}>
                  {t('common.edit', 'Edit')}
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => deleteMut.mutate(project.id)}
                >
                  {t('common.delete', 'Delete')}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="overflow-y-auto sm:max-w-md">
          <SheetHeader>
            <SheetTitle>
              {editing ? t('projects.edit', 'Edit Project') : t('projects.create', 'New Project')}
            </SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-6">
            {(
              [
                ['title', t('projects.title', 'Title')],
                ['coverImageUrl', t('projects.coverImageUrl', 'Cover Image URL')],
                ['link', t('projects.link', 'Link')],
                ['repositoryUrl', t('projects.repositoryUrl', 'Repository URL')],
                ['internalImageUrl', t('projects.internalImageUrl', 'Internal Screenshot URL')],
                ['category', t('projects.category', 'Category')],
                ['scaleLabel', t('projects.scaleLabel', 'Scale')],
                ['impactLabel', t('projects.impactLabel', 'Impact')],
                ['architectureLabel', t('projects.architectureLabel', 'Architecture')],
              ] as [keyof ProjectInput, string][]
            ).map(([field, label]) => (
              <div key={field} className="space-y-1">
                <Label>{label}</Label>
                <Input
                  value={(form[field] as string) ?? ''}
                  onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                />
              </div>
            ))}

            {LOCALES.map((locale) => {
              const tr = form.translations.find((item) => item.locale === locale)
              const localeLabel: Record<(typeof LOCALES)[number], string> = {
                en: 'English',
                es: 'Spanish',
                dk: 'Danish',
              }
              if (!tr) return null

              return (
                <div key={locale} className="space-y-3 rounded-lg border p-4">
                  <p className="text-sm font-medium text-muted-foreground">{localeLabel[locale]}</p>

                  <div className="space-y-1">
                    <Label>{t('projects.description', 'Description')}</Label>
                    <Textarea
                      rows={3}
                      value={tr.description}
                      onChange={(e) => setTranslation(locale, 'description', e.target.value)}
                    />
                  </div>

                  <div className="space-y-1">
                    <Label>{t('projects.problem', 'Problem')}</Label>
                    <Textarea
                      rows={3}
                      value={tr.problem}
                      onChange={(e) => setTranslation(locale, 'problem', e.target.value)}
                    />
                  </div>

                  <div className="space-y-1">
                    <Label>{t('projects.context', 'Context')}</Label>
                    <Textarea
                      rows={2}
                      value={tr.context}
                      onChange={(e) => setTranslation(locale, 'context', e.target.value)}
                    />
                  </div>

                  <div className="space-y-1">
                    <Label>{t('projects.role', 'Role')}</Label>
                    <Textarea
                      rows={2}
                      value={tr.role}
                      onChange={(e) => setTranslation(locale, 'role', e.target.value)}
                    />
                  </div>

                  <div className="space-y-1">
                    <Label>{t('projects.decisions', 'Technical Decisions')}</Label>
                    <Textarea
                      rows={3}
                      value={tr.decisions}
                      onChange={(e) => setTranslation(locale, 'decisions', e.target.value)}
                    />
                  </div>

                  <div className="space-y-1">
                    <Label>{t('projects.complexity', 'Complexity')}</Label>
                    <Textarea
                      rows={2}
                      value={tr.complexity}
                      onChange={(e) => setTranslation(locale, 'complexity', e.target.value)}
                    />
                  </div>

                  <div className="space-y-1">
                    <Label>{t('projects.results', 'Results')}</Label>
                    <Textarea
                      rows={3}
                      value={tr.results}
                      onChange={(e) => setTranslation(locale, 'results', e.target.value)}
                    />
                  </div>
                </div>
              )
            })}

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                aria-label={t('projects.featured', 'Featured')}
                checked={form.featured ?? false}
                onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
              />
              <Label htmlFor="featured">{t('projects.featured', 'Featured')}</Label>
            </div>
            <Button
              className="w-full"
              onClick={onSave}
              disabled={createMut.isPending || updateMut.isPending}
            >
              {t('common.save', 'Save')}
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
