# Ibragimov Clinic — демо-сайт (ibic.clinic)

## Обзор
Демо-версия нового сайта стоматологической клиники (Москва, ЮЗАО, базальная имплантация). Цель — впечатлить заказчика;
после этого придёт ТЗ. Контент — mock/из `ibic-site-spec.md`, без БД и бэкенда, формы работают в демо-режиме.

## Стек
- Next.js (App Router, SSG, trailingSlash), TypeScript strict, Tailwind CSS v4 (`@theme` в `globals.css`)
- Lucide, motion (анимации, scroll-linked), Montserrat + Cormorant self-host (`src/app/fonts`)
- Дизайн v2 «Цифровая клиника»: тёмные/светлые «главы», крупная типографика, авторские SVG (`components/art`); v1 сохранён тегом `v1-evolution`
- Деплой: Vercel (позже)

## Архитектура
```
src/
├── app/            # страницы по карте сайта (URL как на ibic.clinic)
├── components/
│   ├── ui/         # Button, Accordion, Media, Reveal, SplitText, CountUp, Marquee, Magnetic
│   ├── art/        # JawHero, BoneScene, Odontogram (SVG-иллюстрации)
│   ├── home/       # секции главной (Hero, BoneStory, Navigator, PlanBuilder, DigitalPath...)
│   ├── inner/      # PageHero, Reasons, ServicesIndex, ServiceRail, PricesExplorer, Timeline
│   ├── features/   # LeadForm, BookingModal, MapStub
│   └── layouts/    # Header, FullMenu, MobileDock, Footer, Breadcrumbs
├── content/        # *.json — единственный источник контента и цен
└── lib/            # site.ts, content.ts, types.ts
```

## Правила
- Server Components по умолчанию; `'use client'` только для интерактива
- Без `any`; импорты через `@/`; компонент ≤ 200 строк
- Контент и цены только из `src/content/*.json`; цены в одном месте (`prices.json`)
- Записи с `placeholder: true` — временные, заменяются данными из `scraped/`
- Изображения только через `components/ui/Media` (подмена на реальные файлы = смена пути в JSON)
- Медсайт РФ: плашка про противопоказания, согласие на ПДн — отдельный НЕпредзаполненный чекбокс
- `prefers-reduced-motion` уважать; контраст ≥ 4.5:1; семантический HTML
- Анимации: transform/opacity, scroll-linked через motion; обязателен статичный вариант для `prefers-reduced-motion`
- Медутверждения только из материалов клиента; иллюстрации подписаны как схематичные
- Мусор старого шаблона (видео про интимное омоложение и т.п.) не переносить

## Команды
- `npm run dev` / `npm run build` / `npm run lint` / `npm run typecheck`

## Субагенты (`.claude/agents`)
frontend-developer (UI), content-editor (тексты/цены/SEO), qa-reviewer (проверка, read-only).
Skill: `add-service-page`.

## Документы
`UI_UX_BRIEF.md` — дизайн-система; `OPEN_QUESTIONS.md` — вопросы клиенту.
Контекст проекта: `ibic-site-spec.md` (источник), курс ai-architect.
