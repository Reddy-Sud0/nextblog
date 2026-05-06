"use client";

export default function Error({ error }: { error: Error }) {
  return <p className="py-8 text-sm text-red-600">Error: {error.message}</p>;
}
