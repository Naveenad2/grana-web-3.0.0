"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { navLinks, site } from "@/data/site";
import { Phone } from "@/components/ui/Icons";
import styles from "./Header.module.css";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;
    const tick = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden((was) => {
        if (y < 480) return false;
        if (y > last + 6) return true;
        if (y < last - 6) return false;
        return was;
      });
      last = y;
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

  // lets sticky UI elsewhere (e.g. the menu toolbar) slide up when the header hides
  useEffect(() => {
    document.documentElement.toggleAttribute("data-header-hidden", hidden && !open);
  }, [hidden, open]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("nav-open", open);
    if (!open) return;
    firstLinkRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        burgerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      root.classList.remove("nav-open");
    };
  }, [open]);

  const close = () => setOpen(false);
  const isActive = (href: string) => (href === "/menu" ? pathname.startsWith("/menu") : false);

  return (
    <>
      <header
        className={styles.header}
        data-scrolled={scrolled || undefined}
        data-hidden={(hidden && !open) || undefined}
        data-open={open || undefined}
      >
        <div className={styles.bar}>
          <Link href="/" className={styles.brand} aria-label={`${site.name}, home`} onClick={close}>
            <Image src="/logo.png" alt="" width={192} height={192} sizes="96px" className={styles.logo} />
          </Link>

          <nav aria-label="Main" className={styles.nav}>
            <ul>
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={styles.link}
                    aria-current={isActive(l.href) ? "page" : undefined}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.actions}>
            <a href={site.phone.href} className={`btn ${styles.call}`}>
              <Phone />
              <span>{site.phone.display}</span>
            </a>
            <button
              ref={burgerRef}
              type="button"
              className={styles.burger}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div id="mobile-nav" className={styles.drawer} data-open={open || undefined} inert={!open}>
        <nav aria-label="Mobile" className={styles.drawerNav}>
          <ul>
            {[{ href: "/", label: "Home" }, ...navLinks].map((l, i) => (
              <li key={l.href} style={{ "--i": i } as CSSProperties}>
                <Link href={l.href} onClick={close} ref={i === 0 ? firstLinkRef : undefined}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.drawerFoot}>
          <p className="script">{site.tagline}</p>
          <p>
            {site.address.street}, {site.address.locality}
            <br />
            {site.hours.label}
          </p>
          <a href={site.phone.href} className="btn">
            <Phone /> Call {site.phone.display}
          </a>
        </div>
      </div>
    </>
  );
}
