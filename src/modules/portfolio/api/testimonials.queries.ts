import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createTestimonial,
  deleteTestimonial,
  getTestimonials,
  updateTestimonial,
} from '../server/testimonials'
import type { Testimonial, TestimonialInput } from '../types'

export const testimonialKeys = { all: ['portfolio', 'testimonials'] as const }

export function useTestimonials() {
  return useQuery({ queryKey: testimonialKeys.all, queryFn: () => getTestimonials() })
}

export function useCreateTestimonial() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: TestimonialInput) => createTestimonial({ data }),
    onSuccess: () => qc.invalidateQueries({ queryKey: testimonialKeys.all }),
  })
}

export function useUpdateTestimonial() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: Testimonial) => updateTestimonial({ data }),
    onSuccess: () => qc.invalidateQueries({ queryKey: testimonialKeys.all }),
  })
}

export function useDeleteTestimonial() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteTestimonial({ data: { id } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: testimonialKeys.all }),
  })
}
