CREATE TABLE public.catalog_categories (
  slug text primary key,
  name text not null,
  tagline text not null default '',
  icon text not null default 'Sparkles',
  color text not null default '',
  kind text not null default 'course',
  sort_order int not null default 0
);

CREATE TABLE public.services (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  category_slug text not null,
  tagline text not null default '',
  description text not null default '',
  starting_price numeric not null default 0,
  turnaround text not null default '',
  deliverables text[] not null default '{}',
  sort_order int not null default 0,
  published boolean not null default true
);

CREATE TABLE public.instructors (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  title text not null default '',
  bio text not null default '',
  experience text not null default '',
  students int not null default 0,
  courses_count int not null default 0,
  rating numeric not null default 4.8,
  skills text[] not null default '{}',
  approved boolean not null default true,
  sort_order int not null default 0
);

CREATE TABLE public.courses (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  subtitle text not null default '',
  category_slug text not null,
  level text not null default 'beginner',
  language text not null default 'english',
  price numeric not null default 0,
  old_price numeric,
  duration_hours int not null default 40,
  lessons_count int not null default 60,
  rating numeric not null default 4.8,
  reviews_count int not null default 0,
  students int not null default 0,
  instructor_slug text not null,
  badge text,
  image_key text not null default 'web-development',
  description text not null default '',
  outcomes text[] not null default '{}',
  requirements text[] not null default '{}',
  modules jsonb not null default '[]'::jsonb,
  next_batch text not null default '',
  published boolean not null default true,
  sort_order int not null default 0
);

GRANT SELECT ON public.catalog_categories TO anon, authenticated;
GRANT ALL ON public.catalog_categories TO service_role;
GRANT SELECT ON public.services TO anon, authenticated;
GRANT ALL ON public.services TO service_role;
GRANT SELECT ON public.instructors TO anon, authenticated;
GRANT ALL ON public.instructors TO service_role;
GRANT SELECT ON public.courses TO anon, authenticated;
GRANT ALL ON public.courses TO service_role;

ALTER TABLE public.catalog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.instructors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "categories_public_read" ON public.catalog_categories FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "services_public_read" ON public.services FOR SELECT TO anon, authenticated USING (published);
CREATE POLICY "instructors_public_read" ON public.instructors FOR SELECT TO anon, authenticated USING (approved);
CREATE POLICY "courses_public_read" ON public.courses FOR SELECT TO anon, authenticated USING (published);

INSERT INTO public.catalog_categories (slug,name,tagline,icon,color,kind,sort_order) VALUES
('web-development','Web Development','From frontend to full stack','Code2','from-blue-500 to-indigo-600','course',1),
('graphic-design','Graphic Design','Branding, logos and visual craft','Palette','from-fuchsia-500 to-purple-600','course',2),
('digital-marketing','Digital Marketing','Ads, funnels and analytics','Megaphone','from-amber-400 to-orange-500','course',3),
('freelancing','Freelancing','Your roadmap to marketplace income','Briefcase','from-emerald-400 to-teal-600','course',4),
('data-ai','Data & AI','Python, analytics and applied AI','BrainCircuit','from-cyan-400 to-sky-600','course',5),
('spoken-english','Spoken English','Confident professional communication','MessageSquareText','from-rose-400 to-red-500','course',6),
('seo','SEO','Audit, rank and grow organic traffic','Search','from-lime-400 to-green-600','course',7),
('wordpress','WordPress','Build and manage real client sites','Layers','from-sky-400 to-blue-600','course',8),
('svc-graphic-design','Graphic Design','Logos, brand systems and print','Palette','','service',1),
('svc-web','Website & Development','Sites, stores and landing pages','Code2','','service',2),
('svc-seo','SEO','Audits, research and ongoing growth','Search','','service',3),
('svc-marketing','Digital Marketing','Paid, social, email and leads','Megaphone','','service',4),
('svc-training','Training & Courses','Cohort training for teams and individuals','GraduationCap','','service',5),
('svc-business','Business Solutions','Automation, CRM and strategy','Building2','','service',6);

