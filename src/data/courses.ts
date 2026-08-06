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
  language: "bangla" | "banglish";
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
    name: "ওয়েব ডেভেলপমেন্ট",
    tagline: "ফ্রন্টএন্ড থেকে ফুলস্ট্যাক পর্যন্ত",
    icon: "Code2",
    color: "from-blue-500 to-indigo-600",
  },
  {
    slug: "graphic-design",
    name: "গ্রাফিক ডিজাইন",
    tagline: "ব্র্যান্ডিং, লোগো ও ভিজ্যুয়াল আর্ট",
    icon: "Palette",
    color: "from-fuchsia-500 to-purple-600",
  },
  {
    slug: "digital-marketing",
    name: "ডিজিটাল মার্কেটিং",
    tagline: "ফেসবুক, গুগল ও এসইও মার্কেটিং",
    icon: "Megaphone",
    color: "from-amber-400 to-orange-500",
  },
  {
    slug: "freelancing",
    name: "ফ্রিল্যান্সিং",
    tagline: "মার্কেটপ্লেসে আয়ের রোডম্যাপ",
    icon: "Briefcase",
    color: "from-emerald-400 to-teal-600",
  },
  {
    slug: "data-ai",
    name: "ডেটা ও এআই",
    tagline: "পাইথন, ডেটা অ্যানালাইসিস ও এআই",
    icon: "BrainCircuit",
    color: "from-cyan-400 to-sky-600",
  },
  {
    slug: "spoken-english",
    name: "স্পোকেন ইংলিশ",
    tagline: "আত্মবিশ্বাসী কমিউনিকেশন",
    icon: "MessageSquareText",
    color: "from-rose-400 to-red-500",
  },
];

