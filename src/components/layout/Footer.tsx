import { Img } from "@/components/ui/Img";
import Link from "next/link";
import { fullAddress, navLinks, site } from "@/data/site";
import { ArrowUpRight, Instagram, Phone } from "@/components/ui/Icons";
import { OpenBadge } from "@/components/ui/OpenBadge";
import styles from "./Footer.module.css";

const YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.awning} aria-hidden="true" />

      <div className="container">
        <p className={`script ${styles.sign}`} data-reveal="mask">
          It&rsquo;s all about the base!
        </p>

        <div className={styles.grid}>
          <div className={styles.brandCol}>
            <Img src="/logo-cream.png" alt={site.name} width={220} height={220} sizes="200px" className={styles.logo} />
            <p>
              Neapolitan-style pizza, opened by hand and fired in about ninety seconds. Made with love on 1st
              Cross Road.
            </p>
          </div>

          <div>
            <h2 className={styles.colTitle}>Visit</h2>
            <address className={styles.address}>{fullAddress}</address>
            <a className={styles.textLink} href={site.links.directions} target="_blank" rel="noopener noreferrer">
              Get directions <ArrowUpRight />
            </a>
          </div>

          <div>
            <h2 className={styles.colTitle}>Hours</h2>
            <p>{site.hours.label}</p>
            <div className={styles.badgeRow}>
              <OpenBadge tone="cream" />
            </div>
          </div>

          <div>
            <h2 className={styles.colTitle}>Explore</h2>
            <ul className={styles.links}>
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
              <li>
                <a href={site.links.zomato} target="_blank" rel="noopener noreferrer">
                  Order on Zomato
                </a>
              </li>
              <li>
                <a href={site.links.swiggy} target="_blank" rel="noopener noreferrer">
                  Order on Swiggy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.contactRow}>
          <a href={site.phone.href} className="btn btn--orange">
            <Phone /> {site.phone.display}
          </a>
          {site.links.instagram ? (
            <a
              href={site.links.instagram}
              className="btn btn--ghost-cream"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram /> Instagram
            </a>
          ) : null}
        </div>
      </div>

      <div className={styles.giant} aria-hidden="true">
        <span>Grana</span>
      </div>

      <div className={`container ${styles.legal}`}>
        <p>
          © {YEAR} {site.name}
        </p>
        <p>Panampilly Nagar · Kochi · Kerala</p>
      </div>
    </footer>
  );
}
