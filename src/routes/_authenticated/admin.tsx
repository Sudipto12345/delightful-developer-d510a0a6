import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import {
  BarChart3,
  BookMarked,
  CheckCircle2,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  MoreVertical,
  Search,
  Settings,
  Star,
  Users,
  XCircle,
} from "lucide-react";
import { useState } from "react";

import { Reveal } from "@/components/motion/Motion";
import { PanelShell } from "@/components/layout/PanelShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { getCourse } from "@/data/courses";
import { AUTO_APPROVE_MS, useStore } from "@/lib/store";

const title = "Admin Panel — ElevateHub Ltd";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title },
      { name: "robots", content: "noindex" },
    ],
  }),
  beforeLoad: async () => {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;
    if (!user) throw redirect({ to: "/auth/login" });

    const { data: isAdmin, error } = await supabase.rpc("has_role", {
      _user_id: user.id,
      _role: "admin",
    });
    if (error || !isAdmin) throw redirect({ to: "/dashboard" });
    return { isAdmin: true };
  },
  component: AdminPage,
});

const navItems: { id: string; label: string; icon: any; badge?: boolean }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "approvals", label: "Enrollment Approvals", icon: ClipboardList, badge: true },
  { id: "courses", label: "Course Manager", icon: BookMarked },
  { id: "students", label: "Students", icon: Users },
  { id: "audit", label: "Audit Log", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: Settings },
];

function autoApproveIn(createdAtMs?: number) {
  if (!createdAtMs) return "—";
  const left = createdAtMs + AUTO_APPROVE_MS - Date.now();
  if (left <= 0) return "moments";
  const mins = Math.ceil(left / 60000);
  return mins >= 60 ? "60 min" : `${mins} min`;
}

