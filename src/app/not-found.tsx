import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@/components/ui/Icons";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className={styles.wrap} aria-labelledby="nf-title">
      <svg className={styles.pizza} viewBox="-110 -110 220 220" aria-hidden="true">
        {/* a pizza with one slice missing */}
        <path d="M0 0 L0 -100 A100 100 0 1 1 -86.6 -50 Z" fill="#efd3a0" />
        <path d="M0 0 L0 -82 A82 82 0 1 1 -71 -41 Z" fill="#c63621" />
        <g fill="#fff7e8">
          <circle cx="30" cy="-30" r="14" />
          <circle cx="-30" cy="30" r="12" />
          <circle cx="40" cy="40" r="15" />
          <circle cx="-10" cy="-2" r="9" />
          <circle cx="-48" cy="-6" r="10" />
        </g>
        <g fill="#2e7a3c">
          <ellipse cx="10" cy="-50" rx="11" ry="6" transform="rotate(-30 10 -50)" />
          <ellipse cx="55" cy="5" rx="11" ry="6" transform="rotate(40 55 5)" />
          <ellipse cx="0" cy="58" rx="11" ry="6" transform="rotate(10 0 58)" />
        </g>
      </svg>
      <p className="kicker">Error 404</p>
      <h1 id="nf-title" className={styles.title}>
        Someone ate <span className="script">this page</span>
      </h1>
      <p className={styles.text}>The slice you were looking for is gone. The rest of the pizza is right this way.</p>
      <div className={styles.ctas}>
        <Link href="/" className="btn">
          Back home <ArrowRight />
        </Link>
        <Link href="/menu" className="btn btn--ghost">
          See the menu
        </Link>
      </div>
    </section>
  );
}
