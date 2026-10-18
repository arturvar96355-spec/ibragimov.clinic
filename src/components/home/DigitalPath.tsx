"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useReduce } from "@/lib/useReduce";
import { useEffect, useRef, useState } from "react";
import { SplitText } from "@/components/ui/SplitText";
import { processSteps } from "@/lib/content";

function Card({ s, i }: { s: (typeof processSteps)[number]; i: number }) {
  return (
    <article className="relative flex h-[min(30rem,62svh)] w-[82vw] shrink-0 flex-col justify-between overflow-hidden rounded-[32px] border border-paper/15 bg-forest p-7 sm:w-[28rem] sm:p-9">
      <span aria-hidden className="display pointer-events-none absolute -right-2 -top-6 select-none text-[11rem] italic leading-none text-transparent [-webkit-text-stroke:1px_rgba(201,164,92,0.35)]">{s.tag}</span>
      <span className="eyebrow relative">Этап {s.tag}</span>
      <div className="relative grid gap-4">
        <h3 className="display text-4xl sm:text-5xl">{s.title}</h3>
        <p className="text-sm leading-relaxed text-paper/70">{s.text}</p>
        <span className="w-fit rounded-full border border-gold/50 px-4 py-1.5 text-xs font-bold text-gold">{s.equipment}</span>
      </div>
      <span aria-hidden className="absolute bottom-0 left-0 h-1 bg-gold/70" style={{ width: `${((i + 1) / processSteps.length) * 100}%` }} />
    </article>
  );
}

export function DigitalPath() {
  const reduce = useReduce();
  const ref = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0.04, 0.96], [0, -dist]);
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const measure = () => track.current && setDist(Math.max(0, track.current.scrollWidth - window.innerWidth + 40));
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const head = (
    <div className="container-x mb-10">
      <p className="eyebrow mb-5">Как устроено лечение</p>
      <SplitText text="Цифровой путь от скана до коронки" accent={["цифровой", "Цифровой"]} className="display display-lg max-w-4xl" />
    </div>
  );

  if (reduce) {
    return (
      <section className="bg-night text-paper section-y">
        {head}
        <div className="no-scrollbar flex gap-4 overflow-x-auto px-5 pb-4">{processSteps.map((s, i) => <Card key={s.tag} s={s} i={i} />)}</div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative bg-night text-paper" style={{ height: `${dist + 100 * 6}px`, minHeight: "300vh" }}>
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden pt-16">
        {head}
        <motion.div ref={track} style={{ x }} className="flex w-max gap-5 pl-5 pr-5 lg:pl-[max(2.5rem,calc((100vw-1280px)/2+2.5rem))]">
          {processSteps.map((s, i) => <Card key={s.tag} s={s} i={i} />)}
        </motion.div>
        <div className="container-x mt-8"><div className="h-px w-full bg-paper/15"><motion.div style={{ width: bar }} className="h-px bg-gold" /></div></div>
      </div>
    </section>
  );
}
