"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { localePath, routeWithoutLocale, type Locale } from "@/lib/localization";
import { useState } from "react";
import { AMAZON_PRODUCT_URL } from "@/lib/constants";

/** Top bar = site-wide routes only. In-page jumps stay in the footer / hero CTAs — not here. */
const mainNav = [
  { href: "/", label: "Home", match: (p: string) => p === "/" },
  { href: "/blog", label: "Blog", match: (p: string) => p.startsWith("/blog") },
  { href: "/support", label: "Support", match: (p: string) => p.startsWith("/support") },
  { href: "/about", label: "About", match: (p: string) => p === "/about" },
] as const;

export function Header({ locale = "en", labels = ["Home", "Blog", "Support", "About", "Shop on Amazon", "Main menu", "Close menu", "Open menu"] }: { locale?: Locale; labels?: string[] }) {
  const [open, setOpen] = useState(false);
  const pathname = routeWithoutLocale(usePathname()).replace(/\/$/, "") || "/";
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-[#f7f7f5]/95 backdrop-blur-md">
      <div className="mx-auto flex h-[3.75rem] max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
        <Link
          href={localePath(locale)}
          className="shrink-0 font-[family-name:var(--font-outfit)] text-xl font-extrabold tracking-tight text-stone-900"
          onClick={close}
        >
          XRUFY
        </Link>

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label={labels[5]}
        >
          {mainNav.map((item, index) => (
            <Link
              key={item.href}
              href={localePath(locale, item.href)}
              aria-current={item.match(pathname) ? "page" : undefined}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                item.match(pathname)
                  ? "bg-stone-900 text-white"
                  : "text-stone-700 hover:bg-stone-200/60 hover:text-stone-900"
              }`}
            >
              {labels[index]}
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
            {labels[4]}
          </a>
        </div>

        <LanguageSwitcher locale={locale} />
        <button
          type="button"
          className="flex size-11 shrink-0 flex-col items-center justify-center gap-1.5 rounded-lg border border-stone-200 bg-white/90 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? labels[6] : labels[7]}
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
        <nav aria-label={labels[5]}>
          <ul className="flex flex-col gap-1">
            {mainNav.map((item, index) => (
              <li key={item.href}>
                <Link
                  href={localePath(locale, item.href)}
                  aria-current={item.match(pathname) ? "page" : undefined}
                  onClick={close}
                  className={`block rounded-xl px-4 py-3 text-base font-semibold ${
                    item.match(pathname) ? "bg-stone-900 text-white" : "text-stone-800 hover:bg-stone-200/50"
                  }`}
                >
                  {labels[index]}
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
            {labels[4]}
          </a>
        </nav>
      </div>
    </header>
  );
}
