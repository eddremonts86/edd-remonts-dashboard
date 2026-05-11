import { type CvProject } from '@/portfolio/contexts/PortfolioDataContext';
import { fadeInView } from '@/portfolio/lib/motion';
import { m } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type Project = CvProject;

export const ProjectListItem = ({
  project,
  index,
  onHover,
}: {
  project: Project;
  index: number;
  onHover: (p: Project | null) => void;
}) => {
  const { t } = useTranslation();

  return (
    <m.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      {...fadeInView({ delay: index * 0.1 })}
      onMouseEnter={() => onHover(project)}
      onMouseLeave={() => onHover(null)}
      className="group relative z-10 -mx-4 flex cursor-pointer flex-col items-start justify-between border-b border-subtle px-4 py-10 transition-colors duration-500 bg-transparent hover:bg-foreground/[0.03] md:flex-row md:items-center md:py-12"
    >
      <div className="mb-4 flex flex-col md:mb-0">
        <span className="mb-3 font-mono text-[11px] tracking-widest text-primary opacity-50">
          0{index + 1} // {project.category}
        </span>
        <h3 className="font-serif text-3xl tracking-tight transition-all duration-500 group-hover:pl-4 md:text-5xl lg:text-6xl">
          {project.title}
        </h3>
      </div>

      <div className="mt-4 flex shrink-0 items-center gap-6 md:mt-0">
        <span className="hidden whitespace-nowrap font-mono text-sm uppercase tracking-widest text-primary opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:block">
          {t('projects.view', 'View Project')}
        </span>
        <div className="flex h-12 w-12 shrink-0 transform items-center justify-center rounded-full text-foreground transition-all duration-500 group-hover:rotate-45 group-hover:bg-primary group-hover:text-white">
          <ArrowUpRight className="h-5 w-5" />
        </div>
      </div>
    </m.a>
  );
};
