"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import GlowButton from "./GlowButton";
import LanguageSelector from "./LanguageSelector";
import ComingSoonModal from "./ComingSoonModal";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePathname } from "next/navigation";

const SCROLL_THRESHOLD = 10;
const DESKTOP_WIDTH = 1130;

const Header = ({ onOpenModal }) => {
  const pathname = usePathname();
  const isMainPage = pathname === "/";
  const isSlncEnvPage = pathname === "/slnc-env";
  const [isCondensed, setIsCondensed] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [comingSoonOpen, setComingSoonOpen] = useState(false);
  const { t } = useLanguage();

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact-form");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= DESKTOP_WIDTH);
    };

    const handleScroll = () => {
      setIsCondensed(window.scrollY > SCROLL_THRESHOLD);
    };

    handleResize();
    handleScroll();

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  const widthTarget = "100%";

  const condensedShift = isCondensed ? (isDesktop ? 24 : 16) : 0;

  const navItems = [
    { key: "mail", label: t("header.nav.mail"), onClick: () => setComingSoonOpen(true) },
    {
      key: "affiliate",
      label: t("header.nav.affiliate"),
      href: "/affiliate",
    },
    {
      key: "instructions",
      label: t("header.nav.instructions"),
      onClick: () => setComingSoonOpen(true),
    },
    {
      key: "product",
      label: t("header.nav.product"),
      href: "/ai-soc",
    },
    {
      key: "secure-development",
      label: t("header.nav.secureDevelopment"),
      href: "/slnc-env",
    },
  ];

  return (
    <>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={toggleMobileMenu}
          >
            <motion.div
              className="absolute inset-0 px-6 pt-24 pb-16"
              initial={{ y: -80 }}
              animate={{ y: 0 }}
              exit={{ y: -80 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <nav className="mx-auto flex max-w-sm flex-col space-y-6 text-lg">
                {navItems.map((item) =>
                  item.href ? (
                    <Link
                      key={item.key}
                      href={item.href}
                      className="nav-link border-b border-white/20 py-2 text-white"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      key={item.key}
                      type="button"
                      className="nav-link border-b border-white/20 py-2 text-white text-left bg-transparent appearance-none focus:outline-none"
                      onClick={() => {
                        if (item.onClick) item.onClick();
                        else if (item.opensModal) onOpenModal?.();
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      {item.label}
                    </button>
                  )
                )}
                <div className="pt-4 flex flex-col gap-4">
                  <LanguageSelector align="left" />
                  {!isMainPage && (
                    <GlowButton
                      onClick={() => {
                        onOpenModal?.();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full"
                    >
                      {isSlncEnvPage ? t("header.cta.download") : t("header.cta.requestDemo")}
                    </GlowButton>
                  )}
                </div>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.header
        className="fixed left-0 top-2 z-50 w-full px-3"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <motion.div
          className="mx-auto w-full max-w-7xl rounded-full border border-transparent transition-colors"
          animate={{
            width: widthTarget,
            borderRadius: 9999,
            backgroundColor: isCondensed ? "rgba(0,0,0,0.55)" : "rgba(0,0,0,0)",
            borderColor: isCondensed ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0)",
            backdropFilter: isCondensed ? "blur(16px)" : "blur(0px)",
          }}
          transition={{
            width: { duration: 0.3, ease: "easeOut" },
            borderRadius: { duration: 0.3, ease: "easeOut" },
            backgroundColor: { duration: 0.3, ease: "easeOut" },
            borderColor: { duration: 0.3, ease: "easeOut" },
            backdropFilter: { duration: 0.3, ease: "easeOut" },
          }}
          style={{ minWidth: isDesktop || isCondensed ? undefined : "100%" }}
        >
          <motion.div
            className="flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8"
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <motion.div
              className="flex items-center"
              animate={{ x: condensedShift }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Link href="/" className="flex items-center">
                <Image
                  src="/logo.svg"
                  alt="Company Logo"
                  width={100}
                  height={50}
                  style={{ height: "auto", maxWidth: "120px" }}
                />
              </Link>
            </motion.div>

            <nav
              className={clsx(
                "relative items-center space-x-8",
                isDesktop ? "flex" : "hidden"
              )}
            >
              {navItems.map((item) =>
                item.href ? (
                  <Link
                    key={item.key}
                    href={item.href}
                    className="nav-link text-white bg-transparent appearance-none focus:outline-none"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    key={item.key}
                    type="button"
                    className="nav-link text-white bg-transparent appearance-none focus:outline-none"
                    onClick={item.onClick || (item.opensModal ? onOpenModal : undefined)}
                  >
                    {item.label}
                  </button>
                )
              )}
            </nav>

            <div className="flex items-center gap-3">
              <motion.div
                className="flex items-center gap-3"
                animate={{ x: -condensedShift }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div
                  className="flex-shrink-0"
                  style={
                    !isDesktop
                      ? { transform: "scale(0.9)", transformOrigin: "right center" }
                      : undefined
                  }
                >
                  <LanguageSelector align={isDesktop ? "right" : "left"} />
                </div>
                {isDesktop && isMainPage && (
                  <GlowButton onClick={scrollToContact}>
                    {t("header.cta.contact")}
                  </GlowButton>
                )}
                {isDesktop && !isMainPage && (
                  <GlowButton onClick={onOpenModal}>
                    {isSlncEnvPage ? t("header.cta.download") : t("header.cta.requestDemo")}
                  </GlowButton>
                )}
              </motion.div>

              <motion.button
                className={clsx("p-2 text-white", isDesktop ? "hidden" : "inline-flex")}
                onClick={toggleMobileMenu}
                animate={{ x: -condensedShift }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </motion.header>
      <ComingSoonModal isOpen={comingSoonOpen} onClose={() => setComingSoonOpen(false)} />
    </>
  );
};

export default Header;
