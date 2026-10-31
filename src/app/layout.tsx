import type { Metadata, Viewport } from "next";
import { Archivo, Courier_Prime, Homemade_Apple, Young_Serif } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileDock } from "@/components/layout/MobileDock";
import { RevealObserver } from "@/components/ui/RevealObserver";
import { site } from "@/data/site";
import { restaurantJsonLd, toJsonLd } from "@/lib/jsonld";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const youngSerif = Young_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
  display: "swap",
});

const homemadeApple = Homemade_Apple({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
  display: "swap",
});

const courierPrime = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Neapolitan Pizza in Panampilly Nagar, Kochi`,
    template: `%s | ${site.shortName}, Kochi`,
  },
  description: site.description,
  applicationName: site.shortName,
  keywords: [
    "Grana Pizzeria",
    "Abramatt",
    "Neapolitan pizza Kochi",
    "wood-fired pizza Kochi",
    "pizza Panampilly Nagar",
    "best pizza in Kochi",
    "Italian restaurant Kochi",
    "pasta Kochi",
    "tiramisu Kochi",
    "pizza takeaway Ernakulam",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  category: "restaurant",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: site.name,
    title: `${site.name}: Neapolitan pizza in Kochi`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name}: Neapolitan pizza in Kochi`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  formatDetection: { telephone: true, address: true },
  other: {
    "geo.region": "IN-KL",
    "geo.placename": "Kochi",
    "geo.position": `${site.geo.lat};${site.geo.lng}`,
    ICBM: `${site.geo.lat}, ${site.geo.lng}`,
  },
};

export const viewport: Viewport = {
  themeColor: "#e0582f",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-IN"
      data-scroll-behavior="smooth"
      className={`${archivo.variable} ${youngSerif.variable} ${homemadeApple.variable} ${courierPrime.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* lets CSS hide scroll-reveal content only when JS is running */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: toJsonLd(restaurantJsonLd()) }}
        />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileDock />
        <RevealObserver />
      </body>
    </html>
  );
}
