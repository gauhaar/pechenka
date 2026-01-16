// Middleware is disabled for static export
// Language detection is handled client-side by LanguageContext
// Redirects are handled by nginx

export const config = {
  matcher: [], // Empty matcher = middleware never runs
};
