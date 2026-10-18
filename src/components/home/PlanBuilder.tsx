"use client";

import { animate } from "motion/react";
import { useReduce } from "@/lib/useReduce";
import { useEffect, useRef, useState } from "react";
import { Odontogram } from "@/components/art/Odontogram";
import { SplitText } from "@/components/ui/SplitText";
import { BookButton } from "@/components/features/BookingModal";
import { formatPrice, priceOf } from "@/lib/content";

const METHODS = {
  basal: { label: "Базальная", implant: "Базальная имплантация на имплантат Mono implant", crown: "Коронка на базальный имплантат" },
  classic: { label: "Классическая", implant: "Имплантация", crown: "Коронки на имплантатах" },
} as const;
type Method = keyof typeof METHODS;

function AnimatedPrice({ value }: { value: number }) {
  const reduce = useReduce();
  const [shown, setShown] = useState(value);
  const prev = useRef(value);
  useEffect(() => {
    if (reduce) { prev.current = value; return; }
    const c = animate(prev.current, value, { duration: 0.7, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setShown(Math.round(v)) });
    prev.current = value;
    return () => c.stop();
  }, [value, reduce]);
  return (
    <>
      <span aria-hidden>{formatPrice(reduce ? value : shown)}</span>
      <span className="sr-only" aria-live="polite">{formatPrice(value)}</span>
    </>
  );
}

export function PlanBuilder() {
  const [selected, setSelected] = useState<number[]>([4, 5]);
  const [method, setMethod] = useState<Method>("basal");
  const [sinus, setSinus] = useState(false);
  const n = selected.length;
  const m = METHODS[method];
  const implant = priceOf(m.implant) * n;
  const crown = priceOf(m.crown) * n;
  const sinusPrice = method === "classic" && sinus && n > 0 ? priceOf("Синус-лифтинг") : 0;
  const total = implant + crown + sinusPrice;
  const toggle = (id: number) => setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  return (
    <section className="grain relative overflow-hidden bg-night text-paper section-y">
      <div aria-hidden className="absolute -right-40 top-0 size-[40rem] rounded-full bg-brand/30 blur-[140px]" />
      <div className="container-x relative">
        <p className="eyebrow mb-5">Конструктор плана</p>
        <SplitText text="Соберите план лечения за минуту" accent={["минуту"]} className="display display-lg mb-12 max-w-4xl" />
        <div className="grid items-start gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="glass rounded-[32px] p-4 sm:p-8">
            <p className="mb-2 text-center text-xs text-paper/75">Нажмите на зубы, которых нет (с клавиатуры: Tab и Enter)</p>
            <Odontogram selected={selected} onToggle={toggle} className="mx-auto w-full max-w-[460px]" />
            <div className="mt-2 flex items-center justify-between text-xs text-paper/75">
              <span>Отмечено: <b className="text-gold">{n}</b></span>
              <button type="button" onClick={() => setSelected([])} className="underline transition hover:text-gold">Сбросить</button>
            </div>
          </div>
          <div className="grid gap-5 rounded-[32px] bg-paper p-6 text-ink sm:p-9">
            <div role="group" aria-label="Метод имплантации" className="grid grid-cols-2 gap-1.5 rounded-full bg-sand/70 p-1.5">
              {(Object.keys(METHODS) as Method[]).map((k) => (
                <button key={k} type="button" aria-pressed={method === k} onClick={() => setMethod(k)} className={`rounded-full py-3 text-sm font-bold transition ${method === k ? "bg-night text-paper shadow-soft" : "text-night/70 hover:text-night"}`}>{METHODS[k].label}</button>
              ))}
            </div>
            <dl className="grid gap-3 text-sm">
              <div className="flex justify-between gap-4 border-b border-line pb-3"><dt>{m.implant} × {n}</dt><dd className="shrink-0 font-bold">{formatPrice(implant)}</dd></div>
              <div className="flex justify-between gap-4 border-b border-line pb-3"><dt>{m.crown} × {n}</dt><dd className="shrink-0 font-bold">{formatPrice(crown)}</dd></div>
              {method === "classic" && (
                <label className="flex cursor-pointer items-center justify-between gap-4 border-b border-line pb-3">
                  <span className="flex items-center gap-2.5"><input type="checkbox" checked={sinus} onChange={(e) => setSinus(e.target.checked)} className="size-4 accent-[var(--color-brand)]" />Если потребуется синус-лифтинг</span>
                  <b className="shrink-0">{formatPrice(priceOf("Синус-лифтинг"))}</b>
                </label>
              )}
            </dl>
            <div>
              <p className="text-xs text-muted">Минимальная стоимость</p>
              {n > 0 ? (
                <p className="display text-6xl text-brand sm:text-7xl"><AnimatedPrice value={total} /></p>
              ) : (
                <p className="display text-4xl text-muted sm:text-5xl">Отметьте зубы на схеме</p>
              )}
              <p className="mt-2 text-xs leading-relaxed text-muted">Расчет по стартовым ценам прайса («от»), без удаления зубов и других работ. Синус-лифтинг считается один раз. Метод и итоговую стоимость определяет врач после осмотра и КТ.</p>
            </div>
            <div>{n > 0 ? <BookButton context={`План: ${m.label.toLowerCase()} имплантация, зубов: ${n}`}>Обсудить мой план</BookButton> : <BookButton>Записаться на консультацию</BookButton>}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
