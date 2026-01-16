import { NextResponse } from 'next/server';
import { defaultLocale, supportedLocales } from './src/i18n/locales.mjs';

const normalizeLocale = (value) =>
  value?.split(/[,;]+/)[0]?.split('-')[0]?.toLowerCase();

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Skip API routes and static files
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.includes('.') ||
    pathname.startsWith('/favicon')
  ) {
    return NextResponse.next();
  }

  // Detect locale from cookie or accept-language header
  const cookieLocale = normalizeLocale(request.cookies.get('NEXT_LOCALE')?.value);
  const acceptLanguage = normalizeLocale(request.headers.get('accept-language'));
  
  let locale = defaultLocale;
  if (cookieLocale && supportedLocales.includes(cookieLocale)) {
    locale = cookieLocale;
  } else if (acceptLanguage && supportedLocales.includes(acceptLanguage)) {
    locale = acceptLanguage;
  }

  // Set the locale in response cookie if not already set
  const response = NextResponse.next();
  
  if (!request.cookies.get('NEXT_LOCALE')) {
    response.cookies.set('NEXT_LOCALE', locale, {
      path: '/',
      sameSite: 'lax',
    });
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)',
  ],
};
