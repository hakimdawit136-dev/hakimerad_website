export type Faq = {
  id: string;
  question: string;
  answer: string;
};

export const pricingFaqs: Faq[] = [
  {
    id: "fees",
    question: "Are there any setup fees or hidden costs?",
    answer:
      "No. We believe in transparent pricing. There are no long-term commitments, setup fees, or hidden charges. For our Per-Case plan, you simply pay for the reports you need. For our coverage plans, you pay a fixed, predictable monthly fee.",
  },
  {
    id: "quality",
    question: "How do you ensure the quality of radiology reports?",
    answer:
      "All our radiologists are board-certified and undergo a rigorous vetting process. Our AI-powered platform assists in prioritising critical cases and flagging potential discrepancies, and we have a multi-level quality assurance process to ensure the highest diagnostic accuracy.",
  },
  {
    id: "start",
    question: "What is required to start using HakimeRAD's services?",
    answer:
      "Getting started is simple. All you need is a stable internet connection and DICOM-compliant imaging equipment. Our technical team will handle the secure VPN setup and integration, providing you with access to our cloud-native platform at no extra cost.",
  },
  {
    id: "custom",
    question: "Can we create a custom plan for our hospital network?",
    answer:
      "Yes. We specialise in creating custom enterprise solutions for large hospitals and regional health networks. Please schedule a consultation with our team to discuss your specific needs, case volume, and desired service levels, and we will design a tailored partnership model for you.",
  },
];

export const homeFaqs: Faq[] = [
  {
    id: "stat-tat",
    question: "How fast are STAT reports delivered?",
    answer:
      "STAT studies are interpreted within 30 minutes of upload by a board-certified radiologist, with critical findings communicated verbally to the treating team in parallel with the written report.",
  },
  {
    id: "compliance",
    question: "Is the platform compliant with data protection standards?",
    answer:
      "Yes. All studies are encrypted in transit (TLS 1.3) and at rest (AES-256). Role-based access control, signed audit logs, and Ethiopia-aligned data residency are baseline features of the platform.",
  },
  {
    id: "integration",
    question: "Will it integrate with our existing EHR or HIS?",
    answer:
      "Most likely, yes. We support HL7 v2, FHIR R4, and DICOMWeb out of the box. Our team builds custom connectors when an EHR exposes a non-standard interface, at no extra cost on the Premium plan.",
  },
  {
    id: "rural",
    question: "What about clinics with intermittent connectivity?",
    answer:
      "Our gateway buffers and retries uploads automatically when connectivity is unstable. For sites with very low bandwidth, we offer a store-and-forward mode so studies are never lost.",
  },
];
