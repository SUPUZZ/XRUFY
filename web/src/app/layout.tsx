import type { Metadata } from "next";
import { DM_Sans, Outfit } from "next/font/google";
import { GALLERY_IMAGES } from "@/lib/constants";
import {
  getSiteUrl,
  HOME_DESCRIPTION,
  HOME_TITLE,
  SEO_KEYWORDS,
  SITE_NAME,
} from "@/lib/seo";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const siteUrl = getSiteUrl();
const defaultOgImage = GALLERY_IMAGES[0]?.src ?? `${siteUrl}/family-scene-north-american.png`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: HOME_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: HOME_DESCRIPTION,
  keywords: [...SEO_KEYWORDS],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: SITE_NAME,
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: [
      {
        url: defaultOgImage,
        width: 1500,
        height: 1500,
        alt: GALLERY_IMAGES[0]?.alt ?? `${SITE_NAME} STEAM building blocks for kids`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: [defaultOgImage],
  },
  alternates: {
    canonical: "/",
  },
  category: "toys",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${dmSans.variable} h-full scroll-smooth`}>
      <body className="min-h-full bg-[#f7f7f5] font-[family-name:var(--font-dm-sans)] text-stone-900 antialiased">
        {/* Flex lives here—not on <body>—so Next.js devtools' <nextjs-portal> is not a flex sibling (next.js#70675). */}
        <div className="flex min-h-full flex-col">{children}</div>
      </body>
    </html>
  );
}
