"use client";

import { FadeIn } from "@/components/motion/fade-in";
import { fwUi, useLang } from "@/lib/i18n";
import { useIsMobile } from "@/lib/use-mobile";

function TwitterIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function FooterColumn({
  title,
  links,
  titleFontWeight,
  isMobile,
}: {
  title: string;
  links: string[];
  titleFontWeight: number;
  isMobile: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: isMobile ? "12px" : "16px",
      }}
    >
      <span
        style={{
          fontSize: isMobile ? "11px" : "12px",
          fontWeight: titleFontWeight,
          letterSpacing: isMobile ? "0.12em" : "2px",
          color: "rgba(255,255,255,0.32)",
        }}
      >
        {title}
      </span>
      {links.map((link) => (
        <a
          key={link}
          href="#"
          className="footer-link"
          style={{
            fontSize: isMobile ? "15px" : "14px",
            color: "rgba(255,255,255,0.55)",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            minHeight: isMobile ? "44px" : undefined,
            marginInline: isMobile ? "-0.5rem" : undefined,
            paddingInline: isMobile ? "0.5rem" : undefined,
            borderRadius: isMobile ? "8px" : undefined,
          }}
        >
          {link}
        </a>
      ))}
    </div>
  );
}

export function Footer() {
  const { t, lang } = useLang();
  const isMobile = useIsMobile();
  const colLabelWeight = fwUi(lang, 500);

  const pageGutter = "clamp(32px, 8vw, 160px)";

  return (
    <footer
      style={{
        flex: 1,
        minHeight: 0,
        padding: isMobile ? `clamp(4rem, 10vw, 5rem) 1.25rem 0` : `80px ${pageGutter} 0`,
        background: "#000",
        display: "flex",
        flexDirection: "column",
        gap: 0,
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: isMobile ? "40px" : "48px",
          flexShrink: 0,
        }}
      >
        {/* Top row：与底栏社交图标同一右缘，站点地图与 GitHub 对齐 */}
        <FadeIn distance={20}>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              alignItems: isMobile ? "stretch" : "flex-start",
              gap: isMobile ? "32px" : "48px 80px",
              flexWrap: "wrap",
              flexDirection: isMobile ? "column" : "row",
            }}
          >
            {/* Brand */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                width: isMobile ? "100%" : "min(100%, 340px)",
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: isMobile ? "22px" : "24px", fontWeight: 600, color: "#fff" }}>
                Mira.
              </span>
              <p
                style={{
                  fontSize: isMobile ? "15px" : "14px",
                  color: "rgba(255,255,255,0.52)",
                  lineHeight: 1.65,
                  margin: 0,
                  maxWidth: "100%",
                }}
              >
                <span style={{ display: "block", whiteSpace: isMobile ? "normal" : "nowrap" }}>{t.footer.tagline[0]}</span>
                <span style={{ display: "block", whiteSpace: isMobile ? "normal" : "nowrap" }}>{t.footer.tagline[1]}</span>
              </p>
            </div>

            <div
              style={{
                display: "flex",
                gap: isMobile ? "28px 24px" : "104px",
                flexShrink: 0,
                flexWrap: "wrap",
                width: isMobile ? "100%" : undefined,
              }}
            >
              <FooterColumn isMobile={isMobile} title={t.footer.product} links={[...t.footer.productLinks]} titleFontWeight={colLabelWeight} />
              <FooterColumn isMobile={isMobile} title={t.footer.company} links={[...t.footer.companyLinks]} titleFontWeight={colLabelWeight} />
              <FooterColumn isMobile={isMobile} title={t.footer.support} links={[...t.footer.supportLinks]} titleFontWeight={colLabelWeight} />
            </div>
          </div>
        </FadeIn>

        {/* Gradient divider */}
        <div
          style={{
            width: "100%",
            height: "1px",
            background: isMobile
              ? "rgba(255,255,255,0.06)"
              : "linear-gradient(90deg, transparent, rgba(255,255,255,0.1) 50%, transparent)",
          }}
        />

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: isMobile ? "flex-start" : "center",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? "16px" : 0,
          }}
        >
          <span style={{ fontSize: isMobile ? "14px" : "13px", color: "rgba(255,255,255,0.28)" }}>
            {t.footer.copyright}
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "8px" : "16px" }}>
            <a
              href="#"
              className="social-icon"
              style={{
                color: "rgba(255,255,255,0.35)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: isMobile ? "44px" : undefined,
                height: isMobile ? "44px" : undefined,
                borderRadius: isMobile ? "10px" : undefined,
              }}
            >
              <TwitterIcon />
            </a>
            <a
              href="#"
              className="social-icon"
              style={{
                color: "rgba(255,255,255,0.35)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: isMobile ? "44px" : undefined,
                height: isMobile ? "44px" : undefined,
                borderRadius: isMobile ? "10px" : undefined,
              }}
            >
              <LinkedinIcon />
            </a>
            <a
              href="#"
              className="social-icon"
              style={{
                color: "rgba(255,255,255,0.35)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: isMobile ? "44px" : undefined,
                height: isMobile ? "44px" : undefined,
                borderRadius: isMobile ? "10px" : undefined,
              }}
            >
              <GithubIcon />
            </a>
          </div>
        </div>
      </div>

      {/* Watermark：顶到页脚（与最后一屏）底部，纵向渐变透明度 */}
      <div className="footer-watermark-wrap">
        <div className="footer-watermark-text">Mira.</div>
      </div>
    </footer>
  );
}
