"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { reportPageView } from "@/lib/pageview-api";

/**
 * Fire-and-forget client component that reports a page view to the analytics
 * API on mount and whenever the route pathname changes.
 *
 * Mount in the root layout — it never renders any visible UI.
 */
export function PageViewReporter() {
  const pathname = usePathname();
  const reportedRef = useRef<string | null>(null);

  useEffect(() => {
    // Include search / hash from the live URL (static-export SPA navigations
    // may alter the query string without a full React render cycle).
    const search = window.location.search;
    const fullPath = pathname + search;

    // Avoid duplicate reports for the same full path (e.g. React strict mode double-mount in dev)
    if (reportedRef.current === fullPath) return;
    reportedRef.current = fullPath;

    reportPageView();
  }, [pathname]);

  return null;
}
