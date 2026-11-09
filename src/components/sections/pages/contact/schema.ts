/**
 * Contact form schema, shared by the client form and POST /api/contact.
 * Error messages are stable codes; the client maps them to dictionary strings.
 */
import { z } from "zod";

export const CONTACT_TOPICS = ["sprint", "strategy", "build", "platform", "operations", "adoption", "careers", "other"] as const;

export type ContactErrorCode = "required" | "invalidEmail" | "tooShort" | "tooLong";

const req = (max: number) => z.string().trim().min(1, "required").max(max, "tooLong");

export const contactSchema = z.object({
  name: req(120),
  email: z.string().trim().min(1, "required").max(200, "tooLong").regex(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "invalidEmail"),
  company: z.string().trim().max(160, "tooLong").optional().default(""),
  topic: z.enum(CONTACT_TOPICS, { error: "required" }),
  message: z.string().trim().min(1, "required").min(20, "tooShort").max(5000, "tooLong"),
  consent: z.literal(true, { error: "required" }),
  locale: z.enum(["en", "fr", "de"]).optional().default("en"),
  /** Honeypot: must stay empty. */
  website: z.string().max(0).optional().default(""),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactData = z.output<typeof contactSchema>;
export type ContactField = "name" | "email" | "company" | "topic" | "message" | "consent";

/** Flatten zod issues into { field: code } (first issue per field). */
export function fieldErrors(error: z.ZodError): Partial<Record<ContactField, ContactErrorCode>> {
  const out: Partial<Record<ContactField, ContactErrorCode>> = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as ContactField | undefined;
    if (!key || out[key]) continue;
    const code = issue.message as ContactErrorCode;
    out[key] = (["required", "invalidEmail", "tooShort", "tooLong"] as const).includes(code) ? code : "required";
  }
  return out;
}
