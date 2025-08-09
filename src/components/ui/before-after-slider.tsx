
import { useState, useRef } from "react";
import { ArrowLeftRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeAlt: string;
  afterAlt: string;
  className?: string;
}

export const BeforeAfterSlider = ({
  beforeImage,
  afterImage,
  beforeAlt,
  afterAlt,
  className
}: BeforeAfterSliderProps) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = (clientX: number) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    try { e.currentTarget.releasePointerCapture(e.pointerId); } catch {}
  };


  return (
    <div 
      ref={containerRef}
      className={cn("relative overflow-hidden rounded-lg select-none", className)}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{ 
        cursor: isDragging ? 'ew-resize' : 'pointer',
        touchAction: 'none'
      }}
    >
      {/* Before Image */}
      <img
        src={beforeImage}
        alt={beforeAlt}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
        draggable={false}
      />
      
      {/* After Image */}
      <div 
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src={afterImage}
          alt={afterAlt}
          className="w-full h-full object-cover"
          loading="lazy"
          draggable={false}
        />
      </div>

      {/* Slider Line */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-10 pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Handle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 md:w-10 md:h-10 bg-white rounded-full shadow-lg flex items-center justify-center pointer-events-auto">
          <ArrowLeftRight className="w-6 h-6 md:w-5 md:h-5 text-primary" />
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-elegant backdrop-blur-sm pointer-events-none">
        Avant
      </div>
      <div className="absolute top-4 right-4 bg-primary/80 text-white px-3 py-1 rounded-full text-sm font-elegant backdrop-blur-sm pointer-events-none">
        Après
      </div>

      {/* Instructions - différentes pour mobile et desktop */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-elegant backdrop-blur-sm pointer-events-none">
        <span className="hidden md:inline">Glissez pour comparer</span>
        <span className="md:hidden">Faites glisser pour comparer</span>
      </div>
    </div>
  );
};
