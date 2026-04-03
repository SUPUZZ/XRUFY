import type { Metadata } from "next";
import { BlogIndexClient } from "@/components/BlogIndexClient";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Journal",
  description: "Articles on open-ended play, STEAM at home, and real-life routines with construction toys.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const forClient = posts.map(({ slug, title, date, description, cover, coverAlt }) => ({
    slug,
    title,
    date,
    description,
    cover,
    coverAlt,
  }));

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="border-b border-stone-200 bg-white px-4 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#e85d04]">XRUFY Journal</p>
            <h1 className="mt-3 font-[family-name:var(--font-outfit)] text-4xl font-extrabold tracking-tight text-stone-900 sm:text-5xl">
              Ideas worth building on
            </h1>
            <p className="mt-4 text-lg text-stone-600">
              Practical notes for caregivers—short reads you can finish while the kettle boils.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
          <BlogIndexClient posts={forClient} />
        </section>
      </main>
      <Footer />
    </>
  );
}
