"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { logout } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const stats = [
  { label: "Total Posts", value: "150+", icon: "📝", color: "from-violet-500 to-purple-600" },
  { label: "Comments", value: "3.2k", icon: "💬", color: "from-sky-500 to-blue-600" },
  { label: "Readers", value: "12k", icon: "👥", color: "from-emerald-500 to-teal-600" },
  { label: "This Month", value: "24", icon: "📅", color: "from-orange-500 to-rose-500" },
];

const recentActivity = [
  { action: "New post published", detail: "\"10 Next.js Tips for 2025\"", time: "2 hours ago", icon: "📝" },
  { action: "Comment received", detail: "\"Great article! Very helpful.\"", time: "5 hours ago", icon: "💬" },
  { action: "Post updated", detail: "\"Redux Saga Complete Guide\"", time: "Yesterday", icon: "✏️" },
  { action: "New reader", detail: "Joined from Twitter", time: "2 days ago", icon: "👤" },
];

const quickActions = [
  { label: "Write New Post", desc: "Create & publish a new blog article", icon: "✍️", color: "bg-violet-50 border-violet-200 hover:bg-violet-100 dark:bg-violet-900/20 dark:border-violet-800" },
  { label: "View Blog", desc: "Browse all published posts", icon: "📖", color: "bg-sky-50 border-sky-200 hover:bg-sky-100 dark:bg-sky-900/20 dark:border-sky-800" },
  { label: "Manage Comments", desc: "Review and moderate comments", icon: "💬", color: "bg-emerald-50 border-emerald-200 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-800" },
];

export default function DashboardPage() {
  const { user } = useSelector((s: RootState) => s.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  function handleLogout() {
    dispatch(logout());
    router.push("/login");
  }

  const initials = user
    ? `${user.firstName?.charAt(0) ?? ""}`.toUpperCase()
    : "U";

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <section className="space-y-8">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-violet-900 to-slate-900 p-8 text-white shadow-2xl">
        {/* Decorative circles */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />

        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
            {/* Avatar */}
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-2xl font-bold ring-2 ring-white/20 backdrop-blur">
              {initials}
            </div>
            <div>
              <p className="text-sm font-medium text-white/60">{greeting()},</p>
              <h1 className="text-3xl font-bold tracking-tight">
                {user?.firstName ? `${user.firstName} 👋` : "Welcome!"}
              </h1>
              <p className="mt-1 text-sm text-white/50">
                {user?.email ?? "admin@nextblog.dev"} · Admin
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-2.5 text-sm font-medium text-white ring-1 ring-white/20 backdrop-blur transition hover:bg-white/20 active:scale-95"
          >
            <span>🚪</span> Logout
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
          >
            <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${s.color} text-lg shadow`}>
              {s.icon}
            </div>
            <p className="text-2xl font-bold tracking-tight">{s.value}</p>
            <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions + Activity Feed */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Quick Actions */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="mb-4 text-lg font-semibold">Quick Actions</h2>
          <div className="space-y-3">
            {quickActions.map((a) => (
              <button
                key={a.label}
                className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition active:scale-[0.98] ${a.color}`}
              >
                <span className="text-2xl">{a.icon}</span>
                <div>
                  <p className="font-medium">{a.label}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{a.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="mb-4 text-lg font-semibold">Recent Activity</h2>
          <ul className="space-y-4">
            {recentActivity.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-sm dark:bg-slate-800">
                  {item.icon}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium">{item.action}</p>
                  <p className="truncate text-xs text-slate-500 dark:text-slate-400">{item.detail}</p>
                  <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">{item.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer note */}
      <p className="text-center text-xs text-slate-400 dark:text-slate-600">
        NextBlog Admin Panel · Built with Next.js, Redux Toolkit & Redux-Saga
      </p>
    </section>
  );
}
