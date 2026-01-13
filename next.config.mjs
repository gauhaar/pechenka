import createNextIntlPlugin from 'next-intl/plugin';
import { supportedLocales, defaultLocale } from "./src/i18n/locales.mjs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Server build (not static export) so `next start` under PM2 handles routing and avoids EISDIR from nginx.
const nextConfig = {
  images: {
    unoptimized: true, // Keep lightweight image handling
  },
  trailingSlash: true, // Preserve trailing slashes for existing URLs
  turbopack: {
    root: __dirname, // Silence root inference warning; this is the project root
  },
};

const withNextIntl = createNextIntlPlugin('./src/i18n/request.js');

export default withNextIntl(nextConfig);
