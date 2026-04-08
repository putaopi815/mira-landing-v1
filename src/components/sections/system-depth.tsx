"use client";

import { FadeIn, StaggerItem } from "@/components/motion/fade-in";
import { useState, type CSSProperties } from "react";
import { fwUi, useLang } from "@/lib/i18n";
import { useIsMobile } from "@/lib/use-mobile";

/** 三列列表块最大宽度（与标题区对齐，整块水平居中） */
const LAYERS_BLOCK_MAX_WIDTH = "min(800px, 100%)" as const;

/** 三行共用同一列宽；第三列 capped，配合 justifyContent:center 平衡左右留白 */
const ROW_GRID_ZH =
  "128px 100px minmax(0, min(440px, 1fr))" as const;
/** 中间列固定宽度，保证 “Decision Layer” 单行不换行 */
const ROW_GRID_EN = "128px 200px minmax(0, 1fr)" as const;

type LayerRowData = {
  badge: string;
  color: string;
  title: string;
  desc: string;
  hasBorder: boolean;
};

function LayerRow({
  layer,
  index,
  badgeFontWeight,
  gridTemplateColumns,
  columnGap,
  rowPaddingX,
  justifyGrid,
  isMobile,
}: {
  layer: LayerRowData;
  index: number;
  badgeFontWeight: number;
  gridTemplateColumns: string;
  columnGap: string;
  rowPaddingX: string;
  justifyGrid?: "center" | "start";
  isMobile?: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  const badgePillStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: isMobile ? "6px 14px 6px 0" : "6px 14px",
    borderRadius: "80px",
    background: `${layer.color}1A`,
    width: "fit-content",
    maxWidth: "100%",
    whiteSpace: "nowrap",
    transition: "transform 0.3s ease",
    transform: hovered ? "scale(1.05)" : "scale(1)",
    boxSizing: "border-box",
  };

  return (
    <StaggerItem index={index} staggerDelay={0.22} direction="left" distance={44}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={
          isMobile
            ? {
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                gap: "12px",
                width: "100%",
                padding: "18px 0",
                borderBottom: layer.hasBorder
                  ? "1px solid rgba(255,255,255,0.05)"
                  : "none",
                background: hovered ? "rgba(255,255,255,0.02)" : "transparent",
                borderRadius: "12px",
                transition: "background 0.3s ease",
                cursor: "default",
                boxSizing: "border-box",
              }
            : {
                display: "grid",
                gridTemplateColumns,
                columnGap,
                justifyContent: justifyGrid ?? "start",
                alignItems: "center",
                width: "100%",
                padding: `20px ${rowPaddingX}`,
                borderBottom: layer.hasBorder
                  ? "1px solid rgba(255,255,255,0.05)"
                  : "none",
                background: hovered ? "rgba(255,255,255,0.02)" : "transparent",
                borderRadius: "12px",
                transition: "background 0.3s ease",
                cursor: "default",
              }
        }
      >
        {/* Badge — 桌面：网格第一列；移动端：与下方标题/正文同一左缘（左 padding 去掉，圆点与标题首字对齐） */}
        <div style={isMobile ? badgePillStyle : { ...badgePillStyle, justifySelf: "start" }}>
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: layer.color,
              flexShrink: 0,
              boxShadow: hovered ? `0 0 8px 2px ${layer.color}50` : "none",
              transition: "box-shadow 0.3s ease",
            }}
          />
          <span
            style={{
              fontSize: "13px",
              fontWeight: badgeFontWeight,
              color: layer.color,
            }}
          >
            {layer.badge}
          </span>
        </div>

        <h3
          style={{
            fontSize: isMobile ? "clamp(1.125rem, 4vw, 1.375rem)" : "22px",
            color: "#fff",
            margin: 0,
            justifySelf: isMobile ? undefined : "start",
            lineHeight: 1.2,
            textAlign: "left",
            whiteSpace: isMobile ? "normal" : "nowrap",
            overflow: isMobile ? "visible" : "hidden",
            textOverflow: isMobile ? "clip" : "ellipsis",
            minWidth: 0,
            width: isMobile ? "100%" : undefined,
          }}
        >
          {layer.title}
        </h3>

        <div
          className={isMobile ? undefined : "paradigm-subline-scroll"}
          style={{
            minWidth: 0,
            overflowX: isMobile ? "visible" : "auto",
            overflowY: "hidden",
            textAlign: "left",
            scrollbarWidth: isMobile ? undefined : "none",
            msOverflowStyle: isMobile ? undefined : "none",
            width: isMobile ? "100%" : undefined,
          }}
        >
          <p
            style={{
              fontSize: isMobile ? "15px" : "clamp(11px, 1.35vw, 15px)",
              lineHeight: 1.45,
              color: hovered ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.5)",
              transition: "color 0.3s ease",
              whiteSpace: isMobile ? "normal" : "nowrap",
              display: isMobile ? "block" : "inline-block",
              margin: 0,
              width: isMobile ? "100%" : undefined,
            }}
          >
            {layer.desc}
          </p>
        </div>
      </div>
    </StaggerItem>
  );
}

export function SystemDepth() {
  const { t, lang } = useLang();
  const isMobile = useIsMobile();
  const badgeFw = fwUi(lang, 500);

  const rowGrid = isMobile ? "1fr" : lang === "zh" ? ROW_GRID_ZH : ROW_GRID_EN;
  const rowJustify: "center" | "start" = isMobile ? "start" : lang === "zh" ? "center" : "start";

  const layers: LayerRowData[] = t.systemDepth.layers.map((l, i) => ({
    badge: l.badge,
    title: l.title,
    desc: l.desc,
    color: i === 0 ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.5)",
    hasBorder: i < t.systemDepth.layers.length - 1,
  }));

  return (
    <section
      id="system"
      style={{
        padding: isMobile ? "clamp(5rem, 14vw, 6.5rem) 1.25rem" : "96px clamp(24px, 5vw, 72px)",
        background: "#000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: isMobile ? "28px" : "40px",
        borderTop: "1px solid transparent",
        borderImage: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08) 50%, transparent) 1",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", maxWidth: "800px" }}>
        <FadeIn>
          <p
            style={{
              fontSize: "12px",
              fontWeight: badgeFw,
              letterSpacing: "3px",
              color: "rgba(255,255,255,0.35)",
              marginBottom: isMobile ? "8px" : "10px",
            }}
          >
            {t.systemDepth.eyebrow}
          </p>
        </FadeIn>
        <FadeIn delay={0.18}>
          <h2
            style={{
              fontSize: isMobile ? "32px" : "48px",
              fontWeight: 400,
              letterSpacing: "-1.2px",
              lineHeight: 1.2,
              color: "#fff",
            }}
          >
            {t.systemDepth.title[0]}
            <br />
            {t.systemDepth.title[1]}
          </h2>
        </FadeIn>
      </div>

      {/* 三行架构：限定最大宽度并水平居中 */}
      <div
        style={{
          width: "100%",
          maxWidth: LAYERS_BLOCK_MAX_WIDTH,
          marginInline: "auto",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {layers.map((layer, i) => (
          <LayerRow
            key={layer.badge}
            layer={layer}
            index={i}
            badgeFontWeight={badgeFw}
            gridTemplateColumns={rowGrid}
            columnGap={isMobile ? "0" : "6px"}
            rowPaddingX={isMobile ? "0" : "16px"}
            justifyGrid={rowJustify}
            isMobile={isMobile}
          />
        ))}
      </div>
    </section>
  );
}
