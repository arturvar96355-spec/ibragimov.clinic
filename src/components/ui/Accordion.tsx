"use client";

import { Plus } from "lucide-react";
import { useState, type ReactNode } from "react";

interface Item {
  id: string;
  head: ReactNode;
  body: ReactNode;
}

export function Accordion({ items, defaultOpen }: { items: Item[]; defaultOpen?: string }) {
  const [open, setOpen] = useState<string | undefined>(defaultOpen);
  return (
    <ul className="grid gap-3">
      {items.map((it) => {
        const isOpen = open === it.id;
        return (
          <li key={it.id} id={it.id} className={`rounded-[28px] border transition-colors duration-500 ${isOpen ? "border-night bg-night text-paper" : "border-line bg-white"}`}>
            <button type="button" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? undefined : it.id)} className="flex w-full items-center gap-4 p-5 text-left sm:p-7">
              <span className="display flex-1 text-2xl sm:text-3xl">{it.head}</span>
              <span className={`grid size-10 shrink-0 place-items-center rounded-full transition duration-500 ${isOpen ? "rotate-45 bg-gold text-night" : "bg-ivory text-brand"}`}><Plus size={18} /></span>
            </button>
            <div className={`grid transition-all duration-500 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
              <div className="overflow-hidden"><div className="px-5 pb-7 sm:px-7">{it.body}</div></div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
