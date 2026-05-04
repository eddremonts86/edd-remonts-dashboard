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
  useCreateExperience,
  useDeleteExperience,
  useExperiences,
  useUpdateExperience,
} from '../api/experiences.queries'
import type { Experience, ExperienceInput } from '../types'

const EMPTY: ExperienceInput = {
  company: '',
  location: '',
  periodStart: '',
  periodEnd: '',
  url: '',
  sortOrder: 0,
  translations: [],
}

export function ExperiencesPage() {
  const { t } = useTranslation()
  const { data: experiences = [], isLoading } = useExperiences()
  const createMut = useCreateExperience()
  const updateMut = useUpdateExperience()
  const deleteMut = useDeleteExperience()

  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Experience | null>(null)
  const [form, setForm] = useState<ExperienceInput>(EMPTY)

  function openCreate() {
    setEditing(null)
    setForm(EMPTY)
    setOpen(true)
  }

  function openEdit(exp: Experience) {
    setEditing(exp)
    setForm({
      company: exp.company,
      location: exp.location ?? '',
      periodStart: exp.periodStart ?? '',
      periodEnd: exp.periodEnd ?? '',
      url: exp.url ?? '',
      sortOrder: exp.sortOrder ?? 0,
      translations: exp.translations ?? [],
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
        <h1 className="text-2xl font-semibold text-foreground">{t('sidebar.portfolio.experiences', 'Experiences')}</h1>
        <Button onClick={openCreate}>{t('common.add', 'Add')}</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('experience.company', 'Company')}</TableHead>
            <TableHead>{t('experience.location', 'Location')}</TableHead>
            <TableHead>{t('experience.period', 'Period')}</TableHead>
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
          {experiences.map((exp) => (
            <TableRow key={exp.id}>
              <TableCell className="font-medium">{exp.company}</TableCell>
              <TableCell className="text-muted-foreground">{exp.location}</TableCell>
              <TableCell className="text-muted-foreground">
                {exp.periodStart} – {exp.periodEnd ?? 'Present'}
              </TableCell>
              <TableCell className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => openEdit(exp)}>
                  {t('common.edit', 'Edit')}
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => deleteMut.mutate(exp.id)}
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
              {editing ? t('experience.edit', 'Edit Experience') : t('experience.create', 'New Experience')}
            </SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-4">
            {(
              [
                ['company', t('experience.company', 'Company')],
                ['location', t('experience.location', 'Location')],
                ['periodStart', t('experience.periodStart', 'Start')],
                ['periodEnd', t('experience.periodEnd', 'End')],
                ['url', t('experience.url', 'URL')],
              ] as [keyof ExperienceInput, string][]
            ).map(([field, label]) => (
              <div key={field} className="space-y-1">
                <Label>{label}</Label>
                <Input
                  value={(form[field] as string) ?? ''}
                  onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                />
              </div>
            ))}
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
