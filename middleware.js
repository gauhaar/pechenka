import createIntlMiddleware from 'next-intl/middleware';
import {defaultLocale, supportedLocales} from './src/i18n/locales.mjs';

const intlMiddleware = createIntlMiddleware({
  locales: supportedLocales,
  defaultLocale,
  localePrefix: 'never',
});

export function middleware(request) {
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
