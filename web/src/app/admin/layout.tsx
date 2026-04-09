import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "管理后台 | XRUFY",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-stone-100 text-stone-900 antialiased">{children}</div>;
}
