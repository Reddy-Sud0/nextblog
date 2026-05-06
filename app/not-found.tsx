import Link from "next/link";

export default function NotFound() {
  return (
    <section className="space-y-2 py-8">
      <h1 className="text-2xl font-semibold">404 - Not Found</h1>
      <Link href="/" className="text-blue-600">
        Back to home
      </Link>
    </section>
  );
}
