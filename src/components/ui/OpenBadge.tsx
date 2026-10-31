"use client";

import { openStatusLabel, useOpenStatus } from "@/lib/useOpenStatus";
import { site } from "@/data/site";
import styles from "./OpenBadge.module.css";

export function OpenBadge({ tone = "ink" }: { tone?: "ink" | "cream" }) {
  const status = useOpenStatus();
  return (
    <span className={`${styles.badge} ${styles[tone]}`} data-status={status ?? "unknown"}>
      <span className={styles.dot} aria-hidden="true" />
      {status ? openStatusLabel[status] : site.hours.label}
    </span>
  );
}
