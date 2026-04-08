"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useLang } from "@/lib/i18n";
import { useIsMobile } from "@/lib/use-mobile";

/** 与 `dict.*.snapDots` 顺序一致 */
export const SNAP_SECTIONS = [
  { id: "snap-hero" },
  { id: "snap-problem" },
  { id: "snap-paradigm" },
  { id: "snap-solution" },
  { id: "snap-how-it-works" },
  { id: "snap-user-role" },
  { id: "snap-system-depth" },
  { id: "snap-differentiators" },
  { id: "snap-final-cta" },
] as const;

export function FullPageScroll() {
  const { t, lang } = useLang();
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const isScrollingRef = useRef(false);

  const scrollToIndex = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(index, SNAP_SECTIONS.length - 1));
    const el = document.getElementById(SNAP_SECTIONS[clamped].id);
    if (el) {
      const reduceMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    }
    setActiveIndex(clamped);
    activeIndexRef.current = clamped;
  }, []);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  // Track active section via IntersectionObserver（移动端同步高亮圆点）
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            const index = SNAP_SECTIONS.findIndex(
              (s) => s.id === entry.target.id
            );
            if (index !== -1) setActiveIndex(index);
          }
        });
      },
      { threshold: 0.5 }
    );

    SNAP_SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // 移动端：快速纵向滑动手势 → 与桌面滚轮类似，整屏 scrollIntoView（配合 html scroll-snap + smooth）
  useEffect(() => {
    if (!isMobile) return;

    let touchActive = false;
    let startY = 0;
    let startT = 0;

    const skipSwipeTarget = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return true;
      return !!target.closest(
        "button, a, input, textarea, select, label, [role='dialog'], .mf-nav-drawer, .mf-nav-mobile-bar, .mf-nav-drawer-overlay",
      );
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1 || skipSwipeTarget(e.target)) {
        touchActive = false;
        return;
      }
      touchActive = true;
      startY = e.touches[0].clientY;
      startT = performance.now();
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (!touchActive) return;
      touchActive = false;
      if (skipSwipeTarget(e.target)) return;
      const t = e.changedTouches[0];
      if (!t) return;

      const dy = startY - t.clientY;
      const dt = performance.now() - startT;
      if (dt < 40 || dt > 750 || Math.abs(dy) < 90) return;

      const velocity = Math.abs(dy) / dt;
      if (velocity < 0.35) return;

      if (isScrollingRef.current) return;

      const current = activeIndexRef.current;
      const dir = dy > 0 ? 1 : -1;
      const next = Math.max(0, Math.min(current + dir, SNAP_SECTIONS.length - 1));
      if (next === current) return;

      isScrollingRef.current = true;
      scrollToIndex(next);
      window.setTimeout(() => {
        isScrollingRef.current = false;
      }, 700);
    };

    document.addEventListener("touchstart", onTouchStart, { passive: true, capture: true });
    document.addEventListener("touchend", onTouchEnd, { passive: true, capture: true });
    return () => {
      document.removeEventListener("touchstart", onTouchStart, true);
      document.removeEventListener("touchend", onTouchEnd, true);
    };
  }, [isMobile, scrollToIndex]);

  // Wheel / trackpad → one section per gesture（桌面）
  useEffect(() => {
    if (isMobile) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= 30) return;

      if (isScrollingRef.current) {
        e.preventDefault();
        return;
      }

      const current = activeIndexRef.current;
      const deltaDown = e.deltaY > 0;
      const next = deltaDown ? current + 1 : current - 1;

      if (next < 0 || next >= SNAP_SECTIONS.length) {
        return;
      }

      e.preventDefault();
      isScrollingRef.current = true;
      scrollToIndex(next);
      window.setTimeout(() => {
        isScrollingRef.current = false;
      }, 700);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [isMobile, scrollToIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (isMobile) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        const prev = activeIndexRef.current;
        const next = Math.min(prev + 1, SNAP_SECTIONS.length - 1);
        if (next !== prev) scrollToIndex(next);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        const prev = activeIndexRef.current;
        const next = Math.max(prev - 1, 0);
        if (next !== prev) scrollToIndex(next);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMobile, scrollToIndex]);

  return (
    <div
      style={{
        position: "fixed",
        right: isMobile ? "max(10px, env(safe-area-inset-right, 0px))" : "28px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 200,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "12px",
      }}
    >
      {SNAP_SECTIONS.map((s, i) => {
        const label = t.snapDots[i] ?? "";
        return (
        <button
          key={s.id}
          onClick={() => scrollToIndex(i)}
          title={label}
          aria-label={lang === "zh" ? `跳转：${label}` : `Go to ${label}`}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: isMobile ? "18px" : "20px",
            height: isMobile ? "18px" : "20px",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: 0,
            position: "relative",
          }}
        >
          <span
            style={{
              display: "block",
              width: i === activeIndex ? (isMobile ? "7px" : "8px") : isMobile ? "4px" : "5px",
              height: i === activeIndex ? (isMobile ? "7px" : "8px") : isMobile ? "4px" : "5px",
              borderRadius: "50%",
              background:
                i === activeIndex
                  ? "rgba(255,255,255,0.95)"
                  : "rgba(255,255,255,0.28)",
              transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
              boxShadow:
                i === activeIndex
                  ? "0 0 10px 2px rgba(109,124,255,0.6)"
                  : "none",
            }}
          />
        </button>
      );
      })}
    </div>
  );
}
