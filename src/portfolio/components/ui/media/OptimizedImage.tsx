import type { HTMLMotionProps } from 'framer-motion'
import { m } from 'framer-motion'
import React, { useState } from 'react'
import { useIntersectionObserver } from '@/portfolio/hooks/useIntersectionObserver'
import { APPLE_EASE } from '@/portfolio/lib/motion'
import { COVER_WIDTHS, pictureSources } from '@/portfolio/lib/responsiveImage'

interface OptimizedImageProps extends HTMLMotionProps<'img'> {
  src: string
  alt: string
  fallbackSrc?: string
  blurDataURL?: string
  /** Variant widths generated for this image. Defaults to the cover ladder. */
  widths?: readonly number[]
  /** `sizes` for the srcset. Defaults to the full viewport width. */
  sizes?: string
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  fallbackSrc,
  blurDataURL,
  widths = COVER_WIDTHS,
  sizes = '100vw',
  className = '',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const { ref: imgRef, isInView } = useIntersectionObserver<HTMLDivElement>({
    rootMargin: '50px',
    threshold: 0.1,
  })

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    setHasError(true)
  }

  const currentSrc = hasError && fallbackSrc ? fallbackSrc : src
  const sources = pictureSources(currentSrc, widths)

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
        // AVIF first, then WebP, then the original as the universal fallback.
        // A cover that has no generated variant just gets an empty srcSet and
        // the browser falls through to <img src>.
        <picture>
          <source type="image/avif" srcSet={sources.avif} sizes={sizes} />
          <source type="image/webp" srcSet={sources.webp} sizes={sizes} />
          <m.img
            src={currentSrc}
            alt={alt}
            loading="lazy"
            decoding="async"
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
        </picture>
      )}
    </div>
  )
}
