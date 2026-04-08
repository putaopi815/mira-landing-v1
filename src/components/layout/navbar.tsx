"use client";

import { useRef, useState, useEffect } from "react";
import { useLang } from "@/lib/i18n";
import { useIsMobile } from "@/lib/use-mobile";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, setLang, t } = useLang();
  const isMobile = useIsMobile();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pillDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMobile || !menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isMobile, menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setLangOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useEffect(() => {
    // Full-page snap: scrollY vs a pixel threshold breaks — querySelectorAll("section …")
    // picked buttons from every block and inflated threshold, so mid-page looked “still hero”
    // and the capsule nav hid. Drive mode from #snap-hero visibility instead.
    const heroSnap = document.getElementById("snap-hero");
    const observer = !isMobile && heroSnap
      ? new IntersectionObserver(
          ([entry]) => {
            if (!entry) return;
            setScrolled(entry.intersectionRatio < 0.4);
          },
          { threshold: [0, 0.15, 0.25, 0.4, 0.5, 0.65, 0.8, 1] }
        )
      : null;
    if (heroSnap && observer) observer.observe(heroSnap);

    const onClick = (e: MouseEvent) => {
      const inTop = dropdownRef.current?.contains(e.target as Node);
      const inPill = pillDropdownRef.current?.contains(e.target as Node);
      if (!inTop && !inPill) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => {
      observer?.disconnect();
      document.removeEventListener("mousedown", onClick);
    };
  }, [isMobile]);

  const links = [
    { key: "problem", href: "#snap-problem", label: t.nav.problem },
    { key: "paradigm", href: "#snap-paradigm", label: t.nav.paradigmShift },
    { key: "solution", href: "#snap-solution", label: t.nav.solution },
    { key: "systemDepth", href: "#snap-system-depth", label: t.nav.systemDepth },
    { key: "advantage", href: "#snap-differentiators", label: t.nav.advantage },
  ];

  /** 全屏 scroll-snap 下原生 hash 往往瞬间跳转，统一用平滑滚动 */
  const smoothScrollToHash = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute("href");
    if (!href?.startsWith("#")) return;
    const id = href.slice(1);
    if (!id) return;
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  };

  const onDrawerLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    smoothScrollToHash(e);
    setMenuOpen(false);
  };

  /** 中文导航：避免 500 在黑体上过粗，与顶栏 CTA / 语言切换的 400 一致 */
  const wNav = lang === "zh" ? 400 : 300;
  const wNavPill = 400;
  const zhNavFace: React.CSSProperties =
    lang === "zh"
      ? {
          fontFamily:
            'ui-sans-serif, system-ui, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Heiti SC", sans-serif',
        }
      : {};

  /* ─── Shared link style ─── */
  const topLinkStyle: React.CSSProperties = {
    fontSize: "14px",
    fontWeight: wNav,
    color: "rgba(255,255,255,0.8)",
    textDecoration: "none",
    padding: "2.4px 8px",
    display: "block",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontFamily: "inherit",
    textAlign: "left",
    lineHeight: "1.4",
    letterSpacing: "0.01em",
    ...zhNavFace,
  };

  const pillLinkStyle: React.CSSProperties = {
    fontSize: "13px",
    fontWeight: wNavPill,
    color: "rgba(255,255,255,0.8)",
    textDecoration: "none",
    padding: "2.4px 6.4px",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontFamily: "inherit",
    whiteSpace: "nowrap",
    letterSpacing: "0.01em",
    ...zhNavFace,
  };

  const pillNavAnchorStyle: React.CSSProperties = {
    fontSize: "13px",
    fontWeight: wNavPill,
    color: "rgba(255,255,255,0.7)",
    textDecoration: "none",
    padding: "2.4px 6.4px",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontFamily: "inherit",
    whiteSpace: "nowrap",
    letterSpacing: "0.01em",
    transition: "color 0.2s ease",
    ...zhNavFace,
  };

  const pillNavAnchorHover = {
    onMouseEnter: (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.currentTarget.style.color = "#fff";
    },
    onMouseLeave: (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.currentTarget.style.color = "rgba(255,255,255,0.7)";
    },
  };

  if (isMobile) {
    return (
      <>
        <div className="mf-nav-mobile-bar">
          <div ref={dropdownRef} className="mf-nav-mobile__lang">
            <button
              type="button"
              className="mf-nav-mobile__lang-trigger"
              aria-expanded={langOpen}
              aria-haspopup="listbox"
              onClick={() => setLangOpen((v) => !v)}
            >
              <span>{lang === "en" ? "EN" : "中文"}</span>
              <svg
                width="10"
                height="10"
                viewBox="0 0 12 12"
                fill="none"
                style={{
                  transform: langOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s ease",
                  opacity: 0.75,
                }}
                aria-hidden
              >
                <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="mf-nav-mobile__lang-panel" data-open={langOpen ? "true" : "false"} role="listbox">
              {[
                { code: "en" as const, label: "English" },
                { code: "zh" as const, label: "Chinese" },
              ].map((opt) => (
                <button
                  key={opt.code}
                  type="button"
                  role="option"
                  className="mf-nav-mobile__lang-option"
                  data-active={lang === opt.code ? "true" : "false"}
                  onClick={() => {
                    setLang(opt.code);
                    setLangOpen(false);
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <a href="#snap-hero" className="mf-nav-mobile__logo" onClick={smoothScrollToHash}>
            Mira.
          </a>

          <button
            type="button"
            className="mf-nav-mobile__menu-btn"
            aria-expanded={menuOpen}
            aria-controls="mf-nav-drawer"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => {
              setMenuOpen((v) => !v);
              setLangOpen(false);
            }}
          >
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M4 7H20M4 12H20M4 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>

        <div
          className="mf-nav-drawer-overlay"
          data-open={menuOpen ? "true" : "false"}
          aria-hidden={!menuOpen}
          onClick={() => setMenuOpen(false)}
          role="presentation"
        />

        <aside
          id="mf-nav-drawer"
          className="mf-nav-drawer"
          data-open={menuOpen ? "true" : "false"}
          aria-hidden={!menuOpen}
        >
          <button
            type="button"
            className="mf-nav-drawer__close"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          {links.map((link) => (
            <a key={link.key} href={link.href} className="mf-nav-drawer__link" onClick={onDrawerLinkClick}>
              {link.label}
            </a>
          ))}

          <div className="mf-nav-drawer__actions">
            <a href="#login" className="mf-nav-drawer__ghost" onClick={onDrawerLinkClick}>
              {t.nav.login}
            </a>
            <a href="#cta" className="mf-nav-drawer__cta" onClick={onDrawerLinkClick}>
              {t.nav.cta}
            </a>
          </div>
        </aside>
      </>
    );
  }

  return (
    <>
      {/* ═══════════════════════════════════════════
          TOP NAV — transparent, vertical stack left
          visible only when NOT scrolled
          ═══════════════════════════════════════════ */}
      <nav
        style={{
          position: "fixed",
          top: "24px",
          left: 0,
          right: 0,
          zIndex: 100,
          minHeight: "52px",
          pointerEvents: "none",
          opacity: scrolled ? 0 : 1,
          transform: scrolled ? "translateY(-20px)" : "translateY(0)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
        }}
      >
        {/* Logo — centered */}
        <a
          href="#"
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "20px",
            fontWeight: 700,
            color: "#fff",
            textDecoration: "none",
            letterSpacing: "0.01em",
            pointerEvents: "auto",
            lineHeight: "1",
            top: "9px",
          }}
        >
          Mira.
        </a>

        {/* Left — stacked links */}
        <div
          style={{
            position: "absolute",
            left: "28px",
            top: "8px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            pointerEvents: "auto",
          }}
        >
          {links.map((link) => (
            <a
              key={link.key}
              href={link.href}
              style={topLinkStyle}
              onClick={smoothScrollToHash}
            >
              {link.label}
            </a>
          ))}

          {/* Language switcher — text only, no border */}
          <div ref={dropdownRef} style={{ position: "relative" }}>
            <button
              onClick={() => setLangOpen((v) => !v)}
              style={{
                ...topLinkStyle,
                display: "flex",
                alignItems: "center",
                gap: "4px",
                fontWeight: lang === "zh" ? 400 : 300,
              }}
            >
              <span>{lang === "en" ? "English" : "中文"}</span>
              <svg
                width="9" height="9" viewBox="0 0 12 12" fill="none"
                style={{
                  transform: langOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s ease",
                  opacity: 0.6,
                }}
              >
                <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Dropdown — no label row */}
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 4px)",
                left: "8px",
                minWidth: "110px",
                background: "rgba(15,15,15,0.92)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "10px",
                padding: "4px",
                opacity: langOpen ? 1 : 0,
                transform: langOpen ? "translateY(0)" : "translateY(-4px)",
                pointerEvents: langOpen ? "auto" : "none",
                transition: "opacity 0.2s ease, transform 0.2s ease",
                zIndex: 200,
              }}
            >
              {[
                { code: "en" as const, label: "English" },
                { code: "zh" as const, label: "Chinese" },
              ].map((opt) => (
                <button
                  key={opt.code}
                  onClick={() => { setLang(opt.code); setLangOpen(false); }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    padding: "7px 10px",
                    background: "transparent",
                    border: "none",
                    borderRadius: "7px",
                    color: lang === opt.code ? "#fff" : "rgba(255,255,255,0.65)",
                    fontSize: "13px",
                    fontWeight: lang === opt.code ? 400 : 300,
                    fontFamily: "inherit",
                    textAlign: "left",
                    cursor: "pointer",
                    transition: "background 0.15s ease",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.06)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
                >
                  <span>{opt.label}</span>
                  {lang === opt.code && (
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right — Login + CTA outlined */}
        <div style={{ position: "absolute", right: "28px", top: "0px", pointerEvents: "auto", display: "flex", alignItems: "center", gap: "4px" }}>
          <a
            href="#login"
            style={{
              fontSize: "14px",
              fontWeight: wNav,
              color: "rgba(255,255,255,0.7)",
              padding: "7px 12px",
              textDecoration: "none",
              display: "inline-block",
              letterSpacing: "0.01em",
              lineHeight: "1.4",
              transition: "color 0.2s ease",
              ...zhNavFace,
            }}
            onClick={smoothScrollToHash}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#fff"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.7)"; }}
          >
            {t.nav.login}
          </a>
          <a
            href="#cta"
            onClick={smoothScrollToHash}
            style={{
              fontSize: "14px",
              fontWeight: lang === "zh" ? 400 : 300,
              color: "rgba(255,255,255,0.85)",
              padding: "7px 16px",
              borderRadius: "40px",
              border: "1px solid rgba(255,255,255,0.25)",
              background: "transparent",
              textDecoration: "none",
              display: "inline-block",
              letterSpacing: "0.01em",
              transition:
                "background 0.3s ease, border-color 0.3s ease, color 0.3s ease",
              lineHeight: "1.4",
              ...zhNavFace,
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.borderColor = "rgba(255,255,255,0.08)";
              el.style.color = "#fff";
              el.style.background = "rgba(255,255,255,0.08)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.borderColor = "rgba(255,255,255,0.25)";
              el.style.color = "rgba(255,255,255,0.85)";
              el.style.background = "transparent";
            }}
          >
            {t.nav.cta}
          </a>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════
          SCROLLED PILL NAV — micro1.ai 1:1
          visible only when scrolled
          ═══════════════════════════════════════════ */}
      <nav
        style={{
          position: "fixed",
          top: "10px",
          left: 0,
          right: 0,
          zIndex: 100,
          display: "flex",
          justifyContent: "center",
          pointerEvents: scrolled ? "auto" : "none",
          opacity: scrolled ? 1 : 0,
          transform: scrolled ? "translateY(0)" : "translateY(-70px)",
          transition: "opacity 0.4s cubic-bezier(0.22,1,0.36,1), transform 0.4s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        {/* Pill background layer */}
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "80px",
              background: "rgba(0,0,0,0.3)",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(20px) saturate(1.8)",
              WebkitBackdropFilter: "blur(20px) saturate(1.8)",
            }}
          />

          {/* Pill content */}
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              padding: "8px 8px 8px 32px",
              borderRadius: "80px",
              gap: "0px",
            }}
          >
            {/* Logo */}
            <a
              href="#snap-hero"
              onClick={smoothScrollToHash}
              style={{
                fontSize: "16px",
                fontWeight: 700,
                color: "#fff",
                textDecoration: "none",
                letterSpacing: "0.01em",
                lineHeight: "1",
                marginRight: "28px",
                flexShrink: 0,
                display: "inline-block",
                transform: "scale(1)",
                transformOrigin: "left center",
                transition: "transform 0.55s cubic-bezier(0.45, 0, 0.2, 1)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.06)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
              }}
            >
              Mira.
            </a>

            {/* Nav links */}
            {links.map((link) => (
              <a
                key={link.key}
                href={link.href}
                style={pillNavAnchorStyle}
                {...pillNavAnchorHover}
                onClick={smoothScrollToHash}
              >
                {link.label}
              </a>
            ))}

            {/* Language switcher in pill — text only */}
            <div ref={pillDropdownRef} style={{ position: "relative", marginLeft: "14px" }}>
              <button
                onClick={() => setLangOpen((v) => !v)}
                style={{ ...pillLinkStyle, display: "flex", alignItems: "center", gap: "3px" }}
              >
                <span>{lang === "en" ? "EN" : "中文"}</span>
                <svg
                  width="8" height="8" viewBox="0 0 12 12" fill="none"
                  style={{
                    transform: langOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                    opacity: 0.6,
                  }}
                >
                  <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Pill dropdown */}
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 6px)",
                  left: "50%",
                  transform: langOpen ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(-4px)",
                  minWidth: "110px",
                  background: "rgba(15,15,15,0.95)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "10px",
                  padding: "4px",
                  opacity: langOpen ? 1 : 0,
                  pointerEvents: langOpen ? "auto" : "none",
                  transition: "opacity 0.2s ease, transform 0.2s ease",
                  zIndex: 200,
                }}
              >
                {[
                  { code: "en" as const, label: "English" },
                  { code: "zh" as const, label: "Chinese" },
                ].map((opt) => (
                  <button
                    key={opt.code}
                    onClick={() => { setLang(opt.code); setLangOpen(false); }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                      padding: "7px 10px",
                      background: "transparent",
                      border: "none",
                      borderRadius: "7px",
                      color: lang === opt.code ? "#fff" : "rgba(255,255,255,0.65)",
                      fontSize: "13px",
                      fontWeight: lang === opt.code ? 400 : 300,
                      fontFamily: "inherit",
                      textAlign: "left",
                      cursor: "pointer",
                      transition: "background 0.15s ease",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.06)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
                  >
                    <span>{opt.label}</span>
                    {lang === opt.code && (
                      <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                        <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Login text button */}
            <a
              href="#login"
              style={{
                fontSize: "13px",
                fontWeight: wNavPill,
                color: "rgba(255,255,255,0.7)",
                padding: "2.4px 6.4px",
                textDecoration: "none",
                whiteSpace: "nowrap",
                letterSpacing: "0.01em",
                transition: "color 0.2s ease",
                ...zhNavFace,
              }}
              onClick={smoothScrollToHash}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#fff"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.7)"; }}
            >
              {t.nav.login}
            </a>

            {/* CTA — white fill, dark text, 1:1 micro1.ai */}
            <a
              href="#cta"
              onClick={smoothScrollToHash}
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "rgb(0,0,0)",
                padding: "8px 18px",
                borderRadius: "80px",
                background: "rgba(255,255,255,0.9)",
                textDecoration: "none",
                display: "inline-block",
                whiteSpace: "nowrap",
                letterSpacing: "0.01em",
                marginLeft: "12px",
                transition: "background 0.2s ease",
                flexShrink: 0,
                ...zhNavFace,
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#fff"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.9)"; }}
            >
              {t.nav.cta}
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
