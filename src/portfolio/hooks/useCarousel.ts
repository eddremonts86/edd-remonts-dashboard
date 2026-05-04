import { useCallback, useEffect, useState } from 'react';

interface UseCarouselReturn {
  currentIndex: number;
  direction: number;
  isPaused: boolean;
  setIsPaused: (paused: boolean) => void;
  paginate: (direction: number) => void;
  handleGoto: (idx: number) => void;
}

export function useCarousel(totalItems: number, autoPlayMs = 8000): UseCarouselReturn {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const paginate = useCallback(
    (newDirection: number) => {
      setDirection(newDirection);
      setCurrentIndex((prev) => {
        let next = prev + newDirection;
        if (next < 0) next = totalItems - 1;
        if (next >= totalItems) next = 0;
        return next;
      });
    },
    [totalItems],
  );

  const handleGoto = useCallback(
    (idx: number) => {
      setDirection(idx > currentIndex ? 1 : -1);
      setCurrentIndex(idx);
    },
    [currentIndex],
  );

  useEffect(() => {
    if (isPaused || totalItems <= 1) return;
    const timer = setInterval(() => paginate(1), autoPlayMs);
    return () => clearInterval(timer);
  }, [paginate, isPaused, totalItems, autoPlayMs]);

  return { currentIndex, direction, isPaused, setIsPaused, paginate, handleGoto };
}
