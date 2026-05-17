"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/lib/content/testimonials";
import { cn } from "@/lib/cn";

const ROTATE_MS = 7000;

export function Testimonials() {
  const reduce = useReducedMotion();
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    if (reduce || paused) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [reduce, paused]);

  const go = React.useCallback((dir: 1 | -1) => {
    setIndex((i) => (i + dir + testimonials.length) % testimonials.length);
  }, []);

  const current = testimonials[index];

  return (
    <Section>
      <SectionHeading
        eyebrow="In their words"
        title="Built with — and for — the people delivering care."
      />
      <div
        className="mt-10 sm:mt-14"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <div className="relative mx-auto max-w-3xl">
          <div className="absolute -left-2 -top-2 rounded-full bg-brand-orange-500 p-3 text-white shadow-soft sm:-left-4 sm:-top-4">
            <Quote className="size-5" aria-hidden />
          </div>
          <div
            role="region"
            aria-roledescription="carousel"
            aria-label="Customer testimonials"
            className="overflow-hidden rounded-3xl border border-ink-200 bg-white p-8 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.12)] sm:p-12"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.blockquote
                key={current.name}
                initial={reduce ? undefined : { opacity: 0, y: 8 }}
                animate={reduce ? undefined : { opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-6"
              >
                <p className="text-balance text-lg leading-relaxed text-ink-800 sm:text-xl">
                  &ldquo;{current.quote}&rdquo;
                </p>
                <footer className="flex flex-col gap-1 border-t border-ink-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <cite className="not-italic">
                      <span className="block font-semibold text-ink-900">
                        {current.name}
                      </span>
                      <span className="block text-sm text-ink-600">
                        {current.role}
                      </span>
                      <span className="block text-sm text-ink-500">
                        {current.organization}
                      </span>
                    </cite>
                  </div>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {testimonials.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  aria-label={`Show testimonial ${i + 1} of ${testimonials.length}`}
                  aria-current={i === index ? "true" : undefined}
                  onClick={() => setIndex(i)}
                  className={cn(
                    "h-2 rounded-full transition-all",
                    i === index
                      ? "w-8 bg-brand-blue-700"
                      : "w-2 bg-ink-300 hover:bg-ink-400",
                  )}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous testimonial"
                onClick={() => go(-1)}
                className="inline-flex size-10 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-700 hover:bg-ink-50"
              >
                <ChevronLeft className="size-4" aria-hidden />
              </button>
              <button
                type="button"
                aria-label="Next testimonial"
                onClick={() => go(1)}
                className="inline-flex size-10 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-700 hover:bg-ink-50"
              >
                <ChevronRight className="size-4" aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
