import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const formSubmissions = pgTable("form_submissions", {
  id: serial("id").primaryKey(),
  formType: varchar("form_type", { length: 32 }).notNull(),
  email: varchar("email", { length: 320 }),
  name: varchar("name", { length: 200 }),
  topic: varchar("topic", { length: 64 }),
  message: text("message"),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).defaultNow().notNull(),
});

export type FormSubmissionInsert = typeof formSubmissions.$inferInsert;
