import { useEffect, useRef, useState } from 'react';

export function useFakeProgress(onComplete: () => void, intervalMs = 100, holdMs = 500): number {
  const [progress, setProgress] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 15) + 5;
      if (currentProgress >= 100) {
        currentProgress = 100;
        setProgress(100);
        clearInterval(interval);

        timeoutRef.current = setTimeout(() => {
          onComplete();
          document.body.style.overflow = '';
        }, holdMs);
      } else {
        setProgress(currentProgress);
      }
    }, intervalMs);

    return () => {
      clearInterval(interval);
      clearTimeout(timeoutRef.current);
      document.body.style.overflow = '';
    };
  }, [onComplete, intervalMs, holdMs]);

  return progress;
}
