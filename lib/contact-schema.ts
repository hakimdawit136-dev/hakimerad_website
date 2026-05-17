import { z } from "zod";

export const inquiryTypes = [
  { value: "general", label: "General inquiry" },
  { value: "demo", label: "Schedule a demo" },
  { value: "partnership", label: "Partnership opportunity" },
  { value: "support", label: "Technical support" },
  { value: "careers", label: "Careers" },
] as const;

export type InquiryType = (typeof inquiryTypes)[number]["value"];

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your full name."),
  email: z.string().email("Please enter a valid email address."),
  phone: z
    .string()
    .max(40)
    .optional()
    .or(z.literal("")),
  organization: z.string().max(120).optional().or(z.literal("")),
  inquiryType: z.enum(
    inquiryTypes.map((t) => t.value) as [InquiryType, ...InquiryType[]],
  ),
  message: z
    .string()
    .min(20, "Please add a few sentences about how we can help (20+ characters).")
    .max(2000, "Please keep messages under 2000 characters."),
  // Honeypot — must remain empty.
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
