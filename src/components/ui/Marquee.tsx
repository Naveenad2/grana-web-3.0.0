import { Fragment, type CSSProperties } from "react";
import styles from "./Marquee.module.css";

interface MarqueeProps {
  items: readonly string[];
  tone?: "ink" | "orange" | "cream";
  reverse?: boolean;
  /** seconds per loop */
  speed?: number;
  tilt?: number;
  className?: string;
}

/** Decorative ticker tape. Content is duplicated for a seamless loop, so it is hidden from assistive tech. */
export function Marquee({ items, tone = "ink", reverse, speed = 38, tilt = 0, className }: MarqueeProps) {
  const run = (
    <span className={styles.run}>
      {items.map((item, i) => (
        <Fragment key={i}>
          <span className={styles.item}>{item}</span>
          <svg className={styles.star} viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 0l2.6 8.4L23 6l-6.2 6L23 18l-8.4-2.4L12 24l-2.6-8.4L1 18l6.2-6L1 6l8.4 2.4Z" />
          </svg>
        </Fragment>
      ))}
    </span>
  );

  return (
    <div className={`${styles.frame} ${className ?? ""}`} aria-hidden="true">
      <div
        className={`${styles.marquee} ${styles[tone]}`}
        style={{ "--tilt": `${tilt}deg`, "--speed": `${speed}s` } as CSSProperties}
      >
        <div className={`${styles.track} ${reverse ? styles.reverse : ""}`}>
          {run}
          {run}
        </div>
      </div>
    </div>
  );
}
