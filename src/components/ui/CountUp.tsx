"use client";

import { animate, useInView } from "motion/react";
import { useReduce } from "@/lib/useReduce";
import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  to: number;
  decimals?: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export function CountUp({ to, decimals = 0, suffix = "", duration = 2, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReduce();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) return;
    const c = animate(0, to, { duration, ease: [0.22, 1, 0.36, 1], onUpdate: setValue });
    return () => c.stop();
  }, [inView, reduce, to, duration]);

  return (
    <span ref={ref} className={className}>
      {(reduce ? to : value).toFixed(decimals).replace(".", ",")}
      {suffix}
    </span>
  );
}
