import { NextIntlClientProvider } from "next-intl";
import { Geist, Geist_Mono } from "next/font/google";
import { LOCALES } from "@/locales";
import { defaultLocale } from "@/i18n/locales.mjs";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Silence AI",
  description: "AI-SOC and SLNC-env: AI security and sealed development cloud that keeps code, prompts, and builds inside your network.",
  icons: {
    icon: '/logo.png',
  },
  other: {
    verification: 'bms90c794rpwp6mwhst',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

// For static export, we use the default locale at build time.
// The LanguageContext handles client-side language detection and switching.
const locale = defaultLocale;
const messages = LOCALES[locale] ?? {};

export default function RootLayout({ children }) {
  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
        style={{ backgroundColor: "#01091C" }}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <LayoutWrapper initialLanguage={locale}>{children}</LayoutWrapper>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
