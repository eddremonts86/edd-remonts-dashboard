import { type CvProject } from '@/portfolio/contexts/PortfolioDataContext';
import { fadeInView } from '@/portfolio/lib/motion';
import { AnimatePresence, m } from 'framer-motion';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

type Project = CvProject;

interface Props {
  project: Project;
  index: number;
  expanded: boolean;
  onToggle: () => void;
  onHover: (p: Project | null) => void;
}

export const ProjectListItem = ({ project, index, expanded, onToggle, onHover }: Props) => {
  const { t } = useTranslation();
  const hasLink = Boolean(project.link);
  const hasCaseStudy = Boolean(
    project.problem || project.results || project.context || project.role || project.decisions,
  );

  const tags = (
    <div className="flex flex-wrap gap-1.5">
      {project.scaleLabel && <Tag tone="muted">{project.scaleLabel}</Tag>}
      {project.impactLabel && <Tag tone="primary">{project.impactLabel}</Tag>}
      {project.architectureLabel && <Tag tone="muted">{project.architectureLabel}</Tag>}
    </div>
  );

  return (
    <m.article
      {...fadeInView({ delay: index * 0.05 })}
      onMouseEnter={() => onHover(project)}
      onMouseLeave={() => onHover(null)}
      className="group relative z-10 -mx-4 flex flex-col items-start justify-between border-b border-subtle bg-transparent px-4 py-8 transition-colors duration-500 hover:bg-foreground/3 md:py-10"
    >
      <div className="flex w-full flex-col">
        <div className="flex w-full flex-col justify-between gap-4 md:flex-row md:items-center">
          <button
            type="button"
            onClick={hasCaseStudy ? onToggle : undefined}
            aria-expanded={hasCaseStudy ? expanded : undefined}
            aria-controls={hasCaseStudy ? `project-${project.id}-details` : undefined}
            disabled={!hasCaseStudy}
            className={`flex flex-1 flex-col text-left ${
              hasCaseStudy ? 'cursor-pointer' : 'cursor-default'
            }`}
          >
            <span className="mb-2 font-mono text-[11px] tracking-widest text-primary/70">
              0{index + 1} // {project.category}
            </span>
            <h3 className="font-serif text-3xl tracking-tight transition-all duration-500 group-hover:pl-3 md:text-4xl lg:text-5xl">
              {project.title}
            </h3>
          </button>

          <div className="flex shrink-0 items-center gap-4">
            <div className="hidden md:block">{tags}</div>
            {hasCaseStudy && (
              <button
                type="button"
                onClick={onToggle}
                aria-label={t('projects.toggleDetails', 'Toggle details')}
                className="flex h-9 w-9 items-center justify-center rounded-full text-foreground/45 transition-colors hover:bg-foreground/5 hover:text-foreground"
              >
                <ChevronDown
                  className={`h-5 w-5 transition-transform duration-300 ${
                    expanded ? 'rotate-180' : ''
                  }`}
                  aria-hidden
                />
              </button>
            )}
            {hasLink && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-foreground transition-all duration-500 group-hover:rotate-45 group-hover:bg-primary group-hover:text-white"
                aria-label={t('projects.view', 'View Project')}
              >
                <ArrowUpRight className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>

        {/* Mobile badges */}
        <div className="mt-4 md:hidden">{tags}</div>

        {project.description && (
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-foreground/70 md:text-base">
            {project.description}
          </p>
        )}
      </div>

      <AnimatePresence initial={false}>
        {expanded && hasCaseStudy && (
          <m.div
            id={`project-${project.id}-details`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            className="w-full overflow-hidden"
          >
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {project.problem && (
                <CaseBlock label={t('projects.problem', 'Problem')} body={project.problem} />
              )}
              {project.results && (
                <CaseBlock label={t('projects.results', 'Results')} body={project.results} />
              )}
              {project.context && (
                <CaseBlock label={t('projects.context', 'Context')} body={project.context} />
              )}
              {project.role && (
                <CaseBlock label={t('projects.role', 'Role')} body={project.role} />
              )}
              {project.decisions && (
                <CaseBlock label={t('projects.decisions', 'Decisions')} body={project.decisions} />
              )}
              {project.complexity && (
                <CaseBlock
                  label={t('projects.complexity', 'Complexity')}
                  body={project.complexity}
                />
              )}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </m.article>
  );
};

function Tag({ children, tone }: { children: ReactNode; tone: 'muted' | 'primary' }) {
  const cls =
    tone === 'primary'
      ? 'border-primary/40 bg-primary/[0.08] text-primary'
      : 'border-subtle text-foreground/60';
  return (
    <span
      className={`rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest ${cls}`}
    >
      {children}
    </span>
  );
}

function CaseBlock({ label, body }: { label: string; body: string }) {
  return (
    <div className="rounded-xl border border-subtle bg-background/40 p-4">
      <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-foreground/50">
        {label}
      </p>
      <p className="text-sm leading-relaxed text-foreground/80">{body}</p>
    </div>
  );
}
