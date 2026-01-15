"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import BackToTopButton from "@/components/BackToTopButton";
import RequestDemoModal from "@/components/RequestDemoModal";
import GlowButton from "@/components/GlowButton";
import { useLanguage } from "@/contexts/LanguageContext";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};

const cardVariants = {
  initial: { opacity: 0, y: 16 },
  animate: (i) => ({ opacity: 1, y: 0, transition: { delay: 0.1 * i, duration: 0.45 } }),
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
        "Managed detection & response with AI copilots for SOC teams."
      ),
      href: "/ai-soc",
      badge: t("home.systems.aiSoc.badge", "Subscription"),
    },
    {
      key: "slnc-env",
      title: t("home.systems.slncEnv.title", "SLNC-env"),
      desc: t(
        "home.systems.slncEnv.desc",
        "Sealed development cloud that keeps code, prompts, and builds on-prem."
      ),
      href: "/slnc-env",
      badge: t("home.systems.slncEnv.badge", "Subscription"),
    },
  ];

  const highlights = [
    { key: "coverage", label: t("home.hero.highlights.coverage", "24/7 AI-assisted SOC") },
    { key: "onPrem", label: t("home.hero.highlights.onPrem", "0-egress on-prem") },
    { key: "deploy", label: t("home.hero.highlights.deploy", "Secure deploy in 4 min") },
  ];

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-[#01091C] text-white">
      <Header onOpenModal={openModal} />

      <main className="relative mx-auto flex max-w-6xl flex-col gap-16 px-4 pb-12 pt-28 sm:px-6 lg:px-8 lg:pt-32">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.05),transparent_38%),radial-gradient(circle_at_82%_14%,rgba(88,116,255,0.08),transparent_40%),radial-gradient(circle_at_50%_100%,rgba(0,0,0,0.4),transparent_52%)]" />
        {/* Hero */}
        <section className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div {...fadeUp} className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-white/70">
              {t("home.hero.badge", "AI security & development")}
            </span>
            <h1 className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              {t("home.hero.title", "Build securely. Deploy confidently.")}
            </h1>
            <p className="text-lg text-white/80 sm:text-xl max-w-3xl">
              {t(
                "home.hero.subtitle",
                "Two subscription systems (AI-SOC, SLNC-env) plus custom AI and software delivery for enterprise teams."
              )}
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {highlights.map((item) => (
                <span
                  key={item.key}
                  className="inline-flex h-10 items-center rounded-full border border-white/12 bg-white/5 px-4 text-sm font-semibold text-white/80"
                >
                  {item.label}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/75 via-slate-900/45 to-blue-900/35 p-6 shadow-2xl"
          >
            <div className="space-y-4">
              <p className="text-base font-semibold text-blue-100">
                {t("home.hero.metrics.title", "Built for regulated teams")}
              </p>
              <div className="grid grid-cols-2 gap-4 sm:gap-5 text-sm text-white/80">
                <div className="rounded-2xl border border-white/12 bg-gradient-to-br from-white/10 via-white/5 to-blue-900/10 p-3 shadow-[0_18px_40px_rgba(0,0,0,0.28)]">
                  <p className="text-3xl font-bold text-white">24/7</p>
                  <p>{t("home.hero.metrics.soc", "AI-assisted SOC coverage")}</p>
                </div>
                <div className="rounded-2xl border border-white/12 bg-gradient-to-br from-white/10 via-white/5 to-blue-900/10 p-3 shadow-[0_18px_40px_rgba(0,0,0,0.28)]">
                  <p className="text-3xl font-bold text-white">0-egress</p>
                  <p>{t("home.hero.metrics.egress", "All on-prem—code, prompts, builds.")}</p>
                </div>
                <div className="rounded-2xl border border-white/12 bg-gradient-to-br from-white/10 via-white/5 to-blue-900/10 p-3 shadow-[0_18px_40px_rgba(0,0,0,0.28)]">
                  <p className="text-3xl font-bold text-white">4 min</p>
                  <p>{t("home.hero.metrics.deployment", "to first secure deployment")}</p>
                </div>
                <div className="rounded-2xl border border-white/12 bg-gradient-to-br from-white/10 via-white/5 to-blue-900/10 p-3 shadow-[0_18px_40px_rgba(0,0,0,0.28)]">
                  <p className="text-3xl font-bold text-white">43</p>
                  <p>{t("home.hero.metrics.locales", "locales supported out-of-box")}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Systems */}
        <section id="systems" className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold sm:text-4xl">
              {t("home.systems.title", "Systems")}
            </h2>
            <p className="text-white/70">
              {t(
                "home.systems.subtitle",
                "Choose the subscription product that fits: AI-SOC for detection and SLNC-env for sealed development."
              )}
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {systems.map((item, idx) => (
              <motion.div
                key={item.key}
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/14 bg-[#0b1428]/70 p-7 shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur transition duration-250 sm:p-9 hover:-translate-y-0.5 hover:border-white/18 hover:shadow-[0_28px_80px_rgba(0,0,0,0.34)]"
                variants={cardVariants}
                initial="initial"
                animate="animate"
                custom={idx}
              >
                <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition duration-300 group-hover:opacity-80 bg-[radial-gradient(circle_at_20%_25%,rgba(255,0,183,0.16),transparent_46%),radial-gradient(circle_at_78%_22%,rgba(88,116,255,0.18),transparent_46%),radial-gradient(circle_at_50%_90%,rgba(0,0,0,0.32),transparent_58%)]" />
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-white/80">
                    {item.badge}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-3xl font-semibold text-white sm:text-4xl">{item.title}</h3>
                    <p className="text-base text-white/75 sm:text-lg">{item.desc}</p>
                  </div>
                </div>
                <Link
                  href={item.href}
                  className="mt-8 inline-flex h-[52px] items-center justify-center gap-2 rounded-full bg-white px-6 text-base font-semibold text-slate-900 shadow-lg transition hover:-translate-y-0.5 hover:bg-gray-100"
                >
                  {t("home.systems.cta", "View details")}
                  <span aria-hidden>→</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Services */}
        <section className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2 max-w-3xl">
              <h2 className="text-3xl font-bold sm:text-4xl">
                {t("home.services.title", "Custom development services")}
              </h2>
              <p className="text-lg text-white/75 sm:text-xl">
                {t(
                  "home.services.subtitle",
                  "AI agents, integrations, and full-cycle software delivery with security baked in from day one."
                )}
              </p>
            </div>
            <Link
              href="/services"
              className="inline-flex h-[54px] items-center justify-center rounded-full bg-white px-7 text-base font-semibold text-slate-900 shadow-lg transition hover:-translate-y-0.5 hover:bg-gray-100"
            >
              {t("home.services.cta", "View services")}
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            {[
              {
                title: t("home.services.cardsTitle.agents", "Agents"),
                desc: t(
                  "home.services.cards.agents",
                  "Production-grade AI agents with guardrails, RAG, and secure connectors."
                ),
              },
              {
                title: t("home.services.cardsTitle.integrations", "Integrations"),
                desc: t(
                  "home.services.cards.integrations",
                  "Vendor-neutral integrations with your stack, IAM, and data governance."
                ),
              },
              {
                title: t("home.services.cardsTitle.delivery", "Delivery"),
                desc: t(
                  "home.services.cards.delivery",
                  "Full-cycle delivery with reliability SLOs, observability, and security reviews."
                ),
              },
            ].map((card, idx) => (
              <motion.div
                key={card.title}
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/12 bg-[#0b1428]/70 p-6 text-white/80 shadow-[0_18px_50px_rgba(0,0,0,0.24)] transition duration-200 hover:-translate-y-0.5 hover:border-white/18 hover:shadow-[0_22px_64px_rgba(0,0,0,0.30)]"
                variants={cardVariants}
                initial="initial"
                animate="animate"
                custom={idx}
              >
                <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition duration-300 group-hover:opacity-80 bg-[radial-gradient(circle_at_22%_20%,rgba(255,0,183,0.14),transparent_42%),radial-gradient(circle_at_78%_18%,rgba(88,116,255,0.16),transparent_44%),radial-gradient(circle_at_50%_92%,rgba(0,0,0,0.30),transparent_56%)]" />
                <p className="text-lg font-semibold text-white relative z-10">{card.title}</p>
                <p className="mt-3 text-base leading-relaxed text-white/75 relative z-10">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Resources: video + article */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold sm:text-4xl">
              {t("home.resources.title", "Featured resources")}
            </h2>
            <p className="text-white/70">
              {t(
                "home.resources.subtitle",
                "Watch the product tour and read the latest article on sealed development."
              )}
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {[{
              title: t("home.resources.videoTitle", "Product tour video"),
              description: t(
                "home.resources.videoDesc",
                "See how AI-SOC detects threats and automates responses in under two minutes."
              ),
              href: "/ai-soc",
              cta: t("home.resources.videoCta", "Watch video"),
              badge: t("home.resources.videoBadge", "Video"),
            }, {
              title: t("home.resources.articleTitle", "Article: Building SLNC-env"),
              description: t(
                "home.resources.articleDesc",
                "Why sealed development matters and how SLNC-env keeps code, prompts, and builds inside your network."
              ),
              href: "/slnc-env",
              cta: t("home.resources.articleCta", "Read article"),
              badge: t("home.resources.articleBadge", "Article"),
            }].map((card, idx) => (
              <motion.div
                key={card.title}
                className="group relative overflow-hidden rounded-3xl border border-white/14 bg-[#0b1428]/70 p-7 shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur transition duration-250 hover:-translate-y-0.5 hover:border-white/18 hover:shadow-[0_28px_80px_rgba(0,0,0,0.34)]"
                variants={cardVariants}
                initial="initial"
                animate="animate"
                custom={idx}
              >
                <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition duration-300 group-hover:opacity-80 bg-[radial-gradient(circle_at_20%_25%,rgba(255,0,183,0.16),transparent_46%),radial-gradient(circle_at_78%_22%,rgba(88,116,255,0.18),transparent_46%),radial-gradient(circle_at_50%_90%,rgba(0,0,0,0.32),transparent_58%)]" />
                <div className="relative flex h-full flex-col gap-4">
                  <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-white/80">
                    {card.badge}
                  </span>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-semibold text-white">{card.title}</h3>
                    <p className="text-base text-white/75">{card.description}</p>
                  </div>
                  <Link
                    href={card.href}
                    className="mt-auto inline-flex h-[48px] items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-slate-900 shadow-lg transition hover:-translate-y-0.5 hover:bg-gray-100"
                  >
                    {card.cta}
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section
          id="contact-form"
          className="group relative overflow-hidden rounded-[32px] border border-white/14 bg-[#0b1428]/75 px-8 py-10 text-center shadow-[0_32px_96px_rgba(0,0,0,0.34)] ring-1 ring-white/6 transition duration-300 hover:-translate-y-0.5 hover:border-white/18 hover:shadow-[0_36px_110px_rgba(0,0,0,0.36)] sm:px-12 sm:py-12"
        >
          <div className="pointer-events-none absolute inset-0 rounded-[32px] opacity-80 transition duration-300 group-hover:opacity-95 bg-[radial-gradient(circle_at_18%_18%,rgba(255,0,183,0.16),transparent_42%),radial-gradient(circle_at_82%_16%,rgba(88,116,255,0.18),transparent_44%),radial-gradient(circle_at_50%_96%,rgba(0,0,0,0.32),transparent_56%)]" />
          <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-4 sm:gap-5">
            <h3 className="text-2xl font-bold text-white sm:text-3xl relative z-10">
              {t("home.contact.title", "Ready to combine AI-SOC and SLNC-env?")}
            </h3>
            <p className="text-lg text-white/75 sm:text-xl relative z-10">
              {t(
                "home.contact.subtitle",
                "Tell us your security and delivery goals—we'll align the right system and services."
              )}
            </p>
            <div className="pt-2 relative z-10">
              <GlowButton onClick={openModal} className="w-full max-w-xs sm:max-w-sm" innerClassName="px-8 py-3 text-base">
                {t("home.contact.cta", "Request demo")}
              </GlowButton>
            </div>
          </div>
        </section>
      </main>

      <RequestDemoModal isOpen={isModalOpen} onClose={closeModal} />
      <BackToTopButton />
    </div>
  );
}
