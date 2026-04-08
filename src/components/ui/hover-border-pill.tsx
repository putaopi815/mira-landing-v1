"use client";

import { useState } from "react";
import type { Lang } from "@/lib/i18n";
import { fwUi } from "@/lib/i18n";

const HOVER_SCALE = 1.045;

/**
 * How it works 步骤胶囊：hover 用 transform 放大，不占布局宽度，避免挤动箭头/相邻胶囊。
 * 字重保持恒定（不再 hover 加粗），避免占位变宽挤动相邻元素。
 */
export function HoverBorderPill({ label, lang }: { label: string; lang: Lang }) {
  const [hovered, setHovered] = useState(false);
  const fw = fwUi(lang, 400);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "default",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "12px 24px",
          borderRadius: 80,
          background: hovered ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)",
          border: hovered
            ? "1px solid rgba(255,255,255,0.18)"
            : "1px solid rgba(255,255,255,0.1)",
          transition:
            "transform 0.28s ease, background 0.3s ease, border-color 0.3s ease",
          transform: hovered ? `scale(${HOVER_SCALE})` : "scale(1)",
          transformOrigin: "50% 50%",
          willChange: "transform",
        }}
      >
        <span
          style={{
            fontSize: "15px",
            fontWeight: fw,
            color: hovered ? "#fff" : "rgba(255,255,255,0.8)",
            transition: "color 0.2s ease",
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
