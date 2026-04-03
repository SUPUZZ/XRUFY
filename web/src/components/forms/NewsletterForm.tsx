"use client";

import { useState } from "react";
import { BRAND_EMAIL } from "@/lib/constants";

type Status = "idle" | "loading" | "success" | "error" | "fallback";

export function NewsletterForm({
  variant = "default",
  onDark = false,
}: {
  variant?: "default" | "compact";
  onDark?: boolean;
}) {
  const [email, setEmail] = useState("");
  const [trap, setTrap] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errMsg, setErrMsg] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (trap) {
      setStatus("success");
      return;
    }
    setStatus("loading");
    setErrMsg("");
    try {
      const res = await fetch("/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "subscribe", email, botcheck: trap }),
      });

      let data: { ok?: boolean; code?: string; error?: string } = {};
      try {
        data = (await res.json()) as typeof data;
      } catch {
        setErrMsg(
          res.status === 502 || res.status === 504
            ? "Cannot reach the form service. From the repo root run npm run dev (starts web + API), then try again."
            : "Unexpected response from server. Please try again or email us.",
        );
        setStatus("error");
        return;
      }

      if (data.code === "NO_BACKEND") {
        setStatus("fallback");
        return;
      }
      if (!res.ok || !data.ok) {
        setErrMsg(data.error ?? "Something went wrong.");
        setStatus("error");
        return;
      }
      setStatus("success");
      setEmail("");
    } catch {
      setErrMsg("Network error—check your connection, or run both web and API (npm run dev).");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="rounded-2xl border border-teal-200 bg-teal-50 px-4 py-3 text-sm font-medium text-teal-900">
        Thanks—you are on the list. Watch your inbox for play ideas and product news.
      </p>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className={`relative ${variant === "compact" ? "space-y-2" : "space-y-3"}`}
    >
      <div className={`flex flex-col gap-2 sm:flex-row ${variant === "compact" ? "sm:gap-2" : "sm:gap-3"}`}>
        <label htmlFor="newsletter-email" className="sr-only">
          Email for updates
        </label>
        <input
          aria-hidden
          tabIndex={-1}
          autoComplete="off"
          value={trap}
          onChange={(e) => setTrap(e.target.value)}
          className="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
        />
        <input
          id="newsletter-email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="min-h-11 flex-1 rounded-full border border-stone-200 bg-white px-5 text-sm text-stone-900 shadow-sm outline-none ring-[#e85d04]/30 placeholder:text-stone-400 focus:border-[#e85d04] focus:ring-2"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full bg-[#e85d04] px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-[#c94f03] disabled:opacity-60"
        >
          {status === "loading" ? "Joining…" : "Subscribe"}
        </button>
      </div>
      {status === "fallback" && (
        <p className={onDark ? "text-sm text-white/80" : "text-sm text-stone-600"}>
          Online signup is not active yet—email{" "}
          <a
            href={`mailto:${BRAND_EMAIL}?subject=Newsletter`}
            className={`font-semibold hover:underline ${onDark ? "text-amber-300" : "text-[#c94f03]"}`}
          >
            {BRAND_EMAIL}
          </a>{" "}
          with subject “Newsletter” and we will add you.
        </p>
      )}
      {status === "error" && (
        <p className={`text-sm ${onDark ? "text-red-200" : "text-red-600"}`}>{errMsg}</p>
      )}
      <p className={`text-xs ${onDark ? "text-white/55" : "text-stone-500"}`}>
        Only if you want them—no spam. Unsubscribe anytime by replying to any email.
      </p>
    </form>
  );
}
