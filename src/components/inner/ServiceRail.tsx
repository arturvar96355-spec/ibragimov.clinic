"use client";

import { Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { BookButton } from "@/components/features/BookingModal";
import { site } from "@/lib/content";

/** Боковой рельс оглавления: подсвечивает текущий раздел страницы услуги. */
export function ServiceRail({ items, context }: { items: { id: string; label: string }[]; context: string }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-35% 0px -55% 0px" },
    );
    items.forEach((i) => { const el = document.getElementById(i.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [items]);

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-28 grid gap-6">
        <nav aria-label="По странице">
          <ul className="grid gap-1 border-l border-line">
            {items.map((i, n) => (
              <li key={i.id}>
                <a href={`#${i.id}`} className={`-ml-px flex items-center gap-3 border-l-2 py-2.5 pl-5 text-sm transition ${active === i.id ? "border-gold font-bold text-ink" : "border-transparent text-muted hover:text-ink"}`}>
                  <span className="eyebrow !text-[10px] !text-brand">{String(n + 1).padStart(2, "0")}</span>{i.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="grid gap-3 rounded-[28px] bg-night p-5 text-paper">
          <p className="display text-2xl">Нужна консультация?</p>
          <BookButton context={context} className="!justify-between">Записаться</BookButton>
          <a href={site.phoneHref} className="flex items-center gap-2 text-sm font-bold"><Phone size={15} className="text-gold" />{site.phoneDisplay}</a>
        </div>
      </div>
    </aside>
  );
}
