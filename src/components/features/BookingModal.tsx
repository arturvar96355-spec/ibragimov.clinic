"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { X } from "lucide-react";
import { LeadForm } from "./LeadForm";
import { buttonClass, Arrow, type Variant } from "@/components/ui/Button";

interface Ctx {
  open: (context?: string) => void;
}

const BookingContext = createContext<Ctx>({ open: () => {} });
export const useBooking = () => useContext(BookingContext);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ open: boolean; context?: string }>({ open: false });
  const ref = useRef<HTMLDialogElement>(null);

  const open = useCallback((context?: string) => setState({ open: true, context }), []);
  const close = useCallback(() => setState((s) => ({ ...s, open: false })), []);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (state.open && !d.open) {
      d.showModal();
      document.body.style.overflow = "hidden";
    }
    if (!state.open && d.open) d.close();
    if (!state.open) document.body.style.overflow = "";
  }, [state.open]);

  return (
    <BookingContext.Provider value={{ open }}>
      {children}
      <dialog
        ref={ref}
        aria-labelledby="booking-title"
        onClose={close}
        onClick={(e) => e.target === ref.current && close()}
        className="m-auto w-[calc(100%-32px)] max-w-md rounded-[32px] bg-paper p-0 shadow-soft backdrop:bg-night/80 md:backdrop:backdrop-blur-md"
      >
        {state.open && (
          <div className="relative p-7 sm:p-9">
            <button aria-label="Закрыть" onClick={close} className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-sand text-night transition hover:rotate-90 hover:bg-gold">
              <X size={18} />
            </button>
            <p className="eyebrow mb-2">Ibragimov clinic</p>
            <h2 id="booking-title" className="display mb-2 pr-10 text-4xl">Запись на прием</h2>
            {state.context && <p className="mb-5 text-sm text-muted">{state.context}</p>}
            {!state.context && <div className="mb-5" />}
            <LeadForm context={state.context} />
          </div>
        )}
      </dialog>
    </BookingContext.Provider>
  );
}

export function BookButton({ children = "Записаться", context, variant = "gold", className = "", onOpen }: { children?: ReactNode; context?: string; variant?: Variant; className?: string; onOpen?: () => void }) {
  const { open } = useBooking();
  return (
    <button type="button" onClick={() => { onOpen?.(); open(context); }} className={buttonClass(variant, className)}>
      {children}
      <Arrow dark={variant === "gold" || variant === "light"} />
    </button>
  );
}
