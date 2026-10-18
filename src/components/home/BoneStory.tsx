"use client";

import { useMotionValue, useScroll, useTransform, type MotionValue } from "motion/react";
import * as m from "motion/react-m";
import { useRef } from "react";
import { BoneScene } from "@/components/art/BoneScene";
import { ButtonLink } from "@/components/ui/Button";
import { useReduce } from "@/lib/useReduce";

const steps = [
  { n: "01", title: "Костной ткани достаточно", text: "Классическая имплантация возможна, когда объёма кости хватает для установки импланта.", p: 0.08 },
  { n: "02", title: "Кости стало мало", text: "При недостаточном объеме костной ткани классическая имплантация может быть невозможна без дополнительных вмешательств. Решение принимает врач.", p: 0.5 },
  { n: "03", title: "Другой подход", text: "Базальная имплантация: импланты фиксируются в плотных базальных отделах кости. Подходит ли метод вам и в какие сроки, определяет врач после КТ и осмотра.", p: 0.95 },
];

const ranges: [number, number, number, number][] = [
  [0, 0, 0.28, 0.34],
  [0.3, 0.37, 0.58, 0.65],
  [0.62, 0.7, 0.99, 1],
];

const NOTE = "Схема иллюстративна. Метод лечения подбирает врач после КТ и осмотра.";
const HEADING = "Вам сказали: мало кости? Как работает базальная имплантация";

function StepText({ i, p }: { i: number; p: MotionValue<number> }) {
  const [a, b, c, d] = ranges[i];
  const opacity = useTransform(p, [a, b, c, d], [i === 0 ? 1 : 0, 1, 1, i === 2 ? 1 : 0]);
  const y = useTransform(p, [a, b, c, d], [i === 0 ? 0 : 40, 0, 0, i === 2 ? 0 : -40]);
  const s = steps[i];
  return (
    <m.div style={{ opacity, y }} className="absolute inset-x-0 top-0 grid gap-4">
      <span className="eyebrow">Шаг {s.n}</span>
      <h3 className="display display-md">{s.title}</h3>
      <p className="max-w-md text-base leading-relaxed text-paper/75">{s.text}</p>
    </m.div>
  );
}

/** Телефон и планшет: свайп-карточки без закрепления экрана. */
function Swipe() {
  const p0 = useMotionValue(steps[0].p);
  const p1 = useMotionValue(steps[1].p);
  const p2 = useMotionValue(steps[2].p);
  const vals = [p0, p1, p2];
  return (
    <div className="bg-forest py-12 text-paper sm:py-16 lg:hidden">
      <div className="container-x mb-6">
        <p className="eyebrow mb-3 flex items-center gap-3"><span className="h-px w-8 bg-gold" />Вам сказали: «мало кости»?</p>
        <h2 className="display display-md">Как базальная имплантация работает при недостатке кости</h2>
      </div>
      <div tabIndex={0} role="region" aria-label="Три шага: листайте по горизонтали" className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2">
        {steps.map((s, i) => (
          <article key={s.n} className="w-[84vw] max-w-sm shrink-0 snap-center rounded-[28px] border border-paper/15 bg-night/60 p-5 sm:w-[22rem]">
            <BoneScene p={vals[i]} className="mx-auto mb-4 w-full max-w-[16rem]" />
            <p className="eyebrow mb-2">Шаг {s.n}</p>
            <h3 className="display mb-2 text-3xl">{s.title}</h3>
            <p className="text-sm leading-relaxed text-paper/80">{s.text}</p>
          </article>
        ))}
      </div>
      <div className="container-x mt-5 grid gap-4">
        <p className="text-[11px] text-paper/70">{NOTE}</p>
        <div><ButtonLink href="/services/bazalnaya-implantatsiya/">О базальной имплантации</ButtonLink></div>
      </div>
    </div>
  );
}

function Pinned() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReduce();
  const fixed = useMotionValue(1);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  if (reduce) {
    return (
      <section className="hidden bg-forest text-paper section-y lg:block">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          <div className="grid gap-8">
            <h2 className="sr-only">{HEADING}</h2>
            {steps.map((s) => <div key={s.n} className="grid gap-2"><span className="eyebrow">Шаг {s.n}</span><h3 className="display display-md">{s.title}</h3><p className="text-paper/75">{s.text}</p></div>)}
            <ButtonLink href="/services/bazalnaya-implantatsiya/">О базальной имплантации</ButtonLink>
          </div>
          <div className="grid gap-2"><BoneScene p={fixed} className="w-full" /><p className="text-center text-[11px] text-paper/70">{NOTE}</p></div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative hidden h-[420vh] bg-forest text-paper lg:block">
      <h2 className="sr-only">{HEADING}</h2>
      <div className="sticky top-0 grid h-[100svh] items-center overflow-hidden">
        <div aria-hidden className="absolute -left-32 top-1/4 size-[36rem] rounded-full bg-[radial-gradient(closest-side,rgba(29,104,93,0.48),transparent)]" />
        <div className="container-x relative grid items-center gap-16 lg:grid-cols-[1fr_1.1fr]">
          <div className="grid gap-6">
            <p className="eyebrow flex items-center gap-3"><span className="h-px w-10 bg-gold" />Вам сказали: «мало кости»?</p>
            <div className="relative h-72">{steps.map((_, i) => <StepText key={i} i={i} p={scrollYProgress} />)}</div>
            <div className="flex items-center gap-4"><div className="h-px w-48 bg-paper/20"><m.div style={{ width: bar }} className="h-px bg-gold" /></div></div>
            <div><ButtonLink href="/services/bazalnaya-implantatsiya/">О базальной имплантации</ButtonLink></div>
          </div>
          <div className="grid gap-2"><BoneScene p={scrollYProgress} className="mx-auto max-h-[68svh] w-full" /><p className="text-center text-[11px] text-paper/70">{NOTE}</p></div>
        </div>
      </div>
    </section>
  );
}

export function BoneStory() {
  return (
    <div id="story">
      <Swipe />
      <Pinned />
    </div>
  );
}
