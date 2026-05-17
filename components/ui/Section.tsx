import * as React from "react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  bleed?: boolean;
  tone?: "default" | "muted" | "brand" | "mesh";
  size?: "sm" | "md" | "lg";
};

const toneStyles: Record<NonNullable<SectionProps["tone"]>, string> = {
  default: "bg-white",
  muted: "bg-ink-50",
  brand: "bg-brand-blue-700 text-white",
  mesh: "gradient-mesh",
};

const sizeStyles: Record<NonNullable<SectionProps["size"]>, string> = {
  sm: "py-10 sm:py-12 lg:py-16",
  md: "py-14 sm:py-20 lg:py-24",
  lg: "py-20 sm:py-24 lg:py-32",
};

export function Section({
  className,
  bleed = false,
  tone = "default",
  size = "md",
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(toneStyles[tone], sizeStyles[size], className)}
      {...props}
    >
      {bleed ? children : <Container>{children}</Container>}
    </section>
  );
}
