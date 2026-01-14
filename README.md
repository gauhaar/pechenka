## Silence AI — Internationalization (i18n) Overview

### Брендинг SLNC-env (свежие изменения)
- Новый канонический роут: `/slnc-env` (страница Secure Development).
- Легаси роут `/slnc-code` теперь редиректит на `/slnc-env`; `/secure-development` также ведет на `/slnc-env`.
- Переименованные ассеты анализатора: `public/slnc-env-analyzer/*` и ссылки в [src/components/SecureDevelopment.jsx](src/components/SecureDevelopment.jsx).
- Метаданные и строки бренда обновлены на **SLNC-env** во всех локалях.

#### Task #4 — Rebrand SLNC-Code → SLNC-env
- Глобальный поиск/замена выполнен (все варианты SLNC-Code заменены на SLNC-env, включая локали).
- 301-редиректы для `/slnc-code` и `/secure-development` настроены в [next.config.mjs](next.config.mjs#L17-L38).
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
- Проверить, что `/slnc-code` и `/secure-development` редиректят на `/slnc-env`.
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
