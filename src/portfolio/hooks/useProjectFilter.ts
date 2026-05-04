import { type CvProject, usePortfolioData } from '@/portfolio/contexts/PortfolioDataContext';
import { DEFAULT_CATEGORY } from '@/portfolio/data/projectCategories';
import { useMemo, useState } from 'react';

type Project = CvProject;

interface UseProjectFilterReturn {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  filteredProjects: Project[];
  hoveredProject: Project | null;
  setHoveredProject: (project: Project | null) => void;
}

export function useProjectFilter(): UseProjectFilterReturn {
  const [activeCategory, setActiveCategory] = useState(DEFAULT_CATEGORY);
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const { projects } = usePortfolioData();

  const filteredProjects = useMemo(
    () =>
      projects.filter((project) => activeCategory === 'All' || project.category === activeCategory),
    [activeCategory, projects],
  );

  return { activeCategory, setActiveCategory, filteredProjects, hoveredProject, setHoveredProject };
}
