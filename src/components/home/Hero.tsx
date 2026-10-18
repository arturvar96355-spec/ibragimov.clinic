"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import { JawHero } from "@/components/art/JawHero";
import { SplitText } from "@/components/ui/SplitText";
import { Magnetic } from "@/components/ui/Magnetic";
import { ButtonLink } from "@/components/ui/Button";
import { BookButton } from "@/components/features/BookingModal";
import { site } from "@/lib/content";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const rise = useTransform(scrollYProgress, [0, 1], [0, -90]);

  return (
    <section
      ref={ref}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
      className="grain relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-night text-paper"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-70 [background:radial-gradient(520px_circle_at_var(--mx,70%)_var(--my,40%),rgba(168,213,197,0.14),transparent_60%)]" />
      <div aria-hidden className="absolute -right-40 top-10 -z-10 size-[44rem] rounded-full bg-brand/40 blur-[120px]" />
      <div aria-hidden className="absolute -left-40 bottom-0 -z-10 size-[32rem] rounded-full bg-gold/10 blur-[120px]" />
      <svg aria-hidden className="absolute inset-0 -z-10 h-full w-full opacity-30" viewBox="0 0 1440 900" preserveAspectRatio="none" fill="none">
        {[0, 1, 2, 3, 4].map((i) => <path key={i} d={`M-40 ${620 + i * 26} C 300 ${460 + i * 30}, 620 ${760 + i * 10}, 900 ${600 + i * 22} S 1300 ${520 + i * 18}, 1500 ${600 + i * 24}`} stroke="#c9a45c" strokeOpacity={0.5 - i * 0.07} />)}
      </svg>

      <motion.div style={{ opacity: fade }} className="container-x relative grid flex-1 items-center gap-6 pb-10 pt-32 lg:grid-cols-[1.05fr_1fr] lg:pt-28">
        <motion.div style={{ y: rise }} className="relative z-10 grid gap-7">
          <p style={{ "--d": "0.1s" } as React.CSSProperties} className="eyebrow fade-up flex items-center gap-3">
            <span className="h-px w-10 bg-gold" /> Стоматология · Москва · ЮЗАО
          </p>
          <SplitText as="h1" immediate text="Улыбка за один прием" accent={["один"]} delay={0.1} className="display display-xl !leading-[0.92]" />
          <p style={{ "--d": "0.45s" } as React.CSSProperties} className="fade-up max-w-lg text-base leading-relaxed text-paper/75 sm:text-lg">
            {site.brandFull}. Восстанавливаем зубы, в том числе при недостатке костной ткани, и лечим под микроскопом.
          </p>
          <div style={{ "--d": "0.6s" } as React.CSSProperties} className="fade-up flex flex-wrap items-center gap-3">
            <Magnetic><ButtonLink href="/#navigator">Подобрать лечение</ButtonLink></Magnetic>
            <BookButton variant="ghost">Записаться</BookButton>
          </div>
        </motion.div>

        <motion.div style={{ y }} className="relative mx-auto aspect-[740/420] w-full max-w-[780px]"><div style={{ "--d": "0.2s" } as React.CSSProperties} className="fade-up h-full w-full">
          <JawHero className="h-full w-full" />
        </div></motion.div>
      </motion.div>

      <div className="container-x relative z-10 grid gap-3 pb-24 sm:grid-cols-3 md:pb-10">
        {[
          { k: "21 год", v: "практики ведущего врача" },
          { k: `${site.ratings[0].value} из 5`, v: "рейтинг клиники на Яндексе" },
          { k: "КТ + консультация", v: "терапевта бесплатно по акции*" },
        ].map((f, i) => (
          <div key={f.k} style={{ "--d": `${0.8 + i * 0.1}s` } as React.CSSProperties} className="glass fade-up rounded-3xl px-6 py-4">
            <p className="display text-3xl text-gold">{f.k}</p>
            <p className="mt-1 text-xs text-paper/65">{f.v}</p>
          </div>
        ))}
        <p className="text-[11px] text-paper/45 sm:col-span-3">*при прохождении первичной гигиены полости рта</p>
      </div>
      <a href="#story" aria-label="Листайте вниз" className="absolute bottom-6 right-6 hidden size-12 animate-float place-items-center rounded-full border border-paper/25 text-gold lg:grid"><ArrowDown size={18} /></a>
    </section>
  );
}
