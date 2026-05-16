
---

## 2. CONTENT & MIGRATION FROM EXISTING SITE

- Extract all textual content, images, and brand assets from the static HTML/CSS/JS teleradiology site.
- Preserve the original messaging, but enhance copy where needed for clarity, persuasion, and SEO (headlines, subheadlines, benefit statements).
- Convert any inline CSS/JS into modern Tailwind utility classes and React components.
- Redesign the layout and visual treatment completely — do **not** just copy the old design. The new design must feel premium, trustworthy, and modern, appropriate for a healthcare/telemedicine brand.
- Ensure all images are optimised: use WebP/AVIF formats, supply multiple sizes, and use the Next.js `<Image>` component with appropriate `priority`, `sizes`, and `placeholder="blur"` (or `data:` blur placeholder if needed).

---

## 3. DESIGN SYSTEM & STYLING

- Implement a sophisticated, clean, and calming visual identity suitable for a teleradiology brand (medical, precise, reliable).
- Define a cohesive colour palette using CSS custom properties in `globals.css` (primary blue/teal, white, soft greys, accent colours for CTAs). Use Tailwind’s `theme.extend.colors` to map them.
- Typography: use `next/font` to load a premium sans‑serif font (e.g., Inter or Plus Jakarta Sans) with appropriate weights. Headings should be bold and clear; body text highly legible.
- Use a responsive grid system with `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` for consistent alignment.
- Apply subtle background gradients, soft shadows, and smooth transitions for a premium feel.
- Animate elements on scroll using **Framer Motion** (use `useInView` or `motion.div` with `whileInView`). Animations should be elegant, not distracting — fades, slides, and scale‑in effects.
- **Mobile‑first responsive design**: layouts must adapt seamlessly from 320px to 4K+, with no horizontal scroll. Navigation collapses into a hamburger menu. Touch targets meet WCAG minimums.
- Add a dark mode toggle? Not required for v1 but keep the design light‑mode optimized.

---

## 4. MULTI‑PAGE STRUCTURE (APP ROUTER)

Create at least these pages, each as a server component where possible, with appropriate `metadata` exports for SEO:

1. **Home** (`/`):
 - Hero section with a compelling value proposition, a primary CTA button (“Get Started” / “Schedule a Consultation”), and a subtle background illustration or animated medical imagery.
 - Trust bar (logos of partner hospitals, certifications).
 - “How It Works” section with 3–4 steps (upload images → radiologist interprets → report delivered).
 - Key benefits / features (24/7 availability, board‑certified radiologists, fast turnaround, HIPAA‑compliant).
 - Testimonials carousel (text + photo).
 - FAQ accordion (server‑rendered, interactivity with client component).
 - Final conversion CTA with contrasting button.
 - Footer with sitemap, social links, contact info.

2. **About Us** (`/about`):
 - Company story, mission, values.
 - Team showcase (headshots + short bios).
 - Certifications / accreditations (ACR, ISO, etc.).
 - Timeline of milestones (optional).

3. **Services** (`/services`):
 - Detailed service cards (Emergency Radiology, Subspecialty Reads, MSK, Neuro, etc.).
 - Each service may have a dedicated sub‑page (`/services/[slug]`) rendered via `generateStaticParams` with static content.
 - Comparison table (traditional vs. teleradiology) with clear advantages.
 - Turnaround times and workflow explanation.

4. **Contact** (`/contact`):
 - Contact form with fields: name, email, phone, organisation, message.
 - Form submission can use a simple server action that sends an email via Resend or stores a lead in a Google Sheet (no heavy backend; just a server‑side integration). Fallback: `mailto:` link or `formsubmit.co`.
 - Map / office locations (static images or embedded Google Map iframe, lazy‑loaded).
 - Direct phone/email info.

5. **Legal** (`/privacy`, `/terms`):
 - Static markdown‑driven pages for privacy policy and terms of service, styled with `@tailwindcss/typography`.

- All pages share a global `<Header />` and `<Footer />` via the root layout.
- Use **loading.tsx** and **error.tsx** for meaningful UX states (skeleton loaders, friendly error messages).
- A custom **not-found.tsx** page with brand‑aligned design.

---

## 5. COMPONENT REQUIREMENTS & INTERACTIVITY

