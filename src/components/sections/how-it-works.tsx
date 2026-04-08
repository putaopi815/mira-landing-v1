"use client";

import { Fragment } from "react";
import { FadeIn, StaggerItem } from "@/components/motion/fade-in";
import { HoverBorderPill } from "@/components/ui/hover-border-pill";
import { fwUi, useLang } from "@/lib/i18n";
import { useIsMobile } from "@/lib/use-mobile";

export function HowItWorks() {
  const { t, lang } = useLang();
  const isMobile = useIsMobile();
  const steps = t.howItWorks.steps;

  return (
    <section
      id="how"
      style={{
        boxSizing: "border-box",
        flex: "1 1 auto",
        minHeight: 0,
        width: "100%",
        padding: isMobile ? "clamp(5rem, 14vw, 6.5rem) 1.25rem" : "140px 120px",
        background: "#000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: isMobile ? "clamp(2.5rem, 8vw, 3rem)" : "64px",
        position: "relative",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 120% 85% at 50% 0%, rgba(255,255,255,0.045) 0%, transparent 55%)",
          pointerEvents: "none",
        }}
      />
      <div style={{ textAlign: "center", maxWidth: "800px", position: "relative", zIndex: 1 }}>
        <FadeIn>
          <p
            style={{
              fontSize: isMobile ? "13px" : "12px",
              fontWeight: fwUi(lang, 500),
              letterSpacing: isMobile ? "0.2em" : "3px",
              color: "rgba(255,255,255,0.38)",
              marginBottom: isMobile ? "18px" : "16px",
            }}
          >
            {t.howItWorks.eyebrow}
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
            {t.howItWorks.title.map((line, i) => (
              <span key={i}>
                {line}
                {i < t.howItWorks.title.length - 1 ? <br /> : null}
              </span>
            ))}
          </h2>
        </FadeIn>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: isMobile ? "10px" : "clamp(8px, 1.5vw, 16px)",
          flexWrap: isMobile ? "nowrap" : "wrap",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "center",
          position: "relative",
          zIndex: 1,
          maxWidth: isMobile ? "min(100%, 22rem)" : undefined,
          width: isMobile ? "100%" : undefined,
        }}
      >
        {steps.map((label, i) => (
          <Fragment key={`${label}-${i}`}>
            <StaggerItem index={i} staggerDelay={0.18} distance={24}>
              <HoverBorderPill label={label} lang={lang} />
            </StaggerItem>
            {i < steps.length - 1 ? (
              <StaggerItem index={i} staggerDelay={0.18} distance={0}>
                <span
                  style={{
                    fontSize: isMobile ? "15px" : "18px",
                    color: "rgba(255,255,255,0.28)",
                    lineHeight: 1,
                    userSelect: "none",
                    display: "block",
                    margin: isMobile ? "2px 0" : undefined,
                  }}
                  aria-hidden
                >
                  {isMobile ? "↓" : "→"}
                </span>
              </StaggerItem>
            ) : null}
          </Fragment>
        ))}
      </div>

      <FadeIn delay={0.88} style={{ position: "relative", zIndex: 1 }}>
        <p
          style={{
            fontSize: isMobile ? "15px" : "17px",
            color: "rgba(255,255,255,0.5)",
            textAlign: "center",
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          {t.howItWorks.subtitle}
        </p>
      </FadeIn>
    </section>
  );
}
