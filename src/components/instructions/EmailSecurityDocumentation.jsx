"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

const calloutClassMap = {
    info: "border border-cyan-400/40 bg-cyan-500/10 text-cyan-100 shadow-[0_0_40px_rgba(34,211,238,0.28)]",
    warning: "border border-amber-400/40 bg-amber-500/10 text-amber-100 shadow-[0_0_40px_rgba(245,158,11,0.25)]",
    success: "border border-emerald-400/40 bg-emerald-500/10 text-emerald-100 shadow-[0_0_40px_rgba(16,185,129,0.25)]",
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
            <p key={`paragraph-${blockIndex}`} className="text-[15px] leading-relaxed text-slate-100/85">
                {block.content}
            </p>
        );
    }

    if (block.type === "list") {
        return (
            <div key={`list-${blockIndex}`} className="space-y-2">
                {block.title ? (
                    <div className="text-xs uppercase tracking-[0.3em] text-cyan-200/70">{block.title}</div>
                ) : null}
                <ul className="space-y-2 rounded-2xl border border-cyan-400/15 bg-[#061121]/80 px-4 py-3 text-[15px] text-slate-100/85 marker:text-cyan-300">
                    {block.items.map((item, itemIndex) => (
                        <li key={`list-item-${blockIndex}-${itemIndex}`} className="list-disc leading-relaxed">
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    if (block.type === "orderedList") {
        return (
            <div key={`ordered-${blockIndex}`} className="space-y-2">
                <ol className="space-y-2 rounded-2xl border border-slate-400/15 bg-[#070c1a]/80 px-4 py-3 text-[15px] text-slate-100/85 marker:text-cyan-200">
                    {block.items.map((item, itemIndex) => (
                        <li key={`ordered-item-${blockIndex}-${itemIndex}`} className="list-decimal leading-relaxed">
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
                className="overflow-x-auto rounded-2xl border border-cyan-400/20 bg-[#030712]/95 px-4 py-3 font-mono text-sm text-cyan-100 shadow-[inset_0_0_35px_rgba(8,145,178,0.35)]"
            >
                <code>{block.content}</code>
            </pre>
        );
    }

    if (block.type === "callout") {
        return (
            <div
                key={`callout-${blockIndex}`}
                className={cn("rounded-2xl px-4 py-3 text-[15px] leading-relaxed", calloutClassMap[block.intent ?? "info"])}
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
        const firstSectionId = currentSections[0]?.id ?? "";
        setActiveSection(firstSectionId);
        scrollToContentTop("auto");
    }, [currentSections, scrollToContentTop]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (isProgrammaticScrollRef.current) return;

                const visibleEntry = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => a.target.dataset.sectionIndex - b.target.dataset.sectionIndex)[0];

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

            <div className="relative mx-auto grid w-full max-w-[1400px] gap-6 px-3 pb-16 pt-6 md:grid-cols-[minmax(0,1fr)_minmax(260px,320px)] lg:grid-cols-[260px_minmax(0,1fr)_minmax(0,320px)] lg:gap-10 lg:px-6">
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

                <aside className="hidden lg:sticky lg:top-24 lg:col-start-1 lg:row-span-full lg:row-start-1 lg:flex lg:flex-col">
                    <div className="relative">
                        <div className="group relative flex max-h-[78vh] flex-col overflow-hidden rounded-3xl border border-cyan-400/20 bg-[linear-gradient(145deg,rgba(5,10,24,0.9),rgba(7,16,32,0.92))] p-3 shadow-[0_0_65px_rgba(56,189,248,0.25)] backdrop-blur-xl">
                            <div
                                aria-hidden
                                className="pointer-events-none absolute inset-0 rounded-3xl border border-white/5"
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
                                                    ? "border-cyan-300/60 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.35),_rgba(8,47,73,0.65))] text-cyan-50 shadow-[0_0_45px_rgba(56,189,248,0.55)] ring-1 ring-cyan-200/40"
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

                <div className="relative min-w-0 md:col-span-1 lg:col-start-2 lg:row-start-1">
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 -translate-y-1/3 rounded-[40px] bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.24),_transparent_65%)] opacity-80 blur-3xl"
                    />
                    <div
                        ref={contentContainerRef}
                        className="relative overflow-hidden rounded-[32px] border border-cyan-400/25 bg-[linear-gradient(135deg,rgba(6,12,24,0.92),rgba(3,7,16,0.94))] p-6 shadow-[0_0_95px_rgba(12,74,110,0.45)] backdrop-blur-xl"
                    >
                        <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={transition}
                                className="space-y-2"
                            >
                                <h2 className="bg-gradient-to-r from-cyan-100 via-sky-100 to-emerald-100 bg-clip-text text-2xl font-semibold text-transparent">
                                    {currentChapter?.title}
                                </h2>
                                {currentChapter?.description ? (
                                    <p className="text-sm text-slate-300/85">{currentChapter.description}</p>
                                ) : null}
                            </motion.div>

                            {currentSections.map((section, sectionIndex) => (
                                <motion.article
                                    key={`${currentChapter?.id ?? activeChapter}-${section.id}`}
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
                                    initial={{ opacity: 0, y: 12 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.4 }}
                                    transition={transition}
                                >
                                    <Card className="group relative overflow-hidden border border-cyan-400/15 bg-[linear-gradient(135deg,rgba(9,16,32,0.86),rgba(6,13,28,0.92))] p-6 text-white shadow-[0_0_65px_rgba(11,68,98,0.45)] backdrop-blur transition-shadow duration-500 hover:border-cyan-300/40 hover:shadow-[0_0_90px_rgba(56,189,248,0.55)]">
                                        <div
                                            aria-hidden
                                            className="pointer-events-none absolute inset-x-[-1px] -top-[1px] h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent opacity-80"
                                        />
                                        <div className="relative flex flex-col gap-2">
                                            <div className="flex items-center justify-between gap-4">
                                                <h3 className="text-lg font-semibold leading-tight text-white">
                                                    {section.title}
                                                </h3>
                                            </div>
                                        </div>
                                        <div className="mt-4 space-y-4">
                                            {section.body.map((block, blockIndex) => renderBodyBlock(block, blockIndex))}
                                        </div>
                                    </Card>
                                </motion.article>
                            ))}
                        </div>
                    </div>
                </div>

                <aside className="hidden md:sticky md:top-24 md:col-start-2 md:row-span-full md:row-start-1 md:flex md:flex-col lg:col-start-3 lg:row-start-1">
                    <div className="relative">
                        <div className="group relative flex max-h-[78vh] flex-col overflow-hidden rounded-3xl border border-cyan-400/20 bg-[linear-gradient(150deg,rgba(7,15,30,0.88),rgba(3,8,18,0.95))] p-3 shadow-[0_0_65px_rgba(56,189,248,0.25)] backdrop-blur-xl">
                            <div
                                aria-hidden
                                className="pointer-events-none absolute inset-0 rounded-3xl border border-white/5"
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
                                                    ? "border-cyan-300/60 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.35),_rgba(8,47,73,0.6))] text-cyan-50 shadow-[0_0_40px_rgba(56,189,248,0.5)]"
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
                                        ? "border-cyan-300/60 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.35),_rgba(8,47,73,0.6))] text-cyan-50"
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
                                                ? "border-cyan-300/60 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.35),_rgba(8,47,73,0.6))] text-cyan-50"
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
