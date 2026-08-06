export type UserRole = "learner" | "visitor" | "instructor";

export type AppUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  district: string;
  joined: string;
  role: UserRole;
  enrolledCourseIds: string[];
  status: "active" | "blocked";
};

export type EnrollmentRequest = {
  id: string;
  userName: string;
  phone: string;
  courseId: string;
  method: "bkash" | "nagad" | "rocket" | "bank";
  trxId: string;
  amount: number;
  createdAt: string;
  status: "pending" | "approved" | "rejected";
};

export type AuditEntry = {
  id: string;
  actor: string;
  action: string;
  target: string;
  at: string;
};

export const users: AppUser[] = [
  {
    id: "u-1",
    name: "সাব্বির হাসান",
    email: "sabbir@example.com",
    phone: "০১৭১২৩৪৫৬৭৮",
    district: "ঢাকা",
    joined: "২০২৬-০১-১২",
    role: "learner",
    enrolledCourseIds: ["c-1", "c-8"],
    status: "active",
  },
  {
    id: "u-2",
    name: "মিথিলা রহমান",
    email: "mithila@example.com",
    phone: "০১৮১১২২৩৩৪",
    district: "চট্টগ্রাম",
    joined: "২০২৬-০২-০৩",
    role: "learner",
    enrolledCourseIds: ["c-2"],
    status: "active",
  },
  {
    id: "u-3",
    name: "আরিফুল ইসলাম",
    email: "ariful@example.com",
    phone: "০১৯৪৫৬৭৮৯০",
    district: "রাজশাহী",
    joined: "২০২৬-০২-১৮",
    role: "learner",
    enrolledCourseIds: ["c-6", "c-4"],
    status: "active",
  },
  {
    id: "u-4",
    name: "তাসনিম আক্তার",
    email: "tasnim@example.com",
    phone: "০১৬৩৩৪৪৫৫৬",
    district: "সিলেট",
    joined: "২০২৬-০৩-০৯",
    role: "visitor",
    enrolledCourseIds: [],
    status: "active",
  },
  {
    id: "u-5",
    name: "জুবায়ের আলম",
    email: "jubayer@example.com",
    phone: "০১৫২২৩৩৪৪৫",
    district: "খুলনা",
    joined: "২০২৬-০৩-২১",
    role: "visitor",
    enrolledCourseIds: [],
    status: "active",
  },
  {
    id: "u-6",
    name: "রুমানা পারভীন",
    email: "rumana@example.com",
    phone: "০১৩৭৭৮৮৯৯০",
    district: "রংপুর",
    joined: "২০২৬-০৪-০২",
    role: "learner",
    enrolledCourseIds: ["c-3"],
    status: "blocked",
  },
];

export const enrollmentRequests: EnrollmentRequest[] = [
  {
    id: "r-1",
    userName: "শাকিল আহমেদ",
    phone: "০১৭৮৮৮৮৮৮৮",
    courseId: "c-1",
    method: "bkash",
    trxId: "BK7YH2K9QA",
    amount: 6500,
    createdAt: "২০২৬-০৮-০৪",
    status: "pending",
  },
  {
    id: "r-2",
    userName: "নাফিসা তাবাসসুম",
    phone: "০১৯১১১১১১১",
    courseId: "c-6",
    method: "nagad",
    trxId: "NG44MZ01LP",
    amount: 2900,
    createdAt: "২০২৬-০৮-০৫",
    status: "pending",
  },
  {
    id: "r-3",
    userName: "ইমরান খান",
    phone: "০১৬২২২২২২২",
    courseId: "c-3",
    method: "rocket",
    trxId: "RK90XTQ7VB",
    amount: 5500,
    createdAt: "২০২৬-০৮-০৫",
    status: "pending",
  },
  {
    id: "r-4",
    userName: "সুমাইয়া হক",
    phone: "০১৫৩৩৩৩৩৩৩",
    courseId: "c-2",
    method: "bank",
    trxId: "BANK-88213",
    amount: 4500,
    createdAt: "২০২৬-০৮-০২",
    status: "approved",
  },
];

export const auditLog: AuditEntry[] = [
  { id: "a-1", actor: "অ্যাডমিন", action: "কোর্স প্রকাশ করেছেন", target: "এআই টুলস ফর ওয়ার্ক", at: "২০২৬-০৮-০৫ ১১:২০" },
  { id: "a-2", actor: "অ্যাডমিন", action: "পেমেন্ট অনুমোদন", target: "BANK-88213", at: "২০২৬-০৮-০২ ১৬:০৫" },
  { id: "a-3", actor: "মডারেটর", action: "রিভিউ মুছেছেন", target: "স্প্যাম রিভিউ #221", at: "২০২৬-০৮-০১ ০৯:৪০" },
];

export const paymentMethods = [
  { id: "bkash", name: "বিকাশ", number: "০১৭০০-০০০০০০", type: "পার্সোনাল", color: "#E2136E" },
  { id: "nagad", name: "নগদ", number: "০১৭০০-০০০০০০", type: "পার্সোনাল", color: "#F6921E" },
  { id: "rocket", name: "রকেট", number: "০১৭০০-০০০০০০০", type: "পার্সোনাল", color: "#8C3494" },
  { id: "bank", name: "ব্যাংক ট্রান্সফার", number: "ElevateHub Ltd · A/C 1234 5678 9012", type: "সিটি ব্যাংক", color: "#3B5BFF" },
] as const;
