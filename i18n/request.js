import {cookies, headers} from 'next/headers';
import {getRequestConfig} from 'next-intl/server';

import {LOCALES} from '../src/locales/index.js';
import {defaultLocale, supportedLocales} from '../src/i18n/locales.mjs';

const normalizeLocale = (value) => value?.split(/[,;]+/)[0]?.split('-')[0]?.toLowerCase();

const detectRequestLocale = async (requestLocale) => {
  // 1) Locale from next-intl (if middleware provides it)
  if (requestLocale) {
    const resolved = await Promise.resolve(requestLocale);
    const normalized = normalizeLocale(resolved);
    if (normalized && supportedLocales.includes(normalized)) {
      return normalized;
    }
  }

  // 2) Locale from our cookie
  const cookieLocale = normalizeLocale(cookies().get('NEXT_LOCALE')?.value);
  if (cookieLocale && supportedLocales.includes(cookieLocale)) {
    return cookieLocale;
  }

  // 3) Locale from Accept-Language
  const acceptLanguage = normalizeLocale(headers().get('accept-language'));
  if (acceptLanguage && supportedLocales.includes(acceptLanguage)) {
    return acceptLanguage;
  }

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
