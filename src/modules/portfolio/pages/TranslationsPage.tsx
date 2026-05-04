import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAllTranslations, useUpsertTranslations } from '../api/content.queries'
import type { TranslationRow } from '../types'

const LOCALES = ['en', 'es', 'dk'] as const

export function TranslationsPage() {
  const { t } = useTranslation()
  const { data: rows = [], isLoading } = useAllTranslations()
  const upsertMut = useUpsertTranslations()

  // edits: key = `${locale}::${translationKey}`, value = string
  const [edits, setEdits] = useState<Record<string, string>>({})

  function valueFor(key: string, locale: string): string {
    const editKey = `${locale}::${key}`
    if (editKey in edits) return edits[editKey]
    return rows.find((r) => r.locale === locale && r.translationKey === key)?.value ?? ''
  }

  // collect all unique translationKeys
  const allKeys = Array.from(new Set(rows.map((r) => r.translationKey))).sort()

  function onEdit(key: string, locale: string, value: string) {
    setEdits((prev) => ({ ...prev, [`${locale}::${key}`]: value }))
  }

  async function onSave() {
    const toSave: TranslationRow[] = Object.entries(edits).map(([compositeKey, value]) => {
      const [locale, translationKey] = compositeKey.split('::')
      return { locale: locale as 'en' | 'es' | 'dk', translationKey, value, updatedAt: new Date().toISOString() }
    })
    if (toSave.length === 0) return
    await upsertMut.mutateAsync(toSave)
    setEdits({})
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground">{t('sidebar.portfolio.translations', 'Translations')}</h1>
        <Button onClick={onSave} disabled={upsertMut.isPending || Object.keys(edits).length === 0}>
          {t('common.saveAll', 'Save all')} {Object.keys(edits).length > 0 && `(${Object.keys(edits).length})`}
        </Button>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">{t('common.loading', 'Loading…')}</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Key</th>
                {LOCALES.map((locale) => (
                  <th key={locale} className="px-4 py-3 text-left font-medium text-muted-foreground uppercase">
                    {locale}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allKeys.map((key, i) => (
                <tr
                  key={key}
                  className={i % 2 === 0 ? 'bg-background' : 'bg-muted/20'}
                >
                  <td className="px-4 py-2 font-mono text-xs text-muted-foreground">{key}</td>
                  {LOCALES.map((locale) => (
                    <td key={locale} className="px-4 py-2">
                      <Input
                        className="h-7 text-xs"
                        value={valueFor(key, locale)}
                        onChange={(e) => onEdit(key, locale, e.target.value)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
