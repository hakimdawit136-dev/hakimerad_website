# HakimeRAD — hakimerad.health.et

The HakimeRAD marketing site — an AI-enabled teleradiology platform built for
Ethiopian healthcare. Rebuilt as a modern Next.js application from the original
static HTML site.

---

## Highlights

- **Next.js 15** App Router with React 19 and TypeScript
- **Tailwind CSS v4** with brand tokens defined in `app/globals.css`
- **`next/font`** loading Plus Jakarta Sans (display) + Inter (body)
- **Framer Motion** for scroll-reveal, stagger, hero animation, and stats counters
- **Radix UI** primitives for accessible Accordion, Dialog (mobile menu)
- **Lucide React** icon set
- **`next/image`** with AVIF/WebP for every photo
- Re-encoded hero video (`<video>` with WebM + H.264 + poster)
- **Server actions + Resend** for the contact form, with `mailto:` fallback
- **`react-hook-form`** + **Zod** validation shared between client and server
- Static `/sitemap.xml`, `/robots.txt`, full **JSON-LD** for Org / Service / FAQ / Breadcrumb
- Custom `not-found.tsx`, `error.tsx`, `loading.tsx`
- Cookie consent banner with localStorage persistence
- Back-to-top button
- `prefers-reduced-motion` respected throughout

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero with video, benefits, how-it-works, stats, testimonials, FAQ, CTA |
| `/about` | Story, mission/vision, team, values, certifications |
| `/services` | 4-card grid, comparison table, onboarding process |
| `/services/[slug]` | One detail page per service via `generateStaticParams` |
| `/pricing` | 3 plans (Per-Case / Premium / After-Hours) + FAQ |
| `/blog` | Card grid of insights |
| `/blog/[slug]` | Long-form article (statically generated) |
| `/contact` | Contact cards + form (server action) + Ethiopia map |
| `/privacy`, `/terms` | Markdown-driven legal pages |
| `/sitemap.xml`, `/robots.txt` | Generated via `app/sitemap.ts` and `app/robots.ts` |

## Tech stack

- [Next.js 15](https://nextjs.org/) (App Router, Turbopack dev, RSC by default)
- [React 19](https://react.dev/) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/) via `@tailwindcss/postcss`
- [Framer Motion](https://www.framer.com/motion/), [Radix UI](https://www.radix-ui.com/), [Lucide React](https://lucide.dev/)
- [Resend](https://resend.com/) for transactional email
- [react-hook-form](https://react-hook-form.com/) + [Zod](https://zod.dev/)

## Getting started

Requires Node.js 20+ and Docker (for local database).

```bash
# install
npm install

# copy env template
cp .env.example .env.local

# start local MySQL database with Docker
docker-compose up -d

# start dev server (Turbopack)
npm run dev
# → http://localhost:3000
```

### Available scripts

| Script | What it does |
|--------|--------------|
| `npm run dev` | Next.js dev server with Turbopack |
| `npm run build` | Production build |
| `npm run start` | Run the production build locally |
| `npm run lint` | Next.js ESLint config |
| `npm run typecheck` | `tsc --noEmit` |

## Environment variables

See [`.env.example`](./.env.example).

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | yes (in prod) | Canonical URL used for OG tags, sitemap, JSON-LD. |
| `RESEND_API_KEY` | optional | If set, the contact form sends via Resend. If unset, the form returns an error and points the user at a `mailto:` fallback. |
| `CONTACT_TO_EMAIL` | optional | Inbox that receives contact-form submissions. Defaults to `info@hakimerad.health.et`. |
| `RESEND_FROM_EMAIL` | optional | "From" address Resend uses. Must be a verified sender in your Resend project. |
| `NEXTAUTH_SECRET` | yes | Secret used for NextAuth.js tokens. |
| `MYSQL_*` | yes | MySQL connection parameters. |

## Project layout

```
hakimerad_website/
├── app/                  # App Router pages + server actions
├── components/           # UI, layout, home sections, contact, seo helpers
├── content/              # Markdown source for /privacy and /terms
├── lib/                  # site config, nav, content data, schemas
├── public/               # favicon, photos, blog images, videos
├── legacy/               # Original static HTML site (reference only)
├── next.config.ts
├── eslint.config.mjs
├── postcss.config.mjs
├── tsconfig.json
└── package.json
```

## Brand tokens

Defined in `app/globals.css` as Tailwind v4 `@theme` variables:

| Token | Hex | Meaning |
|-------|-----|---------|
| `--color-brand-blue-700` | `#00529B` | Logo "Hakim" — primary brand |
| `--color-brand-orange-500` | `#FF9900` | Logo "eRAD" — accents / CTAs |
| `--color-brand-teal-500` | `#14B8A6` | Calm medical accent |

Available as Tailwind utilities: `bg-brand-blue-700`, `text-brand-orange-500`, etc.

Social media URLs live in [`lib/site.ts`](./lib/site.ts). Update them once when the real handles are ready — every link in the codebase reads from that file.

## Database & Admin Panel

The site uses a MySQL database to manage authentication and dynamic blog posts.
The initial schema and seed scripts are located in `database/`. When `docker-compose up -d` is run for the first time, it automatically creates the tables and seeds existing static blog posts.

To manage blog content:
1. Register a new account via `/register` (if no admin exists).
2. For testing/demo, manually set the role to `ADMIN` in the database.
3. Access `/admin` to use the Dashboard and Blog Management tools.

## Deployment on Plesk

Designed to run natively on any Plesk control panel using the Node.js extension.

1. Configure environment variables in Plesk (`.env`).
2. Run `npm install` and `npm run build`.
3. Set the Document Root to the generated output directory (using `output: "standalone"` inside `next.config.ts`, the root is `.next/standalone`).
4. Ensure the `public` and `.next/static` directories are correctly copied or accessible for static assets.
5. Setup the production MySQL database in Plesk, update the `MYSQL_*` environment variables to point to it, and manually import `database/1-schema.sql` and `database/2-seed.sql` to initialize it.

The legacy static site under `legacy/` is not served and exists only as a content reference.

## License

© HakimeRad Teleradiology Consultancy PLC. All rights reserved.
