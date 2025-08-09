
import { useState, useRef, useCallback, useEffect } from "react";
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
  const [pos, setPos] = useState(50);
  const [drag, setDrag] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

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

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setDrag(true);
    e.currentTarget.setPointerCapture?.(e.pointerId);
    updateFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag) return;
    updateFromClientX(e.clientX);
  };
  const endDrag = (e?: React.PointerEvent<HTMLDivElement>) => {
    setDrag(false);
    try { e?.currentTarget.releasePointerCapture?.(e.pointerId); } catch {}
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
      style={{ cursor: drag ? "ew-resize" : "pointer", touchAction: "none" }}
    >
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.currentTarget.value))}
        onInput={(e) => setPos(Number(e.currentTarget.value))}
        className="absolute inset-0 z-20 opacity-0 w-full h-full"
        aria-label="Faire glisser pour comparer avant/après"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pos}
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
        className="absolute z-20 w-12 h-12 md:w-10 md:h-10 bg-white rounded-full shadow-lg flex items-center justify-center"
        style={{ left: `${pos}%`, top: "50%", transform: "translate(-50%,-50%)" }}
      >
        <ArrowLeftRight className="w-6 h-6 md:w-5 md:h-5 text-primary" />
      </div>

      <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-elegant backdrop-blur-sm pointer-events-none">
        Avant
      </div>
      <div className="absolute top-4 right-4 bg-primary/80 text-white px-3 py-1 rounded-full text-sm font-elegant backdrop-blur-sm pointer-events-none">
        Après
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-elegant backdrop-blur-sm pointer-events-none">
        <span className="hidden md:inline">Glissez pour comparer</span>
        <span className="md:hidden">Faites glisser pour comparer</span>
      </div>
    </div>
  );
};
