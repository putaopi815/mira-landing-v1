"use client";

import { useSyncExternalStore } from "react";

export const MOBILE_BREAKPOINT = 767;

const query = () =>
  typeof window !== "undefined"
    ? window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`)
    : null;

function subscribe(onStoreChange: () => void) {
  const mq = query();
  if (!mq) return () => {};
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getSnapshot() {
  return query()?.matches ?? false;
}

/** SSR / 首帧与客户端一致，避免 hydration mismatch */
function getServerSnapshot() {
  return false;
}

export function useIsMobile() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
