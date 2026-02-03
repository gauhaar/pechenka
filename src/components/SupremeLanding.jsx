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
  const [activeCardIndex, setActiveCardIndex] = useState(null);
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
    "Zero Configuration: Auto-installs necessary engines and security patches",
    "Deep Scan: Checks for CVEs",
    "Finding Misconfigurations, and Secrets",
    "Interactive Dashboard: View security score and critical stats",
    "Scan History: Review past scan results and track improvements",
    "Glassmorphism Reports: Beautiful, detailed HTML reports with code snippets",
    "Code analyzer itself is running locally, the code is not being exposed to external servers",
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

      <main className="relative z-10 pb-24 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="relative pt-16 pb-20">
          {/* Background spotlights */}
          <div className="hero-spotlight hero-spotlight--purple" style={{position: 'absolute', top: '0', left: '10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(168,85,247,0.15), transparent)', filter: 'blur(80px)', borderRadius: '50%'}} aria-hidden="true" />
          <div className="hero-spotlight hero-spotlight--indigo" style={{position: 'absolute', bottom: '10%', right: '5%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(99,102,241,0.12), transparent)', filter: 'blur(70px)', borderRadius: '50%'}} aria-hidden="true" />

          <div className="relative z-10 max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12 gap-8">
              {/* Left content */}
              <div className="flex-1 space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-slate-200"
                >
                  Supreme · VSCode Extension
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight"
                >
                  Local Code Vulnerability Scanner
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg text-slate-300 max-w-xl"
                >
                  Scan your code locally without exposing it to external servers. Fast, comprehensive vulnerability detection right in your editor.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap gap-3 pt-4"
                >
                  <GlowButton onClick={openModal} variant="primary" size="lg">
                    Get Started
                  </GlowButton>
                </motion.div>
              </div>

              {/* Right 16:9 Video Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="flex-1 w-full"
              >
                <div className="relative aspect-video bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.15),transparent_70%)]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-purple-500/20 border border-purple-500/40 mb-4"
                      >
                        <svg
                          className="w-10 h-10 text-purple-400"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </motion.div>
                      <p className="text-slate-300 font-semibold text-lg">How to Use Supreme</p>
                      <p className="text-slate-500 text-sm mt-1">Installation & Setup Guide</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto py-20 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              Powerful Features
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              Everything you need for secure code development
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="group"
              >
                <div className="relative flex items-start gap-4 p-6 bg-slate-900/40 border border-white/5 rounded-xl hover:border-white/10 transition-colors">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center mt-0.5">
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
                  <p className="text-slate-200 text-sm leading-relaxed">{feature}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Pricing Section */}
        <section className="max-w-7xl mx-auto py-20 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              Simple Pricing
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              Choose the plan that works best for you
            </p>
          </div>

          {/* Currency Selector */}
          <div className="flex justify-center gap-2">
            <button
              onClick={() => setCurrency("USD")}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                currency === "USD"
                  ? "bg-purple-600 text-white"
                  : "bg-slate-800/60 text-slate-300 hover:bg-slate-700/60"
              }`}
            >
              USD
            </button>
            <button
              onClick={() => setCurrency("KZT")}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                currency === "KZT"
                  ? "bg-purple-600 text-white"
                  : "bg-slate-800/60 text-slate-300 hover:bg-slate-700/60"
              }`}
            >
              KZT
            </button>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Monthly Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              onMouseEnter={() => setActiveCardIndex(0)}
              onMouseLeave={() => setActiveCardIndex(null)}
              className="group relative h-full"
            >
              {/* Glow backdrop */}
              <div
                className="absolute -inset-4 rounded-2xl transition-all duration-300 pointer-events-none blur-2xl"
                style={{
                  background: activeCardIndex === 0 ? "linear-gradient(135deg, rgba(168,85,247,0.9), rgba(99,102,241,0.7))" : "transparent",
                  opacity: activeCardIndex === 0 ? 0.3 : 0,
                }}
              />

              {/* Outer wrapper */}
              <div
                className="relative h-full rounded-2xl transition-all duration-300"
                style={{
                  border: "1.5px solid",
                  borderColor: activeCardIndex === 0 ? "rgba(168,85,247,0.8)" : "rgba(168,85,247,0.4)",
                  background: "rgba(20, 20, 35, 0.6)",
                  backdropFilter: "blur(16px) saturate(180%)",
                  boxShadow: activeCardIndex === 0 
                    ? "inset 0 0 60px rgba(168,85,247,0.15), inset 0 0 120px rgba(168,85,247,0.08)"
                    : "inset 0 0 40px rgba(168,85,247,0.06)",
                }}
              >
                {/* Inner card */}
                <div
                  className="relative rounded-2xl overflow-hidden h-full flex flex-col p-8 sm:p-10 transition-all duration-300"
                  style={{
                    background: "rgba(8, 10, 20, 0.50)",
                    backdropFilter: "blur(16px) saturate(180%)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    transform: activeCardIndex === 0 ? "translateY(-4px)" : "translateY(0)",
                  }}
                >
                  {/* Colored overlay */}
                  <div
                    className="absolute inset-0 rounded-2xl pointer-events-none transition-all duration-300"
                    style={{
                      background: activeCardIndex === 0 ? "linear-gradient(135deg, rgba(168,85,247,0.1), rgba(99,102,241,0.05))" : "transparent",
                      opacity: 1,
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-10 space-y-6 flex-1 flex flex-col">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                        Monthly
                      </h3>
                      <p className="text-slate-400">Flexible, cancel anytime</p>
                    </div>

                    <div className="pt-4">
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-5xl sm:text-6xl font-bold text-white">
                          {pricing[currency].monthly}
                        </span>
                        <span className="text-slate-400">/month</span>
                      </div>
                    </div>

                    <div className="flex-1" />

                    <GlowButton onClick={openModal} variant="primary" className="w-full">
                      Subscribe Now
                    </GlowButton>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Yearly Plan - Featured */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              onMouseEnter={() => setActiveCardIndex(1)}
              onMouseLeave={() => setActiveCardIndex(null)}
              className="group relative h-full"
            >
              {/* Save badge */}
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 left-8 z-20 px-4 py-1.5 bg-gradient-to-r from-purple-600 to-purple-500 rounded-full text-xs font-bold text-white shadow-lg"
              >
                Save 30%
              </motion.div>

              {/* Glow backdrop */}
              <div
                className="absolute -inset-4 rounded-2xl transition-all duration-300 pointer-events-none blur-2xl"
                style={{
                  background: activeCardIndex === 1 ? "linear-gradient(135deg, rgba(168,85,247,0.9), rgba(99,102,241,0.7))" : "transparent",
                  opacity: activeCardIndex === 1 ? 0.3 : 0,
                }}
              />

              {/* Outer wrapper */}
              <div
                className="relative h-full rounded-2xl transition-all duration-300"
                style={{
                  border: "1.5px solid",
                  borderColor: activeCardIndex === 1 ? "rgba(168,85,247,0.8)" : "rgba(168,85,247,0.6)",
                  background: "rgba(20, 20, 35, 0.6)",
                  backdropFilter: "blur(16px) saturate(180%)",
                  boxShadow: activeCardIndex === 1 
                    ? "inset 0 0 60px rgba(168,85,247,0.15), inset 0 0 120px rgba(168,85,247,0.08), 0 0 60px 15px rgba(168,85,247,0.25)"
                    : "inset 0 0 40px rgba(168,85,247,0.08), 0 0 40px 10px rgba(168,85,247,0.15)",
                }}
              >
                {/* Inner card */}
                <div
                  className="relative rounded-2xl overflow-hidden h-full flex flex-col p-8 sm:p-10 transition-all duration-300"
                  style={{
                    background: "rgba(8, 10, 20, 0.50)",
                    backdropFilter: "blur(16px) saturate(180%)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    transform: activeCardIndex === 1 ? "translateY(-4px)" : "translateY(0)",
                  }}
                >
                  {/* Colored overlay */}
                  <div
                    className="absolute inset-0 rounded-2xl pointer-events-none transition-all duration-300"
                    style={{
                      background: "linear-gradient(135deg, rgba(168,85,247,0.15), rgba(99,102,241,0.08))",
                      opacity: 1,
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-10 space-y-6 flex-1 flex flex-col">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                        Yearly
                      </h3>
                      <p className="text-slate-400">Best value</p>
                    </div>

                    <div className="pt-4">
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-5xl sm:text-6xl font-bold text-white">
                          {pricing[currency].yearly}
                        </span>
                        <span className="text-slate-400">/year</span>
                      </div>
                      <p className="text-sm text-slate-500">~{Math.round(parseInt(pricing[currency].yearly.replace(/[^0-9]/g, '')) / 12)} per month</p>
                    </div>

                    <div className="flex-1" />

                    <GlowButton onClick={openModal} variant="primary" className="w-full">
                      Subscribe Now
                    </GlowButton>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Screenshots Section */}
        <section className="max-w-7xl mx-auto py-20 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              Showcase
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              See what makes Supreme the perfect choice
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {screenshots.map((screenshot, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
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
                    <div className="aspect-[4/5] bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-white/10 rounded-xl overflow-hidden mb-6 flex items-center justify-center">
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
        <section className="max-w-4xl mx-auto py-20">
          <EdgeGlowCard
            mode="static"
            glowColor="#a855f7"
            secondaryGlowColor="rgba(99,102,241,0.5)"
            outerClassName="relative rounded-2xl p-[2px]"
            innerClassName="rounded-[18px]"
          >
            <div className="relative overflow-hidden rounded-2xl p-8 sm:p-12 text-center bg-gradient-to-br from-slate-900/40 to-slate-900/20 border border-white/5">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                Ready to secure your code?
              </h2>
              <p className="text-slate-300 mb-8 max-w-2xl mx-auto text-lg">
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