function AdminPage() {
  const {
    session, courses, users, requests, audit,
    approveRequest, rejectRequest,
    togglePublish, deleteCourse,
    setUserStatus, removeUser,
    logout,
  } = useStore();

  const [tab, setTab] = useState("overview");
  const [studentQ, setStudentQ] = useState("");
  const [decliningId, setDecliningId] = useState<string | null>(null);

  const pending = requests.filter((r) => r.status === "pending");
  const activeStudents = users.filter((u) => u.status === "active").length;
  const avgRating = courses.length
    ? (courses.reduce((a, c) => a + c.rating, 0) / courses.length).toFixed(1)
    : "—";

  const filteredStudents = users.filter(
    (u) =>
      u.name.toLowerCase().includes(studentQ.toLowerCase()) ||
      u.email.toLowerCase().includes(studentQ.toLowerCase()),
  );

  return (
    <PanelShell
      title="Admin Panel"
      subtitle={session?.name ?? "Platform Admin"}
      items={navItems.map((i) => ({ ...i, badge: i.badge ? pending.length : undefined }))}
      active={tab}
      onSelect={setTab}
      onLogout={logout}
    >
      <>

        {/* OVERVIEW */}
        {tab === "overview" && (
          <div>
            <h1 className="text-2xl font-extrabold sm:text-3xl">Overview</h1>
            <p className="mt-1 text-sm text-muted-foreground">Platform health at a glance.</p>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { icon: ClipboardList, label: "Pending Approvals", value: pending.length, alert: pending.length > 0 },
                { icon: Users, label: "Active Students", value: activeStudents },
                { icon: BookMarked, label: "Published Courses", value: courses.filter((c) => c.published).length },
                { icon: Star, label: "Avg. Rating", value: avgRating },
              ].map((k) => (
                <div
                  key={k.label}
                  className={`relative rounded-sm border bg-card p-4 ${k.alert ? "border-destructive/50" : "border-border"}`}
                >
                  {k.alert && (
                    <span className="absolute right-3 top-3 h-2 w-2 animate-pulse rounded-full bg-destructive" />
                  )}
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-secondary">
                    <k.icon className="h-5 w-5 text-accent" />
                  </span>
                  <p className="mt-3 text-2xl font-extrabold">{k.value}</p>
                  <p className="text-xs text-muted-foreground">{k.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <div className="rounded-sm border border-border bg-card p-5">
                <div className="flex items-center justify-between">
                  <h2 className="font-bold">Approval Queue</h2>
                  <button onClick={() => setTab("approvals")} className="text-xs text-accent font-medium">
                    View all →
                  </button>
                </div>
                <div className="mt-4 space-y-3">
                  {pending.slice(0, 4).map((r) => {
                    const c = getCourse(r.courseId);
                    return (
                      <div key={r.id} className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold">{r.userName}</p>
                          <p className="truncate text-xs text-muted-foreground">{c?.title} · ${r.amount}</p>
                        </div>
                        <Badge variant="secondary">Pending</Badge>
                      </div>
                    );
                  })}
                  {pending.length === 0 && <p className="text-sm text-muted-foreground">Queue is clear.</p>}
                </div>
              </div>

              <div className="rounded-sm border border-border bg-card p-5">
                <h2 className="font-bold mb-4">Recent Activity</h2>
                <div className="space-y-4">
                  {audit.slice(0, 5).map((a) => (
                    <div key={a.id} className="border-l-2 border-border pl-3">
                      <p className="text-sm font-medium">{a.action}</p>
                      <p className="text-xs text-muted-foreground">{a.target}</p>
                      <p className="mt-0.5 font-mono text-[10px] text-muted-foreground/60">{a.at} · {a.actor}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* APPROVALS */}
        {tab === "approvals" && (
          <div>
            <h1 className="text-2xl font-extrabold">Enrollment Approvals</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Approve or reject enrollment requests. Anything left untouched is auto-approved one hour
              after submission. Every decision is logged.
            </p>

            <div className="mt-6 rounded-sm border border-border bg-card overflow-hidden">
              {pending.length === 0 && (
                <div className="p-10 text-center text-muted-foreground">
                  <CheckCircle2 className="mx-auto mb-3 h-8 w-8 text-success opacity-60" />
                  <p className="text-sm">No pending requests — queue is clear.</p>
                </div>
              )}
              {pending.map((r) => {
                const c = getCourse(r.courseId);
                return (
                  <div
                    key={r.id}
                    className="flex flex-col gap-3 border-b border-border p-5 last:border-0 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="font-semibold">{r.userName}</p>
                      <p className="text-sm text-muted-foreground">{c?.title}</p>
                      <p className="mt-1 font-mono text-xs text-muted-foreground">
                        {r.trxId} · ${r.amount} · {r.method} · {r.createdAt}
                      </p>
                      {r.scheduledFor && (
                        <p className="mt-1 text-xs text-muted-foreground">
                          Orientation:{" "}
                          {new Date(r.scheduledFor).toLocaleString("en-US", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </p>
                      )}
                      <p className="mt-1 text-xs font-medium text-accent">
                        Auto-approves in {autoApproveIn(r.createdAtMs)}
                      </p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Button
                        size="sm"
                        className="bg-success text-success-foreground hover:bg-success/90"
                        onClick={() => approveRequest(r.id)}
                      >
                        <CheckCircle2 className="mr-1 h-4 w-4" /> Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-destructive/50 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                        onClick={() => {
                          if (confirm(`Reject payment ${r.trxId}?`)) rejectRequest(r.id);
                        }}
                      >
                        <XCircle className="mr-1 h-4 w-4" /> Reject
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>

            <h2 className="mt-8 font-bold">Resolved</h2>
            <div className="mt-3 rounded-sm border border-border bg-card divide-y divide-border overflow-hidden">
              {requests.filter((r) => r.status !== "pending").map((r) => {
                const c = getCourse(r.courseId);
                return (
                  <div key={r.id} className="flex items-center justify-between gap-4 p-4">
                    <div>
                      <p className="text-sm font-semibold">{r.userName}</p>
                      <p className="text-xs text-muted-foreground">{c?.title} · {r.trxId}</p>
                    </div>
                    <Badge
                      className={
                        r.status === "approved"
                          ? "bg-success/15 text-success"
                          : "bg-destructive/15 text-destructive"
                      }
                    >
                      {r.status}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* COURSES */}
        {tab === "courses" && (
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h1 className="text-2xl font-extrabold">Course Manager</h1>
              <Button size="sm">+ New Course</Button>
            </div>
            <div className="mt-6 overflow-x-auto rounded-sm border border-border bg-card">
              <table className="w-full min-w-[600px] text-sm">
                <thead>
                  <tr className="border-b border-border">
                    {["Course", "Category", "Rating", "Students", "Status", ""].map((h) => (
                      <th
                        key={h}
                        className="px-5 py-3 text-left font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {courses.map((c) => (
                    <tr key={c.id} className="border-b border-border last:border-0">
                      <td className="max-w-[200px] truncate px-5 py-3 font-semibold">{c.title}</td>
                      <td className="px-5 py-3 capitalize text-muted-foreground">
                        {c.category.replace(/-/g, " ")}
                      </td>
                      <td className="px-5 py-3">
                        <span className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 fill-accent text-accent" /> {c.rating}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-muted-foreground">
                        {c.students.toLocaleString()}
                      </td>
                      <td className="px-5 py-3">
                        <button
                          onClick={() => togglePublish(c.id)}
                          className={`rounded-full px-3 py-1 text-xs font-bold transition-colors ${
                            c.published
                              ? "bg-success/15 text-success hover:bg-destructive/15 hover:text-destructive"
                              : "bg-secondary text-muted-foreground hover:bg-success/15 hover:text-success"
                          }`}
                        >
                          {c.published ? "Published" : "Draft"}
                        </button>
                      </td>
                      <td className="px-5 py-3 text-right">
                        <button
                          onClick={() => {
                            if (confirm(`Delete "${c.title}"?`)) deleteCourse(c.id);
                          }}
                          className="text-xs font-semibold text-destructive opacity-60 hover:opacity-100"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* STUDENTS */}
        {tab === "students" && (
          <div>
            <h1 className="text-2xl font-extrabold">Student Directory</h1>
            <div className="relative mt-4 max-w-sm">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={studentQ}
                onChange={(e) => setStudentQ(e.target.value)}
                placeholder="Search students"
                className="pl-10 rounded-full"
              />
            </div>
            <div className="mt-5 overflow-x-auto rounded-sm border border-border bg-card">
              <table className="w-full min-w-[600px] text-sm">
                <thead>
                  <tr className="border-b border-border">
                    {["Student", "Role", "Enrolled", "Joined", "Status", ""].map((h) => (
                      <th
                        key={h}
                        className="px-5 py-3 text-left font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((u) => (
                    <tr key={u.id} className="border-b border-border last:border-0">
                      <td className="px-5 py-3">
                        <p className="font-semibold">{u.name}</p>
                        <p className="text-xs text-muted-foreground">{u.email}</p>
                      </td>
                      <td className="px-5 py-3 capitalize text-muted-foreground">{u.role}</td>
                      <td className="px-5 py-3 text-muted-foreground">{u.enrolledCourseIds.length}</td>
                      <td className="px-5 py-3 text-muted-foreground">{u.joined}</td>
                      <td className="px-5 py-3">
                        <Badge
                          className={
                            u.status === "active"
                              ? "bg-success/15 text-success"
                              : "bg-destructive/15 text-destructive"
                          }
                        >
                          {u.status}
                        </Badge>
                      </td>
                      <td className="px-5 py-3 text-right">
                        <button
                          onClick={() =>
                            setUserStatus(u.id, u.status === "active" ? "blocked" : "active")
                          }
                          className="text-xs font-semibold text-muted-foreground hover:text-foreground"
                        >
                          {u.status === "active" ? "Block" : "Activate"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* AUDIT LOG */}
        {tab === "audit" && (
          <div>
            <h1 className="text-2xl font-extrabold">Audit Log</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Every approval, rejection, and admin action — immutable.
            </p>
            <div className="mt-6 rounded-sm border border-border bg-card divide-y divide-border overflow-hidden">
              {audit.map((a) => (
                <div
                  key={a.id}
                  className="flex flex-wrap items-center gap-x-6 gap-y-1 px-5 py-4"
                >
                  <span className="w-36 shrink-0 font-mono text-xs text-muted-foreground">{a.at}</span>
                  <span className="min-w-[140px] font-semibold text-sm">{a.action}</span>
                  <span className="flex-1 text-sm text-muted-foreground">{a.target}</span>
                  <span className="font-mono text-xs text-muted-foreground/60">{a.actor}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SETTINGS */}
        {tab === "settings" && (
          <div className="max-w-xl">
            <h1 className="text-2xl font-extrabold">Platform Settings</h1>
            <div className="mt-6 space-y-4">
              <div className="rounded-sm border border-border bg-card p-6 space-y-4">
                <h2 className="font-bold">Branding</h2>
                {[
                  { label: "Platform name", value: "ElevateHub Ltd" },
                  { label: "Support email", value: "hello@elevatehubltd.com" },
                  { label: "WhatsApp number", value: "+880 1XXX-XXXXXX" },
                ].map((f) => (
                  <div key={f.label}>
                    <label className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1.5">{f.label}</label>
                    <input
                      defaultValue={f.value}
                      className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-2.5 text-sm outline-none focus:border-primary-soft"
                    />
                  </div>
                ))}
              </div>

              <div className="rounded-sm border border-border bg-card p-6">
                <h2 className="font-bold mb-3">Manual Payment Instructions</h2>
                <p className="text-xs text-muted-foreground mb-3">
                  Shown to learners after submitting a payment request.
                </p>
                <textarea
                  rows={4}
                  defaultValue="Send course fee via bKash/Nagad/Bank Transfer. Submit your Transaction ID and our team will verify access within 2 hours."
                  className="w-full resize-y rounded-xl border border-border bg-secondary/50 px-4 py-2.5 text-sm outline-none focus:border-primary-soft"
                />
              </div>

              <div className="rounded-sm border border-border bg-card p-6 space-y-3">
                <h2 className="font-bold">Notifications</h2>
                {[
                  { label: "Email on every new payment request", on: true },
                  { label: "WhatsApp alert for new enrollments", on: true },
                  { label: "Weekly analytics digest", on: false },
                ].map((s) => (
                  <div key={s.label} className="flex items-center justify-between">
                    <span className="text-sm">{s.label}</span>
                    <div className={`relative h-6 w-11 rounded-full ${s.on ? "bg-success" : "bg-secondary"}`}>
                      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${s.on ? "translate-x-5" : "translate-x-0.5"}`} />
                    </div>
                  </div>
                ))}
              </div>

              <Button className="w-full">Save settings</Button>
            </div>
          </div>
        )}

      </>
    </PanelShell>
  );
}
