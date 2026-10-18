"use client";

import * as m from "motion/react-m";
import type { ReactNode } from "react";

/** Мягкое появление страницы при переходе между разделами. */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <m.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </m.div>
  );
}
