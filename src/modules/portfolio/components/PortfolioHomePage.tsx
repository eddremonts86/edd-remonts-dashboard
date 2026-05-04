import { useContentBlocks } from '../api/content.queries'
import { useExperiences } from '../api/experiences.queries'
import { useProjects } from '../api/projects.queries'
import { useServices } from '../api/services.queries'
import { useSkills } from '../api/skills.queries'
import { useTestimonials } from '../api/testimonials.queries'
import { AboutSection } from './landing/AboutSection'
import { ContactSection } from './landing/ContactSection'
import { ExperienceSection } from './landing/ExperienceSection'
import { HeroSection } from './landing/HeroSection'
import { ProjectsSection } from './landing/ProjectsSection'
import { ServicesSection } from './landing/ServicesSection'
import { SkillsSection } from './landing/SkillsSection'
import { TestimonialsSection } from './landing/TestimonialsSection'

export function PortfolioHomePage() {
  const { data: experiences = [] } = useExperiences()
  const { data: skills = [] } = useSkills()
  const { data: projects = [] } = useProjects()
  const { data: testimonials = [] } = useTestimonials()
  const { data: content = [] } = useContentBlocks()
  const { data: services = [] } = useServices()

  return (
    <main>
      <HeroSection content={content} />
      <AboutSection content={content} />
      <ServicesSection services={services} />
      <SkillsSection skills={skills} />
      <ExperienceSection experiences={experiences} />
      <ProjectsSection projects={projects} />
      <TestimonialsSection testimonials={testimonials} />
      <ContactSection content={content} />
    </main>
  )
}
