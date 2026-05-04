import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';

interface UseIntersectionObserverReturn<T extends Element> {
  ref: RefObject<T | null>;
  isInView: boolean;
}

export function useIntersectionObserver<T extends Element = Element>(
  options: IntersectionObserverInit = {},
): UseIntersectionObserverReturn<T> {
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsInView(true);
        observer.disconnect();
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
    // options is intentionally not in deps — it's treated as initial config
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, isInView };
}
