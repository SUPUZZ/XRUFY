"use client";

import { useState } from "react";
import {
  getFeedbackApiBaseUrl,
  getFeedbackTenantBrand,
  getFeedbackTenantDomain,
} from "@/lib/feedback-api";

type Status = "idle" | "loading" | "success" | "error";

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
      const res = await fetch(`${getFeedbackApiBaseUrl()}/api/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brandName: getFeedbackTenantBrand(),
          domain: getFeedbackTenantDomain(),
          email,
        }),
      });

      let data: { status?: string; error?: string } = {};
      try {
        data = (await res.json()) as typeof data;
      } catch {
        setErrMsg("Unexpected response from subscribe service. Please try again later.");
        setStatus("error");
        return;
      }

      if (!res.ok || data.status !== "ACTIVE") {
        setErrMsg(data.error ?? "Something went wrong.");
        setStatus("error");
        return;
      }
      setStatus("success");
      setEmail("");
    } catch {
      setErrMsg("Network error—check your connection and try again.");
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
      {status === "error" && (
        <p className={`text-sm ${onDark ? "text-red-200" : "text-red-600"}`}>{errMsg}</p>
      )}
      <p className={`text-xs ${onDark ? "text-white/55" : "text-stone-500"}`}>
        Only if you want them—no spam. Unsubscribe anytime by replying to any email.
      </p>
    </form>
  );
}
