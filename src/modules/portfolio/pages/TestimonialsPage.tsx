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
  useCreateTestimonial,
  useDeleteTestimonial,
  useTestimonials,
  useUpdateTestimonial,
} from '../api/testimonials.queries'
import type { Testimonial, TestimonialInput } from '../types'

const EMPTY: TestimonialInput = {
  authorName: '',
  authorRole: '',
  authorCompany: '',
  avatarUrl: '',
  visible: true,
  sortOrder: 0,
  translations: [],
}

export function TestimonialsPage() {
  const { t } = useTranslation()
  const { data: testimonials = [], isLoading } = useTestimonials()
  const createMut = useCreateTestimonial()
  const updateMut = useUpdateTestimonial()
  const deleteMut = useDeleteTestimonial()

  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Testimonial | null>(null)
  const [form, setForm] = useState<TestimonialInput>(EMPTY)

  function openCreate() {
    setEditing(null)
    setForm(EMPTY)
    setOpen(true)
  }

  function openEdit(item: Testimonial) {
    setEditing(item)
    setForm({
      authorName: item.authorName,
      authorRole: item.authorRole ?? '',
      authorCompany: item.authorCompany ?? '',
      avatarUrl: item.avatarUrl ?? '',
      visible: item.visible ?? true,
      sortOrder: item.sortOrder ?? 0,
      translations: item.translations ?? [],
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
        <h1 className="text-2xl font-semibold text-foreground">{t('sidebar.portfolio.testimonials', 'Testimonials')}</h1>
        <Button onClick={openCreate}>{t('common.add', 'Add')}</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('testimonials.author', 'Author')}</TableHead>
            <TableHead>{t('testimonials.role', 'Role')}</TableHead>
            <TableHead>{t('testimonials.company', 'Company')}</TableHead>
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
          {testimonials.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.authorName}</TableCell>
              <TableCell className="text-muted-foreground">{item.authorRole}</TableCell>
              <TableCell className="text-muted-foreground">{item.authorCompany}</TableCell>
              <TableCell className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => openEdit(item)}>
                  {t('common.edit', 'Edit')}
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => deleteMut.mutate(item.id)}
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
              {editing ? t('testimonials.edit', 'Edit Testimonial') : t('testimonials.create', 'New Testimonial')}
            </SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-4">
            {(
              [
                ['authorName', t('testimonials.author', 'Author Name')],
                ['authorRole', t('testimonials.role', 'Role')],
                ['authorCompany', t('testimonials.company', 'Company')],
                ['avatarUrl', t('testimonials.avatarUrl', 'Avatar URL')],
              ] as [keyof TestimonialInput, string][]
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
