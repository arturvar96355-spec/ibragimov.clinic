"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useReduce } from "@/lib/useReduce";
import { useRef } from "react";

export function Timeline({ items }: { items: string[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReduce();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const h = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <ol ref={ref} className="relative grid gap-8 pl-2">
      <span aria-hidden className="absolute bottom-4 left-[27px] top-4 w-px bg-line" />
      <motion.span aria-hidden style={{ height: reduce ? "100%" : h }} className="absolute left-[27px] top-4 w-px bg-gold" />
      {items.map((it, i) => (
        <li key={it} className="relative flex items-start gap-6">
          <span className="display relative z-10 grid size-14 shrink-0 place-items-center rounded-full border border-gold bg-paper text-2xl italic text-brand">{String(i + 1).padStart(2, "0")}</span>
          <p className="pt-3 text-lg font-semibold leading-snug">{it}</p>
        </li>
      ))}
    </ol>
  );
}
