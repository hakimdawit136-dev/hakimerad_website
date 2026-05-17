import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Brain,
  Cloud,
  Headphones,
  Server,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Workflow,
} from "lucide-react";

export type Service = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  highlights: string[];
  body: {
    overview: string;
    capabilities: { title: string; description: string }[];
    benefits: string[];
  };
  metadata: {
    title: string;
    description: string;
  };
};

export const services: Service[] = [
  {
    slug: "teleradiology-reporting",
    name: "Routine Teleradiology Reporting",
    tagline: "X-ray, CT, MRI, Ultrasound — interpreted by certified radiologists.",
    description:
      "Expert interpretation for every modality with 24/7 availability and bilingual reports in Amharic and English.",
    icon: Headphones,
    highlights: [
      "Preliminary report in under 30 minutes for stat cases",
      "Final reports delivered within agreed SLAs",
      "Bilingual reporting: Amharic + English",
      "Board-certified radiologists on call 24/7/365",
    ],
    body: {
      overview:
        "Our core teleradiology service connects your facility to a vetted network of board-certified radiologists. We cover all major imaging modalities and offer flexible turnaround times tailored to your clinical needs.",
      capabilities: [
        {
          title: "All modalities supported",
          description:
            "X-ray, CT, MRI, Ultrasound, Mammography, Fluoroscopy, and Nuclear Medicine — interpreted by sub-specialists when needed.",
        },
        {
          title: "Stat cases under 30 minutes",
          description:
            "Critical findings escalated to a senior radiologist for immediate verbal communication to your treating team.",
        },
        {
          title: "Bilingual reporting",
          description:
            "Reports issued in Amharic or English (or both) to fit your downstream documentation workflow.",
        },
      ],
      benefits: [
        "Reduce backlog without hiring full-time radiologists",
        "Predictable per-case or subscription pricing",
        "Audit trail and structured reports as a baseline",
      ],
    },
    metadata: {
      title: "Routine Teleradiology Reporting",
      description:
        "24/7 teleradiology interpretation for X-ray, CT, MRI, Ultrasound and more — bilingual reports delivered fast by board-certified radiologists.",
    },
  },
  {
    slug: "subspecialty-consultations",
    name: "Subspecialty Consultations",
    tagline: "Neuro, MSK, pediatric, cardiothoracic, women's imaging — on demand.",
    description:
      "Access certified subspecialists for second reads, complex cases, and STAT priority routing.",
    icon: Stethoscope,
    highlights: [
      "Neuroradiology, pediatric, MSK, body, breast, cardiothoracic",
      "Second-read & quality assurance workflows",
      "Priority STAT routing for time-critical cases",
      "Tumor board–ready structured reports",
    ],
    body: {
      overview:
        "When a case calls for a sub-specialist's eye, our routing engine sends it to the right radiologist — fast. You get focused expertise without the overhead of maintaining a multi-disciplinary team in-house.",
      capabilities: [
        {
          title: "Sub-specialist network",
          description:
            "A curated network of certified sub-specialists across neuro, MSK, pediatric, body, breast, and cardiothoracic imaging.",
        },
        {
          title: "Second-read & QA",
          description:
            "Add a layer of quality assurance with peer review and discrepancy tracking.",
        },
        {
          title: "Tumor-board ready",
          description:
            "Structured reports that drop cleanly into multi-disciplinary case discussions.",
        },
      ],
      benefits: [
        "Get the right specialist on the right case, every time",
        "Reduce diagnostic discrepancies through structured QA",
        "Strengthen confidence in complex or borderline findings",
      ],
    },
    metadata: {
      title: "Subspecialty Radiology Consultations",
      description:
        "On-demand access to certified neuro, MSK, pediatric, body, breast, and cardiothoracic subspecialists for second reads and complex case routing.",
    },
  },
  {
    slug: "ai-image-analysis",
    name: "AI-Augmented Image Analysis",
    tagline: "Worklist triage, second-reader assistance, and quality assurance.",
    description:
      "FDA-aligned AI tools triage critical findings, surface incidental observations, and support every radiologist on every shift.",
    icon: Brain,
    highlights: [
      "Critical-finding triage (PE, ICH, pneumothorax, fractures)",
      "Incidental finding prompts to reduce miss rates",
      "Continuous QA scoring on every report",
      "Auditable AI provenance on every result",
    ],
    body: {
      overview:
        "AI never replaces a radiologist — it amplifies one. Our orchestrated AI layer prioritises the worklist, prompts on commonly missed findings, and quietly grades every report for QA. You see only signal; the noise stays out of view.",
      capabilities: [
        {
          title: "Triage & prioritisation",
          description:
            "Models flag critical findings (PE, ICH, pneumothorax, large fractures) and bump them to the top of the worklist within seconds of ingestion.",
        },
        {
          title: "Second-reader prompts",
          description:
            "Optional non-blocking prompts surface commonly missed incidental findings during read time.",
        },
        {
          title: "Continuous QA",
          description:
            "Every report gets a quiet AI-graded QA score; outliers are routed to peer review automatically.",
        },
      ],
      benefits: [
        "Cut time-to-critical-result by up to 65%",
        "Reduce miss rate on incidentals",
        "Defensible audit trail for every AI-touched study",
      ],
    },
    metadata: {
      title: "AI-Augmented Image Analysis",
      description:
        "AI-assisted worklist triage, second-reader prompts, and continuous QA — built to amplify your radiologists, not replace them.",
    },
  },
  {
    slug: "pacs-ris-platform",
    name: "Cloud-Native PACS / RIS Platform",
    tagline: "Secure, modality-agnostic, integration-ready.",
    description:
      "Hosted PACS/RIS with AES-256 encryption, DICOM & HL7/FHIR connectivity, and a streaming web viewer that runs anywhere.",
    icon: Cloud,
    highlights: [
      "AES-256 encryption at rest and TLS 1.3 in transit",
      "DICOM, HL7 v2, and FHIR R4 connectors",
      "Zero-footprint web viewer for radiologists",
      "Role-based access control with full audit logs",
    ],
    body: {
      overview:
        "A modern, cloud-hosted platform that handles ingestion, storage, viewing, reporting, and downstream EHR integration. Bring your modalities — we handle the rest.",
      capabilities: [
        {
          title: "Zero-footprint viewer",
          description:
            "Browser-based DICOM viewer with measurement tools, MPR, and structured reporting — no installs.",
        },
        {
          title: "Standards-first integration",
          description:
            "HL7 v2 and FHIR R4 connectors plus DICOMWeb interoperability so we slot into your existing EHR/HIS.",
        },
        {
          title: "Security & compliance",
          description:
            "AES-256 at rest, TLS 1.3 in transit, RBAC, signed audit logs, and Ethiopia-aligned data residency.",
        },
      ],
      benefits: [
        "No on-prem hardware to maintain",
        "Predictable per-study pricing",
        "Built for clinics with intermittent connectivity",
      ],
    },
    metadata: {
      title: "Cloud-Native PACS / RIS Platform",
      description:
        "Secure cloud-hosted PACS/RIS with AES-256 encryption, DICOM and HL7/FHIR connectivity, and a zero-footprint web viewer.",
    },
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}

export const homeBenefits: {
  title: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Timely & Accurate Reporting",
    description:
      "AI-assisted triage and a 24/7 radiologist network deliver clinically defensible reports — fast.",
    icon: Activity,
  },
  {
    title: "Cloud-Native Platform",
    description:
      "AES-256 encryption, DICOM and HL7/FHIR connectors, and bilingual reporting in Amharic and English.",
    icon: Server,
  },
  {
    title: "Round-the-Clock Access",
    description:
      "Continuous diagnostic support for public hospitals, private clinics, and rural facilities.",
    icon: Sparkles,
  },
  {
    title: "Subspecialty Expertise",
    description:
      "Certified sub-specialists in neuro, pediatric, MSK, body, breast, and emergency imaging.",
    icon: ShieldCheck,
  },
];

