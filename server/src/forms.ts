const WEB3FORMS_URL = "https://api.web3forms.com/submit";

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

type Body = {
  type?: string;
  botcheck?: string;
  email?: string;
  name?: string;
  message?: string;
  topic?: string;
};

export type FormResult = { status: number; body: Record<string, unknown> };

export type ParsedOk =
  | { formType: "subscribe"; email: string }
  | {
      formType: "contact" | "feedback";
      email: string;
      name: string;
      message: string;
      topicKey: string | undefined;
      topicLabel: string;
    };

export type ParseResult =
  | { kind: "bot" }
  | { kind: "invalid"; result: FormResult }
  | { kind: "ok"; data: ParsedOk };

function topicLabelForContact(topic: string | undefined, type: "contact" | "feedback"): string {
  if (type === "feedback") return "Feedback";
  if (topic === "order") return "Order / Amazon";
  if (topic === "product") return "Product question";
  if (topic === "partnership") return "Partnership / press";
  return "General";
}

export function parseFormBody(body: unknown): ParseResult {
  if (!body || typeof body !== "object") {
    return { kind: "invalid", result: { status: 400, body: { ok: false, error: "Invalid JSON" } } };
  }

  const b = body as Body;

  if (b.botcheck) {
    return { kind: "bot" };
  }

  const { type, email, name, message, topic } = b;

  if (type === "subscribe") {
    if (!email || !isValidEmail(email)) {
      return {
        kind: "invalid",
        result: { status: 400, body: { ok: false, error: "Valid email required." } },
      };
    }
    return { kind: "ok", data: { formType: "subscribe", email } };
  }

  if (type === "contact" || type === "feedback") {
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return { kind: "invalid", result: { status: 400, body: { ok: false, error: "Name required." } } };
    }
    if (!email || !isValidEmail(email)) {
      return {
        kind: "invalid",
        result: { status: 400, body: { ok: false, error: "Valid email required." } },
      };
    }
    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return {
        kind: "invalid",
        result: {
          status: 400,
          body: { ok: false, error: "Please write a bit more detail (10+ characters)." },
        },
      };
    }

    const topicLabel = topicLabelForContact(topic, type);
    const topicKey = type === "feedback" ? "feedback" : topic;

    return {
      kind: "ok",
      data: {
        formType: type,
        email,
        name,
        message,
        topicKey,
        topicLabel,
      },
    };
  }

  return {
    kind: "invalid",
    result: { status: 400, body: { ok: false, error: "Unknown form type." } },
  };
}

export async function submitParsedToWeb3(data: ParsedOk, web3Key: string): Promise<FormResult> {
  if (data.formType === "subscribe") {
    const res = await fetch(WEB3FORMS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: web3Key,
        subject: "[XRUFY] Newsletter subscription",
        name: "Newsletter",
        email: data.email,
        message: `Newsletter signup request from: ${data.email}`,
      }),
    });
    const json = (await res.json()) as { success?: boolean; message?: string };
    if (!json.success) {
      return { status: 502, body: { ok: false, error: json.message ?? "Delivery failed." } };
    }
    return { status: 200, body: { ok: true } };
  }

  const subject =
    data.formType === "feedback"
      ? "[XRUFY] Product feedback"
      : `[XRUFY] Contact — ${data.topicLabel}`;

  const res = await fetch(WEB3FORMS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      access_key: web3Key,
      subject,
      name: data.name.trim(),
      email: data.email,
      message: `Topic: ${data.topicLabel}\n\n${data.message.trim()}`,
    }),
  });
  const json = (await res.json()) as { success?: boolean; message?: string };
  if (!json.success) {
    return { status: 502, body: { ok: false, error: json.message ?? "Delivery failed." } };
  }
  return { status: 200, body: { ok: true } };
}

/** @deprecated Use parseFormBody + DB + submitParsedToWeb3 in the route handler. */
export async function handleFormsPost(body: unknown, web3Key: string | undefined): Promise<FormResult> {
  const parsed = parseFormBody(body);
  if (parsed.kind === "bot") return { status: 200, body: { ok: true } };
  if (parsed.kind === "invalid") return parsed.result;
  if (!web3Key) {
    return {
      status: 503,
      body: { ok: false, code: "NO_BACKEND", error: "Form handler not configured on the server." },
    };
  }
  return submitParsedToWeb3(parsed.data, web3Key);
}
