"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { Loader2, Send, CheckCircle2, AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/Button";
import {
  contactSchema,
  inquiryTypes,
  type ContactFormValues,
} from "@/lib/contact-schema";
import { submitContactForm, type ContactActionResult } from "@/app/contact/actions";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/cn";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success"; channel: "resend" | "mailto" }
  | { kind: "error"; message: string };

function planFromQuery(value: string | null): ContactFormValues["inquiryType"] {
  if (!value) return "general";
  if (value === "per-case" || value === "premium" || value === "after-hours")
    return "demo";
  return "general";
}

export function ContactForm() {
  const search = useSearchParams();
  const planParam = search?.get("plan") ?? null;
  const [status, setStatus] = React.useState<Status>({ kind: "idle" });

  const defaultValues = React.useMemo<ContactFormValues>(
    () => ({
      name: "",
      email: "",
      phone: "",
      organization: "",
      inquiryType: planFromQuery(planParam),
      message: planParam ? `I'm interested in the ${planParam} plan. ` : "",
      website: "",
    }),
    [planParam],
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
    getValues,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues,
    mode: "onTouched",
  });

  const onSubmit = handleSubmit(async (values) => {
    setStatus({ kind: "submitting" });
    let result: ContactActionResult;
    try {
      result = await submitContactForm(values);
    } catch {
      result = {
        ok: false,
        error:
          "We couldn't reach the server. Please try again or email us directly.",
      };
    }
    if (result.ok) {
      setStatus({ kind: "success", channel: result.channel });
      reset();
      return;
    }
    if (result.fieldErrors) {
      for (const [k, msg] of Object.entries(result.fieldErrors)) {
        if (msg) {
          setError(k as keyof ContactFormValues, { type: "server", message: msg });
        }
      }
    }
    setStatus({ kind: "error", message: result.error });
  });

  const submitting = status.kind === "submitting";

  if (status.kind === "success") {
    return (
      <div
        role="status"
        className="rounded-3xl border border-brand-teal-100 bg-brand-teal-50 p-8 text-center sm:p-10"
      >
        <CheckCircle2 className="mx-auto size-10 text-brand-teal-600" aria-hidden />
        <h3 className="mt-4 font-display text-2xl font-semibold text-ink-900">
          Thank you — message received.
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-700">
          A member of our team will reach out within one business day. For urgent
          matters, call{" "}
          <a
            className="font-semibold text-brand-blue-700 hover:underline"
            href={`tel:${siteConfig.contact.phone}`}
          >
            {siteConfig.contact.phoneDisplay}
          </a>
          .
        </p>
        <Button
          variant="outline"
          size="md"
          className="mt-6"
          onClick={() => setStatus({ kind: "idle" })}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="space-y-5 rounded-3xl border border-ink-200 bg-white p-6 shadow-soft sm:p-8"
    >
      {/* Honeypot */}
      <div className="hidden" aria-hidden>
        <label>
          Leave this field empty
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("website")}
          />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Full name"
          required
          error={errors.name?.message}
          input={
            <input
              type="text"
              autoComplete="name"
              placeholder="Dr. Helina Tesfaye"
              aria-invalid={!!errors.name}
              {...register("name")}
              className={inputClasses(!!errors.name)}
            />
          }
        />
        <Field
          label="Email"
          required
          error={errors.email?.message}
          input={
            <input
              type="email"
              autoComplete="email"
              placeholder="you@hospital.org"
              aria-invalid={!!errors.email}
              {...register("email")}
              className={inputClasses(!!errors.email)}
            />
          }
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Phone (optional)"
          error={errors.phone?.message}
          input={
            <input
              type="tel"
              autoComplete="tel"
              placeholder="+251 9..."
              {...register("phone")}
              className={inputClasses(!!errors.phone)}
            />
          }
        />
        <Field
          label="Organisation (optional)"
          error={errors.organization?.message}
          input={
            <input
              type="text"
              autoComplete="organization"
              placeholder="Hospital, clinic, or institution"
              {...register("organization")}
              className={inputClasses(!!errors.organization)}
            />
          }
        />
      </div>

      <Field
        label="How can we help?"
        required
        error={errors.inquiryType?.message}
        input={
          <select
            aria-invalid={!!errors.inquiryType}
            {...register("inquiryType")}
            className={cn(inputClasses(!!errors.inquiryType), "appearance-none bg-no-repeat pr-10")}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2364748B' stroke-width='2'><polyline points='6 9 12 15 18 9'/></svg>\")",
              backgroundPosition: "right 1rem center",
              backgroundSize: "1rem",
            }}
          >
            {inquiryTypes.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        }
      />

      <Field
        label="Message"
        required
        error={errors.message?.message}
        input={
          <textarea
            rows={5}
            aria-invalid={!!errors.message}
            placeholder="Tell us about your facility, case volume, and what you'd like to discuss."
            {...register("message")}
            className={inputClasses(!!errors.message, true)}
          />
        }
      />

      {status.kind === "error" ? (
        <div
          role="alert"
          aria-live="polite"
          className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
          <div className="space-y-2">
            <p>{status.message}</p>
            <p>
              You can also email us directly at{" "}
              <a
                className="font-semibold underline"
                href={mailtoHref(getValues())}
              >
                {siteConfig.contact.email}
              </a>
              .
            </p>
          </div>
        </div>
      ) : null}

      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-ink-500">
          By submitting you agree to our{" "}
          <a href="/privacy" className="font-medium text-brand-blue-700 hover:underline">
            Privacy Policy
          </a>
          .
        </p>
        <Button type="submit" size="lg" disabled={submitting}>
          {submitting ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden />
              Sending…
            </>
          ) : (
            <>
              Send message
              <Send className="size-4" aria-hidden />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  required,
  error,
  input,
}: {
  label: string;
  required?: boolean;
  error?: string;
  input: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink-800">
        {label}
        {required ? <span className="ml-1 text-brand-orange-500">*</span> : null}
      </span>
      {input}
      {error ? (
        <span role="alert" className="mt-1.5 block text-xs text-red-600">
          {error}
        </span>
      ) : null}
    </label>
  );
}

function inputClasses(hasError: boolean, textarea = false) {
  return cn(
    "block w-full rounded-xl border bg-white px-4 text-sm text-ink-900 placeholder:text-ink-400 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0",
    textarea ? "py-3" : "h-11",
    hasError
      ? "border-red-300 focus:border-red-500 focus:ring-red-200"
      : "border-ink-200 focus:border-brand-blue-500 focus:ring-brand-blue-200",
  );
}

function mailtoHref(values: Partial<ContactFormValues>) {
  const subject = `Inquiry from ${values.name ?? "website"}`;
  const body = [
    values.message ?? "",
    "",
    values.phone ? `Phone: ${values.phone}` : null,
    values.organization ? `Organisation: ${values.organization}` : null,
  ]
    .filter(Boolean)
    .join("\n");
  const qs = new URLSearchParams({ subject, body }).toString();
  return `mailto:${siteConfig.contact.email}?${qs}`;
}
