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
  method: "bank" | "paypal" | "wise" | "invoice";
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
    name: "Daniel Cooper",
    email: "daniel@example.com",
    phone: "+1 415 555 0142",
    district: "New York",
    joined: "2026-01-12",
    role: "learner",
    enrolledCourseIds: ["c-1", "c-8"],
    status: "active",
  },
  {
    id: "u-2",
    name: "Michaela Brooks",
    email: "michaela@example.com",
    phone: "+1 (386) 296-1301",
    district: "New York",
    joined: "2026-02-03",
    role: "learner",
    enrolledCourseIds: ["c-2"],
    status: "active",
  },
  {
    id: "u-3",
    name: "Arthur Fields",
    email: "arthur@example.com",
    phone: "+1 647 555 0198",
    district: "Toronto",
    joined: "2026-02-18",
    role: "learner",
    enrolledCourseIds: ["c-6", "c-4"],
    status: "active",
  },
  {
    id: "u-4",
    name: "Tasnia Aktar",
    email: "tasnia@example.com",
    phone: "+49 30 555 0176",
    district: "Berlin",
    joined: "2026-03-09",
    role: "visitor",
    enrolledCourseIds: [],
    status: "active",
  },
  {
    id: "u-5",
    name: "Julian Alvarez",
    email: "julian@example.com",
    phone: "+65 6555 0134",
    district: "Singapore",
    joined: "2026-03-21",
    role: "visitor",
    enrolledCourseIds: [],
    status: "active",
  },
  {
    id: "u-6",
    name: "Ruby Parker",
    email: "ruby@example.com",
    phone: "+61 2 5550 1987",
    district: "Sydney",
    joined: "2026-04-02",
    role: "learner",
    enrolledCourseIds: ["c-3"],
    status: "blocked",
  },
];

export const enrollmentRequests: EnrollmentRequest[] = [
  {
    id: "r-1",
    userName: "Samuel Ahmed",
    phone: "+1 212 555 0188",
    courseId: "c-1",
    method: "bank",
    trxId: "BNK7YH2K9QA",
    amount: 79,
    createdAt: "2026-08-04",
    status: "pending",
  },
  {
    id: "r-2",
    userName: "Nadia Thompson",
    phone: "+44 161 555 0111",
    courseId: "c-6",
    method: "paypal",
    trxId: "PP44MZ01LP",
    amount: 39,
    createdAt: "2026-08-05",
    status: "pending",
  },
  {
    id: "r-3",
    userName: "Imran Khan",
    phone: "+1 312 555 0222",
    courseId: "c-3",
    method: "wise",
    trxId: "WS90XTQ7VB",
    amount: 69,
    createdAt: "2026-08-05",
    status: "pending",
  },
  {
    id: "r-4",
    userName: "Sumaya Haque",
    phone: "+44 117 555 0333",
    courseId: "c-2",
    method: "invoice",
    trxId: "INV-88213",
    amount: 59,
    createdAt: "2026-08-02",
    status: "approved",
  },
];

export const auditLog: AuditEntry[] = [
  { id: "a-1", actor: "Admin", action: "Published a course", target: "AI Tools for Work", at: "2026-08-05 11:20" },
  { id: "a-2", actor: "Admin", action: "Approved payment", target: "INV-88213", at: "2026-08-02 16:05" },
  { id: "a-3", actor: "Moderator", action: "Removed a review", target: "Spam review #221", at: "2026-08-01 09:40" },
];

export const paymentMethods = [
  { id: "bank", name: "Bank Transfer", number: "ElevateHub Ltd · A/C 1234 5678 9012", type: "Business Account", color: "#3B5BFF" },
  { id: "paypal", name: "PayPal", number: "payments@elevatehub.com", type: "Business", color: "#0070BA" },
  { id: "wise", name: "Wise", number: "ElevateHub Ltd · IBAN GB29 NWBK 6016 1331 9268 19", type: "Business", color: "#00B9FF" },
  { id: "invoice", name: "Stripe Invoice", number: "billing@elevatehub.com", type: "Invoice", color: "#635BFF" },
] as const;
