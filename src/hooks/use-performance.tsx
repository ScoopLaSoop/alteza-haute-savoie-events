import { useState, useEffect } from 'react';

interface PerformanceMetrics {
  isLowEnd: boolean;
  reducedMotion: boolean;
  connectionSpeed: 'slow' | 'fast' | 'unknown';
  deviceMemory: number;
  hardwareConcurrency: number;
}

export const usePerformance = (): PerformanceMetrics => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    isLowEnd: false,
    reducedMotion: false,
    connectionSpeed: 'unknown',
    deviceMemory: 4,
    hardwareConcurrency: 4
  });

  useEffect(() => {
    const checkPerformance = () => {
      // Check for reduced motion preference
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Check device memory (if available)
      const deviceMemory = (navigator as any).deviceMemory || 4;

      // Check hardware concurrency
      const hardwareConcurrency = navigator.hardwareConcurrency || 4;

      // Check connection speed
      let connectionSpeed: 'slow' | 'fast' | 'unknown' = 'unknown';
      const connection = (navigator as any).connection;
      if (connection) {
        const effectiveType = connection.effectiveType;
        connectionSpeed = ['slow-2g', '2g', '3g'].includes(effectiveType) ? 'slow' : 'fast';
      }

      // Determine if device is low-end
      const isLowEnd = deviceMemory <= 2 || hardwareConcurrency <= 2 || connectionSpeed === 'slow';

      setMetrics({
        isLowEnd,
        reducedMotion,
        connectionSpeed,
        deviceMemory,
        hardwareConcurrency
      });
    };

    checkPerformance();

    // Listen for changes in reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => checkPerformance();
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return metrics;
};

export const useAdaptiveAnimations = () => {
  const { isLowEnd, reducedMotion } = usePerformance();
  
  const shouldReduceAnimations = isLowEnd || reducedMotion;
  
  return {
    shouldReduceAnimations,
    animationDuration: shouldReduceAnimations ? 0.2 : 0.6,
    animationClass: shouldReduceAnimations ? 'transition-none' : 'transition-all',
    enableParallax: !shouldReduceAnimations,
    enableComplexAnimations: !shouldReduceAnimations
  };
};
