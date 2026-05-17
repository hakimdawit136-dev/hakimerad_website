"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function Hero() {
  const reduce = useReducedMotion();
  const videoRef = React.useRef<HTMLVideoElement>(null);

  // Defer playback until first idle so the LCP frame is the poster, not the decoded video.
  React.useEffect(() => {
    if (reduce) return;
    const video = videoRef.current;
    if (!video) return;
    const start = () => {
      video.play().catch(() => {
        /* autoplay can be blocked on low-power mode — fine, poster stays */
      });
    };
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void) => number;
    };
    if (typeof w.requestIdleCallback === "function") {
      w.requestIdleCallback(start);
    } else {
      window.setTimeout(start, 300);
    }
  }, [reduce]);

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-brand-blue-900 text-white"
    >
      <div className="absolute inset-0 -z-10">
        <video
          ref={videoRef}
          poster="/videos/hero-poster.jpg"
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
          className="size-full object-cover"
        >
          <source src="/videos/hero.webm" type="video/webm" />
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-brand-blue-900/85 via-brand-blue-800/80 to-brand-blue-900/95"
        />
        <div
          aria-hidden
          className="absolute inset-0 mix-blend-soft-light"
          style={{
            backgroundImage:
              "radial-gradient(60% 60% at 80% 10%, rgba(255,153,0,0.35) 0%, transparent 60%), radial-gradient(50% 50% at 10% 90%, rgba(20,184,166,0.3) 0%, transparent 60%)",
          }}
        />
      </div>

      <Container className="relative grid min-h-[88vh] place-items-center py-24 sm:min-h-[92vh] sm:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={reduce ? undefined : { opacity: 0, y: 10 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-white/90 backdrop-blur"
          >
            <span className="size-1.5 rounded-full bg-brand-orange-400" aria-hidden />
            AI-enabled teleradiology • Ethiopia
          </motion.span>

          <motion.h1
            id="hero-heading"
            initial={reduce ? undefined : { opacity: 0, y: 16 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 text-balance font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Bridging Ethiopia&rsquo;s diagnostic gap with{" "}
            <span className="bg-gradient-to-r from-brand-orange-300 to-brand-orange-500 bg-clip-text text-transparent">
              AI-augmented teleradiology
            </span>
            .
          </motion.h1>

          <motion.p
            initial={reduce ? undefined : { opacity: 0, y: 12 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-pretty text-base text-white/85 sm:text-lg"
          >
            Secure, cloud-native PACS / RIS and a 24/7 radiologist network deliver
            interpretations in under 30 minutes for STAT cases — bilingual in
            Amharic and English.
          </motion.p>

          <motion.div
            initial={reduce ? undefined : { opacity: 0, y: 10 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button href="/contact" size="lg">
              Schedule a consultation
              <ArrowRight className="size-4" aria-hidden />
            </Button>
            <Button href="/services" variant="outline" size="lg" className="border-white/40 text-white hover:bg-white/10">
              <PlayCircle className="size-4" aria-hidden />
              Explore our services
            </Button>
          </motion.div>

          <motion.dl
            initial={reduce ? undefined : { opacity: 0 }}
            animate={reduce ? undefined : { opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-14 grid grid-cols-3 gap-3 rounded-2xl border border-white/15 bg-white/5 p-4 text-left backdrop-blur sm:gap-6 sm:p-6"
          >
            <HeroStat value="<30m" label="STAT turnaround" />
            <HeroStat value="24/7" label="Service availability" />
            <HeroStat value="2 langs" label="Amharic + English" />
          </motion.dl>
        </div>
      </Container>
    </section>
  );
}

function HeroStat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <dt className="text-2xl font-bold text-white sm:text-3xl">{value}</dt>
      <dd className="mt-1 text-xs uppercase tracking-[0.16em] text-white/70 sm:text-sm">
        {label}
      </dd>
    </div>
  );
}
