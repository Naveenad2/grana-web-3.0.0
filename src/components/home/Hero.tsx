"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { site } from "@/data/site";
import { ArrowRight, Phone } from "@/components/ui/Icons";
import { OpenBadge } from "@/components/ui/OpenBadge";
import { REDUCED_MOTION } from "@/lib/useMediaQuery";
import { useScrollProgress, type ScrollRange } from "@/lib/useScrollProgress";
import styles from "./Hero.module.css";

const heroRange: ScrollRange = (rect) => [0, -rect.height];

const lines = [
  { word: "Grana", cls: styles.l1, offset: 0 },
  { word: "Grana", cls: styles.l2, offset: 3 },
  { word: "Pizzeria", cls: styles.l3, offset: 6 },
];

const ringText = "Wood-fired ✦ Hand-stretched ✦ Neapolitan style ✦ Panampilly Nagar ✦ Kochi ✦ ";

const Leaf = ({ shade = "#2e6a3a" }: { shade?: string }) => (
  <svg viewBox="0 0 60 40">
    <path d="M2 20C14 2 44 0 58 20 44 40 14 38 2 20Z" fill={shade} />
    <path d="M4 20h50M20 20l8-8M32 20l8-8M24 20l7 7M38 20l7 6" stroke="#1d4f29" strokeWidth="1.4" fill="none" strokeLinecap="round" />
  </svg>
);

const Tomato = () => (
  <svg viewBox="0 0 40 40">
    <circle cx="20" cy="23" r="16" fill="#d33a22" />
    <ellipse cx="13.5" cy="17" rx="5" ry="2.6" fill="#fff" opacity="0.35" transform="rotate(-35 13.5 17)" />
    <path d="M20 4.5l1.8 4.6 4.9-.9-3.4 3.6 3.6 3.3-4.9-.4-2 4.5-2-4.5-4.9.4 3.6-3.3-3.4-3.6 4.9.9Z" fill="#2e6a3a" />
  </svg>
);

const Chili = () => (
  <svg viewBox="0 0 70 30">
    <path d="M10 14C26 8 46 8 64 22 50 26 26 26 12 21Z" fill="#c8291b" />
    <path d="M18 14c10-3 22-3 32 2" stroke="#ff7b5c" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
    <path d="M12 16C8 12 4 12 2 8" stroke="#2e6a3a" strokeWidth="4" fill="none" strokeLinecap="round" />
  </svg>
);

const Garlic = () => (
  <svg viewBox="0 0 40 46">
    <path d="M20 2C30 12 38 22 36 32 34 42 6 42 4 32 2 22 10 12 20 2Z" fill="#f6ecd9" />
    <path d="M20 6c-4 10-6 22-4 34M20 6c4 10 6 22 4 34" stroke="#d9c5a3" strokeWidth="1.5" fill="none" />
  </svg>
);

interface Ingredient {
  node: ReactNode;
  top: string;
  left: string;
  w: number;
  rot: number;
  fx: string;
  fy: string;
  d: number;
  depth: number;
  mobile?: boolean;
}

