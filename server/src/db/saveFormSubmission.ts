import type { ParsedOk } from "../forms.js";
import { db } from "./client.js";
import { formSubmissions } from "./schema.js";

export async function saveFormSubmission(data: ParsedOk): Promise<void> {
  if (!db) return;

  if (data.formType === "subscribe") {
    await db.insert(formSubmissions).values({
      formType: "subscribe",
      email: data.email,
      name: null,
      topic: null,
      message: null,
    });
    return;
  }

  await db.insert(formSubmissions).values({
    formType: data.formType,
    email: data.email,
    name: data.name.trim(),
    topic: data.topicKey ?? null,
    message: data.message.trim(),
  });
}
