import {getRequestConfig} from 'next-intl/server';

import {LOCALES} from '@/locales';
import {defaultLocale} from './locales.mjs';

// For static export, always use the default locale at build time.
// Client-side language switching is handled by LanguageContext.
export default getRequestConfig(async () => {
  return {
    locale: defaultLocale,
    messages: LOCALES[defaultLocale] ?? {}
  };
});
