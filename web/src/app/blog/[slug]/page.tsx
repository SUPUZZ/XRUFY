import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogMarkdown } from "@/components/BlogMarkdown";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Not found" };
  const og = post.meta.cover
    ? { images: [{ url: post.meta.cover, alt: post.meta.coverAlt ?? post.meta.title }] }
    : undefined;
  return {
    title: post.meta.title,
    description: post.meta.description,
    openGraph: og,
    twitter: og ? { card: "summary_large_image", images: [post.meta.cover!] } : undefined,
  };
}

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

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { meta, content } = post;

  return (
    <>
      <Header />
      <main className="flex-1">
        <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
          <Link href="/blog" className="text-sm font-semibold text-[#e85d04] hover:underline">
            ← All articles
          </Link>
          {meta.cover ? (
            <figure className="mt-8">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-stone-200 bg-stone-100 shadow-sm sm:aspect-[2/1]">
                <Image
                  src={meta.cover}
                  alt={meta.coverAlt ?? meta.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 768px"
                  priority
                />
              </div>
            </figure>
          ) : null}
          <header className="mt-8 border-b border-stone-200 pb-10">
            <time className="text-sm font-medium text-stone-400">{formatDate(meta.date)}</time>
            <h1 className="mt-2 font-[family-name:var(--font-outfit)] text-4xl font-extrabold tracking-tight text-stone-900 sm:text-[2.75rem] sm:leading-tight">
              {meta.title}
            </h1>
            <p className="mt-4 text-lg text-stone-600 leading-relaxed">{meta.description}</p>
            {meta.author && <p className="mt-6 text-sm font-medium text-stone-500">By {meta.author}</p>}
          </header>
          <div className="pt-10">
            <BlogMarkdown content={content} />
          </div>
          <footer className="mt-16 rounded-2xl border border-stone-200 bg-[#f7f7f5] p-6 sm:p-8">
            <p className="font-[family-name:var(--font-outfit)] text-lg font-bold text-stone-900">Keep exploring</p>
            <p className="mt-2 text-sm text-stone-600">
              Questions or ideas for the next article? We read every message on the Support page.
            </p>
            <Link
              href="/support"
              className="mt-4 inline-flex rounded-full bg-[#e85d04] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#c94f03]"
            >
              Contact &amp; feedback
            </Link>
          </footer>
        </article>
      </main>
      <Footer />
    </>
  );
}
