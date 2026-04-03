import type { Metadata } from "next";
import { DM_Sans, Outfit } from "next/font/google";
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

export const metadata: Metadata = {
  title: {
    default: "XRUFY — Build What You Imagine",
    template: "%s — XRUFY",
  },
  description:
    "XRUFY — interlocking construction blocks for curious kids. Build, learn, and play with educational preschool toys.",
  openGraph: {
    title: "XRUFY — Build What You Imagine",
    description:
      "Interlocking STEAM construction set for preschoolers. Colorful blocks, figures & pets—shop on Amazon.",
    type: "website",
  },
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
