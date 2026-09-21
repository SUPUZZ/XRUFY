import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    template: "%s — XRUFY Journal",
    default: "Journal",
  },
  description: "Play ideas, STEAM tips, and family routines from the XRUFY team.",
};

export default function BlogLayout({ children }: { children: ReactNode }) {
  return children;
}
