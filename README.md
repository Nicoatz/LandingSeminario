# RentAR — Landing (Next.js + Ant Design)

Landing page prototype for RentAR — direct, agency-free long-term rentals in Córdoba, Argentina.

This is a stack migration of the original `../landing/` prototype (Vite + React + Tailwind) onto **Next.js (App Router) + JavaScript + Ant Design**. Same visual design, same content, same client-side-only mock data — different implementation. See `PRODUCT.md` and `DESIGN.md` for the product and design system this build follows.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — lint with ESLint

## Project structure

- `app/` — routes, root layout (fonts, `ConfigProvider` theme, metadata), global CSS
- `components/` — page sections and UI (each paired with a CSS module for layout/spacing antd tokens don't cover)
- `lib/theme.js` — Ant Design `ConfigProvider` theme tokens mapped from the RentAR brand palette
- `lib/data/`, `lib/types/`, `lib/utils/` — mock property data, filter defaults, formatting helpers
- `assets/` — logo and property photos (imported directly, optimized via `next/image`)
