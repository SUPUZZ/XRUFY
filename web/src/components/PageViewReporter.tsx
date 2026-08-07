"use client";

import { useCallback, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { reportPageView, reportPageViewDuration } from "@/lib/pageview-api";

type ActivePageView = {
  id: string;
  enteredAt: number;
  lastReportedDuration: number;
};

/**
 * Fire-and-forget client component that reports a page view to the analytics
 * API on mount and whenever the route pathname changes.
 *
 * Mount in the root layout — it never renders any visible UI.
 */
export function PageViewReporter() {
  const pathname = usePathname();
  const reportedRef = useRef<string | null>(null);
  const activePageViewRef = useRef<ActivePageView | null>(null);

  const reportActiveDuration = useCallback(() => {
    const activePageView = activePageViewRef.current;
    if (!activePageView) return;

    const duration = Math.max(1, Math.round((Date.now() - activePageView.enteredAt) / 1000));
    if (duration <= activePageView.lastReportedDuration) return;

    activePageView.lastReportedDuration = duration;
    void reportPageViewDuration(activePageView.id, duration);
  }, []);

  useEffect(() => {
    const reportOnPageExit = () => reportActiveDuration();
    const reportWhenHidden = () => {
      if (document.visibilityState === "hidden") reportOnPageExit();
    };

    document.addEventListener("visibilitychange", reportWhenHidden);
    window.addEventListener("pagehide", reportOnPageExit);

    return () => {
      document.removeEventListener("visibilitychange", reportWhenHidden);
      window.removeEventListener("pagehide", reportOnPageExit);
    };
  }, [reportActiveDuration]);

  useEffect(() => {
    // Include search / hash from the live URL (static-export SPA navigations
    // may alter the query string without a full React render cycle).
    const search = window.location.search;
    const fullPath = pathname + search;

    // Avoid duplicate reports for the same full path (e.g. React strict mode double-mount in dev)
    if (reportedRef.current === fullPath) return;
    reportedRef.current = fullPath;

    reportActiveDuration();
    activePageViewRef.current = null;

    const enteredAt = Date.now();
    let routeChanged = false;
    void reportPageView().then((pageView) => {
      if (!pageView) return;

      if (routeChanged) {
        const duration = Math.max(1, Math.round((Date.now() - enteredAt) / 1000));
        void reportPageViewDuration(pageView.id, duration);
        return;
      }

      activePageViewRef.current = {
        id: pageView.id,
        enteredAt,
        lastReportedDuration: 0,
      };

      if (document.visibilityState === "hidden") reportActiveDuration();
    });

    return () => {
      routeChanged = true;
      reportActiveDuration();
      activePageViewRef.current = null;
    };
  }, [pathname, reportActiveDuration]);

  return null;
}
