interface PreloadOptions {
  priority?: boolean;
  sizes?: string;
  crossOrigin?: 'anonymous' | 'use-credentials';
}

class ImagePreloader {
  private cache = new Map<string, Promise<HTMLImageElement>>();
  private loadedImages = new Set<string>();

  preload(src: string, options: PreloadOptions = {}): Promise<HTMLImageElement> {
    if (this.loadedImages.has(src)) {
      return Promise.resolve(new Image());
    }

    if (this.cache.has(src)) {
      return this.cache.get(src)!;
    }

    const promise = new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      
      if (options.crossOrigin) {
        img.crossOrigin = options.crossOrigin;
      }

      img.onload = () => {
        this.loadedImages.add(src);
        resolve(img);
      };

      img.onerror = () => {
        this.cache.delete(src);
        reject(new Error(`Failed to preload image: ${src}`));
      };

      img.src = src;
    });

    this.cache.set(src, promise);
    return promise;
  }

  preloadMultiple(sources: string[], options: PreloadOptions = {}): Promise<HTMLImageElement[]> {
    return Promise.allSettled(
      sources.map(src => this.preload(src, options))
    ).then(results => 
      results
        .filter((result): result is PromiseFulfilledResult<HTMLImageElement> => 
          result.status === 'fulfilled'
        )
        .map(result => result.value)
    );
  }

  isLoaded(src: string): boolean {
    return this.loadedImages.has(src);
  }

  clear(): void {
    this.cache.clear();
    this.loadedImages.clear();
  }
}

export const imagePreloader = new ImagePreloader();

// Utility function to preload critical images
export const preloadCriticalImages = async () => {
  const criticalImages = [
    '/src/assets/hero-wedding.jpg',
    '/src/assets/service-mariage.jpg',
    '/src/assets/service-anniversaire.jpg'
  ];

  // Only preload on fast connections and when not on mobile data
  const connection = (navigator as any).connection;
  const isSlowConnection = connection && 
    (['slow-2g', '2g'].includes(connection.effectiveType) || connection.saveData);
  
  if (isSlowConnection) {
    console.log('Skipping image preload on slow connection');
    return;
  }

  try {
    // Use requestIdleCallback for better performance
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        imagePreloader.preloadMultiple(criticalImages, { priority: true });
      });
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(() => {
        imagePreloader.preloadMultiple(criticalImages, { priority: true });
      }, 100);
    }
    console.log('Critical images preload initiated');
  } catch (error) {
    console.warn('Some critical images failed to preload:', error);
  }
};

// Preload images based on viewport and connection
export const intelligentPreload = () => {
  const connection = (navigator as any).connection;
  const isFastConnection = !connection || 
    !['slow-2g', '2g', '3g'].includes(connection.effectiveType);
  const isOnline = navigator.onLine;
  const hasLowMemory = (navigator as any).deviceMemory && (navigator as any).deviceMemory < 4;

  if (isFastConnection && isOnline && !hasLowMemory) {
    // Preload more images on fast connections with good hardware
    const additionalImages = [
      '/src/assets/service-evjf.jpg',
      '/src/assets/service-corporate.jpg'
    ];
    
    // Use Intersection Observer to preload images when they're likely to be needed
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            imagePreloader.preloadMultiple(additionalImages);
            observer.disconnect();
          }
        });
      }, { rootMargin: '100px' });
      
      // Start observing when user scrolls down
      const heroSection = document.querySelector('[data-section="hero"]');
      if (heroSection) {
        observer.observe(heroSection);
      }
    } else {
      // Fallback for older browsers
      setTimeout(() => {
        imagePreloader.preloadMultiple(additionalImages);
      }, 3000);
    }
  }
};

// Add performance monitoring
export const reportWebVitals = (onPerfEntry?: (metric: any) => void) => {
  if (onPerfEntry && typeof onPerfEntry === 'function') {
    // Simple performance monitoring without web-vitals dependency
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        onPerfEntry({
          name: entry.name,
          value: entry.startTime || entry.duration || 0,
          rating: 'good'
        });
      }
    });
    
    try {
      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
    } catch (error) {
      console.log('Performance monitoring not available');
    }
  }
};
