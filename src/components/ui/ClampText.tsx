"use client";

import { useState } from "react";

/** Длинный текст: на телефоне сжат до 3 строк с кнопкой «Подробнее». */
export function ClampText({ text, dark, always = false, className = "" }: { text: string; dark?: boolean; always?: boolean; className?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <p className={`text-sm leading-relaxed ${dark ? "text-paper/70" : "text-muted"} ${open ? "" : always ? "line-clamp-3 md:line-clamp-none" : "line-clamp-3 md:line-clamp-4"} ${className}`}>{text}</p>
      <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} className={`mt-2 text-xs font-bold underline decoration-gold underline-offset-4 md:hidden ${dark ? "text-gold" : "text-brand"}`}>
        {open ? "Свернуть" : "Подробнее"}
      </button>
    </div>
  );
}
