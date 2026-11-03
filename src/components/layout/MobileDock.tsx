"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { MenuBook, Phone, Pin } from "@/components/ui/Icons";
import styles from "./MobileDock.module.css";

/** Thumb-reach actions on phones: call, menu, directions. Appears once the visitor starts scrolling. */
export function MobileDock() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const tick = () => {
      frame = 0;
      const nearBottom = window.innerHeight + window.scrollY > document.documentElement.scrollHeight - 140;
      setVisible(window.scrollY > window.innerHeight * 0.55 && !nearBottom);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <nav className={styles.dock} data-visible={visible || undefined} aria-label="Quick actions">
      <a href={site.phone.href} className={styles.item}>
        <Phone />
        <span>Call</span>
      </a>
      <Link href="/menu" className={`${styles.item} ${styles.primary}`}>
        <MenuBook />
        <span>Menu</span>
      </Link>
      <a href={site.links.directions} target="_blank" rel="noopener noreferrer" className={styles.item}>
        <Pin />
        <span>Find us</span>
      </a>
    </nav>
  );
}
