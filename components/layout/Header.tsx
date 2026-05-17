"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/cn";
import { primaryNav } from "@/lib/nav";
import { siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/Button";

function Logo({ size = 40 }: { size?: number }) {
  return (
    <span className="flex items-center gap-2.5">
      <Image
        src="/favicon/apple-icon-180x180.png"
        alt=""
        aria-hidden
        width={size}
        height={size}
        className="size-10 rounded-md"
        priority
      />
      <span className="font-display text-2xl font-bold leading-none">
        <span className="text-brand-blue-700">Hakim</span>
        <span className="text-brand-orange-500">eRAD</span>
      </span>
      <span className="sr-only">{siteConfig.name}</span>
    </span>
  );
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-ink-200/80 bg-white/85 backdrop-blur-md shadow-[0_1px_0_rgba(15,23,42,0.04)]"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:h-20 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label={`${siteConfig.name} — home`}
          className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-700 focus-visible:ring-offset-2"
        >
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {primaryNav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative inline-flex h-10 items-center rounded-full px-4 text-sm font-medium transition-colors",
                      active
                        ? "text-brand-blue-700"
                        : "text-ink-600 hover:text-brand-blue-700",
                    )}
                  >
                    {item.label}
                    {active ? (
                      <span
                        aria-hidden
                        className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-brand-orange-500"
                      />
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${siteConfig.contact.phone}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-ink-700 hover:text-brand-blue-700"
          >
            <Phone className="size-4" aria-hidden />
            <span aria-hidden>{siteConfig.contact.phoneDisplay}</span>
            <span className="sr-only">Call {siteConfig.contact.phoneDisplay}</span>
          </a>
          <Button href="/contact" size="md">
            Schedule a Consultation
          </Button>
        </div>

        <div className="lg:hidden">
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className="inline-flex size-10 items-center justify-center rounded-full text-ink-700 hover:bg-ink-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-700 focus-visible:ring-offset-2"
              >
                <Menu className="size-6" aria-hidden />
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-50 bg-ink-900/40 backdrop-blur-sm data-[state=open]:animate-[fade-in_180ms_ease-out]" />
              <Dialog.Content
                className="fixed inset-y-0 right-0 z-50 flex h-full w-full max-w-sm flex-col bg-white p-6 shadow-soft outline-none data-[state=open]:animate-[fade-up_200ms_ease-out]"
                aria-describedby={undefined}
              >
                <div className="flex items-center justify-between">
                  <Dialog.Title asChild>
                    <Logo />
                  </Dialog.Title>
                  <Dialog.Close asChild>
                    <button
                      type="button"
                      aria-label="Close menu"
                      className="inline-flex size-10 items-center justify-center rounded-full text-ink-700 hover:bg-ink-100"
                    >
                      <X className="size-5" aria-hidden />
                    </button>
                  </Dialog.Close>
                </div>
                <nav aria-label="Mobile" className="mt-8">
                  <ul className="flex flex-col gap-1">
                    {primaryNav.map((item) => {
                      const active =
                        item.href === "/"
                          ? pathname === "/"
                          : pathname.startsWith(item.href);
                      return (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            aria-current={active ? "page" : undefined}
                            className={cn(
                              "block rounded-xl px-3 py-3 text-base font-medium transition-colors",
                              active
                                ? "bg-brand-blue-50 text-brand-blue-700"
                                : "text-ink-700 hover:bg-ink-50",
                            )}
                          >
                            {item.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
                <div className="mt-auto flex flex-col gap-3 pt-6">
                  <a
                    href={`tel:${siteConfig.contact.phone}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-ink-200 px-4 py-3 text-sm font-medium text-ink-800"
                  >
                    <Phone className="size-4" aria-hidden />
                    {siteConfig.contact.phoneDisplay}
                  </a>
                  <Button href="/contact" size="lg" className="w-full">
                    Schedule a Consultation
                  </Button>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}
