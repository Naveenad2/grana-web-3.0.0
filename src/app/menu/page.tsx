import type { Metadata } from "next";
import { MenuHero } from "@/components/menu/MenuHero";
import { MenuExplorer } from "@/components/menu/MenuExplorer";
import { Marquee } from "@/components/ui/Marquee";
import { menu } from "@/data/menu";
import { site } from "@/data/site";
import { breadcrumbJsonLd, menuJsonLd, toJsonLd } from "@/lib/jsonld";

const description =
  "The full Grana Pizzeria menu with photos and prices: Neapolitan-style pizza rossa and bianca, Margherita, White Funghi, White Brisket, truffle mushroom spaghetti, fried 3-cheese ravioli, tiramisu and more. Panampilly Nagar, Kochi.";

export const metadata: Metadata = {
  title: "Menu: Neapolitan Pizza, Pasta & Dolci",
  description,
  alternates: { canonical: "/menu" },
  openGraph: {
    type: "website",
    url: "/menu",
    title: `Menu | ${site.name}`,
    description,
    images: [{ url: "/images/menu/margherita.jpg", width: 1000, height: 800, alt: "Grana Margherita pizza" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Menu | ${site.name}`,
    description,
    images: ["/images/menu/margherita.jpg"],
  },
};

export default function MenuPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(menuJsonLd()) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: toJsonLd(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Menu", path: "/menu" },
            ]),
          ),
        }}
      />
      <MenuHero />
      <Marquee
        items={["Pizza rossa", "Pizza bianca", "Antipasti", "Pasta", "Insalate", "Panini", "Dolci", "Bevande"]}
        tone="orange"
        speed={40}
      />
      <MenuExplorer categories={menu} />
    </>
  );
}