WITH raw(slug,name,category_slug,starting_price,turnaround,deliverables,sort_order) AS (VALUES
('logo-design','Logo Design','svc-graphic-design',249,'3-5 days',ARRAY['Three initial concepts','Unlimited revisions on the chosen route','Vector source files','Color and monochrome lockups'],1),
('brand-identity-package','Brand Identity Package','svc-graphic-design',1290,'2-3 weeks',ARRAY['Full logo suite','Color and type system','Brand guidelines PDF','Stationery templates'],2),
('business-card-design','Business Card Design','svc-graphic-design',99,'2 days',ARRAY['Front and back layout','Print-ready CMYK file','Two layout options'],3),
('social-media-post-design','Social Media Post Design','svc-graphic-design',149,'3 days',ARRAY['Ten post templates','Editable source files','Platform-sized exports'],4),
('social-media-banner-design','Social Media Banner Design','svc-graphic-design',89,'2 days',ARRAY['Cover art for four platforms','Editable source file','Retina exports'],5),
('flyer-design','Flyer Design','svc-graphic-design',119,'3 days',ARRAY['Single or double sided','Print-ready export','Two concepts'],6),
('brochure-design','Brochure Design','svc-graphic-design',299,'5 days',ARRAY['Tri-fold or booklet layout','Copy layout support','Print and digital versions'],7),
('poster-design','Poster Design','svc-graphic-design',139,'3 days',ARRAY['Large-format artwork','Print-ready export','Two concepts'],8),
('packaging-design','Packaging Design','svc-graphic-design',690,'1-2 weeks',ARRAY['Dieline setup','Photoreal mockups','Print-ready artwork'],9),
('presentation-design','Presentation and PowerPoint Design','svc-graphic-design',349,'5 days',ARRAY['Up to twenty slides','Reusable master template','Icon and chart library'],10),
('business-website-development','Business Website Development','svc-web',1890,'3-4 weeks',ARRAY['Up to eight pages','CMS handover','Lead capture forms','Analytics setup'],11),
('ecommerce-website-development','E-commerce Website Development','svc-web',3490,'4-6 weeks',ARRAY['Product catalog setup','Checkout and payments','Shipping and tax rules','Staff training'],12),
('landing-page-development','Landing Page Development','svc-web',790,'1-2 weeks',ARRAY['Conversion-focused layout','A/B ready sections','Form and CRM wiring'],13),
('wordpress-website-development','WordPress Website Development','svc-web',1290,'2-3 weeks',ARRAY['Custom or themed build','Curated plugin stack','Editor training'],14),
('website-ui-ux-design','Website UI/UX Design','svc-web',1490,'2-3 weeks',ARRAY['Wireframes','High-fidelity UI','Design system','Developer handoff'],15),
('website-maintenance','Website Maintenance','svc-web',199,'Monthly retainer',ARRAY['Updates and backups','Uptime monitoring','Monthly report','Two hours of edits'],16),
('website-speed-optimization','Website Speed Optimization','svc-web',449,'1 week',ARRAY['Core Web Vitals audit','Asset and caching fixes','Before and after report'],17),
('seo-audit','SEO Audit','svc-seo',349,'5 days',ARRAY['Full technical crawl','Content gap review','Prioritized action list'],18),
('keyword-research','Keyword Research','svc-seo',249,'4 days',ARRAY['Seed and long-tail map','Search intent grouping','Priority scoring'],19),
('on-page-seo','On-Page SEO','svc-seo',499,'1-2 weeks',ARRAY['Title and meta rewrites','Internal linking plan','Structured data markup'],20),
('technical-seo','Technical SEO','svc-seo',690,'2 weeks',ARRAY['Crawl and index fixes','Sitemap and robots hygiene','Speed and structure work'],21),
('local-seo','Local SEO','svc-seo',399,'1-2 weeks',ARRAY['Business profile optimization','Citation cleanup','Review generation strategy'],22),
('monthly-seo-management','Monthly SEO Management','svc-seo',890,'Monthly retainer',ARRAY['Content calendar','Link acquisition','Rank and traffic reporting'],23),
('facebook-instagram-ads','Facebook and Instagram Ads Management','svc-marketing',690,'Monthly retainer',ARRAY['Campaign build','Creative testing','Weekly optimization','ROAS reporting'],24),
('google-ads-management','Google Ads Management','svc-marketing',790,'Monthly retainer',ARRAY['Search and shopping setup','Negative keyword hygiene','Conversion tracking'],25),
('social-media-management','Social Media Management','svc-marketing',590,'Monthly retainer',ARRAY['Sixteen posts per month','Community replies','Monthly analytics'],26),
('content-marketing','Content Marketing','svc-marketing',690,'Monthly retainer',ARRAY['Four long-form articles','Editorial calendar','Distribution plan'],27),
('email-marketing','Email Marketing','svc-marketing',449,'Monthly retainer',ARRAY['Flow and campaign setup','Template design','List hygiene'],28),
('lead-generation','Lead Generation','svc-marketing',890,'Monthly retainer',ARRAY['Ideal customer research','Verified lead lists','Outreach sequences'],29),
('graphic-design-course','Graphic Design Course','svc-training',290,'8 weeks',ARRAY['Live cohort sessions','Portfolio projects','Mentor feedback'],30),
('seo-course','SEO Course','svc-training',290,'6 weeks',ARRAY['Hands-on audits','Live rank tracking','Completion certificate'],31),
('digital-marketing-course','Digital Marketing Course','svc-training',340,'8 weeks',ARRAY['Ads lab with real budget','Analytics deep dive','Career support'],32),
('wordpress-course','WordPress Course','svc-training',240,'6 weeks',ARRAY['Client-ready builds','Speed and security','Freelance playbook'],33),
('freelancing-course','Freelancing Course','svc-training',190,'5 weeks',ARRAY['Profile teardown','Proposal system','Client handling drills'],34),
('ai-tools-training','AI Tools Training','svc-training',210,'4 weeks',ARRAY['Prompt frameworks','Workflow automation','Team rollout guide'],35),
('digital-marketing-consultation','Digital Marketing Consultation','svc-business',180,'90-minute session',ARRAY['Channel audit','Budget allocation plan','Recorded session'],36),
('business-automation-setup','Business Automation Setup','svc-business',990,'2-3 weeks',ARRAY['Process mapping','Tool integration','Team documentation'],37),
('crm-setup-consultation','CRM Setup and Consultation','svc-business',790,'2 weeks',ARRAY['Pipeline design','Data migration','Automation rules'],38),
('virtual-assistant-services','Virtual Assistant Services','svc-business',640,'Monthly retainer',ARRAY['Forty hours per month','Inbox and calendar management','Research and reporting'],39),
('digital-strategy-consultation','Website and Digital Strategy Consultation','svc-business',450,'1 week',ARRAY['Discovery workshop','Roadmap document','Vendor recommendations'],40)
)
INSERT INTO public.services (slug,name,category_slug,tagline,description,starting_price,turnaround,deliverables,sort_order)
SELECT slug, name, category_slug, deliverables[1],
  name || ' delivered by the ElevateHub studio team. Every engagement is fixed-scope with a senior review before delivery, a written handover, and thirty days of follow-up support so your team can run with it.',
  starting_price, turnaround, deliverables, sort_order
