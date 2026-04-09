"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AMAZON_PRODUCT_URL } from "@/lib/constants";

/** Top bar = site-wide routes only. In-page jumps stay in the footer / hero CTAs — not here. */
const mainNav = [
  { href: "/about", label: "About", match: (p: string) => p === "/about" },
  { href: "/blog", label: "Blog", match: (p: string) => p.startsWith("/blog") },
  { href: "/support", label: "Support", match: (p: string) => p.startsWith("/support") },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-[#f7f7f5]/95 backdrop-blur-md">
      <div className="mx-auto flex h-[3.75rem] max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
        <Link
          href="/"
          className="shrink-0 font-[family-name:var(--font-outfit)] text-xl font-extrabold tracking-tight text-stone-900"
          onClick={close}
        >
          XRUFY
        </Link>

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Main menu"
        >
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={item.match(pathname) ? "page" : undefined}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                item.match(pathname)
                  ? "bg-stone-900 text-white"
                  : "text-stone-700 hover:bg-stone-200/60 hover:text-stone-900"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={AMAZON_PRODUCT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#e85d04] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#c94f03]"
          >
            Shop on Amazon
          </a>
        </div>

        <button
          type="button"
          className="flex size-11 shrink-0 flex-col items-center justify-center gap-1.5 rounded-lg border border-stone-200 bg-white/90 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`block h-0.5 w-5 rounded-full bg-stone-900 transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 w-5 rounded-full bg-stone-900 transition-opacity ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-5 rounded-full bg-stone-900 transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`border-t border-stone-200 bg-[#f7f7f5] px-4 py-4 lg:hidden ${open ? "block" : "hidden"}`}
      >
        <nav aria-label="Main menu">
          <ul className="flex flex-col gap-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={item.match(pathname) ? "page" : undefined}
                  className={`block rounded-xl px-4 py-3 text-base font-semibold ${
                    item.match(pathname) ? "bg-stone-900 text-white" : "text-stone-800 hover:bg-stone-200/50"
                  }`}
                  onClick={close}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={AMAZON_PRODUCT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex w-full items-center justify-center rounded-full bg-[#e85d04] px-5 py-3 text-sm font-semibold text-white"
            onClick={close}
          >
            Shop on Amazon
          </a>
        </nav>
      </div>
    </header>
  );
}
