import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layouts/Breadcrumbs";

export const metadata: Metadata = { title: "Политика конфиденциальности — Ibragimov Clinic", description: "Политика обработки персональных данных." };

export default function PrivacyPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Политика конфиденциальности" }]} />
      <section className="container-x max-w-3xl py-8 lg:py-12">
        <h1 className="h-section mb-6">Политика конфиденциальности</h1>
        <p className="rounded-card bg-soft p-6 leading-relaxed">
          Здесь будет размещён текст политики обработки персональных данных по 152-ФЗ. Для демо-версии документ не заполнен:
          потребуются реквизиты оператора (наименование, ИНН, ОГРН, адрес), ответственное лицо и регистрационный номер в Роскомнадзоре.
        </p>
      </section>
    </>
  );
}
