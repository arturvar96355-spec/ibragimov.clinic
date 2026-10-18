"use client";

import { motion } from "motion/react";
import { useReduce } from "@/lib/useReduce";
import type { ReactNode } from "react";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  /** слова, которые рисуются курсивом display-шрифта и золотом */
  accent?: string[];
}

/** Построчно-пословное появление из-под маски. Контент в DOM всегда есть (SEO/reduced-motion). */
export function SplitText({ text, className = "", delay = 0, as = "h2", accent = [] }: SplitTextProps) {
  const reduce = useReduce();
  const Tag = motion[as] as typeof motion.h2;
  const words = text.split(" ");
  const parts: ReactNode[] = words.map((w, i) => {
    const isAccent = accent.includes(w) || accent.includes(w.replace(/[.,!?]/g, ""));
    return (
      <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
        <motion.span
          className={`inline-block ${isAccent ? "italic text-gold" : ""}`}
          variants={{ hidden: { y: "110%" }, show: { y: 0 } }}
          transition={{ duration: 0.9, delay: delay + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
        >
          {w}
        </motion.span>
        {i < words.length - 1 && " "}
      </span>
    );
  });
  return (
    <Tag
      className={className}
      initial={reduce ? "show" : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      aria-label={text}
    >
      <span aria-hidden>{parts}</span>
    </Tag>
  );
}
