"use client";

import { useMotionValue, useSpring, useTransform } from "motion/react";
import * as m from "motion/react-m";
import { Star } from "lucide-react";
import { Media } from "@/components/ui/Media";
import { site } from "@/lib/content";
import { useReduce } from "@/lib/useReduce";
import type { Img } from "@/lib/types";

/* Арка-портал: тонкие золотые арки, светящаяся «улыбка» и мерцающие блёстки.
   Если передать photo с src, внутри арки покажется фотография. */
const SPARKLES = [
  { x: 92, y: 168, s: 1.1, d: 0 },
  { x: 318, y: 130, s: 0.8, d: 0.9 },
  { x: 250, y: 238, s: 1.3, d: 1.6 },
  { x: 140, y: 300, s: 0.7, d: 2.3 },
  { x: 330, y: 330, s: 0.9, d: 0.5 },
  { x: 200, y: 96, s: 0.6, d: 1.2 },
];
const STAR = "M0 -12 Q0 0 12 0 Q0 0 0 12 Q0 0 -12 0 Q0 0 0 -12Z";
const arch = (inset: number) => `M ${20 + inset} 500 V ${200} A ${180 - inset} ${180 - inset} 0 0 1 ${380 - inset} 200 V 500`;

export function HeroArch({ photo, className = "" }: { photo?: Img; className?: string }) {
  const reduce = useReduce();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const ax = useSpring(useTransform(mx, [-1, 1], [-18, 18]), { stiffness: 60, damping: 20 });
  const ay = useSpring(useTransform(my, [-1, 1], [-12, 12]), { stiffness: 60, damping: 20 });
  const bx = useSpring(useTransform(mx, [-1, 1], [16, -16]), { stiffness: 60, damping: 20 });
  const by = useSpring(useTransform(my, [-1, 1], [10, -10]), { stiffness: 60, damping: 20 });

  return (
    <div
      className={`relative mx-auto aspect-[4/5] w-full max-w-[290px] sm:max-w-[440px] ${className}`}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
        my.set(((e.clientY - r.top) / r.height) * 2 - 1);
      }}
      onPointerLeave={() => { mx.set(0); my.set(0); }}
    >
      <div aria-hidden className="absolute -inset-[14%] md:animate-spin-slow rounded-full border border-dashed border-gold/30" />
      <div aria-hidden className="absolute -inset-[26%] rounded-full border border-gold/10" />

      <div className="absolute inset-0 overflow-hidden rounded-t-full border border-gold/50 bg-gradient-to-b from-pine via-forest to-night shadow-[0_40px_120px_rgba(0,0,0,0.45)]">
        {photo?.src && <Media img={photo} className="absolute inset-0 opacity-90" sizes="440px" priority />}
        <div aria-hidden className="absolute left-1/2 top-[40%] size-[130%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(168,213,197,0.30),rgba(29,104,93,0.12)_45%,transparent_65%)]" />
        <div aria-hidden className="absolute inset-0 [background:conic-gradient(from_150deg_at_50%_100%,transparent_0_6%,rgba(241,226,184,0.13)_12%,transparent_20%_28%,rgba(241,226,184,0.09)_34%,transparent_42%_52%,rgba(241,226,184,0.10)_60%,transparent_68%)]" />
        <svg viewBox="0 0 400 500" aria-hidden className="absolute inset-0 h-full w-full" fill="none">
          <defs>
            <linearGradient id="ha-smile" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#c9a45c" stopOpacity="0" />
              <stop offset="0.5" stopColor="#f1e2b8" />
              <stop offset="1" stopColor="#c9a45c" stopOpacity="0" />
            </linearGradient>
            <filter id="ha-blur" x="-30%" y="-90%" width="160%" height="280%"><feGaussianBlur stdDeviation="9" /></filter>
          </defs>
          {[0, 28, 56].map((i) => <path key={i} d={arch(i)} stroke="#c9a45c" strokeOpacity={0.5 - i / 160} />)}
          <path d="M 64 282 Q 200 430 336 282" stroke="#f1e2b8" strokeWidth="18" strokeLinecap="round" filter="url(#ha-blur)" opacity="0.6" />
          <path className="hero-smile" d="M 64 282 Q 200 430 336 282" stroke="url(#ha-smile)" strokeWidth="7" strokeLinecap="round" pathLength="1" />
          {SPARKLES.map((p, i) => (
            <path key={i} className="hero-twinkle" d={STAR} fill="#f1e2b8" transform={`translate(${p.x} ${p.y}) scale(${p.s})`} style={{ animationDelay: `${p.d}s`, transformOrigin: "0 0" }} />
          ))}
        </svg>
      </div>

      <m.div style={reduce ? undefined : { x: ax, y: ay }} className="absolute -left-4 top-[14%] sm:-left-12">
        <div className="glass md:animate-float grid gap-1 rounded-3xl bg-night/60 px-4 py-3 sm:px-5 sm:py-4">
          <span className="flex text-gold" aria-hidden>{Array.from({ length: 5 }, (_, i) => <Star key={i} size={13} fill="currentColor" />)}</span>
          <span className="display text-2xl text-paper sm:text-3xl">{site.ratings[0].value} из 5</span>
          <span className="text-[11px] text-paper/75">рейтинг на Яндексе</span>
        </div>
      </m.div>

      <m.div style={reduce ? undefined : { x: bx, y: by }} className="absolute -right-2 top-[48%] sm:-right-10">
        <div className="glass grid gap-0.5 rounded-3xl bg-night/60 px-4 py-3 sm:px-5 sm:py-4 md:[animation:float_8s_ease-in-out_1.2s_infinite]">
          <span className="display text-3xl text-gold sm:text-4xl">21 год</span>
          <span className="text-[11px] text-paper/75">практики ведущего врача</span>
        </div>
      </m.div>

      <m.div style={reduce ? undefined : { x: ax, y: by }} className="absolute -left-2 bottom-[7%] max-sm:hidden sm:-left-8">
        <div className="glass md:animate-float rounded-3xl bg-night/50 px-5 py-4 [animation-delay:2.4s]">
          <span className="display block whitespace-nowrap text-xl text-paper">КТ + консультация</span>
          <span className="text-[11px] text-paper/75">терапевта бесплатно по акции*</span>
        </div>
      </m.div>
    </div>
  );
}
