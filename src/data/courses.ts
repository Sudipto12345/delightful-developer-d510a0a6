export type Level = "beginner" | "intermediate" | "advanced";

export type Lesson = {
  title: string;
  duration: string;
  free?: boolean;
};

export type Module = {
  title: string;
  lessons: Lesson[];
};

export type Course = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string; // category slug
  level: Level;
  language: "english" | "bilingual";
  price: number;
  oldPrice?: number;
  durationHours: number;
  lessonsCount: number;
  rating: number;
  reviewsCount: number;
  students: number;
  instructorId: string;
  badge?: string;
  published: boolean;
  outcomes: string[];
  requirements: string[];
  description: string;
  modules: Module[];
  nextBatch: string;
};

export type Category = {
  slug: string;
  name: string;
  tagline: string;
  icon: string;
  color: string;
};

export type Instructor = {
  id: string;
  slug: string;
  name: string;
  title: string;
  bio: string;
  experience: string;
  students: number;
  courses: number;
  rating: number;
  skills: string[];
  approved: boolean;
};

export const categories: Category[] = [
  {
    slug: "web-development",
    name: "Web Development",
    tagline: "From frontend to full stack",
    icon: "Code2",
    color: "from-blue-500 to-indigo-600",
  },
  {
    slug: "graphic-design",
    name: "Graphic Design",
    tagline: "Branding, logos, and visual art",
    icon: "Palette",
    color: "from-fuchsia-500 to-purple-600",
  },
  {
    slug: "digital-marketing",
    name: "Digital Marketing",
    tagline: "Facebook, Google, and SEO marketing",
    icon: "Megaphone",
    color: "from-amber-400 to-orange-500",
  },
  {
    slug: "freelancing",
    name: "Freelancing",
    tagline: "Your roadmap to marketplace income",
    icon: "Briefcase",
    color: "from-emerald-400 to-teal-600",
  },
  {
    slug: "data-ai",
    name: "Data & AI",
    tagline: "Python, data analysis, and AI",
    icon: "BrainCircuit",
    color: "from-cyan-400 to-sky-600",
  },
  {
    slug: "spoken-english",
    name: "Spoken English",
    tagline: "Confident communication",
    icon: "MessageSquareText",
    color: "from-rose-400 to-red-500",
  },
];

export const instructors: Instructor[] = [
  {
    id: "ins-1",
    slug: "tanvir-ahmed",
    name: "James Carter",
    title: "Senior Full Stack Engineer",
    bio: "9 years working across startups worldwide. Has helped over 8,000 students become skilled web developers.",
    experience: "9 years",
    students: 8420,
    courses: 4,
    rating: 4.9,
    skills: ["React", "Node.js", "TypeScript", "PostgreSQL"],
    approved: true,
  },
  {
    id: "ins-2",
    slug: "nusrat-jahan",
    name: "Elena Novak",
    title: "Brand Designer",
    bio: "Works as an art director at a leading agency. Teaches design thinking and brand identity.",
    experience: "7 years",
    students: 5310,
    courses: 3,
    rating: 4.8,
    skills: ["Figma", "Illustrator", "Branding", "Motion"],
    approved: true,
  },
  {
    id: "ins-3",
    slug: "mahfuz-rahman",
    name: "Marcus Lee",
    title: "Performance Marketer",
    bio: "Has run Facebook and Google Ads for 120+ brands. A specialist in ROAS optimization.",
    experience: "6 years",
    students: 6120,
    courses: 3,
    rating: 4.7,
    skills: ["Meta Ads", "Google Ads", "SEO", "Analytics"],
    approved: true,
  },
  {
    id: "ins-4",
    slug: "sadia-islam",
    name: "Sophia Bennett",
    title: "Top-Rated Freelancer",
    bio: "Holds a Top Rated Plus profile on Upwork. Helps beginners land their first marketplace job.",
    experience: "8 years",
    students: 4980,
    courses: 2,
    rating: 4.9,
    skills: ["Upwork", "Fiverr", "Client Handling", "Proposal"],
    approved: true,
  },
  {
    id: "ins-5",
    slug: "rifat-hossain",
    name: "David Kim",
    title: "Data Scientist",
    bio: "Builds data models across telecom and fintech industries. Teaches Python and machine learning from scratch.",
    experience: "5 years",
    students: 3240,
    courses: 2,
    rating: 4.8,
    skills: ["Python", "Pandas", "ML", "SQL"],
    approved: true,
  },
  {
    id: "ins-6",
    slug: "farhana-akter",
    name: "Olivia Turner",
    title: "English Communication Coach",
    bio: "Holds an IELTS score of 8.5. 10 years of experience in corporate training and spoken English.",
    experience: "10 years",
    students: 7110,
    courses: 2,
    rating: 4.9,
    skills: ["IELTS", "Public Speaking", "Grammar", "Interview"],
    approved: true,
  },
];

