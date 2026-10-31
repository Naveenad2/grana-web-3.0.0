import { site } from "@/data/site";
import { menu } from "@/data/menu";

const abs = (path: string) => `${site.url}${path}`;

export function restaurantJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": abs("/#restaurant"),
    name: site.name,
    alternateName: site.shortName,
    slogan: site.tagline,
    description: site.description,
    url: abs("/"),
    logo: abs("/logo.png"),
    image: [abs("/opengraph-image.jpg"), abs("/images/story/hero-pizza.jpg")],
    telephone: site.phone.international,
    priceRange: "₹₹",
    servesCuisine: ["Pizza", "Neapolitan", "Italian", "Pasta"],
    hasMenu: abs("/menu"),
    founder: { "@type": "Person", name: site.founder },
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: `${site.address.locality}, ${site.address.city}`,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    hasMap: site.links.maps,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: site.hours.opens,
        closes: site.hours.closes,
      },
    ],
    sameAs: [site.links.zomato, site.links.instagram].filter(Boolean),
  };
}

export function menuJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    "@id": abs("/menu#menu"),
    name: `${site.shortName} menu`,
    url: abs("/menu"),
    inLanguage: "en-IN",
    mainEntityOfPage: abs("/menu"),
    hasMenuSection: menu.map((cat) => ({
      "@type": "MenuSection",
      name: cat.title,
      description: cat.blurb,
      hasMenuItem: cat.items.map((item) => ({
        "@type": "MenuItem",
        name: item.name,
        description: item.description,
        image: abs(item.image),
        offers: { "@type": "Offer", price: item.price, priceCurrency: "INR" },
        ...(item.diet === "veg" ? { suitableForDiet: "https://schema.org/VegetarianDiet" } : {}),
      })),
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

/** Serialise for a <script type="application/ld+json"> tag, escaping `<` so content can't close the tag. */
export function toJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
