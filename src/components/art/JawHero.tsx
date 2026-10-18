"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useReduce } from "@/lib/useReduce";

/* Фронтальная «улыбка»: на одном месте цикл «пустота → имплант → коронка». Схематично. */
const WIDTHS = [64, 52, 54, 46, 46, 54];
const HEIGHTS = [98, 84, 96, 76, 72, 66];
const KINDS = ["incisor", "incisor", "canine", "premolar", "premolar", "molar"] as const;
type Kind = (typeof KINDS)[number];
const GAP = 4;
const CX = 400;
const TOP = (dx: number) => 230 - 92 * (dx / 330) ** 2;
const SLOPE = (dx: number) => (-184 * dx) / 330 ** 2;
const MISSING = 3;

interface ToothPos { x: number; y: number; a: number; w: number; h: number; i: number; kind: Kind }

function layout(): ToothPos[] {
  const out: ToothPos[] = [];
  for (const sign of [1, -1]) {
    let start = 2;
    WIDTHS.forEach((w, i) => {
      const dx = sign * (start + w / 2);
      out.push({ x: CX + dx, y: TOP(dx), a: (Math.atan(SLOPE(dx)) * 180) / Math.PI, w, h: HEIGHTS[i], i: sign === 1 ? i : -1 - i, kind: KINDS[i] });
      start += w + GAP;
    });
  }
  return out;
}
const TEETH = layout();

function toothPath(kind: Kind, w: number, h: number): string {
  switch (kind) {
    case "incisor":
      return `M ${-w * 0.46} 0 C ${-w * 0.5} ${h * 0.4}, ${-w * 0.5} ${h * 0.8}, ${-w * 0.38} ${h * 0.96} Q ${-w * 0.3} ${h}, 0 ${h} Q ${w * 0.3} ${h}, ${w * 0.38} ${h * 0.96} C ${w * 0.5} ${h * 0.8}, ${w * 0.5} ${h * 0.4}, ${w * 0.46} 0 Z`;
    case "canine":
      return `M ${-w * 0.46} 0 C ${-w * 0.54} ${h * 0.5}, ${-w * 0.3} ${h * 0.86}, 0 ${h} C ${w * 0.3} ${h * 0.86}, ${w * 0.54} ${h * 0.5}, ${w * 0.46} 0 Z`;
    default:
      return `M ${-w * 0.48} 0 C ${-w * 0.54} ${h * 0.5}, ${-w * 0.5} ${h * 0.85}, ${-w * 0.3} ${h * 0.96} Q ${-w * 0.18} ${h}, ${-w * 0.06} ${h * 0.9} Q 0 ${h * 0.85}, ${w * 0.06} ${h * 0.9} Q ${w * 0.18} ${h}, ${w * 0.3} ${h * 0.96} C ${w * 0.5} ${h * 0.85}, ${w * 0.54} ${h * 0.5}, ${w * 0.48} 0 Z`;
  }
}

function gumPaths() {
  const sorted = [...TEETH].sort((a, b) => a.x - b.x);
  const pts: [number, number][] = [[sorted[0].x - sorted[0].w * 0.7, sorted[0].y + 6]];
  sorted.forEach((t, k) => {
    pts.push([t.x, t.y + 2]);
    if (k < sorted.length - 1) {
      const n = sorted[k + 1];
      pts.push([(t.x + n.x) / 2, (t.y + n.y) / 2 + 18]);
    }
  });
  const last = sorted[sorted.length - 1];
  pts.push([last.x + last.w * 0.7, last.y + 6]);
  const mid = (a: [number, number], b: [number, number]) => `${((a[0] + b[0]) / 2).toFixed(1)} ${((a[1] + b[1]) / 2).toFixed(1)}`;
  let bottom = `M ${mid(pts[0], pts[1])}`;
  for (let i = 1; i < pts.length - 1; i++) bottom += ` Q ${pts[i][0].toFixed(1)} ${pts[i][1].toFixed(1)} ${mid(pts[i], pts[i + 1])}`;
  const first = pts[0], endPt = pts[pts.length - 1];
  const topLine = `L ${(endPt[0]).toFixed(1)} ${(endPt[1] - 96).toFixed(1)} Q ${CX} ${(TOP(0) - 150).toFixed(1)} ${first[0].toFixed(1)} ${(first[1] - 96).toFixed(1)} Z`;
  return { mass: `${bottom} ${topLine}`, edge: bottom };
}
const GUM = gumPaths();

