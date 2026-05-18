"use server";

import { Resend } from "resend";
import { contactSchema, type ContactFormValues } from "@/lib/contact-schema";
import { siteConfig } from "@/lib/site";
import bcrypt from "bcryptjs";
import { query } from "@/lib/db";

export type ContactActionResult =
  | { ok: true; channel: "resend" | "mailto" }
  | { ok: false; error: string; fieldErrors?: Partial<Record<keyof ContactFormValues, string>> };

// Simple in-memory rate limiter (per process). Production deployments behind a
// CDN should ideally use a shared store; this still catches obvious abuse.
const recent = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 4;

function rateLimit(key: string) {
  const now = Date.now();
  const hits = (recent.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  recent.set(key, hits);
  return hits.length <= MAX_PER_WINDOW;
}

export async function submitContactForm(
  values: ContactFormValues,
): Promise<ContactActionResult> {
  const parsed = contactSchema.safeParse(values);
  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof ContactFormValues, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof ContactFormValues;
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return {
      ok: false,
      error: "Please fix the highlighted fields.",
      fieldErrors,
    };
  }

  const data = parsed.data;

  // Honeypot — silently succeed without sending anything.
  if (data.website && data.website.length > 0) {
    return { ok: true, channel: "resend" };
  }

  if (!rateLimit(data.email.toLowerCase())) {
    return {
      ok: false,
      error: "You've sent a lot of messages in a short window. Please try again in a minute.",
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? siteConfig.contact.email;
  const from =
    process.env.RESEND_FROM_EMAIL ??
    `${siteConfig.name} <onboarding@resend.dev>`;

  if (!apiKey) {
    return {
      ok: false,
      error:
        "Email delivery is not configured on the server yet. The form has been switched to your email client so you can send the message directly.",
    };
  }

  // Handle registerAccount
  if (data.registerAccount) {
    try {
      const existingUsers = await query('SELECT id FROM users WHERE email = ?', [data.email]) as any[];
      if (existingUsers.length === 0) {
        // Auto-generate a password and hash it
        const generatedPassword = Math.random().toString(36).slice(-10) + "A1!";
        const hashedPassword = await bcrypt.hash(generatedPassword, 10);
        const userId = crypto.randomUUID();
        await query(
          'INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)',
          [userId, data.name, data.email, hashedPassword]
        );
        // Note: In a real app, we would email the user their auto-generated password or send a magic link.
        // For now, we will just proceed with contact form email delivery.
      }
    } catch (dbError) {
      console.error("Account registration failed", dbError);
    }
  }

  try {
    const resend = new Resend(apiKey);
    const subject = `New ${data.inquiryType} inquiry from ${data.name}`;
    const lines = [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      data.phone ? `Phone: ${data.phone}` : null,
      data.organization ? `Organisation: ${data.organization}` : null,
      `Inquiry type: ${data.inquiryType}`,
      "",
      data.message,
    ].filter(Boolean);
    const text = lines.join("\n");
    const html = `<table style="font-family:Inter,Arial,sans-serif;font-size:14px;color:#0f172a;border-collapse:collapse">
        <tbody>
          <tr><td style="padding:8px 0"><strong>Name:</strong> ${escapeHtml(data.name)}</td></tr>
          <tr><td style="padding:8px 0"><strong>Email:</strong> <a href="mailto:${data.email}">${escapeHtml(data.email)}</a></td></tr>
          ${data.phone ? `<tr><td style="padding:8px 0"><strong>Phone:</strong> ${escapeHtml(data.phone)}</td></tr>` : ""}
          ${data.organization ? `<tr><td style="padding:8px 0"><strong>Organisation:</strong> ${escapeHtml(data.organization)}</td></tr>` : ""}
          <tr><td style="padding:8px 0"><strong>Inquiry type:</strong> ${escapeHtml(data.inquiryType)}</td></tr>
          <tr><td style="padding:16px 0 8px 0"><strong>Message:</strong><br><br>${escapeHtml(data.message).replace(/\n/g, "<br>")}</td></tr>
        </tbody>
      </table>`;

    const result = await resend.emails.send({
      from,
      to,
      subject,
      replyTo: data.email,
      text,
      html,
    });
    if (result.error) {
      return {
        ok: false,
        error:
          "We couldn't deliver your message right now. Please try again or email us directly.",
      };
    }
    return { ok: true, channel: "resend" };
  } catch (err) {
    console.error("contact form delivery failed", err);
    return {
      ok: false,
      error:
        "Something went wrong on our side. Please try again in a moment or email us directly.",
    };
  }
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
