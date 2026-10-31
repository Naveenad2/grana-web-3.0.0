import type { CSSProperties } from "react";
import { site } from "@/data/site";
import { ArrowUpRight, Bag, Phone, Pin } from "@/components/ui/Icons";
import { PizzaClock } from "./visit/PizzaClock";
import { Postcard } from "./visit/Postcard";
import { MapCard } from "./visit/MapCard";
import styles from "./Visit.module.css";

const ways = [
  {
    icon: <Pin />,
    title: "Dine in",
    text: "Grab a table by the open kitchen and watch your pizza go into the fire.",
    cta: { label: "Directions", href: site.links.directions, external: true },
  },
  {
    icon: <Phone />,
    title: "Takeaway",
    text: `Call ${site.phone.display} and pick it up hot, boxed with reheat instructions on the side.`,
    cta: { label: "Call now", href: site.phone.href, external: false },
  },
  {
    icon: <Bag />,
    title: "Delivery",
    text: "Order on Swiggy or Zomato and we’ll send the base to you.",
    cta: { label: "Order on Zomato", href: site.links.zomato, external: true },
  },
];

export function Visit() {
  return (
    <section id="visit" className={styles.section} aria-labelledby="visit-title">
      <div className="container">
        <header className={styles.head}>
          <div>
            <p className="kicker" data-reveal>
              N°07 · Find us
            </p>
            <h2 id="visit-title" className={styles.title} data-reveal="mask">
              Come hungry.
            </h2>
          </div>
          <p className={`script ${styles.sub}`} data-reveal>
            1st Cross Road, Panampilly Nagar
          </p>
        </header>

        <div className={styles.grid}>
          <PizzaClock />
          <Postcard />
          <MapCard />

          <ul className={styles.ways}>
            {ways.map((w, i) => (
              <li key={w.title} className={styles.way} data-reveal style={{ "--d": i * 100 } as CSSProperties}>
                <span className={styles.wayIcon}>{w.icon}</span>
                <div>
                  <h3>{w.title}</h3>
                  <p>{w.text}</p>
                </div>
                <a
                  href={w.cta.href}
                  className={styles.wayLink}
                  {...(w.cta.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {w.cta.label} <ArrowUpRight />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
