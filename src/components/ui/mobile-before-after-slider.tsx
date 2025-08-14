import { useState, useRef, useCallback } from "react";
import { ArrowLeftRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileBeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeAlt: string;
  afterAlt: string;
  className?: string;
}

export const MobileBeforeAfterSlider = ({
  beforeImage,
  afterImage,
  beforeAlt,
  afterAlt,
  className
}: MobileBeforeAfterSliderProps) => {
  const [position, setPosition] = useState(50);
  const [isActive, setIsActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(percentage);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsActive(true);
    updatePosition(e.touches[0].clientX);
    e.preventDefault();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isActive) return;
    updatePosition(e.touches[0].clientX);
    e.preventDefault();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setIsActive(false);
    e.preventDefault();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsActive(true);
    updatePosition(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isActive) return;
    updatePosition(e.clientX);
  };

  const handleMouseUp = () => {
    setIsActive(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    updatePosition(e.clientX);
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden rounded-lg w-full aspect-[4/3] md:aspect-video",
        "touch-none select-none",
        className
      )}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={handleClick}
      style={{
        cursor: isActive ? "ew-resize" : "pointer",
        touchAction: "none",
        WebkitUserSelect: "none",
        userSelect: "none"
      }}
    >
      {/* Image avant */}
      <img
        src={beforeImage}
        alt={beforeAlt}
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* Image après avec clip-path */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          clipPath: `inset(0 ${100 - position}% 0 0)`,
          WebkitClipPath: `inset(0 ${100 - position}% 0 0)`
        }}
      >
        <img
          src={afterImage}
          alt={afterAlt}
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>

      {/* Ligne de séparation */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-10"
        style={{ left: `${position}%`, transform: "translateX(-0.5px)" }}
      />

      {/* Bouton de contrôle */}
      <div
        className={cn(
          "absolute z-20 bg-white rounded-full shadow-lg flex items-center justify-center",
          "w-12 h-12 md:w-10 md:h-10",
          "transition-all duration-200",
          isActive ? "scale-110 shadow-xl" : "hover:scale-105"
        )}
        style={{ 
          left: `${position}%`, 
          top: "50%", 
          transform: "translate(-50%, -50%)" 
        }}
      >
        <ArrowLeftRight className={cn(
          "text-primary transition-all duration-200",
          "w-6 h-6 md:w-5 md:h-5",
          isActive && "scale-110"
        )} />
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-elegant backdrop-blur-sm">
        Avant
      </div>
      <div className="absolute top-4 right-4 bg-primary/80 text-white px-3 py-1 rounded-full text-sm font-elegant backdrop-blur-sm">
        Après
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-elegant backdrop-blur-sm">
        <span className="hidden md:inline">Glissez ou cliquez pour comparer</span>
        <span className="md:hidden">👆 Touchez et glissez</span>
      </div>
    </div>
  );
};
