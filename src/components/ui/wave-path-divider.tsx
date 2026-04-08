"use client";

import { cn } from "@/lib/utils";
import type { CSSProperties } from "react";

type WavePathDividerProps = {
  className?: string;
  style?: CSSProperties;
};

/** 与最初 Problem 区块分割线一致：静态 1px 横向渐变，无动效 */
export function WavePathDivider({ className, style }: WavePathDividerProps) {
  return (
    <div
      className={cn("w-full shrink-0", className)}
      style={{
        width: "100%",
        height: "1px",
        background:
          "linear-gradient(90deg, transparent, rgba(255,255,255,0.25) 50%, transparent)",
        ...style,
      }}
    />
  );
}
