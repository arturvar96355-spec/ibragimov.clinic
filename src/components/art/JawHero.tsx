"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";

/* Фронтальная «улыбка»: зубы висят на дуге, на одном месте цикл: пустота → имплант → коронка. */
const WIDTHS = [64, 52, 54, 46, 46, 56];
const HEIGHTS = [96, 84, 92, 74, 72, 70];
const GAP = 4;
const CX = 400;
const TOP = (dx: number) => 200 - 92 * (dx / 330) ** 2;
const SLOPE = (dx: number) => (-184 * dx) / 330 ** 2;
const MISSING = 3;

interface ToothPos { x: number; y: number; a: number; w: number; h: number; i: number }

function layout(): ToothPos[] {
  const out: ToothPos[] = [];
  for (const sign of [1, -1]) {
    let start = 2;
    WIDTHS.forEach((w, i) => {
      const dx = sign * (start + w / 2);
      out.push({ x: CX + dx, y: TOP(dx), a: (Math.atan(SLOPE(dx)) * 180) / Math.PI, w, h: HEIGHTS[i], i: sign === 1 ? i : -1 - i });
      start += w + GAP;
    });
  }
  return out;
}
const TEETH = layout();

const toothPath = (w: number, h: number) =>
  `M ${-w / 2} 0 C ${-w / 2 - 2} ${h * 0.62}, ${-w * 0.34} ${h}, 0 ${h} S ${w / 2 + 2} ${h * 0.62}, ${w / 2} 0 Z`;

export function JawHero({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-1, 1], [5, -5]), { stiffness: 80, damping: 18 });
  const ry = useSpring(useTransform(mx, [-1, 1], [-7, 7]), { stiffness: 80, damping: 18 });
  const gx = useSpring(useTransform(mx, [-1, 1], [-14, 14]), { stiffness: 60, damping: 20 });

  const gap = TEETH.find((t) => t.i === MISSING)!;
  const gumPts = Array.from({ length: 34 }, (_, k) => {
    const dx = -340 + (680 * k) / 33;
    return [CX + dx, TOP(dx)] as const;
  });
  const gumTop = gumPts.map(([x, y], k) => `${k ? "L" : "M"}${x.toFixed(1)} ${(y - 52).toFixed(1)}`).join(" ");
  const gumBottom = [...gumPts].reverse().map(([x, y]) => `L${x.toFixed(1)} ${(y + 8).toFixed(1)}`).join(" ");

  return (
    <motion.div
      className={className}
      style={reduce ? undefined : { rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
        my.set(((e.clientY - r.top) / r.height) * 2 - 1);
      }}
      onPointerLeave={() => { mx.set(0); my.set(0); }}
    >
      <svg viewBox="0 0 800 520" role="img" aria-label="Схема: на месте отсутствующего зуба устанавливается имплант, затем коронка" className="h-full w-full overflow-visible">
        <defs>
          <linearGradient id="tooth" x1="0" y1="0" x2="0.4" y2="1">
            <stop offset="0" stopColor="#fffdf7" />
            <stop offset="0.6" stopColor="#f1e8d4" />
            <stop offset="1" stopColor="#dccfae" />
          </linearGradient>
          <linearGradient id="gum" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1f6b60" />
            <stop offset="1" stopColor="#2b8274" />
          </linearGradient>
          <linearGradient id="ti" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#8e9a98" />
            <stop offset="0.45" stopColor="#f2f5f4" />
            <stop offset="1" stopColor="#7f8c8a" />
          </linearGradient>
          <radialGradient id="glow">
            <stop offset="0" stopColor="#e4cf9f" stopOpacity="0.95" />
            <stop offset="1" stopColor="#e4cf9f" stopOpacity="0" />
          </radialGradient>
        </defs>

        <motion.g style={reduce ? undefined : { x: gx }}>
          {/* кость */}
          <path d={`${gumTop} ${gumBottom} Z`} fill="url(#gum)" opacity="0.95" />
          <path d={gumTop} fill="none" stroke="#a8d5c5" strokeOpacity="0.5" strokeWidth="1.2" />
          {Array.from({ length: 26 }, (_, k) => (
            <circle key={k} cx={CX - 320 + k * 25.6} cy={TOP(-320 + k * 25.6) - 30 - ((k * 7) % 22)} r={1.6 + (k % 3) * 0.5} fill="#a8d5c5" opacity="0.35" />
          ))}
        </motion.g>

        {/* зубы */}
        {TEETH.map((t) => {
          if (t.i === MISSING) return null;
          return (
            <g key={`${t.i}`} transform={`translate(${t.x.toFixed(1)} ${(t.y + 2).toFixed(1)}) rotate(${t.a.toFixed(1)})`}>
              <path d={toothPath(t.w, t.h)} fill="url(#tooth)" stroke="#c9a45c" strokeOpacity="0.55" strokeWidth="1" />
              <path d={`M ${-t.w * 0.22} ${t.h * 0.12} C ${-t.w * 0.3} ${t.h * 0.5}, ${-t.w * 0.2} ${t.h * 0.78}, ${-t.w * 0.05} ${t.h * 0.88}`} fill="none" stroke="#fff" strokeOpacity="0.8" strokeWidth="3" strokeLinecap="round" />
            </g>
          );
        })}

        {/* пустое место + имплант + коронка */}
        <g transform={`translate(${gap.x.toFixed(1)} ${(gap.y + 2).toFixed(1)}) rotate(${gap.a.toFixed(1)})`}>
          <path d={toothPath(gap.w, gap.h)} fill="none" stroke="#e4cf9f" strokeOpacity="0.5" strokeWidth="1.2" strokeDasharray="5 6" />
          <circle className="jaw-glow" cx="0" cy="-26" r="90" fill="url(#glow)" />
          <g className="jaw-impl">
            <path d="M -9 -78 L 9 -78 L 9 -66 L 7 -4 L -7 -4 L -9 -66 Z" fill="url(#ti)" stroke="#3a4a47" strokeOpacity="0.5" />
            {Array.from({ length: 9 }, (_, k) => (
              <path key={k} d={`M -11 ${-70 + k * 7.6} L 11 ${-66 + k * 7.6}`} stroke="#4b5a57" strokeOpacity="0.7" strokeWidth="1.8" strokeLinecap="round" />
            ))}
            <rect x="-6" y="-4" width="12" height="9" rx="2" fill="#c9a45c" />
          </g>
          <g className="jaw-crown">
            <path d={toothPath(gap.w, gap.h)} fill="url(#tooth)" stroke="#c9a45c" strokeWidth="1.4" />
            <path d={`M ${-gap.w * 0.22} ${gap.h * 0.14} C ${-gap.w * 0.3} ${gap.h * 0.5}, ${-gap.w * 0.2} ${gap.h * 0.78}, ${-gap.w * 0.05} ${gap.h * 0.88}`} fill="none" stroke="#fff" strokeOpacity="0.9" strokeWidth="3" strokeLinecap="round" />
          </g>
        </g>

        {/* мерцающие точки */}
        {Array.from({ length: 10 }, (_, k) => (
          <circle key={k} className="animate-float" style={{ animationDelay: `${k * 0.6}s` }} cx={60 + k * 76} cy={360 + ((k * 53) % 120)} r={1.8 + (k % 3)} fill="#c9a45c" opacity="0.5" />
        ))}
      </svg>
    </motion.div>
  );
}
