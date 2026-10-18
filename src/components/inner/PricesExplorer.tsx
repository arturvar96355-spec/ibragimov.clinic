"use client";

import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useBooking } from "@/components/features/BookingModal";
import { formatPrice, prices } from "@/lib/content";

export function PricesExplorer() {
  const { open } = useBooking();
  const [q, setQ] = useState("");
  const [active, setActive] = useState(prices[0].id);

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return prices;
    return prices.map((c) => ({ ...c, items: c.items.filter((i) => i.name.toLowerCase().includes(s) || c.title.toLowerCase().includes(s)) })).filter((c) => c.items.length);
  }, [q]);

  useEffect(() => {
    const obs = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-30% 0px -60% 0px" });
    list.forEach((c) => { const el = document.getElementById(c.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [list]);

  return (
    <div className="container-x section-y">
      <div className="sticky top-3 z-20 mb-14 grid gap-3 rounded-[28px] border border-line bg-paper/90 p-3 backdrop-blur-xl lg:flex lg:items-center">
        <label className="flex min-w-0 items-center gap-3 rounded-full bg-white px-5 py-3 lg:w-80">
          <Search size={16} className="shrink-0 text-brand" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Найти услугу" aria-label="Найти услугу" className="min-w-0 flex-1 bg-transparent text-sm outline-none" />
        </label>
        <div className="no-scrollbar flex gap-1.5 overflow-x-auto">
          {prices.map((c) => <a key={c.id} href={`#${c.id}`} className={`shrink-0 rounded-full px-4 py-2.5 text-xs font-bold transition ${active === c.id ? "bg-night text-paper" : "bg-ivory hover:bg-sand"}`}>{c.title}</a>)}
        </div>
      </div>

      {list.length === 0 && <p className="rounded-[28px] bg-ivory p-10 text-center text-muted">По запросу «{q}» ничего не найдено</p>}
      <div className="grid gap-16">
        {list.map((c, ci) => (
          <section key={c.id} id={c.id} aria-labelledby={`${c.id}-h`} className="grid gap-6 lg:grid-cols-[18rem_1fr] lg:gap-16">
            <div>
              <span className="display text-6xl italic text-gold">{String(ci + 1).padStart(2, "0")}</span>
              <h2 id={`${c.id}-h`} className="display mt-2 text-4xl">{c.title}</h2>
            </div>
            <ul className="divide-y divide-line border-y border-line">
              {c.items.map((i) => (
                <li key={i.name}>
                  <button type="button" onClick={() => open(i.name)} className="group flex w-full items-center justify-between gap-6 py-5 text-left transition-colors hover:bg-white sm:px-3">
                    <span className="text-sm font-semibold transition-transform duration-300 group-hover:translate-x-2 sm:text-base">{i.name}</span>
                    <span className="flex shrink-0 items-center gap-3"><span className="display text-3xl text-brand sm:text-4xl">{formatPrice(i.price)}</span><span className="hidden rounded-full bg-ivory px-3 py-1.5 text-[11px] font-bold opacity-0 transition group-hover:opacity-100 sm:block">Записаться</span></span>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
