import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createSkill, deleteSkill, getSkills, updateSkill } from '../server/skills'
import type { Skill, SkillInput } from '../types'

export const skillKeys = { all: ['portfolio', 'skills'] as const }

export function useSkills() {
  return useQuery({ queryKey: skillKeys.all, queryFn: () => getSkills() })
}

export function useCreateSkill() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: SkillInput) => createSkill({ data }),
    onSuccess: () => qc.invalidateQueries({ queryKey: skillKeys.all }),
  })
}

export function useUpdateSkill() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: Skill) => updateSkill({ data }),
    onSuccess: () => qc.invalidateQueries({ queryKey: skillKeys.all }),
  })
}

export function useDeleteSkill() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteSkill({ data: { id } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: skillKeys.all }),
  })
}
