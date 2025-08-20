import React, { useState, useEffect, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface EnhancedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  onLoad?: () => void;
  onError?: () => void;
  sizes?: string;
  quality?: number;
}

export const EnhancedImage: React.FC<EnhancedImageProps> = ({
  src,
  alt,
  className,
  width,
  height,
  priority = false,
  placeholder = 'blur',
  onLoad,
  onError,
  sizes,
  quality = 85,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string>('');
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (priority) {
      // Load immediately for priority images
      setCurrentSrc(src);
    } else {
      // Use Intersection Observer for lazy loading
      if ('IntersectionObserver' in window && imgRef.current) {
        observerRef.current = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setCurrentSrc(src);
                observerRef.current?.unobserve(entry.target);
              }
            });
          },
          { 
            rootMargin: '100px',
            threshold: 0.1
          }
        );

        observerRef.current.observe(imgRef.current);
      } else {
        // Fallback for browsers without IntersectionObserver
        setCurrentSrc(src);
      }
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [src, priority]);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setHasError(true);
    onError?.();
  }, [onError]);

  // Preload critical images
  useEffect(() => {
    if (priority && currentSrc) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = currentSrc;
      if (sizes) link.setAttribute('imagesizes', sizes);
      document.head.appendChild(link);
      
      return () => {
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      };
    }
  }, [currentSrc, priority, sizes]);

  return (
    <div 
      className={cn('relative overflow-hidden', className)} 
      style={{ width, height }}
      data-testid="enhanced-image-container"
    >
      {/* Blur placeholder */}
      {placeholder === 'blur' && !isLoaded && (
        <div 
          className="absolute inset-0 bg-gradient-to-br from-muted/30 to-muted/60 animate-pulse"
          aria-hidden="true"
        />
      )}
      
      {/* Main image */}
      {currentSrc && !hasError && (
        <img
          ref={imgRef}
          src={currentSrc}
          sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
          alt={alt}
          width={width}
          height={height}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            'transition-all duration-500 ease-out',
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105',
            className
          )}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
        />
      )}
      
      {/* Error fallback */}
      {hasError && (
        <div className="absolute inset-0 bg-muted/20 backdrop-blur-sm flex items-center justify-center border border-border/20 rounded">
          <div className="text-muted-foreground text-sm text-center p-4">
            <div className="mb-2 text-2xl opacity-50">📷</div>
            <div className="font-elegant">Image non disponible</div>
          </div>
        </div>
      )}
      
      {/* Loading indicator for priority images */}
      {priority && !isLoaded && !hasError && currentSrc && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

// Hook for preloading images
export const useImagePreload = (src: string, priority = false) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!src) return;

    const img = new Image();
    img.onload = () => setIsLoaded(true);
    img.onerror = () => setHasError(true);
    
    img.src = src;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, priority]);

  return { isLoaded, hasError };
};

export default EnhancedImage;
