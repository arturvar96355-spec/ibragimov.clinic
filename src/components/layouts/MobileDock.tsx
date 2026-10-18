"use client";

import Link from "next/link";
import { MessageCircle, Phone, Sparkles } from "lucide-react";
import { useBooking } from "@/components/features/BookingModal";
import { site } from "@/lib/content";

const item = "flex flex-1 flex-col items-center gap-1 rounded-full py-2 text-[9px] font-bold uppercase tracking-wide text-paper";

/** Нижний «док» на мобильном: главные действия всегда под рукой. */
export function MobileDock() {
  const { open } = useBooking();
  return (
    <nav aria-label="Быстрые действия" className="fixed inset-x-3 bottom-3 z-30 md:hidden">
      <div className="glass flex items-center gap-1 rounded-full bg-night/85 p-1.5 shadow-soft">
        <a href={site.phoneHref} className={item}><Phone size={18} className="text-gold" />Позвонить</a>
        <a href={site.social.whatsapp} className={item}><MessageCircle size={18} className="text-gold" />WhatsApp</a>
        <Link href="/#navigator" className={item}><Sparkles size={18} className="text-gold" />Подобрать</Link>
        <button type="button" onClick={() => open()} className="flex-[1.35] whitespace-nowrap rounded-full bg-gold px-2 py-3.5 text-[11px] font-bold uppercase tracking-wide text-night">Записаться</button>
      </div>
    </nav>
  );
}
