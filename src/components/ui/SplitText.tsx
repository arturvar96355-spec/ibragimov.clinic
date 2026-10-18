"use client";

import { motion } from "motion/react";
import { Fragment, type CSSProperties } from "react";
import { useReduce } from "@/lib/useReduce";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  /** слова, которые рисуются курсивом display-шрифта и золотом */
  accent?: string[];
  /** анимация на чистом CSS при загрузке (для заголовков первого экрана) */
  immediate?: boolean;
}

const WORD = "inline-block overflow-hidden pb-[0.12em] align-bottom";

/** Пословное появление из-под маски. Контент в DOM всегда есть (SEO/reduced-motion). */
export function SplitText({ text, className = "", delay = 0, as = "h2", accent = [], immediate = false }: SplitTextProps) {
  const reduce = useReduce();
  const Tag = motion[as] as typeof motion.h2;
  const words = text.split(" ");
  const isAccent = (w: string) => accent.includes(w) || accent.includes(w.replace(/[.,!?]/g, ""));
  const space = (i: number) => (i < words.length - 1 ? " " : null);

  if (immediate) {
    const Plain = as;
    return (
      <Plain className={className} aria-label={text}>
        <span aria-hidden>
          {words.map((w, i) => (
            <Fragment key={i}>
              <span className={WORD}>
                <span className={`word-in inline-block ${isAccent(w) ? "italic text-gold" : ""}`} style={{ "--d": `${delay + i * 0.06}s` } as CSSProperties}>{w}</span>
              </span>
              {space(i)}
            </Fragment>
          ))}
        </span>
      </Plain>
    );
  }

  return (
    <Tag className={className} initial={reduce ? "show" : "hidden"} whileInView="show" viewport={{ once: true, margin: "-80px" }} aria-label={text}>
      <span aria-hidden>
        {words.map((w, i) => (
          <Fragment key={i}>
            <span className={WORD}>
              <motion.span
                className={`inline-block ${isAccent(w) ? "italic text-gold" : ""}`}
                variants={{ hidden: { y: "110%" }, show: { y: 0 } }}
                transition={{ duration: 0.9, delay: delay + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                {w}
              </motion.span>
            </span>
            {space(i)}
          </Fragment>
        ))}
      </span>
    </Tag>
  );
}
