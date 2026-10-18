import { MapPin } from "lucide-react";
import { site } from "@/lib/content";

/** Демо-карта: в рабочей версии заменяется на Яндекс.Карту с меткой клиники. */
export function MapStub({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-[28px] bg-forest ${className}`} role="img" aria-label={`Карта: ${site.address}, Москва`}>
      <svg aria-hidden className="absolute inset-0 h-full w-full" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice">
        <rect width="600" height="400" fill="#0d332e" />
        <g stroke="#1d5a51" strokeWidth="14" fill="none" strokeLinecap="round"><path d="M-10 120 L610 80" /><path d="M-10 300 L610 340" /><path d="M150 -10 L190 410" /><path d="M420 -10 L380 410" /></g>
        <g stroke="#164a43" strokeWidth="6" fill="none"><path d="M-10 210 L610 200" /><path d="M300 -10 L290 410" /><path d="M60 -10 L100 410" /><path d="M520 -10 L500 410" /></g>
        <rect x="205" y="215" width="70" height="55" rx="8" fill="#14463f" /><rect x="320" y="110" width="60" height="70" rx="8" fill="#14463f" />
        <path d="M-10 360 C150 330 300 380 610 300" stroke="#0a4a58" strokeWidth="26" fill="none" opacity="0.7" />
        <circle cx="288" cy="190" r="70" fill="none" stroke="#c9a45c" strokeOpacity="0.35" />
        <circle cx="288" cy="190" r="115" fill="none" stroke="#c9a45c" strokeOpacity="0.18" />
      </svg>
      <div className="absolute left-[48%] top-[47%] -translate-x-1/2 -translate-y-full">
        <div className="grid size-14 animate-float place-items-center rounded-full bg-gold text-night shadow-glow ring-4 ring-night/60"><MapPin /></div>
      </div>
      <div className="glass absolute inset-x-4 bottom-4 rounded-3xl p-4 text-sm text-paper">
        <b>{site.address}</b>, Москва<br />
        <span className="text-xs text-paper/60">Демо-карта · в рабочей версии — Яндекс.Карта</span>
      </div>
    </div>
  );
}
