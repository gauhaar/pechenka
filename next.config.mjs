import createNextIntlPlugin from 'next-intl/plugin';
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
  async redirects() {
    return [
      {
        source: "/developer-services",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/developer-services/:path*",
        destination: "/services/:path*",
        permanent: true,
      },
      {
        source: "/slnc-code",
        destination: "/slnc-env",
        permanent: true,
      },
      {
        source: "/slnc-code/:path*",
        destination: "/slnc-env/:path*",
        permanent: true,
      },
      {
        source: "/secure-development",
        destination: "/slnc-env",
        permanent: true,
      },
      {
        source: "/secure-development/:path*",
        destination: "/slnc-env/:path*",
        permanent: true,
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin('./src/i18n/request.js');

export default withNextIntl(nextConfig);
