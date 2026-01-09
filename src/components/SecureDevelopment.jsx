"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import BackToTopButton from "@/components/BackToTopButton";
import RequestSystemModal from "@/components/RequestSystemModal";
import EdgeGlowCard from "@/components/EdgeGlowCard";
import GlassyBox3D from "@/components/GlassyBox3D";
import { motion } from "framer-motion";

export default function SecureDevelopmentPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const impactTimeline = [
        { year: "2010", attack: "Stuxnet", target: "Natanz enrichment facility", impact: "Destroyed ~1,000 centrifuges", severity: "Critical" },
        { year: "2015", attack: "BlackEnergy", target: "Ukraine power grid", impact: "230k customers lost power", severity: "High" },
        { year: "2017", attack: "TRITON", target: "Saudi petrochemical plant", impact: "Safety systems disabled", severity: "Critical" },
        { year: "2021", attack: "Colonial Pipeline", target: "US fuel pipeline", impact: "6-day fuel paralysis", severity: "High" },
        { year: "2025", attack: "PDVSA", target: "Venezuela refining", impact: "Refinery operations disrupted", severity: "Medium" },
    ];

    const severityStyles = {
        Critical: { color: "#f87171", bg: "rgba(248,113,113,0.08)", ring: "0 20px 70px -25px rgba(248,113,113,0.8)" },
        High: { color: "#fb923c", bg: "rgba(251,146,60,0.07)", ring: "0 18px 60px -28px rgba(251,146,60,0.75)" },
        Medium: { color: "#fcd34d", bg: "rgba(252,211,77,0.06)", ring: "0 16px 50px -30px rgba(252,211,77,0.7)" },
    };

    const architecture = [
        { title: "Sithub Server", tag: "Local version control", accent: "#38bdf8" },
        { title: "LLM Server (Qwen-Code)", tag: "On-prem intelligence", accent: "#a855f7" },
        { title: "IDE with Local Copilot", tag: "Cursor-class experience", accent: "#22c55e" },
    ];

    const analyzerShots = [
        { src: "/slnc-code-analyzer/slnc-code-analyzer1.png", title: "Scan overview", desc: "See issues grouped by severity before code leaves your network." },
        { src: "/slnc-code-analyzer/slnc-code-analyzer2.png", title: "Commit fingerprint", desc: "Trace every finding to a commit with remediation hints." },
        { src: "/slnc-code-analyzer/slnc-code-analyzer3.png", title: "Inline diffs", desc: "Review suggested patches inline with security context." },
    ];

    const cardHover = { whileHover: { y: -4, scale: 1.01 }, transition: { duration: 0.25, ease: "easeOut" } };

    const GlowOrb = ({ className = "", color = "rgba(168,85,247,0.25)", size = "28rem", blur = "80px" }) => (
        <div
            className={`pointer-events-none absolute rounded-full mix-blend-screen ${className}`}
            style={{ background: color, width: size, height: size, filter: `blur(${blur})` }}
            aria-hidden
        />
    );

    const HoverCard = ({ title, tag, accent }) => {
        const overlay = `${accent}33`;
        const shadow = `${accent}40`;

        return (
            <EdgeGlowCard
                mode="static"
                glowColor={accent}
                secondaryGlowColor="rgba(32,140,255,0.35)"
                outerClassName="group relative rounded-2xl p-[1px] edge-glow-card--default"
                innerClassName="rounded-[18px]"
            >
                <div
                    className="relative flex h-52 w-full flex-col justify-between overflow-hidden rounded-[16px] border border-white/10 bg-slate-900/60 p-6 backdrop-blur-sm transition-all duration-200 group-hover:-translate-y-0.5 group-hover:border-white/20 group-hover:bg-slate-900/80 group-hover:backdrop-blur-md"
                    style={{ boxShadow: `0 20px 48px ${shadow}` }}
                >
                    <div className="relative flex flex-col justify-between h-full">
                        <div>
                            <h3 className="text-xl font-bold text-white">{title}</h3>
                            <p className="mt-2 text-sm text-slate-400">{tag}</p>
                        </div>
                        <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                            Stays on-prem. No egress.
                        </p>
                    </div>
                </div>
            </EdgeGlowCard>
        );
    };

    return (
        <div className="min-h-screen bg-[#01091C] text-slate-200 font-sans selection:bg-pink-500/30 relative overflow-hidden">
            <Header onOpenModal={openModal} />

            <main className="relative z-10 pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20">
                {/* Hero */}
                <section className="relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-slate-900/70 via-slate-900/40 to-blue-900/40 p-10 sm:p-14 shadow-2xl">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.12),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(236,72,153,0.12),transparent_25%),radial-gradient(circle_at_60%_70%,rgba(99,102,241,0.12),transparent_25%)]" />

                    <div className="relative flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
                        <div className="max-w-2xl space-y-6">
                            <motion.p
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-slate-200"
                            >
                                SLNC Code · Secure Development Environment
                            </motion.p>
                            <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
                                Build systems with secure and private code
                            </motion.h1>
                            <p className="text-lg text-slate-200 max-w-xl">
                                Private development environment for enterprises, where code never leaves your corporate network. Meanwhile offering the latest AI-powered technology
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <button 
                                    onClick={openModal}
                                    className="rounded-full bg-gradient-to-r from-pink-500 via-violet-500 to-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-pink-500/20 transition hover:scale-[1.02]"
                                >
                                    Request System
                                </button>
                            </div>
                        </div>

                        <div className="flex w-full max-w-lg items-center justify-center lg:self-center">
                             <GlassyBox3D />
                        </div>
                    </div>
                </section>

                {/* Components section */}
                <section className="relative space-y-6">
                    <EdgeGlowCard className="relative overflow-hidden">
                        <div className="p-8 md:p-10 space-y-5">
                            <div className="flex items-center gap-2 text-sm font-semibold text-blue-300">
                                <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
                                Three components, one sealed loop
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-white">Everything stays inside</h2>
                            <p className="text-slate-100 text-base md:text-lg leading-relaxed">
                                Code, prompts, and builds never leave your network. SLNC Code keeps AI help, reviews, and delivery private for cloud providers, government teams, and industrial plants.
                            </p>

                            <div className="grid gap-5 md:grid-cols-3">
                                {architecture.map((item) => (
                                    <HoverCard key={item.title} title={item.title} tag={item.tag} accent={item.accent} />
                                ))}
                            </div>
                        </div>
                    </EdgeGlowCard>
                </section>

                {/* Impact timeline */}
                <section className="space-y-6 relative">
                    <GlowOrb className="-left-10 -top-20" color="rgba(248,113,113,0.16)" size="24rem" blur="110px" />
                    <GlowOrb className="right-0 top-8" color="rgba(190,24,93,0.12)" size="18rem" blur="95px" />

                    <div className="flex items-center gap-3">
                        <div>
                            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Recent wake-up calls</p>
                            <h2 className="text-3xl font-bold text-white">Why isolated, checked code matters</h2>
                        </div>
                    </div>

                    <EdgeGlowCard className="relative overflow-hidden" glowColor="#f43f5e" secondaryGlowColor="rgba(248,113,113,0.4)">
                        <div className="absolute inset-0 bg-gradient-to-r from-rose-500/25 via-fuchsia-600/20 to-amber-500/10" />
                        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-rose-400 via-orange-400 to-amber-300" />
                        <div className="relative flex flex-col gap-3 p-6 md:flex-row md:items-center md:justify-between">
                            <div className="space-y-2">
                                <p className="text-xs uppercase tracking-[0.22em] text-rose-100">Critical incident — leaked code</p>
                                <h3 className="text-xl md:text-2xl font-bold text-white">DeepSeek breach put source and prompts on the open internet</h3>
                                <p className="text-sm text-rose-50/90">Keep inference and scanning on-prem. No external model egress. Audit trails by default.</p>
                            </div>
                            <button onClick={openModal} className="whitespace-nowrap rounded-full border border-rose-200/60 px-4 py-2 text-sm font-semibold text-white hover:border-white/70 transition">
                                See containment plan
                            </button>
                        </div>
                    </EdgeGlowCard>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {impactTimeline.map((item) => {
                            const tone = severityStyles[item.severity] || severityStyles.Medium;
                            return (
                                <motion.div
                                    key={item.attack}
                                    {...cardHover}
                                    className="relative overflow-hidden rounded-2xl border p-5"
                                    style={{
                                        background: tone.bg,
                                        borderColor: `${tone.color}33`,
                                        boxShadow: tone.ring,
                                    }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                                    <div className="absolute inset-x-0 top-0 h-1 opacity-80" style={{ background: `linear-gradient(90deg, ${tone.color}, transparent)` }} />
                                    <div className="relative flex items-start justify-between gap-3">
                                        <div className="space-y-1">
                                            <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200 border border-white/10">
                                                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: tone.color }} />
                                                {item.year}
                                            </span>
                                            <h3 className="text-lg font-bold text-white">{item.attack}</h3>
                                            <p className="text-sm text-slate-200/90">{item.target}</p>
                                        </div>
                                        <span
                                            className="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide border"
                                            style={{ borderColor: `${tone.color}66`, color: tone.color, backgroundColor: `${tone.color}14` }}
                                        >
                                            {item.severity}
                                        </span>
                                    </div>
                                    <p className="relative mt-4 text-sm text-slate-100" style={{ color: "#f8fafc" }}>{item.impact}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </section>

                {/* AI analyzer snapshot */}
                <section className="space-y-6 relative">
                    <GlowOrb className="-right-12 top-0" color="rgba(236,72,153,0.14)" size="22rem" blur="95px" />
                    <GlowOrb className="left-4 bottom-0" color="rgba(59,130,246,0.12)" size="18rem" blur="90px" />

                    <div className="flex items-center gap-3">
                        <div>
                            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Live assurance</p>
                            <h2 className="text-3xl font-bold text-white">Analyzer that beats CodeQL</h2>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                        {[
                            { title: "Automatic code quality", desc: "Structure, style, and best-practice checks tuned for safety-critical code", icon: "✨" },
                            { title: "Vulnerability sweeps", desc: "SQLi, XSS, auth bypass, and insecure dependencies surfaced instantly", icon: "🛡️" },
                            { title: "Secrets guard", desc: "Keys, tokens, and credentials blocked at commit time", icon: "🔑" },
                            { title: "Config hardening", desc: "Docker/K8s, IAM, and network policies scanned for privilege creep", icon: "⚙️" },
                        ].map((item, idx) => (
                            <motion.div
                                key={item.title}
                                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 p-5 shadow-xl"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.35, delay: idx * 0.05 }}
                            >
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(236,72,153,0.12))" }} />
                                <div className="relative flex gap-4">
                                    <span className="text-2xl">{item.icon}</span>
                                    <div className="space-y-1">
                                        <h3 className="text-lg font-bold text-white group-hover:text-blue-200 transition-colors">{item.title}</h3>
                                        <p className="text-sm text-slate-300 leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <EdgeGlowCard className="relative overflow-hidden" glowColor="#38bdf8">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-emerald-500/8 to-transparent" />
                        <div className="relative grid gap-4 md:grid-cols-3 p-5">
                            <div className="md:col-span-2 space-y-2">
                                <p className="text-xs uppercase tracking-[0.2em] text-slate-300">Beyond CodeQL</p>
                                <h3 className="text-xl font-bold text-white">Finds what static queries miss</h3>
                                <p className="text-sm text-slate-200 leading-relaxed">
                                    Finds misconfigs and vulnerable packages faster than CodeQL and offers fixes, not just alerts.
                                </p>
                            </div>
                            <div className="space-y-2 text-sm text-slate-200">
                                <div className="flex items-start gap-2">
                                    <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                                    <p>Knows package graphs and flags risky dependencies in seconds.</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="mt-1 h-2 w-2 rounded-full bg-sky-400" />
                                    <p>Spots config drift and privilege creep—beyond static rules.</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="mt-1 h-2 w-2 rounded-full bg-amber-400" />
                                    <p>Each finding comes with a suggested patch and owner.</p>
                                </div>
                            </div>
                        </div>
                    </EdgeGlowCard>

                    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl">
                        <GlowOrb className="-left-10 -top-14" color="rgba(236,72,153,0.12)" size="18rem" blur="80px" />
                        <GlowOrb className="right-0 bottom-0" color="rgba(59,130,246,0.1)" size="14rem" blur="70px" />

                        <div className="flex flex-wrap items-center justify-between gap-4 relative">
                            <div className="space-y-1">
                                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Visualizer</p>
                                <h3 className="text-2xl font-bold text-white">Code analyzer in action</h3>
                                <p className="text-sm text-slate-300">Crisp snapshots from recent scans, rendered beautifully inside the on-prem console.</p>
                            </div>
                            <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300 border border-white/10">Private workspace only</span>
                        </div>

                        <div className="relative mt-8 grid gap-5 md:grid-cols-3">
                            {analyzerShots.map((shot, idx) => (
                                <div
                                    key={shot.src}
                                    className="group overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60 shadow-xl backdrop-blur-sm"
                                    style={{ boxShadow: "0 20px 50px -28px rgba(15,23,42,0.9)" }}
                                >
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <img
                                            src={shot.src}
                                            alt={shot.title}
                                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="p-4 space-y-1">
                                        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-slate-400">
                                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                            Frame {idx + 1}
                                        </div>
                                        <h4 className="text-lg font-semibold text-white">{shot.title}</h4>
                                        <p className="text-sm text-slate-300 leading-relaxed">{shot.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Target industries */}
                <section className="space-y-6 relative">
                    <GlowOrb className="-right-6 top-4" color="rgba(59,130,246,0.12)" size="16rem" blur="80px" />
                    <GlowOrb className="left-0 bottom-2" color="rgba(16,185,129,0.12)" size="14rem" blur="70px" />

                    <div className="flex items-center gap-3">
                        <div>
                            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Where we deploy</p>
                            <h2 className="text-3xl font-bold text-white">Built for regulated, high-impact sectors</h2>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[{ icon: "🛢️", title: "Oil & Gas", text: "Drilling, refining, pipeline control" }, { icon: "⚡", title: "Energy", text: "Grid, distribution, and EMS" }, { icon: "⚛️", title: "Nuclear", text: "Reactor controls and safety" }, { icon: "🏭", title: "Manufacturing", text: "ICS, OT, and robotics" }, { icon: "🏛️", title: "Government", text: "Ministries, defense, critical agencies" }].map((item) => (
                            <motion.div key={item.title} {...cardHover}>
                                <EdgeGlowCard className="h-full">
                                    <div className="p-6 text-center space-y-2">
                                        <div className="text-3xl">{item.icon}</div>
                                        <h3 className="text-lg font-bold text-white">{item.title}</h3>
                                        <p className="text-sm text-slate-300">{item.text}</p>
                                    </div>
                                </EdgeGlowCard>
                            </motion.div>
                        ))}
                    </div>
                </section>

            </main>

            <RequestSystemModal isOpen={isModalOpen} onClose={closeModal} />
            <BackToTopButton />
        </div>
    );
}
