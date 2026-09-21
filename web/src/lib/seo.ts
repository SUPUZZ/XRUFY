/**
 * Canonical site URL for Open Graph, JSON-LD, and sitemap-style links.
 * Set NEXT_PUBLIC_SITE_URL in production (e.g. https://www.yourbrand.com).
 */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "https://xrufy.com";
}

export const SITE_NAME = "XRUFY";

/** Google-style title: primary keyword + brand; keep under ~60 chars where possible */
export const HOME_TITLE =
  "XRUFY Building Blocks for Kids | STEAM Interlocking Toys Ages 3–8 | Amazon USA";

/** Meta description: benefits + intent (Amazon, preschool STEAM); ~150–160 chars ideal */
export const HOME_DESCRIPTION =
    "XRUFY interlocking construction blocks for preschoolers: 100+ STEAM pieces, figures, storage & guide. Snap-together educational toys for ages 3–8. Official site—buy on Amazon with fast USA & Canada shipping.";

export const SEO_KEYWORDS = [
  "XRUFY",
  "interlocking building blocks",
  "construction toys for kids",
  "STEAM toys preschool",
  "educational toys ages 3-8",
  "Amazon building blocks",
  "preschool construction set",
  "snap together blocks",
  "STEM toys for preschoolers",
  "building blocks for 3 year olds",
  "building blocks for 4 year olds",
  "building blocks for 5 year olds",
  "kids construction toys USA",
  "preschool STEAM toys Amazon",
  "open-ended play toys",
  "fine motor skills toys",
  "creative building toys for kids",
  "interlocking bricks for toddlers",
  "educational building sets",
  "toy building blocks with storage",
  "preschool learning toys United States",
  "best building toys for preschoolers",
] as const;
