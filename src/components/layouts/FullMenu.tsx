"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { Logo } from "./Logo";
import { BookButton } from "@/components/features/BookingModal";
import { childrenOf, rootServices, site } from "@/lib/content";

export function FullMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const closeRef = useRef<HTMLButtonElement>(null);
  const [lastPath, setLastPath] = useState(pathname);

  if (lastPath !== pathname) {
    setLastPath(pathname);
    if (open) onClose();
  }

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const key = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", key);
    };
  }, [open, onClose]);

  const nav = site.nav.filter((n) => !n.mega);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Меню сайта"
          className="grain fixed inset-0 z-50 overflow-y-auto bg-night text-paper"
          initial={{ clipPath: "circle(0% at 92% 4%)" }}
          animate={{ clipPath: "circle(150% at 92% 4%)" }}
          exit={{ clipPath: "circle(0% at 92% 4%)" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="container-x flex min-h-full flex-col py-5">
            <div className="flex items-center justify-between">
              <Logo />
              <button ref={closeRef} onClick={onClose} aria-label="Закрыть меню" className="grid size-12 place-items-center rounded-full bg-paper/10 transition hover:rotate-90 hover:bg-gold hover:text-night"><X size={20} /></button>
            </div>
            <div className="grid flex-1 gap-12 py-12 lg:grid-cols-[1.1fr_1fr] lg:py-16">
              <nav aria-label="Разделы">
                <ul className="grid gap-1">
                  {[{ href: "/", label: "Главная" }, ...nav.slice(0, 1), { href: "/services/", label: "Услуги" }, ...nav.slice(1)].map((n, i) => (
                    <motion.li key={n.href} initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 + i * 0.06, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
                      <Link href={n.href} className="group flex items-baseline gap-4 py-1">
                        <span className="eyebrow w-7 !text-[10px] opacity-70">{String(i + 1).padStart(2, "0")}</span>
                        <span className={`display text-[clamp(2.4rem,7vw,5.5rem)] transition-all duration-300 group-hover:translate-x-3 group-hover:italic group-hover:text-gold ${pathname === n.href ? "italic text-gold" : ""}`}>{n.label}</span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="grid content-start gap-10">
                <div>
                  <p className="eyebrow mb-5">Направления</p>
                  <ul className="columns-1 gap-8 text-sm sm:columns-2">
                    {rootServices.map((s) => (
                      <li key={s.slug} className="mb-4 break-inside-avoid">
                        <Link href={`/services/${s.slug}/`} className="font-semibold text-paper transition hover:text-gold">{s.title}</Link>
                        {childrenOf(s.slug).map((c) => <Link key={c.slug} href={`/services/${c.slug}/`} className="mt-1 block pl-3 text-xs text-paper/55 transition hover:text-gold">— {c.title}</Link>)}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="grid gap-3 border-t border-paper/15 pt-8 text-sm">
                  <a href={site.phoneHref} className="display text-4xl">{site.phoneDisplay}</a>
                  <p className="text-paper/60">{site.addressCity}, {site.address}</p>
                  <p className="text-paper/60">{site.hoursDays}: {site.hours}</p>
                  <div className="mt-3"><BookButton>Записаться на прием</BookButton></div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
