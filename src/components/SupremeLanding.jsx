"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import BackToTopButton from "@/components/BackToTopButton";
import RequestDemoModal from "@/components/RequestDemoModal";
import EdgeGlowCard from "@/components/EdgeGlowCard";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import GlowButton from "@/components/GlowButton";

export default function SupremeLanding() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currency, setCurrency] = useState("USD");
  const { t } = useLanguage();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const pricing = {
    USD: {
      monthly: "$18",
      yearly: "$150",
      suffix: "",
    },
    KZT: {
      monthly: "9,000",
      yearly: "75,000",
      suffix: " ₸",
    },
  };

  const features = [
    "Code analyzer itself is running locally, the code is not being exposed to external servers",
    "Deep Scan: Checks for CVEs",
    "Finding Misconfigurations, and Secrets",
    "Interactive Dashboard: View security score and critical stats",
    "Scan History: Review past scan results and track improvements",
    "Glassmorphism Reports: Beautiful, detailed HTML reports with code snippets",
    "Zero Configuration: Auto-installs necessary engines and security patches",
  ];

  const screenshots = [
    {
      title: "Very straightforward interface",
      description: "Clean, intuitive UI designed for developers",
    },
    {
      title: "Well structured security reports, with detailed explanation",
      description: "Comprehensive vulnerability analysis with actionable insights",
    },
    {
      title: "History of scans",
      description: "Track improvements over time with detailed scan history",
    },
  ];

  const cardHover = {
    whileHover: { y: -4, scale: 1.01 },
    transition: { duration: 0.25, ease: "easeOut" },
  };

  const GlowOrb = ({
    className = "",
    color = "rgba(168,85,247,0.25)",
    size = "28rem",
    blur = "80px",
  }) => (
    <div
      className={`pointer-events-none absolute rounded-full mix-blend-screen ${className}`}
      style={{ background: color, width: size, height: size, filter: `blur(${blur})` }}
      aria-hidden
    />
  );

  return (
    <div className="min-h-screen bg-[#01091C] text-slate-200 font-sans selection:bg-pink-500/30 relative overflow-hidden">
      <Header onOpenModal={openModal} />

      <main className="relative z-10 pt-20 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20">
        {/* Hero Section */}
        <section className="relative">
          <GlowOrb
            className="top-0 left-1/4 -translate-x-1/2"
            color="rgba(168,85,247,0.2)"
            size="32rem"
          />
          <GlowOrb
            className="top-20 right-1/4 translate-x-1/2"
            color="rgba(99,102,241,0.15)"
            size="28rem"
          />

          <EdgeGlowCard
            mode="static"
            glowColor="#a855f7"
            secondaryGlowColor="rgba(99,102,241,0.5)"
            outerClassName="group relative z-10 rounded-[34px] p-[2px] edge-glow-card--hero"
            innerClassName="affiliate-card affiliate-card--hero rounded-[30px]"
          >
            <div className="relative overflow-hidden rounded-[28px] p-8 sm:p-12">
              {/* Internal glow effects */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-32 -left-32 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.35),transparent_60%)] blur-[80px] mix-blend-screen" />
                <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.3),transparent_60%)] blur-[80px] mix-blend-screen" />
              </div>

              <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl space-y-5">
                  <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-slate-200"
                  >
                    Supreme · VSCode Extension
                  </motion.p>
                  <motion.h1
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight"
                  >
                    Local Code Vulnerability Scanner for VSCode
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-lg text-slate-300"
                  >
                    Scan your code locally without exposing it to external servers. Fast, comprehensive vulnerability detection right in your editor.
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="flex gap-4 pt-4"
                  >
                    <GlowButton onClick={openModal} variant="primary">
                      Get Started
                    </GlowButton>
                    <GlowButton variant="secondary">
                      Learn More
                    </GlowButton>
                  </motion.div>
                </div>

                {/* 16:9 Instruction Card */}
                <div className="w-full lg:w-1/2 flex-shrink-0">
                  <div className="relative aspect-video bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.1),transparent_70%)]" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/20 border border-purple-500/30 mb-4">
                          <svg
                            className="w-8 h-8 text-purple-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <p className="text-slate-300 font-medium">How to Use Supreme</p>
                        <p className="text-slate-500 text-sm mt-1">Installation & Setup Guide</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </EdgeGlowCard>
        </section>

        {/* Features Section */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Everything you need for secure code development
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="group relative rounded-xl overflow-hidden"
              >
                <EdgeGlowCard
                  mode="static"
                  glowColor="#a855f7"
                  outerClassName="relative rounded-xl p-[1px]"
                  innerClassName="rounded-[10px]"
                >
                  <div className="relative flex items-start gap-4 p-6 bg-slate-900/40 border border-white/5 rounded-[10px] hover:border-white/10 transition-colors">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center mt-1">
                      <svg
                        className="w-4 h-4 text-purple-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-slate-200 leading-relaxed">{feature}</p>
                  </div>
                </EdgeGlowCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Pricing Section */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Simple Pricing
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Choose the plan that works best for you
            </p>
          </div>

          {/* Currency Selector */}
          <div className="flex justify-center gap-2 mb-8">
            <button
              onClick={() => setCurrency("USD")}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                currency === "USD"
                  ? "bg-purple-500 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              USD
            </button>
            <button
              onClick={() => setCurrency("KZT")}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                currency === "KZT"
                  ? "bg-purple-500 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              KZT
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {/* Monthly */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <EdgeGlowCard
                mode="static"
                glowColor="#a855f7"
                outerClassName="relative rounded-2xl p-[1px]"
                innerClassName="rounded-[20px]"
              >
                <div className="relative p-8 bg-slate-900/40 border border-white/5 rounded-[20px]">
                  <h3 className="text-2xl font-bold text-white mb-2">Monthly</h3>
                  <p className="text-slate-400 mb-6">Flexible, cancel anytime</p>
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-white">
                      {pricing[currency].monthly}
                    </span>
                    <span className="text-slate-400">/month{pricing[currency].suffix}</span>
                  </div>
                  <GlowButton onClick={openModal} variant="primary" className="w-full">
                    Subscribe Now
                  </GlowButton>
                </div>
              </EdgeGlowCard>
            </motion.div>

            {/* Yearly */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <EdgeGlowCard
                mode="static"
                glowColor="#a855f7"
                outerClassName="relative rounded-2xl p-[1px]"
                innerClassName="rounded-[20px]"
              >
                <div className="relative p-8 bg-slate-900/40 border border-white/5 rounded-[20px] ring-1 ring-purple-500/30">
                  <div className="absolute -top-3 left-6 px-3 py-1 bg-purple-600 rounded-full text-xs font-semibold text-white">
                    Save 30%
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Yearly</h3>
                  <p className="text-slate-400 mb-6">Best value</p>
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-white">
                      {pricing[currency].yearly}
                    </span>
                    <span className="text-slate-400">/year{pricing[currency].suffix}</span>
                  </div>
                  <GlowButton onClick={openModal} variant="primary" className="w-full">
                    Subscribe Now
                  </GlowButton>
                </div>
              </EdgeGlowCard>
            </motion.div>
          </div>
        </section>

        {/* Screenshots Section */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Showcase
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              See what makes Supreme the perfect choice
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {screenshots.map((screenshot, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group"
              >
                <EdgeGlowCard
                  mode="static"
                  glowColor="#a855f7"
                  outerClassName="relative rounded-2xl p-[1px] h-full"
                  innerClassName="rounded-[20px] h-full"
                >
                  <div className="relative flex flex-col h-full p-6 bg-slate-900/40 border border-white/5 rounded-[20px] overflow-hidden">
                    {/* 4:5 Placeholder Frame */}
                    <div className="aspect-[4/5] bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-white/10 rounded-xl overflow-hidden mb-6 flex items-center justify-center">
                      <div className="text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-500/20 border border-purple-500/30 mb-3">
                          <svg
                            className="w-6 h-6 text-purple-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <p className="text-slate-500 text-sm">Screenshot</p>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-2">
                        {screenshot.title}
                      </h3>
                      <p className="text-slate-400 text-sm">
                        {screenshot.description}
                      </p>
                    </div>
                  </div>
                </EdgeGlowCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative">
          <GlowOrb
            className="bottom-0 left-1/2 -translate-x-1/2"
            color="rgba(168,85,247,0.15)"
            size="36rem"
          />

          <EdgeGlowCard
            mode="static"
            glowColor="#a855f7"
            secondaryGlowColor="rgba(99,102,241,0.5)"
            outerClassName="relative z-10 rounded-2xl p-[2px]"
            innerClassName="rounded-[18px]"
          >
            <div className="relative overflow-hidden rounded-2xl p-8 sm:p-12 text-center bg-slate-900/40 border border-white/5">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to secure your code?
              </h2>
              <p className="text-slate-300 mb-8 max-w-xl mx-auto">
                Start scanning for vulnerabilities locally with Supreme today
              </p>
              <GlowButton onClick={openModal} variant="primary" size="lg">
                Get Started for Free
              </GlowButton>
            </div>
          </EdgeGlowCard>
        </section>
      </main>

      <RequestDemoModal isOpen={isModalOpen} onClose={closeModal} />
      <BackToTopButton />
    </div>
  );
}
