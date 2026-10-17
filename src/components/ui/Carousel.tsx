"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState, type ReactNode } from "react";

interface CarouselProps {
  slides: ReactNode[];
  slideClass?: string;
  loop?: boolean;
  align?: "start" | "center";
  onSelect?: (index: number) => void;
  controlIndex?: number;
}

export function Carousel({ slides, slideClass = "basis-full", loop = false, align = "start", onSelect, controlIndex }: CarouselProps) {
  const [ref, api] = useEmblaCarousel({ loop, align, containScroll: loop ? false : "trimSnaps" });
  const [index, setIndex] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);

  const sync = useCallback(() => {
    if (!api) return;
    const i = api.selectedScrollSnap();
    setIndex(i);
    onSelect?.(i);
  }, [api, onSelect]);

  useEffect(() => {
    if (!api) return;
    const reinit = () => setSnaps(api.scrollSnapList());
    queueMicrotask(reinit);
    api.on("select", sync).on("reInit", reinit);
    return () => {
      api.off("select", sync).off("reInit", reinit);
    };
  }, [api, sync]);

  useEffect(() => {
    if (api && controlIndex !== undefined && controlIndex !== api.selectedScrollSnap()) api.scrollTo(controlIndex);
  }, [api, controlIndex]);

  return (
    <div>
      <div ref={ref} className="overflow-hidden">
        <div className="-ml-4 flex">
          {slides.map((s, i) => (
            <div key={i} className={`min-w-0 shrink-0 grow-0 pl-4 ${slideClass}`}>
              {s}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="flex gap-1.5" aria-hidden>
          {snaps.map((_, i) => (
            <button
              key={i}
              tabIndex={-1}
              onClick={() => api?.scrollTo(i)}
              className={`h-1 rounded-full transition-all ${i === index ? "w-8 bg-brand" : "w-4 bg-line"}`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button aria-label="Назад" onClick={() => api?.scrollPrev()} className="grid size-11 place-items-center rounded-full bg-white text-brand shadow-soft transition hover:bg-brand hover:text-white focus-visible:outline-2 focus-visible:outline-brand">
            <ChevronLeft size={20} />
          </button>
          <button aria-label="Вперёд" onClick={() => api?.scrollNext()} className="grid size-11 place-items-center rounded-full bg-white text-brand shadow-soft transition hover:bg-brand hover:text-white focus-visible:outline-2 focus-visible:outline-brand">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
