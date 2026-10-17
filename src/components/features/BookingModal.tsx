"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { X } from "lucide-react";
import { LeadForm } from "./LeadForm";
import { buttonClass } from "@/components/ui/Button";

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
    if (state.open && !d.open) d.showModal();
    if (!state.open && d.open) d.close();
  }, [state.open]);

  return (
    <BookingContext.Provider value={{ open }}>
      {children}
      <dialog
        ref={ref}
        onClose={close}
        onClick={(e) => e.target === ref.current && close()}
        className="m-auto w-[calc(100%-32px)] max-w-md rounded-[28px] p-0 shadow-pop backdrop:bg-[#14194a]/70 backdrop:backdrop-blur-sm"
      >
        {state.open && (
          <div className="relative p-7 sm:p-9">
            <button aria-label="Закрыть" onClick={close} className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-brand-soft text-brand transition hover:bg-brand hover:text-white">
              <X size={18} />
            </button>
            <h2 className="mb-1 pr-10 text-2xl font-bold text-brand">Запись на прием</h2>
            {state.context && <p className="mb-5 text-sm text-muted">{state.context}</p>}
            {!state.context && <div className="mb-5" />}
            <LeadForm context={state.context} />
          </div>
        )}
      </dialog>
    </BookingContext.Provider>
  );
}

export function BookButton({ children = "Записаться", context, variant = "dark", className = "" }: { children?: ReactNode; context?: string; variant?: "dark" | "brand" | "outline" | "white"; className?: string }) {
  const { open } = useBooking();
  return (
    <button type="button" onClick={() => open(context)} className={buttonClass(variant, className)}>
      {children}
    </button>
  );
}
