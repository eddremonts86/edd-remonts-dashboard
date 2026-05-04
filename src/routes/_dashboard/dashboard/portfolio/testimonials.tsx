import { createFileRoute } from '@tanstack/react-router'
import { TestimonialsPage } from '@/modules/portfolio/pages/TestimonialsPage'

export const Route = createFileRoute('/_dashboard/dashboard/portfolio/testimonials')({
  component: TestimonialsPage,
})
