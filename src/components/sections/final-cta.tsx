"use client";

import { FadeIn, ScaleIn, HoverButton } from "@/components/motion/fade-in";
import { HeroPhotoBackdrop } from "@/components/ui/hero-photo-backdrop";
import { fwUi, useLang } from "@/lib/i18n";
import { useIsMobile } from "@/lib/use-mobile";

/** 与 Footer 同一水平 gutter，CTA 文案与「Mira.」左缘对齐 */
const PAGE_GUTTER = "clamp(32px, 8vw, 160px)";

export function FinalCTA() {
  const { t, lang } = useLang();
  const isMobile = useIsMobile();

  return (
    <section
      id="cta"
      style={{
        padding: 0,
        background: "#000",
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <ScaleIn from={0.93} style={{ width: "100%", maxWidth: "none" }}>
        <div
          style={{
            position: "relative",
            width: "100%",
            height: isMobile ? "auto" : "min(520px, 70dvh)",
            minHeight: isMobile ? "min(100vw, 28rem)" : undefined,
            borderRadius: 0,
            overflow: "hidden",
          }}
        >
          <HeroPhotoBackdrop />

          {/* Content */}
          <div
            style={{
              position: "relative",
              zIndex: 10,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: isMobile ? "center" : "stretch",
              gap: isMobile ? "28px" : "clamp(36px, 4vh, 48px)",
              padding: isMobile ? "clamp(4.5rem, 12vw, 5.5rem) 1.25rem" : `0 ${PAGE_GUTTER}`,
              maxWidth: isMobile ? "100%" : "720px",
              marginInline: isMobile ? "auto" : undefined,
              textAlign: isMobile ? "center" : "left",
              width: isMobile ? "100%" : undefined,
              boxSizing: "border-box",
            }}
          >
            <FadeIn delay={0.22}>
              <h2
                style={{
                  fontSize: isMobile ? "clamp(1.875rem, 6vw, 2.375rem)" : "56px",
                  fontWeight: 400,
                  letterSpacing: isMobile ? "-0.03em" : "-1.5px",
                  lineHeight: isMobile ? 1.12 : 1.1,
                  color: "#fff",
                  /* 桌面勿限 600px：中文大标题会挤出孤字换行；与栏宽对齐即可 */
                  maxWidth: isMobile ? "min(100%, 20rem)" : "100%",
                  textAlign: isMobile ? "center" : "left",
                  margin: isMobile ? 0 : undefined,
                  width: isMobile ? "100%" : undefined,
                  whiteSpace: isMobile ? "normal" : "nowrap",
                }}
              >
                {isMobile ? (
                  <>
                    {t.finalCTA.title[0]}
                    {t.finalCTA.title[1].trim() ? (
                      <>
                        <br />
                        {t.finalCTA.title[1]}
                      </>
                    ) : null}
                  </>
                ) : (
                  [t.finalCTA.title[0], t.finalCTA.title[1]]
                    .map((s) => s.trim())
                    .filter(Boolean)
                    .join(" ")
                )}
              </h2>
            </FadeIn>

            {t.finalCTA.subtitle.trim() ? (
              <FadeIn
                delay={0.42}
                style={{
                  width: "100%",
                  maxWidth: "100%",
                  display: "flex",
                  justifyContent: isMobile ? "center" : "flex-start",
                  overflowX: isMobile ? "auto" : undefined,
                  WebkitOverflowScrolling: isMobile ? "touch" : undefined,
                  scrollbarWidth: isMobile ? "none" : undefined,
                }}
              >
                <p
                  style={{
                    fontSize: "17px",
                    color: "rgba(255,255,255,0.72)",
                    margin: 0,
                    lineHeight: 1.65,
                    whiteSpace: isMobile ? "nowrap" : "normal",
                    textAlign: isMobile ? "center" : "left",
                    maxWidth: isMobile ? undefined : "min(100%, 42rem)",
                  }}
                >
                  {t.finalCTA.subtitle}
                </p>
              </FadeIn>
            ) : null}

            <FadeIn
              delay={t.finalCTA.subtitle.trim() ? 0.62 : 0.42}
              style={
                isMobile
                  ? {
                      alignSelf: "center",
                      width: "min(100%, 22rem)",
                      maxWidth: "min(100%, 22rem)",
                      marginInline: "auto",
                      boxSizing: "border-box",
                    }
                  : undefined
              }
            >
              <div
                style={{
                  display: "flex",
                  gap: isMobile ? "12px" : "16px",
                  flexDirection: isMobile ? "column" : "row",
                  width: isMobile ? "100%" : undefined,
                  maxWidth: isMobile ? "min(100%, 22rem)" : undefined,
                  alignItems: isMobile ? "stretch" : undefined,
                  boxSizing: "border-box",
                }}
              >
                <HoverButton
                  href="#"
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
                  <span className="btn-shine" style={{ display: "block" }}>
                    {t.finalCTA.primary}
                  </span>
                </HoverButton>
                <a
                  href="#"
                  className="btn-ghost"
                  style={{
                    padding: isMobile ? "0.875rem 1.5rem" : "14px 32px",
                    minHeight: isMobile ? "48px" : undefined,
                    borderRadius: isMobile ? "10px" : "80px",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "rgba(255,255,255,0.78)",
                    fontSize: "16px",
                    textDecoration: "none",
                    display: isMobile ? "flex" : "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxSizing: "border-box",
                    width: isMobile ? "100%" : undefined,
                    minWidth: isMobile ? 0 : undefined,
                    textAlign: "center",
                  }}
                >
                  {t.finalCTA.secondary}
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </ScaleIn>
    </section>
  );
}
