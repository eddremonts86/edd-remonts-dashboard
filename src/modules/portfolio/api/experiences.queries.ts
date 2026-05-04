import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createExperience,
  deleteExperience,
  getExperiences,
  updateExperience,
} from '../server/experiences'
import type { Experience, ExperienceInput } from '../types'

export const experienceKeys = {
  all: ['portfolio', 'experiences'] as const,
}

export function useExperiences() {
  return useQuery({
    queryKey: experienceKeys.all,
    queryFn: () => getExperiences(),
  })
}

export function useCreateExperience() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: ExperienceInput) => createExperience({ data }),
    onSuccess: () => qc.invalidateQueries({ queryKey: experienceKeys.all }),
  })
}

export function useUpdateExperience() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: Experience) => updateExperience({ data }),
    onSuccess: () => qc.invalidateQueries({ queryKey: experienceKeys.all }),
  })
}

export function useDeleteExperience() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteExperience({ data: { id } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: experienceKeys.all }),
  })
}
