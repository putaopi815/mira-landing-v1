"use client";

import { useInView } from "framer-motion";
import { useRef, useState } from "react";

/* ─────────────────────────────────────────────
   FadeIn — basic fade + translateY on scroll
   ───────────────────────────────────────────── */
interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  once?: boolean;
  threshold?: number;
  style?: React.CSSProperties;
  duration?: number;
}

function getTranslate(direction: string, distance: number) {
  switch (direction) {
    case "up":
      return `translateY(${distance}px)`;
    case "down":
      return `translateY(-${distance}px)`;
    case "left":
      return `translateX(${distance}px)`;
    case "right":
      return `translateX(-${distance}px)`;
    default:
      return "translate(0,0)";
  }
}

export function FadeIn({
  children,
  className,
  delay = 0,
  direction = "up",
  distance = 48,
  once = true,
  threshold = 0.38,
  style,
  duration = 1.05,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translate(0,0)" : getTranslate(direction, distance),
        transition: `opacity ${duration}s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform ${duration}s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   ScaleIn — scale from small + fade
   ───────────────────────────────────────────── */
interface ScaleInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
  threshold?: number;
  style?: React.CSSProperties;
  from?: number;
}

export function ScaleIn({
  children,
  className,
  delay = 0,
  once = true,
  threshold = 0.38,
  style,
  from = 0.92,
}: ScaleInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: isInView ? 1 : 0,
        transform: isInView ? "scale(1)" : `scale(${from})`,
        transition: `opacity 1.1s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 1.1s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   BlurFade — blur + fade on scroll
   ───────────────────────────────────────────── */
interface BlurFadeProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
  style?: React.CSSProperties;
}

export function BlurFade({
  children,
  className,
  delay = 0,
  once = true,
  style,
}: BlurFadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: 0.38 });

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: isInView ? 1 : 0,
        filter: isInView ? "blur(0px)" : "blur(10px)",
        transform: isInView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 1.1s cubic-bezier(0.22,1,0.36,1) ${delay}s, filter 1.1s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 1.1s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
        willChange: "opacity, filter, transform",
      }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   StaggerContainer + StaggerItem
   Parent triggers visibility, children stagger in
   ───────────────────────────────────────────── */
interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  once?: boolean;
  threshold?: number;
  style?: React.CSSProperties;
}

export function StaggerContainer({
  children,
  className,
  once = true,
  threshold = 0.38,
  style,
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });

  return (
    <div
      ref={ref}
      className={className}
      style={style}
      data-inview={isInView ? "true" : "false"}
    >
      {children}
    </div>
  );
}

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  index: number;
  staggerDelay?: number;
  direction?: "up" | "left" | "right" | "none";
  distance?: number;
  style?: React.CSSProperties;
}

export function StaggerItem({
  children,
  className,
  index,
  staggerDelay = 0.18,
  direction = "up",
  distance = 40,
  style,
}: StaggerItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.38 });

  const delay = index * staggerDelay;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translate(0,0)" : getTranslate(direction, distance),
        transition: `opacity 1.05s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 1.05s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   RevealUp — mask reveal from bottom
   ───────────────────────────────────────────── */
export function RevealUp({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.42 });

  return (
    <div ref={ref} className={className} style={{ overflow: "hidden" }}>
      <div
        style={{
          transform: isInView ? "translateY(0)" : "translateY(105%)",
          transition: `transform 1s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   HoverCard — card with hover lift + glow
   ───────────────────────────────────────────── */
interface HoverCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  glowColor?: string;
}

export function HoverCard({
  children,
  className,
  style,
  glowColor = "rgba(109,124,255,0.15)",
}: HoverCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={className}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...style,
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? `0 20px 40px -12px ${glowColor}` : "0 0 0 0 transparent",
        borderColor: hovered ? "rgba(255,255,255,0.12)" : (style?.borderColor ?? "rgba(255,255,255,0.05)"),
        transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s cubic-bezier(0.16,1,0.3,1), border-color 0.35s ease",
      }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   HoverButton — button with hover scale + glow
   ───────────────────────────────────────────── */
interface HoverButtonProps {
  children: React.ReactNode;
  href?: string;
  style?: React.CSSProperties;
  glowColor?: string;
}

export function HoverButton({
  children,
  href = "#",
  style,
  glowColor = "rgba(255,255,255,0.15)",
}: HoverButtonProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...style,
        textDecoration: "none",
        transform: hovered ? "scale(1.04)" : "scale(1)",
        boxShadow: hovered ? `0 8px 30px -6px ${glowColor}` : "none",
        transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease",
        display: style?.display ?? "inline-block",
      }}
    >
      {children}
    </a>
  );
}
