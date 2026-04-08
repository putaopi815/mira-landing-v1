"use client";

import { useEffect, useRef, useState } from "react";
import { HoverButton } from "@/components/motion/fade-in";
import { HeroPhotoBackdrop } from "@/components/ui/hero-photo-backdrop";
import { fwUi, useLang } from "@/lib/i18n";
import { useIsMobile } from "@/lib/use-mobile";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const { t, lang } = useLang();
  const isMobile = useIsMobile();

  useEffect(() => {
    const onScroll = () => {
      if (sectionRef.current) {
        setScrollY(window.scrollY);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const contentOpacity = Math.max(0, 1 - scrollY / 700);
  const contentTranslate = scrollY * 0.15;
  const parallaxOffset = scrollY * 0.35;

  const headlineFontSize = isMobile
    ? "clamp(2rem, 7vw + 0.6rem, 2.875rem)"
    : lang === "zh"
      ? "76px"
      : "84px";

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden ${isMobile ? "mf-hero" : ""}`}
      id="hero"
      style={{
        height: "100%",
        /* 桌面由 #snap-hero 固定 100dvh 撑满；勿再用 min 800px，短视口会高于父级被裁切 */
        minHeight: isMobile ? "100dvh" : undefined,
        background: "#000",
      }}
    >
      <HeroPhotoBackdrop parallaxOffset={parallaxOffset} />

      <div
        className={isMobile ? "mf-hero__inner" : undefined}
        style={{
          position: "relative",
          zIndex: 10,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 0,
          /* 桌面顶栏 fixed，留出安全区避免徽章/内容与 Logo、左右导航叠在一起 */
          padding: isMobile
            ? undefined
            : "clamp(72px, 10vh, 108px) 120px clamp(40px, 5vh, 64px)",
          textAlign: "center",
          opacity: contentOpacity,
          transform: `translateY(-${contentTranslate}px)`,
          willChange: "opacity, transform",
          boxSizing: "border-box",
        }}
      >
        <div
          className="hero-fade-1"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: isMobile ? "10px" : "8px",
            padding: isMobile ? "10px 18px" : "6px 16px",
            borderRadius: isMobile ? "8px" : "80px",
            background: isMobile ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.08)",
            marginBottom: isMobile ? "28px" : "32px",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#6D7CFF",
              boxShadow: isMobile ? "none" : "0 0 8px 2px rgba(109,124,255,0.4)",
            }}
          />
          <span
            style={{
              fontSize: isMobile ? "12px" : "11px",
              fontWeight: fwUi(lang, 500),
              letterSpacing: isMobile ? "0.14em" : "2px",
              color: "rgba(255,255,255,0.45)",
            }}
          >
            {t.hero.badge}
          </span>
        </div>

        <h1 style={{ margin: 0, marginBottom: isMobile ? "20px" : "16px" }}>
          {/* overflow:hidden 用于入场动画；行高与底部留白需容纳 g/y 等降部，避免被裁切 */}
          <span
            style={{
              display: "block",
              overflow: "hidden",
              paddingBottom: "0.5em",
              lineHeight: 1.2,
            }}
          >
            <span
              className="hero-slide-1"
              style={{
                display: "block",
                fontSize: headlineFontSize,
                letterSpacing: isMobile ? "-1.4px" : "-2.5px",
                lineHeight: 1.18,
                color: "#fff",
              }}
            >
              {t.hero.line1}
            </span>
          </span>
          {t.hero.line2.trim() ? (
            <span
              style={{
                display: "block",
                overflow: "hidden",
                paddingBottom: "0.5em",
                lineHeight: 1.2,
              }}
            >
              <span
                className="hero-slide-2"
                style={{
                  display: "block",
                  fontSize: headlineFontSize,
                  letterSpacing: isMobile ? "-1.4px" : "-2.5px",
                  lineHeight: 1.18,
                  color: "#fff",
                }}
              >
                {t.hero.line2}
              </span>
            </span>
          ) : null}
        </h1>

        <p
          className="hero-fade-2"
          style={{
            fontSize: isMobile ? "clamp(1.0625rem, 0.8vw + 0.9rem, 1.125rem)" : "18px",
            color: isMobile ? "rgba(255,255,255,0.72)" : "rgba(255,255,255,0.8)",
            lineHeight: isMobile ? 1.65 : 1.6,
            maxWidth: isMobile ? "min(100%, 22rem)" : "min(960px, 100%)",
            margin: "0 auto",
            marginBottom: isMobile ? "40px" : "48px",
            overflowWrap: "break-word",
            wordBreak: "break-word",
          }}
        >
          {t.hero.subtitle.map((line, i) => (
            <span key={i}>
              {line}
              {i < t.hero.subtitle.length - 1 && <br />}
            </span>
          ))}
        </p>

        <div
          className="hero-fade-3"
          style={{
            display: "flex",
            gap: isMobile ? "12px" : "16px",
            flexDirection: isMobile ? "column" : "row",
            /* stretch + maxWidth 时 flex 会把块贴在 cross-start（左），与副标题不同轴 */
            width: isMobile ? "min(100%, 22rem)" : undefined,
            maxWidth: isMobile ? "min(100%, 22rem)" : undefined,
            alignSelf: isMobile ? "center" : undefined,
            marginInline: isMobile ? "auto" : undefined,
            boxSizing: "border-box",
          }}
        >
          <HoverButton
            href="#cta"
            style={{
              padding: isMobile ? "0.875rem 1.5rem" : "14px 32px",
              minHeight: isMobile ? "48px" : undefined,
              borderRadius: isMobile ? "10px" : "80px",
              background: isMobile ? "#f5f5f5" : "rgba(255,255,255,0.9)",
              color: "#0a0a0a",
              fontSize: "16px",
              fontWeight: fwUi(lang, 500),
              width: isMobile ? "100%" : undefined,
              textAlign: "center",
              display: isMobile ? "flex" : undefined,
              alignItems: isMobile ? "center" : undefined,
              justifyContent: isMobile ? "center" : undefined,
            }}
            glowColor={isMobile ? "transparent" : "rgba(255,255,255,0.25)"}
          >
            <span className="btn-shine" style={{ display: "block", padding: "0" }}>
              {t.hero.ctaPrimary}
            </span>
          </HoverButton>
          <a
            href="#system"
            className="btn-ghost"
            style={{
              padding: isMobile ? "0.875rem 1.5rem" : "14px 32px",
              minHeight: isMobile ? "48px" : undefined,
              boxSizing: "border-box",
              display: isMobile ? "flex" : "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: isMobile ? "10px" : "80px",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.78)",
              fontSize: "16px",
              textDecoration: "none",
              width: isMobile ? "100%" : undefined,
              minWidth: isMobile ? 0 : undefined,
              textAlign: "center",
            }}
          >
            {t.hero.ctaSecondary}
          </a>
        </div>

        {/* 外层只做水平居中；内层带 heroScaleIn，避免 animation 的 transform 覆盖 translateX(-50%) */}
        <div
          style={{
            position: "absolute",
            bottom: isMobile ? "24px" : "40px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            opacity: isMobile ? 0 : 1,
            pointerEvents: isMobile ? "none" : "auto",
          }}
        >
          <div
            className="hero-fade-4"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span
              style={{
                display: "block",
                fontSize: "11px",
                letterSpacing: "2px",
                color: "rgba(255,255,255,0.3)",
                textAlign: "center",
              }}
            >
              {t.hero.scroll}
            </span>
            <div
              style={{
                width: "1px",
                height: "32px",
                flexShrink: 0,
                margin: "0 auto",
                background: "linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)",
                transformOrigin: "center top",
                animation: "scrollPulse 2s ease-in-out infinite",
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.3); }
        }
      `}</style>
    </section>
  );
}
