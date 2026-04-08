"use client";

import { useLayoutEffect } from "react";
import { Navbar } from "@/components/layout/navbar";
import { FullPageScroll } from "@/components/motion/full-page-scroll";
import { LangProvider } from "@/lib/i18n";
import { Hero } from "@/components/sections/hero";
import { Problem } from "@/components/sections/problem";
import { Paradigm } from "@/components/sections/paradigm";
import { Solution } from "@/components/sections/solution";
import { HowItWorks } from "@/components/sections/how-it-works";
import { UserRole } from "@/components/sections/user-role";
import { SystemDepth } from "@/components/sections/system-depth";
import { Differentiators } from "@/components/sections/differentiators";
import { FinalCTA } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    const nav = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;
    if (nav?.type !== "reload") return;
    window.scrollTo(0, 0);
    const { pathname, search } = window.location;
    if (window.location.hash) {
      window.history.replaceState(null, "", `${pathname}${search}`);
    }
  }, []);

  return (
    <LangProvider>
      <Navbar />
      <FullPageScroll />
      <main className="mf-main">
        <div id="snap-hero" className="snap-section">
          <Hero />
        </div>
        <div id="snap-problem" className="snap-section">
          <Problem />
        </div>
        <div id="snap-paradigm" className="snap-section">
          <Paradigm />
        </div>
        <div id="snap-solution" className="snap-section">
          <Solution />
        </div>
        <div id="snap-how-it-works" className="snap-section">
          <HowItWorks />
        </div>
        <div id="snap-user-role" className="snap-section">
          <UserRole />
        </div>
        <div id="snap-system-depth" className="snap-section">
          <SystemDepth />
        </div>
        <div id="snap-differentiators" className="snap-section">
          <Differentiators />
        </div>
        <div id="snap-final-cta" className="snap-section-last">
          <FinalCTA />
          <Footer />
        </div>
      </main>
    </LangProvider>
  );
}
