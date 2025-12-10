"use client";

import React from "react";
import clsx from "clsx";

const GlowButton = ({
  children,
  variant = "plain",
  glowColor = "#FF00B7",
  className = "",
  innerClassName = "",
  ...props
}) => {
  const isGlow = variant === "glow";

  const handlePointerMove = (e) => {
    const shell = e.currentTarget;
    const rect = shell.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    shell.style.setProperty("--x", `${x}px`);
    shell.style.setProperty("--y", `${y}px`);
  };

  const resetPointer = (e) => {
    e.currentTarget.style.setProperty("--x", "50%");
    e.currentTarget.style.setProperty("--y", "50%");
  };

  return (
    <div
      onMouseMove={handlePointerMove}
      onMouseLeave={resetPointer}
      className={clsx(
        "inline-flex rounded-full card-glow",
        isGlow
          ? "glow-button p-[3px] cursor-pointer"
          : "p-0 bg-transparent",
        className
      )}
      style={{
        "--glow-color": isGlow ? glowColor : "rgba(255,255,255,0.35)",
        "--glow-opacity": isGlow ? 0.6 : 0.2,
        "--glow-hover-opacity": isGlow ? 0.98 : 0.45,
      }}
      {...props}
    >
      <div
        className={clsx(
          "relative z-10 flex items-center justify-center whitespace-nowrap rounded-full bg-white text-lg font-semibold text-black",
          isGlow ? "px-10 py-4 transition-colors hover:bg-white" : "px-8 py-3",
          innerClassName
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default GlowButton;
