"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

export type BlogIndexPost = {
  slug: string;
  title: string;
  date: string;
  description: string;
  cover?: string;
  coverAlt?: string;
};

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

function keywordsMatch(post: BlogIndexPost, rawQuery: string): boolean {
  const q = rawQuery.trim().toLowerCase();
  if (!q) return true;
  const slugWords = post.slug.replace(/-/g, " ");
  const haystack = [post.title, post.description, slugWords, post.coverAlt ?? ""].join(" ").toLowerCase();
  const tokens = q.split(/\s+/).filter(Boolean);
  return tokens.every((t) => haystack.includes(t));
}

type Props = {
  posts: BlogIndexPost[];
};

export function BlogIndexClient({ posts }: Props) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => posts.filter((p) => keywordsMatch(p, query)), [posts, query]);

  return (
    <>
      {/* Desktop: keyword filter */}
      <div className="mb-10 hidden md:block">
        <label htmlFor="blog-keyword-filter" className="font-[family-name:var(--font-outfit)] text-sm font-semibold text-stone-900">
          Filter articles
        </label>
        <p className="mt-1 text-sm text-stone-500">
          Type one or more words—matches title, description, or URL slug. All words must match.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <input
            id="blog-keyword-filter"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. steam, safety, cleanup…"
            autoComplete="off"
            className="w-full max-w-md rounded-xl border border-stone-200 bg-white px-4 py-3 text-stone-900 shadow-sm outline-none ring-[#e85d04]/30 transition placeholder:text-stone-400 focus:border-[#e85d04] focus:ring-4"
            aria-controls="blog-post-list"
          />
          <p className="text-sm text-stone-500" aria-live="polite">
            {filtered.length === posts.length
              ? `${posts.length} article${posts.length === 1 ? "" : "s"}`
              : `${filtered.length} of ${posts.length} article${posts.length === 1 ? "" : "s"}`}
          </p>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-2xl border border-stone-200 bg-stone-50 px-6 py-10 text-center text-stone-600" role="status">
          No articles match &ldquo;{query.trim()}&rdquo;.{" "}
          <button
            type="button"
            className="font-semibold text-[#c94f03] underline-offset-2 hover:underline"
            onClick={() => setQuery("")}
          >
            Clear filter
          </button>
        </p>
      ) : (
        <ul id="blog-post-list" className="space-y-12">
          {filtered.map((post) => (
            <li key={post.slug} className="border-b border-stone-200 pb-12 last:border-0">
              <Link
                href={`/blog/${post.slug}`}
                className="group grid gap-6 md:grid-cols-5 md:items-start md:gap-10"
              >
                <div className="md:col-span-2">
                  {post.cover ? (
                    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-stone-200 bg-stone-100 shadow-sm">
                      <Image
                        src={post.cover}
                        alt={post.coverAlt ?? post.title}
                        fill
                        className="object-cover transition duration-300 group-hover:scale-[1.02]"
                        sizes="(max-width: 768px) 100vw, 320px"
                      />
                    </div>
                  ) : (
                    <div className="flex aspect-[16/10] items-center justify-center rounded-2xl border border-dashed border-stone-300 bg-gradient-to-br from-orange-50 to-teal-50">
                      <span className="font-[family-name:var(--font-outfit)] text-2xl font-bold text-stone-300">
                        XRUFY
                      </span>
                    </div>
                  )}
                </div>
                <div className="md:col-span-3">
                  <time className="text-sm font-medium text-stone-400">{formatDate(post.date)}</time>
                  <h2 className="mt-2 font-[family-name:var(--font-outfit)] text-2xl font-bold text-stone-900 group-hover:text-[#c94f03]">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-stone-600 leading-relaxed">{post.description}</p>
                  <span className="mt-4 inline-block text-sm font-semibold text-[#e85d04]">
                    Continue reading →
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
