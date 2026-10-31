"use client";

import type { CSSProperties } from "react";
import { site } from "@/data/site";
import { formatDuration, useKochiClock } from "@/lib/useKochiClock";
import { SliceMark } from "@/components/ui/SliceMark";
import styles from "../Visit.module.css";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const OPEN_HOUR = Number(site.hours.opens.split(":")[0]); // 12
const CLOSE_HOUR = Number(site.hours.closes.split(":")[0]); // 23

const R = 92;
/** point on the clock face: 0° is 12 o'clock, clockwise */
const pt = (deg: number, r: number) => {
  const a = ((deg - 90) * Math.PI) / 180;
  return { x: Number((Math.cos(a) * r).toFixed(2)), y: Number((Math.sin(a) * r).toFixed(2)) };
};

// one 30° slice per hour on a 12-hour face; slice h covers h o'clock → h+1
const slices = Array.from({ length: 12 }, (_, h) => {
  const from = h * 30;
  const to = from + 30;
  const hour24 = h === 0 ? 12 : h + 12; // the PM hour this slice stands for
  const open = hour24 >= OPEN_HOUR && hour24 < CLOSE_HOUR;
  const mid = from + 15;
  const a = pt(from, R);
  const b = pt(to, R);
  return {
    h,
    open,
    d: `M0 0L${a.x} ${a.y}A${R} ${R} 0 0 1 ${b.x} ${b.y}Z`,
    cheese: pt(mid, 52),
    basil: pt(mid + 6, 74),
    label: pt(h * 30, 103),
  };
});

export function PizzaClock() {
  const t = useKochiClock();
  const hourAngle = t ? ((t.hour % 12) + t.minute / 60) * 30 : 0;
  const minuteAngle = t ? t.minute * 6 : 0;
  const activeSlice = t && t.hour >= 12 ? t.hour % 12 : -1;

  return (
    <article className={styles.clockCard} data-reveal>
      <p className="kicker">Live from Kochi</p>

      <div className={styles.clockWrap}>
        <svg viewBox="-120 -120 240 240" className={styles.clock} role="img" aria-label={`Open ${site.hours.label}`}>
          <defs>
            <radialGradient id="clock-crust" r="50%">
              <stop offset="0.82" stopColor="#efd3a0" />
              <stop offset="0.93" stopColor="#d9a35e" />
              <stop offset="1" stopColor="#9a5b25" />
            </radialGradient>
          </defs>
          <circle r="116" fill="url(#clock-crust)" />
          {slices.map((s) => (
            <g
              key={s.h}
              className={`${styles.cSlice} ${s.open ? styles.cOpen : styles.cClosed} ${s.h === activeSlice ? styles.cNow : ""}`}
              style={{ "--k": s.h } as CSSProperties}
            >
              <path d={s.d} />
              {s.open ? (
                <>
                  <circle cx={s.cheese.x} cy={s.cheese.y} r="11" className={styles.cCheese} />
                  {s.h % 2 === 0 ? (
                    <ellipse
                      cx={s.basil.x}
                      cy={s.basil.y}
                      rx="7"
                      ry="3.6"
                      className={styles.cBasil}
                      transform={`rotate(${s.h * 30 + 21} ${s.basil.x} ${s.basil.y})`}
                    />
                  ) : null}
                </>
              ) : null}
            </g>
          ))}
          {slices.map((s) => (
            <text
              key={`n${s.h}`}
              x={s.label.x}
              y={s.label.y}
              className={styles.cNum}
              textAnchor="middle"
              dominantBaseline="central"
            >
              {s.h === 0 ? 12 : s.h}
            </text>
          ))}
          {t ? (
            <g className={styles.hands}>
              <line x1="0" y1="10" x2="0" y2="-54" className={styles.hourHand} transform={`rotate(${hourAngle})`} />
              <line x1="0" y1="14" x2="0" y2="-80" className={styles.minuteHand} transform={`rotate(${minuteAngle})`} />
            </g>
          ) : null}
          <circle r="15" className={styles.cHub} />
        </svg>
        <SliceMark className={styles.cHubMark} />
        <span className={styles.ampm}>{t ? (t.hour >= 12 ? "PM" : "AM") : "IST"}</span>
      </div>

      <div className={styles.clockInfo}>
        <h3 className={styles.clockStatus} data-open={t ? t.open : undefined}>
          {t ? (t.open ? "We’re open." : "Oven’s resting.") : "Open every day."}
        </h3>
        <p className={styles.countdown}>
          {t
            ? t.open
              ? `Kitchen closes in ${formatDuration(t.minutesToChange)}`
              : `Fires up again in ${formatDuration(t.minutesToChange)}`
            : site.hours.label}
        </p>
        <p className={styles.clockLegend}>
          <span className={styles.legendOpen} /> 11 slices of open hours, 12 PM to 11 PM
        </p>
      </div>

      <ul className={styles.week} aria-label="Opening hours">
        {DAYS.map((d) => (
          <li key={d} aria-current={t?.weekday === d ? "date" : undefined}>
            <span>{d.slice(0, 3)}</span>
            <small>12–11</small>
          </li>
        ))}
      </ul>
    </article>
  );
}