function Tooth({ t, crown = false }: { t: ToothPos; crown?: boolean }) {
  const d = toothPath(t.kind, t.w, t.h);
  return (
    <>
      <path d={d} fill="url(#jh-tooth)" stroke="#c9a45c" strokeOpacity={crown ? 1 : 0.5} strokeWidth={crown ? 1.4 : 1} />
      <path d={d} fill="url(#jh-shade)" />
      <path d={`M ${-t.w * 0.2} ${t.h * 0.16} C ${-t.w * 0.28} ${t.h * 0.5}, ${-t.w * 0.2} ${t.h * 0.78}, ${-t.w * 0.06} ${t.h * 0.88}`} fill="none" stroke="#fff" strokeOpacity="0.85" strokeWidth="3" strokeLinecap="round" />
    </>
  );
}

const CHIPS = [
  { label: "3D-скан Medit i700", cls: "left-[0%] top-[4%]", delay: "0s" },
  { label: "Микроскоп ZUMAX", cls: "right-[1%] bottom-[16%]", delay: "1.4s" },
  { label: "Коронка CAD/CAM", cls: "left-[24%] bottom-[3%]", delay: "2.6s" },
];

export function JawHero({ className = "" }: { className?: string }) {
  const reduce = useReduce();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-1, 1], [5, -5]), { stiffness: 80, damping: 18 });
  const ry = useSpring(useTransform(mx, [-1, 1], [-7, 7]), { stiffness: 80, damping: 18 });
  const gx = useSpring(useTransform(mx, [-1, 1], [-14, 14]), { stiffness: 60, damping: 20 });
  const gap = TEETH.find((t) => t.i === MISSING)!;

  return (
    <motion.div
      className={`relative ${className}`}
      style={reduce ? undefined : { rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
        my.set(((e.clientY - r.top) / r.height) * 2 - 1);
      }}
      onPointerLeave={() => { mx.set(0); my.set(0); }}
    >
      <svg viewBox="30 60 740 420" role="img" aria-label="Схема: на месте отсутствующего зуба устанавливается имплант, затем коронка" className="h-full w-full overflow-visible">
        <defs>
          <linearGradient id="jh-tooth" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#e2d4b2" /><stop offset="0.35" stopColor="#fffdf7" /><stop offset="0.7" stopColor="#f4ecd9" /><stop offset="1" stopColor="#d9caa6" />
          </linearGradient>
          <linearGradient id="jh-shade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0d332e" stopOpacity="0.38" /><stop offset="0.38" stopColor="#0d332e" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="jh-gum" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0f3b35" /><stop offset="0.55" stopColor="#1b6a5e" /><stop offset="1" stopColor="#2f8a7b" />
          </linearGradient>
          <linearGradient id="jh-fade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#fff" stopOpacity="0" /><stop offset="0.14" stopColor="#fff" stopOpacity="1" /><stop offset="0.86" stopColor="#fff" stopOpacity="1" /><stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <mask id="jh-mask"><rect x="30" y="0" width="740" height="500" fill="url(#jh-fade)" /></mask>
          <linearGradient id="jh-fadey" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity="0" /><stop offset="0.5" stopColor="#fff" stopOpacity="1" />
          </linearGradient>
          <mask id="jh-masky"><rect x="30" y="80" width="740" height="200" fill="url(#jh-fadey)" /><rect x="30" y="280" width="740" height="220" fill="#fff" /></mask>
          <linearGradient id="jh-ti" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#8e9a98" /><stop offset="0.45" stopColor="#f2f5f4" /><stop offset="1" stopColor="#7f8c8a" />
          </linearGradient>
          <radialGradient id="jh-glow"><stop offset="0" stopColor="#e4cf9f" stopOpacity="0.95" /><stop offset="1" stopColor="#e4cf9f" stopOpacity="0" /></radialGradient>
          <linearGradient id="jh-scan" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#a8d5c5" stopOpacity="0" /><stop offset="0.5" stopColor="#a8d5c5" stopOpacity="0.55" /><stop offset="1" stopColor="#a8d5c5" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* орбиты */}
        <g fill="none" stroke="#c9a45c">
          <circle className="animate-spin-slow [transform-box:fill-box] [transform-origin:center]" cx="400" cy="260" r="268" strokeOpacity="0.28" strokeDasharray="2 10" strokeLinecap="round" />
          <circle cx="400" cy="260" r="318" strokeOpacity="0.12" />
        </g>

        <motion.g style={reduce ? undefined : { x: gx }} mask="url(#jh-mask)">
          <g mask="url(#jh-masky)">
          <path d={GUM.mass} fill="url(#jh-gum)" />
          </g>
          <path d={GUM.edge} fill="none" stroke="#a8d5c5" strokeOpacity="0.55" strokeWidth="1.4" />
          {Array.from({ length: 34 }, (_, k) => (
            <circle key={k} cx={CX - 330 + k * 20} cy={TOP(-330 + k * 20) - 40 - ((k * 11) % 46)} r={1.4 + (k % 3) * 0.5} fill="#a8d5c5" opacity="0.32" />
          ))}
        </motion.g>

        {TEETH.map((t) => t.i === MISSING ? null : (
          <g key={t.i} transform={`translate(${t.x.toFixed(1)} ${(t.y + 4).toFixed(1)}) rotate(${t.a.toFixed(1)})`}><Tooth t={t} /></g>
        ))}

        <g transform={`translate(${gap.x.toFixed(1)} ${(gap.y + 4).toFixed(1)}) rotate(${gap.a.toFixed(1)})`}>
          <path d={toothPath(gap.kind, gap.w, gap.h)} fill="none" stroke="#e4cf9f" strokeOpacity="0.55" strokeWidth="1.2" strokeDasharray="5 6" />
          <circle className="jaw-glow" cx="0" cy="-30" r="100" fill="url(#jh-glow)" />
          <g className="jaw-impl">
            <path d="M -9 -92 L 9 -92 L 9 -80 L 7 -6 L -7 -6 L -9 -80 Z" fill="url(#jh-ti)" stroke="#3a4a47" strokeOpacity="0.5" />
            {Array.from({ length: 10 }, (_, k) => <path key={k} d={`M -11 ${-84 + k * 7.6} L 11 ${-80 + k * 7.6}`} stroke="#4b5a57" strokeOpacity="0.7" strokeWidth="1.8" strokeLinecap="round" />)}
            <rect x="-6" y="-6" width="12" height="9" rx="2" fill="#c9a45c" />
          </g>
          <g className="jaw-crown"><Tooth t={gap} crown /></g>
        </g>

        {/* луч сканера */}
        <rect className="jaw-scan" x="-40" y="150" width="40" height="260" rx="20" fill="url(#jh-scan)" opacity="0.6" />

        {Array.from({ length: 9 }, (_, k) => (
          <circle key={k} className="animate-float" style={{ animationDelay: `${k * 0.6}s` }} cx={90 + k * 80} cy={380 + ((k * 53) % 90)} r={1.8 + (k % 3)} fill="#c9a45c" opacity="0.5" />
        ))}
      </svg>

      {CHIPS.map((c) => (
        <span key={c.label} aria-hidden style={{ animationDelay: c.delay }} className={`glass absolute hidden animate-float items-center gap-2 rounded-full px-4 py-2 text-[11px] font-bold text-paper sm:flex ${c.cls}`}>
          <i className="size-1.5 rounded-full bg-gold" />{c.label}
        </span>
      ))}
    </motion.div>
  );
}
