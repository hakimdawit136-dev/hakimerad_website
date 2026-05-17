import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";

const items = [
  { label: "Partner facilities", value: 5, suffix: "+" },
  { label: "Reduction in report TAT", value: 65, suffix: "%" },
  { label: "Hours of coverage", value: 24, suffix: "/7" },
  { label: "Languages reported", value: 2, suffix: "" },
];

export function Stats() {
  return (
    <Section tone="brand">
      <SectionHeading
        eyebrow="Impact"
        title="Measurable outcomes from our partner facilities."
        description="The numbers below come from our live network of partner hospitals and clinics."
        invert
      />
      <Stagger className="mt-12 grid grid-cols-2 gap-4 sm:mt-16 lg:grid-cols-4">
        {items.map((s) => (
          <StaggerItem
            key={s.label}
            className="rounded-2xl bg-white/10 p-6 backdrop-blur ring-1 ring-white/10"
          >
            <p className="font-display text-4xl font-bold text-white sm:text-5xl">
              <Counter value={s.value} suffix={s.suffix} />
            </p>
            <p className="mt-2 text-sm uppercase tracking-[0.16em] text-white/75">
              {s.label}
            </p>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
