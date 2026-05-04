import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getContentBlocks, upsertContentBlock, upsertContentBlocks } from '../server/content'
import { getAllTranslations, upsertTranslations } from '../server/translations'
import type { ContentBlock, TranslationRow } from '../types'

export const contentKeys = {
  all: ['portfolio', 'content'] as const,
  translations: ['portfolio', 'translations'] as const,
}

export function useContentBlocks() {
  return useQuery({ queryKey: contentKeys.all, queryFn: () => getContentBlocks() })
}

export function useUpsertContentBlock() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: ContentBlock) => upsertContentBlock({ data }),
    onSuccess: () => qc.invalidateQueries({ queryKey: contentKeys.all }),
  })
}

export function useUpsertContentBlocks() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: ContentBlock[]) => upsertContentBlocks({ data }),
    onSuccess: () => qc.invalidateQueries({ queryKey: contentKeys.all }),
  })
}

export function useAllTranslations() {
  return useQuery({
    queryKey: contentKeys.translations,
    queryFn: () => getAllTranslations(),
  })
}

export function useUpsertTranslations() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: TranslationRow[]) => upsertTranslations({ data }),
    onSuccess: () => qc.invalidateQueries({ queryKey: contentKeys.translations }),
  })
}
