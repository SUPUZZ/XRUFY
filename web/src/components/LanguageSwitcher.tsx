"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { availableLocales, isLocale, languageNames, localePath, type Locale } from "@/lib/localization";

export function LanguageSwitcher({ locale = "en" }: { locale?: Locale }) {
  const pathname = usePathname();
  useEffect(() => {
    // Only a saved, explicit choice redirects the English landing page.
    // Deep links always retain the language present in their URL.
    if (pathname !== "/") return;
    try {
      const saved = localStorage.getItem("xrufy-language");
      if (saved && isLocale(saved) && saved !== "en") {
        window.location.replace(localePath(saved) + window.location.search + window.location.hash);
      }
    } catch { /* Language links remain usable if storage is blocked. */ }
  }, [pathname]);
  return (
    <details className="relative shrink-0">
      <summary className="cursor-pointer list-none rounded-full border border-stone-300 bg-white px-3 py-2 text-sm font-semibold text-stone-800 focus-visible:outline-2 focus-visible:outline-orange-600">
        <span aria-hidden="true">◎ </span>{languageNames[locale]}<span aria-hidden="true"> ▾</span>
      </summary>
      <nav aria-label="Language" className="absolute right-0 z-[60] mt-2 w-44 rounded-xl border border-stone-200 bg-white p-2 shadow-lg">
        {availableLocales(pathname).map(target => <a key={target} href={localePath(target, pathname)} hrefLang={target} lang={target}
          aria-current={target === locale ? "true" : undefined}
          className={`block rounded-lg px-3 py-2 text-sm hover:bg-orange-50 ${target === locale ? "font-bold text-orange-700" : "text-stone-800"}`}
          onClick={event => {
            try { localStorage.setItem("xrufy-language", target); } catch { /* Optional preference. */ }
            event.currentTarget.href = localePath(target, pathname) + window.location.search + window.location.hash;
          }}>{languageNames[target]}</a>)}
      </nav>
    </details>
  );
}
