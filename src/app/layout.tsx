import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { BookingProvider } from "@/components/features/BookingModal";
import { Header } from "@/components/layouts/Header";
import { Footer } from "@/components/layouts/Footer";
import { MobileDock } from "@/components/layouts/MobileDock";
import { ScrollProgress } from "@/components/layouts/ScrollProgress";
import { MotionProvider } from "@/components/layouts/MotionProvider";

const cormorant = localFont({
  src: [
    { path: "./fonts/cormorant-cyrillic-normal.woff2", style: "normal", weight: "300 700" },
    { path: "./fonts/cormorant-latin-normal.woff2", style: "normal", weight: "300 700" },
    { path: "./fonts/cormorant-cyrillic-italic.woff2", style: "italic", weight: "300 700" },
    { path: "./fonts/cormorant-latin-italic.woff2", style: "italic", weight: "300 700" },
  ],
  variable: "--font-cormorant",
  display: "swap",
});

const montserrat = localFont({
  src: [
    { path: "./fonts/montserrat-cyrillic.woff2", style: "normal", weight: "100 900" },
    { path: "./fonts/montserrat-latin.woff2", style: "normal", weight: "100 900" },
  ],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ibic.clinic"),
  title: { default: "Стоматология в Москве, ЮЗАО — Ibragimov Clinic", template: "%s" },
  description: "Стоматологическая клиника Ibragimov Clinic: базальная имплантация, лечение под микроскопом, ортодонтия. Москва, ул. Гарибальди, 11.",
  robots: { index: false, follow: false }, // демо-версия
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${montserrat.variable} ${cormorant.variable}`}>
      <body>
        <MotionProvider>
        <BookingProvider>
          <ScrollProgress />
          <Header />
          <main>{children}</main>
          <Footer />
          <MobileDock />
        </BookingProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
