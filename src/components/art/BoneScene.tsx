"use client";

import { motion, useTransform, type MotionValue } from "motion/react";

/* Схематичный разрез нижней челюсти. p: 0..1 — «кости достаточно» → «мало» → «базальный подход». Иллюстрация принципа, не медицинская схема. */
const CROWN = "M 254 162 C 248 130 250 92 262 76 C 272 62 286 78 300 70 C 314 78 328 62 338 76 C 350 92 352 130 346 162 Z";

export function BoneScene({ p, className = "" }: { p: MotionValue<number>; className?: string }) {
  const canalY = useTransform(p, [0.18, 0.42], [440, 292]);
  const warn = useTransform(p, [0.36, 0.46, 0.58, 0.66], [0, 1, 1, 0]);
  const classic = useTransform(p, [0.6, 0.7], [1, 0]);
  const classicY = useTransform(p, [0.6, 0.7], [0, 30]);
  const basal = useTransform(p, [0.64, 0.8], [0, 1]);
  const basalY = useTransform(p, [0.64, 0.8], [-50, 0]);
  const glow = useTransform(p, [0.74, 0.9], [0, 1]);

  return (
    <svg viewBox="0 0 600 520" role="img" aria-label="Схема: классический имплант и базальный подход при разном объеме кости" className={className}>
      <defs>
        <linearGradient id="bs-bone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#efe4cc" />
          <stop offset="1" stopColor="#d9c8a4" />
        </linearGradient>
        <linearGradient id="bs-ti" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8e9a98" /><stop offset="0.45" stopColor="#f4f7f6" /><stop offset="1" stopColor="#7f8c8a" />
        </linearGradient>
        <linearGradient id="bs-tooth" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor="#fffdf7" /><stop offset="1" stopColor="#dccfae" />
        </linearGradient>
        <radialGradient id="bs-glow"><stop offset="0" stopColor="#e4cf9f" stopOpacity="0.9" /><stop offset="1" stopColor="#e4cf9f" stopOpacity="0" /></radialGradient>
      </defs>

      {/* кость */}
      <path d="M 40 200 H 560 V 440 C 560 486 520 492 480 492 H 120 C 80 492 40 486 40 440 Z" fill="url(#bs-bone)" />
      <path d="M 40 200 H 560 V 440 C 560 486 520 492 480 492 H 120 C 80 492 40 486 40 440 Z" fill="none" stroke="#c9a45c" strokeWidth="5" strokeOpacity="0.8" />
      {Array.from({ length: 40 }, (_, k) => <circle key={k} cx={70 + ((k * 97) % 460)} cy={225 + ((k * 53) % 230)} r={2 + (k % 3)} fill="#b69a62" opacity="0.28" />)}
      {/* десна */}
      <path d="M 0 150 C 120 138 200 160 300 160 S 480 138 600 150 V 202 H 0 Z" fill="#1f6b60" />
      <path d="M 0 150 C 120 138 200 160 300 160 S 480 138 600 150" fill="none" stroke="#a8d5c5" strokeOpacity="0.6" strokeWidth="2" />
      {/* коронка */}
      <path d={CROWN} fill="url(#bs-tooth)" stroke="#c9a45c" strokeWidth="2" />

      {/* нервный канал */}
      <motion.g style={{ y: 0 }}>
        <motion.circle cx="300" cy={canalY} r="19" fill="#0d332e" stroke="#a8d5c5" strokeWidth="2.5" />
        <motion.circle cx="300" cy={canalY} r="7" fill="#e4cf9f" opacity="0.8" />
        <motion.circle cx="300" cy={canalY} r="34" fill="none" stroke="#e4cf9f" strokeWidth="2" strokeDasharray="5 6" style={{ opacity: warn }} />
      </motion.g>

      {/* классический имплант */}
      <motion.g style={{ opacity: classic, y: classicY }}>
        <path d="M 288 190 H 312 L 308 306 H 292 Z" fill="url(#bs-ti)" stroke="#3a4a47" strokeOpacity="0.5" />
        {Array.from({ length: 9 }, (_, k) => <path key={k} d={`M 285 ${200 + k * 12} L 315 ${205 + k * 12}`} stroke="#4b5a57" strokeOpacity="0.75" strokeWidth="2" strokeLinecap="round" />)}
      </motion.g>

      {/* базальные импланты */}
      <motion.g style={{ opacity: basal, y: basalY }}>
        <circle cx="300" cy="330" r="170" fill="url(#bs-glow)" style={{ opacity: 0.0 }} />
        {[-1, 1].map((s) => (
          <g key={s} transform={`translate(${300 + s * 74} 0) rotate(${-s * 9} 0 190)`}>
            <path d="M -7 188 H 7 L 5 474 H -5 Z" fill="url(#bs-ti)" stroke="#3a4a47" strokeOpacity="0.5" />
            <rect x="-13" y="184" width="26" height="12" rx="3" fill="#c9a45c" />
            {Array.from({ length: 6 }, (_, k) => <path key={k} d={`M -10 ${440 + k * 6} L 10 ${444 + k * 6}`} stroke="#4b5a57" strokeOpacity="0.8" strokeWidth="1.8" strokeLinecap="round" />)}
          </g>
        ))}
      </motion.g>
      <motion.circle cx="300" cy="190" r="140" fill="url(#bs-glow)" style={{ opacity: glow }} />
    </svg>
  );
}
