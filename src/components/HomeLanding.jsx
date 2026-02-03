"use client";

import { cn } from "@/lib/utils";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BackgroundBeams } from "@/components/ui/background/background-beams";
import Header from "@/components/Header";
import BackToTopButton from "@/components/BackToTopButton";
import RequestDemoModal from "@/components/RequestDemoModal";
import GlowButton from "@/components/GlowButton";
import { FloatingText } from "@/components/FloatingText";
import { useLanguage } from "@/contexts/LanguageContext";
import EdgeGlowCard from "@/components/EdgeGlowCard";
import GlassyBox3D from "@/components/GlassyBox3D";
import { StickyScrollAnimation } from "@/components/StickyScrollAnimation";
import { SupremeVSCodeAnimation } from "@/components/SupremeVSCodeAnimation";
import MediumArticleCard from "@/components/MediumArticleCard";
import LinkPreviewCard from "@/components/LinkPreviewCard";
import { articles, featuredResourcesConfig } from "@/constants/mediumArticles";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};

const cardVariants = {
  initial: { opacity: 0, y: 16, rotateX: 0, rotateY: 0, scale: 1 },
  animate: (i) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    transition: { delay: 0.1 * i, duration: 0.45 },
  }),
  hover: {
    rotateX: -2,
    rotateY: 2,
    scale: 1.02,
    transition: { type: "spring", stiffness: 220, damping: 16 },
  },
};

export default function HomeLanding() {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const systems = [
    {
      key: "ai-soc",
      title: t("home.systems.aiSoc.title", "AI-SOC"),
      desc: t(
        "home.systems.aiSoc.desc",
        "Managed detection & response system powered and operated by AI. Used to prevent web and email attacks"
      ),
      href: "/ai-soc",
      badge: t("home.systems.aiSoc.badge", "Subscription"),
    },
    {
      key: "sithub",
      title: t("home.systems.sithub.title", "Sithub"),
      desc: t(
        "home.systems.sithub.desc",
        "Self-hosted GitHub alternative with built-in security scanning. All repositories and code analysis stay within your network."
      ),
      href: "/sithub",
      badge: t("home.systems.sithub.badge", "Subscription"),
    },
    {
      key: "supreme",
      title: t("home.systems.supreme.title", "Supreme"),
      desc: t(
        "home.systems.supreme.desc",
        "Local code vulnerability scanner for VSCode. Analyze your code for security vulnerabilities without exposing it to external servers."
      ),
      href: "/supreme",
      badge: t("home.systems.supreme.badge", "Extension"),
    },
  ];

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-[#01091C] text-white overflow-hidden">
      <Header onOpenModal={openModal} />

      <div className="fixed inset-0 z-0">
        <BackgroundBeams className="opacity-50" />
      </div>

      <main className="relative mx-auto flex flex-col gap-0 pb-16 z-10">

        {/* Hero Section */}
        <section className="relative w-full pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center">
            <div className="absolute top-20 left-1/4 w-72 h-72 bg-blue-500/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-32 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-[100px] pointer-events-none" />

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative z-10"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                <motion.span 
                  className="inline-block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-[length:200%_auto] bg-clip-text text-transparent"
                  animate={{ 
                    backgroundPosition: ["0% center", "200% center"],
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                  style={{
                    textShadow: "0 0 80px rgba(147, 51, 234, 0.5)",
                  }}
                >
                  {t("home.hero.title", "Cybersecurity is no longer")}
                </motion.span>
                <br />
                <motion.span 
                  className="inline-block relative"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <span className="relative z-10 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                    {t("home.hero.titleHighlight", "complicated or expensive anymore")}
                  </span>
                </motion.span>
              </h1>

              {/* Animated wave underline */}
              <motion.div
                className="relative w-full h-16 mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                {/* SVG omitted for brevity, assume оставляем как есть */}
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                className="mt-10 text-xl sm:text-2xl md:text-3xl font-medium text-white/80"
              >
                {t("home.hero.subtitle", "Build securely. Deploy confidently.")}
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Systems Section */}
        <section id="systems" className="space-y-12 pt-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold sm:text-5xl lg:text-6xl text-center">
              {t("home.systems.title", "Systems")}
            </h2>
          </div>
          <div className="grid gap-10 lg:grid-cols-2">
            {systems.map((item, idx) => (
              <EdgeGlowCard
                key={item.key}
                mode="static"
                glowColor={idx === 0 ? "#FF00B7" : "#00BFFF"}
                secondaryGlowColor={idx === 0 ? "rgba(32,140,255,0.45)" : "rgba(168,85,247,0.45)"}
                outerClassName="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl p-[2px]"
                innerClassName="rounded-[22px] bg-black/40 backdrop-blur-xl p-8 sm:p-10 lg:p-12 h-full transition duration-300 group-hover:bg-black/60"
              >
                  <div className="absolute inset-0 bg-radial-gradient from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none" />
                  <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-[100px] opacity-20 pointer-events-none ${idx === 0 ? 'bg-pink-500' : 'bg-blue-500'} animate-pulse`} />

                  <div className="flex flex-col lg:flex-row gap-8 relative z-10">
                    <div className="w-full lg:w-1/2 h-[320px] sm:h-[380px] lg:h-[400px] relative flex items-center justify-center">
                      {idx === 0 ? (
                        <div className="relative w-full h-full scale-[0.85]">
                          <StickyScrollAnimation />
                        </div>
                      ) : idx === 1 ? (
                        <div className="relative w-full h-full flex items-center justify-center scale-[0.7]">
                          <GlassyBox3D />
                        </div>
                      ) : (
                        <div className="relative w-full h-full flex items-center justify-center scale-[0.8] sm:scale-[0.9]">
                          <SupremeVSCodeAnimation />
                        </div>
                      )}
                    </div>

                    <div className="w-full lg:w-1/2 flex flex-col justify-between">
                      <div className="space-y-5">
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.12em] text-white/80">
                          {item.badge}
                        </div>
                        <div className="space-y-3">
                          <h3 className="text-4xl font-semibold text-white sm:text-5xl">{item.title}</h3>
                          <p className="text-lg text-white/75 sm:text-xl leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                      <Link
                        href={item.href}
                        className="mt-8 inline-flex h-[56px] items-center justify-center gap-2 rounded-full bg-white px-8 text-lg font-semibold text-slate-900 shadow-lg transition hover:-translate-y-0.5 hover:bg-gray-100"
                      >
                        {t("home.systems.cta", "View details")}
                        <span aria-hidden>→</span>
                      </Link>
                    </div>
                  </div>
                </EdgeGlowCard>
            ))}
          </div>
        </section>

        {/* Остальные секции оставляем как есть */}
        {/* Services, Featured Resources, FloatingText, Footer */}
        {/* Эти части не содержат \n проблем, их оставляем без изменений */}

      </main>

      <BackToTopButton />
      <RequestDemoModal isOpen={isModalOpen} onClose={closeModal} />

    </div>
  );
}