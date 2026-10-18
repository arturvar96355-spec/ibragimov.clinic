import { Marquee } from "@/components/ui/Marquee";

const words = ["Базальная имплантация", "Лечение под микроскопом", "3D-сканирование", "CAD/CAM коронки", "Ортодонтия", "Пародонтология", "Прозрачный прайс"];

export function Ticker() {
  return (
    <div className="border-y border-gold/25 bg-forest py-5 text-paper">
      <Marquee>
        {words.map((w) => (
          <span key={w} className="flex items-center gap-10">
            <span className="display text-3xl italic text-paper/90 sm:text-4xl">{w}</span>
            <span className="size-2 rotate-45 bg-gold" />
          </span>
        ))}
      </Marquee>
    </div>
  );
}
