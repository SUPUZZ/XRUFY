import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { AnimatedSection } from "./AnimatedSection";

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

export function BlogTeaserSection() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <AnimatedSection className="border-b border-stone-200 bg-[#f7f7f5] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal-600">From the blog</p>
            <h2 className="mt-2 font-[family-name:var(--font-outfit)] text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
              Ideas for playtime
            </h2>
            <p className="mt-3 max-w-xl text-lg text-stone-600">
              Short reads for caregivers—STEAM without pressure, cleanup wins, and why open-ended building sticks.
            </p>
          </div>
          <Link
            href="/blog"
            className="shrink-0 self-start rounded-full border-2 border-stone-300 px-5 py-2.5 text-sm font-semibold text-stone-800 transition hover:border-stone-900 sm:self-auto"
          >
            View all articles
          </Link>
        </div>

        <div className="-mx-4 mt-12 sm:-mx-6 md:mx-0">
          <ul
            className="flex max-md:[-ms-overflow-style:none] max-md:[scrollbar-width:none] max-md:[&::-webkit-scrollbar]:hidden snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-visible px-4 pb-1 sm:px-6 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0 md:snap-none"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
          {posts.map((post) => (
            <li
              key={post.slug}
              className="w-[min(85vw,20rem)] shrink-0 snap-start md:w-auto md:min-w-0 md:shrink md:snap-none"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-orange-200/80 hover:shadow-md"
              >
                <div className="relative aspect-[16/10] w-full shrink-0 bg-stone-100">
                  {post.cover ? (
                    <Image
                      src={post.cover}
                      alt={post.coverAlt ?? post.title}
                      fill
                      className="object-cover transition duration-300 group-hover:scale-[1.03]"
                      sizes="(max-width: 767px) 85vw, 320px"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-orange-50 to-teal-50 font-[family-name:var(--font-outfit)] text-lg font-bold text-stone-300">
                      XRUFY
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <time className="text-xs font-semibold uppercase tracking-wide text-stone-400">
                    {formatDate(post.date)}
                  </time>
                  <h3 className="mt-3 font-[family-name:var(--font-outfit)] text-lg font-bold text-stone-900 group-hover:text-[#c94f03]">
                    {post.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600">{post.description}</p>
                  <span className="mt-4 text-sm font-semibold text-[#e85d04]">Read more →</span>
                </div>
              </Link>
            </li>
          ))}
          </ul>
        </div>
      </div>
    </AnimatedSection>
  );
}