export const howItWorks: { step: number; title: string; description: string }[] = [
  {
    step: 1,
    title: "Upload studies securely",
    description:
      "Send DICOM studies to our cloud platform from any modality using TLS-encrypted gateways.",
  },
  {
    step: 2,
    title: "AI triages and routes",
    description:
      "Critical findings jump the queue automatically. Each study lands with the right radiologist.",
  },
  {
    step: 3,
    title: "Radiologist interprets",
    description:
      "A board-certified radiologist (or sub-specialist) reads the study in our integrated viewer.",
  },
  {
    step: 4,
    title: "Report delivered",
    description:
      "Structured reports return to your EHR or inbox in Amharic, English, or both — typically in under 30 minutes for STAT.",
  },
];

export const traditionalVsTeleradiology = {
  rows: [
    { feature: "After-hours coverage", traditional: "Limited or none", us: "24/7/365" },
    {
      feature: "Sub-specialist access",
      traditional: "Often unavailable locally",
      us: "On-demand, every modality",
    },
    {
      feature: "Critical-finding turnaround",
      traditional: "Hours to days",
      us: "Under 30 minutes",
    },
    {
      feature: "Infrastructure burden",
      traditional: "On-prem PACS + maintenance",
      us: "Fully cloud-hosted",
    },
    {
      feature: "Up-front capex",
      traditional: "Significant",
      us: "Per-study or fixed-rate",
    },
    { feature: "AI-assisted QA", traditional: "Rare", us: "Baseline on every report" },
  ],
};

export const onboardingProcess: {
  step: number;
  title: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    step: 1,
    title: "Needs assessment",
    description:
      "We map your clinical workflows, modality mix, and case volume to set up a tailored coverage plan.",
    icon: Stethoscope,
  },
  {
    step: 2,
    title: "Custom integration plan",
    description:
      "Our team designs the secure connector, EHR/HIS hooks, and reporting templates around your stack.",
    icon: Workflow,
  },
  {
    step: 3,
    title: "Go-live & training",
    description:
      "Low-disruption deployment with hands-on training for technologists, radiographers, and admin staff.",
    icon: Sparkles,
  },
  {
    step: 4,
    title: "24/7 support & optimisation",
    description:
      "Continuous coverage, quarterly QA reviews, and optimisations as your case volume grows.",
    icon: ShieldCheck,
  },
];
