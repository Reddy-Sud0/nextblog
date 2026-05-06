import Link from "next/link";

async function getFeaturedPosts() {
  const res = await fetch("https://dummyjson.com/posts?limit=3&skip=0", {
    next: { revalidate: 3600 },
  });
  return res.json();
}

const tags = ["Technology", "Science", "Design", "Culture", "Health", "Travel"];
const stats = [
  { label: "Articles Published", value: "150+" },
  { label: "Monthly Readers", value: "12k+" },
  { label: "Topics Covered", value: "30+" },
  { label: "Comments & Replies", value: "3.2k" },
];

export default async function Home() {
  const data = await getFeaturedPosts();
  const featured = data.posts ?? [];

  return (
    <div className="space-y-16">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-100 via-white to-blue-100 px-8 py-16 text-slate-900 shadow-2xl dark:from-slate-900 dark:via-violet-900 dark:to-slate-900 dark:text-white">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="relative mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-violet-200 ring-1 ring-white/20 backdrop-blur">
            ✨ NEXT.JS + REDUX BLOG
          </span>
          <h1 className="mt-6 text-5xl font-extrabold leading-tight tracking-tight">
            Ideas Worth <span className="text-violet-300">Reading</span>
          </h1>
          <p className="mt-4 text-lg text-white/60">
            Discover insightful articles on technology, design, science, and culture — written for curious minds.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/blog"
              className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow transition hover:bg-violet-100 active:scale-95"
            >
              Browse All Posts →
            </Link>
            <Link
              href="/signup"
              className="rounded-xl bg-white/10 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/20 backdrop-blur transition hover:bg-white/20 active:scale-95"
            >
              Join the Community
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <p className="text-3xl font-extrabold text-violet-600 dark:text-violet-400">{s.value}</p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{s.label}</p>
          </div>
        ))}
      </section>

      {/* ── Featured Posts ── */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Featured Posts</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Hand-picked reads for you</p>
          </div>
          <Link
            href="/blog"
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            View all →
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((post: { id: number; title: string; body: string; tags?: string[] }, i: number) => (
            <article
              key={post.id}
              className="group flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
            >
              {/* Coloured header band */}
              <div
                className={`h-2 w-full rounded-t-2xl ${
                  i === 0
                    ? "bg-gradient-to-r from-violet-500 to-purple-500"
                    : i === 1
                    ? "bg-gradient-to-r from-sky-500 to-blue-500"
                    : "bg-gradient-to-r from-emerald-500 to-teal-500"
                }`}
              />
              <div className="flex flex-1 flex-col p-5">
                {post.tags && post.tags[0] && (
                  <span className="mb-2 inline-block w-fit rounded-full bg-violet-50 px-2.5 py-0.5 text-xs font-medium text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">
                    {post.tags[0]}
                  </span>
                )}
                <h3 className="font-semibold leading-snug capitalize">{post.title}</h3>
                <p className="mt-2 flex-1 line-clamp-3 text-sm text-slate-500 dark:text-slate-400">{post.body}</p>
                <Link
                  href={`/blog/${post.id}`}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-violet-600 transition group-hover:gap-2 dark:text-violet-400"
                >
                  Read more <span>→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── Topics ── */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Browse by Topic</h2>
        <div className="flex flex-wrap gap-3">
          {tags.map((tag) => (
            <Link
              key={tag}
              href="/blog"
              className="rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-violet-50 hover:border-violet-200 hover:text-violet-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-violet-900/20"
            >
              {tag}
            </Link>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="rounded-3xl bg-gradient-to-r from-violet-600 to-blue-600 p-10 text-center text-white shadow-xl">
        <h2 className="text-3xl font-extrabold">Start Writing Today</h2>
        <p className="mt-3 text-white/70">
          Create an account, share your ideas, and connect with a community of passionate readers.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/signup"
            className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-violet-700 shadow transition hover:bg-violet-50 active:scale-95"
          >
            Create Account →
          </Link>
          <Link
            href="/login"
            className="rounded-xl bg-white/10 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/20 backdrop-blur transition hover:bg-white/20 active:scale-95"
          >
            Sign In
          </Link>
        </div>
      </section>
    </div>
  );
}
