"use client";

import { useEffect, type RefObject } from "react";

/** Returns the element-top positions (relative to the viewport) where progress is 0 and 1. */
export type ScrollRange = (rect: DOMRect, viewportHeight: number) => [start: number, end: number];

/** 0 when the element's top reaches the viewport top, 1 when its bottom reaches the viewport bottom. */
export const pinnedRange: ScrollRange = (rect, vh) => [0, -(rect.height - vh)];

/** 0 when the element starts entering from below, 1 when it has fully left through the top. */
export const throughRange: ScrollRange = (rect, vh) => [vh, -rect.height];

/**
 * Calls `onProgress` with a 0–1 value as the element scrolls, throttled to one call per frame.
 * The callback should write to the DOM directly (e.g. CSS custom properties) rather than set state.
 */
export function useScrollProgress<T extends HTMLElement>(
  ref: RefObject<T | null>,
  onProgress: (progress: number, el: T) => void,
  range: ScrollRange = pinnedRange,
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    let last = -1;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.bottom < -vh || rect.top > vh * 2) return;
      const [start, end] = range(rect, vh);
      const span = start - end || 1;
      const p = Math.min(1, Math.max(0, (start - rect.top) / span));
      if (Math.abs(p - last) < 0.0005) return;
      last = p;
      onProgress(p, el);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onResize = () => {
      last = -1;
      schedule();
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
    };
  }, [ref, onProgress, range]);
}
