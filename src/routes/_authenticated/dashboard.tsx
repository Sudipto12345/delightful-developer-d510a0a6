import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Award,
  BookOpen,
  CalendarClock,
  CheckCircle2,
  Clock,
  Heart,
  LayoutDashboard,
  LogOut,
  PlayCircle,
  Settings,
  TrendingUp,
  UserCircle,
} from "lucide-react";
import { useState } from "react";

import { PublicShell } from "@/components/layout/PublicShell";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getCourse, getInstructor } from "@/data/courses";
import { useStore } from "@/lib/store";

const title = "My Dashboard — ElevateHub Ltd";
const description =
  "Track your enrolled courses, lesson progress, certificates, and learning activity.";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DashboardPage,
});

const navItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "courses", label: "My Courses", icon: BookOpen },
  { id: "player", label: "Course Player", icon: PlayCircle },
  { id: "certificates", label: "Certificates", icon: Award },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "bookings", label: "Bookings", icon: CalendarClock },
  { id: "profile", label: "Profile", icon: UserCircle },
  { id: "settings", label: "Settings", icon: Settings },
];

function DashboardPage() {
  const { session, enrolled, progress, courses, requests, wishlist, logout, toggleLesson, completedLessons } =
    useStore();
  const [tab, setTab] = useState("overview");
  const [playerCourse, setPlayerCourse] = useState(enrolled[0] ?? "c-1");
  const [playerMod, setPlayerMod] = useState(0);
  const [playerLesson, setPlayerLesson] = useState(0);

  const enrolledCourses = courses.filter((c) => enrolled.includes(c.id));
  const approvedReqs = requests.filter((r) => r.status === "approved");
  const pendingReqs = requests.filter((r) => r.status === "pending");
  const wishlistCourses = courses.filter((c) => wishlist.includes(c.id));
  const activeCourse = courses.find((c) => c.id === playerCourse) ?? courses[0];

  const totalLessons = activeCourse
    ? activeCourse.modules.reduce((a, m) => a + m.lessons.length, 0)
    : 0;

  const user = session ?? { name: "Learner", email: "learner@example.com", role: "learner" as const };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-sidebar md:flex">
        <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
            {user.name[0]}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{user.name}</p>
            <p className="truncate text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                tab === item.id
                  ? "bg-accent text-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
              }`}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="border-t border-sidebar-border p-3">
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-sidebar-foreground/50 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
          >
            <LogOut className="h-4 w-4" /> Log out
          </button>
          <Button asChild variant="outline" size="sm" className="mt-2 w-full">
            <Link to="/">← Back to site</Link>
          </Button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="fixed top-0 right-0 left-0 z-30 flex h-14 items-center justify-between border-b border-border bg-sidebar px-4 md:hidden">
        <span className="font-bold text-accent">ElevateHub</span>
        <div className="flex gap-2 overflow-x-auto">
          {navItems.slice(0, 4).map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                tab === item.id
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-secondary"
              }`}
            >
              <item.icon className="h-3.5 w-3.5" />
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 overflow-auto px-4 py-6 pt-20 md:px-10 md:pt-8">
        {/* OVERVIEW */}
        {tab === "overview" && (
          <Stagger>
            <StaggerItem>
              <h1 className="text-2xl font-extrabold sm:text-3xl">
                Welcome back, {user.name.split(" ")[0]} 👋
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Here's where your learning stands today.
              </p>
            </StaggerItem>

            <StaggerItem>
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { icon: BookOpen, label: "Enrolled", value: enrolledCourses.length },
                  { icon: TrendingUp, label: "In Progress", value: enrolledCourses.filter((c) => (progress[c.id] ?? 0) < 100 && (progress[c.id] ?? 0) > 0).length },
                  { icon: Award, label: "Completed", value: enrolledCourses.filter((c) => (progress[c.id] ?? 0) === 100).length },
                  { icon: Clock, label: "Pending", value: pendingReqs.length },
                ].map((s) => (
                  <div key={s.label} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary">
                      <s.icon className="h-5 w-5 text-accent" />
                    </span>
                    <div>
                      <p className="text-2xl font-extrabold">{s.value}</p>
                      <p className="text-xs text-muted-foreground">{s.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </StaggerItem>

            <StaggerItem>
              <h2 className="mt-8 text-lg font-bold">Your Enrollments</h2>
              {enrolledCourses.length === 0 ? (
                <div className="mt-4 rounded-2xl border border-border bg-card p-8 text-center text-muted-foreground">
                  <BookOpen className="mx-auto mb-3 h-8 w-8 opacity-40" />
                  <p className="text-sm">No active enrollments yet.</p>
                  <Button asChild size="sm" className="mt-4">
                    <Link to="/courses">Browse Courses</Link>
                  </Button>
                </div>
              ) : (
                <div className="mt-4 space-y-3">
                  {enrolledCourses.map((c) => {
                    const pct = progress[c.id] ?? 0;
                    return (
                      <div
                        key={c.id}
                        className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 sm:flex-row sm:items-center"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold truncate">{c.title}</p>
                          <p className="text-xs text-muted-foreground mt-1">{getInstructor(c.instructorId)?.name}</p>
                          <div className="mt-3 space-y-1">
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>Progress</span>
                              <span>{pct}%</span>
                            </div>
                            <Progress value={pct} className="h-1.5" />
                          </div>
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <Button
                            size="sm"
                            onClick={() => { setPlayerCourse(c.id); setTab("player"); }}
                          >
                            <PlayCircle className="mr-1 h-4 w-4" />
                            {pct === 100 ? "Review" : pct > 0 ? "Continue" : "Start"}
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </StaggerItem>

            {pendingReqs.length > 0 && (
              <StaggerItem>
                <h2 className="mt-8 text-lg font-bold">Pending Payments</h2>
                <div className="mt-3 space-y-2">
                  {pendingReqs.map((r) => {
                    const c = getCourse(r.courseId);
                    return (
                      <div
                        key={r.id}
                        className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-4"
                      >
                        <div>
                          <p className="text-sm font-semibold">{c?.title}</p>
                          <p className="text-xs text-muted-foreground">
                            TrxID: {r.trxId} · ${r.amount}
                          </p>
                        </div>
                        <Badge variant="secondary">Under Review</Badge>
                      </div>
                    );
                  })}
                </div>
              </StaggerItem>
            )}
          </Stagger>
        )}

        {/* MY COURSES */}
        {tab === "courses" && (
          <div>
            <h1 className="text-2xl font-extrabold">My Courses</h1>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {enrolledCourses.length === 0 ? (
                <div className="col-span-full rounded-2xl border border-border bg-card p-10 text-center text-muted-foreground">
                  <p className="text-sm">No courses yet — browse the catalog.</p>
                  <Button asChild size="sm" className="mt-4">
                    <Link to="/courses">Browse Courses</Link>
                  </Button>
                </div>
              ) : (
                enrolledCourses.map((c) => {
                  const pct = progress[c.id] ?? 0;
                  return (
                    <div key={c.id} className="flex flex-col rounded-2xl border border-border bg-card overflow-hidden">
                      <div className="relative h-28 bg-cobalt flex items-center justify-center">
                        <p className="text-3xl font-extrabold text-white/90 drop-shadow">
                          {c.title.split(" ").slice(0, 2).map((w) => w[0]).join("")}
                        </p>
                        {c.badge && (
                          <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground">
                            {c.badge}
                          </Badge>
                        )}
                      </div>
                      <div className="flex flex-1 flex-col p-4 gap-3">
                        <p className="font-bold leading-snug">{c.title}</p>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>{pct}% complete</span>
                            <span>{completedLessons[c.id]?.length ?? 0}/{c.lessonsCount} lessons</span>
                          </div>
                          <Progress value={pct} className="h-1.5" />
                        </div>
                        <Button
                          size="sm"
                          className="mt-auto"
                          onClick={() => { setPlayerCourse(c.id); setTab("player"); }}
                        >
                          <PlayCircle className="mr-1 h-4 w-4" />
                          {pct === 0 ? "Start Course" : pct === 100 ? "Review" : "Continue"}
                        </Button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* COURSE PLAYER */}
        {tab === "player" && activeCourse && (
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-4">
              <div className="relative aspect-video overflow-hidden rounded-2xl border border-border bg-cobalt flex items-center justify-center">
                <div className="absolute inset-0 grid-noise opacity-30" />
                <PlayCircle className="relative h-16 w-16 text-white/60" />
                <span className="absolute bottom-3 right-3 rounded-md bg-black/50 px-2 py-1 text-[10px] font-mono text-white/60">
                  {user.email}
                </span>
              </div>

              <div>
                <Badge variant="secondary" className="mb-2">{activeCourse.modules[playerMod]?.title}</Badge>
                <h2 className="text-lg font-bold">
                  {activeCourse.modules[playerMod]?.lessons[playerLesson]?.title}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {activeCourse.title} · Lesson {playerLesson + 1} of {activeCourse.modules[playerMod]?.lessons.length}
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => {
                    const key = `${playerMod}-${playerLesson}`;
                    toggleLesson(activeCourse.id, key, totalLessons);
                  }}
                >
                  <CheckCircle2 className="mr-1 h-4 w-4" />
                  {completedLessons[activeCourse.id]?.includes(`${playerMod}-${playerLesson}`)
                    ? "Unmark complete"
                    : "Mark complete"}
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/courses/${activeCourse.slug}`}>Course page</Link>
                </Button>
              </div>

              {/* Course switcher */}
              {enrolledCourses.length > 1 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {enrolledCourses.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => { setPlayerCourse(c.id); setPlayerMod(0); setPlayerLesson(0); }}
                      className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                        c.id === playerCourse
                          ? "border-accent bg-accent/10 text-accent"
                          : "border-border text-muted-foreground hover:border-primary-soft"
                      }`}
                    >
                      {c.title.length > 25 ? c.title.slice(0, 25) + "…" : c.title}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Curriculum sidebar */}
            <div className="max-h-[70vh] overflow-y-auto rounded-2xl border border-border bg-card">
              <div className="sticky top-0 border-b border-border bg-card p-4">
                <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                  Curriculum · {Math.round(progress[activeCourse.id] ?? 0)}% done
                </p>
                <Progress value={progress[activeCourse.id] ?? 0} className="mt-2 h-1.5" />
              </div>
              {activeCourse.modules.map((mod, mi) => (
                <div key={mod.title}>
                  <p className="px-4 pt-3 pb-1 text-xs font-bold text-accent">
                    {mi + 1}. {mod.title}
                  </p>
                  {mod.lessons.map((lesson, li) => {
                    const key = `${mi}-${li}`;
                    const done = completedLessons[activeCourse.id]?.includes(key);
                    const active = playerMod === mi && playerLesson === li;
                    return (
                      <button
                        key={lesson.title}
                        onClick={() => { setPlayerMod(mi); setPlayerLesson(li); }}
                        className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm transition-colors ${
                          active ? "bg-secondary font-semibold" : "hover:bg-secondary/50"
                        }`}
                      >
                        {done ? (
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-success" />
                        ) : (
                          <PlayCircle className={`h-4 w-4 shrink-0 ${active ? "text-accent" : "text-muted-foreground"}`} />
                        )}
                        <span className="flex-1 truncate">{lesson.title}</span>
                        <span className="shrink-0 text-xs text-muted-foreground">{lesson.duration}</span>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CERTIFICATES */}
        {tab === "certificates" && (
          <div>
            <h1 className="text-2xl font-extrabold">Certificates</h1>
            <p className="mt-1 text-sm text-muted-foreground">Earned automatically at 100% course completion.</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {enrolledCourses.filter((c) => (progress[c.id] ?? 0) === 100).length === 0 ? (
                <div className="col-span-full rounded-2xl border border-dashed border-border bg-card p-10 text-center text-muted-foreground">
                  <Award className="mx-auto mb-3 h-10 w-10 opacity-30" />
                  <p className="text-sm">Complete a course to earn your first certificate.</p>
                </div>
              ) : (
                enrolledCourses.filter((c) => (progress[c.id] ?? 0) === 100).map((c) => (
                  <div key={c.id} className="rounded-2xl border-2 border-dashed border-accent/50 bg-card p-6">
                    <div className="flex items-center gap-3">
                      <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/15 text-accent">
                        <Award className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="font-bold">{c.title}</p>
                        <p className="text-xs text-muted-foreground">Completed · {new Date().toLocaleDateString("en-GB", { month: "long", year: "numeric" })}</p>
                      </div>
                    </div>
                    <div className="mt-5 flex gap-2">
                      <Button size="sm" className="flex-1">Download PDF</Button>
                      <Button size="sm" variant="outline" className="flex-1">Verify</Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* WISHLIST */}
        {tab === "wishlist" && (
          <div>
            <h1 className="text-2xl font-extrabold">Wishlist</h1>
            {wishlistCourses.length === 0 ? (
              <div className="mt-6 rounded-2xl border border-border bg-card p-10 text-center text-muted-foreground">
                <Heart className="mx-auto mb-3 h-8 w-8 opacity-30" />
                <p className="text-sm">No saved courses yet — tap the heart icon on any course page.</p>
              </div>
            ) : (
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {wishlistCourses.map((c) => (
                  <Link
                    key={c.id}
                    to={`/courses/${c.slug}`}
                    className="flex flex-col rounded-2xl border border-border bg-card overflow-hidden hover:-translate-y-1 transition-transform"
                  >
                    <div className="h-24 bg-cobalt flex items-center justify-center">
                      <p className="text-2xl font-extrabold text-white/80">{c.title.split(" ").slice(0, 2).map((w) => w[0]).join("")}</p>
                    </div>
                    <div className="p-4">
                      <p className="font-bold text-sm leading-snug">{c.title}</p>
                      <p className="mt-1 text-xs text-accent font-bold">${c.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {/* BOOKINGS */}
        {tab === "bookings" && (
          <div>
            <h1 className="text-2xl font-extrabold">Consultation Bookings</h1>
            <p className="mt-1 text-sm text-muted-foreground">Your scheduled mentor sessions appear here after booking.</p>
            <div className="mt-6 space-y-3">
              {[
                { type: "Portfolio Review", mentor: "Elena Novak", when: "Wed, 13 Aug — 4:30 PM", status: "confirmed" },
                { type: "Career Direction", mentor: "James Carter", when: "Requested — pending confirmation", status: "pending" },
              ].map((b) => (
                <div
                  key={b.type}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-4 flex-wrap"
                >
                  <div>
                    <p className="font-semibold">{b.type}</p>
                    <p className="text-xs text-muted-foreground mt-1">with {b.mentor} · {b.when}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={b.status === "confirmed" ? "default" : "secondary"}>
                      {b.status === "confirmed" ? "Confirmed" : "Pending"}
                    </Badge>
                    <Button size="sm" variant="outline">Reschedule</Button>
                  </div>
                </div>
              ))}
              <Button asChild variant="outline" className="w-full mt-4">
                <Link to="/consultation">Book a New Session</Link>
              </Button>
            </div>
          </div>
        )}

        {/* PROFILE */}
        {tab === "profile" && (
          <div className="max-w-xl">
            <h1 className="text-2xl font-extrabold">Profile</h1>
            <div className="mt-6 flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-2xl font-extrabold text-primary-foreground">
                {user.name[0]}
              </div>
              <div>
                <p className="font-bold text-lg">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <Badge variant="secondary" className="mt-1 capitalize">{user.role}</Badge>
              </div>
            </div>
            <div className="mt-8 space-y-4 rounded-2xl border border-border bg-card p-6">
              {[
                { label: "Full name", value: user.name },
                { label: "Email address", value: user.email },
                { label: "New password", value: "", type: "password", placeholder: "Leave blank to keep current" },
              ].map((f) => (
                <div key={f.label}>
                  <label className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1.5">{f.label}</label>
                  <input
                    type={f.type ?? "text"}
                    defaultValue={f.value}
                    placeholder={f.placeholder}
                    className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-2.5 text-sm outline-none focus:border-primary-soft transition-colors"
                  />
                </div>
              ))}
              <Button className="mt-2">Save changes</Button>
            </div>
          </div>
        )}

        {/* SETTINGS */}
        {tab === "settings" && (
          <div className="max-w-xl">
            <h1 className="text-2xl font-extrabold">Settings</h1>
            <div className="mt-6 space-y-4">
              {[
                { label: "Email notifications for new lessons", on: true },
                { label: "SMS/WhatsApp reminders for live sessions", on: true },
                { label: "Weekly progress report", on: false },
                { label: "Marketing emails", on: false },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between rounded-2xl border border-border bg-card p-4">
                  <span className="text-sm">{s.label}</span>
                  <div className={`relative h-6 w-11 rounded-full transition-colors ${s.on ? "bg-success" : "bg-secondary"}`}>
                    <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${s.on ? "translate-x-5" : "translate-x-0.5"}`} />
                  </div>
                </div>
              ))}
              <Button onClick={logout} variant="destructive" className="mt-2 w-full">
                <LogOut className="mr-2 h-4 w-4" /> Sign out
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
