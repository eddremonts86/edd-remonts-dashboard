import { useMousePosition } from '@/portfolio/hooks/useMousePosition';
import { useProjectFilter } from '@/portfolio/hooks/useProjectFilter';
import { AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { CategoryFilter } from './CategoryFilter';
import { FloatingImagePreview } from './FloatingImagePreview';
import { ProjectListItem } from './ProjectListItem';

export const ProjectsGallery = () => {
  const { t } = useTranslation();
  const { activeCategory, setActiveCategory, filteredProjects, hoveredProject, setHoveredProject } =
    useProjectFilter();
  const { springX: cursorX, springY: cursorY } = useMousePosition();

  return (
    <section id="projects" className="relative z-10 bg-background py-24 md:py-40">
      <div className="container mx-auto max-w-[1400px] px-6">
        <div className="mb-20 flex flex-col items-start justify-between gap-8 border-b border-subtle pb-12 md:flex-row md:items-end">
          <h2 className="text-4xl font-light tracking-tight md:text-5xl lg:text-7xl">
            {t('projects.title')}
            <span className="mt-2 block font-serif italic text-primary">
              {t('projects.titleAccent')}
            </span>
          </h2>

          <CategoryFilter active={activeCategory} onSelect={setActiveCategory} />
        </div>

        {/* Interactive List */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <ProjectListItem
                key={project.id}
                project={project}
                index={index}
                onHover={setHoveredProject}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      <FloatingImagePreview project={hoveredProject} cursorX={cursorX} cursorY={cursorY} />
    </section>
  );
};
