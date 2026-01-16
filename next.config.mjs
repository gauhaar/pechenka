import createNextIntlPlugin from 'next-intl/plugin';
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Static export for pre-rendered pages.
// Language detection happens client-side via LanguageContext.
// Redirects must be handled by the web server (nginx/Cloudflare) - see public/_redirects
const nextConfig = {
  output: 'export', // Enable static export
  images: {
    unoptimized: true, // Required for static export
  },
  trailingSlash: true, // Preserve trailing slashes for existing URLs
  turbopack: {
    root: __dirname, // Silence root inference warning; this is the project root
  },
  // Note: Redirects don't work with static export.
  // They've been moved to public/_redirects for Cloudflare/Netlify
  // or must be configured in nginx/web server.
};

const withNextIntl = createNextIntlPlugin('./src/i18n/request.js');

export default withNextIntl(nextConfig);