export const instructors: Instructor[] = [
  {
    id: "ins-1",
    slug: "tanvir-ahmed",
    name: "তানভীর আহমেদ",
    title: "সিনিয়র ফুলস্ট্যাক ইঞ্জিনিয়ার",
    bio: "৯ বছর ধরে দেশি-বিদেশি স্টার্টআপে কাজ করছেন। ৮ হাজারের বেশি শিক্ষার্থীকে ওয়েব ডেভেলপমেন্টে দক্ষ করে তুলেছেন।",
    experience: "৯ বছর",
    students: 8420,
    courses: 4,
    rating: 4.9,
    skills: ["React", "Node.js", "TypeScript", "PostgreSQL"],
    approved: true,
  },
  {
    id: "ins-2",
    slug: "nusrat-jahan",
    name: "নুসরাত জাহান",
    title: "ব্র্যান্ড ডিজাইনার",
    bio: "দেশের শীর্ষ এজেন্সিতে আর্ট ডিরেক্টর হিসেবে কাজ করছেন। ডিজাইন থিংকিং ও ব্র্যান্ড আইডেন্টিটি নিয়ে পড়ান।",
    experience: "৭ বছর",
    students: 5310,
    courses: 3,
    rating: 4.8,
    skills: ["Figma", "Illustrator", "Branding", "Motion"],
    approved: true,
  },
  {
    id: "ins-3",
    slug: "mahfuz-rahman",
    name: "মাহফুজ রহমান",
    title: "পারফরম্যান্স মার্কেটার",
    bio: "১২০+ ব্র্যান্ডের জন্য ফেসবুক ও গুগল অ্যাডস চালিয়েছেন। ROAS অপ্টিমাইজেশনে বিশেষজ্ঞ।",
    experience: "৬ বছর",
    students: 6120,
    courses: 3,
    rating: 4.7,
    skills: ["Meta Ads", "Google Ads", "SEO", "Analytics"],
    approved: true,
  },
  {
    id: "ins-4",
    slug: "sadia-islam",
    name: "সাদিয়া ইসলাম",
    title: "টপ রেটেড ফ্রিল্যান্সার",
    bio: "Upwork-এ টপ রেটেড প্লাস প্রোফাইল। নতুনদের মার্কেটপ্লেসে প্রথম কাজ পেতে সাহায্য করেন।",
    experience: "৮ বছর",
    students: 4980,
    courses: 2,
    rating: 4.9,
    skills: ["Upwork", "Fiverr", "Client Handling", "Proposal"],
    approved: true,
  },
  {
    id: "ins-5",
    slug: "rifat-hossain",
    name: "রিফাত হোসেন",
    title: "ডেটা সায়েন্টিস্ট",
    bio: "টেলিকম ও ফিনটেক ইন্ডাস্ট্রিতে ডেটা মডেল তৈরি করেন। পাইথন ও মেশিন লার্নিং শেখান একদম শূন্য থেকে।",
    experience: "৫ বছর",
    students: 3240,
    courses: 2,
    rating: 4.8,
    skills: ["Python", "Pandas", "ML", "SQL"],
    approved: true,
  },
  {
    id: "ins-6",
    slug: "farhana-akter",
    name: "ফারহানা আক্তার",
    title: "ইংলিশ কমিউনিকেশন কোচ",
    bio: "IELTS 8.5 স্কোরধারী। কর্পোরেট ট্রেনিং ও স্পোকেন ইংলিশে ১০ বছরের অভিজ্ঞতা।",
    experience: "১০ বছর",
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
    title: "ফুলস্ট্যাক ওয়েব ডেভেলপমেন্ট",
    subtitle: "HTML থেকে React + Node.js — চাকরির উপযোগী পূর্ণাঙ্গ কোর্স",
    category: "web-development",
    level: "beginner",
    language: "bangla",
    price: 6500,
    oldPrice: 12000,
    durationHours: 96,
    lessonsCount: 184,
    rating: 4.9,
    reviewsCount: 1284,
    students: 4210,
    instructorId: "ins-1",
    badge: "বেস্টসেলার",
    published: true,
    outcomes: [
      "নিজের হাতে ৬টি রিয়েল প্রজেক্ট তৈরি করতে পারবেন",
      "React ও Node.js দিয়ে ফুলস্ট্যাক অ্যাপ বানাতে শিখবেন",
      "গিট, গিটহাব ও ডিপ্লয়মেন্ট প্র্যাকটিস",
      "জব ইন্টারভিউ প্রস্তুতি ও পোর্টফোলিও রিভিউ",
    ],
    requirements: ["একটি ল্যাপটপ ও ইন্টারনেট", "ইংরেজি পড়ার প্রাথমিক দক্ষতা"],
    description:
      "সম্পূর্ণ বাংলায় হাতে-কলমে ফুলস্ট্যাক ওয়েব ডেভেলপমেন্ট শিখুন। প্রতিটি মডিউলে লাইভ প্রজেক্ট, অ্যাসাইনমেন্ট ও মেন্টর সাপোর্ট রয়েছে।",
    modules: [
      mod(
        "ফাউন্ডেশন",
        [
          ["ওয়েব কীভাবে কাজ করে", "১২:৩০"],
          ["HTML সেমান্টিক ট্যাগ", "২৪:১০"],
          ["CSS লেআউট ও ফ্লেক্সবক্স", "৩৮:০০"],
        ],
        true,
      ),
      mod("জাভাস্ক্রিপ্ট মাস্টারি", [
        ["ভ্যারিয়েবল ও ফাংশন", "৩২:০০"],
        ["DOM ম্যানিপুলেশন", "৪১:১৫"],
        ["Async ও API কল", "৩৬:৪০"],
      ]),
      mod("React", [
        ["কম্পোনেন্ট ও props", "২৮:০০"],
        ["State ও hooks", "৪৫:২০"],
        ["রাউটিং ও ফর্ম", "৩৯:৫০"],
      ]),
      mod("ব্যাকএন্ড ও ডিপ্লয়", [
        ["Node.js ও Express", "৪৪:০০"],
        ["ডেটাবেজ ডিজাইন", "৩৩:৩০"],
        ["প্রোডাকশন ডিপ্লয়", "২৬:০০"],
      ]),
    ],
    nextBatch: "১০ সেপ্টেম্বর",
  },
  {
    id: "c-2",
    slug: "graphic-design-mastery",
    title: "গ্রাফিক ডিজাইন মাস্টারি",
    subtitle: "Figma, Illustrator ও ব্র্যান্ড আইডেন্টিটি",
    category: "graphic-design",
    level: "beginner",
    language: "bangla",
    price: 4500,
    oldPrice: 8000,
    durationHours: 64,
    lessonsCount: 128,
    rating: 4.8,
    reviewsCount: 902,
    students: 3120,
    instructorId: "ins-2",
    badge: "জনপ্রিয়",
    published: true,
    outcomes: [
      "প্রফেশনাল লোগো ও ব্র্যান্ড গাইড তৈরি",
      "সোশ্যাল মিডিয়া ক্রিয়েটিভ ডিজাইন",
      "ক্লায়েন্ট প্রেজেন্টেশন স্কিল",
    ],
    requirements: ["যেকোনো কম্পিউটার", "ডিজাইনের প্রতি আগ্রহ"],
    description:
      "ডিজাইনের মূলনীতি থেকে শুরু করে ক্লায়েন্ট প্রজেক্ট ডেলিভারি — সবকিছু বাংলায়, প্র্যাকটিক্যাল অ্যাসাইনমেন্টসহ।",
    modules: [
      mod(
        "ডিজাইন ফাউন্ডেশন",
        [
          ["কালার থিওরি", "১৮:০০"],
          ["টাইপোগ্রাফি", "২২:৩০"],
        ],
        true,
      ),
      mod("Figma প্র্যাকটিস", [
        ["ইন্টারফেস ও কম্পোনেন্ট", "৩০:০০"],
        ["অটো লেআউট", "২৬:১০"],
      ]),
      mod("ব্র্যান্ডিং প্রজেক্ট", [
        ["লোগো ডিজাইন প্রসেস", "৩৪:০০"],
        ["ব্র্যান্ড গাইডলাইন", "২৯:৪৫"],
      ]),
    ],
    nextBatch: "১৫ সেপ্টেম্বর",
  },
  {
    id: "c-3",
    slug: "digital-marketing-pro",
    title: "ডিজিটাল মার্কেটিং প্রো",
    subtitle: "ফেসবুক অ্যাডস, গুগল অ্যাডস ও এসইও",
    category: "digital-marketing",
    level: "intermediate",
    language: "banglish",
    price: 5500,
    oldPrice: 9500,
    durationHours: 72,
    lessonsCount: 140,
    rating: 4.7,
    reviewsCount: 764,
    students: 2890,
    instructorId: "ins-3",
    published: true,
    outcomes: ["প্রফিটেবল অ্যাড ক্যাম্পেইন চালানো", "এসইও দিয়ে অর্গানিক ট্রাফিক", "ক্লায়েন্ট রিপোর্টিং"],
    requirements: ["ফেসবুক অ্যাকাউন্ট", "বেসিক কম্পিউটার জ্ঞান"],
    description: "ই-কমার্স ও লোকাল বিজনেসের জন্য রিয়েল ক্যাম্পেইন কেস স্টাডি সহ সম্পূর্ণ মার্কেটিং কোর্স।",
    modules: [
      mod(
        "মার্কেটিং বেসিক",
        [
          ["ফানেল ও অডিয়েন্স", "২০:০০"],
          ["কন্টেন্ট স্ট্র্যাটেজি", "২৫:০০"],
        ],
        true,
      ),
      mod("পেইড অ্যাডস", [
        ["Meta Ads Manager", "৪২:০০"],
        ["Google Search Ads", "৩৮:০০"],
      ]),
      mod("এসইও", [
        ["কীওয়ার্ড রিসার্চ", "৩১:০০"],
        ["অন-পেজ ও টেকনিক্যাল", "৩৫:০০"],
      ]),
    ],
    nextBatch: "৫ সেপ্টেম্বর",
  },
  {
    id: "c-4",
    slug: "freelancing-roadmap",
    title: "ফ্রিল্যান্সিং রোডম্যাপ",
    subtitle: "প্রথম অর্ডার থেকে টপ রেটেড প্রোফাইল",
    category: "freelancing",
    level: "beginner",
    language: "bangla",
    price: 3500,
    oldPrice: 6000,
    durationHours: 40,
    lessonsCount: 82,
    rating: 4.9,
    reviewsCount: 611,
    students: 3560,
    instructorId: "ins-4",
    badge: "নতুন ব্যাচ",
    published: true,
    outcomes: ["Upwork ও Fiverr প্রোফাইল অপ্টিমাইজেশন", "উইনিং প্রপোজাল লেখা", "পেমেন্ট ও ক্লায়েন্ট ম্যানেজমেন্ট"],
    requirements: ["যেকোনো একটি স্কিল", "ধৈর্য ও নিয়মিত সময়"],
    description: "মার্কেটপ্লেসে টিকে থাকার বাস্তব কৌশল, স্ক্রিন শেয়ারে লাইভ প্রোফাইল রিভিউসহ।",
    modules: [
      mod(
        "শুরুর প্রস্তুতি",
        [
          ["স্কিল সিলেকশন", "১৬:০০"],
          ["পোর্টফোলিও তৈরি", "২৪:০০"],
        ],
        true,
      ),
      mod("মার্কেটপ্লেস", [
        ["Upwork প্রোফাইল", "২৮:০০"],
        ["প্রপোজাল ফর্মুলা", "৩২:০০"],
      ]),
    ],
    nextBatch: "১ সেপ্টেম্বর",
  },
  {
    id: "c-5",
    slug: "python-data-analysis",
    title: "পাইথন ডেটা অ্যানালাইসিস",
    subtitle: "শূন্য থেকে ডেটা ড্রিভেন ক্যারিয়ার",
    category: "data-ai",
    level: "intermediate",
    language: "banglish",
    price: 5900,
    oldPrice: 10000,
    durationHours: 80,
    lessonsCount: 150,
    rating: 4.8,
    reviewsCount: 428,
    students: 1780,
    instructorId: "ins-5",
    published: true,
    outcomes: ["Pandas ও NumPy দিয়ে ডেটা প্রসেসিং", "ডেটা ভিজ্যুয়ালাইজেশন", "রিয়েল ডেটাসেট প্রজেক্ট"],
    requirements: ["গণিতের প্রাথমিক ধারণা"],
    description: "চাকরির বাজারে চাহিদাসম্পন্ন ডেটা স্কিল — প্র্যাকটিক্যাল নোটবুক ও কেস স্টাডি সহ।",
    modules: [
      mod(
        "পাইথন বেসিক",
        [
          ["সিনট্যাক্স ও ডেটা টাইপ", "২২:০০"],
          ["ফাংশন ও মডিউল", "২৬:০০"],
        ],
        true,
      ),
      mod("ডেটা টুলস", [
        ["Pandas ডেটাফ্রেম", "৩৮:০০"],
        ["ভিজ্যুয়ালাইজেশন", "৩০:০০"],
      ]),
    ],
    nextBatch: "২০ সেপ্টেম্বর",
  },
  {
    id: "c-6",
    slug: "spoken-english-confidence",
    title: "স্পোকেন ইংলিশ কনফিডেন্স",
    subtitle: "৯০ দিনে জড়তা কাটিয়ে ইংরেজিতে কথা বলুন",
    category: "spoken-english",
    level: "beginner",
    language: "bangla",
    price: 2900,
    oldPrice: 5000,
    durationHours: 48,
    lessonsCount: 96,
    rating: 4.9,
    reviewsCount: 1130,
    students: 5240,
    instructorId: "ins-6",
    badge: "টপ রেটেড",
    published: true,
    outcomes: ["দৈনন্দিন কথোপকথনে সাবলীলতা", "ইন্টারভিউ ইংলিশ", "প্রেজেন্টেশন স্কিল"],
    requirements: ["প্রতিদিন ৩০ মিনিট প্র্যাকটিস"],
    description: "লাইভ স্পিকিং ক্লাব ও ডেইলি প্র্যাকটিস টাস্কের মাধ্যমে ইংরেজি বলার অভ্যাস তৈরি করুন।",
    modules: [
      mod(
        "ফাউন্ডেশন",
        [
          ["উচ্চারণ ও শব্দভাণ্ডার", "১৯:০০"],
          ["বেসিক গ্রামার", "২৩:০০"],
        ],
        true,
      ),
      mod("কনভারসেশন", [
        ["ডেইলি সিচুয়েশন", "২৭:০০"],
        ["ইন্টারভিউ প্র্যাকটিস", "৩১:০০"],
      ]),
    ],
    nextBatch: "৮ সেপ্টেম্বর",
  },
  {
    id: "c-7",
    slug: "ui-ux-design-sprint",
    title: "UI/UX ডিজাইন স্প্রিন্ট",
    subtitle: "প্রোডাক্ট থিংকিং থেকে হাই-ফাই প্রোটোটাইপ",
    category: "graphic-design",
    level: "advanced",
    language: "banglish",
    price: 6900,
    durationHours: 58,
    lessonsCount: 110,
    rating: 4.8,
    reviewsCount: 322,
    students: 1240,
    instructorId: "ins-2",
    published: true,
    outcomes: ["ইউজার রিসার্চ", "ডিজাইন সিস্টেম তৈরি", "পোর্টফোলিও কেস স্টাডি"],
    requirements: ["Figma-এর প্রাথমিক ব্যবহার"],
    description: "প্রোডাক্ট ডিজাইনার হিসেবে ক্যারিয়ার শুরু করার জন্য ইন্ডাস্ট্রি-স্ট্যান্ডার্ড প্রসেস।",
    modules: [
      mod(
        "রিসার্চ",
        [
          ["ইউজার ইন্টারভিউ", "২১:০০"],
          ["জার্নি ম্যাপ", "২৪:০০"],
        ],
        true,
      ),
      mod("ডিজাইন", [
        ["ওয়্যারফ্রেম", "২৯:০০"],
        ["ডিজাইন সিস্টেম", "৩৪:০০"],
      ]),
    ],
    nextBatch: "২৫ সেপ্টেম্বর",
  },
  {
    id: "c-8",
    slug: "ai-tools-for-work",
    title: "এআই টুলস ফর ওয়ার্ক",
    subtitle: "কাজের গতি ১০ গুণ বাড়ান এআই দিয়ে",
    category: "data-ai",
    level: "beginner",
    language: "bangla",
    price: 1900,
    oldPrice: 3500,
    durationHours: 24,
    lessonsCount: 54,
    rating: 4.7,
    reviewsCount: 289,
    students: 2110,
    instructorId: "ins-5",
    badge: "ট্রেন্ডিং",
    published: true,
    outcomes: ["প্রম্পট রাইটিং", "কন্টেন্ট ও ডিজাইন অটোমেশন", "এআই দিয়ে ফ্রিল্যান্স সার্ভিস"],
    requirements: ["স্মার্টফোন বা কম্পিউটার"],
    description: "অফিস, পড়াশোনা ও ফ্রিল্যান্সিংয়ে এআই ব্যবহার করে প্রোডাক্টিভিটি বাড়ানোর প্র্যাকটিক্যাল কোর্স।",
    modules: [
      mod(
        "এআই বেসিক",
        [
          ["এআই কীভাবে কাজ করে", "১৪:০০"],
          ["প্রম্পট ফ্রেমওয়ার্ক", "২০:০০"],
        ],
        true,
      ),
      mod("প্র্যাকটিক্যাল", [
        ["কন্টেন্ট অটোমেশন", "২৫:০০"],
        ["ডিজাইন ও ভিডিও", "২২:০০"],
      ]),
    ],
    nextBatch: "৩ সেপ্টেম্বর",
  },
];

export const getCourse = (slug: string) => courses.find((c) => c.slug === slug);
export const getInstructor = (id: string) => instructors.find((i) => i.id === id);
export const getInstructorBySlug = (slug: string) => instructors.find((i) => i.slug === slug);
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
