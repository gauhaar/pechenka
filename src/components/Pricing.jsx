"use client";

import React, { useState } from "react";
import GlowButton from "./GlowButton";
import TooltipCard from "./TooltipCard";
import EdgeGlowCard from "./EdgeGlowCard";
import CurrencySelector, { convertPrice, formatPrice } from "./CurrencySelector";
import { useLanguage } from "@/contexts/LanguageContext";

const USD_TO_KZT = 500;

// Pricing data with USD base values
const PRICING_DATA = {
  globalShield: {
    priceUSD: 0.06,
    priceUnit: "/GB",
  },
  emailProtector: {
    priceUSD: 10,
    priceUnit: "/month/account",
    additionalPriceUSD: 0.035,
    additionalUnit: "/email",
  },
};

const PLAN_CONFIG = [
  {
    id: "globalShield",
    priceKey: "pricing.plans.globalShield.price",
    descriptionKey: "pricing.plans.globalShield.description",
    buttonKey: "pricing.plans.globalShield.button",
    features: [
      { id: "webProtection" },
      { id: "ddosProtection" },
      { id: "cmc", tooltip: "cmc-global-traffic" },
      { id: "country", tooltip: "country-blacklisting" },
      { id: "port", tooltip: "port-management" },
    ],
  },
  {
    id: "emailProtector",
    priceKey: "pricing.plans.emailProtector.price",
    descriptionKey: "pricing.plans.emailProtector.description",
    buttonKey: "pricing.plans.emailProtector.button",
    features: [
      { id: "cmcEmail", tooltip: "cmc-email-visualizer" },
      { id: "visibility" },
      { id: "webClient" },
      { id: "phishing" },
      { id: "malware" },
      { id: "links" },
      { id: "spam" },
      { id: "fakeSender" },
    ],
  },
];

const TOOLTIP_KEYS = [
  "cmc-global-traffic",
  "country-blacklisting",
  "port-management",
  "cmc-email-visualizer",
];

