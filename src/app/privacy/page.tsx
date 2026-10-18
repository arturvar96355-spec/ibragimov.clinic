import type { Metadata } from "next";
import { PageHero } from "@/components/inner/PageHero";

export const metadata: Metadata = { title: "Политика конфиденциальности — Ibragimov Clinic", description: "Политика обработки персональных данных." };

export default function PrivacyPage() {
  return (
    <>
      <PageHero crumbs={[{ label: "Политика конфиденциальности" }]} title="Политика конфиденциальности" />
      <section className="section-y bg-paper">
        <div className="container-x max-w-3xl">
          <p className="rounded-[28px] bg-ivory p-8 leading-relaxed">
            Здесь будет размещён текст политики обработки персональных данных по 152-ФЗ. Для демо-версии документ не заполнен:
            потребуются реквизиты оператора (наименование, ИНН, ОГРН, адрес), ответственное лицо и регистрационный номер в Роскомнадзоре.
          </p>
        </div>
      </section>
    </>
  );
}
