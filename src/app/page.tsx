import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Ticker } from "@/components/home/Ticker";
import { BoneStory } from "@/components/home/BoneStory";
import { Navigator } from "@/components/home/Navigator";
import { PlanBuilder } from "@/components/home/PlanBuilder";
import { DigitalPath } from "@/components/home/DigitalPath";
import { DoctorChapter } from "@/components/home/DoctorChapter";
import { EquipmentBento } from "@/components/home/EquipmentBento";
import { PriceTiles } from "@/components/home/PriceTiles";
import { Proof } from "@/components/home/Proof";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata: Metadata = {
  title: "Стоматология в Москве, ЮЗАО: базальная имплантация — Ibragimov Clinic",
  description: "Ibragimov Clinic: имплантация зубов за один прием, лечение под микроскопом, ортодонтия. Москва, ул. Гарибальди, 11. Запишитесь на консультацию.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <Ticker />
      <BoneStory />
      <Navigator />
      <PlanBuilder />
      <DigitalPath />
      <DoctorChapter />
      <EquipmentBento />
      <PriceTiles />
      <Proof />
      <FinalCta />
    </>
  );
}
