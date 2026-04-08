"use client";

import { useState } from "react";
import { FadeIn, StaggerItem } from "@/components/motion/fade-in";
import { WavePathDivider } from "@/components/ui/wave-path-divider";
import { hoverCellVerticalPadding } from "@/lib/hover-cell-padding";
import { fwUi, useLang } from "@/lib/i18n";
import { useIsMobile } from "@/lib/use-mobile";

const AGENT_COLOR = "rgba(255,255,255,0.45)";

const padX = "clamp(20px, 3vw, 40px)";

/** 上行竖线：顶端渐隐，底端与横线交接处保持不透明 */
const verticalFadeTopOnly =
  "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.14) 14%, rgba(255,255,255,0.14) 100%)";
/** 下行竖线：底端渐隐，顶端与横线交接处保持不透明 */
const verticalFadeBottomOnly =
  "linear-gradient(to bottom, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.14) 86%, transparent 100%)";

type AgentRow = {
  name: string;
  role: string;
  desc: string;
  color: string;
};

function AgentColumn({
  agent,
  index,
  showDivider,
  dividerFade = "top",
  roleFontWeight,
}: {
  agent: AgentRow;
  index: number;
  showDivider: boolean;
  dividerFade?: "top" | "bottom";
  roleFontWeight: number;
}) {
  const [hover, setHover] = useState(false);

  return (
    <StaggerItem
      index={index}
      staggerDelay={0.18}
      distance={28}
      style={{
        height: "100%",
        minHeight: 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          position: "relative",
          flex: 1,
          minHeight: 0,
          width: "100%",
          ...hoverCellVerticalPadding,
          paddingLeft: padX,
          paddingRight: padX,
          textAlign: "left",
          background: hover ? "rgba(255,255,255,0.05)" : "transparent",
          transition: "background 0.28s ease",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "14px",
          boxSizing: "border-box",
        }}
      >
        {showDivider ? (
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              width: "1px",
              background:
                dividerFade === "bottom" ? verticalFadeBottomOnly : verticalFadeTopOnly,
              pointerEvents: "none",
            }}
          />
        ) : null}
        <span
          style={{
            display: "block",
            fontSize: "12px",
            fontWeight: roleFontWeight,
            letterSpacing: "0.14em",
            color: agent.color,
            lineHeight: 1.3,
          }}
        >
          {agent.role}
        </span>
        <h3
          style={{
            fontSize: "clamp(20px, 2.2vw, 26px)",
            fontWeight: 300,
            color: "#fff",
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            margin: 0,
          }}
        >
          {agent.name}
        </h3>
        <p
          style={{
            fontSize: "14px",
            color: "rgba(255,255,255,0.48)",
            lineHeight: 1.5,
            margin: 0,
            maxWidth: "42ch",
            whiteSpace: "pre-line",
          }}
        >
          {agent.desc}
        </p>
      </div>
    </StaggerItem>
  );
}

export function Solution() {
  const { t, lang } = useLang();
  const isMobile = useIsMobile();
  const roleFw = fwUi(lang, 500);
  const agents: AgentRow[] = t.solution.agents.map((a) => ({
    name: a.name,
    role: a.role,
    desc: a.desc,
    color: AGENT_COLOR,
  }));

  return (
    <section
      id="agents"
      style={{
        /* 与 Paradigm 同理：撑满 snap-section，避免居中后上下留白透出「纯黑」与区内径向高光形成色差 */
        boxSizing: "border-box",
        flex: "1 1 auto",
        minHeight: 0,
        width: "100%",
        padding: isMobile ? "clamp(5rem, 14vw, 6.5rem) 1.25rem" : "48px clamp(24px, 5vw, 80px)",
        background: "#000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: isMobile ? "clamp(2.25rem, 8vw, 3rem)" : "40px",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 120% 85% at 50% 0%, rgba(255,255,255,0.045) 0%, transparent 55%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        <FadeIn>
          <p
            style={{
              fontSize: "11px",
              fontWeight: roleFw,
              letterSpacing: "2.5px",
              color: "rgba(255,255,255,0.35)",
              marginBottom: isMobile ? "14px" : "10px",
            }}
          >
            {t.solution.eyebrow}
          </p>
        </FadeIn>
        <FadeIn delay={0.18}>
          <h2
            style={{
              fontSize: isMobile ? "32px" : "48px",
              fontWeight: 400,
              letterSpacing: "-1px",
              lineHeight: 1.12,
              color: "#fff",
              margin: 0,
              paddingBottom: isMobile ? "clamp(0.35rem, 2vw, 0.75rem)" : undefined,
              whiteSpace: isMobile ? "normal" : "nowrap",
            }}
          >
            {isMobile ? (
              <>
                {t.solution.title[0]}
                <br />
                {t.solution.title[1]}
              </>
            ) : (
              [t.solution.title[0], t.solution.title[1]]
                .map((s) => s.trim())
                .filter(Boolean)
                .join(" ")
            )}
          </h2>
        </FadeIn>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
          alignItems: "stretch",
          gap: 0,
          width: "100%",
          maxWidth: "1100px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {!isMobile &&
          agents.slice(0, 3).map((a, i) => (
            <AgentColumn
              key={a.name}
              agent={a}
              index={i}
              showDivider={i < 2}
              dividerFade="top"
              roleFontWeight={roleFw}
            />
          ))}
        {isMobile
          ? agents.flatMap((a, i) => {
              const col = (
                <AgentColumn
                  key={a.name}
                  agent={a}
                  index={i}
                  showDivider={false}
                  dividerFade="bottom"
                  roleFontWeight={roleFw}
                />
              );
              if (i < agents.length - 1) {
                return [
                  col,
                  <div key={`solution-m-div-${i}`} style={{ gridColumn: "1 / -1", width: "100%" }}>
                    <WavePathDivider />
                  </div>,
                ];
              }
              return [col];
            })
          : null}
        {!isMobile ? (
          <>
            <div
              style={{
                gridColumn: "1 / -1",
                width: "100%",
                padding: 0,
                margin: 0,
                lineHeight: 0,
              }}
            >
              <FadeIn delay={0.52} style={{ width: "100%", display: "block", margin: 0 }}>
                <div
                  style={{
                    width: "100%",
                    height: "1px",
                    display: "block",
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.25) 50%, transparent)",
                  }}
                />
              </FadeIn>
            </div>
            <div
              style={{
                gridColumn: "1 / -1",
                display: "flex",
                justifyContent: "center",
                alignItems: "stretch",
                gap: 0,
                width: "100%",
              }}
            >
              {agents.slice(3).map((a, i) => (
                <div
                  key={a.name}
                  style={{
                    flex: "0 1 calc((100% - 0px) / 3)",
                    maxWidth: "calc(100% / 3)",
                    minWidth: 0,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <AgentColumn
                    agent={a}
                    index={i + 3}
                    showDivider={i === 0}
                    dividerFade="bottom"
                    roleFontWeight={roleFw}
                  />
                </div>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}
