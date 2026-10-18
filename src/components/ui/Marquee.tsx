import type { ReactNode } from "react";

/** Бесконечная лента: список дублируется, CSS-анимация без JS. */
export function Marquee({ children, className = "", pauseOnHover = true }: { children: ReactNode; className?: string; pauseOnHover?: boolean }) {
  return (
    <div className={`group flex overflow-hidden ${className}`} aria-hidden>
      <div className={`marquee-track flex shrink-0 animate-marquee items-center gap-10 pr-10 ${pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""}`}>
        {children}
        {children}
      </div>
    </div>
  );
}
