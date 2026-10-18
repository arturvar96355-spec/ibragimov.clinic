"use client";

import { motion, useMotionValue, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { BoneScene } from "@/components/art/BoneScene";
import { ButtonLink } from "@/components/ui/Button";

const steps = [
  { n: "01", title: "Костной ткани достаточно", text: "Классическая имплантация возможна, когда объёма кости хватает для установки импланта." },
  { n: "02", title: "Кости стало мало", text: "При недостатке кости классическую установку обычно откладывают ради наращивания: это дополнительные этапы и время." },
  { n: "03", title: "Другой подход", text: "При базальной имплантации импланты фиксируются в плотных базальных отделах кости. Восстановить зубы за один прием можно даже при недостаточном объёме кости." },
];

const ranges: [number, number, number, number][] = [
  [0, 0, 0.28, 0.34],
  [0.3, 0.37, 0.58, 0.65],
  [0.62, 0.7, 0.99, 1],
];

function StepText({ i, p }: { i: number; p: MotionValue<number> }) {
  const [a, b, c, d] = ranges[i];
  const opacity = useTransform(p, [a, b, c, d], [i === 0 ? 1 : 0, 1, 1, i === 2 ? 1 : 0]);
  const y = useTransform(p, [a, b, c, d], [i === 0 ? 0 : 40, 0, 0, i === 2 ? 0 : -40]);
  const s = steps[i];
  return (
    <motion.div style={{ opacity, y }} className="absolute inset-x-0 top-0 grid gap-4">
      <span className="eyebrow">Шаг {s.n}</span>
      <h3 className="display display-md">{s.title}</h3>
      <p className="max-w-md text-base leading-relaxed text-paper/75">{s.text}</p>
    </motion.div>
  );
}

export function BoneStory() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const fixed = useMotionValue(1);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  if (reduce) {
    return (
      <section id="story" className="bg-forest text-paper section-y">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          <div className="grid gap-8">{steps.map((s) => <div key={s.n} className="grid gap-2"><span className="eyebrow">Шаг {s.n}</span><h3 className="display display-md">{s.title}</h3><p className="text-paper/75">{s.text}</p></div>)}<ButtonLink href="/services/bazalnaya-implantatsiya/">О базальной имплантации</ButtonLink></div>
          <BoneScene p={fixed} className="w-full" />
        </div>
      </section>
    );
  }

  return (
    <section id="story" ref={ref} className="relative h-[420vh] bg-forest text-paper">
      <div className="sticky top-0 grid h-[100svh] items-center overflow-hidden">
        <div aria-hidden className="absolute -left-32 top-1/4 size-[36rem] rounded-full bg-brand/30 blur-[120px]" />
        <div className="container-x relative grid items-center gap-6 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div className="grid gap-6">
            <p className="eyebrow flex items-center gap-3"><span className="h-px w-10 bg-gold" />Вам сказали: «мало кости»?</p>
            <div className="relative h-60 sm:h-56 lg:h-72">{steps.map((_, i) => <StepText key={i} i={i} p={scrollYProgress} />)}</div>
            <div className="hidden items-center gap-4 lg:flex">
              <div className="h-px w-48 bg-paper/20"><motion.div style={{ width: bar }} className="h-px bg-gold" /></div>
              <span className="text-[11px] text-paper/50">Схематично; метод подбирает врач</span>
            </div>
            <div><ButtonLink href="/services/bazalnaya-implantatsiya/">О базальной имплантации</ButtonLink></div>
          </div>
          <BoneScene p={scrollYProgress} className="mx-auto max-h-[44svh] w-full lg:max-h-[72svh]" />
        </div>
      </div>
    </section>
  );
}
