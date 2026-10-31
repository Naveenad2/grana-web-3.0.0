"use client";

import { useSyncExternalStore } from "react";
import { site } from "@/data/site";

export type OpenStatus = "open" | "closing-soon" | "closed";

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

function computeStatus(): OpenStatus {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const h = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
  const m = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  const now = h * 60 + m;
  const opens = toMinutes(site.hours.opens);
  const closes = toMinutes(site.hours.closes);
  if (now < opens || now >= closes) return "closed";
  return closes - now <= 45 ? "closing-soon" : "open";
}

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 30_000);
  return () => window.clearInterval(id);
}

/** Live open/closed state in Kochi time. `null` during server render. */
export function useOpenStatus(): OpenStatus | null {
  return useSyncExternalStore(subscribe, computeStatus, () => null);
}

export const openStatusLabel: Record<OpenStatus, string> = {
  open: "Open now",
  "closing-soon": "Closing soon",
  closed: "Closed now · opens 12 PM",
};
