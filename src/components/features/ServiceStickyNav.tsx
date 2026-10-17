"use client";

import { ArrowDown, ArrowUp, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { site } from "@/lib/content";

const links = [
  { id: "prices", label: "Цены" },
  { id: "description", label: "Описание" },
  { id: "booking", label: "Записаться" },
];

export function ServiceStickyNav() {
  const [y, setY] = useState(0);
  const [tops, setTops] = useState<Record<string, number>>({});

  useEffect(() => {
    const measure = () => setTops(Object.fromEntries(links.map((l) => [l.id, (document.getElementById(l.id)?.getBoundingClientRect().top ?? 0) + window.scrollY])));
    const on = () => setY(window.scrollY);
    measure(); on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", measure);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", measure); };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-3 z-40 flex justify-center px-3">
      <nav aria-label="По странице" className="pointer-events-auto flex max-w-full items-center gap-1 rounded-card bg-ink p-2 text-white shadow-pop">
        {links.map((l) => {
          const up = (tops[l.id] ?? 0) < y;
          return (
            <a key={l.id} href={`#${l.id}`} className="flex items-center gap-1.5 rounded-ctl px-2 py-2 text-[11px] font-semibold transition hover:bg-white/10 sm:px-4 sm:text-sm">
              {l.label}{" "}{up ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
            </a>
          );
        })}
        <a href={site.phoneHref} className="ml-1 flex items-center gap-1.5 rounded-ctl bg-white px-3 py-2 text-xs font-bold text-ink transition hover:bg-brand-soft sm:px-4 sm:text-sm" aria-label="Позвонить"><Phone size={14} /><span className="hidden min-[420px]:inline">Позвонить</span></a>
      </nav>
    </div>
  );
}
