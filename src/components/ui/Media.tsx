import Image from "next/image";
import type { Img } from "@/lib/types";

interface MediaProps {
  img: Img;
  className?: string;
  tone?: "green" | "sand" | "sky";
  sizes?: string;
  priority?: boolean;
}

const tones = {
  green: "from-brand via-[#2a8577] to-[#0e3b34]",
  sand: "from-[#efe6d6] via-[#f7f2e9] to-[#e4d6bb]",
  sky: "from-[#dbe8f4] via-[#f3f7fb] to-[#c9dcee]",
};

/** Единая точка для фото: без src рисует брендовый placeholder, с src — next/image. */
export function Media({ img, className = "", tone = "green", sizes = "100vw", priority }: MediaProps) {
  if (img.src) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image src={img.src} alt={img.alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    );
  }
  const dark = tone === "green";
  return (
    <div
      role="img"
      aria-label={img.alt}
      className={`relative overflow-hidden bg-gradient-to-br ${tones[tone]} ${className}`}
    >
      <svg aria-hidden className="absolute inset-0 h-full w-full opacity-30" viewBox="0 0 400 300" preserveAspectRatio="none">
        <path d="M-20 220 C 80 150, 160 280, 260 200 S 380 140, 430 190" fill="none" stroke={dark ? "#fff" : "#c9a45c"} strokeWidth="1.2" />
        <path d="M-20 250 C 100 180, 180 300, 280 230 S 390 170, 430 220" fill="none" stroke={dark ? "#fff" : "#c9a45c"} strokeWidth="1" />
        <path d="M-20 190 C 60 120, 150 250, 250 170 S 370 110, 430 160" fill="none" stroke={dark ? "#fff" : "#c9a45c"} strokeWidth="0.8" />
      </svg>
      <svg aria-hidden viewBox="0 0 64 64" className={`absolute left-1/2 top-1/2 h-1/3 max-h-24 -translate-x-1/2 -translate-y-1/2 ${dark ? "text-white/70" : "text-brand/50"}`} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 10c-6 0-11 5-11 12 0 6 3 9 4 15 1 6 2 17 6 17 3 0 3-10 6-10h6c3 0 3 10 6 10 4 0 5-11 6-17 1-6 4-9 4-15 0-7-5-12-11-12-4 0-6 2-9 2s-5-2-9-2Z" />
      </svg>
    </div>
  );
}
