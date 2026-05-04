import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useContentBlocks, useUpsertContentBlock } from '../api/content.queries'
import type { ContentBlock } from '../types'

export function ContentBlocksPage() {
  const { t } = useTranslation()
  const { data: blocks = [], isLoading } = useContentBlocks()
  const upsertMut = useUpsertContentBlock()

  const [editing, setEditing] = useState<ContentBlock | null>(null)
  const [form, setForm] = useState<ContentBlock | null>(null)

  function openEdit(block: ContentBlock) {
    setEditing(block)
    setForm({ ...block })
  }

  async function onSave() {
    if (!form) return
    await upsertMut.mutateAsync(form)
    setEditing(null)
    setForm(null)
  }

  if (editing && form) {
    return (
      <div className="space-y-6 p-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => { setEditing(null); setForm(null) }}>
            ← {t('common.back', 'Back')}
          </Button>
          <h1 className="text-2xl font-semibold text-foreground">
            {t('content.edit', 'Edit Content Block')} — <code className="text-base">{editing.key}</code>
          </h1>
        </div>

        <div className="space-y-4 rounded-xl border border-border p-6">
          {(['valueEn', 'valueEs', 'valueDk'] as const).map((field) => {
            const label = { valueEn: 'English', valueEs: 'Spanish', valueDk: 'Danish' }[field]
            const value = form[field] ?? ''
            const isLong = value.length > 80
            return (
              <div key={field} className="space-y-1">
                <Label>{label}</Label>
                {isLong ? (
                  <Textarea
                    rows={4}
                    value={value}
                    onChange={(e) => setForm((f) => f ? { ...f, [field]: e.target.value } : f)}
                  />
                ) : (
                  <Input
                    value={value}
                    onChange={(e) => setForm((f) => f ? { ...f, [field]: e.target.value } : f)}
                  />
                )}
              </div>
            )
          })}
          <Button onClick={onSave} disabled={upsertMut.isPending}>
            {t('common.save', 'Save')}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-semibold text-foreground">{t('sidebar.portfolio.content', 'Content Blocks')}</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('content.key', 'Key')}</TableHead>
            <TableHead>{t('content.valueEn', 'English')}</TableHead>
            <TableHead className="w-24" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading && (
            <TableRow>
              <TableCell colSpan={3} className="text-center text-muted-foreground">
                {t('common.loading', 'Loading…')}
              </TableCell>
            </TableRow>
          )}
          {blocks.map((block) => (
            <TableRow key={block.key}>
              <TableCell className="font-mono text-sm">{block.key}</TableCell>
              <TableCell className="max-w-xs truncate text-muted-foreground">{block.valueEn}</TableCell>
              <TableCell>
                <Button size="sm" variant="outline" onClick={() => openEdit(block)}>
                  {t('common.edit', 'Edit')}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
