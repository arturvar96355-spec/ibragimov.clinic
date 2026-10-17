"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Check, Loader2 } from "lucide-react";
import { buttonClass } from "@/components/ui/Button";

const formatPhone = (raw: string) => {
  let d = raw.replace(/\D/g, "");
  if (d.startsWith("7") || d.startsWith("8")) d = d.slice(1);
  d = d.slice(0, 10);
  const p = [d.slice(0, 3), d.slice(3, 6), d.slice(6, 8), d.slice(8, 10)];
  let out = "8";
  if (d.length) out += ` (${p[0]}`;
  if (d.length >= 3) out += ")";
  if (p[1]) out += ` ${p[1]}`;
  if (p[2]) out += `-${p[2]}`;
  if (p[3]) out += `-${p[3]}`;
  return out;
};

interface LeadFormProps {
  context?: string;
  compact?: boolean;
  namePlaceholder?: string;
}

export function LeadForm({ context, namePlaceholder = "Иванов Иван Иванович" }: LeadFormProps) {
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next: Record<string, string> = {};
    if (!String(data.get("name") ?? "").trim()) next.name = "Укажите имя";
    if (phone.replace(/\D/g, "").length < 11) next.phone = "Введите телефон полностью";
    if (!data.get("agree")) next.agree = "Необходимо согласие на обработку данных";
    setErrors(next);
    if (Object.keys(next).length) return;
    setStatus("loading");
    setTimeout(() => setStatus("done"), 900); // демо: без отправки на сервер
  };

  if (status === "done") {
    return (
      <div role="status" className="grid place-items-center gap-3 py-8 text-center">
        <span className="grid size-14 place-items-center rounded-full bg-brand text-white"><Check /></span>
        <p className="text-lg font-bold text-brand">Заявка принята</p>
        <p className="text-sm text-muted">Это демо-версия: данные никуда не отправляются. В рабочей версии мы перезвоним в течение 15 минут.</p>
      </div>
    );
  }

  const field = "w-full rounded-ctl border bg-white px-4 py-3.5 text-sm shadow-soft outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20";
  return (
    <form onSubmit={submit} noValidate className="grid gap-3 text-left">
      {context && <input type="hidden" name="context" value={context} />}
      <div>
        <input name="name" autoComplete="name" placeholder={`*${namePlaceholder}`} aria-label="Имя" aria-invalid={!!errors.name} className={`${field} ${errors.name ? "border-red-500" : "border-transparent"}`} />
        {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
      </div>
      <div>
        <input name="phone" type="tel" inputMode="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(formatPhone(e.target.value))} placeholder="*8 (495) 123-45-67" aria-label="Телефон" aria-invalid={!!errors.phone} className={`${field} ${errors.phone ? "border-red-500" : "border-transparent"}`} />
        {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
      </div>
      <button type="submit" disabled={status === "loading"} className={buttonClass("dark", "w-full disabled:opacity-70")}>
        {status === "loading" ? <Loader2 className="animate-spin" size={18} /> : "Оставить заявку"}
      </button>
      <label className="flex items-start gap-2.5 text-xs leading-snug text-muted">
        <input type="checkbox" name="agree" className="mt-0.5 size-4 shrink-0 accent-[var(--color-brand)]" />
        <span>
          Даю согласие на обработку <Link href="/privacy/" className="underline hover:text-brand">персональных данных</Link>
        </span>
      </label>
      {errors.agree && <p className="-mt-1 text-xs text-red-600">{errors.agree}</p>}
    </form>
  );
}
