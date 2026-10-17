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
          <li key={it.id} id={it.id} className="rounded-card bg-soft">
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? undefined : it.id)}
              className="flex w-full items-center gap-4 p-4 text-left sm:p-5"
            >
              <span className="flex-1">{it.head}</span>
              <span className={`grid size-9 shrink-0 place-items-center rounded-full bg-white text-brand transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>
                <Plus size={18} />
              </span>
            </button>
            <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
              <div className="overflow-hidden">
                <div className="px-4 pb-5 sm:px-5">{it.body}</div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
