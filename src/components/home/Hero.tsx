"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { site } from "@/data/site";
import { ArrowRight, Phone } from "@/components/ui/Icons";
import { Img } from "@/components/ui/Img";
import { OpenBadge } from "@/components/ui/OpenBadge";
import { REDUCED_MOTION } from "@/lib/useMediaQuery";
import { useScrollProgress, type ScrollRange } from "@/lib/useScrollProgress";
import styles from "./Hero.module.css";

const heroRange: ScrollRange = (rect) => [0, -rect.height];

const ringText = "Wood-fired ✦ Hand-stretched ✦ Neapolitan style ✦ Panampilly Nagar ✦ Kochi ✦ ";

// 24 sun-rays as wedges that fade out towards the edge (no CSS mask, so rotating them stays on the GPU)
const rays = Array.from({ length: 24 }, (_, i) => {
  const a = (i * 15 * Math.PI) / 180;
  const b = ((i * 15 + 5) * Math.PI) / 180;
  const f = (n: number) => n.toFixed(1);
  return `M0 0L${f(Math.cos(a) * 100)} ${f(Math.sin(a) * 100)}L${f(Math.cos(b) * 100)} ${f(Math.sin(b) * 100)}Z`;
}).join("");

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

const Chars = ({ word, offset }: { word: string; offset: number }) =>
  [...word].map((ch, i) => (
    <span key={i} className={styles.char} style={{ "--ci": offset + i } as CSSProperties}>
      {ch}
    </span>
  ));

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const partsRef = useRef<Record<string, HTMLElement> | null>(null);

  // scroll effects write transforms straight onto a handful of elements: no style recalculation of the whole hero
  const onProgress = useCallback((p: number, el: HTMLElement) => {
    partsRef.current ??= Object.fromEntries(
      Array.from(el.querySelectorAll<HTMLElement>("[data-part]"), (n) => [n.dataset.part as string, n]),
    );
    const vw = window.innerWidth / 100;
    const { l1, l2, plate, ring, seal, ings } = partsRef.current;
    if (l1) l1.style.transform = `translate3d(${(-p * 14 * vw).toFixed(1)}px,0,0)`;
    if (l2) l2.style.transform = `translate3d(${(p * 9 * vw).toFixed(1)}px,0,0)`;
    if (plate) plate.style.transform = `translate3d(0,${(p * 20).toFixed(2)}%,0) rotate(${(p * 90).toFixed(2)}deg) scale(${(1 + p * 0.12).toFixed(4)})`;
    if (ring) ring.style.transform = `rotate(${(-p * 60).toFixed(2)}deg)`;
    if (seal) seal.style.transform = `translate3d(0,${(-p * 160).toFixed(1)}px,0)`;
    if (ings) ings.style.transform = `translate3d(0,${(-p * 140).toFixed(1)}px,0)`;
  }, []);
  useScrollProgress(ref, onProgress, heroRange);

  // pointer-driven parallax and 3D tilt (mouse/trackpad only)
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches || window.matchMedia(REDUCED_MOTION).matches) return;
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
            <span data-part="l1" className={`${styles.line} ${styles.l1}`} aria-hidden="true">
              <Chars word="Grana" offset={0} />
            </span>
            <span data-part="l2" className={`${styles.line} ${styles.l2}`} aria-hidden="true">
              <Chars word="Pizzeria" offset={5} />
            </span>
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
          <svg className={styles.rays} viewBox="-100 -100 200 200" aria-hidden="true">
            <defs>
              <radialGradient id="hero-ray-fade" r="50%">
                <stop offset="0.12" stopColor="#ffecd2" stopOpacity="0" />
                <stop offset="0.3" stopColor="#ffecd2" stopOpacity="0.22" />
                <stop offset="1" stopColor="#ffecd2" stopOpacity="0" />
              </radialGradient>
            </defs>
            <path d={rays} fill="url(#hero-ray-fade)" />
          </svg>
          <div className={styles.glow} aria-hidden="true" />
          <div className={styles.sparks} aria-hidden="true">
            {Array.from({ length: 12 }, (_, i) => (
              <span key={i} style={{ "--s": i } as CSSProperties} />
            ))}
          </div>

          <div className={styles.ringWrap} aria-hidden="true">
            <div data-part="ring" className={styles.ringScroll}>
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
          </div>

          <div className={styles.plateEnter}>
            <div className={styles.plateTilt}>
              <div data-part="plate" className={styles.plateScroll}>
                <div className={styles.shadow} aria-hidden="true" />
                <div className={styles.plate}>
                  <div className={styles.plateSpin}>
                    <Img
                      src="/images/story/hero-pizza.jpg"
                      alt="A wood-fired Neapolitan margherita with blistered crust, tomato, fior di latte and basil"
                      fill
                      sizes="(max-width: 900px) 90vw, 46vw"
                      loading="eager"
                      fetchPriority="high"
                      quality={80}
                    />
                  </div>
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

          <div data-part="ings" className={styles.ings}>
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
          </div>

          <div data-part="seal" className={styles.sealScroll}>
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
              <Img
                src="/logo.png"
                alt="Grana Pizzeria by Abramatt logo"
                width={240}
                height={240}
                sizes="(max-width: 760px) 120px, 190px"
                loading="eager"
                className={styles.sealLogo}
              />
            </div>
          </div>
        </div>
      </div>

      <a href="#story" className={styles.cue} aria-label="Scroll to our story">
        <span>Scroll</span>
      </a>
    </section>
  );
}
