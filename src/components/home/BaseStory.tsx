"use client";

import { Img } from "@/components/ui/Img";
import Link from "next/link";
import { useEffect, useRef, type CSSProperties } from "react";
import { ArrowRight } from "@/components/ui/Icons";
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
const FIRE = 4;

/**
 * Where each photo sits relative to the current chapter. Only "top", "under" and "next" are kept
 * ready on the graphics card; everything else is hidden, so phones never hold more than three photos.
 */
function frameState(k: number, step: number) {
  if (k === step) return "top";
  if (k === step - 1) return "under";
  if (k === step + 1) return "next";
  return k < step ? "buried" : "below";
}

/**
 * The "making of" story. Scrolling only decides which chapter is showing (via IntersectionObserver
 * zones, so no code runs per scroll frame). The photo wipes, zooms and text are timed CSS
 * transitions that run on the GPU, which keeps them smooth on phones and tablets while scrolling.
 */
export function BaseStory() {
  const ref = useRef<HTMLElement>(null);
  const timerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;
    const frames = Array.from(section.querySelectorAll<HTMLElement>("[data-frame]"));
    const zones = Array.from(section.querySelectorAll<HTMLElement>("[data-zone]"));
    let raf = 0;

    const countTimer = (step: number) => {
      cancelAnimationFrame(raf);
      const el = timerRef.current;
      if (!el) return;
      if (step !== FIRE) {
        el.textContent = step > FIRE ? "90" : "00";
        return;
      }
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / 2400);
        el.textContent = String(Math.round(90 * (1 - Math.pow(1 - t, 3)))).padStart(2, "0");
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const setStep = (step: number) => {
      if (section.dataset.step === String(step)) return;
      section.dataset.step = String(step);
      section.style.setProperty("--step", String(step));
      frames.forEach((f, i) => (f.dataset.state = frameState(i + 1, step)));
      countTimer(step);
    };

    // each zone is one chapter's stretch of scrolling; whichever crosses the middle of the screen wins
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setStep(Number((e.target as HTMLElement).dataset.zone));
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    zones.forEach((z) => io.observe(z));

    // fetch and decode every photo well before the section arrives, so none of them flashes in
    const imgs = Array.from(section.querySelectorAll<HTMLImageElement>("[data-frame] img"));
    const warm = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        warm.disconnect();
        for (const img of imgs) {
          img.loading = "eager";
          img.decode?.().catch(() => {});
        }
      },
      { rootMargin: "150% 0px 150% 0px" },
    );
    warm.observe(section);

    return () => {
      io.disconnect();
      warm.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={ref} className={styles.story} data-step="1" aria-labelledby="story-making-title">
      {chapters.map((c, i) => (
        <div key={c.label} className={styles.zone} data-zone={i + 1} aria-hidden="true" />
      ))}

      <div className={styles.sticky}>
        {chapters.map((c, k) => (
          <div
            key={c.image}
            className={styles.frame}
            data-frame
            data-state={frameState(k + 1, 1)}
            style={{ zIndex: k + 1 } as CSSProperties}
          >
            <div className={styles.media}>
              <div className={styles.zoom}>
                <Img
                  src={c.image}
                  alt={c.alt}
                  fill
                  sizes="100vw"
                  quality={70}
                  blur={false}
                  style={{ "--pos": c.position, "--mpos": c.mobilePosition } as CSSProperties}
                />
              </div>
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

        {/* sized to the visible screen, so text and the progress rail never sit under a phone's toolbar */}
        <div className={styles.ui}>
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

          <nav className={styles.rail} aria-hidden="true">
            <span className={styles.railFill} />
            {chapters.map((c, i) => (
              <span key={c.label} className={styles.tick} data-n={i + 1}>
                <i />
                {c.label}
              </span>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}
