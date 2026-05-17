"use client";

import * as React from "react";
import * as RadixAccordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

export type AccordionItem = {
  id: string;
  question: string;
  answer: React.ReactNode;
};

type Props = {
  items: AccordionItem[];
  defaultOpen?: string;
};

export function Accordion({ items, defaultOpen }: Props) {
  return (
    <RadixAccordion.Root
      type="single"
      collapsible
      defaultValue={defaultOpen}
      className="divide-y divide-ink-200 rounded-2xl border border-ink-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
    >
      {items.map((item) => (
        <RadixAccordion.Item
          key={item.id}
          value={item.id}
          className="group/item"
        >
          <RadixAccordion.Header>
            <RadixAccordion.Trigger
              className={cn(
                "flex w-full items-center justify-between gap-4 px-5 py-5 text-left text-base font-semibold text-ink-900",
                "transition-colors hover:bg-ink-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-700 focus-visible:ring-offset-2",
                "sm:px-6 sm:py-6 sm:text-lg",
              )}
            >
              <span>{item.question}</span>
              <ChevronDown
                aria-hidden
                className="size-5 shrink-0 text-brand-blue-700 transition-transform duration-300 group-data-[state=open]/item:rotate-180"
              />
            </RadixAccordion.Trigger>
          </RadixAccordion.Header>
          <RadixAccordion.Content
            className={cn(
              "overflow-hidden text-sm text-ink-600 sm:text-base",
              "data-[state=open]:animate-[fade-up_300ms_ease-out]",
            )}
          >
            <div className="px-5 pb-6 sm:px-6">{item.answer}</div>
          </RadixAccordion.Content>
        </RadixAccordion.Item>
      ))}
    </RadixAccordion.Root>
  );
}
