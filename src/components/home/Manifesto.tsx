"use client";

import Image from "next/image";
import { useCallback, useRef, type CSSProperties } from "react";
import { site } from "@/data/site";
import { useScrollProgress, type ScrollRange } from "@/lib/useScrollProgress";
import styles from "./Manifesto.module.css";

type Token = string | { src: string; alt: string };

const sentence: Token[] = [
  ..."We're a little pizzeria in Panampilly Nagar obsessed with one thing:".split(" "),
  { src: "/images/story/dough.jpg", alt: "A ball of pizza dough held in floured hands" },
  ..."the base. Soft in the middle, puffed and blistered at the edge by the".split(" "),
  { src: "/images/grana/pizzaiolo.jpg", alt: "A Grana pizzaiolo sliding a pizza into the orange-tiled wood-fired oven" },
  ..."wood fire, then topped with just enough.".split(" "),
  { src: "/images/menu/margherita.jpg", alt: "A Neapolitan margherita" },
  ..."Because honestly? It's all about the base.".split(" "),
];

const wordCount = sentence.length;

// reveal runs while the paragraph travels from 85% to 25% of the viewport height
const revealRange: ScrollRange = (rect, vh) => [vh * 0.85, vh * 0.25 - rect.height];

const pillars = [
  {
    n: "01",
    title: "Opened by hand",
    text: "Every base is pressed out by hand, the Neapolitan way, so the rim keeps its air.",
  },
  {
    n: "02",
    title: "Kissed by fire",
    text: "A wood-fired dome oven does the rest in about ninety seconds: puffed, spotted and smoky.",
  },
  {
    n: "03",
    title: "Made to share",
    text: "Pizzas, pastas, small plates and a tiramisu that is a very good reason to save room.",
  },
];

export function Manifesto() {
  const textRef = useRef<HTMLParagraphElement>(null);
  const onProgress = useCallback((p: number, el: HTMLElement) => {
    el.style.setProperty("--p", p.toFixed(4));
  }, []);
  useScrollProgress(textRef, onProgress, revealRange);

  return (
    <section id="story" className={styles.section} aria-labelledby="story-title">
      <div className="container">
        <div className={styles.head}>
          <p className="kicker">N°01 · The Grana way</p>
          <h2 id="story-title" className="sr-only">
            Our story
          </h2>
        </div>

        <div className={styles.top}>
          <p ref={textRef} className={styles.sentence}>
            {sentence.map((t, i) => {
              const style = { "--i": (i / wordCount).toFixed(4) } as CSSProperties;
              if (typeof t === "string") {
                const accent = /base|fire/.test(t);
                return (
                  <span key={i} className={`${styles.w} ${accent ? styles.accent : ""}`} style={style}>
                    {t}{" "}
                  </span>
                );
              }
              return (
                <span key={i} className={styles.pill} style={style}>
                  <Image src={t.src} alt={t.alt} fill sizes="160px" quality={70} />
                </span>
              );
            })}
          </p>

          <figure className={styles.aside} data-reveal>
            <div className={styles.asideArch}>
              <Image
                src="/images/grana/dough-work.jpg"
                alt="Grana pizzaiolos opening dough bases on the counter"
                fill
                sizes="340px"
                quality={80}
              />
            </div>
            <figcaption className="script">bases, opened by hand</figcaption>
          </figure>
        </div>

        <div className={styles.foot}>
          <p className={styles.founder} data-reveal>
            <span className="script">by Abramatt</span>
            Grana is the pizzeria from Abraham Mathew, the founder behind Soul Kitchen. The whole idea fits on
            the lid of our box: it&rsquo;s all about the base.
          </p>

          <ol className={styles.pillars}>
            {pillars.map((p, i) => (
              <li key={p.n} data-reveal style={{ "--d": i * 120 } as CSSProperties}>
                <span className={styles.n}>{p.n}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <span className="sr-only">{site.tagline}</span>
    </section>
  );
}
