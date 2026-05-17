import { ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { partnerLogos } from "@/lib/content/testimonials";

export function TrustBar() {
  return (
    <section
      aria-label="Trusted by"
      className="border-y border-ink-200 bg-white py-8"
    >
      <Container>
        <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-center lg:gap-10">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-ink-500">
            <ShieldCheck className="size-4 text-brand-blue-700" aria-hidden />
            Trusted by Ethiopian healthcare leaders
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 lg:flex-1">
            {partnerLogos.map((p) => (
              <li
                key={p.name}
                className="text-sm font-semibold uppercase tracking-wider text-ink-400 transition-colors hover:text-ink-700"
              >
                {p.name}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
