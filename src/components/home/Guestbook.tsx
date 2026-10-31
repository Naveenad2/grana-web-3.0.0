"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { guestNotes, platformRatings, site } from "@/data/site";
import { ArrowUpRight } from "@/components/ui/Icons";
import styles from "./Guestbook.module.css";

const R = 96;
const toXY = (deg: number, r = R) => {
  const a = (deg * Math.PI) / 180;
  return `${(Math.cos(a) * r).toFixed(2)} ${(Math.sin(a) * r).toFixed(2)}`;
};
const wedge = (from: number, to: number) => `M0 0L${toXY(from)}A${R} ${R} 0 0 1 ${toXY(to)}Z`;

// 4.5 out of 5: four whole slices and one half slice, each 72° of the pie
const rating = site.rating.value;
const slices = Array.from({ length: Math.ceil(rating) }, (_, i) => {
  const from = -90 + i * 72;
  const span = Math.min(1, rating - i) * 72;
  const mid = ((from + span / 2) * Math.PI) / 180;
  return { d: wedge(from, from + span), dx: Math.cos(mid) * 3, dy: Math.sin(mid) * 3, i };
});
const missingFrom = -90 + rating * 72;
const missing = wedge(missingFrom, 270);

export function Guestbook() {
  const ref = useRef<HTMLElement>(null);

  // count the rating up and fill the gauges once, when the section scrolls into view
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const counters = Array.from(root.querySelectorAll<HTMLElement>("[data-count]"));
    let frame = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        root.dataset.inview = "";
        io.disconnect();
        if (reduced) return;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / 1800);
          const eased = 1 - Math.pow(1 - t, 4);
          counters.forEach((c) => {
            const target = Number(c.dataset.count);
            c.textContent = (target * eased).toFixed(Number(c.dataset.decimals ?? 0));
          });
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.25 },
    );
    io.observe(root);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  const notes = [...guestNotes];

  return (
    <section ref={ref} className={styles.section} aria-labelledby="guestbook-title">
      <div className={`container ${styles.top}`}>
        <div className={styles.intro}>
          <p className="kicker">N°06 · The guestbook</p>
          <h2 id="guestbook-title" className={styles.title}>
            Word of <br />
            mouth <span className="script">(full of pizza)</span>
          </h2>
          <p className={styles.lede}>
            Kochi keeps coming back for the crust. Here&rsquo;s how guests rate us across the apps, and what they
            mention most in their reviews.
          </p>

          <ul className={styles.platforms}>
            {platformRatings.map((p, i) => (
              <li key={p.name} style={{ "--fill": p.value / 5, "--i": i } as CSSProperties}>
                <a href={p.href} target="_blank" rel="noopener noreferrer" className={styles.platform}>
                  <span className={styles.pName}>{p.name}</span>
                  <span className={styles.pBar} aria-hidden="true">
                    <span />
                  </span>
                  <span className={styles.pValue}>
                    {p.value.toFixed(1)}
                    <small>/5</small>
                  </span>
                  <span className={styles.pNote}>
                    {p.note} <ArrowUpRight />
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p className={styles.footnote}>Ratings as listed on each platform at the time of writing; they may have changed.</p>
        </div>

        <figure className={styles.dial}>
          <div className={styles.pieWrap}>
            <svg viewBox="-110 -110 220 220" className={styles.pie} role="img" aria-label={`Rated ${rating} out of 5 on ${site.rating.source}`}>
              <defs>
                {slices.map((s) => (
                  <clipPath key={s.i} id={`gb-slice-${s.i}`}>
                    <path d={s.d} />
                  </clipPath>
                ))}
              </defs>
              <circle r="104" className={styles.plateRim} />
              <path d={missing} className={styles.missing} />
              {slices.map((s) => (
                <g
                  key={s.i}
                  className={styles.slice}
                  style={{ "--dx": `${s.dx}px`, "--dy": `${s.dy}px`, "--i": s.i } as CSSProperties}
                >
                  <image
                    href="/images/story/rating-pizza.jpg"
                    x="-100"
                    y="-100"
                    width="200"
                    height="200"
                    clipPath={`url(#gb-slice-${s.i})`}
                    preserveAspectRatio="xMidYMid slice"
                  />
                </g>
              ))}
            </svg>

            <div className={styles.score} aria-hidden="true">
              <span className={styles.scoreNum}>
                <span data-count={rating} data-decimals="1">
                  {rating.toFixed(1)}
                </span>
              </span>
              <span className={styles.stars}>
                {[0, 1, 2, 3, 4].map((i) => (
                  <svg
                    key={i}
                    viewBox="0 0 24 24"
                    className={i < Math.floor(rating) ? styles.on : i < rating ? styles.half : styles.off}
                  >
                    <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7L12 17.3 5.8 20.9l1.6-7L2 9.2l7.1-.6Z" />
                  </svg>
                ))}
              </span>
              <span className={styles.scoreLabel}>
                <span data-count={site.rating.count}>{site.rating.count}</span>+ Google reviews
              </span>
            </div>
          </div>

          <figcaption className={`script ${styles.note}`}>
            the last half slice? <br />
            we&rsquo;re still baking it
          </figcaption>

          <a className={`btn btn--orange ${styles.reviewBtn}`} href={site.links.maps} target="_blank" rel="noopener noreferrer">
            Leave us a review <ArrowUpRight />
          </a>
        </figure>
      </div>

      {/* the kitchen ticket rail */}
      <div className={styles.railWrap}>
        <p className={styles.railLabel}>
          <span className="kicker">What guests mention most</span>
          <span className={styles.railHint}>Summarised from public reviews</span>
        </p>
        <div className={styles.rail}>
          <ul className={styles.tickets}>
            {[...notes, ...notes].map((n, i) => (
              <li
                key={i}
                className={styles.ticket}
                aria-hidden={i >= notes.length || undefined}
                style={{ "--sw": `${(i % 3) - 1}deg`, "--sd": `${(i % 5) * -0.7}s` } as CSSProperties}
              >
                <span className={styles.tHead}>
                  <span>Grana · Kochi</span>
                  <span>Nº {String((i % notes.length) + 1).padStart(3, "0")}</span>
                </span>
                <span className={styles.tTopic}>{n.topic}</span>
                <span className={styles.tNote}>{n.note}</span>
                <span className={styles.tFoot}>said by many · thank you!</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
