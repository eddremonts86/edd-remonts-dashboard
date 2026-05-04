import { useCallback, useEffect, useRef, useState } from 'react';

interface Section {
  id: string;
}

interface UseScrollSpyReturn {
  activeSection: string;
  isVisible: boolean;
}

export function useScrollSpy(sections: Section[], thresholdRatio = 0.85): UseScrollSpyReturn {
  const [activeSection, setActiveSection] = useState(sections[0]?.id ?? '');
  const [isVisible, setIsVisible] = useState(false);
  const rafId = useRef(0);

  const updateActiveSection = useCallback(() => {
    const viewportMid = window.innerHeight / 2;
    const firstId = sections[0]?.id ?? '';
    let closestId = '';
    let closestDist = Infinity;

    for (const { id } of sections) {
      const el = id === firstId ? document.querySelector('section') : document.getElementById(id);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      const sectionMid = rect.top + rect.height / 2;
      const dist = Math.abs(sectionMid - viewportMid);
      if (dist < closestDist) {
        closestDist = dist;
        closestId = id;
      }
    }

    if (closestId) setActiveSection(closestId);
    setIsVisible(window.scrollY > window.innerHeight * thresholdRatio);
  }, [sections, thresholdRatio]);

  useEffect(() => {
    const handleScroll = () => {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(updateActiveSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    rafId.current = requestAnimationFrame(updateActiveSection);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, [updateActiveSection]);

  return { activeSection, isVisible };
}
