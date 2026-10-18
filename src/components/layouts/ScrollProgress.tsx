"use client";

import { useScroll, useSpring } from "motion/react";
import * as m from "motion/react-m";

/** Тонкая золотая полоса прогресса чтения страницы. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return <m.div aria-hidden style={{ scaleX }} className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gold" />;
}
