import {getRequestConfig} from 'next-intl/server';

import {LOCALES} from '@/locales';
import {defaultLocale, supportedLocales} from './locales.mjs';

const normalizeLocale = (value) =>
  value?.split(/[,;]+/)[0]?.split('-')[0]?.toLowerCase();

const detectRequestLocale = async (requestLocale) => {
  // next-intl passes a locale here if you use its middleware/routing.
  if (requestLocale) {
    const resolved = await Promise.resolve(requestLocale);
    const normalized = normalizeLocale(resolved);
    if (normalized && supportedLocales.includes(normalized)) {
      return normalized;
    }
  }

  // Fallback: keep the app working even without next-intl routing.
  return defaultLocale;
};

export default getRequestConfig(async ({requestLocale} = {}) => {
  const locale = await detectRequestLocale(requestLocale);
  const messages = LOCALES[locale] ?? LOCALES[defaultLocale] ?? {};

  return {
    locale,
    messages
  };
});
