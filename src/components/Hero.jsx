"use client";
import React from 'react';
import GlowButton from './GlowButton.jsx';
import { useLanguage } from '@/contexts/LanguageContext';

const Hero = ({ onOpenModal }) => {
  const { t } = useLanguage();
  const fullText = t(
    "hero.headline",
    "AI-SOC 1: Cybersecurity is neither expensive nor complicated anymore"
  );

  const featureItems = [
    {
      key: "web-attack-protection",
      label: t("hero.bullets.web", "Real time web attack protection"),
      description: t(
        "hero.features.webSummary",
        "Stop volumetric, zero-day and business logic attacks at the edge before they reach production."
      ),
      halo: "radial-gradient(circle at 10% 0%, rgba(20, 241, 149, 0.55), transparent 60%)",
    },
    {
      key: "email-attack-protection",
      label: t("hero.bullets.email", "Email attacks protection"),
      description: t(
        "hero.features.emailSummary",
        "Trace email flows, detonate payloads in isolated sandboxes and lock compromised inboxes automatically."
      ),
      halo: "radial-gradient(circle at 90% 0%, rgba(111, 0, 255, 0.55), transparent 60%)",
    },
  ];

  return (
    <section className="relative overflow-hidden px-4 py-4 sm:px-6 lg:px-8 lg:py-8">
      <div className="container mx-auto max-w-5xl text-white space-y-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-2 text-xs font-semibold tracking-[0.45em] text-white/70 uppercase">
          AI-SOC
          <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
            {fullText}
          </h1>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-10">
            <p className="flex-1 text-xl sm:text-2xl font-semibold text-gray-200 leading-relaxed">
              {t(
                "hero.subheading",
                "The all in one, AI-based cybersecurity system that combines:"
              )}
            </p>
            <div className="flex flex-col gap-3">
              <GlowButton
                variant="glow"
                onClick={onOpenModal}
                className="w-full sm:w-auto"
                innerClassName="w-full sm:w-auto justify-center"
              >
                {t("hero.buttons.connect", "Connect in 4 minutes")}
              </GlowButton>
              <p className="text-sm text-white/70 max-w-xs">
                {t(
                  "hero.ctaNote",
                  "Connect directly with the engineers securing banks, satellites and nation-state targets."
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {featureItems.map((item) => (
            <div
              key={item.key}
              className="relative overflow-hidden rounded-[32px] border border-white/12 bg-black/30 px-6 py-7 backdrop-blur-2xl shadow-[0_25px_65px_rgba(1,7,18,0.65)]"
            >
              <div
                className="absolute inset-0 opacity-80"
                style={{ background: item.halo }}
              ></div>
              <div className="relative flex flex-col gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 bg-black/40 text-white">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </span>
                    <p className="text-xl font-semibold text-white">{item.label}</p>
                  </div>
                  <p className="text-base text-white/75 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
