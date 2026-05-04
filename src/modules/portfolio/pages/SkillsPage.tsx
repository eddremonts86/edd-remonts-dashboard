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
  useCreateSkill,
  useDeleteSkill,
  useSkills,
  useUpdateSkill,
} from '../api/skills.queries'
import type { Skill, SkillInput } from '../types'

const EMPTY: SkillInput = {
  name: '',
  iconSlug: '',
  category: '',
  proficiency: 0,
  visible: true,
  sortOrder: 0,
}

export function SkillsPage() {
  const { t } = useTranslation()
  const { data: skills = [], isLoading } = useSkills()
  const createMut = useCreateSkill()
  const updateMut = useUpdateSkill()
  const deleteMut = useDeleteSkill()

  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Skill | null>(null)
  const [form, setForm] = useState<SkillInput>(EMPTY)

  function openCreate() {
    setEditing(null)
    setForm(EMPTY)
    setOpen(true)
  }

  function openEdit(skill: Skill) {
    setEditing(skill)
    setForm({
      name: skill.name,
      iconSlug: skill.iconSlug ?? '',
      category: skill.category ?? '',
      proficiency: skill.proficiency ?? 0,
      visible: skill.visible ?? true,
      sortOrder: skill.sortOrder ?? 0,
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
        <h1 className="text-2xl font-semibold text-foreground">{t('sidebar.portfolio.skills', 'Skills & Tech')}</h1>
        <Button onClick={openCreate}>{t('common.add', 'Add')}</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('skills.name', 'Name')}</TableHead>
            <TableHead>{t('skills.category', 'Category')}</TableHead>
            <TableHead>{t('skills.proficiency', 'Proficiency')}</TableHead>
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
          {skills.map((skill) => (
            <TableRow key={skill.id}>
              <TableCell className="font-medium">{skill.name}</TableCell>
              <TableCell className="text-muted-foreground">{skill.category}</TableCell>
              <TableCell className="text-muted-foreground">{skill.proficiency ?? '—'}</TableCell>
              <TableCell className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => openEdit(skill)}>
                  {t('common.edit', 'Edit')}
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => deleteMut.mutate(skill.id)}
                >
                  {t('common.delete', 'Delete')}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>
              {editing ? t('skills.edit', 'Edit Skill') : t('skills.create', 'New Skill')}
            </SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-4">
            {(
              [
                ['name', t('skills.name', 'Name')],
                ['iconSlug', t('skills.iconSlug', 'Icon Slug')],
                ['category', t('skills.category', 'Category')],
              ] as [keyof SkillInput, string][]
            ).map(([field, label]) => (
              <div key={field} className="space-y-1">
                <Label>{label}</Label>
                <Input
                  value={(form[field] as string) ?? ''}
                  onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                />
              </div>
            ))}
            <div className="space-y-1">
              <Label>{t('skills.proficiency', 'Proficiency (0–100)')}</Label>
              <Input
                type="number"
                min={0}
                max={100}
                value={form.proficiency ?? 0}
                onChange={(e) => setForm((f) => ({ ...f, proficiency: Number(e.target.value) }))}
              />
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
