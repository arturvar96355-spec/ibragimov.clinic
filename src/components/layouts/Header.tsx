"use client";

import { useEffect, useRef, useState } from "react";
import { Phone } from "lucide-react";
import { Logo } from "./Logo";
import { FullMenu } from "./FullMenu";
import { BookButton } from "@/components/features/BookingModal";
import { site } from "@/lib/content";

type Tone = "dark" | "light";

/** Светлота фона под точкой (x, y): поднимаемся по предкам до непрозрачного цвета. */
function toneAt(x: number, y: number, header: HTMLElement | null): Tone {
  for (const el of document.elementsFromPoint(x, y)) {
    if (header?.contains(el)) continue;
    for (let n: Element | null = el; n; n = n.parentElement) {
      const m = getComputedStyle(n).backgroundColor.match(/[\d.]+/g);
      if (!m) continue;
      const [r, g, b] = m.map(Number);
      const a = m.length > 3 ? Number(m[3]) : 1;
      if (a < 0.6) continue;
      return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255 > 0.55 ? "light" : "dark";
    }
  }
  return "dark";
}

const SKIN: Record<Tone, { bar: string; text: string; muted: string; menu: string; line: string }> = {
  dark: {
    bar: "bg-night/80 ring-1 ring-paper/15 shadow-[0_10px_40px_rgba(0,0,0,0.35)]",
    text: "text-paper",
    muted: "text-paper/70",
    menu: "bg-paper/10 text-paper hover:bg-paper/20",
    line: "bg-paper",
  },
  light: {
    bar: "bg-paper/95 ring-1 ring-ink/10 shadow-[0_10px_40px_rgba(7,32,29,0.14)]",
    text: "text-ink",
    muted: "text-ink/65",
    menu: "bg-night text-paper hover:bg-brand",
    line: "bg-paper",
  },
};

export function Header() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [tone, setTone] = useState<Tone>("dark");
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;
    const measure = () => {
      frame = 0;
      setTone(toneAt(window.innerWidth / 2, 46, ref.current));
    };
    const on = () => {
      const y = window.scrollY;
      setHidden(y > last && y > 240);
      last = y;
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    const t = setTimeout(measure, 700); // после появления контента/анимаций
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      clearTimeout(t);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const s = SKIN[tone];
  return (
    <>
      <header ref={ref} inert={hidden && !open} className={`fixed inset-x-0 top-0 z-40 px-3 pt-3 transition-transform duration-500 sm:px-6 ${hidden && !open ? "-translate-y-24" : "translate-y-0"}`}>
        <div className={`mx-auto flex max-w-[1280px] items-center justify-between gap-4 rounded-full py-2.5 pl-6 pr-2.5 transition-[background-color,box-shadow] duration-300 md:backdrop-blur-xl ${s.bar}`}>
          <Logo dark={tone === "light"} />
          <div className="flex items-center gap-2 sm:gap-4">
            <a href={site.phoneHref} className={`hidden items-center gap-2 text-sm font-bold transition-colors duration-300 md:flex ${s.text}`}><Phone size={15} className={tone === "light" ? "text-brand" : "text-gold"} />{site.phoneDisplay}</a>
            <span className={`hidden text-[11px] italic transition-colors duration-300 xl:block ${s.muted}`}>{site.hoursDays}: {site.hours}</span>
            <div className="hidden sm:block"><BookButton className="!py-2.5 !pl-5 !pr-2.5 !text-xs">Записаться</BookButton></div>
            <button type="button" onClick={() => setOpen(true)} aria-expanded={open} aria-haspopup="dialog" aria-controls="site-menu" className={`flex items-center gap-3 rounded-full py-2.5 pl-5 pr-4 text-xs font-bold uppercase tracking-[0.18em] transition-colors duration-300 ${s.menu}`}>
              Меню
              <span aria-hidden className="grid gap-[5px]"><i className={`block h-px w-5 ${s.line}`} /><i className="block h-px w-3.5 bg-gold" /></span>
            </button>
          </div>
        </div>
      </header>
      <FullMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
