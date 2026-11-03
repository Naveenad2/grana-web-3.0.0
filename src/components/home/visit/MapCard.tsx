"use client";

import { Img } from "@/components/ui/Img";
import { useState } from "react";
import { site } from "@/data/site";
import { ArrowUpRight, Pin } from "@/components/ui/Icons";
import styles from "../Visit.module.css";

// the route the delivery scooter rides, ending at the pin (map coordinates, viewBox 0 0 600 420)
const ROUTE = "M-20 380C60 360 90 330 140 330S230 330 250 290 300 214 330 210";

/** Illustrated, not-to-scale map that swaps in the live Google map only when asked. */
export function MapCard() {
  const [live, setLive] = useState(false);

  return (
    <article className={styles.mapCard} data-reveal>
      <div className={styles.mapFrame}>
        {live ? (
          <iframe
            className={styles.iframe}
            src={site.links.mapEmbed}
            title={`Map showing ${site.name} in Panampilly Nagar, Kochi`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        ) : (
          <>
            <svg className={styles.mapArt} viewBox="0 0 600 420" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <rect width="600" height="420" fill="#f4e7cf" />
              {/* backwaters + walkway */}
              <path d="M-10 300C90 270 170 340 280 320S470 250 610 290V430H-10Z" fill="#a8d0d4" />
              <path d="M-10 312C90 282 170 352 280 332S470 262 610 302" stroke="#7fb4ba" strokeWidth="3" fill="none" strokeDasharray="2 10" strokeLinecap="round" />
              {/* blocks */}
              <g fill="#ead6b1">
                <rect x="20" y="20" width="120" height="70" rx="10" />
                <rect x="180" y="20" width="110" height="70" rx="10" />
                <rect x="380" y="20" width="200" height="70" rx="10" />
                <rect x="20" y="130" width="120" height="110" rx="10" />
                <rect x="380" y="130" width="90" height="110" rx="10" />
                <rect x="500" y="130" width="80" height="110" rx="10" />
              </g>
              <ellipse cx="235" cy="175" rx="38" ry="28" fill="#cfe0b8" />
              {/* streets */}
              <g stroke="#fbf3e4" strokeLinecap="round" fill="none">
                <path d="M-10 110H610M-10 260H610M160-10V430M490-10V430" strokeWidth="16" />
                <path d="M330-10V430" strokeWidth="26" />
              </g>
              {/* delivery route */}
              <path d={ROUTE} className={styles.route} />
              <g className={styles.scooter}>
                <g transform="translate(-24 -20) scale(1.7)">
                  <rect x="2" y="2" width="16" height="11" rx="3" fill="#e0582f" />
                  <circle cx="5" cy="18" r="4" fill="#1c1410" />
                  <circle cx="23" cy="18" r="4" fill="#1c1410" />
                  <path d="M4 14H26L22 8" stroke="#1c1410" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                </g>
                <animateMotion dur="7s" repeatCount="indefinite" rotate="auto" path={ROUTE} />
              </g>
              <g fontFamily="ui-monospace, monospace" fontSize="12" fontWeight="700" fill="#5a3526" letterSpacing="2">
                <text x="342" y="40" transform="rotate(90 342 40)">1ST CROSS RD</text>
                <text x="24" y="252">PANAMPILLY NAGAR</text>
                <text x="40" y="396" fill="#2f5f66">WALKWAY</text>
              </g>
              {/* compass */}
              <g transform="translate(560 52)" fontFamily="ui-monospace, monospace" fontSize="11" fontWeight="700">
                <circle r="22" fill="#fbf3e4" stroke="#1c1410" strokeWidth="1.5" />
                <path d="M0-16 5 0H-5Z" fill="#e0582f" />
                <path d="M0 16 5 0H-5Z" fill="#1c1410" />
                <text x="0" y="-26" textAnchor="middle" fill="#1c1410">N</text>
              </g>
            </svg>

            <div className={styles.mapPin} aria-hidden="true">
              <span className={styles.pinPulse} />
              <span className={styles.pinHead}>
                <Img src="/logo.png" alt="" width={120} height={120} sizes="64px" />
              </span>
            </div>

            <span className={styles.scale}>Not to scale · for the real thing, load the map</span>
            <button type="button" className={`btn ${styles.loadBtn}`} onClick={() => setLive(true)}>
              <Pin /> Load live map
            </button>
          </>
        )}
      </div>
      <a className={styles.mapLink} href={site.links.maps} target="_blank" rel="noopener noreferrer">
        Open in Google Maps <ArrowUpRight />
      </a>
    </article>
  );
}
