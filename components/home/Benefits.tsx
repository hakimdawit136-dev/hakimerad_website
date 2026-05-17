import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { homeBenefits } from "@/lib/content/services";

export function Benefits() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Why HakimeRAD"
        title="A teleradiology platform built for Ethiopia."
        description="Calibrated for clinical reality: intermittent connectivity, and the radiologist shortage at the core of the country's diagnostic service delivery gap."
      />
      <Stagger className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
        {homeBenefits.map((b) => {
          const Icon = b.icon;
          return (
            <StaggerItem
              key={b.title}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink-200 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-soft"
            >
              <div className="inline-flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-blue-50 to-brand-blue-100 text-brand-blue-700 transition-colors group-hover:from-brand-orange-100 group-hover:to-brand-orange-200 group-hover:text-brand-orange-700">
                <Icon className="size-6" aria-hidden />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-ink-900">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">
                {b.description}
              </p>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}
