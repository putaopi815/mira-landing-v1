"use client";

import { useState } from "react";
import { FadeIn, StaggerItem } from "@/components/motion/fade-in";
import { VerticalFadeDivider } from "@/components/ui/vertical-fade-divider";
import { WavePathDivider } from "@/components/ui/wave-path-divider";
import { hoverCellVerticalPadding } from "@/lib/hover-cell-padding";
import { useLang } from "@/lib/i18n";
import { useIsMobile } from "@/lib/use-mobile";

function ProblemColumn({
  p,
  index,
}: {
  p: { num: string; title: string; desc: string };
  index: number;
}) {
  const [hover, setHover] = useState(false);
  const inlinePad = "clamp(18px, 4vw, 32px)";

  return (
    <StaggerItem
      index={index}
      staggerDelay={0.22}
      distance={40}
      style={{ height: "100%", minHeight: "min-content", display: "flex" }}
    >
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          flex: 1,
          minHeight: "min-content",
          ...hoverCellVerticalPadding,
          paddingLeft: inlinePad,
          paddingRight: inlinePad,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "18px",
          textAlign: "left",
          background: hover ? "rgba(255,255,255,0.05)" : "transparent",
          transition: "background 0.28s ease",
          boxSizing: "border-box",
          overflow: "visible",
        }}
      >
        <span
          style={{
            display: "block",
            fontSize: "12px",
            fontFamily: "var(--font-geist-mono), monospace",
            letterSpacing: "0.1em",
            lineHeight: 1.2,
            color: "rgba(255,255,255,0.35)",
          }}
        >
          {p.num}
        </span>
        <h3
          style={{
            fontSize: "clamp(1.25rem, 1vw + 1.1rem, 1.375rem)",
            fontWeight: 400,
            color: "#fff",
            margin: 0,
            lineHeight: 1.25,
          }}
        >
          {p.title}
        </h3>
        <p
          style={{
            fontSize: "1rem",
            color: "rgba(255,255,255,0.55)",
            lineHeight: 1.65,
            maxWidth: "36ch",
            whiteSpace: "pre-line",
            margin: 0,
            paddingBottom: "0.35em",
            overflow: "visible",
          }}
        >
          {p.desc}
        </p>
      </div>
    </StaggerItem>
  );
}

export function Problem() {
  const { t } = useLang();
  const isMobile = useIsMobile();
  const problems = t.problem.items;
  const problemGridColumns = problems
    .flatMap((_, i) => (i === 0 ? ["1fr"] : ["1px", "1fr"]))
    .join(" ");

  return (
    <section
      style={{
        padding: isMobile ? "clamp(3.75rem, 10vw, 5rem) 1.25rem" : "140px 120px",
        background: "#000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: isMobile ? "clamp(2.5rem, 8vw, 3rem)" : "80px",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: "800px", width: isMobile ? "100%" : undefined }}>
        {isMobile ? (
          <>
            {/*
              整屏 snap + overflow:hidden 下，首行常不够 intersection 阈值，FadeIn 会一直保持 opacity:0，
              表现为「缺一行标题」。移动端直接展示双行标题。
            */}
            <h2
              style={{
                fontSize: "clamp(1.5rem, 5vw, 2rem)",
                fontWeight: 300,
                letterSpacing: "-1.2px",
                lineHeight: 1.15,
                color: "rgba(255,255,255,0.5)",
                margin: "0 0 12px",
              }}
            >
              {t.problem.title1}
            </h2>
            <p
              style={{
                fontSize: "clamp(1.5rem, 5vw, 2rem)",
                fontWeight: 400,
                letterSpacing: "-1.2px",
                lineHeight: 1.15,
                color: "rgba(255,255,255,1)",
                margin: 0,
              }}
            >
              {t.problem.title2}
            </p>
          </>
        ) : (
          <>
            <FadeIn>
              <h2
                style={{
                  fontSize: "48px",
                  fontWeight: 300,
                  letterSpacing: "-1.2px",
                  lineHeight: 1.15,
                  color: "rgba(255,255,255,0.5)",
                  marginBottom: "16px",
                }}
              >
                {t.problem.title1}
              </h2>
            </FadeIn>
            <FadeIn delay={0.28}>
              <p
                style={{
                  fontSize: "48px",
                  fontWeight: 400,
                  letterSpacing: "-1.2px",
                  lineHeight: 1.15,
                  color: "rgba(255,255,255,1)",
                  margin: 0,
                }}
              >
                {t.problem.title2}
              </p>
            </FadeIn>
          </>
        )}
      </div>

      {isMobile ? (
        <div style={{ width: "100%" }}>
          <WavePathDivider />
        </div>
      ) : (
        <FadeIn delay={0.38} style={{ width: "800px" }}>
          <WavePathDivider />
        </FadeIn>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : problemGridColumns,
          alignItems: "stretch",
          gap: 0,
          width: "1200px",
          maxWidth: "100%",
          margin: "0 auto",
        }}
      >
        {(isMobile
          ? problems.flatMap((p, i) => {
              const col = <ProblemColumn key={p.num} p={p} index={i} />;
              if (i < problems.length - 1) {
                return [
                  col,
                  <div key={`problem-m-div-${i}`} style={{ gridColumn: "1 / -1", width: "100%" }}>
                    <WavePathDivider />
                  </div>,
                ];
              }
              return [col];
            })
          : problems.flatMap((p, i) => {
              const col = <ProblemColumn key={p.num} p={p} index={i} />;
              if (i < problems.length - 1) {
                return [col, <VerticalFadeDivider key={`problem-div-${i}`} />];
              }
              return [col];
            }))}
      </div>
    </section>
  );
}
