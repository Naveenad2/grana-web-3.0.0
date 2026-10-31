"use client";

import Image from "next/image";
import { useDeferredValue, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { badgeLabel, formatPrice, type Diet, type MenuCategory, type MenuItem } from "@/data/menu";
import { site } from "@/data/site";
import { ArrowUpRight, Close, Phone, Search } from "@/components/ui/Icons";
import styles from "./MenuExplorer.module.css";

type DietFilter = "all" | Diet;

const dietOptions: { value: DietFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "veg", label: "Veg" },
  { value: "non-veg", label: "Non-veg" },
];

const normalise = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

export function MenuExplorer({ categories }: { categories: MenuCategory[] }) {
  const [diet, setDiet] = useState<DietFilter>("all");
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [active, setActive] = useState(categories[0]?.id ?? "");
  const [selected, setSelected] = useState<{ item: MenuItem; category: MenuCategory } | null>(null);

  const tabsRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const filtered = useMemo(() => {
    const q = normalise(deferredQuery.trim());
    return categories.map((cat) => ({
      ...cat,
      items: cat.items.filter((item) => {
        if (diet !== "all" && item.diet !== diet) return false;
        if (!q) return true;
        return normalise(`${item.name} ${item.description} ${cat.title} ${cat.script}`).includes(q);
      }),
    }));
  }, [categories, diet, deferredQuery]);

  const visible = filtered.filter((c) => c.items.length > 0);
  const total = visible.reduce((n, c) => n + c.items.length, 0);
  const visibleKey = visible.map((c) => c.id).join("|");

  // scroll-spy: highlight the category currently in the reading zone
  useEffect(() => {
    const sections = visibleKey
      .split("|")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [visibleKey]);

  // keep the active tab in view inside the horizontally scrolling tab bar
  useEffect(() => {
    const bar = tabsRef.current;
    const tab = bar?.querySelector<HTMLElement>(`[data-tab="${active}"]`);
    if (!bar || !tab) return;
    const target = tab.offsetLeft - bar.clientWidth / 2 + tab.clientWidth / 2;
    bar.scrollTo({ left: target, behavior: "smooth" });
  }, [active]);

  // open/close the native dialog in step with state
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (selected && !dialog.open) {
      dialog.showModal();
      closeRef.current?.focus();
    }
    if (!selected && dialog.open) dialog.close();
  }, [selected]);

  return (
    <div className={styles.explorer}>
      <div className={styles.toolbar}>
        <div className={`container ${styles.toolbarInner}`}>
          <nav className={styles.tabs} ref={tabsRef} aria-label="Menu sections">
            {categories.map((c) => {
              const count = filtered.find((f) => f.id === c.id)?.items.length ?? 0;
              return (
                <a
                  key={c.id}
                  href={`#${c.id}`}
                  data-tab={c.id}
                  className={styles.tab}
                  aria-current={active === c.id ? "true" : undefined}
                  aria-disabled={count === 0 || undefined}
                  tabIndex={count === 0 ? -1 : undefined}
                >
                  {c.title}
                  <span className={styles.count}>{count}</span>
                </a>
              );
            })}
          </nav>

          <div className={styles.controls}>
            <div className={styles.segment} role="radiogroup" aria-label="Filter by diet">
              {dietOptions.map((o) => (
                <button
                  key={o.value}
                  type="button"
                  role="radio"
                  aria-checked={diet === o.value}
                  className={styles.segBtn}
                  onClick={() => setDiet(o.value)}
                >
                  {o.value !== "all" ? <span className={`diet diet--${o.value}`} aria-hidden="true" /> : null}
                  {o.label}
                </button>
              ))}
            </div>

            <label className={styles.search}>
              <Search aria-hidden="true" />
              <span className="sr-only">Search the menu</span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search dishes, e.g. truffle"
                autoComplete="off"
                spellCheck={false}
              />
            </label>
          </div>
        </div>
      </div>

      <div className="container">
        <p className={styles.status} aria-live="polite">
          {query || diet !== "all" ? `${total} ${total === 1 ? "dish" : "dishes"} found` : ""}
        </p>

        {visible.length === 0 ? (
          <div className={styles.empty}>
            <p className="script">nothing on the menu by that name&hellip;</p>
            <p>Try &ldquo;truffle&rdquo;, &ldquo;ravioli&rdquo; or &ldquo;margherita&rdquo;.</p>
            <button
              type="button"
              className="btn"
              onClick={() => {
                setQuery("");
                setDiet("all");
              }}
            >
              Show everything
            </button>
          </div>
        ) : null}

        {visible.map((cat) => {
          const index = categories.findIndex((c) => c.id === cat.id) + 1;
          return (
            <section key={cat.id} id={cat.id} className={styles.category} aria-labelledby={`${cat.id}-title`}>
              <header className={styles.catHead}>
                <span className={styles.catNo} aria-hidden="true">
                  {String(index).padStart(2, "0")}
                </span>
                <div>
                  <h2 id={`${cat.id}-title`} className={styles.catTitle}>
                    {cat.title}
                  </h2>
                  <p className={`script ${styles.catScript}`}>{cat.script}</p>
                </div>
                <p className={styles.catBlurb}>{cat.blurb}</p>
              </header>

              <ul className={styles.grid}>
                {cat.items.map((item, i) => (
                  <li key={item.id} id={item.id} className={styles.cell} data-reveal style={{ "--d": (i % 3) * 80 } as CSSProperties}>
                    <button
                      type="button"
                      className={styles.card}
                      onClick={() => setSelected({ item, category: cat })}
                      aria-haspopup="dialog"
                    >
                      <span className={styles.photo}>
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="(max-width: 640px) 92vw, (max-width: 1100px) 46vw, 400px"
                          quality={70}
                        />
                        <span className={styles.price}>{formatPrice(item.price)}</span>
                        {item.badge ? <span className={styles.badge}>{badgeLabel[item.badge]}</span> : null}
                      </span>
                      <span className={styles.body}>
                        <span className={styles.nameRow}>
                          <span
                            className={`diet diet--${item.diet}`}
                            role="img"
                            aria-label={item.diet === "veg" ? "Vegetarian" : "Non-vegetarian"}
                          />
                          <span className={styles.name}>{item.name}</span>
                        </span>
                        <span className={styles.desc}>{item.description}</span>
                        <span className={styles.more} aria-hidden="true">
                          View dish <span>+</span>
                        </span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}

        <aside className={styles.note}>
          <p>
            Prices are in Indian rupees and exclusive of applicable taxes. Our menu changes with the seasons, so ask
            the team about today&rsquo;s specials, and please tell us about any allergies before you order.
          </p>
        </aside>
      </div>

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-labelledby="dish-title"
        onClose={() => setSelected(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setSelected(null);
        }}
      >
        {selected ? (
          <div className={styles.dialogInner}>
            <div className={styles.dialogPhoto}>
              <Image src={selected.item.image} alt={selected.item.name} fill sizes="(max-width: 760px) 100vw, 520px" quality={80} />
            </div>
            <div className={styles.dialogBody}>
              <p className={`script ${styles.dialogCat}`}>
                {selected.category.title} · {selected.category.script}
              </p>
              <h2 id="dish-title" className={styles.dialogTitle}>
                {selected.item.name}
              </h2>
              <div className={styles.dialogMeta}>
                <span className={styles.metaChip}>
                  <span className={`diet diet--${selected.item.diet}`} aria-hidden="true" />
                  {selected.item.diet === "veg" ? "Vegetarian" : "Non-vegetarian"}
                </span>
                {selected.item.badge ? <span className={styles.metaChip}>{badgeLabel[selected.item.badge]}</span> : null}
              </div>
              <p className={styles.dialogDesc}>{selected.item.description}</p>
              <p className={styles.dialogPrice}>{formatPrice(selected.item.price)}</p>
              <div className={styles.dialogCtas}>
                <a href={site.phone.href} className="btn">
                  <Phone /> Call to order
                </a>
                <a href={site.links.zomato} className="btn btn--ghost" target="_blank" rel="noopener noreferrer">
                  Zomato <ArrowUpRight />
                </a>
              </div>
            </div>
            <button
              ref={closeRef}
              type="button"
              className={styles.close}
              onClick={() => setSelected(null)}
              aria-label="Close"
            >
              <Close />
            </button>
          </div>
        ) : null}
      </dialog>
    </div>
  );
}
