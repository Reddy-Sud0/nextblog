import Link from "next/link";

export const metadata = {
  title: "About | NextBlog",
  description: "Learn about NextBlog — a modern full-stack blog built with Next.js, Redux Toolkit, and Redux-Saga.",
};

const stack = [
  { name: "Next.js 14", desc: "App Router, SSR, SSG, ISR", icon: "▲", color: "bg-slate-900 text-white" },
  { name: "Redux Toolkit", desc: "Global state management", icon: "🔴", color: "bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-300" },
  { name: "Redux-Saga", desc: "Side-effect & async handling", icon: "⚡", color: "bg-yellow-50 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300" },
  { name: "TypeScript", desc: "Type-safe codebase", icon: "🔷", color: "bg-blue-50 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300" },
  { name: "Tailwind CSS", desc: "Utility-first styling", icon: "🎨", color: "bg-sky-50 text-sky-800 dark:bg-sky-900/20 dark:text-sky-300" },
  { name: "DummyJSON API", desc: "Posts, users & comments", icon: "🌐", color: "bg-emerald-50 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300" },
];

const team = [
  { name: "Emily Johnson", role: "Lead Developer", avatar: "E", color: "bg-violet-500" },
  { name: "Alex Carter", role: "UI/UX Designer", avatar: "A", color: "bg-sky-500" },
  { name: "Sam Rivera", role: "Backend Engineer", avatar: "S", color: "bg-emerald-500" },
];

const milestones = [
  { year: "Week 1", title: "Project Kickoff", desc: "Set up Next.js App Router with TypeScript and Tailwind." },
  { year: "Week 2", title: "Redux Integration", desc: "Added Redux Toolkit, Redux-Saga and DummyJSON auth flow." },
  { year: "Week 3", title: "All Pages Live", desc: "Home, Blog, About, Contact, Dashboard all fully working." },
  { year: "Week 4", title: "Polish & Deploy", desc: "Dark mode, protected routes, SSR blog and final QA." },
];

export default function AboutPage() {
  return (
    <div className="space-y-16">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-violet-900 to-slate-900 px-8 py-14 text-white shadow-2xl">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="relative max-w-2xl">
          <span className="inline-flex rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-violet-200 ring-1 ring-white/20">
            ABOUT US
          </span>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight">
            Built for Curious <span className="text-violet-300">Minds</span>
          </h1>
          <p className="mt-4 text-white/60 leading-7">
            NextBlog is a modern, production-style blog platform built to showcase clean architecture,
            scalable state management, and a delightful reading experience — all powered by the latest
            Next.js App Router.
          </p>
          <Link
            href="/blog"
            className="mt-6 inline-flex rounded-xl bg-white/10 px-5 py-2.5 text-sm font-semibold text-white ring-1 ring-white/20 backdrop-blur transition hover:bg-white/20"
          >
            Explore the Blog →
          </Link>
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="grid gap-6 md:grid-cols-3">
        {[
          { icon: "🎯", title: "Our Mission", desc: "Deliver fast, accessible, and beautifully designed reading experiences with modern web tech." },
          { icon: "🔒", title: "Secure by Design", desc: "JWT-based auth, middleware-protected routes, and cookie-based session management." },
          { icon: "⚡", title: "Performance First", desc: "Server-side rendering, ISR, and optimized data fetching for the best Lighthouse scores." },
        ].map((item) => (
          <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-3 text-3xl">{item.icon}</div>
            <h2 className="font-semibold">{item.title}</h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* ── Tech Stack ── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold tracking-tight">Tech Stack</h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {stack.map((s) => (
            <div key={s.name} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg ${s.color}`}>
                {s.icon}
              </div>
              <div>
                <p className="font-semibold text-sm">{s.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Team ── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold tracking-tight">Meet the Team</h2>
        <div className="grid gap-5 sm:grid-cols-3">
          {team.map((member) => (
            <div key={member.name} className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${member.color} text-xl font-bold text-white shadow`}>
                {member.avatar}
              </div>
              <p className="mt-3 font-semibold">{member.name}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold tracking-tight">Project Timeline</h2>
        <div className="relative space-y-6 border-l-2 border-violet-200 pl-6 dark:border-violet-800">
          {milestones.map((m) => (
            <div key={m.title} className="relative">
              <div className="absolute -left-[29px] top-1 h-4 w-4 rounded-full bg-violet-500 ring-4 ring-white dark:ring-slate-950" />
              <p className="text-xs font-semibold text-violet-600 dark:text-violet-400">{m.year}</p>
              <p className="font-semibold">{m.title}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="rounded-3xl bg-gradient-to-r from-violet-600 to-blue-600 p-10 text-center text-white shadow-xl">
        <h2 className="text-2xl font-extrabold">Ready to explore?</h2>
        <p className="mt-2 text-white/70">Read our latest articles or join the community today.</p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Link href="/blog" className="rounded-xl bg-white px-6 py-2.5 text-sm font-semibold text-violet-700 shadow transition hover:bg-violet-50">
            Read Blog →
          </Link>
          <Link href="/contact" className="rounded-xl bg-white/10 px-6 py-2.5 text-sm font-semibold text-white ring-1 ring-white/20 backdrop-blur transition hover:bg-white/20">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
