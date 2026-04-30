"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  getFeedbackApiBaseUrl,
  getFeedbackTenantBrand,
  getFeedbackTenantDomain,
} from "@/lib/feedback-api";

type Status = "idle" | "loading" | "success" | "error";

const topics = [
  { value: "general", label: "General question" },
  { value: "order", label: "Order / Amazon" },
  { value: "product", label: "Product & safety" },
  { value: "partnership", label: "Press / partnership" },
];

type FormProps = {
  /** Links the form to page intro copy for screen readers. */
  ariaDescribedBy?: string;
};

export function SupportContactForm({ ariaDescribedBy }: FormProps) {
  const searchParams = useSearchParams();
  const defaultMode = searchParams.get("mode") === "feedback" ? "feedback" : "contact";

  const [mode, setMode] = useState<"contact" | "feedback">(defaultMode);
  const [topic, setTopic] = useState("general");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [trap, setTrap] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errMsg, setErrMsg] = useState("");
  const selectedTopicLabel = topics.find((t) => t.value === topic)?.label ?? topic;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (trap) {
      setStatus("success");
      return;
    }
    setStatus("loading");
    setErrMsg("");
    try {
      const res = await fetch(`${getFeedbackApiBaseUrl()}/api/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brandName: getFeedbackTenantBrand(),
          domain: getFeedbackTenantDomain(),
          email,
          message:
            mode === "contact"
              ? `[topic] ${selectedTopicLabel}\n\n${message}`
              : message,
          source: mode === "feedback" ? "feedback" : "contact",
          metadata: { name },
        }),
      });
      let data: { id?: string; error?: string } = {};
      try {
        data = (await res.json()) as typeof data;
      } catch {
        setErrMsg("Unexpected response from feedback service. Please try again later.");
        setStatus("error");
        return;
      }
      if (!res.ok || !data.id) {
        setErrMsg(data.error ?? "Something went wrong.");
        setStatus("error");
        return;
      }
      setStatus("success");
      setMessage("");
    } catch {
      setErrMsg("Network error. Try again or email us directly.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-teal-200 bg-teal-50 px-4 py-5 text-sm leading-relaxed text-teal-950">
        <p className="font-semibold">Thanks—that’s in our inbox.</p>
        <p className="mt-2 text-teal-900/90">
          We read real messages from families carefully. If you asked something that needs a reply, we’ll get back when
          we can (often a few business days).
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative space-y-4"
      aria-describedby={ariaDescribedBy}
    >
      <p className="text-xs text-stone-500">Switch any time—both go to the same caring team.</p>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setMode("contact")}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
            mode === "contact"
              ? "bg-stone-900 text-white"
              : "bg-stone-100 text-stone-600 hover:bg-stone-200"
          }`}
        >
          Contact
        </button>
        <button
          type="button"
          onClick={() => setMode("feedback")}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
            mode === "feedback"
              ? "bg-stone-900 text-white"
              : "bg-stone-100 text-stone-600 hover:bg-stone-200"
          }`}
        >
          Feedback
        </button>
      </div>

      <input
        aria-hidden
        tabIndex={-1}
        autoComplete="off"
        value={trap}
        onChange={(e) => setTrap(e.target.value)}
        className="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      {mode === "contact" && (
        <div>
          <label htmlFor="topic" className="mb-1.5 block text-sm font-medium text-stone-700">
            Topic
          </label>
          <select
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm text-stone-900 outline-none focus:border-[#e85d04] focus:ring-2 focus:ring-[#e85d04]/25"
          >
            {topics.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label htmlFor="c-name" className="mb-1.5 block text-sm font-medium text-stone-700">
          Name
        </label>
        <input
          id="c-name"
          required
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm text-stone-900 outline-none focus:border-[#e85d04] focus:ring-2 focus:ring-[#e85d04]/25"
        />
      </div>

      <div>
        <label htmlFor="c-email" className="mb-1.5 block text-sm font-medium text-stone-700">
          Email
        </label>
        <input
          id="c-email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm text-stone-900 outline-none focus:border-[#e85d04] focus:ring-2 focus:ring-[#e85d04]/25"
        />
      </div>

      <div>
        <label htmlFor="c-msg" className="mb-1.5 block text-sm font-medium text-stone-700">
          {mode === "feedback" ? "What should we know?" : "How can we help?"}
        </label>
        <textarea
          id="c-msg"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={
            mode === "feedback"
              ? "Ideas for new colors, durability notes, packaging—anything that helps families play better."
              : "Include your Amazon order ID if this is about a purchase."
          }
          className="w-full resize-y rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm text-stone-900 outline-none focus:border-[#e85d04] focus:ring-2 focus:ring-[#e85d04]/25"
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full bg-[#e85d04] py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#c94f03] disabled:opacity-60 sm:w-auto sm:px-10"
      >
        {status === "loading" ? "Sending…" : "Send message"}
      </button>

      {status === "error" && <p className="text-sm text-red-600">{errMsg}</p>}
    </form>
  );
}