- All components must be **accessible**: semantic HTML, ARIA labels where needed, keyboard navigation, focus rings.
- Build a reusable `<Button />` component with variants (primary, secondary, outline, ghost) and sizes.
- Build a `<Section />` wrapper that handles spacing (`py-12 sm:py-16 lg:py-24`) and optional background colours.
- Interactive elements (accordion, mobile menu, carousel, tabs) must be built as client components with `"use client"` only where necessary, keeping most of the page static/server‑rendered.
- Use **Radix UI** primitives (unstyled) for accordion, tabs, dialog, etc., to ensure accessibility and smooth behaviour, styled with Tailwind. Alternatively, lightweight custom hooks.
- Implement a cookie consent banner (GDPR/CCPA) that appears as a small toast or bottom bar, with a “cookie settings” link (can point to privacy page).
- Add a floating “Back to Top” button with smooth scroll.

---

## 6. SEO & PERFORMANCE

- Use the Next.js **Metadata API** (`generateMetadata` or static `metadata` export) on every page with unique title, description, openGraph, and twitter images.
- Generate `sitemap.xml` and `robots.txt` using a `sitemap.ts` in the app directory (or manual static files).
- Add structured data (JSON‑LD) for `Organization`, `MedicalBusiness`, and `WebPage` using `<Script>` with `strategy="worker"` or a dedicated component. Include rich snippets for FAQs.
- Ensure **perfect Lighthouse scores**:
- Images: use `next/image`, properly sized, lazy loading for below‑the‑fold, priority for LCP image.
- Fonts: `next/font` with `subset` and `display: swap`.
- Code splitting: minimise client‑side JavaScript, use dynamic imports with `ssr: false` for non‑critical third‑party widgets (e.g., map).
- CSS: avoid unused Tailwind classes (PurgeCSS is built‑in).
- Enable **Turbopack** for faster development; keep configuration compatible.

---

## 7. CONVERSION OPTIMISATION

- CTAs must be prominent, contrasting, and action‑oriented (“Get Your First Report in 30 Minutes”, “Speak to a Specialist”).
- Social proof elements: testimonial with photo, name, title; real accreditation logos; case study snippets (if available).
- Trust signals: HIPAA badge, board certification icons, data encryption note, “No long‑term contracts” mention.
- Use urgency/benefit‑driven microcopy.
- The contact form should be simple (max 5 fields) with a compelling micro‑copy above the submit button.

---

## 8. ANIMATIONS & MICRO‑INTERACTIONS

- Use Framer Motion for:
- Staggered section reveal (fade‑in + translateY).
- Counter animations (e.g., “10,000+ scans interpreted”).
- Testimonial auto‑rotating carousel.
- Smooth page transitions (optional, via layout animations).
- Hover effects on cards (subtle lift + shadow).
- Button loading states on form submission.
- Scroll‑linked progress indicator (optional, minimalist).

---

## 9. DEPLOYMENT & DELIVERABLES

- The final output must be a fully functional Next.js project that can be deployed to Vercel with zero configuration.
- Include a `README.md` with:
- Project overview, features, tech stack.
- How to run locally (`npm run dev` with Turbopack).
- How to build (`npm run build`).
- Environment variables needed (e.g., `RESEND_API_KEY` for contact form, `NEXT_PUBLIC_GOOGLE_MAPS_KEY` if map is used).
- All environment variables must be validated using a `.env.example` file.
- The project must pass `npm run build` without errors or warnings.

---

## 10. CONSTRAINTS & DON’Ts

- Do **not** implement any user authentication (no login, registration, dashboard).
- Do **not** add a database or API‑based CMS; content can be stored in markdown, JSON, or hardcoded constants (except the contact form server action).
- Do **not** handle DICOM files or any medical imaging manipulation on the client.
- Avoid heavy third‑party libraries that hurt performance (e.g., jQuery, large icon packs). Use Lucide React or Heroicons for icons.
- No scroll‑jacking or excessive animations that could trigger motion sensitivity.

---

## HOW TO START

1. Analyse the provided static HTML/CSS/JS teleradiology website (I will provide the code or URL). Extract all text, images, colour values, and key sections.
2. Create the Next.js project with the specifications above.
3. Build the design system (colours, fonts, reusable components) first.
4. Implement page by page, starting with the global layout (Header, Footer).
5. Add animations and interactive elements.
6. Optimise for SEO and performance.
7. Test responsiveness and accessibility.
8. Provide the complete source code with a clear file structure.

Now, please begin.