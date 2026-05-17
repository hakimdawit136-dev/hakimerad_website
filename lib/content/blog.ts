export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: "AI in Radiology" | "Healthcare in Ethiopia" | "Teleradiology";
  author: string;
  date: string; // ISO
  readingMinutes: number;
  image: string;
  imageAlt: string;
  body: string[]; // paragraphs (markdown-safe text)
};

export const blogPosts: BlogPost[] = [
  {
    slug: "ai-radiologist-shortage",
    title: "The Role of AI in Addressing Ethiopia's Radiologist Shortage",
    excerpt:
      "Artificial intelligence is not a buzzword in radiology — it's a force multiplier. Here's how AI-powered worklists and diagnostic aids amplify the impact of expert radiologists.",
    category: "AI in Radiology",
    author: "Dr. Dawit Muluneh",
    date: "2025-09-15",
    readingMinutes: 6,
    image: "/blog-images/blog-ai-radiology.png",
    imageAlt:
      "AI-powered radiology workstation with brain scan and neural-network overlay in a modern hospital setting.",
    body: [
      "Ethiopia has fewer than one radiologist per 100,000 people in most regions. The gap is not closing on its own — and importing more workstations is not the answer. The answer is software that lets every radiologist on duty be effectively two or three.",
      "AI does that by shaping the worklist, not by reading the study. When a head CT shows a likely intracranial bleed, the case jumps to the top of the queue within seconds of ingestion. The radiologist still reads it, but they read it now instead of in 90 minutes.",
      "Second-reader prompts catch incidental findings during read time — quietly, non-blockingly, and only when the model's confidence is high. Continuous QA grades every report and routes outliers to peer review. None of this replaces clinical judgement. All of it sharpens it.",
      "The result, measured across our partner facilities, is a 65% reduction in time-to-critical-result and a near-zero miss rate on the incidentals we flag. AI is not the radiologist. AI is the radiologist's worklist, sharpened.",
    ],
  },
  {
    slug: "cloud-pacs-rural-clinics",
    title: "Cloud-Native RIS/PACS: A Game-Changer for Rural Clinics",
    excerpt:
      "Advanced diagnostic tools have historically been out of reach for rural facilities. Cloud-native PACS removes the on-prem hardware barrier — for good.",
    category: "Healthcare in Ethiopia",
    author: "Dr. Dawit Muluneh",
    date: "2025-09-10",
    readingMinutes: 5,
    image: "/blog-images/blog-rural-clinic.png",
    imageAlt:
      "A rural healthcare clinic in Ethiopia with satellite connectivity for telehealth services.",
    body: [
      "A traditional PACS install means hardware, cooling, on-prem maintenance, and a five-year capex plan. For a clinic in Jigjiga or Harar, that is the difference between offering radiology and not.",
      "Cloud-native PACS flips the cost curve. The clinic needs a modality, a stable internet uplink, and a browser. Storage scales with usage. The viewer streams pixel data instead of downloading the whole study. Reports flow into the EHR via FHIR.",
      "For sites with intermittent connectivity, our gateway buffers and retries uploads. For very low-bandwidth sites, store-and-forward mode kicks in. Studies are never lost — they just queue.",
      "The most important shift is not the technology. It's that diagnostic capability is no longer a function of who could afford the on-prem PACS five years ago. It is a function of who is willing to send the study.",
    ],
  },
  {
    slug: "integrated-teleradiology-workflows",
    title: "Beyond the Report: The Value of Integrated Teleradiology Workflows",
    excerpt:
      "A teleradiology service is more than the report. It is the integration around it. Here's why HL7/FHIR connectivity is the quiet superpower of the platform.",
    category: "Teleradiology",
    author: "Dr. Dawit Muluneh",
    date: "2025-09-05",
    readingMinutes: 4,
    image: "/blog-images/blog-workflow.png",
    imageAlt:
      "Modern digital workflow visualisation showing interconnected medical systems: PACS, RIS, and EHR.",
    body: [
      "A radiology report that lives in a PDF buried in a shared drive is half a report. A report that lands inside the EHR — with structured findings, codified diagnoses, and a clickable link back to the images — is a clinical artifact your team can actually use.",
      "HL7 v2 and FHIR R4 are the boring plumbing that makes this happen. We invest in them because they collapse the gap between when a finding is documented and when it changes a treatment plan.",
      "Automated notifications close the loop. STAT findings hit the on-call clinician's phone the moment they're verified. Routine reports return to the ordering provider's inbox. Nothing waits.",
      "Integration is the unglamorous half of teleradiology — and the half that decides whether the service actually changes outcomes.",
    ],
  },
];

export function getPostBySlug(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}
