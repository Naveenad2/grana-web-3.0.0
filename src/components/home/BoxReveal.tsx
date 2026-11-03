"use client";

import { Img } from "@/components/ui/Img";
import { useCallback, useRef, useState, type CSSProperties } from "react";
import { site } from "@/data/site";
import { ArrowUpRight, Bag, Pan, Phone } from "@/components/ui/Icons";
import { SliceMark } from "@/components/ui/SliceMark";
import { useScrollProgress, type ScrollRange } from "@/lib/useScrollProgress";
import styles from "./BoxReveal.module.css";

// lid opens while the box rises from the bottom of the viewport to roughly its centre
const openRange: ScrollRange = (rect, vh) => [vh * 0.95, vh * 0.5 - rect.height * 0.5];

type Lid = "open" | "closed" | null;

export function BoxReveal() {
  const boxRef = useRef<HTMLButtonElement>(null);
  const [lid, setLid] = useState<Lid>(null);

  const onProgress = useCallback((p: number, el: HTMLElement) => {
    const eased = 1 - Math.pow(1 - p, 3);
    el.style.setProperty("--open", eased.toFixed(4));
  }, []);
  useScrollProgress(boxRef, onProgress, openRange);

  const toggle = () => {
    const el = boxRef.current;
    if (!el) return;
    const visiblyOpen = lid ? lid === "open" : Number(el.style.getPropertyValue("--open") || 0) > 0.5;
    setLid(visiblyOpen ? "closed" : "open");
  };


  return (
    <section id="takeaway" className={styles.section} aria-labelledby="takeaway-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.boxCol}>
          <button
            ref={boxRef}
            type="button"
            className={styles.boxBtn}
            data-lid={lid ?? undefined}
            onClick={toggle}
            aria-label="Toggle the lid of the Grana pizza box"
          >
            <span className={styles.float}>
              <span className={styles.scene}>
                <span className={styles.floor}>
                  <span className={styles.paper} />
                  <span className={styles.pizza}>
                    <Img
                      src="/images/story/box-pizza.jpg"
                      alt=""
                      fill
                      sizes="(max-width: 760px) 70vw, 380px"
                      quality={70}
                    />
                  </span>
                </span>

                <span className={`${styles.wall} ${styles.front}`}>
                  <span className={styles.band}>
                    <b>Reheat instructions</b>
                    <i>Non-stick pan · 90–120 sec</i>
                  </span>
                </span>
                <span className={`${styles.wall} ${styles.back}`} />
                <span className={`${styles.wall} ${styles.left}`} />
                <span className={`${styles.wall} ${styles.right}`} />

                <span className={styles.lid}>
                  <span className={styles.lidOuter}>
                    <span className={styles.lidType}>
                      <span>Grana</span>
                      <span className={styles.lidPiz}>Pizzeria</span>
                    </span>
                    <span className={`script ${styles.lidBy}`}>by Abramatt</span>
                  </span>
                  <span className={styles.lidInner}>
                    <SliceMark className={styles.lidMark} />
                    <span className="script">It&rsquo;s all about the base!</span>
                  </span>
                </span>
              </span>
            </span>
            <span className={styles.steam} aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            <span className={styles.tapHint} aria-hidden="true">
              Tap the box
            </span>
          </button>
        </div>

        <div className={styles.copy}>
          <p className="kicker" data-reveal>
            N°04 · Takeaway &amp; delivery
          </p>
          <h2 id="takeaway-title" className={styles.title} data-reveal style={{ "--d": 80 } as CSSProperties}>
            Boxed hot. <span className="script">still great tomorrow</span>
          </h2>
          <p className={styles.text} data-reveal style={{ "--d": 160 } as CSSProperties}>
            Call ahead for takeaway, or order through Swiggy and Zomato. Every box comes with reheat
            instructions printed on the side, in case there are leftovers (there won&rsquo;t be).
          </p>

          <div className={styles.ctas} data-reveal style={{ "--d": 220 } as CSSProperties}>
            <a href={site.phone.href} className="btn">
              <Phone /> Call {site.phone.display}
            </a>
            <a href={site.links.zomato} className="btn btn--cream" target="_blank" rel="noopener noreferrer">
              <Bag /> Zomato <ArrowUpRight />
            </a>
            <a href={site.links.swiggy} className="btn btn--cream" target="_blank" rel="noopener noreferrer">
              <Bag /> Swiggy <ArrowUpRight />
            </a>
          </div>

          <figure className={styles.reheat} data-reveal style={{ "--d": 300 } as CSSProperties}>
            <figcaption>
              <span>Reheat instructions</span>
              <Pan />
            </figcaption>
            <ol>
              <li>
                <b>90–120 sec</b> Heat a non-stick pan and place the pizza in it.
              </li>
              <li>
                <b>2 drops</b> Add two drops of water away from the pizza.
              </li>
              <li>
                <b>60–90 sec</b> Close the lid and heat. Slice it up and enjoy!
              </li>
            </ol>
          </figure>
        </div>
      </div>
    </section>
  );
}
