
import { useState, useRef, useCallback, useEffect } from "react";
import { ArrowLeftRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const [pos, setPos] = useState(50);
  const [drag, setDrag] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const isMobile = useIsMobile();

  const setPosRaf = useCallback((next: number) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => setPos(next));
  }, []);

  const clamp = (v: number) => Math.max(0, Math.min(100, v));

  const updateFromClientX = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0) return;
    const x = clientX - rect.left;
    setPosRaf(clamp((x / rect.width) * 100));
  };

  // Gestion des événements pointer pour desktop
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse') {
      setDrag(true);
      setIsDragging(true);
      e.currentTarget.setPointerCapture?.(e.pointerId);
      updateFromClientX(e.clientX);
    }
  };
  
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag || e.pointerType !== 'mouse') return;
    updateFromClientX(e.clientX);
  };
  
  const endDrag = (e?: React.PointerEvent<HTMLDivElement>) => {
    if (e?.pointerType === 'mouse') {
      setDrag(false);
      setIsDragging(false);
      try { e?.currentTarget.releasePointerCapture?.(e.pointerId); } catch {}
    }
  };

  // Gestion des événements tactiles pour mobile
  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setDrag(true);
    setIsDragging(true);
    const touch = e.touches[0];
    updateFromClientX(touch.clientX);
    e.preventDefault();
    e.stopPropagation();
  };

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!drag) return;
    const touch = e.touches[0];
    updateFromClientX(touch.clientX);
    e.preventDefault();
    e.stopPropagation();
  };

  const onTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    setDrag(false);
    setIsDragging(false);
    e.preventDefault();
    e.stopPropagation();
  };

  // Gestion alternative avec les événements de clic/tap pour mobile
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) {
      updateFromClientX(e.clientX);
    }
  };

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }, []);

  const clip = `inset(0 ${100 - pos}% 0 0)`;
  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden rounded-lg select-none w-full aspect-[4/3] md:aspect-video",
        className
      )}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
      onPointerCancel={endDrag}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onTouchCancel={onTouchEnd}
      onClick={handleClick}
      style={{ 
        cursor: isDragging ? "ew-resize" : "pointer", 
        touchAction: "pan-y pinch-zoom",
        WebkitTouchCallout: "none",
        WebkitUserSelect: "none",
        userSelect: "none"
      }}
    >
      {/* Zone de contrôle invisible pour améliorer l'accessibilité tactile */}
      <div 
        className="absolute inset-0 z-10 opacity-0"
        role="slider"
        aria-label="Faire glisser pour comparer avant/après"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        tabIndex={0}
      />

      <img
        src={beforeImage}
        alt={beforeAlt}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        loading="lazy"
        draggable={false}
      />

      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{
          clipPath: clip,
          WebkitClipPath: clip
        }}
      >
        <img
          src={afterImage}
          alt={afterAlt}
          className="w-full h-full object-cover"
          loading="lazy"
          draggable={false}
        />
      </div>

      <div
        className="absolute top-0 bottom-0 w-1 bg-white/90 shadow z-10 pointer-events-none"
        style={{ left: `${pos}%`, transform: "translateX(-0.5px)" }}
      />
      <div
        className={cn(
          "absolute z-20 bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200",
          isMobile ? "w-14 h-14" : "w-10 h-10",
          isDragging ? "scale-110 shadow-xl" : "hover:scale-105"
        )}
        style={{ left: `${pos}%`, top: "50%", transform: "translate(-50%,-50%)" }}
      >
        <ArrowLeftRight className={cn(
          "text-primary transition-all duration-200",
          isMobile ? "w-7 h-7" : "w-5 h-5",
          isDragging && "scale-110"
        )} />
      </div>

      <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-elegant backdrop-blur-sm pointer-events-none">
        Avant
      </div>
      <div className="absolute top-4 right-4 bg-primary/80 text-white px-3 py-1 rounded-full text-sm font-elegant backdrop-blur-sm pointer-events-none">
        Après
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-elegant backdrop-blur-sm pointer-events-none">
        <span className="hidden md:inline">Glissez pour comparer</span>
        <span className="md:hidden">👆 Glissez pour comparer</span>
      </div>
    </div>
  );
};
