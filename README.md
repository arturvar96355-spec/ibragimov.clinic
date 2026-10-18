# Ibragimov Clinic — демо-сайт

Next.js (App Router, SSG) + Tailwind v4. Контент в `src/content/*.json`; пока много записей помечено `placeholder: true`.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
```

## Подстановка реальных данных
Запусти локально (нужен доступ к ibic.clinic): `npm i -D playwright sharp && npx playwright install chromium && node scripts/scrape-assets.mjs`.
Результат (`scraped/`: фото, тексты, скриншоты, `manifest.json`) пришли в чат — фото, отзывы, лицензии и образование врача будут подставлены в `src/content` и `public/images`.

Вопросы к клиенту: `OPEN_QUESTIONS.md`. Дизайн-система: `UI_UX_BRIEF.md`. Источник: `ibic-site-spec.md`.
