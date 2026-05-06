"use client";

import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { RootState } from "@/store";
import { loginRequest } from "@/store/slices/authSlice";

const features = [
  { icon: "📊", text: "Access your Admin Dashboard" },
  { icon: "✍️", text: "Manage and publish posts" },
  { icon: "💬", text: "Moderate comments" },
  { icon: "🔒", text: "Secure JWT authentication" },
];

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { token, loading, error } = useSelector((s: RootState) => s.auth);
  const [username, setUsername] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    if (token) router.push("/dashboard");
  }, [token, router]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(loginRequest({ username, password }));
  }

  return (
    <div className="mx-auto max-w-5xl space-y-10">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-100 via-white to-blue-100 px-8 py-12 text-slate-900 shadow-2xl dark:from-slate-900 dark:via-violet-900 dark:to-slate-900 dark:text-white">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="relative text-center">
          <span className="inline-flex rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-violet-200 ring-1 ring-white/20">
            WELCOME BACK
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight">
            Sign In to <span className="text-violet-300">NextBlog</span>
          </h1>
          <p className="mt-3 text-white/60">
            Access your dashboard, manage posts, and explore the community.
          </p>
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Features panel */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold">What you can do</h2>
          <div className="space-y-3">
            {features.map((f) => (
              <div
                key={f.text}
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <span className="text-2xl">{f.icon}</span>
                <p className="text-sm font-medium">{f.text}</p>
              </div>
            ))}
          </div>

          {/* Test credentials hint */}
          <div className="rounded-2xl border border-violet-200 bg-violet-50 p-5 dark:border-violet-800 dark:bg-violet-900/10">
            <p className="text-sm font-semibold text-violet-700 dark:text-violet-300">🔑 Test Credentials</p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Username: <strong>emilys</strong> &nbsp;|&nbsp; Password: <strong>emilyspass</strong>
            </p>
            <p className="mt-1 text-xs text-slate-400">(Pre-filled for you — just click Login)</p>
          </div>

          <p className="text-sm text-slate-500">
            New here?{" "}
            <Link href="/signup" className="font-medium text-violet-600 dark:text-violet-400">
              Create an account →
            </Link>
          </p>
        </div>

        {/* Login form */}
        <form
          onSubmit={onSubmit}
          className="space-y-5 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <h2 className="text-lg font-semibold">Sign In</h2>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-500">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none ring-violet-500/20 transition focus:border-violet-400 focus:ring-4 dark:border-slate-700 dark:bg-slate-800"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-500">Password</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 pr-10 text-sm outline-none ring-violet-500/20 transition focus:border-violet-400 focus:ring-4 dark:border-slate-700 dark:bg-slate-800"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
              >
                {showPass ? "🙈" : "👁"}
              </button>
            </div>
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
              ❌ {error}
            </p>
          )}

          <button
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 py-3 text-sm font-semibold text-white shadow transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.98]"
          >
            {loading ? "Signing in…" : "Sign In →"}
          </button>

          <p className="text-center text-xs text-slate-400">
            By signing in you agree to our{" "}
            <span className="underline underline-offset-2 cursor-pointer">Terms of Service</span>
          </p>
        </form>
      </div>
    </div>
  );
}