const Pricing = ({ onOpenModal }) => {
  const { t } = useLanguage();
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [activeCardIndex, setActiveCardIndex] = useState(null);
  const [currency, setCurrency] = useState("USD");

  const tooltipContent = TOOLTIP_KEYS.reduce((acc, key) => {
    const dictionaryKey = mapTooltipKeyToDictionaryKey(key);
    
    // Tooltip fallbacks
    const tooltipFallbacks = {
      cmcGlobal: {
        title: "CMC with global traffic monitoring",
        content: "The Centralized Management Console (CMC) seamlessly integrates with other security systems and uses the same domain and interface as Global Shield and Security Tester. Here you can block countries, close ports, and manage security at scale."
      },
      countryBlacklisting: {
        title: "Country blocking",
        content: "Block all traffic originating from a selected country."
      },
      portManagement: {
        title: "Port management",
        content: "Close unused ports to reduce the attack surface (e.g., disable port 22 if SSH is not needed)."
      },
      cmcEmail: {
        title: "CMC with advanced email visualization",
        content: "CMC is integrated with other security systems and allows monitoring email flows and viewing emails of all added corporate users."
      }
    };
    
    const fallback = tooltipFallbacks[dictionaryKey] || { title: dictionaryKey, content: "" };
    
    acc[key] = {
      title: t(`pricing.tooltips.${dictionaryKey}.title`, fallback.title),
      content: t(`pricing.tooltips.${dictionaryKey}.content`, fallback.content),
    };
    return acc;
  }, {});

  const formatDescription = (text, planId) => {
    if (!text) return null;
    const parts = text.split("\n");
    return parts.map((line, index) => {
      // Convert price in description if it contains a dollar amount
      let displayLine = line;
      if (currency === "KZT" && planId === "emailProtector" && line.includes("$0.035")) {
        const kztPrice = (0.035 * USD_TO_KZT).toFixed(0);
        displayLine = line.replace("$0.035", `${kztPrice} ₸`);
      }
      return (
        <span key={index}>
          {displayLine}
          {index < parts.length - 1 && <br />}
        </span>
      );
    });
  };

  const getPriceDisplay = (planId) => {
    const pricingInfo = PRICING_DATA[planId];
    if (!pricingInfo) return t(`pricing.plans.${planId}.price`);
    
    if (currency === "USD") {
      return `$${pricingInfo.priceUSD}${pricingInfo.priceUnit}`;
    } else {
      const kztPrice = pricingInfo.priceUSD * USD_TO_KZT;
      return `${kztPrice.toLocaleString()} ₸${pricingInfo.priceUnit}`;
    }
  };

  return (
    <section className="w-full pt-14 sm:pt-22 relative px-4 sm:px-6 lg:px-8">
      <h2 className="absolute top-[-1.5rem] sm:top-2 lg:-top-12 left-0 w-full text-[72px] sm:text-[120px] lg:text-[200px] font-bold text-white text-center z-0 pointer-events-none px-6 leading-none">
        {t("pricing.title", "Pricing")}
      </h2>

      <div className="container mx-auto max-w-7xl">
        {/* Currency Selector */}
        <div className="flex justify-end mb-6 relative z-20">
          <CurrencySelector currency={currency} onCurrencyChange={setCurrency} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 relative z-10 justify-items-center">
          {PLAN_CONFIG.map((plan, index) => {
            const title = t(`pricing.plans.${plan.id}.title`, 
              plan.id === 'globalShield' ? 'Web Security and Traffic Management' : 'Email Security and Visualization'
            );
            const price = getPriceDisplay(plan.id);
            const description = t(plan.descriptionKey, 
              plan.id === 'globalShield' ? 'No limits\nNo additional charges' : 'Up to 10 emails per day\nAdditional: $0.035 per email'
            );
            const buttonText = t(plan.buttonKey,
              plan.id === 'globalShield' ? 'Protect web applications and API' : 'Protect email'
            );

            return (
              <EdgeGlowCard
                key={plan.id}
                mode="static"
                animateOnView={false}
                outerClassName={`rounded-3xl p-[2px] transition-all duration-300 no-hover-glow ${activeCardIndex === index ? "z-20" : ""}`}
                innerClassName="glass-card pricing-card p-6 flex flex-col h-full relative rounded-3xl"
                innerStyle={{
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  backgroundColor: "rgba(0, 0, 0, 0.55)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                }}
                glowColor="#FF00B7"
                secondaryGlowColor="rgba(0,191,255,0.7)"
                topColor="#FF00B7"
                leftColor="#FF00B7"
                rightColor="rgba(0,191,255,0.7)"
                bottomColor="rgba(0,191,255,0.7)"
              >
                <div className="text-center mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{title}</h3>
                  <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{price}</div>
                  {plan.descriptionTooltip ? (
                    <div className="text-gray-300 text-sm mb-2 flex items-start sm:items-center gap-2 justify-center text-center sm:text-left">
                      <span>{formatDescription(description, plan.id)}</span>
                      <div
                        className="relative hidden sm:flex h-5 w-5 items-center justify-center"
                        onMouseEnter={() => {
                          setActiveTooltip(plan.descriptionTooltip);
                          setActiveCardIndex(index);
                        }}
                        onMouseLeave={() => {
                          setActiveTooltip(null);
                          setActiveCardIndex(null);
                        }}
                      >
                        <svg
                          className="w-4 h-4 text-gray-400 cursor-help"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                        {activeTooltip === plan.descriptionTooltip && tooltipContent[plan.descriptionTooltip] && (
                          <TooltipCard className="z-[9999] w-72 sm:w-80 max-w-[calc(100vw-3rem)] rounded-lg border border-white/20 bg-black p-4 text-white shadow-2xl">
                            <h4 className="mb-2 font-bold text-white">
                              {tooltipContent[plan.descriptionTooltip].title}
                            </h4>
                            <p className="text-sm text-gray-200">
                              {tooltipContent[plan.descriptionTooltip].content}
                            </p>
                          </TooltipCard>
                        )}
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-300 text-sm mb-2">{formatDescription(description, plan.id)}</p>
                  )}
                </div>

                <div className="flex-1 mb-6">
                  <ul className="space-y-2">
                    {plan.features.map((feature) => {
                      const tooltipId = feature.tooltip;
                      
                      // Feature label fallbacks
                      const featureFallbacks = {
                        globalShield: {
                          webProtection: "Protection against all types of web attacks except business logic exploitation",
                          ddosProtection: "Real-time DDoS protection",
                          cmc: "CMC with global traffic monitoring",
                          country: "Country blocking",
                          port: "Port closing"
                        },
                        emailProtector: {
                          cmcEmail: "CMC with advanced email flow visualizer",
                          visibility: "Full visibility of incoming and outgoing emails for all accounts in CMC with automatic threat categorization",
                          webClient: "Secure web client",
                          phishing: "Phishing protection",
                          malware: "Malicious attachment checking",
                          links: "Dangerous link detection",
                          spam: "Spam filtering",
                          fakeSender: "Fake sender protection"
                        }
                      };
                      
                      const fallback = featureFallbacks[plan.id]?.[feature.id] || feature.id;
                      const label = t(`pricing.plans.${plan.id}.features.${feature.id}`, fallback);

                      return (
                        <li
                          key={feature.id}
                          className="flex items-start sm:items-center gap-2 text-white text-sm sm:text-base"
                        >
                          <svg
                            className="w-4 h-4 text-green-500 flex-shrink-0 mt-1 sm:mt-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          <span className="flex-1 leading-snug">{label}</span>
                          {tooltipId && tooltipContent[tooltipId] && (
                            <div
                              className="relative hidden sm:flex h-5 w-5 items-center justify-center"
                              onMouseEnter={() => {
                                setActiveTooltip(tooltipId);
                                setActiveCardIndex(index);
                              }}
                              onMouseLeave={() => {
                                setActiveTooltip(null);
                                setActiveCardIndex(null);
                              }}
                            >
                              <svg
                                className="w-4 h-4 text-gray-400 cursor-help"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                ></path>
                              </svg>
                              {activeTooltip === tooltipId && (
                                <TooltipCard className="z-[9999] w-72 sm:w-80 max-w-[calc(100vw-3rem)] rounded-lg border border-white/20 bg-black p-4 text-white shadow-2xl">
                                  <h4 className="mb-2 font-bold text-white">{tooltipContent[tooltipId].title}</h4>
                                  <p className="text-sm text-gray-200">{tooltipContent[tooltipId].content}</p>
                                </TooltipCard>
                              )}
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <GlowButton
                  className="mt-auto self-center w-[80%] max-w-[320px]"
                  innerClassName="w-full justify-center px-10 py-4"
                  onClick={onOpenModal}
                >
                  {t("pricingCta.requestSystem", "Request System")}
                </GlowButton>
              </EdgeGlowCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const mapTooltipKeyToDictionaryKey = (key) => {
  switch (key) {
    case "cmc-global-traffic":
      return "cmcGlobal";
    case "country-blacklisting":
      return "countryBlacklisting";
    case "port-management":
      return "portManagement";
    case "cmc-email-visualizer":
      return "cmcEmail";
    case "dynamic-vulnerability":
      return "dynamicVulnerability";
    case "code-analyzer":
      return "codeAnalyzer";
    case "intelligence-report":
      return "intelligenceReport";
    case "full-vulnerability-check":
      return "fullVulnerability";
    default:
      return key;
  }
};

export default Pricing;
