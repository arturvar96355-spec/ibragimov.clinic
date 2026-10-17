"use client";

import { useState } from "react";
import { Carousel } from "@/components/ui/Carousel";
import { Media } from "@/components/ui/Media";
import { equipment } from "@/lib/content";

export function EquipmentSlider() {
  const [active, setActive] = useState(0);
  return (
    <section className="container-x section-y" aria-labelledby="equip-title">
      <h2 id="equip-title" className="h-section mb-8">Оборудование</h2>
      <div className="no-scrollbar mb-6 flex items-center gap-2 overflow-x-auto" role="tablist" aria-label="Оборудование">
        {equipment.map((e, i) => (
          <div key={e.title} className="flex shrink-0 items-center gap-2">
            <button role="tab" aria-selected={i === active} aria-label={e.title} onClick={() => setActive(i)} className={`text-2xl font-bold tabular-nums transition ${i === active ? "text-ink" : "text-line hover:text-muted"}`}>
              {String(i + 1).padStart(2, "0")}
            </button>
            {i < equipment.length - 1 && <span aria-hidden className="w-8 border-t border-dashed border-line sm:w-14" />}
          </div>
        ))}
      </div>
      <Carousel
        controlIndex={active}
        onSelect={setActive}
        slides={equipment.map((e, i) => (
          <article key={e.title} className="grid gap-6 rounded-card bg-soft p-6 sm:p-9 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-10">
            <div className="grid gap-4">
              <h3 className="text-2xl font-bold text-brand">{e.title}</h3>
              <p className="text-sm leading-relaxed">{e.text}</p>
              {e.list && <ul className="grid gap-1.5 text-sm">{e.list.map((l) => <li key={l} className="flex gap-2.5"><span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand" />{l}</li>)}</ul>}
            </div>
            <Media img={{ alt: e.title, placeholder: true }} tone={(["green", "sky", "sand"] as const)[i % 3]} className="aspect-[4/3] rounded-card" />
          </article>
        ))}
      />
    </section>
  );
}
