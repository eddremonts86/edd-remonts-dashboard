import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useContentBlocks, useUpsertContentBlocks } from '@/modules/portfolio/api/content.queries'
import type { ContentBlock } from '@/modules/portfolio/types'

const SITE_KEYS = ['site.title', 'site.description', 'site.url', 'site.og_image'] as const

export function SiteMetaSettings() {
  const { t } = useTranslation()
  const { data: blocks = [], isLoading } = useContentBlocks()
  const upsertMut = useUpsertContentBlocks()

  const [edits, setEdits] = useState<Record<string, Partial<ContentBlock>>>({})

  function getBlock(key: string): ContentBlock {
    const existing = blocks.find((b) => b.key === key)
    return existing ?? { key, valueEn: '', valueEs: '', valueDk: '' }
  }

  function setField(key: string, field: keyof ContentBlock, value: string) {
    setEdits((prev) => ({
      ...prev,
      [key]: { ...getBlock(key), ...(prev[key] ?? {}), [field]: value },
    }))
  }

  function valueFor(key: string, field: keyof ContentBlock): string {
    return (edits[key]?.[field] as string | undefined) ?? (getBlock(key)[field] as string) ?? ''
  }

  async function onSave() {
    const toSave: ContentBlock[] = SITE_KEYS.map((key) => ({
      ...getBlock(key),
      ...(edits[key] ?? {}),
    }))
    await upsertMut.mutateAsync(toSave)
    setEdits({})
  }

  if (isLoading) {
    return <p className="text-muted-foreground">{t('common.loading', 'Loading…')}</p>
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground">{t('settings.site.title', 'Site Metadata')}</h3>
        <p className="text-sm text-muted-foreground">
          {t('settings.site.description', 'Control the site title, description, and social sharing metadata.')}
        </p>
      </div>

      <div className="space-y-6 rounded-xl border border-border p-6">
        {SITE_KEYS.map((key) => (
          <div key={key} className="space-y-3">
            <p className="text-sm font-medium text-foreground font-mono">{key}</p>
            <div className="grid gap-2 md:grid-cols-3">
              {(['valueEn', 'valueEs', 'valueDk'] as const).map((field) => (
                <div key={field} className="space-y-1">
                  <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                    {field.replace('value', '')}
                  </Label>
                  <Input
                    value={valueFor(key, field)}
                    onChange={(e) => setField(key, field, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Button onClick={onSave} disabled={upsertMut.isPending || Object.keys(edits).length === 0}>
        {t('common.save', 'Save changes')}
      </Button>
    </div>
  )
}
