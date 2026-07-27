import React from "react";
import { cn } from "@/lib/utils";

interface DealVantaLogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "dark" | "light" | "sidebar";
}

export function DealVantaLogo({
  className,
  iconOnly = false,
  size = "md",
  variant = "sidebar",
}: DealVantaLogoProps) {
  const sizes = {
    sm: { icon: "h-7 w-7", text: "text-lg" },
    md: { icon: "h-9 w-9", text: "text-xl" },
    lg: { icon: "h-11 w-11", text: "text-2xl" },
  };

  const textColor =
    variant === "sidebar" || variant === "dark"
      ? "text-white"
      : "text-slate-900 dark:text-white";

  const dColor =
    variant === "sidebar" || variant === "dark"
      ? "#FFFFFF"
      : "#111827";

  return (
    <div className={cn("flex items-center gap-3 select-none", className)}>
      {/* SVG Logo Mark based on official logo */}
      <svg
        className={cn(sizes[size].icon, "shrink-0 transition-transform hover:scale-105")}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Black/White 'D' structure */}
        <path
          d="M 20 16 H 55 C 75 16 88 28 88 48 C 88 64 78 76 60 80 L 46 66 C 58 64 66 56 66 46 C 66 34 57 28 46 28 H 36 V 90 H 20 V 16 Z"
          fill={dColor}
        />

        {/* Diagonal inner fold of the D */}
        <path
          d="M 36 68 L 52 50 L 64 62 L 46 80 Z"
          fill={dColor}
        />

        {/* Vibrant Blue Arrow (DV Growth) */}
        <path
          d="M 34 84 L 62 112 L 102 38 L 86 38 L 104 20 L 104 46 L 90 32 L 58 92 L 42 76 Z"
          fill="#2563EB"
        />
        {/* Bright blue highlight on arrow tip */}
        <path
          d="M 86 38 L 104 20 L 104 46 Z"
          fill="#3B82F6"
        />
      </svg>

      {/* Wordmark */}
      {!iconOnly && (
        <span className={cn("font-bold tracking-tight font-sans", sizes[size].text, textColor)}>
          Deal<span className="font-extrabold text-blue-500">Vanta</span>
        </span>
      )}
    </div>
  );
}
