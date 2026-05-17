import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { howItWorks } from "@/lib/content/services";

export function HowItWorks() {
  return (
    <Section tone="muted">
      <SectionHeading
        eyebrow="How it works"
        title="From study upload to signed report in 4 steps."
        description="One secure pipeline. Four predictable stages. The work feels almost invisible — which is exactly the point."
      />
      <Stagger className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
        {howItWorks.map((step, idx) => (
          <StaggerItem
            key={step.step}
            className="relative flex h-full flex-col rounded-2xl border border-ink-200 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-shadow duration-300 hover:shadow-soft"
          >
            <div className="flex items-center justify-between">
              <span className="inline-flex size-10 items-center justify-center rounded-full bg-brand-blue-50 font-display text-base font-semibold text-brand-blue-700">
                {step.step.toString().padStart(2, "0")}
              </span>
              {idx < howItWorks.length - 1 ? (
                <ArrowRight
                  className="hidden size-5 text-ink-300 lg:block"
                  aria-hidden
                />
              ) : null}
            </div>
            <h3 className="mt-5 text-lg font-semibold text-ink-900">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-600">
              {step.description}
            </p>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
