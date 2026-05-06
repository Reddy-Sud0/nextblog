"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

const perks = [
  { icon: "✍️", text: "Write & publish articles" },
  { icon: "💬", text: "Comment on posts" },
  { icon: "❤️", text: "Like & bookmark reads" },
  { icon: "🔒", text: "Access your dashboard" },
];

export default function SignupPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  }

  return (
    <div className="mx-auto max-w-5xl space-y-10">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-100 via-white to-blue-100 px-8 py-12 text-slate-900 shadow-2xl dark:from-slate-900 dark:via-violet-900 dark:to-slate-900 dark:text-white">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="relative text-center">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Join <span className="text-violet-300">NextBlog</span>
          </h1>
          <p className="mt-3 text-white/60">
            Create your free account and start reading, writing, and connecting today.
          </p>
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Perks */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold">Why Join Us?</h2>
          <div className="space-y-3">
            {perks.map((p) => (
              <div key={p.text} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <span className="text-2xl">{p.icon}</span>
                <p className="text-sm font-medium">{p.text}</p>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-violet-200 bg-violet-50 p-5 dark:border-violet-800 dark:bg-violet-900/10">
            <p className="text-sm text-slate-600 dark:text-slate-300">
              <span className="font-semibold text-violet-700 dark:text-violet-300">Note:</span> This is a demo app using DummyJSON. Signup registers a UI session only — use the{" "}
              <Link href="/login" className="underline underline-offset-2 text-violet-600 dark:text-violet-400">Login page</Link> with credentials{" "}
              <strong>emilys / emilyspass</strong> to access the dashboard.
            </p>
          </div>
          <p className="text-sm text-slate-500">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-violet-600 dark:text-violet-400">
              Sign in →
            </Link>
          </p>
        </div>

        {/* Form */}
        {submitted ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-emerald-200 bg-emerald-50 p-12 text-center dark:border-emerald-800 dark:bg-emerald-900/10">
            <div className="text-5xl">🎉</div>
            <h2 className="mt-4 text-xl font-bold text-emerald-700 dark:text-emerald-300">Account Created!</h2>
            <p className="mt-2 text-sm text-slate-500">Welcome to NextBlog. You can now sign in.</p>
            <Link
              href="/login"
              className="mt-6 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              Go to Login →
            </Link>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            className="space-y-4 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <h2 className="text-lg font-semibold">Create Your Account</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-500">First Name</label>
                <input
                  required
                  placeholder="John"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none ring-violet-500/20 transition focus:border-violet-400 focus:ring-4 dark:border-slate-700 dark:bg-slate-800"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-500">Last Name</label>
                <input
                  required
                  placeholder="Doe"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none ring-violet-500/20 transition focus:border-violet-400 focus:ring-4 dark:border-slate-700 dark:bg-slate-800"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-500">Email Address</label>
              <input
                required
                type="email"
                placeholder="john@example.com"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none ring-violet-500/20 transition focus:border-violet-400 focus:ring-4 dark:border-slate-700 dark:bg-slate-800"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-500">Username</label>
              <input
                required
                placeholder="johndoe123"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none ring-violet-500/20 transition focus:border-violet-400 focus:ring-4 dark:border-slate-700 dark:bg-slate-800"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-500">Password</label>
              <input
                required
                type="password"
                placeholder="Min 8 characters"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none ring-violet-500/20 transition focus:border-violet-400 focus:ring-4 dark:border-slate-700 dark:bg-slate-800"
              />
            </div>
            <button
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 py-3 text-sm font-semibold text-white shadow transition hover:opacity-90 disabled:opacity-60 active:scale-[0.98]"
            >
              {loading ? "Creating account…" : "Create Account →"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
