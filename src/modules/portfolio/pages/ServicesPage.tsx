import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  useCreateService,
  useDeleteService,
  useServices,
  useUpdateService,
} from '../api/services.queries'
import type { Service, ServiceInput } from '../types'

const LOCALES = ['en', 'es', 'dk'] as const

const EMPTY: ServiceInput = {
  iconSlug: 'code',
  visible: true,
  sortOrder: 0,
  translations: LOCALES.map((locale) => ({ locale, title: '', description: '' })),
}

export function ServicesPage() {
  const { t } = useTranslation()
  const { data: services = [], isLoading } = useServices()
  const createMut = useCreateService()
  const updateMut = useUpdateService()
  const deleteMut = useDeleteService()

  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Service | null>(null)
  const [form, setForm] = useState<ServiceInput>(EMPTY)

  function openCreate() {
    setEditing(null)
    setForm(EMPTY)
    setOpen(true)
  }

  function openEdit(svc: Service) {
    setEditing(svc)
    setForm({
      iconSlug: svc.iconSlug,
      visible: svc.visible,
      sortOrder: svc.sortOrder,
      translations: LOCALES.map((locale) => {
        const t = svc.translations.find((tr) => tr.locale === locale)
        return { locale, title: t?.title ?? '', description: t?.description ?? '' }
      }),
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

  function setTranslation(locale: string, field: 'title' | 'description', value: string) {
    setForm((prev) => ({
      ...prev,
      translations: prev.translations.map((tr) =>
        tr.locale === locale ? { ...tr, [field]: value } : tr,
      ),
    }))
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground">
          {t('sidebar.portfolio.services', 'Services')}
        </h1>
        <Button onClick={openCreate}>{t('common.add', 'Add')}</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('services.title', 'Title (EN)')}</TableHead>
            <TableHead>{t('services.icon', 'Icon')}</TableHead>
            <TableHead>{t('services.visible', 'Visible')}</TableHead>
            <TableHead>{t('services.order', 'Order')}</TableHead>
            <TableHead className="w-32" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading && (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground">
                {t('common.loading', 'Loading…')}
              </TableCell>
            </TableRow>
          )}
          {services.map((svc) => {
            const enTitle = svc.translations.find((tr) => tr.locale === 'en')?.title ?? '—'
            return (
              <TableRow key={svc.id}>
                <TableCell className="font-medium">{enTitle}</TableCell>
                <TableCell className="text-muted-foreground">{svc.iconSlug}</TableCell>
                <TableCell className="text-muted-foreground">{svc.visible ? '✓' : '—'}</TableCell>
                <TableCell className="text-muted-foreground">{svc.sortOrder}</TableCell>
                <TableCell className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => openEdit(svc)}>
                    {t('common.edit', 'Edit')}
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteMut.mutate(svc.id)}
                  >
                    {t('common.delete', 'Delete')}
                  </Button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="overflow-y-auto sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>
              {editing ? t('services.edit', 'Edit Service') : t('services.create', 'New Service')}
            </SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label>{t('services.icon', 'Icon Slug')}</Label>
                <Input
                  value={form.iconSlug}
                  onChange={(e) => setForm((p) => ({ ...p, iconSlug: e.target.value }))}
                  placeholder="code"
                />
              </div>
              <div className="space-y-1">
                <Label>{t('services.order', 'Sort Order')}</Label>
                <Input
                  type="number"
                  value={form.sortOrder}
                  onChange={(e) => setForm((p) => ({ ...p, sortOrder: Number(e.target.value) }))}
                />
              </div>
            </div>

            {LOCALES.map((locale) => {
              const tr = form.translations.find((t) => t.locale === locale)
              const labels: Record<string, string> = { en: 'English', es: 'Spanish', dk: 'Danish' }
              return (
                <div key={locale} className="space-y-3 rounded-lg border p-4">
                  <p className="text-sm font-medium text-muted-foreground">{labels[locale]}</p>
                  <div className="space-y-1">
                    <Label>{t('services.title', 'Title')}</Label>
                    <Input
                      value={tr?.title ?? ''}
                      onChange={(e) => setTranslation(locale, 'title', e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label>{t('services.description', 'Description')}</Label>
                    <Textarea
                      rows={3}
                      value={tr?.description ?? ''}
                      onChange={(e) => setTranslation(locale, 'description', e.target.value)}
                    />
                  </div>
                </div>
              )
            })}

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
