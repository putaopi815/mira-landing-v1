"use client";

import { useState } from "react";
import { FadeIn, StaggerItem } from "@/components/motion/fade-in";
import { WavePathDivider } from "@/components/ui/wave-path-divider";
import { Timer, Send, Globe, Sparkles } from "lucide-react";
import { hoverCellVerticalPadding } from "@/lib/hover-cell-padding";
import { fwUi, useLang } from "@/lib/i18n";
import { useIsMobile } from "@/lib/use-mobile";

const DIFF_ICONS = [Timer, Send, Globe, Sparkles] as const;
const DIFF_COLOR = "rgba(255,255,255,0.45)";

/** 竖线：上下尖端渐隐，中段与横线交叉处保持实色 */
const gridVerticalFade =
  "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.13) 11%, rgba(255,255,255,0.13) 89%, transparent 100%)";
/** 横线：左右尖端渐隐，中段与竖线交叉处保持实色 */
const gridHorizontalFade =
  "linear-gradient(to right, transparent 0%, rgba(255,255,255,0.13) 11%, rgba(255,255,255,0.13) 89%, transparent 100%)";

type DiffRow = {
  icon: (typeof DIFF_ICONS)[number];
  color: string;
  title: string;
  desc: string;
};

export function Differentiators() {
  const { t, lang } = useLang();
  const isMobile = useIsMobile();
  const diffs: DiffRow[] = t.differentiators.items.map((item, i) => ({
    icon: DIFF_ICONS[i] ?? Timer,
    color: DIFF_COLOR,
    title: item.title,
    desc: item.desc,
  }));

  return (
    <section
      style={{
        padding: isMobile ? "clamp(5rem, 14vw, 6.5rem) 1.25rem" : "140px 120px",
        background: "#000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: isMobile ? "32px" : "64px",
        borderTop: "1px solid transparent",
        borderImage: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08) 50%, transparent) 1",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: isMobile ? "100%" : "800px" }}>
        {t.differentiators.eyebrow ? (
          <FadeIn>
            <p
              style={{
                fontSize: "12px",
                fontWeight: fwUi(lang, 500),
                letterSpacing: "3px",
                color: "rgba(255,255,255,0.35)",
                marginBottom: isMobile ? "12px" : "16px",
              }}
            >
              {t.differentiators.eyebrow}
            </p>
          </FadeIn>
        ) : null}
        <FadeIn delay={t.differentiators.eyebrow ? 0.18 : 0}>
          <h2
            style={{
              fontSize: isMobile ? "32px" : "48px",
              fontWeight: 400,
              letterSpacing: "-1.2px",
              color: "#fff",
            }}
          >
            {t.differentiators.title}
          </h2>
        </FadeIn>
      </div>

      <div
        style={{
          position: "relative",
          maxWidth: "1100px",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
            /* 移动端勿设 row gap，否则 hover 底与 WavePathDivider 之间会露黑缝 */
            gap: 0,
            width: "100%",
          }}
        >
          {isMobile
            ? diffs.flatMap((d, i) => {
                const cell = <DiffCell key={d.title} d={d} index={i} />;
                if (i < diffs.length - 1) {
                  return [
                    cell,
                    <div key={`diff-m-div-${i}`} style={{ gridColumn: "1 / -1", width: "100%" }}>
                      <WavePathDivider />
                    </div>,
                  ];
                }
                return [cell];
              })
            : diffs.map((d, i) => <DiffCell key={d.title} d={d} index={i} />)}
        </div>
        {/* 十字线：四角箭头所指的外端渐隐，中心交汇不断开 */}
        {!isMobile ? (
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              zIndex: 1,
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: 0,
                bottom: 0,
                width: "1px",
                transform: "translateX(-50%)",
                background: gridVerticalFade,
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: "50%",
                height: "1px",
                transform: "translateY(-50%)",
                background: gridHorizontalFade,
              }}
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}

/** 避免 SVG 按文字基线对齐，在 flex 列里产生「上松底紧」的视觉 */
function DiffIconWrap({
  Icon,
  color,
}: {
  Icon: DiffRow["icon"];
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
      <Icon size={22} color={color} strokeWidth={1.5} />
    </div>
  );
}

function DiffCell({
  d,
  index,
}: {
  d: DiffRow;
  index: number;
}) {
  const [hover, setHover] = useState(false);
  const inlinePad = "clamp(20px, 3vw, 36px)";

  return (
    <StaggerItem
      index={index}
      staggerDelay={0.16}
      distance={28}
      style={{
        minHeight: 0,
        display: "flex",
        position: "relative",
        zIndex: 0,
        width: "100%",
        alignSelf: "stretch",
      }}
    >
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "14px",
          ...hoverCellVerticalPadding,
          paddingLeft: inlinePad,
          paddingRight: inlinePad,
          textAlign: "left",
          background: hover ? "rgba(255,255,255,0.05)" : "transparent",
          transition: "background 0.28s ease",
          boxSizing: "border-box",
        }}
      >
        <DiffIconWrap Icon={d.icon} color={d.color} />
        <h3
          style={{
            fontSize: "clamp(18px, 2vw, 22px)",
            fontWeight: 400,
            color: "#fff",
            letterSpacing: "-0.02em",
            margin: 0,
          }}
        >
          {d.title}
        </h3>
        {d.desc ? (
          <p
            style={{
              fontSize: "14px",
              color: "rgba(255,255,255,0.48)",
              lineHeight: 1.55,
              margin: 0,
              maxWidth: "48ch",
            }}
          >
            {d.desc}
          </p>
        ) : null}
      </div>
    </StaggerItem>
  );
}
