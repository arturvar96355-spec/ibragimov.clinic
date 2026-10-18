"use client";

import { useScroll, useTransform } from "motion/react";
import * as m from "motion/react-m";
import { useReduce } from "@/lib/useReduce";
import { useEffect, useRef, useState } from "react";
import { SplitText } from "@/components/ui/SplitText";
import { processSteps } from "@/lib/content";

function Card({ s, i }: { s: (typeof processSteps)[number]; i: number }) {
  return (
    <article className="relative flex min-h-[24rem] w-[82vw] max-w-[28rem] shrink-0 snap-center flex-col justify-between gap-8 overflow-hidden rounded-[32px] border border-paper/15 bg-forest p-6 sm:h-[min(30rem,62svh)] sm:w-[28rem] sm:p-9">
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

const Head = () => (
  <div className="container-x mb-8 sm:mb-10">
    <p className="eyebrow mb-4 sm:mb-5">Технологии клиники</p>
    <SplitText text="Цифровые технологии на каждом этапе" accent={["Цифровые"]} className="display display-lg max-w-4xl" />
    <p className="mt-4 max-w-xl text-sm text-paper/70 sm:mt-5">Оборудование клиники и этапы лечения зависят от клинической ситуации; план назначает врач.</p>
  </div>
);

const Strip = () => (
  <div tabIndex={0} role="region" aria-label="Этапы лечения: листайте по горизонтали" className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-4 sm:gap-4">
    {processSteps.map((s, i) => <Card key={s.tag} s={s} i={i} />)}
  </div>
);

/** Телефон/планшет (и «меньше движения»): обычный свайп без закрепления экрана. */
function Swipe({ desktopToo }: { desktopToo: boolean }) {
  return (
    <section className={`bg-night text-paper section-y ${desktopToo ? "hidden lg:block" : "lg:hidden"}`}>
      <Head />
      <Strip />
    </section>
  );
}

function Pinned() {
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

  return (
    <section ref={ref} className="relative hidden bg-night text-paper lg:block" style={{ height: `${dist + 600}px`, minHeight: "300vh" }}>
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden pt-16">
        <Head />
        <m.div ref={track} style={{ x }} className="flex w-max gap-5 pl-5 pr-5 lg:pl-[max(2.5rem,calc((100vw-1280px)/2+2.5rem))]">
          {processSteps.map((s, i) => <Card key={s.tag} s={s} i={i} />)}
        </m.div>
        <div className="container-x mt-8"><div className="h-px w-full bg-paper/15"><m.div style={{ width: bar }} className="h-px bg-gold" /></div></div>
      </div>
    </section>
  );
}

export function DigitalPath() {
  const reduce = useReduce();
  return (
    <>
      <Swipe desktopToo={false} />
      {reduce ? <Swipe desktopToo /> : <Pinned />}
    </>
  );
}
