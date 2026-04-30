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
import appleTouchIcon from "@/resource/favicons/apple-touch-icon.png";
import favicon16 from "@/resource/favicons/favicon-16x16.png";
import favicon32 from "@/resource/favicons/favicon-32x32.png";
import favicon48 from "@/resource/favicons/favicon-48x48.png";
import favicon96 from "@/resource/favicons/favicon-96x96.png";
import icon192 from "@/resource/favicons/icon-192x192.png";
import icon512 from "@/resource/favicons/icon-512x512.png";
import iconXrufy from "@/resource/favicons/icon_xrufy.svg";
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
  icons: {
    icon: [
      { url: iconXrufy.src, type: "image/svg+xml" },
      { url: favicon16.src, sizes: "16x16", type: "image/png" },
      { url: favicon32.src, sizes: "32x32", type: "image/png" },
      { url: favicon48.src, sizes: "48x48", type: "image/png" },
      { url: favicon96.src, sizes: "96x96", type: "image/png" },
      { url: icon192.src, sizes: "192x192", type: "image/png" },
      { url: icon512.src, sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: appleTouchIcon.src, sizes: "180x180", type: "image/png" }],
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
