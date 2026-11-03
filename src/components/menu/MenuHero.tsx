import { Img } from "@/components/ui/Img";
import type { CSSProperties } from "react";
import { allItems, menu } from "@/data/menu";
import styles from "./MenuHero.module.css";

const wheel = menu.map((c) => ({ id: c.id, title: c.title, image: c.items[0].image }));

export function MenuHero() {
  return (
    <section className={styles.hero} aria-labelledby="menu-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <p className="kicker">Il menu · Grana Pizzeria</p>
          <h1 id="menu-title" className={styles.title}>
            <span className={`script ${styles.the}`}>the</span>
            <span className={styles.word}>Menu</span>
          </h1>
          <p className={styles.lede}>
            Neapolitan pizzas, comforting pasta, small plates and a few very good reasons to save room. Everything
            made fresh on 1st Cross Road, Panampilly Nagar.
          </p>
          <ul className={styles.facts}>
            <li>
              <strong>{allItems.length}</strong> dishes
            </li>
            <li>
              <span className="diet diet--veg" aria-hidden="true" /> Vegetarian
            </li>
            <li>
              <span className="diet diet--non-veg" aria-hidden="true" /> Non-vegetarian
            </li>
          </ul>
        </div>

        <nav className={styles.wheelWrap} aria-label="Menu categories">
          <div className={styles.wheel}>
            {wheel.map((c, i) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                className={styles.coin}
                style={{ "--a": `${(360 / wheel.length) * i}deg` } as CSSProperties}
              >
                <span className={styles.coinInner}>
                  <span className={styles.coinImg}>
                    <Img src={c.image} alt="" fill sizes="130px" quality={70} />
                  </span>
                  <span className={styles.coinLabel}>{c.title}</span>
                </span>
              </a>
            ))}
          </div>
          <div className={styles.hub} aria-hidden="true">
            <Img src="/logo.png" alt="" width={240} height={240} sizes="200px" className={styles.hubLogo} />
          </div>
          <span className={`script ${styles.hubNote}`} aria-hidden="true">
            pick a slice, any slice
          </span>
        </nav>
      </div>
    </section>
  );
}
