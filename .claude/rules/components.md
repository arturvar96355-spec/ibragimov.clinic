---
description: Правила для React-компонентов
globs: ["src/components/**", "src/app/**/page.tsx", "src/app/**/layout.tsx"]
---
- Server Components по умолчанию, `'use client'` только при необходимости
- Один компонент = один файл, максимум 200 строк; props через interface
- Токены цвета/радиусов из `@theme`; изображения через `Media`
- Обязательно: hover/focus-состояния, адаптив mobile-first
