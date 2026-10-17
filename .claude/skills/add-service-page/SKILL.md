---
name: add-service-page
description: "Добавляет страницу услуги из блоков. Используй, когда нужно наполнить новую услугу в src/content/services.json."
---
1. Найди услугу в `src/content/services.json` (slug по карте сайта из `ibic-site-spec.md` §1)
2. Добавь массив `blocks`: hero, prices, rich-text, qualities, timeline, seo-text (все опциональны)
3. Цены только ссылкой на категорию из `prices.json` (`priceCategory`)
4. Проверь `npm run build`: страница появится через `generateStaticParams`
