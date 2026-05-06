"use client";

import { FormEvent, useState } from "react";

const info = [
  { icon: "📧", label: "Email", value: "hello@nextblog.dev" },
  { icon: "🐦", label: "Twitter", value: "@nextblog" },
  { icon: "💼", label: "GitHub", value: "github.com/nextblog" },
];

const subjects = ["General Inquiry", "Partnership", "Guest Post", "Report a Bug", "Other"];

export default function ContactPage() {
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
    <div className="space-y-12">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-100 via-white to-blue-100 px-8 py-14 text-slate-900 shadow-2xl dark:from-slate-900 dark:via-violet-900 dark:to-slate-900 dark:text-white">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="relative max-w-xl">
          <span className="inline-flex rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-violet-200 ring-1 ring-white/20">
            GET IN TOUCH
          </span>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight">
            We&apos;d Love to <span className="text-violet-300">Hear From You</span>
          </h1>
          <p className="mt-4 text-white/60 leading-7">
            Have a question, partnership idea, or just want to say hi? Drop us a message and we&apos;ll get back to you within 24 hours.
          </p>
        </div>
      </section>

      {/* ── Info Cards + Form ── */}
      <section className="grid gap-8 lg:grid-cols-3">
        {/* Info Cards */}
        <div className="space-y-4 lg:col-span-1">
          <h2 className="text-lg font-semibold">Contact Details</h2>
          {info.map((item) => (
            <div key={item.label} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-xl dark:bg-violet-900/20">
                {item.icon}
              </div>
              <div>
                <p className="text-xs text-slate-400">{item.label}</p>
                <p className="font-medium text-sm">{item.value}</p>
              </div>
            </div>
          ))}

          <div className="rounded-2xl border border-violet-200 bg-violet-50 p-5 dark:border-violet-800 dark:bg-violet-900/10">
            <p className="text-sm font-semibold text-violet-700 dark:text-violet-300">📝 Write for Us</p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Are you a writer or developer? We welcome guest posts on technology, design, and culture.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-2">
          {submitted ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-emerald-200 bg-emerald-50 p-12 text-center dark:border-emerald-800 dark:bg-emerald-900/10">
              <div className="text-5xl">✅</div>
              <h2 className="mt-4 text-xl font-bold text-emerald-700 dark:text-emerald-300">Message Sent!</h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Thanks for reaching out. We&apos;ll reply within 24 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="space-y-4 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <h2 className="text-lg font-semibold">Send a Message</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-500">Full Name *</label>
                  <input
                    required
                    placeholder="John Doe"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none ring-violet-500/20 transition focus:border-violet-400 focus:ring-4 dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-500">Email Address *</label>
                  <input
                    required
                    type="email"
                    placeholder="john@example.com"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none ring-violet-500/20 transition focus:border-violet-400 focus:ring-4 dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-500">Subject</label>
                <select className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none ring-violet-500/20 transition focus:border-violet-400 focus:ring-4 dark:border-slate-700 dark:bg-slate-800">
                  {subjects.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-500">Message *</label>
                <textarea
                  required
                  placeholder="Tell us what's on your mind..."
                  rows={5}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none ring-violet-500/20 transition focus:border-violet-400 focus:ring-4 dark:border-slate-700 dark:bg-slate-800"
                />
              </div>
              <button
                disabled={loading}
                className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 py-3 text-sm font-semibold text-white shadow transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.98]"
              >
                {loading ? "Sending…" : "Send Message →"}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
