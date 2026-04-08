"use client";

import { useState } from "react";
import { FadeIn, StaggerItem } from "@/components/motion/fade-in";
import { VerticalFadeDivider } from "@/components/ui/vertical-fade-divider";
import { WavePathDivider } from "@/components/ui/wave-path-divider";
import { Brain, ShieldCheck, Settings } from "lucide-react";
import { hoverCellVerticalPadding } from "@/lib/hover-cell-padding";
import { fwUi, useLang } from "@/lib/i18n";
import { useIsMobile } from "@/lib/use-mobile";

const ROLE_ICONS = [Brain, ShieldCheck, Settings] as const;
const ROLE_COLOR = "rgba(255,255,255,0.45)";

export function UserRole() {
  const { t, lang } = useLang();
  const isMobile = useIsMobile();
  const metaFw = fwUi(lang, 500);
  const items = t.userRole.items.map((item, i) => ({
    icon: ROLE_ICONS[i] ?? Brain,
    meta: item.meta,
    label: item.label,
    color: ROLE_COLOR,
  }));

  const roleGridColumns = items
    .flatMap((_, i) => (i === 0 ? ["1fr"] : ["1px", "1fr"]))
    .join(" ");

  return (
    <section
      style={{
        padding: isMobile ? "clamp(5rem, 14vw, 6.5rem) 1.25rem" : "140px 120px",
        background: "#000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: isMobile ? "32px" : "48px",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: "800px" }}>
        <FadeIn>
          <h2
            style={{
              fontSize: isMobile ? "30px" : "44px",
              fontWeight: 300,
              letterSpacing: "-1.1px",
              lineHeight: 1.2,
              color: "rgba(255,255,255,0.5)",
              marginBottom: isMobile ? "12px" : "16px",
            }}
          >
            {t.userRole.line1}
          </h2>
        </FadeIn>
        <FadeIn delay={0.28}>
          <h2
            style={{
              fontSize: isMobile ? "30px" : "44px",
              fontWeight: 400,
              letterSpacing: "-1.1px",
              lineHeight: 1.2,
              color: "#fff",
            }}
          >
            {t.userRole.line2}
          </h2>
        </FadeIn>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : roleGridColumns,
          alignItems: "stretch",
          gap: 0,
          maxWidth: "960px",
          width: "100%",
        }}
      >
        {(isMobile
          ? items.flatMap((item, i) => {
              const col = (
                <RoleColumn key={`${item.meta}-${i}`} item={item} index={i} metaFontWeight={metaFw} />
              );
              if (i < items.length - 1) {
                return [
                  col,
                  <div key={`user-role-m-${i}`} style={{ gridColumn: "1 / -1", width: "100%" }}>
                    <WavePathDivider />
                  </div>,
                ];
              }
              return [col];
            })
          : items.flatMap((item, i) => {
              const col = (
                <RoleColumn key={`${item.meta}-${i}`} item={item} index={i} metaFontWeight={metaFw} />
              );
              if (i < items.length - 1) {
                return [col, <VerticalFadeDivider key={`user-role-div-${i}`} />];
              }
              return [col];
            }))}
      </div>
    </section>
  );
}

type RoleItem = {
  icon: (typeof ROLE_ICONS)[number];
  meta: string;
  label: string;
  color: string;
};

function RoleIconWrap({
  Icon,
  color,
}: {
  Icon: RoleItem["icon"];
  color: string;
}) {
  return (
    <div
      aria-hidden
      style={{
        lineHeight: 0,
        display: "flex",
        alignItems: "center",
        flexShrink: 0,
      }}
    >
      <Icon size={24} color={color} strokeWidth={1.5} />
    </div>
  );
}

function RoleColumn({
  item,
  index,
  metaFontWeight,
}: {
  item: RoleItem;
  index: number;
  metaFontWeight: number;
}) {
  const [hover, setHover] = useState(false);
  const inlinePad = "clamp(20px, 3vw, 36px)";

  return (
    <StaggerItem
      index={index}
      staggerDelay={0.18}
      distance={28}
      style={{ height: "100%", minHeight: 0, display: "flex" }}
    >
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          flex: 1,
          ...hoverCellVerticalPadding,
          paddingLeft: inlinePad,
          paddingRight: inlinePad,
          textAlign: "left",
          background: hover ? "rgba(255,255,255,0.05)" : "transparent",
          transition: "background 0.28s ease",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "16px",
          boxSizing: "border-box",
        }}
      >
        <span
          style={{
            display: "block",
            fontSize: "11px",
            fontWeight: metaFontWeight,
            letterSpacing: "0.2em",
            color: item.color,
            lineHeight: 1.3,
          }}
        >
          {item.meta}
        </span>
        <RoleIconWrap Icon={item.icon} color={item.color} />
        <span
          style={{
            fontSize: "clamp(17px, 1.8vw, 20px)",
            fontWeight: 400,
            color: "rgba(255,255,255,0.92)",
            lineHeight: 1.35,
          }}
        >
          {item.label}
        </span>
      </div>
    </StaggerItem>
  );
}
