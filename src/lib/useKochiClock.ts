"use client";

import { useSyncExternalStore } from "react";
import { site } from "@/data/site";

export interface KochiTime {
  weekday: string;
  /** 0–23 */
  hour: number;
  minute: number;
  open: boolean;
  /** minutes until the next open/close change */
  minutesToChange: number;
}

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

const OPENS = toMinutes(site.hours.opens);
const CLOSES = toMinutes(site.hours.closes);

// "Fri|14|07": a primitive snapshot so React only re-renders when the minute changes
function snapshot(): string {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return `${get("weekday")}|${Number(get("hour"))}|${Number(get("minute"))}`;
}

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 15_000);
  return () => window.clearInterval(id);
}

/** Current time in Kochi plus open/closed state. `null` during server render. */
export function useKochiClock(): KochiTime | null {
  const snap = useSyncExternalStore(subscribe, snapshot, () => null);
  if (!snap) return null;
  const [weekday, h, m] = snap.split("|");
  const hour = Number(h);
  const minute = Number(m);
  const now = hour * 60 + minute;
  const open = now >= OPENS && now < CLOSES;
  const minutesToChange = open ? CLOSES - now : (OPENS - now + 1440) % 1440;
  return { weekday, hour, minute, open, minutesToChange };
}

export function formatDuration(mins: number): string {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h === 0) return `${m} min`;
  return m === 0 ? `${h} h` : `${h} h ${m} min`;
}
