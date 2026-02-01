"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

const calloutClassMap = {
    info: "border border-cyan-300/30 bg-cyan-500/10 text-cyan-100/90 shadow-[0_10px_30px_rgba(34,211,238,0.18)]",
    warning: "border border-amber-300/30 bg-amber-500/10 text-amber-100/90 shadow-[0_10px_30px_rgba(245,158,11,0.18)]",
    success: "border border-emerald-300/30 bg-emerald-500/10 text-emerald-100/90 shadow-[0_10px_30px_rgba(16,185,129,0.2)]",
};

const transition = { duration: 0.35, ease: [0.4, 0, 0.2, 1] };
const HEADER_OFFSET = 96;
const CONTENT_SCROLL_OFFSET = 96;

const MobileDrawer = ({ title, closeLabel, isOpen, onClose, children }) => (
    <div
        className={cn(
            "lg:hidden fixed inset-0 z-50 transition-all duration-300",
            isOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
    >
        <div
            className={cn(
                "absolute inset-0 bg-[#040414]/85 backdrop-blur-sm transition-opacity duration-300",
                isOpen ? "opacity-100" : "opacity-0"
            )}
            aria-hidden="true"
            onClick={onClose}
        />
        <motion.div
            initial={{ x: "100%" }}
            animate={{ x: isOpen ? 0 : "100%" }}
            transition={transition}
            className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col gap-6 rounded-l-3xl border border-cyan-400/20 bg-[#050b1f]/95 px-6 pb-8 pt-6 shadow-[0_0_65px_rgba(56,189,248,0.28)] ring-1 ring-cyan-300/20 backdrop-blur-xl"
            role="dialog"
            aria-modal="true"
        >
            <div className="flex items-center justify-between">
                <div className="text-xs uppercase tracking-[0.24em] text-slate-200/80">{title}</div>
                <button
                    type="button"
                    onClick={onClose}
                    className="rounded-full border border-cyan-400/40 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-100 transition hover:border-cyan-300/50 hover:bg-cyan-500/20"
                >
                    {closeLabel}
                </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto pr-2 text-slate-100/80">{children}</div>
        </motion.div>
    </div>
);

const renderBodyBlock = (block, blockIndex) => {
    if (!block) return null;

    if (block.type === "paragraph") {
        return (
            <p
                key={`paragraph-${blockIndex}`}
                className="text-base leading-relaxed text-slate-100/85 md:text-[17px]"
            >
                {block.content}
            </p>
        );
    }

    if (block.type === "list") {
        return (
            <div key={`list-${blockIndex}`} className="space-y-2.5">
                {block.title ? (
                    <div className="text-xs uppercase tracking-[0.3em] text-cyan-200/70">{block.title}</div>
                ) : null}
                <ul className="space-y-1.5 pl-5 text-base leading-relaxed text-slate-100/80 marker:text-cyan-200">
                    {block.items.map((item, itemIndex) => (
                        <li key={`list-item-${blockIndex}-${itemIndex}`} className="list-disc">
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    if (block.type === "orderedList") {
        return (
            <div key={`ordered-${blockIndex}`} className="space-y-2.5">
                <ol className="space-y-1.5 pl-5 text-base leading-relaxed text-slate-100/80 marker:text-cyan-200">
                    {block.items.map((item, itemIndex) => (
                        <li key={`ordered-item-${blockIndex}-${itemIndex}`} className="list-decimal">
                            {item}
                        </li>
                    ))}
                </ol>
            </div>
        );
    }

    if (block.type === "code") {
        return (
            <pre
                key={`code-${blockIndex}`}
                className="overflow-x-auto rounded-2xl border border-cyan-300/15 bg-[#041025]/90 px-4 py-3 font-mono text-sm text-cyan-100/90"
            >
                <code>{block.content}</code>
            </pre>
        );
    }

    if (block.type === "callout") {
        return (
            <div
                key={`callout-${blockIndex}`}
                className={cn(
                    "rounded-2xl px-4 py-3 text-base leading-relaxed shadow-[0_10px_35px_rgba(8,17,35,0.25)]",
                    calloutClassMap[block.intent ?? "info"]
                )}
            >
                {block.content}
            </div>
        );
    }

    return null;
};

const EmailSecurityDocumentation = () => {
    const { t } = useLanguage();
    const doc = t("documentation.emailSecurity", {});
    const labels = t("documentation.system", {});

    const chapters = useMemo(() => doc?.chapters ?? [], [doc]);
    const badge = doc?.badge ?? "";
    const heroTitle = doc?.title ?? "";
    const heroSubtitle = doc?.subtitle ?? "";
    const heroDescription = doc?.description ?? "";

    const sectionRefs = useRef(new Map());
    const observerRef = useRef(null);
    const isProgrammaticScrollRef = useRef(false);
    const programmaticResetRef = useRef(null);
    const contentContainerRef = useRef(null);

    const [activeChapter, setActiveChapter] = useState(() => chapters[0]?.id ?? "");
    const [activeSection, setActiveSection] = useState(() => chapters[0]?.sections?.[0]?.id ?? "");
    const [navOpen, setNavOpen] = useState(false);
    const [tocOpen, setTocOpen] = useState(false);

    useEffect(() => {
        if (!chapters.length) {
            if (activeChapter) setActiveChapter("");
            if (activeSection) setActiveSection("");
            return;
        }

        const fallbackChapter = chapters[0];
        const hasActiveChapter = chapters.some((chapter) => chapter.id === activeChapter);

        if (!hasActiveChapter) {
            setActiveChapter(fallbackChapter.id);
            setActiveSection(fallbackChapter.sections?.[0]?.id ?? "");
            return;
        }

        const resolvedChapter = chapters.find((chapter) => chapter.id === activeChapter);
        if (resolvedChapter) {
            const hasSection = resolvedChapter.sections?.some((section) => section.id === activeSection);
            if (!hasSection) {
                setActiveSection(resolvedChapter.sections?.[0]?.id ?? "");
            }
        }
    }, [chapters, activeChapter, activeSection]);

    const currentChapter = useMemo(
        () => chapters.find((chapter) => chapter.id === activeChapter) ?? chapters[0] ?? null,
        [chapters, activeChapter]
    );

    const currentSections = currentChapter?.sections ?? [];
    const currentChapterId = currentChapter?.id ?? "";
    const firstSectionId = currentSections[0]?.id ?? "";
    const currentSectionIds = useMemo(
        () => currentSections.map((section) => section.id),
        [currentSections]
    );

    const resetProgrammaticState = useCallback(() => {
        if (programmaticResetRef.current) {
            window.clearTimeout(programmaticResetRef.current);
        }

        programmaticResetRef.current = window.setTimeout(() => {
            isProgrammaticScrollRef.current = false;
        }, 520);
    }, []);

    const scrollToContentTop = useCallback(
        (behavior = "smooth") => {
            const container = contentContainerRef.current;
            const targetTop = container
                ? container.getBoundingClientRect().top + window.scrollY - CONTENT_SCROLL_OFFSET
                : 0;

            isProgrammaticScrollRef.current = true;
            window.scrollTo({ top: Math.max(targetTop, 0), behavior });
            resetProgrammaticState();
        },
        [resetProgrammaticState]
    );

    const handleChapterSelect = useCallback(
        (chapterId) => {
            if (chapterId === activeChapter) {
                const firstSectionId = currentSections[0]?.id ?? "";
                if (firstSectionId) {
                    setActiveSection(firstSectionId);
                }

                scrollToContentTop("smooth");
                return;
            }

            sectionRefs.current = new Map();
            if (observerRef.current) {
                observerRef.current.disconnect();
                observerRef.current = null;
            }

            setActiveChapter(chapterId);
            scrollToContentTop("smooth");
        },
        [activeChapter, currentSections, scrollToContentTop]
    );

    const scrollToSection = useCallback(
        (sectionId) => {
            const target = sectionRefs.current.get(sectionId);
            if (!target) {
                return;
            }

            isProgrammaticScrollRef.current = true;

            const targetTop = target.getBoundingClientRect().top + window.scrollY - CONTENT_SCROLL_OFFSET;
            window.scrollTo({ top: targetTop, behavior: "smooth" });

            setActiveSection(sectionId);
            resetProgrammaticState();
        },
        [resetProgrammaticState]
    );

    useEffect(() => {
        if (!currentChapterId) {
            setActiveSection("");
            return;
        }

        setActiveSection(firstSectionId);
        scrollToContentTop("auto");
    }, [currentChapterId, firstSectionId, scrollToContentTop]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (isProgrammaticScrollRef.current) return;

                const visibleEntry = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => {
                        const ratioDiff = b.intersectionRatio - a.intersectionRatio;
                        if (Math.abs(ratioDiff) > 0.001) {
                            return ratioDiff;
                        }

                        const distanceA = Math.abs(a.boundingClientRect.top - HEADER_OFFSET);
                        const distanceB = Math.abs(b.boundingClientRect.top - HEADER_OFFSET);
                        if (distanceA !== distanceB) {
                            return distanceA - distanceB;
                        }

                        const indexA = Number(a.target.dataset.sectionIndex ?? 0);
                        const indexB = Number(b.target.dataset.sectionIndex ?? 0);
                        return indexA - indexB;
                    })[0];

                if (visibleEntry) {
                    const { sectionId } = visibleEntry.target.dataset;
                    if (sectionId && sectionId !== activeSection) {
                        setActiveSection(sectionId);
                    }
                }
            },
            {
                rootMargin: `-${HEADER_OFFSET}px 0px -50% 0px`,
                threshold: [0.15, 0.35, 0.55],
            }
        );

        observerRef.current = observer;

        currentSectionIds.forEach((id) => {
            const node = sectionRefs.current.get(id);
            if (node) {
                observer.observe(node);
            }
        });

        return () => {
            observer.disconnect();
            observerRef.current = null;
        };
    }, [activeSection, currentSectionIds]);

    useEffect(() => () => {
        if (programmaticResetRef.current) {
            window.clearTimeout(programmaticResetRef.current);
        }
    }, []);

    return (
        <div className="flex w-full flex-col">
            <div className="relative w-full px-3 pt-8 lg:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={transition}
                    className="relative mx-auto w-full max-w-[1400px] overflow-hidden rounded-[32px] border border-cyan-400/25 bg-[radial-gradient(circle_at_top,_rgba(15,118,255,0.3),_rgba(2,6,23,0.95))] px-6 py-9 text-white shadow-[0_0_120px_rgba(14,165,233,0.32)] backdrop-blur-2xl"
                >
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-[1.5px] rounded-[30px] border border-white/10"
                    />
                    <div className="text-xs uppercase tracking-[0.3em] text-cyan-100/70">{badge}</div>
                    <h1 className="mt-3 bg-gradient-to-r from-cyan-100 via-sky-100 to-emerald-100 bg-clip-text text-3xl font-semibold text-transparent sm:text-4xl">
                        {heroTitle}
                    </h1>
                    <p className="mt-2 text-sm text-cyan-100/70">{heroSubtitle}</p>
                    <p className="mt-4 max-w-4xl text-sm text-slate-200/85">
                        {heroDescription}
                    </p>
                </motion.div>
            </div>

            <div className="relative mx-auto grid w-full max-w-[1400px] items-start gap-4 px-3 pb-16 pt-6 md:grid-cols-[minmax(0,1fr)_minmax(200px,240px)] lg:grid-cols-[220px_minmax(0,1fr)_minmax(0,220px)] lg:gap-6 lg:px-6">
                <div className="flex items-center justify-between gap-3 md:col-span-2 lg:col-span-3 lg:hidden">
                    <button
                        type="button"
                        onClick={() => setNavOpen(true)}
                        className="flex flex-1 items-center justify-center rounded-full border border-cyan-400/30 bg-[#071330]/80 px-4 py-2 text-sm font-medium text-cyan-100 shadow-[0_0_28px_rgba(56,189,248,0.35)] transition hover:border-cyan-300/50 hover:bg-cyan-500/20"
                    >
                        {labels.sections ?? "Sections"}
                    </button>
                    <button
                        type="button"
                        onClick={() => setTocOpen(true)}
                        className="flex flex-1 items-center justify-center rounded-full border border-cyan-400/30 bg-[#071330]/80 px-4 py-2 text-sm font-medium text-cyan-100 shadow-[0_0_28px_rgba(56,189,248,0.35)] transition hover:border-cyan-300/50 hover:bg-cyan-500/20"
                    >
                        {labels.topics ?? "Topics"}
                    </button>
                </div>

                <aside className="hidden lg:col-start-1 lg:flex lg:flex-col lg:sticky lg:top-[calc(var(--header-offset)+1rem)] lg:max-h-[calc(100vh-var(--header-offset)-2rem)] lg:self-start">
                    <div className="relative h-full">
                        <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-cyan-300/15 bg-[#050b1d]/85 p-3 shadow-[0_18px_55px_rgba(20,80,160,0.18)] backdrop-blur-xl">
                            <div
                                aria-hidden
                                className="pointer-events-none absolute inset-0 rounded-3xl border border-white/8"
                            />
                            <div className="px-2 text-xs uppercase tracking-[0.24em] text-cyan-100/70">
                                {labels.sections ?? "Sections"}
                            </div>
                            <nav className="mt-4 flex-1 space-y-2 overflow-y-auto pr-2 text-sm">
                                {chapters.map((chapter) => {
                                    const isActive = chapter.id === activeChapter;
                                    return (
                                        <button
                                            key={chapter.id}
                                            type="button"
                                            onClick={() => handleChapterSelect(chapter.id)}
                                            className={cn(
                                                "w-full rounded-2xl border px-4 py-3 text-left transition",
                                                isActive
                                                    ? "border-cyan-300/60 bg-gradient-to-b from-cyan-400/35 via-cyan-500/12 to-transparent text-cyan-50 shadow-[0_22px_32px_-18px_rgba(56,189,248,0.65)] ring-1 ring-cyan-200/30"
                                                    : "border-transparent text-slate-200/80 hover:border-cyan-400/30 hover:bg-cyan-500/10 hover:text-cyan-100"
                                            )}
                                        >
                                            <div className="text-sm font-semibold leading-tight">
                                                {chapter.label ?? chapter.title}
                                            </div>
                                            {chapter.description ? (
                                                <div className="mt-1 text-xs text-slate-300/75">
                                                    {chapter.description}
                                                </div>
                                            ) : null}
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>
                    </div>
                </aside>

                <div className="relative min-w-0 md:col-span-1 lg:col-start-2">
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 -translate-y-1/3 rounded-[40px] bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_70%)] opacity-70 blur-3xl"
                    />
                    <div
                        ref={contentContainerRef}
                        className="relative overflow-hidden rounded-[32px] border border-white/8 bg-[#040914]/88 p-6 shadow-[0_35px_110px_rgba(4,9,28,0.35)] backdrop-blur-2xl md:p-7"
                    >
                        <div
                            aria-hidden
                            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_62%),radial-gradient(circle_at_bottom,_rgba(168,85,247,0.1),_transparent_60%)] opacity-75"
                        />
                        <div
                            aria-hidden
                            className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,_transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,_transparent_1px)] bg-[size:140px_140px] opacity-20"
                        />
                        <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={transition}
                                className="space-y-2.5"
                            >
                                <h2 className="bg-gradient-to-r from-cyan-100 via-sky-100 to-emerald-100 bg-clip-text text-2xl font-semibold text-transparent">
                                    {currentChapter?.title}
                                </h2>
                                {currentChapter?.description ? (
                                    <p className="text-base leading-relaxed text-slate-200/80">
                                        {currentChapter.description}
                                    </p>
                                ) : null}
                            </motion.div>

                            {currentSections.map((section, sectionIndex) => {
                                const sectionKey = `${currentChapter?.id ?? activeChapter}-${section.id}`;
                                const sectionNumber = String(sectionIndex + 1).padStart(2, "0");
                                const horizontalAccent =
                                    sectionIndex % 2 === 0
                                        ? "from-cyan-200/60 via-sky-200/30 to-transparent"
                                        : "from-fuchsia-200/60 via-violet-200/30 to-transparent";

                                return (
                                    <motion.article
                                        key={sectionKey}
                                        data-section-id={section.id}
                                        data-section-index={sectionIndex}
                                        ref={(node) => {
                                            if (node) {
                                                sectionRefs.current.set(section.id, node);
                                            } else {
                                                sectionRefs.current.delete(section.id);
                                            }
                                        }}
                                        id={section.id}
                                        className="scroll-mt-24"
                                        initial={{ opacity: 0, y: 18 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.3 }}
                                        transition={transition}
                                    >
                                        <div className="relative pl-6 md:pl-10">
                                            <div className="absolute left-1.5 top-6 bottom-6 hidden md:block w-[2px] rounded-full bg-gradient-to-b from-cyan-400/45 via-transparent to-emerald-400/45" />
                                            <div className="absolute left-1 top-6 hidden md:block h-2 w-2 rounded-full bg-cyan-300/80 shadow-[0_0_18px_rgba(34,211,238,0.8)]" />
                                            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.14),_transparent_65%),linear-gradient(135deg,rgba(6,14,29,0.88),rgba(4,10,24,0.9))] px-5 py-5 shadow-[0_32px_85px_rgba(6,16,36,0.45)] backdrop-blur-xl md:px-6 md:py-5">
                                                <div
                                                    aria-hidden
                                                    className="pointer-events-none absolute inset-px rounded-[26px] border border-white/6"
                                                />
                                                <div className="relative flex flex-col gap-3">
                                                    <div className="flex flex-col gap-3">
                                                        <div className="flex flex-wrap items-center gap-3">
                                                            <span className="inline-flex items-center rounded-full border border-cyan-200/35 bg-cyan-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.32em] text-cyan-100/70">
                                                                {sectionNumber}
                                                            </span>
                                                            <span
                                                                className={cn(
                                                                    "hidden h-px flex-1 rounded-full bg-gradient-to-r md:block",
                                                                    horizontalAccent
                                                                )}
                                                                aria-hidden
                                                            />
                                                        </div>
                                                        <h3 className="text-xl font-semibold leading-tight text-white md:text-2xl">
                                                            {section.title}
                                                        </h3>
                                                        {section.description ? (
                                                            <p className="text-base text-slate-200/75">
                                                                {section.description}
                                                            </p>
                                                        ) : null}
                                                    </div>
                                                    <div className="space-y-2.5 text-base text-slate-100/85">
                                                        {section.body.map((block, blockIndex) =>
                                                            renderBodyBlock(block, blockIndex)
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.article>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <aside className="hidden md:col-start-2 md:flex md:flex-col md:sticky md:top-[calc(var(--header-offset)+1rem)] md:max-h-[calc(100vh-var(--header-offset)-2rem)] md:self-start lg:col-start-3">
                    <div className="relative h-full">
                        <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-cyan-300/15 bg-[#050b1f]/85 p-3 shadow-[0_18px_55px_rgba(20,80,160,0.18)] backdrop-blur-xl">
                            <div
                                aria-hidden
                                className="pointer-events-none absolute inset-0 rounded-3xl border border-white/8"
                            />
                            <div className="px-2 text-xs uppercase tracking-[0.24em] text-cyan-100/70">
                                {labels.tableOfContents ?? "Table of contents"}
                            </div>
                            <nav className="mt-4 flex-1 space-y-1 overflow-y-auto pr-1">
                                {currentSections.map((section) => {
                                    const isActive = activeSection === section.id;
                                    return (
                                        <button
                                            key={`${currentChapter?.id ?? activeChapter}-${section.id}`}
                                            type="button"
                                            onClick={() => scrollToSection(section.id)}
                                            className={cn(
                                                "w-full rounded-2xl border px-4 py-2 text-left text-sm font-medium leading-tight transition",
                                                isActive
                                                    ? "border-cyan-300/60 bg-gradient-to-b from-cyan-400/35 via-cyan-500/12 to-transparent text-cyan-50 shadow-[0_22px_32px_-18px_rgba(56,189,248,0.6)]"
                                                    : "border-transparent text-slate-200/80 hover:border-cyan-400/30 hover:bg-cyan-500/10 hover:text-cyan-100"
                                            )}
                                        >
                                            {section.title}
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>
                    </div>
                </aside>

                <MobileDrawer
                    title={labels.sections ?? "Sections"}
                    closeLabel={labels.close ?? "Close"}
                    isOpen={navOpen}
                    onClose={() => setNavOpen(false)}
                >
                    <nav className="space-y-3">
                        {chapters.map((chapter) => (
                            <button
                                key={chapter.id}
                                type="button"
                                onClick={() => {
                                    handleChapterSelect(chapter.id);
                                    setNavOpen(false);
                                }}
                                className={cn(
                                    "w-full rounded-3xl border px-4 py-4 text-left transition",
                                    activeChapter === chapter.id
                                        ? "border-cyan-300/60 bg-gradient-to-b from-cyan-400/35 via-cyan-500/12 to-transparent text-cyan-50 shadow-[0_18px_28px_-20px_rgba(56,189,248,0.55)]"
                                        : "border-transparent bg-cyan-500/5 text-slate-200/85 hover:border-cyan-400/30 hover:bg-cyan-500/10 hover:text-cyan-100"
                                )}
                            >
                                <div className="text-base font-semibold">{chapter.label ?? chapter.title}</div>
                                {chapter.description ? (
                                    <div className="mt-1 text-sm text-slate-300/80">{chapter.description}</div>
                                ) : null}
                            </button>
                        ))}
                    </nav>
                </MobileDrawer>

                <MobileDrawer
                    title={labels.topics ?? "Topics"}
                    closeLabel={labels.close ?? "Close"}
                    isOpen={tocOpen}
                    onClose={() => setTocOpen(false)}
                >
                    <div className="space-y-4">
                        {currentChapter ? (
                            <div className="text-xs uppercase tracking-[0.24em] text-cyan-100/70">{currentChapter.title}</div>
                        ) : null}
                        <nav className="space-y-2">
                            {currentSections.map((section) => {
                                const isActive = activeSection === section.id;
                                return (
                                    <button
                                        key={`${currentChapter?.id ?? activeChapter}-${section.id}`}
                                        type="button"
                                        onClick={() => {
                                            scrollToSection(section.id);
                                            setTocOpen(false);
                                        }}
                                        className={cn(
                                            "w-full rounded-3xl border px-4 py-3 text-left text-base font-semibold transition",
                                            isActive
                                                ? "border-cyan-300/60 bg-gradient-to-b from-cyan-400/35 via-cyan-500/12 to-transparent text-cyan-50 shadow-[0_18px_28px_-20px_rgba(56,189,248,0.55)]"
                                                : "border-transparent bg-cyan-500/5 text-slate-200/85 hover:border-cyan-400/30 hover:bg-cyan-500/10 hover:text-cyan-100"
                                        )}
                                    >
                                        {section.title}
                                    </button>
                                );
                            })}
                        </nav>
                    </div>
                </MobileDrawer>
            </div>
        </div>
    );
};

export default EmailSecurityDocumentation;
