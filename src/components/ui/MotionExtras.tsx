"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Two small finishing touches, mounted once in the layout:
 * - marquee tapes speed up while the page is scrolling, then ease back
 * - on mouse/trackpad, buttons lean towards the cursor ("magnetic" buttons)
 */
export function MotionExtras() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // ---- marquee velocity ----
    const tracks = Array.from(document.querySelectorAll<HTMLElement>("[data-marquee-track]"));
    let lastY = window.scrollY;
    let boost = 0;
    let frame = 0;
    const tick = () => {
      boost *= 0.9;
      const rate = 1 + Math.min(boost, 5);
      for (const t of tracks) for (const a of t.getAnimations()) a.playbackRate = rate;
      frame = boost > 0.02 ? requestAnimationFrame(tick) : 0;
      if (!frame) for (const t of tracks) for (const a of t.getAnimations()) a.playbackRate = 1;
    };
    const onScroll = () => {
      const y = window.scrollY;
      boost = Math.max(boost, Math.abs(y - lastY) / 14);
      lastY = y;
      if (!frame && tracks.length) frame = requestAnimationFrame(tick);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // ---- magnetic buttons (fine pointers only) ----
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const onMove = (e: PointerEvent) => {
      const btn = (e.target as Element | null)?.closest<HTMLElement>(".btn");
      if (!btn) return;
      const r = btn.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
      const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
      btn.style.translate = `${(dx * 10).toFixed(1)}px ${(dy * 8).toFixed(1)}px`;
    };
    const onOut = (e: PointerEvent) => {
      const btn = (e.target as Element | null)?.closest<HTMLElement>(".btn");
      if (btn && !btn.contains(e.relatedTarget as Node | null)) btn.style.translate = "";
    };
    if (fine) {
      document.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerout", onOut, { passive: true });
    }

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerout", onOut);
    };
  }, [pathname]);

  return null;
}
