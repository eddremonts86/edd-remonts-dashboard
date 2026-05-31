import { useProjectFilter } from '@/portfolio/hooks/useProjectFilter';
import { AnimatePresence, m } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CategoryFilter } from './CategoryFilter';
import { ProjectListItem } from './ProjectListItem';
import { ProductStories } from './ProductStories';
import { Section, Container } from '../ui/layout/Section';

export const ProjectsGallery = () => {
  const { t } = useTranslation();
  const { activeCategory, setActiveCategory, filteredProjects, setHoveredProject } =
    useProjectFilter();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Filter out Zunzun from additional list
  const additionalProjects = filteredProjects.filter((p) => p.id !== 'zunzun');

  return (
    <Section id="projects" className="bg-background">
      <Container>
        {/* Section Header */}
        <div className="mb-20 max-w-3xl text-left">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/60">
            {t('projects.eyebrow', 'Featured Systems & Engineering Outcomes')}
          </p>
          <h2 className="text-4xl font-light tracking-tight md:text-6xl lg:text-8xl text-white">
            Product Stories
            <span className="mt-2 block font-serif italic text-primary">
              Not Project Cards.
            </span>
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-foreground/70 md:text-base">
            Narratives tracking the context, technological hurdles, system architectures, and metrics behind three major digital platforms.
          </p>
        </div>

        {/* 1. Immersive Product Stories Marquee */}
        <div className="mb-32">
          <ProductStories />
        </div>

        {/* 2. Additional Case Notes Repository */}
        <div className="mb-12 flex flex-col justify-between gap-8 border-b border-subtle pb-8 md:flex-row md:items-end text-left">
          <div className="max-w-xl">
            <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.25em] text-primary/70">
              / ADDITIONAL PROJECTS
            </p>
            <h3 className="text-3xl font-light tracking-tight text-foreground font-display text-white">
              Additional Projects
            </h3>
            <p className="mt-3 text-sm text-foreground/65 leading-relaxed font-light">
              Explore additional product features, tools, and legacy software systems engineered throughout my career.
            </p>
          </div>

          <div className="shrink-0">
            <CategoryFilter active={activeCategory} onSelect={setActiveCategory} />
          </div>
        </div>

        {/* 3. Table Column Header Row (MD+) */}
        <div 
          role="table" 
          aria-label="Additional Projects Registry"
          className="w-full text-left"
        >
          <div 
            role="row"
            className="hidden md:grid grid-cols-12 gap-4 px-4 pb-3 border-b border-subtle/50 font-mono text-[9px] uppercase tracking-wider text-foreground/35 select-none"
          >
            <span role="columnheader" className="col-span-1">Index</span>
            <span role="columnheader" className="col-span-4">Project / Scope</span>
            <span role="columnheader" className="col-span-2">Category</span>
            <span role="columnheader" className="col-span-4">Architectural Vector</span>
            <span role="columnheader" className="col-span-1 justify-self-end">Inspect</span>
          </div>

          {/* 4. Typographic Systems Integration Registry Table */}
          <div role="rowgroup" className="flex flex-col border-t border-subtle/20 relative min-h-[400px]">
            <AnimatePresence mode="popLayout" initial={false}>
              {additionalProjects.map((project, index) => (
                <ProjectListItem
                  key={project.id}
                  project={project}
                  index={index}
                  expanded={expandedId === project.id}
                  onToggle={() => setExpandedId((prev) => (prev === project.id ? null : project.id))}
                  onHover={setHoveredProject}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>

        {additionalProjects.length === 0 && (
          <m.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 rounded-2xl border border-subtle bg-surface p-6 text-sm text-foreground/65 text-left"
          >
            {t('projects.empty', 'No projects found for this filter yet.')}
          </m.p>
        )}
      </Container>
    </Section>
  );
};

