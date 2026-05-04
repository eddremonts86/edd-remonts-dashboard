import { projects } from '@/portfolio/data/cvData';

export type ProjectImageLicense = 'CC0' | 'CC BY' | 'Royalty Free - Paid' | 'Custom';

export interface ImageSourceMeta {
  provider: 'AI' | 'Unsplash' | 'Pexels' | 'Custom' | 'Other';
  url: string;
  author?: string;
  license: ProjectImageLicense;
  licenseUrl?: string;
}

export interface ProjectImageConfig {
  projectId: string;
  aiPrompt: string;
  searchKeywords: string[];
  minWidth: number;
  minHeight: number;
  category: string;
  recommendedFileBase: string;
  source?: ImageSourceMeta;
}

export const validateImageLicense = (meta: ImageSourceMeta): boolean => {
  if (!meta.url) return false;
  if (meta.license === 'Custom' && !meta.licenseUrl) return false;
  return true;
};

const buildPromptForProject = (project: (typeof projects)[number]): ProjectImageConfig => {
  const base = project.id;
  const isFullStack = project.category === 'Full Stack';

  const aiPrompt = [
    'Ultra detailed 3D render of a modern web application UI,',
    isFullStack
      ? 'showing both analytics dashboard and backend infrastructure hints,'
      : 'focused on premium marketing landing page layout,',
    'clean Apple-level visual design with subtle anime neon accents,',
    'no text, no logos, aspect ratio 3:2, high resolution 1200x800px',
  ].join(' ');

  const searchKeywords = [
    project.title,
    isFullStack ? 'full stack web app' : 'frontend landing page',
    'modern dashboard',
    'glassmorphism',
    'neon gradient ui',
  ];

  return {
    projectId: project.id,
    aiPrompt,
    searchKeywords,
    minWidth: 1200,
    minHeight: 800,
    category: project.category,
    recommendedFileBase: base,
  };
};

export const projectImageConfigs: ProjectImageConfig[] = projects.map(buildPromptForProject);
