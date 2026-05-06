import Link from "next/link";

type Params = { params: { id: string } };

type Comment = {
  id: number;
  body: string;
  likes?: number;
  user?: { username?: string; fullName?: string };
};

export async function generateMetadata({ params }: Params) {
  const post = await fetch(`https://dummyjson.com/posts/${params.id}`).then((r) => r.json());
  return {
    title: `${post.title} | NextBlog`,
    description: post.body?.slice(0, 150),
  };
}

export default async function BlogDetailPage({ params }: Params) {
  const post = await fetch(`https://dummyjson.com/posts/${params.id}`, {
    next: { revalidate: 3600 },
  }).then((r) => r.json());

  const commentsData = await fetch(
    `https://dummyjson.com/comments/post/${params.id}`,
    { next: { revalidate: 3600 } }
  ).then((r) => r.json());

  const comments: Comment[] = commentsData.comments ?? [];
  const likes = typeof post.reactions === "object" ? (post.reactions?.likes ?? 0) : (post.reactions ?? 0);

  return (
    <div className="space-y-10">
      {/* ── Back ── */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm font-medium text-violet-600 transition hover:gap-3 dark:text-violet-400"
      >
        ← Back to Blog
      </Link>

      {/* ── Post ── */}
      <article className="rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        {/* Coloured top band */}
        <div className="h-2 w-full rounded-t-3xl bg-gradient-to-r from-violet-500 to-blue-500" />
        <div className="p-8">
          {/* Tags */}
          <div className="mb-4 flex flex-wrap gap-2">
            {(post.tags ?? []).map((tag: string) => (
              <span
                key={tag}
                className="rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700 dark:bg-violet-900/30 dark:text-violet-300"
              >
                #{tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl font-extrabold capitalize leading-tight tracking-tight">
            {post.title}
          </h1>

          {/* Meta row */}
          <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-400">
            <span>📝 Post #{post.id}</span>
            <span>❤️ {likes} likes</span>
            <span>💬 {comments.length} comments</span>
            <span>⏱ ~5 min read</span>
          </div>

          <hr className="my-6 border-slate-100 dark:border-slate-800" />

          <p className="leading-8 text-slate-700 dark:text-slate-300">{post.body}</p>

          {/* Second paragraph (padded body repeated for visual richness) */}
          <p className="mt-4 leading-8 text-slate-500 dark:text-slate-400">
            {post.body} Exploring these ideas further reveals how interconnected modern concepts have become in our rapidly evolving digital landscape.
          </p>
        </div>
      </article>

      {/* ── Comments ── */}
      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">
            💬 Comments <span className="text-slate-400 font-normal text-base">({comments.length})</span>
          </h2>
        </div>

        {comments.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-400 dark:border-slate-800 dark:bg-slate-900">
            No comments yet. Be the first to share your thoughts!
          </div>
        ) : (
          <div className="space-y-4">
            {comments.map((c, i) => {
              const name = c.user?.fullName ?? c.user?.username ?? "Anonymous";
              const initials = name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2);
              const avatarColors = ["bg-violet-500", "bg-sky-500", "bg-emerald-500", "bg-orange-500", "bg-pink-500"];
              return (
                <div
                  key={c.id}
                  className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${avatarColors[i % avatarColors.length]} text-xs font-bold text-white`}>
                    {initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold">{name}</p>
                      {c.likes !== undefined && (
                        <span className="text-xs text-slate-400">❤️ {c.likes}</span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{c.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Leave a comment CTA */}
        <div className="rounded-2xl border border-violet-200 bg-violet-50 p-6 text-center dark:border-violet-800 dark:bg-violet-900/10">
          <p className="font-semibold text-violet-700 dark:text-violet-300">Want to join the conversation?</p>
          <p className="mt-1 text-sm text-slate-500">
            <Link href="/login" className="text-violet-600 underline underline-offset-2 dark:text-violet-400">Sign in</Link> to leave a comment.
          </p>
        </div>
      </section>

      {/* ── Navigation ── */}
      <div className="flex justify-between gap-4">
        {Number(params.id) > 1 && (
          <Link
            href={`/blog/${Number(params.id) - 1}`}
            className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          >
            ← Previous Post
          </Link>
        )}
        <Link
          href={`/blog/${Number(params.id) + 1}`}
          className="ml-auto rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
        >
          Next Post →
        </Link>
      </div>
    </div>
  );
}
