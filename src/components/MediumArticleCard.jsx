"use client";

import React from "react";
import Image from "next/image";
import EdgeGlowCard from "@/components/EdgeGlowCard";

/**
 * MediumArticleCard Component
 * Displays a Medium article with image, title, description, and metadata
 */
export default function MediumArticleCard({ article, index = 0 }) {
  const glowColors = ["#8B5CF6", "#EC4899", "#3B82F6", "#10B981"];
  const glowColor = glowColors[index % glowColors.length];

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full"
    >
      <EdgeGlowCard
        mode="static"
        glowColor={glowColor}
        secondaryGlowColor="rgba(255,255,255,0.2)"
        outerClassName="group h-full rounded-3xl p-[1px]"
        innerClassName="rounded-[23px] bg-black/40 h-full transition duration-300 hover:bg-black/60 relative overflow-hidden"
      >
        {/* Hover Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none" />

        <div className="relative z-10 h-full flex flex-col">
          {/* Article Image */}
          <div className="relative w-full h-48 overflow-hidden rounded-t-[22px]">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          {/* Article Content */}
          <div className="p-6 flex flex-col flex-grow gap-3">
            {/* Meta info */}
            <div className="flex items-center gap-3 text-xs text-white/60">
              <span>{article.date}</span>
              <span>•</span>
              <span>{article.readTime}</span>
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-white line-clamp-2 group-hover:text-blue-300 transition-colors">
              {article.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-white/70 line-clamp-3 flex-grow">
              {article.description}
            </p>

            {/* Read more link */}
            <div className="mt-auto pt-4 flex items-center gap-2 text-sm font-semibold text-blue-300 group-hover:text-white transition-colors">
              Read on Medium
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </div>
          </div>
        </div>
      </EdgeGlowCard>
    </a>
  );
}
