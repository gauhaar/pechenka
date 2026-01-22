import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import EdgeGlowCard from './EdgeGlowCard';

const Insights = () => {
  const { t } = useLanguage();
  const items = [
    {
      icon: '🎯',
      title: t("insights.items.0.title", "39 seconds"),
      description: t("insights.items.0.description", "A hacker attack occurs every 39 seconds"),
    },
    {
      icon: '👥',
      title: t("insights.items.1.title", "20 million DDoS attacks"),
      description: t("insights.items.1.description", "20.5 million DDoS attacks in Q1 2025 alone"),
    },
    {
      icon: '⚡️',
      title: t("insights.items.2.title", "Every day"),
      description: t("insights.items.2.description", "30,000 websites are hacked daily"),
    },
  ];

  return (
    <div className="pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((insight, index) => (
            <EdgeGlowCard
              key={index}
              mode="static"
              outerClassName="rounded-3xl p-[2px]"
              innerClassName="glass-card p-6 text-center rounded-3xl"
              spotlight
              glowColor="#FF00B7"
              secondaryGlowColor="rgba(0,191,255,0.7)"
              topColor="#FF00B7"
              leftColor="#FF00B7"
              rightColor="rgba(0,191,255,0.7)"
              bottomColor="rgba(0,191,255,0.7)"
            >
              <div className="text-5xl mb-4">{insight.icon}</div>
              <p className="text-xl font-semibold text-white mb-2">{insight.description}</p>
            </EdgeGlowCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Insights;
