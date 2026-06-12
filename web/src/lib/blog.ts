import fs from "fs";
import matter from "gray-matter";
import path from "path";

const POSTS_DIR = path.join(process.cwd(), "content/blog");

export type PostFrontmatter = {
  title: string;
  date: string;
  description: string;
  cover?: string;
  /** Short alt text for the cover (defaults to title if omitted). */
  coverAlt?: string;
  author?: string;
  /** ISO date string for the last modification (optional, defaults to `date`). */
  lastModified?: string;
};

export type PostSummary = PostFrontmatter & { slug: string };

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getAllPosts(): PostSummary[] {
  const slugs = getAllPostSlugs();
  const posts = slugs.map((slug) => {
    const raw = fs.readFileSync(path.join(POSTS_DIR, `${slug}.md`), "utf8");
    const { data } = matter(raw);
    const d = data as PostFrontmatter;
    return { slug, ...d };
  });
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): { slug: string; meta: PostFrontmatter; content: string } | null {
  const file = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return { slug, meta: data as PostFrontmatter, content };
}
