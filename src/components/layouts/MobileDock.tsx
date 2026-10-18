"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MessageCircle, Phone, Sparkles } from "lucide-react";
import { useBooking } from "@/components/features/BookingModal";
import { site } from "@/lib/content";

const icon = "grid size-11 shrink-0 place-items-center rounded-full bg-paper/10 text-gold active:bg-paper/20";

/** Компактный нижний док: прячется при скролле вниз, возвращается при скролле вверх. */
export function MobileDock() {
  const { open } = useBooking();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const on = () => {
      const y = window.scrollY;
      if (Math.abs(y - last) < 8) return;
      setHidden(y > last && y > 300);
      last = y;
    };
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <nav aria-label="Быстрые действия" inert={hidden} className={`fixed inset-x-3 bottom-3 z-30 transition-transform duration-300 md:hidden ${hidden ? "translate-y-24" : "translate-y-0"}`}>
      <div className="flex items-center gap-2 rounded-full bg-night/95 p-1.5 shadow-soft ring-1 ring-paper/15">
        <a href={site.phoneHref} aria-label="Позвонить" className={icon}><Phone size={18} /></a>
        <a href={site.social.whatsapp} aria-label="Написать в WhatsApp" className={icon}><MessageCircle size={18} /></a>
        <Link href="/#navigator" aria-label="Подобрать лечение" className={icon}><Sparkles size={18} /></Link>
        <button type="button" onClick={() => open()} className="h-11 flex-1 whitespace-nowrap rounded-full bg-gold px-4 text-xs font-bold uppercase tracking-wide text-night">Записаться</button>
      </div>
    </nav>
  );
}