const ingredients: Ingredient[] = [
  { node: <Leaf />, top: "6%", left: "84%", w: 76, rot: -28, fx: "220px", fy: "-200px", d: 0.85, depth: 46, mobile: true },
  { node: <Leaf shade="#3c8048" />, top: "74%", left: "-6%", w: 58, rot: 34, fx: "-240px", fy: "140px", d: 1.0, depth: 60, mobile: true },
  { node: <Leaf shade="#357442" />, top: "-4%", left: "42%", w: 42, rot: 140, fx: "0px", fy: "-260px", d: 1.15, depth: 30 },
  { node: <Tomato />, top: "86%", left: "80%", w: 54, rot: 0, fx: "200px", fy: "220px", d: 0.95, depth: 38, mobile: true },
  { node: <Tomato />, top: "34%", left: "97%", w: 36, rot: 20, fx: "260px", fy: "0px", d: 1.1, depth: 70 },
  { node: <Chili />, top: "50%", left: "-11%", w: 70, rot: -24, fx: "-260px", fy: "-40px", d: 1.25, depth: 52 },
  { node: <Garlic />, top: "96%", left: "34%", w: 34, rot: 18, fx: "0px", fy: "260px", d: 1.35, depth: 34, mobile: true },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  const onProgress = useCallback((p: number, el: HTMLElement) => {
    el.style.setProperty("--hp", p.toFixed(4));
  }, []);
  useScrollProgress(ref, onProgress, heroRange);

  // pointer-driven parallax and 3D tilt (desktop only)
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches || window.matchMedia(REDUCED_MOTION).matches) return;
    let frame = 0;
    let mx = 0;
    let my = 0;
    const apply = () => {
      frame = 0;
      el.style.setProperty("--mx", mx.toFixed(3));
      el.style.setProperty("--my", my.toFixed(3));
    };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      mx = (e.clientX - r.left) / r.width - 0.5;
      my = (e.clientY - r.top) / r.height - 0.5;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      mx = 0;
      my = 0;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section ref={ref} className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <h1 id="hero-title" className={styles.type}>
            <span className="sr-only">Grana Pizzeria by Abramatt: Neapolitan pizza in Panampilly Nagar, Kochi</span>
            {lines.map((l) => (
              <span key={l.cls} className={`${styles.line} ${l.cls}`} aria-hidden="true">
                {[...l.word].map((ch, i) => (
                  <span key={i} className={styles.char} style={{ "--ci": l.offset + i } as CSSProperties}>
                    {ch}
                  </span>
                ))}
              </span>
            ))}
            <span className={`script ${styles.byline}`} aria-hidden="true">
              by Abramatt
            </span>
          </h1>

          <div className={styles.bottom}>
            <p className={styles.lede}>
              Neapolitan-style pizza, opened by hand and blistered in a wood-fired oven. Pull up a chair on 1st
              Cross Road, Panampilly Nagar.
            </p>
            <div className={styles.ctas}>
              <Link href="/menu" className="btn">
                Explore the menu <ArrowRight />
              </Link>
              <a href={site.phone.href} className="btn btn--ghost">
                <Phone /> Takeaway
              </a>
            </div>
            <OpenBadge />
          </div>
        </div>

        <div className={styles.stage}>
          <div className={styles.rays} aria-hidden="true" />

          <div className={styles.ringWrap} aria-hidden="true">
            <svg className={styles.ring} viewBox="0 0 1000 1000">
              <defs>
                <path id="hero-ring-path" d="M500 500m-470 0a470 470 0 1 1 940 0a470 470 0 1 1-940 0" />
              </defs>
              <text>
                {/* textLength = circumference (2π·470), so two repeats close the loop seamlessly */}
                <textPath href="#hero-ring-path" textLength="2953" lengthAdjust="spacing">
                  {ringText.repeat(2)}
                </textPath>
              </text>
            </svg>
          </div>

          <div className={styles.plateEnter}>
            <div className={styles.plateTilt}>
              <div className={styles.plateScroll}>
                <div className={styles.shadow} aria-hidden="true" />
                <div className={styles.plate}>
                  <Image
                    src="/images/story/hero-pizza.jpg"
                    alt="A wood-fired Neapolitan margherita with blistered crust, tomato, fior di latte and basil"
                    fill
                    sizes="(max-width: 760px) 92vw, 46vw"
                    loading="eager"
                    fetchPriority="high"
                    quality={80}
                  />
                </div>
                <span className={styles.shine} aria-hidden="true" />
              </div>
            </div>
          </div>

          <svg className={styles.steam} viewBox="0 0 160 200" aria-hidden="true">
            <path d="M40 196C20 160 60 130 40 92S50 30 40 4" />
            <path d="M80 196C60 156 100 124 80 84S90 26 80 2" />
            <path d="M120 196C100 162 140 132 120 96S130 36 120 8" />
          </svg>

          {ingredients.map((it, i) => (
            <span
              key={i}
              className={`${styles.ing} ${it.mobile ? "" : styles.desktopOnly}`}
              aria-hidden="true"
              style={
                {
                  top: it.top,
                  left: it.left,
                  width: it.w,
                  "--rot": `${it.rot}deg`,
                  "--fx": it.fx,
                  "--fy": it.fy,
                  "--d": `${it.d}s`,
                  "--depth": it.depth,
                } as CSSProperties
              }
            >
              <span className={styles.ingBob} style={{ animationDelay: `${-i * 0.9}s` }}>
                {it.node}
              </span>
            </span>
          ))}

          <div className={styles.seal}>
            <svg viewBox="0 0 200 200" className={styles.sealText} aria-hidden="true">
              <defs>
                <path id="seal-circle" d="M100 100m-84 0a84 84 0 1 1 168 0a84 84 0 1 1-168 0" />
              </defs>
              <text>
                <textPath href="#seal-circle" textLength="527" lengthAdjust="spacing">
                  It&rsquo;s all about the base! ✦ It&rsquo;s all about the base! ✦{" "}
                </textPath>
              </text>
            </svg>
            <Image
              src="/logo.png"
              alt="Grana Pizzeria by Abramatt logo"
              width={240}
              height={240}
              sizes="(max-width: 760px) 120px, 180px"
              className={styles.sealLogo}
            />
          </div>
        </div>
      </div>

      <a href="#story" className={styles.cue} aria-label="Scroll to our story">
        <span>Scroll</span>
      </a>
    </section>
  );
}
