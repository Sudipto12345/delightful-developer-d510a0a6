# Humanized Visual Overhaul + Dynamic Media

Goal: every image and video comes from the database, the UI stops looking AI-generated, and loading/scroll feels polished.

## 1. Real photography for everything (stored, not static)

Generate realistic, documentary-style photography (real human models, natural light, workspace context — no glossy 3D, no neon gradients, no floating UI cards):

- 24 course covers — one per course, matched to its topic
- 10 mentor portraits — natural headshots, varied age/gender/ethnicity
- 8 course-category banners
- 6 service-category banners
- 6 topic loop videos (web/design/marketing/data-AI/SEO/freelancing), reused across courses in the same category instead of one video per course

All files upload to a public `catalog-media` storage bucket. New columns store the URLs:

- `courses.image_url`, `courses.video_url`, `courses.poster_url`
- `instructors.avatar_url`
- `catalog_categories.image_url`

Code reads these URLs; the current hardcoded maps in `src/data/courseImages.ts` and `src/data/courseMedia.ts` become fallbacks only.

## 2. Dark palette away from the "AI blue"

Replace the cobalt/indigo dark theme with a warmer editorial palette: deep charcoal/ink base with a slight warm cast, muted clay or forest accent, off-white text, gold reserved for small highlights only. Light theme is re-tuned to the same family. Gradients get toned down; large purple/blue glows removed.

## 3. Card and component redesign (no capsules)

- Course cards: square-ish corners with a small radius, editorial typography, a thin rule instead of pill chips, hover that lifts the image rather than adding a glow
- Badges/tags become underlined or bracketed labels, not full-round pills
- Buttons move to a small, consistent radius
- Mentor cards use the real portrait with an offset frame instead of a circular avatar

## 4. Mobile-first, varied grid

The course grid stops being one repeated row: a featured wide card, then mixed 1-col / 2-col spans that reflow through a bento-style arrangement on tablet and desktop. Category rails become horizontal snap-scroll strips on mobile with momentum and hidden scrollbars.

## 5. Loading and transitions

- Skeleton loaders for course grids, course detail, mentor lists, and services (matched to real card shapes, not generic grey blocks)
- Route-level fade/slide page transitions and a slim top progress bar during navigation
- Image fade-in on load, lazy loading everywhere

## 6. Home page copy tightening

Every section gets a short eyebrow line plus a short heading — e.g. "Choose your field" over "Categories" — with body copy trimmed. Less text, stronger hierarchy.

## 7. Login/auth polish

Clean up the sign-in and register pages: fix the misaligned/awkward Google button and captcha area, tighten spacing and field sizing, move the demo credentials into a subtle collapsible note, and match the new palette. Same treatment for forgot-password.

## Technical notes

- One migration adds the media URL columns; a second data pass writes the uploaded public URLs
- `useCatalog` maps the new columns; `getCourseImage`/`getCourseVideo` accept a DB URL first and fall back to bundled assets
- Skeletons via existing shadcn `Skeleton`; route transitions via framer-motion in `__root.tsx` + `PublicShell`
- Palette changes stay in `src/styles.css` tokens — no hardcoded colors in components

Media generation for 48+ assets runs in batches, so this will take several passes.
