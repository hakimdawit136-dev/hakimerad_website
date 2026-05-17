import * as React from "react";
import Link from "next/link";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-brand-orange-500 text-white shadow-[var(--shadow-glow)] hover:bg-brand-orange-600 focus-visible:ring-brand-orange-500",
  secondary:
    "bg-brand-blue-700 text-white hover:bg-brand-blue-800 focus-visible:ring-brand-blue-700",
  outline:
    "border border-brand-blue-700 text-brand-blue-700 hover:bg-brand-blue-50 focus-visible:ring-brand-blue-700",
  ghost:
    "text-brand-blue-700 hover:bg-brand-blue-50 focus-visible:ring-brand-blue-700",
};

const sizeStyles: Record<Size, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:opacity-60 disabled:cursor-not-allowed will-change-transform hover:-translate-y-px";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
    asChild?: false;
  };

type ButtonAsLink = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string;
    asChild?: false;
  };

type ButtonAsChild = CommonProps & {
  asChild: true;
  href?: undefined;
};

type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsChild;

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    className,
    children,
  } = props;
  const classes = cn(baseStyles, variantStyles[variant], sizeStyles[size], className);

  if ("asChild" in props && props.asChild) {
    return <Slot className={classes}>{children}</Slot>;
  }

  if ("href" in props && props.href) {
    const { href, variant: _v, size: _s, className: _c, children: _ch, ...rest } =
      props as ButtonAsLink;
    void _v; void _s; void _c; void _ch;
    const isExternal = /^https?:\/\//.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");
    if (isExternal) {
      return (
        <a href={href} className={classes} {...rest}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, ...rest } =
    props as ButtonAsButton;
  void _v; void _s; void _c; void _ch;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
