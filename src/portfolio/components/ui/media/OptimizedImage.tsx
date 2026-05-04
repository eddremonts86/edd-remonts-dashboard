import { APPLE_EASE } from '@/portfolio/lib/motion';
import type { HTMLMotionProps } from 'framer-motion';
import { m } from 'framer-motion';
import React, { useState } from 'react';
import { useIntersectionObserver } from '@/portfolio/hooks/useIntersectionObserver';

interface OptimizedImageProps extends HTMLMotionProps<'img'> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  blurDataURL?: string;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  fallbackSrc,
  blurDataURL,
  className = '',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { ref: imgRef, isInView } = useIntersectionObserver<HTMLDivElement>({
    rootMargin: '50px',
    threshold: 0.1,
  });

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  const currentSrc = hasError && fallbackSrc ? fallbackSrc : src;

  return (
    <div className={`relative overflow-hidden bg-black/5 ${className}`} ref={imgRef}>
      {/*
        Blur placeholder:
        If a tiny base64 blurDataURL is provided, we show it stretched and blurred.
        Otherwise, we show an aesthetic Apple-like skeleton loader.
      */}
      {!isLoaded && (
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          {blurDataURL ? (
            <img
              src={blurDataURL}
              alt=""
              aria-hidden="true"
              className="h-full w-full scale-110 object-cover blur-2xl"
            />
          ) : (
            <m.div
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="h-full w-full bg-surface"
            />
          )}
        </div>
      )}

      {isInView && (
        <m.img
          src={currentSrc}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          initial={{ opacity: 0, filter: 'blur(8px)' }}
          animate={{
            opacity: isLoaded ? 1 : 0,
            filter: isLoaded ? 'blur(0px)' : 'blur(8px)',
          }}
          transition={{ duration: 0.8, ease: APPLE_EASE }}
          className={`relative z-10 h-full w-full object-cover will-change-[opacity,filter] ${className}`}
          {...props}
        />
      )}
    </div>
  );
};
