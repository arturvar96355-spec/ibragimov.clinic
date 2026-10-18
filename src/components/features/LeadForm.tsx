"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { Check, Loader2 } from "lucide-react";
import { Arrow, buttonClass } from "@/components/ui/Button";

const digitsOf = (raw: string) => {
  let d = raw.replace(/\D/g, "");
  if (d.startsWith("7") || d.startsWith("8")) d = d.slice(1);
  return d.slice(0, 10);
};

const formatDigits = (d: string) => {
  if (!d.length) return "";
  const p = [d.slice(0, 3), d.slice(3, 6), d.slice(6, 8), d.slice(8, 10)];
  let out = `8 (${p[0]}`;
  if (d.length >= 3) out += ")";
  if (p[1]) out += ` ${p[1]}`;
  if (p[2]) out += `-${p[2]}`;
  if (p[3]) out += `-${p[3]}`;
  return out;
};

interface LeadFormProps {
  context?: string;
  tone?: "light" | "dark";
  namePlaceholder?: string;
}

export function LeadForm({ context, tone = "light", namePlaceholder = "Иванов Иван Иванович" }: LeadFormProps) {
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const doneRef = useRef<HTMLDivElement>(null);
  const dark = tone === "dark";

  useEffect(() => {
    if (status === "done") doneRef.current?.focus();
  }, [status]);

  const onPhone = (e: ChangeEvent<HTMLInputElement>) => {
    const native = e.nativeEvent as InputEvent;
    let d = digitsOf(e.target.value);
    // стирание «)», «-» или пробела не должно возвращать символ: удаляем последнюю цифру
    if (native.inputType?.startsWith("delete") && d.length === digitsOf(phone).length && d.length > 0) d = d.slice(0, -1);
    setPhone(formatDigits(d));
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next: Record<string, string> = {};
    if (!String(data.get("name") ?? "").trim()) next.name = "Укажите имя";
    if (digitsOf(phone).length < 10) next.phone = "Введите телефон полностью";
    if (!data.get("agree")) next.agree = "Необходимо согласие на обработку данных";
    setErrors(next);
    const first = Object.keys(next)[0];
    if (first) {
      e.currentTarget.querySelector<HTMLElement>(`[name=${first}]`)?.focus();
      return;
    }
    setStatus("loading");
    setTimeout(() => setStatus("done"), 900); // демо: без отправки на сервер
  };

  if (status === "done") {
    return (
      <div ref={doneRef} tabIndex={-1} role="status" className="grid place-items-center gap-3 py-8 text-center outline-none">
        <span className="grid size-14 place-items-center rounded-full bg-gold text-night"><Check /></span>
        <p className="display text-3xl">Заявка принята</p>
        <p className={`text-sm ${dark ? "text-paper/70" : "text-muted"}`}>Это демо-версия: данные никуда не отправляются. В рабочей версии администратор свяжется с вами.</p>
      </div>
    );
  }

  const field = "w-full rounded-full border bg-white px-6 py-4 text-sm text-ink outline-none transition placeholder:text-muted focus:border-gold focus:ring-2 focus:ring-gold/30";
  const edge = (bad: boolean) => (bad ? "border-red-500" : dark ? "border-transparent" : "border-line");
  const err = "mt-1 pl-4 text-xs text-red-600";
  const errDark = dark ? "!text-red-300" : "";
  return (
    <form onSubmit={submit} noValidate className="grid gap-3 text-left">
      {context && <input type="hidden" name="context" value={context} />}
      <div>
        <input name="name" autoComplete="name" placeholder={`*${namePlaceholder}`} aria-label="Имя" aria-invalid={!!errors.name} aria-describedby={errors.name ? "err-name" : undefined} className={`${field} ${edge(!!errors.name)}`} />
        {errors.name && <p id="err-name" role="alert" className={`${err} ${errDark}`}>{errors.name}</p>}
      </div>
      <div>
        <input name="phone" type="tel" inputMode="tel" autoComplete="tel" value={phone} onChange={onPhone} placeholder="*8 (495) 123-45-67" aria-label="Телефон" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "err-phone" : undefined} className={`${field} ${edge(!!errors.phone)}`} />
        {errors.phone && <p id="err-phone" role="alert" className={`${err} ${errDark}`}>{errors.phone}</p>}
      </div>
      <button type="submit" disabled={status === "loading"} className={buttonClass("gold", "w-full !justify-between disabled:opacity-70")}>
        {status === "loading" ? <Loader2 className="animate-spin" size={18} /> : <>Оставить заявку<Arrow /></>}
      </button>
      <label className={`flex items-start gap-2.5 text-xs leading-snug ${dark ? "text-paper/80" : "text-muted"}`}>
        <input type="checkbox" name="agree" aria-invalid={!!errors.agree} aria-describedby={errors.agree ? "err-agree" : undefined} className="mt-0.5 size-4 shrink-0 accent-[var(--color-gold)]" />
        <span>
          Даю согласие на обработку <Link href="/privacy/" target="_blank" rel="noopener" className="underline hover:text-gold">персональных данных</Link>
        </span>
      </label>
      {errors.agree && <p id="err-agree" role="alert" className={`-mt-1 pl-1 text-xs text-red-600 ${errDark}`}>{errors.agree}</p>}
      <p className={`text-[11px] ${dark ? "text-paper/65" : "text-muted"}`}>Имеются противопоказания, необходима консультация специалиста.</p>
    </form>
  );
}
