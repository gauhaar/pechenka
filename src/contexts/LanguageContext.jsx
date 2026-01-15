"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AVAILABLE_LANGUAGES } from "@/constants/languages";
import { LOCALES } from "@/locales";

const STORAGE_KEY = "silenceai-language";
const LOCALE_COOKIE = "NEXT_LOCALE";
const FALLBACK_LANGUAGE = "en";

const dictionaries = LOCALES;

const LanguageContext = createContext({
  language: FALLBACK_LANGUAGE,
  setLanguage: () => {},
  t: (key, fallback, values) => fallback ?? key,
});

const sanitizeLocale = (value, allowed) => {
  if (!value) return FALLBACK_LANGUAGE;
  const normalized = value.toLowerCase();
  return allowed.has(normalized) ? normalized : FALLBACK_LANGUAGE;
};

const getValueFromDictionary = (dictionary, key) => {
  return key.split(".").reduce((acc, segment) => {
    if (acc && typeof acc === "object" && segment in acc) {
      return acc[segment];
    }
    return undefined;
  }, dictionary);
};

export const LanguageProvider = ({ children, initialLanguage }) => {
  const router = useRouter();
  const availableCodes = useMemo(
    () => new Set(AVAILABLE_LANGUAGES.map((lang) => lang.code)),
    []
  );
  const initialFromProps = useMemo(
    () => sanitizeLocale(initialLanguage, availableCodes),
    [availableCodes, initialLanguage]
  );
  const [language, setLanguageState] = useState(initialFromProps);

  const readLocaleCookie = () => {
    if (typeof document === "undefined") return null;
    const raw = document.cookie
      .split("; ")
      .find((entry) => entry.startsWith(`${LOCALE_COOKIE}=`));
    return raw ? decodeURIComponent(raw.split("=")[1]) : null;
  };

  const writeLocaleCookie = (locale) => {
    if (typeof document === "undefined") return;
    document.cookie = `${LOCALE_COOKIE}=${encodeURIComponent(locale)}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const cookieLocale = readLocaleCookie();
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const browserLang = (navigator.language || FALLBACK_LANGUAGE)
      .split("-")[0]
      .toLowerCase();

    const resolved =
      (cookieLocale && sanitizeLocale(cookieLocale, availableCodes)) ||
      (stored && sanitizeLocale(stored, availableCodes)) ||
      initialFromProps ||
      (availableCodes.has(browserLang) ? browserLang : FALLBACK_LANGUAGE);

    if (resolved !== language) {
      setLanguageState(resolved);
    }

    window.localStorage.setItem(STORAGE_KEY, resolved);
    writeLocaleCookie(resolved);
  }, [availableCodes, initialFromProps, language]);

  const setLanguage = (newLanguage) => {
    const nextLanguage = sanitizeLocale(newLanguage, availableCodes);
    setLanguageState(nextLanguage);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, nextLanguage);
      writeLocaleCookie(nextLanguage);
      router.refresh();
    }
  };

  const value = useMemo(() => {
    const interpolate = (template, values) => {
      if (!values || typeof template !== "string") return template;

      // Support both `{name}` and `${name}` placeholders.
      // `${name}` is treated as a currency-style placeholder => `$` + value.
      return template.replace(/\$\{(\w+)\}|\{(\w+)\}/g, (match, dollarKey, plainKey) => {
        const key = dollarKey || plainKey;
        if (!(key in values)) return match;
        const replacement = values[key];
        const stringValue = replacement === null || replacement === undefined ? "" : String(replacement);
        return dollarKey ? `$${stringValue}` : stringValue;
      });
    };

    const translate = (key, fallback, values) => {
      const localized = getValueFromDictionary(dictionaries[language] || {}, key);
      if (localized !== undefined) {
        return interpolate(localized, values);
      }

      const defaultEnglish = getValueFromDictionary(dictionaries.en || {}, key);
      if (defaultEnglish !== undefined) {
        return interpolate(defaultEnglish, values);
      }

      return interpolate(fallback ?? key, values);
    };

    return {
      language,
      setLanguage,
      t: translate,
    };
  }, [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

export { AVAILABLE_LANGUAGES };
