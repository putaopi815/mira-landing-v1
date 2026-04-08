"use client";

import { BlurFade } from "@/components/motion/fade-in";
import { DottedSurface } from "@/components/visual/dotted-surface";
import { useLang } from "@/lib/i18n";
import { useIsMobile } from "@/lib/use-mobile";

/** 移动端：末行文案 ↔ 点阵波浪 留白（原 180px，现为 2×） */
const PARADIGM_TEXT_TO_DOTS_MOBILE = "360px";

export function Paradigm() {
  const { t } = useLang();
  const isMobile = useIsMobile();

  return (
    <section
      style={{
        position: "relative",
        /* 移动端勿裁切：居中 + 一屏高时末行标题会被截断；桌面保留 hidden 防点阵横向溢出 */
        overflow: isMobile ? "visible" : "hidden",
        boxSizing: "border-box",
        /* 桌面：撑满 snap 高度；移动：勿 flex-grow，否则整屏被拉高、文案在上而点阵贴底，中间一大块空黑 */
        flex: isMobile ? "0 0 auto" : "1 1 auto",
        minHeight: isMobile ? "min-content" : 0,
        width: "100%",
        padding: isMobile
          ? "clamp(4.25rem, 11vw, 5.25rem) 1.25rem 0"
          : "160px 120px 0",
        background: "#000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        /* 移动端与 snap-section 一致顶对齐，避免垂直居中把标题压进底部裁切区 */
        justifyContent: isMobile ? "flex-start" : "center",
        gap: 0,
      }}
    >
      <DottedSurface
        aria-hidden
        style={{
          left: 0,
          right: 0,
          bottom: 0,
          top: "auto",
          height: isMobile ? "min(132px, 20vh)" : "min(480px, 50vh)",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          /* 移动端 stretch：各 BlurFade 占满宽，text-align:center 才真正相对整屏居中 */
          alignItems: isMobile ? "stretch" : "center",
          gap: "20px",
          width: isMobile ? "100%" : undefined,
          maxWidth: isMobile ? "min(100%, 22.5rem)" : undefined,
          marginInline: isMobile ? "auto" : undefined,
          paddingBottom: isMobile
            ? `calc(${PARADIGM_TEXT_TO_DOTS_MOBILE} + env(safe-area-inset-bottom, 0px))`
            : "clamp(96px, 14vh, 160px)",
          transform: isMobile ? "translateY(0)" : "translateY(-80px)",
          boxSizing: "border-box",
        }}
      >
        <BlurFade style={isMobile ? { width: "100%", maxWidth: "100%" } : undefined}>
          <h2
            style={{
              fontSize: isMobile ? "clamp(1.5rem, 5.2vw, 1.875rem)" : "48px",
              fontWeight: 300,
              letterSpacing: "-1.1px",
              lineHeight: 1.2,
              color: "rgba(255,255,255,0.5)",
              textAlign: "center",
              maxWidth: isMobile ? "100%" : "800px",
              width: isMobile ? "100%" : undefined,
              margin: 0,
            }}
          >
            {t.paradigm.line1}
          </h2>
        </BlurFade>

        <BlurFade delay={0.26} style={isMobile ? { width: "100%", maxWidth: "100%" } : undefined}>
          {isMobile ? (
            <p
              style={{
                fontSize: "clamp(1rem, 3.4vw, 1.2rem)",
                fontWeight: 400,
                color: "rgba(255,255,255,0.92)",
                lineHeight: 1.5,
                textAlign: "center",
                margin: 0,
                maxWidth: "100%",
                width: "100%",
                padding: 0,
              }}
            >
              {t.paradigm.line2}
            </p>
          ) : (
            <div
              style={{
                width: "100%",
                maxWidth: "100%",
                overflowX: "auto",
                overflowY: "hidden",
                textAlign: "center",
                WebkitOverflowScrolling: "touch",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
              className="paradigm-subline-scroll"
            >
              <p
                style={{
                  fontSize: "clamp(11px, 2.35vw, 22px)",
                  color: "rgba(255,255,255,1)",
                  lineHeight: 1.45,
                  textAlign: "center",
                  whiteSpace: "nowrap",
                  display: "inline-block",
                  margin: 0,
                  padding: "0 clamp(8px, 2vw, 16px)",
                }}
              >
                {t.paradigm.line2}
              </p>
            </div>
          )}
        </BlurFade>

        <BlurFade delay={0.44} style={isMobile ? { width: "100%", display: "flex", justifyContent: "center" } : undefined}>
          <div
            style={{
              width: "60px",
              height: "1px",
              background: "rgba(255,255,255,0.15)",
              flexShrink: 0,
            }}
          />
        </BlurFade>

        <BlurFade delay={0.62} style={isMobile ? { width: "100%", maxWidth: "100%" } : undefined}>
          <p
            style={{
              fontSize: isMobile ? "clamp(1.5rem, 5.2vw, 1.875rem)" : "48px",
              fontWeight: 400,
              letterSpacing: "-1.1px",
              lineHeight: isMobile ? 1.22 : undefined,
              color: "rgba(255,255,255,0.9)",
              textAlign: "center",
              margin: 0,
              width: isMobile ? "100%" : undefined,
              maxWidth: isMobile ? "100%" : undefined,
              overflow: "visible",
            }}
          >
            {t.paradigm.line3}
          </p>
        </BlurFade>
      </div>
    </section>
  );
}
