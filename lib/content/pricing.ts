export type PricingPlan = {
  slug: string;
  name: string;
  description: string;
  priceLabel: string;
  priceSuffix?: string;
  featured?: boolean;
  features: { included: boolean; label: string }[];
  cta: { label: string; href: string };
};

export const pricingPlans: PricingPlan[] = [
  {
    slug: "per-case",
    name: "Per-Case",
    description:
      "Pay only for the reports you need. Ideal for facilities with fluctuating or low case volumes.",
    priceLabel: "Pay-as-you-go",
    features: [
      { included: true, label: "Access to our radiologist network" },
      { included: true, label: "Standard report turnaround times" },
      { included: true, label: "Secure DICOM image submission" },
      { included: true, label: "Pay only for what you use" },
      { included: false, label: "AI-powered worklist prioritisation" },
      { included: false, label: "24/7 STAT reporting under 30 min" },
    ],
    cta: { label: "Request a quote", href: "/contact?plan=per-case" },
  },
  {
    slug: "premium",
    name: "Premium Partnership",
    description:
      "A comprehensive 24/7 teleradiology solution with dedicated support and full platform access.",
    priceLabel: "Custom flat rate",
    priceSuffix: "/ month",
    featured: true,
    features: [
      { included: true, label: "24/7/365 coverage" },
      { included: true, label: "STAT reports in under 30 minutes" },
      { included: true, label: "Full AI-powered RIS / PACS access" },
      { included: true, label: "Sub-specialty consultations" },
      { included: true, label: "Dedicated account manager" },
      { included: true, label: "EHR / HIS integration" },
    ],
    cta: { label: "Schedule consultation", href: "/contact?plan=premium" },
  },
  {
    slug: "after-hours",
    name: "After-Hours Coverage",
    description:
      "Ensure timely patient care during nights, weekends, and holidays without staffing overhead.",
    priceLabel: "Fixed monthly fee",
    features: [
      { included: true, label: "Overnight & weekend coverage" },
      { included: true, label: "STAT and routine reporting" },
      { included: true, label: "Access to our radiologist network" },
      { included: true, label: "Secure cloud-based platform" },
      { included: false, label: "Sub-specialty consultations" },
      { included: false, label: "EHR / HIS integration" },
    ],
    cta: { label: "Request a quote", href: "/contact?plan=after-hours" },
  },
];
