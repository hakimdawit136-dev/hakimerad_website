import { ArrowRight, Phone } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";

export function FinalCta() {
  return (
    <Section tone="default" size="lg">
      <Reveal className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gradient-to-br from-brand-blue-800 to-brand-blue-900 p-10 text-center text-white shadow-soft sm:p-14">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(50% 50% at 0% 0%, rgba(255,153,0,0.22) 0%, transparent 60%), radial-gradient(40% 50% at 100% 100%, rgba(20,184,166,0.22) 0%, transparent 60%)",
          }}
        />
        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-orange-300">
            Get your first report in 30 minutes
          </p>
          <h2 className="mx-auto mt-3 max-w-2xl text-balance font-display text-3xl font-bold leading-tight sm:text-4xl">
            Ready to transform your diagnostic imaging service?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-white/85">
            Speak to a specialist about pricing, integration, and a no-commitment pilot for your facility.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/contact" size="lg">
              Schedule a consultation
              <ArrowRight className="size-4" aria-hidden />
            </Button>
            <Button
              href={`tel:${siteConfig.contact.phone}`}
              variant="outline"
              size="lg"
              className="border-white/40 text-white hover:bg-white/10"
            >
              <Phone className="size-4" aria-hidden />
              {siteConfig.contact.phoneDisplay}
            </Button>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
