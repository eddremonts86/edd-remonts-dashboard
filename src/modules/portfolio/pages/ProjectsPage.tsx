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
import {
  useCreateProject,
  useDeleteProject,
  useProjects,
  useUpdateProject,
} from '../api/projects.queries'
import type { Project, ProjectInput } from '../types'

const EMPTY: ProjectInput = {
  title: '',
  coverImageUrl: '',
  link: '',
  category: '',
  featured: false,
  sortOrder: 0,
  translations: [],
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
      category: project.category ?? '',
      featured: project.featured ?? false,
      sortOrder: project.sortOrder ?? 0,
      translations: project.translations ?? [],
    })
    setOpen(true)
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
        <h1 className="text-2xl font-semibold text-foreground">{t('sidebar.portfolio.projects', 'Projects')}</h1>
        <Button onClick={openCreate}>{t('common.add', 'Add')}</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('projects.columns.title', 'Title')}</TableHead>
            <TableHead>{t('projects.columns.category', 'Category')}</TableHead>
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
          <div className="mt-6 space-y-4">
            {(
              [
                ['title', t('projects.title', 'Title')],
                ['coverImageUrl', t('projects.coverImageUrl', 'Cover Image URL')],
                ['link', t('projects.link', 'Link')],
                ['category', t('projects.category', 'Category')],
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
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
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
