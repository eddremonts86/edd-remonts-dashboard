import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createProject, deleteProject, getProjects, updateProject } from '../server/projects'
import type { Project, ProjectInput } from '../types'

export const projectKeys = { all: ['portfolio', 'projects'] as const }

export function useProjects() {
  return useQuery({ queryKey: projectKeys.all, queryFn: () => getProjects() })
}

export function useCreateProject() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: ProjectInput) => createProject({ data }),
    onSuccess: () => qc.invalidateQueries({ queryKey: projectKeys.all }),
  })
}

export function useUpdateProject() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: Project) => updateProject({ data }),
    onSuccess: () => qc.invalidateQueries({ queryKey: projectKeys.all }),
  })
}

export function useDeleteProject() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteProject({ data: { id } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: projectKeys.all }),
  })
}
