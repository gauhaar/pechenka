import { cookies, headers } from "next/headers";
import { NextIntlClientProvider } from "next-intl";
import { Geist, Geist_Mono } from "next/font/google";
import { LOCALES } from "@/locales";
import { defaultLocale, supportedLocales } from "@/i18n/locales.mjs";
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
  title: "AI-SOC 1",
  description: "AI-SOC and SLNC-env: AI security and sealed development cloud that keeps code, prompts, and builds inside your network.",
  icons: {
    icon: '/logo.png',
  },
  other: {
    verification: 'wt77gxo7ikivwz5k8hldk',
  },
};

const normalizeLocale = (value) => value?.split(/[,;]+/)[0]?.split("-")[0]?.toLowerCase();

const detectRequestLocale = async () => {
  const cookieStore = await cookies();
  const cookieLocale = normalizeLocale(cookieStore.get("NEXT_LOCALE")?.value);
  if (cookieLocale && supportedLocales.includes(cookieLocale)) {
    return cookieLocale;
  }

  const headerStore = await headers();
  const acceptLanguage = normalizeLocale(headerStore.get("accept-language"));
  if (acceptLanguage && supportedLocales.includes(acceptLanguage)) {
    return acceptLanguage;
  }

  return defaultLocale;
};


export default async function RootLayout({ children }) {
  const locale = await detectRequestLocale();
  const messages = LOCALES[locale] ?? LOCALES[defaultLocale] ?? {};

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