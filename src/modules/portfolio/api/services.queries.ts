import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createService, deleteService, getServices, updateService } from '../server/services'
import type { Service, ServiceInput } from '../types'

export const serviceKeys = { all: ['portfolio', 'services'] as const }

export function useServices() {
  return useQuery({ queryKey: serviceKeys.all, queryFn: () => getServices() })
}

export function useCreateService() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: ServiceInput) => createService({ data }),
    onSuccess: () => qc.invalidateQueries({ queryKey: serviceKeys.all }),
  })
}

export function useUpdateService() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: Service) => updateService({ data }),
    onSuccess: () => qc.invalidateQueries({ queryKey: serviceKeys.all }),
  })
}

export function useDeleteService() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteService({ data: { id } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: serviceKeys.all }),
  })
}
