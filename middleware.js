// Middleware is not used in static export mode.
// Language detection happens client-side via LanguageContext.
// This file is kept for reference but won't run in production static builds.

import { NextResponse } from 'next/server';

export function middleware(request) {
  // In static export, middleware doesn't run.
  // For development with `next dev`, just pass through.
  return NextResponse.next();
}

export const config = {
  // Match nothing in static export - this is just a placeholder
  matcher: [],
};