FROM raw;

INSERT INTO public.instructors (slug,name,title,bio,experience,students,courses_count,rating,skills,sort_order) VALUES
('james-carter','James Carter','Senior Full Stack Engineer','Nine years across product startups in New York and Berlin. Has coached more than eight thousand developers into their first engineering role.','9 years',8420,4,4.9,ARRAY['React','Node.js','TypeScript','PostgreSQL'],1),
('elena-novak','Elena Novak','Brand Designer','Art director at a boutique identity studio. Teaches design thinking, brand systems and the craft of a defensible visual language.','7 years',5310,3,4.8,ARRAY['Figma','Illustrator','Branding','Motion'],2),
('marcus-lee','Marcus Lee','Performance Marketer','Has run paid acquisition for more than one hundred and twenty brands. Specialist in ROAS modelling and creative testing.','6 years',6120,3,4.7,ARRAY['Meta Ads','Google Ads','SEO','Analytics'],3),
('sophia-bennett','Sophia Bennett','Top-Rated Freelancer','Top Rated Plus on Upwork for five straight years. Helps beginners land and keep their first serious client.','8 years',4980,3,4.9,ARRAY['Upwork','Fiverr','Client Handling','Proposals'],4),
('david-kim','David Kim','Data Scientist','Builds forecasting models in telecom and fintech. Teaches Python and applied machine learning from the ground up.','5 years',3240,3,4.8,ARRAY['Python','Pandas','Machine Learning','SQL'],5),
('olivia-turner','Olivia Turner','Communication Coach','IELTS 8.5 and a decade of corporate training. Focuses on the spoken English that actually gets people promoted.','10 years',7110,2,4.9,ARRAY['IELTS','Public Speaking','Grammar','Interviews'],6),
('noah-fitzgerald','Noah Fitzgerald','Technical SEO Lead','Has recovered traffic for publishers after four core updates. Obsessed with crawl budget and information architecture.','8 years',3890,3,4.8,ARRAY['Technical SEO','Log Analysis','Schema','Content Strategy'],7),
('amara-osei','Amara Osei','WordPress Architect','Ships client sites that stay fast two years later. Teaches maintainable builds instead of plugin sprawl.','7 years',4110,2,4.7,ARRAY['WordPress','PHP','Performance','Security'],8),
('lucas-moreau','Lucas Moreau','Product Designer','Ex-agency, now in-house on a design system used by millions. Teaches research through to developer handoff.','6 years',2760,2,4.8,ARRAY['UX Research','Design Systems','Prototyping','Accessibility'],9),
('priya-raman','Priya Raman','Automation Consultant','Builds the back office that lets small teams behave like large ones. CRM, workflow and reporting.','9 years',1980,2,4.9,ARRAY['CRM','Automation','Ops','No-code'],10);

