import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import { courses as seedCourses, type Course } from "@/data/courses";
import {
  auditLog as seedAudit,
  enrollmentRequests as seedRequests,
  users as seedUsers,
  type AppUser,
  type AuditEntry,
  type EnrollmentRequest,
} from "@/data/users";

export type SessionUser = {
  name: string;
  email: string;
  role: "learner" | "admin";
};

type State = {
  courses: Course[];
  users: AppUser[];
  requests: EnrollmentRequest[];
  audit: AuditEntry[];
  session: SessionUser | null;
  enrolled: string[];
  progress: Record<string, number>;
  completedLessons: Record<string, string[]>;
  wishlist: string[];
};

type Store = State & {
  login: (u: SessionUser) => void;
  logout: () => void;
  toggleWishlist: (id: string) => void;
  submitEnrollment: (r: Omit<EnrollmentRequest, "id" | "status" | "createdAt">) => string;
  approveRequest: (id: string) => void;
  rejectRequest: (id: string) => void;
  toggleLesson: (courseId: string, lessonKey: string, total: number) => void;
  saveCourse: (c: Course) => void;
  deleteCourse: (id: string) => void;
  togglePublish: (id: string) => void;
  setUserStatus: (id: string, status: AppUser["status"]) => void;
  removeUser: (id: string) => void;
};

const StoreContext = createContext<Store | null>(null);

const STORAGE_KEY = "elevatehub-state-v1";

const initialState: State = {
  courses: seedCourses,
  users: seedUsers,
  requests: seedRequests,
  audit: seedAudit,
  session: null,
  enrolled: [],
  progress: {},
  completedLessons: {},
  wishlist: [],
};

const now = () =>
  new Date().toLocaleString("bn-BD", { dateStyle: "medium", timeStyle: "short" });

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(initialState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setState((s) => ({ ...s, ...JSON.parse(raw) }));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state, hydrated]);

  const value = useMemo<Store>(() => {
    const log = (s: State, action: string, target: string): State => ({
      ...s,
      audit: [
        { id: `a-${Date.now()}`, actor: s.session?.name ?? "অ্যাডমিন", action, target, at: now() },
        ...s.audit,
      ].slice(0, 40),
    });

    return {
      ...state,
      login: (u) => setState((s) => ({ ...s, session: u })),
      logout: () => setState((s) => ({ ...s, session: null })),
      toggleWishlist: (id) =>
        setState((s) => ({
          ...s,
          wishlist: s.wishlist.includes(id)
            ? s.wishlist.filter((w) => w !== id)
            : [...s.wishlist, id],
        })),
      submitEnrollment: (r) => {
        const id = `r-${Date.now()}`;
        setState((s) =>
          log(
            {
              ...s,
              requests: [
                { ...r, id, status: "pending", createdAt: now() },
                ...s.requests,
              ],
            },
            "নতুন এনরোলমেন্ট রিকোয়েস্ট",
            r.trxId,
          ),
        );
        return id;
      },
      approveRequest: (id) =>
        setState((s) => {
          const req = s.requests.find((r) => r.id === id);
          return log(
            {
              ...s,
              requests: s.requests.map((r) => (r.id === id ? { ...r, status: "approved" } : r)),
              enrolled:
                req && !s.enrolled.includes(req.courseId) ? [...s.enrolled, req.courseId] : s.enrolled,
            },
            "পেমেন্ট অনুমোদন",
            req?.trxId ?? id,
          );
        }),
      rejectRequest: (id) =>
        setState((s) =>
          log(
            {
              ...s,
              requests: s.requests.map((r) => (r.id === id ? { ...r, status: "rejected" } : r)),
            },
            "পেমেন্ট বাতিল",
            s.requests.find((r) => r.id === id)?.trxId ?? id,
          ),
        ),
      toggleLesson: (courseId, lessonKey, total) =>
        setState((s) => {
          const done = s.completedLessons[courseId] ?? [];
          const next = done.includes(lessonKey)
            ? done.filter((l) => l !== lessonKey)
            : [...done, lessonKey];
          return {
            ...s,
            completedLessons: { ...s.completedLessons, [courseId]: next },
            progress: {
              ...s.progress,
              [courseId]: total ? Math.round((next.length / total) * 100) : 0,
            },
          };
        }),
      saveCourse: (c) =>
        setState((s) =>
          log(
            {
              ...s,
              courses: s.courses.some((x) => x.id === c.id)
                ? s.courses.map((x) => (x.id === c.id ? c : x))
                : [c, ...s.courses],
            },
            s.courses.some((x) => x.id === c.id) ? "কোর্স সম্পাদনা" : "নতুন কোর্স যুক্ত",
            c.title,
          ),
        ),
      deleteCourse: (id) =>
        setState((s) =>
          log(
            { ...s, courses: s.courses.filter((c) => c.id !== id) },
            "কোর্স মুছে ফেলা",
            s.courses.find((c) => c.id === id)?.title ?? id,
          ),
        ),
      togglePublish: (id) =>
        setState((s) =>
          log(
            {
              ...s,
              courses: s.courses.map((c) => (c.id === id ? { ...c, published: !c.published } : c)),
            },
            "কোর্স স্ট্যাটাস পরিবর্তন",
            s.courses.find((c) => c.id === id)?.title ?? id,
          ),
        ),
      setUserStatus: (id, status) =>
        setState((s) =>
          log(
            { ...s, users: s.users.map((u) => (u.id === id ? { ...u, status } : u)) },
            status === "blocked" ? "ইউজার ব্লক" : "ইউজার সক্রিয়",
            s.users.find((u) => u.id === id)?.name ?? id,
          ),
        ),
      removeUser: (id) =>
        setState((s) =>
          log(
            { ...s, users: s.users.filter((u) => u.id !== id) },
            "ইউজার মুছে ফেলা",
            s.users.find((u) => u.id === id)?.name ?? id,
          ),
        ),
    };
  }, [state]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}

export const bn = (n: number) =>
  n.toLocaleString("bn-BD", { maximumFractionDigits: 0 });

export const taka = (n: number) => `৳${bn(n)}`;
