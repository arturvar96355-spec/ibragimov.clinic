# UI/UX Brief: Ibragimov Clinic (демо)

## 1. Концепция
Медицинский минимализм: белый и светло-серый фон, один фирменный тёмно-зелёный, тёмные кнопки, крупные скругления (21px), мягкие сиреневатые тени, тонкие золотые «волны» как декор. Эволюция текущего ibic.clinic: тот же узнаваемый язык, но настоящий Montserrat, чище сетка, плавные reveal-анимации, мега-меню с поиском, sticky-навигация услуги.

Аудитория: пациенты 25–65, мобильный трафик преобладает (mobile-first), контекст — выбор клиники для имплантации, важны доверие и цены.
Референс: текущий ibic.clinic (структура и контент), `ibic-site-spec.md`.

## 2. Токены (`src/app/globals.css`, `@theme`)
brand `#1D685D`, brand-dark `#134C43`, brand-soft `#E6F0EE`, ink `#313131`, soft `#F5F5F5`, cta `#EBEBEE`, line `#DCDCDC`, gold `#C9A45C`, sky `#F3F7FB`.
Радиусы: card 21px, ctl 10.5px, big 42px. Контейнер 1180px.

## 3. Типографика
Montserrat (self-host, variable, кириллица+латиница). H1 hero 30→48px/700, H2 секций 28→36px/700 brand, h3 карточек 20–24px, текст 14–16px.

## 4. Лейаут
Fixed-шапка (белая плашка, radius 21px): лого · график · меню · телефон · CTA. Мега-меню «Услуги» с поиском. На <1024px — бургер и drawer. Секции чередуют белый и `#F5F5F5`.

## 5. Экраны
`/`, `/about/`, `/services/`, `/services/[...slug]` (шаблон из блоков), `/prices/`, `/doctors/`, `/doctors/[slug]/`, `/promo/`, `/contacts/`, `/privacy/`.

## 6. Компоненты
ui: Media, Reveal, Carousel (Embla), Accordion, Button. features: LeadForm, BookingModal, PromoHero, IntroBlock, ServicesGrid, AboutGallery, Advantages, DoctorsSection, EquipmentSlider, ReviewsSection, CtaCallback, ContactsBlock, MapStub, PricesExplorer, ServiceStickyNav. layouts: Header, Footer, Breadcrumbs, VisionToggle.

## 7. Breakpoints
<640: одна колонка, слайдеры по 1; 640–1024: две колонки; ≥1024: полный десктоп с мега-меню.

## 8. Анимации
Reveal 600ms ease-out (once), hover-подъём карточек 300ms, модалка fade/backdrop blur. `prefers-reduced-motion` отключает движение.

## 9. Состояния
Формы: inline-валидация, loading, success (демо без отправки), чекбокс согласия не предзаполнен. Поиск: состояние «ничего не найдено».
