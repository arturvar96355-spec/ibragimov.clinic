import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { BookingProvider } from "@/components/features/BookingModal";
import { Header } from "@/components/layouts/Header";
import { Footer } from "@/components/layouts/Footer";

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
    <html lang="ru" className={montserrat.variable}>
      <body>
        <BookingProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </BookingProvider>
      </body>
    </html>
  );
}
