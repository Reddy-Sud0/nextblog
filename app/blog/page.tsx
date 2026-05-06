import Link from "next/link";

export const metadata = {
  title: "Blog | NextBlog",
  description: "Browse all blog posts on NextBlog — technology, design, science, and more.",
};

const COLORS = [
  "from-violet-500 to-purple-500",
  "from-sky-500 to-blue-500",
  "from-emerald-500 to-teal-500",
  "from-orange-500 to-rose-500",
  "from-pink-500 to-fuchsia-500",
  "from-amber-500 to-orange-500",
];

const READING_TIMES = [3, 5, 4, 6, 7, 4, 5, 8, 3, 6];

async function getPosts(page: number) {
  const limit = 9;
  const skip = (page - 1) * limit;
  const res = await fetch(
    `https://dummyjson.com/posts?limit=${limit}&skip=${skip}`,
    { next: { revalidate: 3600 } }
  );
  return res.json();
}

type Post = { id: number; title: string; body: string; tags?: string[]; reactions?: { likes?: number; dislikes?: number } | number };

export default async function BlogPage({
  searchParams,
}: {
  searchParams?: { page?: string };
}) {
  const page = Number(searchParams?.page ?? 1);
  const data = await getPosts(page);
  const posts: Post[] = data.posts ?? [];
  const total: number = data.total ?? 0;
  const totalPages = Math.ceil(total / 9);

  return (
    <div className="space-y-12">
      {/* ── Header ── */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-100 via-white to-blue-100 px-8 py-12 text-slate-900 shadow-2xl dark:from-slate-900 dark:via-violet-900 dark:to-slate-900 dark:text-white">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="relative">
          <span className="inline-flex rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-violet-200 ring-1 ring-white/20">
            ALL ARTICLES
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight">
            The <span className="text-violet-300">Blog</span>
          </h1>
          <p className="mt-2 text-white/60">
            {total} articles on tech, design, science &amp; culture — page {page} of {totalPages}
          </p>
        </div>
      </section>

      {/* ── Grid ── */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => {
          const likes = typeof post.reactions === "object" ? (post.reactions?.likes ?? 0) : (post.reactions ?? 0);
          return (
            <article
              key={post.id}
              className="group flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
            >
              <div className={`h-1.5 w-full rounded-t-2xl bg-gradient-to-r ${COLORS[i % COLORS.length]}`} />
              <div className="flex flex-1 flex-col p-5">
                {/* Tags */}
                <div className="mb-3 flex flex-wrap gap-1.5">
                  {(post.tags ?? []).slice(0, 2).map((tag: string) => (
                    <span key={tag} className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                      #{tag}
                    </span>
                  ))}
                </div>
                {/* Title */}
                <h2 className="font-semibold capitalize leading-snug">{post.title}</h2>
                {/* Excerpt */}
                <p className="mt-2 flex-1 line-clamp-3 text-sm text-slate-500 dark:text-slate-400">{post.body}</p>
                {/* Footer */}
                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-800">
                  <span className="text-xs text-slate-400">⏱ {READING_TIMES[i % READING_TIMES.length]} min read</span>
                  <span className="text-xs text-slate-400">❤️ {likes} likes</span>
                </div>
                <Link
                  href={`/blog/${post.id}`}
                  className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-violet-600 transition group-hover:gap-2 dark:text-violet-400"
                >
                  Read article <span>→</span>
                </Link>
              </div>
            </article>
          );
        })}
      </section>

      {/* ── Pagination ── */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {page > 1 && (
          <Link
            href={`/blog?page=${page - 1}`}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          >
            ← Prev
          </Link>
        )}
        {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => i + 1).map((p) => (
          <Link
            key={p}
            href={`/blog?page=${p}`}
            className={`rounded-xl px-4 py-2 text-sm font-medium shadow-sm transition ${
              p === page
                ? "bg-violet-600 text-white"
                : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            }`}
          >
            {p}
          </Link>
        ))}
        {page < totalPages && (
          <Link
            href={`/blog?page=${page + 1}`}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          >
            Next →
          </Link>
        )}
      </div>
    </div>
  );
}
