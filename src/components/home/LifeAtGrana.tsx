"use client";

import Image from "next/image";
import { useEffect, useRef, type CSSProperties } from "react";
import { site } from "@/data/site";
import { ArrowUpRight, Instagram } from "@/components/ui/Icons";
import { useMediaQuery } from "@/lib/useMediaQuery";
import styles from "./LifeAtGrana.module.css";

interface Shot {
  src: string;
  alt: string;
  caption: string;
  /** desktop scatter position (% of table) and tilt */
  x: number;
  y: number;
  r: number;
  wide?: boolean;
}

const shots: Shot[] = [
  { src: "/images/grana/open-kitchen.jpg", alt: "The Grana team at work behind the open kitchen counter", caption: "come make a pizza with us", x: 0, y: 3, r: -6 },
  { src: "/images/grana/mural.jpg", alt: "Grana's illustrated wall mural of pizzaiolos, pizzas and the oven", caption: "the Grana world, illustrated", x: 22, y: 0, r: -2, wide: true },
  { src: "/images/grana/pepperoni.jpg", alt: "A blistered pepperoni pizza on a white plate", caption: "pizza? yes, please.", x: 52, y: 4, r: 6 },
  { src: "/images/grana/granonam.jpg", alt: "An Onam pookalam made of coloured rice spelling Granonam", caption: "Gran-Onam, our pookalam", x: 77, y: 1, r: -5 },
  { src: "/images/grana/pizzaiolo.jpg", alt: "A pizzaiolo sliding a pizza into the orange-tiled wood-fired oven", caption: "into the fire", x: 13, y: 35, r: 4 },
  { src: "/images/grana/tiramisu.jpg", alt: "A spoon digging into tiramisu served in a glass", caption: "a very good reason to save dessert", x: 34, y: 32, r: 3 },
  { src: "/images/grana/oven-boxes.jpg", alt: "Stacks of Grana pizza boxes in front of the orange dome oven", caption: "boxed & ready to go", x: 58, y: 39, r: -4 },
  { src: "/images/grana/aglio-olio.jpg", alt: "Spaghetti aglio e olio with a cherry tomato on a white plate", caption: "aglio e olio, always", x: 81, y: 36, r: 5 },
  { src: "/images/grana/reheat-boxes.jpg", alt: "Grana pizza boxes printed with reheat instructions on the side", caption: "reheat instructions included", x: 0, y: 70, r: 4 },
  { src: "/images/grana/veg-pizza.jpg", alt: "A vegetable pizza with zucchini and peppers seen from above", caption: "garden on a base", x: 21, y: 69, r: -3 },
  { src: "/images/grana/box-stack.jpg", alt: "A Grana box held up in front of a rack of boxes reading It's all about the base", caption: "it's all about the base!", x: 42, y: 69, r: 6 },
  { src: "/images/grana/olive-pizza.jpg", alt: "A Neapolitan pizza with olives, spinach and cherry tomatoes", caption: "olives, spinach, fire", x: 72, y: 72, r: -3 },
];

export function LifeAtGrana() {
  const tableRef = useRef<HTMLDivElement>(null);
  const draggable = useMediaQuery("(min-width: 1000px) and (pointer: fine)");

  useEffect(() => {
    const table = tableRef.current;
    if (!table || !draggable) return;
    let z = 10;
    const offsets = new WeakMap<HTMLElement, { x: number; y: number }>();
    let active: { el: HTMLElement; id: number; sx: number; sy: number; ox: number; oy: number } | null = null;

    const onDown = (e: PointerEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-shot]");
      if (!el || e.button !== 0) return;
      e.preventDefault();
      const o = offsets.get(el) ?? { x: 0, y: 0 };
      active = { el, id: e.pointerId, sx: e.clientX, sy: e.clientY, ox: o.x, oy: o.y };
      el.setPointerCapture(e.pointerId);
      el.style.zIndex = String(++z);
      el.dataset.dragging = "";
    };
    const onMove = (e: PointerEvent) => {
      if (!active || e.pointerId !== active.id) return;
      const x = active.ox + e.clientX - active.sx;
      const y = active.oy + e.clientY - active.sy;
      offsets.set(active.el, { x, y });
      active.el.style.translate = `${x}px ${y}px`;
    };
    const onUp = (e: PointerEvent) => {
      if (!active || e.pointerId !== active.id) return;
      delete active.el.dataset.dragging;
      active = null;
    };

    table.addEventListener("pointerdown", onDown);
    table.addEventListener("pointermove", onMove);
    table.addEventListener("pointerup", onUp);
    table.addEventListener("pointercancel", onUp);
    return () => {
      table.removeEventListener("pointerdown", onDown);
      table.removeEventListener("pointermove", onMove);
      table.removeEventListener("pointerup", onUp);
      table.removeEventListener("pointercancel", onUp);
      table.querySelectorAll<HTMLElement>("[data-shot]").forEach((el) => {
        el.style.translate = "";
        el.style.zIndex = "";
      });
    };
  }, [draggable]);

  return (
    <section className={styles.section} aria-labelledby="life-title">
      <div className={`container ${styles.head}`}>
        <div>
          <p className="kicker" data-reveal>
            N°05 · Life at Grana
          </p>
          <h2 id="life-title" className={styles.title} data-reveal>
            Fresh pizza, <span className="script">always</span>
          </h2>
        </div>
        <div className={styles.headAside} data-reveal>
          <p>
            Straight from our kitchen on 1st Cross Road: the oven, the team, the pookalam and plenty of pizza.
            {draggable ? " Go on, drag the photos around." : ""}
          </p>
          {site.links.instagram ? (
            <a className="btn btn--ghost" href={site.links.instagram} target="_blank" rel="noopener noreferrer">
              <Instagram /> Follow along <ArrowUpRight />
            </a>
          ) : null}
        </div>
      </div>

      <div ref={tableRef} className={styles.table} data-draggable={draggable || undefined}>
        {shots.map((s, i) => (
          <figure
            key={s.src}
            data-shot
            className={`${styles.polaroid} ${s.wide ? styles.wide : ""}`}
            style={{ "--x": `${s.x}%`, "--y": `${s.y}%`, "--r": `${s.r}deg`, "--d": i * 70 } as CSSProperties}
            data-reveal="pop"
          >
            <div className={styles.photo}>
              <Image
                src={s.src}
                alt={s.alt}
                fill
                sizes={s.wide ? "(max-width: 1000px) 80vw, 360px" : "(max-width: 1000px) 62vw, 240px"}
                quality={80}
                draggable={false}
              />
            </div>
            <figcaption className="script">{s.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
