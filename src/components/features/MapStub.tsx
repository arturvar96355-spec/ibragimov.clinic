import { MapPin } from "lucide-react";
import { site } from "@/lib/content";

/** Демо-карта: в рабочей версии заменяется на Яндекс.Карту с меткой клиники. */
export function MapStub({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-card bg-[#e9efe9] ${className}`} role="img" aria-label={`Карта: ${site.address}, Москва`}>
      <svg aria-hidden className="absolute inset-0 h-full w-full" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice">
        <rect width="600" height="400" fill="#e8eee7" />
        <g stroke="#fff" strokeWidth="14" fill="none" strokeLinecap="round">
          <path d="M-10 120 L610 80" /><path d="M-10 300 L610 340" /><path d="M150 -10 L190 410" /><path d="M420 -10 L380 410" />
        </g>
        <g stroke="#fff" strokeWidth="6" fill="none"><path d="M-10 210 L610 200" /><path d="M300 -10 L290 410" /><path d="M60 -10 L100 410" /><path d="M520 -10 L500 410" /></g>
        <rect x="205" y="215" width="70" height="55" rx="6" fill="#cfe0d4" /><rect x="320" y="110" width="60" height="70" rx="6" fill="#d8e6dc" />
        <path d="M-10 360 C150 330 300 380 610 300" stroke="#bcd5e6" strokeWidth="26" fill="none" />
      </svg>
      <div className="absolute left-[48%] top-[44%] -translate-x-1/2 -translate-y-full">
        <div className="grid size-14 animate-float place-items-center rounded-full bg-brand text-white shadow-pop ring-4 ring-white"><MapPin /></div>
      </div>
      <div className="absolute inset-x-4 bottom-4 rounded-ctl bg-white/95 p-4 text-sm shadow-soft backdrop-blur">
        <b>{site.address}</b>, Москва<br />
        <span className="text-xs text-muted">Демо-карта · в рабочей версии — Яндекс.Карта</span>
      </div>
    </div>
  );
}
