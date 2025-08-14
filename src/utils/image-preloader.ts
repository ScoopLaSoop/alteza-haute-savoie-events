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

  try {
    await imagePreloader.preloadMultiple(criticalImages, { priority: true });
    console.log('Critical images preloaded successfully');
  } catch (error) {
    console.warn('Some critical images failed to preload:', error);
  }
};

// Preload images based on viewport and connection
export const intelligentPreload = () => {
  const connection = (navigator as any).connection;
  const isFastConnection = !connection || 
    !['slow-2g', '2g', '3g'].includes(connection.effectiveType);

  if (isFastConnection) {
    // Preload more images on fast connections
    const additionalImages = [
      '/src/assets/service-evjf.jpg',
      '/src/assets/service-corporate.jpg'
    ];
    
    imagePreloader.preloadMultiple(additionalImages);
  }
};
