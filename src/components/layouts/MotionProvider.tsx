"use client";

import { domAnimation, LazyMotion } from "motion/react";
import type { ReactNode } from "react";

/** Подгружает только нужные возможности motion (меньше JS на телефоне). */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <LazyMotion features={domAnimation} strict>{children}</LazyMotion>;
}
