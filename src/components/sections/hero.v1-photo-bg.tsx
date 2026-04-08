"use client";

import { useEffect, useRef, useState } from "react";
import { HoverButton } from "@/components/motion/fade-in";
import { useLang } from "@/lib/i18n";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const { t, lang } = useLang();

  useEffect(() => {
    const onScroll = () => {
      if (sectionRef.current) {
        setScrollY(window.scrollY);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const parallaxOffset = scrollY * 0.35;
  const contentOpacity = Math.max(0, 1 - scrollY / 700);
  const contentTranslate = scrollY * 0.15;

  const headlineFontSize = lang === "zh" ? "76px" : "84px";

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      id="hero"
      style={{ height: "100vh", minHeight: "800px", background: "#000" }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url(/hero-bg.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
          transform: `translateY(${parallaxOffset}px) scale(1.1)`,
          willChange: "transform",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.85) 0%, transparent 70%),
            linear-gradient(to top, #000 0%, rgba(0,0,0,0.73) 25%, rgba(0,0,0,0.33) 60%, rgba(0,0,0,0.87) 100%)
          `,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 10,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "32px",
          padding: "0 120px",
          textAlign: "center",
          opacity: contentOpacity,
          transform: `translateY(-${contentTranslate}px)`,
          willChange: "opacity, transform",
        }}
      >
        <div
          className="hero-fade-1"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 16px",
            borderRadius: "80px",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#6D7CFF",
              boxShadow: "0 0 8px 2px rgba(109,124,255,0.4)",
            }}
          />
          <span
            style={{
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "2px",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            {t.hero.badge}
          </span>
        </div>

        <h1>
          <span style={{ display: "block", overflow: "hidden", paddingBottom: "0.25em", lineHeight: 1.15 }}>
            <span
              className="hero-slide-1"
              style={{
                display: "block",
                fontSize: headlineFontSize,
                letterSpacing: "-2.5px",
                lineHeight: 1.05,
                color: "#fff",
              }}
            >
              {t.hero.line1}
            </span>
          </span>
          <span style={{ display: "block", overflow: "hidden", paddingBottom: "0.25em", lineHeight: 1.15 }}>
            <span
              className="hero-slide-2"
              style={{
                display: "block",
                fontSize: headlineFontSize,
                letterSpacing: "-2.5px",
                lineHeight: 1.05,
                color: "#fff",
              }}
            >
              {t.hero.line2}
            </span>
          </span>
        </h1>

        <p
          className="hero-fade-2"
          style={{
            fontSize: "18px",
            color: "rgba(255,255,255,0.8)",
            lineHeight: 1.6,
            maxWidth: "min(960px, 100%)",
            overflowX: "auto",
          }}
        >
          {t.hero.subtitle.map((line, i) => (
            <span
              key={i}
              className={
                i === t.hero.subtitle.length - 1
                  ? "hero-subtitle-line-nowrap"
                  : undefined
              }
            >
              {line}
              {i < t.hero.subtitle.length - 1 && <br />}
            </span>
          ))}
        </p>

        <div
          className="hero-fade-3"
          style={{ display: "flex", gap: "16px" }}
        >
          <HoverButton
            href="#cta"
            style={{
              padding: "14px 32px",
              borderRadius: "80px",
              background: "rgba(255,255,255,0.9)",
              color: "#000",
              fontSize: "16px",
              fontWeight: 500,
            }}
            glowColor="rgba(255,255,255,0.25)"
          >
            <span className="btn-shine" style={{ display: "block", padding: "0" }}>
              {t.hero.ctaPrimary}
            </span>
          </HoverButton>
          <a
            href="#system"
            className="btn-ghost"
            style={{
              padding: "14px 32px",
              borderRadius: "80px",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "rgba(255,255,255,0.8)",
              fontSize: "16px",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            {t.hero.ctaSecondary}
          </a>
        </div>

        <div
          className="hero-fade-4"
          style={{
            position: "absolute",
            bottom: "40px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span style={{ fontSize: "11px", letterSpacing: "2px", color: "rgba(255,255,255,0.3)" }}>
            {t.hero.scroll}
          </span>
          <div
            style={{
              width: "1px",
              height: "32px",
              background: "linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)",
              animation: "scrollPulse 2s ease-in-out infinite",
            }}
          />
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