WITH raw(slug,title,subtitle,category_slug,level,price,old_price,duration_hours,lessons_count,rating,reviews_count,students,instructor_slug,badge,image_key,next_batch,sort_order) AS (VALUES
('full-stack-web-development','Full Stack Web Development','From HTML to React and Node.js, built for the job market','web-development','beginner',79,149,96,184,4.9,1284,4210,'james-carter','Bestseller','web-development','2026-09-10',1),
('frontend-react-professional','Frontend React Professional','Component architecture, state and performance in real apps','web-development','intermediate',89,159,72,140,4.8,742,2310,'james-carter',NULL,'web-development','2026-09-18',2),
('typescript-for-teams','TypeScript for Teams','Types that prevent bugs instead of fighting you','web-development','advanced',95,NULL,48,96,4.8,318,1120,'james-carter',NULL,'web-development','2026-09-22',3),
('landing-pages-that-convert','Landing Pages That Convert','Build and ship high-converting pages in a week','web-development','beginner',49,89,28,64,4.7,266,1740,'lucas-moreau',NULL,'web-development','2026-09-12',4),
('graphic-design-mastery','Graphic Design Mastery','Figma, Illustrator and brand identity end to end','graphic-design','beginner',59,99,64,128,4.8,902,3120,'elena-novak','Popular','graphic-design','2026-09-15',5),
('brand-identity-systems','Brand Identity Systems','Design a brand that survives contact with the market','graphic-design','intermediate',89,139,52,104,4.8,412,1580,'elena-novak',NULL,'graphic-design','2026-09-19',6),
('print-and-packaging-design','Print and Packaging Design','Dielines, prepress and shelf-ready artwork','graphic-design','intermediate',69,109,40,88,4.7,224,940,'elena-novak',NULL,'graphic-design','2026-09-24',7),
('ui-ux-design-sprint','UI/UX Design Sprint','From product thinking to a high-fidelity prototype','graphic-design','advanced',85,NULL,58,110,4.8,322,1240,'lucas-moreau',NULL,'ui-ux','2026-09-25',8),
('presentation-design-craft','Presentation Design Craft','Slides that win the room and the budget','graphic-design','beginner',39,69,20,48,4.6,181,860,'elena-novak',NULL,'graphic-design','2026-09-07',9),
('digital-marketing-pro','Digital Marketing Pro','Paid social, search and the analytics behind them','digital-marketing','intermediate',69,119,72,140,4.7,764,2890,'marcus-lee',NULL,'digital-marketing','2026-09-05',10),
('meta-ads-performance-lab','Meta Ads Performance Lab','Creative testing and scaling with real budgets','digital-marketing','advanced',99,169,44,92,4.8,398,1420,'marcus-lee','Trending','digital-marketing','2026-09-16',11),
('google-ads-mastery','Google Ads Mastery','Search, shopping and performance max without waste','digital-marketing','intermediate',89,149,46,98,4.7,341,1290,'marcus-lee',NULL,'digital-marketing','2026-09-21',12),
('email-marketing-engine','Email Marketing Engine','Lifecycle flows that print revenue while you sleep','digital-marketing','beginner',45,79,26,58,4.7,212,1080,'marcus-lee',NULL,'digital-marketing','2026-09-09',13),
('freelancing-roadmap','Freelancing Roadmap','From your first order to a top-rated profile','freelancing','beginner',45,79,40,82,4.9,611,3560,'sophia-bennett','New Batch','freelancing','2026-09-01',14),
('client-communication-mastery','Client Communication Mastery','Scope, pricing and the hard conversations','freelancing','intermediate',55,89,24,54,4.8,244,1320,'sophia-bennett',NULL,'freelancing','2026-09-13',15),
('agency-of-one','Agency of One','Systemize your freelance business into a real company','freelancing','advanced',75,119,32,70,4.8,168,760,'priya-raman',NULL,'freelancing','2026-09-27',16),
('python-data-analysis','Python Data Analysis','From zero to a data-driven career','data-ai','intermediate',75,129,80,150,4.8,428,1780,'david-kim',NULL,'data-ai','2026-09-20',17),
('machine-learning-foundations','Machine Learning Foundations','Models you can explain to a stakeholder','data-ai','advanced',109,179,66,124,4.8,236,880,'david-kim',NULL,'data-ai','2026-09-29',18),
('ai-tools-for-work','AI Tools for Work','Ten times the output without ten times the hours','data-ai','beginner',25,45,24,54,4.7,289,2110,'david-kim','Trending','ai','2026-09-03',19),
('spoken-english-confidence','Spoken English Confidence','Speak with authority in ninety days','spoken-english','beginner',39,65,48,96,4.9,1130,5240,'olivia-turner','Top Rated','spoken-english','2026-09-08',20),
('interview-english-intensive','Interview English Intensive','Answer hard questions under pressure','spoken-english','intermediate',49,79,22,52,4.8,318,1460,'olivia-turner',NULL,'spoken-english','2026-09-11',21),
('seo-fundamentals','SEO Fundamentals','Audit, research and on-page work that ranks','seo','beginner',59,99,38,84,4.8,352,1690,'noah-fitzgerald',NULL,'digital-marketing','2026-09-06',22),
('technical-seo-deep-dive','Technical SEO Deep Dive','Crawl budget, rendering and site architecture','seo','advanced',99,159,42,88,4.9,198,720,'noah-fitzgerald',NULL,'digital-marketing','2026-09-23',23),
('wordpress-freelance-builds','WordPress Freelance Builds','Client sites that stay fast and easy to maintain','wordpress','beginner',55,95,44,96,4.7,274,1510,'amara-osei',NULL,'web-development','2026-09-14',24)
)
INSERT INTO public.courses (slug,title,subtitle,category_slug,level,language,price,old_price,duration_hours,lessons_count,rating,reviews_count,students,instructor_slug,badge,image_key,description,outcomes,requirements,modules,next_batch,sort_order)
SELECT slug,title,subtitle,category_slug,level,'english',price,old_price,duration_hours,lessons_count,rating,reviews_count,students,instructor_slug,badge,image_key,
  title || ' is a mentor-led program built around real deliverables. You work through graded projects, get written feedback on every submission, and finish with portfolio pieces you can show a client or a hiring manager.',
  ARRAY['Ship ' || lower(title) || ' work you can put in a portfolio','Follow a professional workflow from brief to delivery','Get written mentor feedback on every project','Prepare for interviews and client conversations'],
  ARRAY['A laptop and a stable internet connection','Around five focused hours per week'],
  jsonb_build_array(
    jsonb_build_object('title','Foundations','lessons',jsonb_build_array(
      jsonb_build_object('title','How this field actually works','duration','14:20','free',true),
      jsonb_build_object('title','Tooling and workspace setup','duration','21:05'),
      jsonb_build_object('title','Your first guided exercise','duration','28:40'))),
    jsonb_build_object('title','Core Practice','lessons',jsonb_build_array(
      jsonb_build_object('title','The working method, step by step','duration','32:10'),
      jsonb_build_object('title','Common mistakes and how to avoid them','duration','26:55'),
      jsonb_build_object('title','Guided build session','duration','41:30'))),
    jsonb_build_object('title','Applied Project','lessons',jsonb_build_array(
      jsonb_build_object('title','Reading a real brief','duration','19:45'),
      jsonb_build_object('title','Building the deliverable','duration','44:00'),
      jsonb_build_object('title','Review and iteration','duration','30:15'))),
    jsonb_build_object('title','Career and Delivery','lessons',jsonb_build_array(
      jsonb_build_object('title','Packaging your portfolio','duration','22:30'),
      jsonb_build_object('title','Pricing and positioning','duration','25:10'),
      jsonb_build_object('title','Interview and client roleplay','duration','33:05')))),
  next_batch, sort_order
FROM raw;