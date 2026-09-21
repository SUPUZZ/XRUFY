"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { localePath, type Locale } from "@/lib/localization";

export function LocalizedBlogList({ posts, locale, search, noResults, read }: {
  posts: { title: string; description: string; slug: string; cover: string }[];
  locale: Locale; search: string; noResults: string; read: string;
}) {
  const [query, setQuery] = useState("");
  const filtered = posts.filter(post => query.trim().toLocaleLowerCase().split(/\s+/).every(word => `${post.title} ${post.description}`.toLocaleLowerCase().includes(word)));
  return <>
    <label className="block font-semibold" htmlFor="article-search">{search}</label>
    <input id="article-search" type="search" value={query} onChange={event => setQuery(event.target.value)} className="my-4 w-full rounded-xl border border-stone-300 bg-white p-3" />
    <div className="grid gap-6 sm:grid-cols-2">
      {filtered.map(post => <Link key={post.slug} href={localePath(locale, `/blog/${post.slug}/`)} className="overflow-hidden rounded-2xl border border-stone-200 bg-white hover:shadow-lg">
        <Image src={post.cover} alt={post.title} width={1200} height={630} className="aspect-[2/1] w-full object-cover" />
        <div className="p-6"><h2 className="text-xl font-bold">{post.title}</h2><p className="mt-3 text-stone-600">{post.description}</p><p className="mt-5 font-semibold text-orange-700">{read} →</p></div>
      </Link>)}
    </div>
    <p aria-live="polite" className="mt-4 text-stone-600">{filtered.length === 0 ? noResults : ""}</p>
  </>;
}
