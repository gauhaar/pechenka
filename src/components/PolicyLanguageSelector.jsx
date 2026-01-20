"use client";

import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import * as Flags from "country-flag-icons/react/3x2";

const POLICY_LANGUAGES = [
  { code: "en", label: "EN", name: "English", flag: "US" },
  { code: "ru", label: "RU", name: "Русский", flag: "RU" },
];

const PolicyLanguageSelector = ({ currentLang, onLanguageChange, align = "right" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const activeLanguage = POLICY_LANGUAGES.find((lang) => lang.code === currentLang) || POLICY_LANGUAGES[0];
  const ActiveFlag = Flags[activeLanguage.flag] ?? null;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  const handleToggle = () => setIsOpen((prev) => !prev);

  const handleSelect = (code) => {
    onLanguageChange(code);
    setIsOpen(false);
  };

  return (
    <div className="relative z-20" ref={containerRef}>
      <button
        type="button"
        onClick={handleToggle}
        className="flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-1.5 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Select language"
      >
        <span className="h-4 w-6 overflow-hidden rounded-[6px] border border-white/20">
          {ActiveFlag ? (
            <ActiveFlag className="h-full w-full" />
          ) : (
            <span className="flex h-full w-full items-center justify-center bg-white/10 text-[10px] font-semibold uppercase">
              {activeLanguage.label}
            </span>
          )}
        </span>
        <span>{activeLanguage.label}</span>
        <svg
          className={clsx("h-3 w-3 text-white/70 transition-transform", isOpen && "rotate-180")}
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M10.59 0.589966L6 5.16997L1.41 0.589966L0 1.99997L6 7.99997L12 1.99997L10.59 0.589966Z"
            fill="currentColor"
          />
        </svg>
      </button>
      {isOpen && (
        <div
          className={clsx(
            "absolute z-30 mt-2 min-w-[12rem] rounded-xl border border-white/10 bg-black/85 p-2 shadow-[0_18px_45px_rgba(0,0,0,0.45)] backdrop-blur-xl",
            align === "left" ? "left-0" : "right-0"
          )}
          role="listbox"
          aria-label="Choose language"
        >
          <div className="space-y-1">
            {POLICY_LANGUAGES.map((lang) => {
              const Flag = Flags[lang.flag] ?? null;
              const isActive = lang.code === activeLanguage.code;

              return (
                <button
                  key={lang.code}
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  onClick={() => handleSelect(lang.code)}
                  className={clsx(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-white transition",
                    isActive ? "bg-white/15 font-semibold" : "hover:bg-white/10"
                  )}
                >
                  <span className="h-4 w-6 overflow-hidden rounded-[6px] border border-white/20">
                    {Flag ? (
                      <Flag className="h-full w-full" />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center bg-white/10 text-[10px] font-semibold uppercase">
                        {lang.label}
                      </span>
                    )}
                  </span>
                  <span className="flex-1 text-left">{lang.name}</span>
                  {isActive && (
                    <svg
                      className="h-4 w-4 text-[#FF00B7]"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3.25-3.25a1 1 0 111.414-1.414l2.543 2.543 6.543-6.543a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default PolicyLanguageSelector;
