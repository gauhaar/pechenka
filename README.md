## Silence AI — Internationalization (i18n) Overview

### Что сделано (Tasks 2–6)
- Task 2 (i18n): middleware без префиксов, серверный locale пробрасывается в клиент; LanguageProvider стартует с initial locale без мерцаний. См. [middleware.js](middleware.js), [src/app/layout.jsx](src/app/layout.jsx), [src/contexts/LanguageContext.jsx](src/contexts/LanguageContext.jsx).
- Task 3 (homepage + services): главная с CTA на `/services` и блоком ресурсов; новый маршрут `/services`, редирект с `/developer-services`; навигация и affiliate ведут на `/services`. См. [src/components/HomeLanding.jsx](src/components/HomeLanding.jsx), [src/app/services/page.jsx](src/app/services/page.jsx), [next.config.mjs](next.config.mjs#L8-L33), [src/components/Header.jsx](src/components/Header.jsx), [src/components/affiliate/AffiliateHeader.jsx](src/components/affiliate/AffiliateHeader.jsx), [public/sitemap.xml](public/sitemap.xml#L13-L15).
- Task 4 (SLNC-Code → SLNC-env): legacy маршрут удалён, редиректы сохранены. См. [next.config.mjs](next.config.mjs#L17-L38).
- Task 5 (Social Dock): включён глобально, скрыт только на policies. См. [src/components/LayoutWrapper.jsx](src/components/LayoutWrapper.jsx#L1-L41).
- Task 6 (loader): убран таймер, спиннер показывается сразу. См. [src/app/loading.jsx](src/app/loading.jsx#L1-L12).

### Брендинг SLNC-env (свежие изменения)
- Новый канонический роут: `/slnc-env` (страница Secure Development).
- Легаси роут `/slnc-code` удалён; 301-редиректы на `/slnc-env` остаются. `/secure-development` также ведёт на `/slnc-env`.
- Переименованные ассеты анализатора: `public/slnc-env-analyzer/*` и ссылки в [src/components/SecureDevelopment.jsx](src/components/SecureDevelopment.jsx).
- Метаданные и строки бренда обновлены на **SLNC-env** во всех локалях.

#### Task #4 — Rebrand SLNC-Code → SLNC-env
- Глобальный поиск/замена выполнен (все варианты SLNC-Code заменены на SLNC-env, включая локали; маршрут `/slnc-code` удалён).
- 301-редиректы для `/slnc-code` и `/secure-development` настроены в [next.config.mjs](next.config.mjs#L17-L38) для совместимости со старыми ссылками.
- Сборка после очистки `.next` проходит: `npm run build` (Next 15 / Turbopack).
- Sitemap добавлен: [public/sitemap.xml](public/sitemap.xml).

Полная многоязычная поддержка реализована на **Next.js 15 + next-intl**.

### Что готово
- 43 локали: en (по умолчанию) + am, ar, az, bn, bg, my, zh, hr, cs, da, nl, et, fr, ka, de, el, hu, is, id, it, ja, km, ko, lv, lt, ms, ne, no, fa, pl, pt, ro, ru, sr, sk, sl, es, th, tr, uk, uz, vi.
- Все тексты вынесены в JSON: [src/locales/](src/locales/).
- i18n-конфиг: [next.config.mjs](next.config.mjs), [src/i18n/locales.mjs](src/i18n/locales.mjs), [src/i18n/request.js](src/i18n/request.js), словарь [src/locales/index.js](src/locales/index.js).
- Language switcher с поиском и флагами: [src/components/LanguageSelector.jsx](src/components/LanguageSelector.jsx).
- Персистентность выбора языка: cookie `NEXT_LOCALE` + `localStorage` (`silenceai-language`) в [src/contexts/LanguageContext.jsx](src/contexts/LanguageContext.jsx).

### Быстрый старт
```bash
npm install
npm run dev   # локально
npm run build # прод-сборка
npm start     # прод-режим
```

### Чек-лист после деплоя (брендинг)
- Открыть `/slnc-env` и убедиться, что изображения грузятся из `slnc-env-analyzer`.
- Проверить, что 301-редиректы `/slnc-code` и `/secure-development` ведут на `/slnc-env`.
- Пробежать пару локалей (например en, fr, ru) и убедиться, что в заголовках и бейджах отображается **SLNC-env**.

### Добавить/обновить перевод
1) Добавьте ключ в [src/locales/en.json](src/locales/en.json).
2) Скопируйте ключ в нужный `<code>.json` и переведите.
3) При необходимости добавьте код языка в [src/i18n/locales.mjs](src/i18n/locales.mjs) и словарь в [src/locales/index.js](src/locales/index.js).
4) Перезапустите dev/server.

### Деплой (PM2)
```bash
npm run build
pm2 restart all
```

### Проверка
- Переключение языка работает и сохраняется после обновления страницы.
- Все компоненты используют `t(...)`, захардкоженных строк нет.
- Переводы подтягиваются из `src/locales` и соответствуют `supportedLocales`.
