"use client";

import Link from "next/link";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { useState } from "react";
import { SplitText } from "@/components/ui/SplitText";
import { BookButton } from "@/components/features/BookingModal";
import { buttonClass, Arrow } from "@/components/ui/Button";
import { formatPrice, getService, priceOf, situations } from "@/lib/content";

export function Navigator() {
  const [active, setActive] = useState(situations.find((s) => s.id === "bone")?.id ?? situations[0].id);
  const cur = situations.find((s) => s.id === active)!;
  const svc = getService(cur.service)!;

  return (
    <section id="navigator" className="section-y cv bg-paper">
      <div className="container-x">
        <p className="eyebrow mb-5 !text-brand">Подбор лечения</p>
        <SplitText text="Что вас беспокоит?" accent={["беспокоит?"]} className="display display-lg mb-12 max-w-4xl" />
        <div className="grid gap-8 lg:grid-cols-[1fr_1.05fr]">
          <div role="group" aria-label="Что вас беспокоит" className="flex flex-wrap content-start gap-2.5">
            {situations.map((s) => {
              const on = s.id === active;
              return (
                <button key={s.id} type="button" aria-pressed={on} onClick={() => setActive(s.id)} className={`rounded-full border px-4 py-3 text-left text-[13px] font-semibold sm:px-5 sm:py-3.5 sm:text-sm transition duration-300 ${on ? "border-night bg-night text-paper shadow-soft" : "border-line bg-white hover:-translate-y-0.5 hover:border-brand"}`}>
                  {s.label}
                </button>
              );
            })}
          </div>
          <div className="relative lg:min-h-[22rem]">
            <AnimatePresence mode="wait">
              <m.div key={cur.id} aria-live="polite" initial={{ opacity: 0, y: 24, rotate: 0.6 }} animate={{ opacity: 1, y: 0, rotate: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className="grain relative overflow-hidden rounded-[32px] bg-forest p-7 text-paper sm:p-10">
                <div aria-hidden className="absolute -right-16 -top-16 size-56 rounded-full bg-[radial-gradient(closest-side,rgba(201,164,92,0.32),transparent)]" />
                <p className="eyebrow mb-3">Рекомендуем</p>
                <h3 className="display display-md mb-4">{svc.title}</h3>
                <p className="mb-8 max-w-md leading-relaxed text-paper/75">{cur.answer}</p>
                <div className="mb-8 flex items-end gap-3 border-t border-paper/15 pt-6">
                  <span className="display text-5xl text-gold">{formatPrice(priceOf(cur.price))}</span>
                  <span className="pb-2 text-xs text-paper/70">стартовая цена, точная — после консультации</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link href={`/services/${svc.slug}/`} className={buttonClass("light")}>Об услуге<Arrow /></Link>
                  <BookButton variant="ghost" context={svc.title}>Записаться</BookButton>
                </div>
              </m.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
