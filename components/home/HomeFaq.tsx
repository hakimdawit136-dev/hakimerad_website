import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";
import { FaqJsonLd } from "@/components/seo/JsonLd";
import { homeFaqs } from "@/lib/content/faqs";

export function HomeFaq() {
  return (
    <Section tone="muted">
      <SectionHeading
        eyebrow="Frequently asked"
        title="Answers to the questions we hear most often."
      />
      <div className="mx-auto mt-10 max-w-3xl sm:mt-14">
        <Accordion
          items={homeFaqs.map((f) => ({
            id: f.id,
            question: f.question,
            answer: <p>{f.answer}</p>,
          }))}
          defaultOpen={homeFaqs[0]?.id}
        />
      </div>
      <FaqJsonLd items={homeFaqs.map((f) => ({ question: f.question, answer: f.answer }))} />
    </Section>
  );
}
