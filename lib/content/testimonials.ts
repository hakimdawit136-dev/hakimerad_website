export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  organization: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "HakimeRAD's AI-powered platform reduced our radiology report turnaround time by 70%, allowing us to provide faster care to critical patients.",
    name: "Dr. Kalkidan Zenebe",
    role: "Emergency & Critical Care Specialist",
    organization: "Addis Ababa City Administration Health Bureau",
  },
  {
    quote:
      "The cloud-native PACS has transformed our workflow. Our radiologists can now interpret studies from anywhere, improving our operational efficiency.",
    name: "Dr. Merid Lemma Kebede",
    role: "Head of Radiology",
    organization: "Jimma University Medical Center",
  },
  {
    quote:
      "Implementing HakimeRAD's teleradiology service allowed our rural clinic to provide specialised care without patient transfers. A game-changer for our community.",
    name: "Professor Netsanet Workneh",
    role: "Oromia Health Bureau Head",
    organization: "Oromia Regional Health Bureau",
  },
  {
    quote:
      "HakimeRAD's AI-powered platform allowed us to reach the remote and rural communities, expanding our diagnostic service delivery.",
    name: "Nesredin Ishak Beshir",
    role: "Senior Public Health Specialist & General Manager",
    organization: "Sina Grand Hospital",
  },
];

export const partnerLogos: { name: string }[] = [
  { name: "Jimma University Medical Center" },
  { name: "Sina Grand Hospital" },
  { name: "Oromia Regional Health Bureau" },
  { name: "AACA Health Bureau" },
  { name: "DICOM-compliant" },
  { name: "HL7 / FHIR R4" },
];

export const stats: {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
}[] = [
  { label: "Partner facilities", value: 5, suffix: "+" },
  { label: "Reduction in report TAT", value: 65, suffix: "%" },
  { label: "Service availability", value: 24, suffix: "/7" },
  { label: "Bilingual reporting", value: 2, suffix: " langs" },
];
