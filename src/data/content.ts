export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  body: string[];
};

export const posts: BlogPost[] = [
  {
    slug: "freelancing-shuru-korar-guide",
    title: "The Complete Guide to Starting Freelancing in 2026",
    excerpt: "Which skill to choose, how long it takes, and how to land your first order — a step-by-step guide from real experience.",
    category: "Freelancing",
    author: "Sophia Bennett",
    date: "August 2, 2026",
    readTime: "8 min",
    body: [
      "Freelancing is not a shortcut — it's a skill-based career. The first step is choosing a skill you can commit to for at least two hours a day.",
      "The second step is your portfolio. Clients don't want your certificates, they want to see samples of your work. Build three demo projects that solve real problems.",
      "The third step is the proposal. Write a specific solution to the client's problem in every proposal, not your own story. Don't be discouraged if your first 10 proposals get no response.",
    ],
  },
  {
    slug: "web-development-roadmap-bangla",
    title: "The Web Development Roadmap: Step by Step",
    excerpt: "The right order to learn everything from HTML to full stack, and where not to waste your time.",
    category: "Web Development",
    author: "James Carter",
    date: "July 28, 2026",
    readTime: "10 min",
    body: [
      "Don't try to learn a framework right away. Once your foundation in HTML, CSS, and JavaScript is solid, learning React becomes much easier.",
      "Build a small project after every topic you learn. Nobody becomes a developer by watching videos alone — you become one by writing code.",
      "Plan a realistic six-month timeline: 2 months on foundations, 2 months on React, 2 months on backend and projects.",
    ],
  },
  {
    slug: "facebook-ads-budget-bangladesh",
    title: "Facebook Ads on a Small Budget: Strategies for Small Businesses",
    excerpt: "How to run a profitable campaign even with a small daily budget.",
    category: "Digital Marketing",
    author: "Marcus Lee",
    date: "July 20, 2026",
    readTime: "7 min",
    body: [
      "The biggest mistake on a small budget is running too many ad sets at once. When the budget is split, Facebook never gets the chance to learn.",
      "Start with one campaign, one audience, and two creatives. Review the data after three days before making a decision.",
      "If your landing page isn't fast, mobile users will leave. Page speed matters more than the ad itself.",
    ],
  },
  {
    slug: "spoken-english-daily-practice",
    title: "A 30-Minute Daily Routine to Improve Your Spoken English",
    excerpt: "Simple and proven practice methods to overcome hesitation.",
    category: "Spoken English",
    author: "Olivia Turner",
    date: "July 12, 2026",
    readTime: "6 min",
    body: [
      "The biggest barrier to learning English is fear of making mistakes. Remember, nobody learns without making mistakes.",
      "Ten minutes of listening, ten minutes of speaking, and ten minutes of learning new words every day — keep this routine for 90 days.",
      "Record yourself speaking and listen back. It's the fastest way to improve.",
    ],
  },
  {
    slug: "ai-tools-productivity-bangla",
    title: "Boost Your Study and Work Speed with AI Tools",
    excerpt: "A list of essential AI tools for students and professionals.",
    category: "Data & AI",
    author: "David Kim",
    date: "July 5, 2026",
    readTime: "5 min",
    body: [
      "AI won't take your job, but people who use AI will get ahead of those who don't.",
      "Note summaries, research, code review, and design ideas — you can save time in every one of these areas.",
      "Always verify the output, though. AI can confidently state things that are wrong.",
    ],
  },
  {
    slug: "portfolio-je-vabe-banaben",
    title: "The Kind of Portfolio That Gets Clients to Message You",
    excerpt: "What to include in your portfolio and what to leave out — through a designer's eyes.",
    category: "Graphic Design",
    author: "Elena Novak",
    date: "June 29, 2026",
    readTime: "6 min",
    body: [
      "Three excellent case studies are far more effective than twenty average pieces of work.",
      "Include three parts in every project: the problem, the process, and the result.",
      "Always check how your portfolio looks on mobile, since most clients view it there first.",
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export const testimonials = [
  {
    name: "Ryan Hastings",
    role: "Junior Web Developer, London",
    text: "Six months ago I knew nothing. With ElevateHub's courses and mentor support, I'm now working at a software company.",
    result: "Landed a job: $2,800/mo",
  },
  {
    name: "Samantha Reed",
    role: "Freelance Designer, Manchester",
    text: "I learned design from home. Now I earn an average of $600 a month. The clear teaching style made it easy to understand.",
    result: "Monthly income: $600+",
  },
  {
    name: "Michael Owusu",
    role: "E-commerce Entrepreneur, Toronto",
    text: "After taking the marketing course, my store's sales tripled. The practical case studies were incredibly useful.",
    result: "3x sales growth",
  },
  {
    name: "Tania Sultana",
    role: "University Student, Singapore",
    text: "Speaking in the live speaking club during the spoken English course helped me overcome my hesitation. Now I present with confidence.",
    result: "IELTS 7.0",
  },
];

export const faqs = [
  {
    q: "Are the courses fully in English?",
    a: "Yes, all courses are delivered fully in English. Some technical courses mix in industry terminology to make it easier to grasp key concepts.",
  },
  {
    q: "How do I make a payment?",
    a: "Pay via Bank Transfer, PayPal, Wise, or Stripe Invoice and submit your transaction ID. Our team verifies it and activates your course within 2 hours.",
  },
  {
    q: "Can I take courses on my mobile?",
    a: "Absolutely. Our entire platform is designed mobile-first, and videos play smoothly even on lower bandwidth.",
  },
  {
    q: "Will I get a certificate after finishing a course?",
    a: "A verifiable digital certificate is issued once you complete the final project and quiz of each course.",
  },
  {
    q: "How do I get mentor support?",
    a: "Each batch has its own support group and two live Q&A sessions per week.",
  },
  {
    q: "How long will I have access after enrolling in a course?",
    a: "Lifetime access. You'll also get future course updates for free.",
  },
];

export const stats = [
  { value: 42000, suffix: "+", label: "Students" },
  { value: 68, suffix: "+", label: "Courses" },
  { value: 95, suffix: "%", label: "Satisfaction Rate" },
  { value: 1200, suffix: "+", label: "Successful Careers" },
];

export const events = [
  {
    title: "Free Webinar: Freelancing in 2026",
    date: "September 12, 2026",
    time: "9:00 PM",
    mode: "Online (Zoom)",
    seats: 500,
  },
  {
    title: "Career Bootcamp — London",
    date: "September 20, 2026",
    time: "10:00 AM",
    mode: "In person, Central London",
    seats: 120,
  },
  {
    title: "Design Portfolio Review Day",
    date: "September 28, 2026",
    time: "4:00 PM",
    mode: "Online",
    seats: 200,
  },
];
