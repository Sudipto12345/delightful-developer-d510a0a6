# ElevateHub Ltd — Bangla-first LMS Platform (Frontend, Static Data)

Inspired by cobaltbluelimited.com, rebuilt as a mobile-first, Bangla-language LMS for ElevateHub Ltd. Everything is frontend-only with realistic static data — every button, filter, form, and dashboard behaves logically without a backend.

## Design direction

- Cobalt blue core (deep cobalt #1226C4 / electric #3B5BFF) with a warm energetic accent (amber #FFB020) and near-black slate surfaces. Youth/sports energy: bold diagonal cuts, speed-line motifs, glassy cards.
- Typography: Hind Siliguri / Noto Sans Bengali for Bangla body text + Anek Bangla or Space Grotesk for display headings. Bangla-first copy across the whole site, English only for technical terms.
- Mobile-first layout: thumb-reachable bottom nav on mobile, sticky CTA bar, 44px+ tap targets, low-bandwidth-friendly images.
- Motion: Framer Motion everywhere — scroll-reveal, staggered cards, parallax layers, magnetic buttons, counters, marquee, page transitions. A lightweight CSS/SVG-based 3D object (rotating cobalt cube/orb with depth layers) in the hero, no heavy WebGL.
- Generated art per section: hero illustration, vector course-category icons, mentor/learner scenes, exam/certificate art, payment art, testimonial backdrops — each section gets its own image, not repeats.
- Short generated animated video clips used as scroll-triggered background loops in the hero and one mid-page band.

## Public pages

1. `/` Home — long, section-rich page: hero with 3D object + video loop, live stats counters, course categories grid, featured courses carousel, "কেন ElevateHub", learning path timeline, mentor spotlight, skill-quiz teaser, success stories with photos, batch countdown, corporate training band, blog preview, FAQ accordion, newsletter, final CTA.
2. `/courses` — searchable/filterable catalog (category, level, price, language, duration) with sort + pagination, all client-side over static data.
3. `/courses/$slug` — curriculum accordion, instructor, outcomes, reviews, sticky enroll card.
4. `/categories/$slug` — category landing pages.
5. `/instructors` and `/instructors/$slug`.
6. `/blog` and `/blog/$slug`.
7. `/about`, `/contact` (validated form), `/consultation` (booking form), `/pricing`, `/faq`, `/corporate`, `/events`, `/terms`, `/privacy`, `/refund-policy`.
8. `/auth/login`, `/auth/register`, `/auth/forgot-password` — clean, calm split-screen with animated illustration; role select (learner/instructor).
9. `/checkout/$slug` — manual payment flow: bKash / Nagad / Rocket / bank transfer instructions, TrxID + screenshot upload form, "verification pending" confirmation screen.

## Learner dashboard (`/dashboard/*`)

Home, My Courses, Course Player (video area, lesson list, notes, progress), Assignments/Quiz, Certificates, Bookings, Payments/Invoices, Profile & settings.

## Admin panel (`/admin/*`)

Fixed left sidebar + collapsible on mobile, topbar with search and notifications.
Dashboard (KPI cards, charts, recent activity), Courses (add/edit/remove, publish toggle), Enrollment Requests (approve/reject), Payment Verification (manual TrxID approve/reject), Learners, Non-enrolled users, Instructors (add/remove/approve), Categories, Blog/CMS, Reviews moderation, Certificates, Reports, Audit log, Settings. All mutations update in-memory store so the UI genuinely changes.

## SEO

Per-route `head()` with unique Bangla titles/descriptions, og/twitter tags, JSON-LD (Organization, Course, Article, FAQPage, BreadcrumbList), semantic headings, alt text in Bangla, `robots.txt`, `sitemap.xml`, canonical links.

## Technical notes

- TanStack Start file routes under `src/routes`; layouts for public, dashboard, admin.
- All content in typed static data modules (`src/data/*`), with a React context store providing enroll/approve/reject/CRUD actions so the app is fully interactive.
- Design tokens in `src/styles.css` (cobalt palette, gradients, shadows, radii) — no hardcoded colors in components.
- `framer-motion` for animation, `recharts` for admin charts, `zod` + `react-hook-form` for all forms.
- Images generated as project assets; video loops generated and embedded muted/looping with `prefers-reduced-motion` fallbacks.

## Build order

1. Design system + tokens + fonts + layouts and navigation.
2. Home page with all sections, images, motion, video.
3. Public pages (courses, detail, blog, about, contact, policies, auth, checkout).
4. Learner dashboard.
5. Admin panel.
6. SEO pass, mobile polish, performance and accessibility check.

This is a large build — it will be delivered in stages, starting with the design system and home page.
