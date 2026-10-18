"use client";

/* Схема 32 зубов (вид сверху): нажмите на зуб, чтобы отметить его как отсутствующий. */
const A = 168;
const B = 190;
const WIDTHS = [44, 36, 34, 30, 29, 28, 26, 26]; // от моляра к резцу, зеркально
const SIDE = [...WIDTHS, ...[...WIDTHS].reverse()];
const SAMPLES = 400;

interface Spot { id: number; x: number; y: number; rot: number; w: number; h: number }

const pt = (th: number) => {
  const r = (th * Math.PI) / 180;
  return { x: 240 + A * Math.cos(r), y: 238 - B * Math.sin(r) };
};

/** Номер по системе FDI: верхняя 18…11, 21…28; нижняя 48…41, 31…38 (слева направо глазами врача). */
const fdi = (id: number) => {
  const i = id % 16;
  const upper = id < 16;
  return i < 8 ? (upper ? 18 : 48) - i : (upper ? 21 : 31) + (i - 8);
};

function arch(offset: number): Spot[] {
  const pts = Array.from({ length: SAMPLES + 1 }, (_, k) => pt(190 - (200 * k) / SAMPLES));
  const cum = [0];
  for (let k = 1; k < pts.length; k++) cum.push(cum[k - 1] + Math.hypot(pts[k].x - pts[k - 1].x, pts[k].y - pts[k - 1].y));
  const total = SIDE.reduce((a, b) => a + b, 0);
  let acc = 0;
  return SIDE.map((w, i) => {
    const s = ((acc + w / 2) / total) * cum[SAMPLES];
    acc += w;
    let k = cum.findIndex((c) => c >= s);
    k = Math.min(Math.max(k, 1), SAMPLES);
    const a = pts[k - 1], b = pts[k];
    const rot = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
    return { id: offset + i, x: pts[k].x, y: pts[k].y, rot, w: w * 0.9, h: w < 30 ? 24 : w < 36 ? 28 : 34 };
  });
}

const UPPER = arch(0);
const LOWER = arch(16);

function Tooth({ s, on, onToggle }: { s: Spot; on: boolean; onToggle: (id: number) => void }) {
  return (
    <g
      transform={`translate(${s.x.toFixed(1)} ${s.y.toFixed(1)}) rotate(${s.rot.toFixed(1)})`}
      role="button"
      tabIndex={0}
      aria-pressed={on}
      aria-label={`Зуб ${fdi(s.id)}${on ? ": отсутствует" : ""}`}
      onClick={() => onToggle(s.id)}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), onToggle(s.id))}
      className="group cursor-pointer outline-none"
    >
      <rect x={-s.w / 2} y={-s.h / 2} width={s.w} height={s.h} rx="9" className={`origin-center transition duration-300 [transform-box:fill-box] group-hover:scale-110 group-focus-visible:stroke-brand group-focus-visible:[stroke-width:3] ${on ? "fill-gold/15 stroke-gold" : "fill-ivory stroke-sand"}`} strokeWidth={on ? 2 : 1.4} strokeDasharray={on ? "4 4" : undefined} />
      {on && <circle r="4.5" fill="#c9a45c" />}
    </g>
  );
}

export function Odontogram({ selected, onToggle, className = "" }: { selected: number[]; onToggle: (id: number) => void; className?: string }) {
  return (
    <svg viewBox="0 20 480 520" className={className} role="group" aria-label="Схема зубов">
      <g>{UPPER.map((s) => <Tooth key={s.id} s={s} on={selected.includes(s.id)} onToggle={onToggle} />)}</g>
      <g transform="translate(0 560) scale(1 -1)">{LOWER.map((s) => <Tooth key={s.id} s={s} on={selected.includes(s.id)} onToggle={onToggle} />)}</g>
      <text x="240" y="150" textAnchor="middle" className="fill-paper/35 text-[10px] tracking-[0.3em]">ВЕРХНЯЯ</text>
      <text x="240" y="420" textAnchor="middle" className="fill-paper/35 text-[10px] tracking-[0.3em]">НИЖНЯЯ</text>
    </svg>
  );
}
