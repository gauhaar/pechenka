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
    verification: 'wt77gxo7ikivwz5k8hldk',
  },
};

// For static export, we use the default locale at build time.
// The client-side LanguageContext will handle dynamic language detection
// from cookies, localStorage, and browser settings.
export default function RootLayout({ children }) {
  const locale = defaultLocale;
  const messages = LOCALES[locale] ?? {};

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
