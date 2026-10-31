"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, type CSSProperties } from "react";
import { badgeLabel, findItem, formatPrice, type MenuItem } from "@/data/menu";
import { ArrowRight } from "@/components/ui/Icons";
import { REDUCED_MOTION, useMediaQuery } from "@/lib/useMediaQuery";
import { useScrollProgress } from "@/lib/useScrollProgress";
import styles from "./Signatures.module.css";

const picks = [
  "margherita",
  "white-funghi",
  "grana-rucola",
  "white-brisket",
  "truffle-mushroom-spaghetti",
  "fried-ravioli",
  "tiramisu",
]
  .map(findItem)
  .filter((i): i is MenuItem => Boolean(i));

const tones = ["sky", "orange", "sand", "dark"] as const;

export function Signatures() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const distRef = useRef(0);
  const wide = useMediaQuery("(min-width: 900px)");
  const reduced = useMediaQuery(REDUCED_MOTION);
  const pinned = wide && !reduced;

  // size the section so vertical scroll distance equals the track's horizontal overflow
  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    if (!pinned) {
      section.style.height = "";
      track.style.transform = "";
      return;
    }
    const measure = () => {
      distRef.current = Math.max(0, track.offsetWidth - document.documentElement.clientWidth);
      section.style.height = `${distRef.current + window.innerHeight}px`;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [pinned]);

  const onProgress = useCallback(
    (p: number) => {
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
      if (!pinned || !trackRef.current) return;
      trackRef.current.style.transform = `translate3d(${(-p * distRef.current).toFixed(1)}px, 0, 0)`;
    },
    [pinned],
  );
  useScrollProgress(sectionRef, onProgress);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      data-pinned={pinned || undefined}
      aria-labelledby="sig-title"
    >
      <div className={styles.sticky}>
        <div className={styles.track} ref={trackRef}>
          <div className={styles.intro}>
            <p className="kicker">N°03 · Most loved</p>
            <h2 id="sig-title" className={styles.title}>
              The ones Kochi keeps <span className="script">ordering</span>
            </h2>
            <p className={styles.introText}>
              The dishes our guests mention again and again, plus a couple we&rsquo;re quietly proud of.
            </p>
            <p className={styles.hint} aria-hidden="true">
              <span className={styles.hintLine} /> {pinned ? "Keep scrolling" : "Swipe"}
            </p>
          </div>

          {picks.map((item, i) => (
            <article
              key={item.id}
              className={styles.card}
              data-tone={tones[i % tones.length]}
              style={{ "--r": `${i % 2 ? 1.5 : -1.5}deg` } as CSSProperties}
            >
              <div className={styles.arch}>
                <Image src={item.image} alt={item.name} fill sizes="(max-width: 900px) 78vw, 380px" quality={70} />
                <span className={styles.no}>N°0{i + 1}</span>
              </div>
              <div className={styles.info}>
                <div className={styles.meta}>
                  <span className={`diet diet--${item.diet}`} role="img" aria-label={item.diet === "veg" ? "Vegetarian" : "Non-vegetarian"} />
                  {item.badge ? <span className={styles.tag}>{badgeLabel[item.badge]}</span> : null}
                </div>
                <h3 className={styles.name}>{item.name}</h3>
                <p className={styles.desc}>{item.description}</p>
                <p className={styles.price}>{formatPrice(item.price)}</p>
              </div>
            </article>
          ))}

          <Link href="/menu" className={styles.endCard}>
            <span className={styles.endCircle}>
              <ArrowRight />
            </span>
            <span className={styles.endText}>
              See the
              <br />
              full menu
            </span>
            <span className="script">40 dishes &amp; counting</span>
          </Link>
        </div>

        <div className={styles.bar} aria-hidden="true">
          <span ref={barRef} />
        </div>
      </div>
    </section>
  );
}
