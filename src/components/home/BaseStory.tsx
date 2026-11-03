"use client";

import { Img } from "@/components/ui/Img";
import Link from "next/link";
import { useCallback, useRef, type CSSProperties } from "react";
import { ArrowRight } from "@/components/ui/Icons";
import { useScrollProgress } from "@/lib/useScrollProgress";
import styles from "./BaseStory.module.css";

const chapters = [
  {
    label: "Dough",
    title: "It starts with a ball of dough",
    text: "Soft, rested and full of air. Flour, water, salt, yeast and time: everything good about a Grana pizza begins here.",
    image: "/images/story/step-1-dough.jpg",
    alt: "A ball of pizza dough held in floured hands",
    position: "50% 45%",
    mobilePosition: "50% 40%",
  },
  {
    label: "Stretch",
    title: "Opened by hand",
    text: "Pressed out from the centre with fingertips and stretched over the knuckles, pushing the air into the rim. That puffy edge has a name: cornicione.",
    image: "/images/story/step-2-stretch.jpg",
    alt: "A pizzaiolo stretching a pizza base over the backs of the hands",
    position: "38% 50%",
    mobilePosition: "70% 50%",
  },
  {
    label: "Top",
    title: "Tomato, then fior di latte",
    text: "A thin spiral of tomato and torn, milky mozzarella. Just enough, never too much. Restraint is the recipe.",
    image: "/images/story/step-3-sauce.jpg",
    alt: "A ladle spreading tomato sauce over a fresh pizza base",
    position: "58% 50%",
    mobilePosition: "64% 50%",
  },
  {
    label: "Fire",
    title: "Ninety seconds of fire",
    text: "Into the wood-fired oven. The rim puffs and blisters, the cheese melts, and the crust picks up its leopard spots.",
    image: "/images/story/step-4-fire.jpg",
    alt: "A Neapolitan pizza blistering beside open flames in a wood-fired oven",
    position: "45% 55%",
    mobilePosition: "42% 50%",
  },
  {
    label: "Serve",
    title: "Basil, oil, done",
    text: "Fresh basil, a swirl of olive oil and straight to your table while it is still singing. It's all about the base.",
    image: "/images/story/step-5-serve.jpg",
    alt: "A finished Neapolitan margherita with basil and a charred, airy crust",
    position: "50% 50%",
    mobilePosition: "56% 50%",
  },
];

const N = chapters.length;
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

export function BaseStory() {
  const ref = useRef<HTMLElement>(null);
  const timerRef = useRef<HTMLSpanElement>(null);
  const railRef = useRef<HTMLElement>(null);
  const framesRef = useRef<HTMLElement[] | null>(null);

  // Writes transforms straight onto the photo frames. Frames that are off-screen or fully covered
  // are hidden, so a phone only ever paints the one or two photos you can actually see.
  const onProgress = useCallback((p: number, el: HTMLElement) => {
    const frames = (framesRef.current ??= Array.from(el.querySelectorAll<HTMLElement>("[data-frame]")));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seg = p * N;
    // each photo wipes in around the boundary with the previous chapter, then slowly zooms out
    const reveal = frames.map((_, k) => (k === 0 ? 1 : clamp01((seg - (k - 0.32)) / 0.5)));
    frames.forEach((frame, k) => {
      const r = reveal[k];
      const covered = k < N - 1 && reveal[k + 1] >= 1;
      const show = r > 0 && !covered;
      frame.style.visibility = show ? "visible" : "hidden";
      if (!show) return;
      const media = frame.firstElementChild as HTMLElement;
      if (reduced) {
        frame.style.opacity = r.toFixed(3);
        return;
      }
      const zoom = clamp01((seg - (k - 0.32)) / 1.4);
      frame.style.transform = `translate3d(0,${((1 - r) * 100).toFixed(3)}%,0)`;
      media.style.transform = `translate3d(0,${((r - 1) * 100).toFixed(3)}%,0) scale(${(1.2 - zoom * 0.14).toFixed(4)})`;
    });
    railRef.current?.style.setProperty("--p", p.toFixed(4));
    const step = String(Math.min(N, Math.floor(seg) + 1));
    if (el.dataset.step !== step) el.dataset.step = step;
    const secs = String(Math.round(clamp01(seg - 3) * 90)).padStart(2, "0");
    if (timerRef.current && timerRef.current.textContent !== secs) timerRef.current.textContent = secs;
  }, []);
  useScrollProgress(ref, onProgress);

  return (
    <section ref={ref} className={styles.story} data-step="1" aria-labelledby="story-making-title">
      <div className={styles.sticky}>
        {chapters.map((c, k) => (
          <div key={c.image} className={styles.frame} data-frame style={{ zIndex: k + 1 } as CSSProperties}>
            <div className={styles.media}>
              <Img
                src={c.image}
                alt={c.alt}
                fill
                sizes="100vw"
                quality={70}
                style={{ "--pos": c.position, "--mpos": c.mobilePosition } as CSSProperties}
              />
            </div>
          </div>
        ))}

        <div className={styles.shade} aria-hidden="true" />
        <div className={styles.heat} aria-hidden="true" />
        <div className={styles.embers} aria-hidden="true">
          {Array.from({ length: 18 }, (_, i) => (
            <span key={i} style={{ "--e": i } as CSSProperties} />
          ))}
        </div>
        <div className={styles.flour} aria-hidden="true">
          {Array.from({ length: 14 }, (_, i) => (
            <span key={i} style={{ "--e": i } as CSSProperties} />
          ))}
        </div>

        <div className={`container ${styles.overlay}`}>
          <div className={styles.head}>
            <p className="kicker">N°02 · The making of</p>
            <h2 id="story-making-title" className={styles.headTitle}>
              It&rsquo;s all about <span className="script">the base</span>
            </h2>
          </div>

          <ol className={styles.chapters}>
            {chapters.map((c, i) => (
              <li key={c.title} className={styles.chapter}>
                <span className={styles.num} aria-hidden="true">
                  0{i + 1}
                </span>
                <h3 className={styles.title}>{c.title}</h3>
                <p className={styles.text}>{c.text}</p>
                {i === N - 1 ? (
                  <Link href="/menu" className={`btn btn--orange ${styles.cta}`}>
                    Taste it yourself <ArrowRight />
                  </Link>
                ) : null}
              </li>
            ))}
          </ol>

          <p className={styles.timer} aria-hidden="true">
            <span ref={timerRef}>00</span>
            <small>seconds in the oven</small>
          </p>
        </div>

        <nav ref={railRef} className={styles.rail} aria-hidden="true">
          <span className={styles.railFill} />
          {chapters.map((c, i) => (
            <span key={c.label} className={styles.tick} data-n={i + 1}>
              <i />
              {c.label}
            </span>
          ))}
        </nav>
      </div>
    </section>
  );
}
