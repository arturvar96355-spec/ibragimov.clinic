"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { Logo } from "./Logo";
import { FullMenu } from "./FullMenu";
import { BookButton } from "@/components/features/BookingModal";
import { site } from "@/lib/content";

export function Header() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const on = () => {
      const y = window.scrollY;
      setHidden(y > last && y > 240);
      last = y;
    };
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <>
      <header inert={hidden && !open} className={`fixed inset-x-0 top-0 z-40 px-3 pt-3 transition-transform duration-500 sm:px-6 ${hidden && !open ? "-translate-y-24" : "translate-y-0"}`}>
        <div className="glass mx-auto flex max-w-[1280px] items-center justify-between gap-4 rounded-full bg-night/60 py-2.5 pl-6 pr-2.5">
          <Logo />
          <div className="flex items-center gap-2 sm:gap-4">
            <a href={site.phoneHref} className="hidden items-center gap-2 text-sm font-bold text-paper md:flex"><Phone size={15} className="text-gold" />{site.phoneDisplay}</a>
            <span className="hidden text-[11px] italic text-paper/60 xl:block">{site.hoursDays}: {site.hours}</span>
            <div className="hidden sm:block"><BookButton className="!py-2.5 !pl-5 !pr-2.5 !text-xs">Записаться</BookButton></div>
            <button type="button" onClick={() => setOpen(true)} aria-expanded={open} aria-haspopup="dialog" aria-controls="site-menu" className="flex items-center gap-3 rounded-full bg-paper/10 py-2.5 pl-5 pr-4 text-xs font-bold uppercase tracking-[0.18em] text-paper transition hover:bg-paper/20">
              Меню
              <span aria-hidden className="grid gap-[5px]"><i className="block h-px w-5 bg-paper" /><i className="block h-px w-3.5 bg-gold" /></span>
            </button>
          </div>
        </div>
      </header>
      <FullMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
