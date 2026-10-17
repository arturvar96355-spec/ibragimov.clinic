import type { Metadata } from "next";
import { PromoHero } from "@/components/features/PromoSlider";
import { IntroBlock } from "@/components/features/IntroBlock";
import { ServicesGrid } from "@/components/features/ServicesGrid";
import { AboutGallery } from "@/components/features/AboutGallery";
import { Advantages } from "@/components/features/Advantages";
import { DoctorsSection } from "@/components/features/DoctorsSection";
import { EquipmentSlider } from "@/components/features/EquipmentSlider";
import { ReviewsSection } from "@/components/features/ReviewsSection";
import { CtaCallback } from "@/components/features/CtaCallback";
import { ContactsBlock } from "@/components/features/ContactsBlock";

export const metadata: Metadata = {
  title: "Стоматология в Москве, ЮЗАО: базальная имплантация — Ibragimov Clinic",
  description: "Ibragimov Clinic: имплантация зубов за один прием, лечение под микроскопом, ортодонтия. Москва, ул. Гарибальди, 11. Запишитесь на консультацию.",
};

export default function Home() {
  return (
    <>
      <PromoHero />
      <IntroBlock />
      <ServicesGrid />
      <AboutGallery />
      <Advantages />
      <DoctorsSection />
      <EquipmentSlider />
      <ReviewsSection />
      <CtaCallback />
      <ContactsBlock />
    </>
  );
}
