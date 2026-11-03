"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Adds `.is-in` to every `[data-reveal]` element as it scrolls into view. Mounted once in the layout. */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    // observed element -> elements to reveal when it shows up
    const targets = new Map<Element, Set<Element>>();

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          targets.get(entry.target)?.forEach((el) => el.classList.add("is-in"));
          targets.delete(entry.target);
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    const observeAll = () => {
      document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)").forEach((el) => {
        // a fully clipped "mask" element has no visible area, so watch its parent instead
        const watch = el.dataset.reveal === "mask" && el.parentElement ? el.parentElement : el;
        const set = targets.get(watch);
        if (set) {
          set.add(el);
        } else {
          targets.set(watch, new Set([el]));
          io.observe(watch);
        }
      });
    };
    observeAll();

    // catch elements rendered after hydration (e.g. filtered menu cards). Text-only changes such as
    // live timers are ignored, and rescans are batched to one per frame.
    let frame = 0;
    const mo = new MutationObserver((records) => {
      if (frame) return;
      const added = records.some((r) => Array.from(r.addedNodes).some((n) => n.nodeType === Node.ELEMENT_NODE));
      if (added) frame = requestAnimationFrame(() => ((frame = 0), observeAll()));
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}
