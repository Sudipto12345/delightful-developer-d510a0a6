# Premium Course Tier + Airwallex Webhook Go-Live

## 1. Ten new premium courses ($1,000–$5,000)

Add 10 new database-backed courses at the high-ticket price ladder:
$1,000 / $1,500 / $1,900 / $2,500 / $2,900 / $3,500 / $3,900 / $4,500 / $4,900 / $5,000.

Each one is a distinct flagship program (no reused copy from existing courses), for example:

- AI Product Engineering Intensive
- Enterprise Cloud Architecture Mastery
- Growth Marketing Leadership Program
- Full-Stack SaaS Founder Bootcamp
- Data Engineering & Analytics Career Track
- Brand & Creative Direction Studio
- Cybersecurity Operations Professional
- Product Management Executive Track
- E-commerce Scale-Up Accelerator
- Applied Machine Learning Engineering

For every course: unique title, subtitle, long description, 4–6 outcomes, requirements, full module/lesson tree, duration, lesson count, rating, students, mentor assignment, badge, next batch, and a "Premium" tier feel on the card.

Content and prices for the existing courses stay as they are; the premium tier is added alongside so the catalog spans entry ($39) to executive ($5,000).

## 2. Individual, non-duplicate imagery

Generate 10 brand-new cover images — one per course, each a different scene, subject, palette and composition (realistic documentary photography style, no AI-looking gradients, no repeats of existing covers). Each image is stored and written to that course's `image_url` so the grid, detail page, and checkout all show unique art. Course preview videos are mapped from the existing cinematic loops.

## 3. Airwallex webhook + live domain

- Save the webhook secret `0e230a9c-...` securely as `AIRWALLEX_WEBHOOK_SECRET` (server-side only, never in code).
- Point the checkout return/success URLs at `https://elevatehubltd.com` so buyers come back to the live domain instead of the preview URL.
- The existing endpoint `https://elevatehubltd.com/api/public/webhooks/airwallex` already verifies the HMAC signature, dedupes replays, re-reads the payment intent from Airwallex, and only then approves the enrollment — no change to that logic, just the secret and domain wiring.
- After publishing, a test event from the Airwallex webhook page should return 200.

## Technical notes

- New courses go in via a data insert against the `courses` table (slug, price, modules JSON, image_url, video_url, sort_order), so nothing is hardcoded in the frontend.
- Images generated to `src/assets/catalog/` and referenced by absolute asset URL in `image_url`.
- Webhook secret stored through the secure secret form (not `.env`, not committed).
- Return URL derives from a configurable site origin defaulting to `https://elevatehubltd.com`.  
  
  
  
also guest purchase checkout form where collect required info annd also create annd login account on that chackeout page   
