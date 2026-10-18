import Image from "next/image";
import type { Img } from "@/lib/types";

interface MediaProps {
  img: Img;
  className?: string;
  tone?: "night" | "ivory" | "mint";
  sizes?: string;
  priority?: boolean;
}

const tones = {
  night: "from-forest via-pine to-night",
  ivory: "from-sand via-ivory to-paper",
  mint: "from-[#cfe8dd] via-[#e6f3ec] to-[#b9dccd]",
};

/** Единая точка для фото: без src рисует брендовый placeholder, с src — next/image. */
export function Media({ img, className = "", tone = "night", sizes = "100vw", priority }: MediaProps) {
  if (img.src) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image src={img.src} alt={img.alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    );
  }
  const dark = tone === "night";
  return (
    <div role="img" aria-label={img.alt} className={`relative overflow-hidden bg-gradient-to-br ${tones[tone]} ${className}`}>
      <svg aria-hidden className="absolute inset-0 h-full w-full opacity-40" viewBox="0 0 400 300" preserveAspectRatio="none">
        {[0, 1, 2, 3].map((i) => (
          <path key={i} d={`M-20 ${200 + i * 22} C 80 ${130 + i * 20}, 160 ${270 + i * 8}, 260 ${190 + i * 14} S 380 ${130 + i * 12}, 430 ${180 + i * 18}`} fill="none" stroke={dark ? "#c9a45c" : "#1d685d"} strokeWidth="0.9" />
        ))}
      </svg>
      <svg aria-hidden viewBox="0 0 64 64" className={`absolute left-1/2 top-1/2 h-1/3 max-h-28 -translate-x-1/2 -translate-y-1/2 ${dark ? "text-gold/60" : "text-brand/40"}`} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 10c-6 0-11 5-11 12 0 6 3 9 4 15 1 6 2 17 6 17 3 0 3-10 6-10h6c3 0 3 10 6 10 4 0 5-11 6-17 1-6 4-9 4-15 0-7-5-12-11-12-4 0-6 2-9 2s-5-2-9-2Z" />
      </svg>
    </div>
  );
}
