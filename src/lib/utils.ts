import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Fonction utilitaire pour gérer les chemins d'assets
export function getAssetPath(path: string): string {
  // En développement, utiliser le chemin direct
  if (import.meta.env.DEV) {
    return path;
  }
  
  // En production, s'assurer que le chemin commence par /
  if (!path.startsWith('/')) {
    return `/${path}`;
  }
  
  return path;
}

// Fonction pour précharger les images de manière sécurisée
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to preload image: ${src}`));
    img.src = getAssetPath(src);
  });
}
