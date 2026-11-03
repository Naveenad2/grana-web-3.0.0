# Grana Pizzeria by Abramatt: website

Next.js 16 (App Router) + TypeScript + CSS Modules. No UI or animation libraries: every effect is CSS transforms/opacity driven by a few small hooks, so it stays fast on phones.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production
npm run lint       # ESLint (Next + React hooks rules)
npm run typecheck  # TypeScript
npm run blur       # regenerate photo blur previews after adding/replacing images in public/images
```

Set the live domain before deploying (used for canonical URLs, sitemap, Open Graph and JSON-LD):

```bash
cp .env.example .env.local   # then edit NEXT_PUBLIC_SITE_URL
```

On Vercel this falls back to the production URL automatically.

## Where to edit things

| What | File |
| --- | --- |
| Address, phone, hours, map/Zomato/Swiggy/Instagram links, ratings, guest-review themes | `src/data/site.ts` |
| Full menu: categories, dishes, prices, veg/non-veg, photos, badges | `src/data/menu.ts` |
| Colours, fonts, buttons, reveal animations | `src/app/globals.css` |
| Logo | `logo.png` (source) → `public/logo.png`, `public/logo-cream.png` (for dark backgrounds) |

## Before going live: please check

1. **Menu & prices.** Items marked `// listed` in `src/data/menu.ts` come from Grana's public listings. Prices marked `// listed price` come from Zomato. Everything else is a placeholder written in the restaurant's style. Check every name, price and veg/non-veg mark against the in-store menu (tiramisu and panna cotta especially: egg/gelatine).
2. **Dish photos** in `public/images/menu/` are licensed stock (Unsplash License, free for commercial use) standing in for Grana's own shots. Replace them with real dish photos at the same file names (5:4, about 1000×800) and nothing else needs to change.
3. **Instagram**: add the profile URL to `site.links.instagram` and the buttons appear automatically.
4. **Ratings** in `platformRatings` were taken from each platform when the site was built. Update them occasionally.
5. **Guest notes** on the ticket rail summarise themes from public reviews. They are not quotes. Only add real quotes with the reviewer's permission.

## Pages & sections

- `/`: hero (box-lid type, live open/closed badge), manifesto, real-photo "making of" scroll story, signature reel, 3D takeaway box, Life at Grana (real photos, draggable), guestbook (rating pizza + ticket rail), find us (live pizza clock, postcard, delivery map).
- `/menu`: full menu with photos, category wheel, sticky tabs with scroll-spy, veg/non-veg filter, search, dish dialog.
- `sitemap.xml`, `robots.txt`, `manifest.webmanifest`, Open Graph image, Restaurant + Menu + Breadcrumb JSON-LD.

All motion respects `prefers-reduced-motion`.

## Notes

- **New or replaced photos:** run `npm run blur` afterwards. It makes the tiny blurred previews that let photos fade in instead of flashing.
- **Logo intro:** the welcome screen plays once per browser session, on the home page only, and never for visitors who turn off animations.
- **Proposal PDF:** `proposal/Grana-Pizzeria-Website-Proposal-IntCod.pdf`. Its source is `proposal/source/index.html`: edit the text, open it in Chrome, then Print → Save as PDF (the page size is built in; turn on "Background graphics").