const mod = (title: string, lessons: [string, string][], freeFirst = false): Module => ({
  title,
  lessons: lessons.map(([t, d], i) => ({ title: t, duration: d, free: freeFirst && i === 0 })),
});

export const courses: Course[] = [
  {
    id: "c-1",
    slug: "full-stack-web-development",
    title: "Full Stack Web Development",
    subtitle: "From HTML to React + Node.js — a complete, job-ready course",
    category: "web-development",
    level: "beginner",
    language: "english",
    price: 79,
    oldPrice: 149,
    durationHours: 96,
    lessonsCount: 184,
    rating: 4.9,
    reviewsCount: 1284,
    students: 4210,
    instructorId: "ins-1",
    badge: "Bestseller",
    published: true,
    outcomes: [
      "Build 6 real projects with your own hands",
      "Learn to build full stack apps with React and Node.js",
      "Practice Git, GitHub, and deployment",
      "Job interview preparation and portfolio review",
    ],
    requirements: ["A laptop and internet connection", "Basic reading skills in English"],
    description:
      "Learn full stack web development hands-on. Every module includes live projects, assignments, and mentor support.",
    modules: [
      mod(
        "Foundations",
        [
          ["How the web works", "12:30"],
          ["HTML semantic tags", "24:10"],
          ["CSS layout and flexbox", "38:00"],
        ],
        true,
      ),
      mod("JavaScript Mastery", [
        ["Variables and functions", "32:00"],
        ["DOM manipulation", "41:15"],
        ["Async and API calls", "36:40"],
      ]),
      mod("React", [
        ["Components and props", "28:00"],
        ["State and hooks", "45:20"],
        ["Routing and forms", "39:50"],
      ]),
      mod("Backend and Deployment", [
        ["Node.js and Express", "44:00"],
        ["Database design", "33:30"],
        ["Production deployment", "26:00"],
      ]),
    ],
    nextBatch: "2026-09-10",
  },
  {
    id: "c-2",
    slug: "graphic-design-mastery",
    title: "Graphic Design Mastery",
    subtitle: "Figma, Illustrator, and brand identity",
    category: "graphic-design",
    level: "beginner",
    language: "english",
    price: 59,
    oldPrice: 99,
    durationHours: 64,
    lessonsCount: 128,
    rating: 4.8,
    reviewsCount: 902,
    students: 3120,
    instructorId: "ins-2",
    badge: "Popular",
    published: true,
    outcomes: [
      "Create professional logos and brand guides",
      "Design social media creatives",
      "Client presentation skills",
    ],
    requirements: ["Any computer", "Interest in design"],
    description:
      "From design fundamentals to client project delivery — all with practical assignments.",
    modules: [
      mod(
        "Design Foundations",
        [
          ["Color theory", "18:00"],
          ["Typography", "22:30"],
        ],
        true,
      ),
      mod("Figma Practice", [
        ["Interface and components", "30:00"],
        ["Auto layout", "26:10"],
      ]),
      mod("Branding Project", [
        ["Logo design process", "34:00"],
        ["Brand guidelines", "29:45"],
      ]),
    ],
    nextBatch: "2026-09-15",
  },
  {
    id: "c-3",
    slug: "digital-marketing-pro",
    title: "Digital Marketing Pro",
    subtitle: "Facebook Ads, Google Ads, and SEO",
    category: "digital-marketing",
    level: "intermediate",
    language: "bilingual",
    price: 69,
    oldPrice: 119,
    durationHours: 72,
    lessonsCount: 140,
    rating: 4.7,
    reviewsCount: 764,
    students: 2890,
    instructorId: "ins-3",
    published: true,
    outcomes: ["Run profitable ad campaigns", "Grow organic traffic with SEO", "Client reporting"],
    requirements: ["A Facebook account", "Basic computer knowledge"],
    description: "A complete marketing course for e-commerce and local businesses, with real campaign case studies.",
    modules: [
      mod(
        "Marketing Basics",
        [
          ["Funnels and audience", "20:00"],
          ["Content strategy", "25:00"],
        ],
        true,
      ),
      mod("Paid Ads", [
        ["Meta Ads Manager", "42:00"],
        ["Google Search Ads", "38:00"],
      ]),
      mod("SEO", [
        ["Keyword research", "31:00"],
        ["On-page and technical", "35:00"],
      ]),
    ],
    nextBatch: "2026-09-05",
  },
  {
    id: "c-4",
    slug: "freelancing-roadmap",
    title: "Freelancing Roadmap",
    subtitle: "From your first order to a top-rated profile",
    category: "freelancing",
    level: "beginner",
    language: "english",
    price: 45,
    oldPrice: 79,
    durationHours: 40,
    lessonsCount: 82,
    rating: 4.9,
    reviewsCount: 611,
    students: 3560,
    instructorId: "ins-4",
    badge: "New Batch",
    published: true,
    outcomes: ["Optimize your Upwork and Fiverr profile", "Write winning proposals", "Payment and client management"],
    requirements: ["Any one skill", "Patience and consistent time"],
    description: "Real strategies for surviving on marketplaces, with live profile reviews via screen share.",
    modules: [
      mod(
        "Getting Started",
        [
          ["Choosing a skill", "16:00"],
          ["Building a portfolio", "24:00"],
        ],
        true,
      ),
      mod("Marketplaces", [
        ["Upwork profile", "28:00"],
        ["Proposal formula", "32:00"],
      ]),
    ],
    nextBatch: "2026-09-01",
  },
  {
    id: "c-5",
    slug: "python-data-analysis",
    title: "Python Data Analysis",
    subtitle: "From zero to a data-driven career",
    category: "data-ai",
    level: "intermediate",
    language: "bilingual",
    price: 75,
    oldPrice: 129,
    durationHours: 80,
    lessonsCount: 150,
    rating: 4.8,
    reviewsCount: 428,
    students: 1780,
    instructorId: "ins-5",
    published: true,
    outcomes: ["Process data with Pandas and NumPy", "Data visualization", "Real dataset projects"],
    requirements: ["Basic understanding of math"],
    description: "In-demand data skills for the job market — with practical notebooks and case studies.",
    modules: [
      mod(
        "Python Basics",
        [
          ["Syntax and data types", "22:00"],
          ["Functions and modules", "26:00"],
        ],
        true,
      ),
      mod("Data Tools", [
        ["Pandas DataFrames", "38:00"],
        ["Visualization", "30:00"],
      ]),
    ],
    nextBatch: "2026-09-20",
  },
  {
    id: "c-6",
    slug: "spoken-english-confidence",
    title: "Spoken English Confidence",
    subtitle: "Speak English confidently in 90 days",
    category: "spoken-english",
    level: "beginner",
    language: "english",
    price: 39,
    oldPrice: 65,
    durationHours: 48,
    lessonsCount: 96,
    rating: 4.9,
    reviewsCount: 1130,
    students: 5240,
    instructorId: "ins-6",
    badge: "Top Rated",
    published: true,
    outcomes: ["Fluency in everyday conversation", "Interview English", "Presentation skills"],
    requirements: ["30 minutes of practice daily"],
    description: "Build the habit of speaking English through live speaking clubs and daily practice tasks.",
    modules: [
      mod(
        "Foundations",
        [
          ["Pronunciation and vocabulary", "19:00"],
          ["Basic grammar", "23:00"],
        ],
        true,
      ),
      mod("Conversation", [
        ["Daily situations", "27:00"],
        ["Interview practice", "31:00"],
      ]),
    ],
    nextBatch: "2026-09-08",
  },
  {
    id: "c-7",
    slug: "ui-ux-design-sprint",
    title: "UI/UX Design Sprint",
    subtitle: "From product thinking to high-fidelity prototype",
    category: "graphic-design",
    level: "advanced",
    language: "bilingual",
    price: 85,
    durationHours: 58,
    lessonsCount: 110,
    rating: 4.8,
    reviewsCount: 322,
    students: 1240,
    instructorId: "ins-2",
    published: true,
    outcomes: ["User research", "Building a design system", "Portfolio case study"],
    requirements: ["Basic familiarity with Figma"],
    description: "An industry-standard process for starting a career as a product designer.",
    modules: [
      mod(
        "Research",
        [
          ["User interviews", "21:00"],
          ["Journey mapping", "24:00"],
        ],
        true,
      ),
      mod("Design", [
        ["Wireframing", "29:00"],
        ["Design system", "34:00"],
      ]),
    ],
    nextBatch: "2026-09-25",
  },
  {
    id: "c-8",
    slug: "ai-tools-for-work",
    title: "AI Tools for Work",
    subtitle: "Boost your productivity 10x with AI",
    category: "data-ai",
    level: "beginner",
    language: "english",
    price: 25,
    oldPrice: 45,
    durationHours: 24,
    lessonsCount: 54,
    rating: 4.7,
    reviewsCount: 289,
    students: 2110,
    instructorId: "ins-5",
    badge: "Trending",
    published: true,
    outcomes: ["Prompt writing", "Content and design automation", "Freelance services powered by AI"],
    requirements: ["A smartphone or computer"],
    description: "A practical course on using AI to boost productivity at work, in study, and in freelancing.",
    modules: [
      mod(
        "AI Basics",
        [
          ["How AI works", "14:00"],
          ["Prompt frameworks", "20:00"],
        ],
        true,
      ),
      mod("Practical", [
        ["Content automation", "25:00"],
        ["Design and video", "22:00"],
      ]),
    ],
    nextBatch: "2026-09-03",
  },
];

export const getCourse = (slug: string) => courses.find((c) => c.slug === slug);
export const getInstructor = (id: string) => instructors.find((i) => i.id === id);
export const getInstructorBySlug = (slug: string) => instructors.find((i) => i.slug === slug);
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
