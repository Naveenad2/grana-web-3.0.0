"use client";

import { Img } from "@/components/ui/Img";
import { useState, useSyncExternalStore, type CSSProperties } from "react";
import { fullAddress, site } from "@/data/site";
import { ArrowUpRight, Phone, Pin } from "@/components/ui/Icons";
import styles from "../Visit.module.css";

const canShare = () => typeof navigator !== "undefined" && typeof navigator.share === "function";
const noop = () => () => {};
const streetParts = site.address.street.split(", ");

export function Postcard() {
  const [copied, setCopied] = useState(false);
  const shareable = useSyncExternalStore(noop, canShare, () => false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`${site.name}, ${fullAddress}`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.prompt("Copy our address:", `${site.name}, ${fullAddress}`);
    }
  };

  const share = async () => {
    try {
      await navigator.share({ title: site.name, text: `${site.name}, ${fullAddress}`, url: site.links.maps });
    } catch {
      // dismissed: nothing to do
    }
  };

  return (
    <article className={styles.postcard} data-reveal style={{ "--d": 120 } as CSSProperties}>
      <div className={styles.pcMessage}>
        <p className={`script ${styles.pcHello}`}>Wish you were here!</p>
        <p className={styles.pcText}>
          Pizza&rsquo;s on every day from 12 till 11. Find us on 1st Cross Road in Panampilly Nagar and follow
          the smell of the wood fire.
        </p>
        <p className={`script ${styles.pcSign}`}>Team Grana</p>
      </div>

      <div className={styles.pcAddress}>
        <div className={styles.stamp} aria-hidden="true">
          <Img src="/logo.png" alt="" width={140} height={140} sizes="90px" />
          <span>Kochi</span>
        </div>
        <svg className={styles.postmark} viewBox="0 0 120 120" aria-hidden="true">
          <defs>
            <path id="pm-circle" d="M60 60m-44 0a44 44 0 1 1 88 0a44 44 0 1 1-88 0" />
          </defs>
          <circle cx="60" cy="60" r="54" />
          <circle cx="60" cy="60" r="34" />
          <text>
            <textPath href="#pm-circle">PANAMPILLY NAGAR · KOCHI · 682036 ·</textPath>
          </text>
          <text x="60" y="64" textAnchor="middle" className={styles.pmCenter}>
            12–11
          </text>
          <path d="M118 46c14-6 26 6 40 0s26 6 40 0M118 60c14-6 26 6 40 0s26 6 40 0M118 74c14-6 26 6 40 0s26 6 40 0" />
        </svg>

        <address className={styles.lines}>
          <span>{site.name}</span>
          <span>{streetParts.slice(0, 2).join(", ")},</span>
          <span>{streetParts.slice(2).join(", ")},</span>
          <span>
            {site.address.locality}, {site.address.city} {site.address.postalCode}
          </span>
        </address>
        <p className={styles.coords}>
          {site.geo.lat.toFixed(4)}° N · {site.geo.lng.toFixed(4)}° E
        </p>
      </div>

      <div className={styles.pcActions}>
        <a href={site.links.directions} className="btn" target="_blank" rel="noopener noreferrer">
          <Pin /> Directions
        </a>
        <button type="button" className="btn btn--ghost" onClick={copy} aria-live="polite">
          {copied ? "Copied ✓" : "Copy address"}
        </button>
        {shareable ? (
          <button type="button" className="btn btn--ghost" onClick={share}>
            Share <ArrowUpRight />
          </button>
        ) : (
          <a href={site.phone.href} className="btn btn--ghost">
            <Phone /> Call
          </a>
        )}
      </div>
    </article>
  );
}
