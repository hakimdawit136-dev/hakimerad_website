export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  image: string;
};

export const team: TeamMember[] = [
  {
    name: "Dr. Dawit Muluneh, MD",
    role: "Founder & CEO",
    bio: "A senior radiologist building HakimeRAD to close Ethiopia's diagnostic-imaging gap with AI-augmented teleradiology and a cloud-native platform.",
    image: "/photos/ceo-dawit.png",
  },
  {
    name: "Dr. Dawit Muluneh, MD",
    role: "Acting Chief Technology Officer",
    bio: "Leading the platform's technology direction — cloud architecture, AI integration, and the standards-first interop that makes the product work for rural clinics.",
    image: "/photos/cto.png",
  },
  {
    name: "Dr. Dawit Muluneh, MD",
    role: "Acting Chief Operations Officer",
    bio: "Owning radiologist onboarding, partner success, and the operations that keep the 24/7 service running across Ethiopia.",
    image: "/photos/coo.png",
  },
];

export const certifications: { name: string; description: string }[] = [
  {
    name: "DICOM compliant",
    description: "Native support for the international standard for medical imaging.",
  },
  {
    name: "HL7 / FHIR R4",
    description: "Standards-first integration with existing EHR and HIS systems.",
  },
  {
    name: "AES-256 encryption",
    description: "All studies encrypted at rest and in transit via TLS 1.3.",
  },
  {
    name: "Ethiopia data residency",
    description: "Studies and reports stored within Ethiopia-aligned cloud regions.",
  },
];

export const aboutValues: { title: string; description: string }[] = [
  {
    title: "Patients first",
    description:
      "Every architectural decision starts with whether it makes the patient's care better, faster, or safer.",
  },
  {
    title: "Standards over silos",
    description:
      "We invest in DICOM, HL7, and FHIR because interoperability is what lets care actually move.",
  },
  {
    title: "Local context",
    description:
      "Built for Ethiopia: bilingual reporting, intermittent connectivity, and the realities of regional hospitals.",
  },
  {
    title: "Quiet AI",
    description:
      "AI should sharpen the radiologist, not replace them — and never get in the way of the read.",
  },
];
