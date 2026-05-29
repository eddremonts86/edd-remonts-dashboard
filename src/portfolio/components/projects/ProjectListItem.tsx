import { type CvProject } from '@/portfolio/contexts/PortfolioDataContext';
import { fadeInView } from '@/portfolio/lib/motion';
import { AnimatePresence, m } from 'framer-motion';
import { ArrowUpRight, ChevronDown, Cpu, Layers, ShieldCheck, HelpCircle } from 'lucide-react';
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

  const techVector = project.architectureLabel || project.scaleLabel || 'Systems Integration';

  return (
    <m.div
      {...fadeInView({ delay: index * 0.05 })}
      onMouseEnter={() => onHover(project)}
      onMouseLeave={() => onHover(null)}
      className="border-b border-subtle/30 py-4.5 transition-all duration-300 hover:bg-foreground/[0.02] rounded-xl px-4 cursor-pointer"
      onClick={hasCaseStudy ? onToggle : undefined}
    >
      {/* 12-Column Structured Grid Row (MD+), Flex layout on Mobile */}
      <div className="flex flex-col gap-3 md:grid md:grid-cols-12 md:items-center md:gap-4">
        
        {/* Col 1: Serial Tracker Index (Col span: 1) */}
        <div className="md:col-span-1 flex items-center gap-2">
          <span className="font-mono text-[10px] text-primary/65 font-bold select-none tracking-widest">
            0{index + 1}
          </span>
          {/* Mobile indicator line */}
          <span className="h-px w-4 bg-primary/20 md:hidden" />
        </div>

        {/* Col 2: Project Title (Col span: 4) */}
        <div className="md:col-span-4 min-w-0">
          <h3 className="font-display text-base font-semibold leading-tight tracking-tight text-foreground transition-colors group-hover:text-primary">
            {project.title}
          </h3>
        </div>

        {/* Col 3: Category Pill (Col span: 2) */}
        <div className="md:col-span-2">
          <span className="inline-flex rounded-md border border-subtle bg-surface/50 px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-wider text-foreground/50">
            {project.category}
          </span>
        </div>

        {/* Col 4: Technology/Architectural Vector (Col span: 4) */}
        <div className="md:col-span-4 min-w-0 flex items-center gap-2">
          <Layers className="h-3.5 w-3.5 text-foreground/25 shrink-0" />
          <span className="font-mono text-[10px] text-foreground/50 truncate max-w-full">
            {techVector}
          </span>
        </div>

        {/* Col 5: Actions Links (Col span: 1, aligned right) */}
        <div 
          className="md:col-span-1 justify-self-end flex items-center gap-3 mt-2 md:mt-0"
          onClick={(e) => e.stopPropagation()} // Prevent double trigger with row click
        >
          {hasCaseStudy && (
            <button
              type="button"
              onClick={onToggle}
              className={`flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 ${
                expanded
                  ? 'border-primary bg-primary text-white'
                  : 'border-subtle bg-background text-foreground/55 hover:border-foreground/25 hover:text-foreground'
              }`}
              aria-label={t('projects.toggleDetails', 'Toggle case details')}
            >
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
                aria-hidden
              />
            </button>
          )}

          {hasLink && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-subtle bg-background text-foreground/55 transition-all duration-500 hover:border-primary hover:bg-primary hover:text-white"
              aria-label={t('projects.view', 'View Project')}
            >
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* Case Details Drawer (Typographic Monospace Terminal) */}
      <AnimatePresence initial={false}>
        {expanded && hasCaseStudy && (
          <m.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-5 border border-foreground/10 dark:border-white/10 bg-foreground/2 dark:bg-white/[0.02] backdrop-blur-md rounded-2xl p-6 md:p-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4 relative shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_8px_32px_rgba(0,0,0,0.15)] overflow-hidden">
              {/* Decorative terminal blueprint background */}
              <div className="absolute inset-0 pointer-events-none opacity-[2%] bg-[radial-gradient(circle_at_1px_1px,#efefef_1px,transparent_0)] bg-size-[12px_12px]" />
              
              <div className="absolute top-3 right-4 font-mono text-[7px] text-foreground/25 uppercase tracking-[0.25em]">[SYSTEM_LOG_DRAWER::ACTIVE]</div>

              {project.context && (
                <CaseBlock icon={Layers} label={t('projects.context', 'Context')} body={project.context} />
              )}
              {project.problem && (
                <CaseBlock icon={HelpCircle} label={t('projects.problem', 'Challenge')} body={project.problem} />
              )}
              {project.decisions && (
                <CaseBlock icon={Cpu} label={t('projects.decisions', 'Decisions')} body={project.decisions} />
              )}
              {project.results && (
                <CaseBlock icon={ShieldCheck} label={t('projects.results', 'Results')} body={project.results} />
              )}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </m.div>
  );
};

interface CaseBlockProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  body: string;
}

function CaseBlock({ icon: Icon, label, body }: CaseBlockProps) {
  return (
    <div className="group/block relative space-y-3 rounded-xl border border-foreground/[0.05] dark:border-white/[0.05] bg-foreground/[0.01] dark:bg-white/[0.01] p-4 transition-all duration-300 hover:border-primary/20 hover:bg-foreground/[0.02] dark:hover:bg-white/[0.02] hover:shadow-[0_4px_24px_rgba(209,52,38,0.05)]">
      {/* Decorative telemetry header */}
      <div className="flex items-center justify-between border-b border-foreground/[0.05] dark:border-white/[0.05] pb-2">
        <span className="font-mono text-[8.5px] uppercase tracking-[0.2em] text-primary flex items-center gap-1.5 font-bold">
          <Icon className="h-3 w-3 text-primary shrink-0 animate-pulse" />
          {label}
        </span>
        <span className="h-1.5 w-1.5 rounded-full bg-primary/25 transition-all duration-500 group-hover/block:bg-primary group-hover/block:shadow-[0_0_8px_rgba(209,52,38,0.8)]" />
      </div>
      <p className="text-xs leading-relaxed text-foreground/75 font-mono">
        {body}
      </p>
    </div>
  );
}
