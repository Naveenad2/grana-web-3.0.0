// Single source of truth for restaurant details. Update here and every page,
// the JSON-LD and the sitemap follow.

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export const site = {
  url: resolveSiteUrl(),
  name: "Grana Pizzeria by Abramatt",
  shortName: "Grana Pizzeria",
  tagline: "It's all about the base!",
  description:
    "Neapolitan-style, wood-fired pizza in Panampilly Nagar, Kochi. Hand-stretched bases, fresh pasta, starters and tiramisu from Grana Pizzeria by Abramatt. Dine in, takeaway or order online.",
  founder: "Abraham Mathew",
  phone: {
    display: "081293 40091",
    international: "+91 81293 40091",
    href: "tel:+918129340091",
  },
  address: {
    street: "728/A, Poornima Building, 1st Cross Road",
    locality: "Panampilly Nagar",
    city: "Kochi",
    region: "Kerala",
    postalCode: "682036",
    country: "IN",
  },
  geo: { lat: 9.9650332, lng: 76.2953372 },
  hours: {
    // Every day, IST
    opens: "12:00",
    closes: "23:00",
    label: "Every day · 12 PM – 11 PM",
  },
  links: {
    maps: "https://maps.app.goo.gl/hu85PQfksW5DfYU46",
    directions: "https://www.google.com/maps/dir/?api=1&destination=9.9650332%2C76.2953372",
    mapEmbed:
      "https://www.google.com/maps?q=Grana+Pizzeria+by+Abramatt,+Panampilly+Nagar,+Kochi&ll=9.9650332,76.2953372&z=17&output=embed",
    zomato: "https://www.zomato.com/kochi/grana-pizzeria-by-abramatt-1-panampilly-nagar/order",
    swiggy: "https://www.swiggy.com/search?query=Grana%20Pizzeria%20Panampilly%20Nagar",
    // Add the Instagram profile URL here to show it across the site.
    instagram: "" as string,
  },
  rating: { value: 4.5, count: 600, source: "Google" },
} as const;

/**
 * Platform ratings as listed when the site was built. Update these from each platform;
 * the page footnote tells visitors they may have changed.
 */
export const platformRatings = [
  { name: "Google", value: 4.5, note: "600+ reviews", href: site.links.maps },
  { name: "Swiggy", value: 4.6, note: "delivery", href: site.links.swiggy },
  { name: "Justdial", value: 4.4, note: "450+ ratings", href: "https://www.justdial.com/Ernakulam/Grana-Pizzeria-By-Abramatt-Panampilly-Nagar/0484PX484-X484-241129230905-E2Z2_BZDET" },
  { name: "Zomato", value: 4.3, note: "delivery", href: site.links.zomato },
] as const;

/**
 * What guests bring up most, summarised from public reviews (Google, Zomato, District, Justdial).
 * These are themes, not verbatim quotes. Swap in real quotes only with the reviewer's permission.
 */
export const guestNotes = [
  { topic: "The crust", note: "Thin, airy, Napoli-style base with a proper cheese pull." },
  { topic: "Must-try", note: "The truffle mushroom spaghetti comes up again and again." },
  { topic: "The classic", note: "An authentic Margherita: fresh ingredients, perfect crust." },
  { topic: "The verdict", note: "Plenty of guests call it the best pizza in Kochi." },
  { topic: "White pizzas", note: "White Brisket and White Funghi get a lot of love." },
  { topic: "The service", note: "Prompt, polite and attentive staff." },
  { topic: "The room", note: "Cosy and elegant, with an open kitchen to watch the pizzaiolos." },
  { topic: "For the table", note: "Fried 3-cheese ravioli and truffle parmesan fries to start." },
] as const;

export const fullAddress = `${site.address.street}, ${site.address.locality}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}`;

export const navLinks = [
  { href: "/menu", label: "Menu" },
  { href: "/#story", label: "Our story" },
  { href: "/#takeaway", label: "Takeaway" },
  { href: "/#visit", label: "Visit" },
] as const;
