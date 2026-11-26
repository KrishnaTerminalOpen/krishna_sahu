'use client';

import React from 'react';
import { PORTFOLIO_CONTENT } from '@/data/portfolio';
import { HeroStatusStrip } from './HeroStatusStrip';
import { LivingDataCanvas } from './LivingDataCanvas';
import { Download, Github, Linkedin, Mail } from 'lucide-react';

interface HeroSectionProps {
  onOpenAiAssistant: () => void;
}

export function HeroSection({ onOpenAiAssistant }: HeroSectionProps) {
  const { personal, hero } = PORTFOLIO_CONTENT;

  return (
    <section className="relative min-h-[80vh] flex flex-col justify-center pt-32 sm:pt-36 md:pt-38 pb-20 overflow-hidden border-b border-border">
      <div className="relative z-10 flex flex-col items-start max-w-3xl">
        {/* Mobile-Only Location & Live Clock (Displays only on screens where navbar hides it) */}
        <HeroStatusStrip />

        {/* Identity & Role */}
        <div className="space-y-3 mb-6">
          <h1
            className="text-6xl sm:text-7xl md:text-8xl text-foreground font-normal tracking-tight leading-[1.0]"
            style={{ fontFamily: 'var(--font-display), var(--font-serif)' }}
          >
            {personal.name}
          </h1>
          <p className="font-mono text-sm sm:text-base text-accent font-light">
            {personal.role}
          </p>
        </div>

        {/* Crisp Intro Statement */}
        <p className="font-serif text-2xl sm:text-3xl text-foreground/90 font-light leading-snug mb-8 max-w-2xl">
          &ldquo;{personal.tagline}&rdquo;
        </p>

        {/* Pill action buttons (icon-only single row on mobile, full pill on desktop) */}
        <div className="pt-2">
          <div className="flex flex-nowrap sm:flex-wrap items-center gap-3 sm:gap-3.5 font-mono text-sm">
            {[
              {
                label: hero.links.email,
                href: `mailto:${personal.email}`,
                icon: Mail,
              },
              {
                label: hero.links.github,
                href: personal.socials.github,
                icon: Github,
                external: true,
              },
              {
                label: hero.links.linkedin,
                href: personal.socials.linkedin,
                icon: Linkedin,
                external: true,
              },
              {
                label: hero.links.resume,
                href: personal.resumePath,
                icon: Download,
                download: personal.resumeFileName,
              },
            ].map((btn) => {
              const Icon = btn.icon;
              return (
                <a
                  key={btn.label}
                  href={btn.href}
                  target={btn.external ? '_blank' : undefined}
                  rel={btn.external ? 'noopener noreferrer' : undefined}
                  download={btn.download}
                  aria-label={btn.label}
                  title={btn.label}
                  className="group inline-flex items-center justify-center gap-2.5 p-3.5 sm:px-6 sm:py-3 rounded-full border border-border bg-surface/90 text-foreground hover:bg-accent hover:border-accent hover:text-background hover:-translate-y-0.5 transition-all duration-200 shadow-xs shrink-0"
                >
                  <Icon className="w-4 h-4 text-accent group-hover:text-background transition-colors" />
                  <span className="hidden sm:inline">{btn.label}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
