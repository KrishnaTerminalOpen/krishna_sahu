'use client';

import React from 'react';
import Image from 'next/image';
import { PORTFOLIO_CONTENT } from '@/data/portfolio';
import { HeroStatusStrip } from './HeroStatusStrip';
import { Download, Github, Linkedin, Mail, User } from 'lucide-react';

interface HeroSectionProps {
  onOpenAiAssistant?: () => void;
}

export function HeroSection({ onOpenAiAssistant: _onOpenAiAssistant }: HeroSectionProps) {
  const { personal, hero } = PORTFOLIO_CONTENT;

  return (
    <section className="relative min-h-[80vh] flex flex-col justify-center pt-32 sm:pt-36 md:pt-38 pb-20 border-b border-border">
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
        {/* Left Column: Identity, Role, Tagline, Action Pills */}
        <div className="lg:col-span-7 flex flex-col items-start">
          {/* Location, Status & Live Clock */}
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
          <p className="font-serif text-lg sm:text-2xl text-foreground/90 font-light leading-snug mb-8 max-w-2xl">
            {personal.tagline}
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
                    className="group relative overflow-hidden inline-flex items-center justify-center gap-2.5 p-3.5 sm:px-6 sm:py-3 rounded-full border border-foreground/15 dark:border-border bg-surface/95 text-foreground hover:border-accent hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-300 ease-out shadow-sm dark:shadow-xs shrink-0"
                  >
                    {/* Light sheen sweep across pill on hover */}
                    <span
                      className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/10 to-transparent"
                      aria-hidden="true"
                    />
                    <Icon className="relative z-10 w-4 h-4 text-accent group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300" />
                    <span className="relative z-10 hidden sm:inline transition-transform duration-300 group-hover:translate-x-0.5">
                      {btn.label}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Arch Portrait Frame */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative py-4">
          {/* Subtle dot-grid backdrop behind the arch (adaptive for light & dark mode) */}
          <div
            className="hidden dark:block absolute -inset-12 pointer-events-none opacity-60"
            style={{
              backgroundImage: 'radial-gradient(rgba(232, 160, 76, 0.22) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
              maskImage: 'radial-gradient(closest-side, black 35%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(closest-side, black 35%, transparent 100%)',
            }}
            aria-hidden="true"
          />
          <div
            className="dark:hidden absolute -inset-12 pointer-events-none opacity-70"
            style={{
              backgroundImage: 'radial-gradient(rgba(24, 24, 27, 0.16) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
              maskImage: 'radial-gradient(closest-side, black 35%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(closest-side, black 35%, transparent 100%)',
            }}
            aria-hidden="true"
          />

          {/* Portrait frame wrapper holding centered, symmetrical outer glow layer behind frame */}
          <div className="relative">
            {/* Dark mode: Symmetrical amber outer glow */}
            <div
              className="hidden dark:block pointer-events-none absolute -inset-[80px] z-0 rounded-t-full rounded-b-[48px]"
              style={{
                background:
                  'radial-gradient(closest-side, rgba(232, 160, 76, 0.42), rgba(232, 160, 76, 0.2) 55%, rgba(232, 160, 76, 0) 100%)',
                filter: 'blur(40px)',
              }}
              aria-hidden="true"
            />
            {/* Light mode: Soft neutral editorial aura (no orange stain on paper background) */}
            <div
              className="dark:hidden pointer-events-none absolute -inset-[80px] z-0 rounded-t-full rounded-b-[48px]"
              style={{
                background:
                  'radial-gradient(closest-side, rgba(24, 24, 27, 0.12), rgba(180, 83, 9, 0.05) 55%, rgba(24, 24, 27, 0) 100%)',
                filter: 'blur(36px)',
              }}
              aria-hidden="true"
            />

            {/* Outer arch border & gallery matte in light mode; clean white hairline in dark mode */}
            <div className="relative z-10 p-3 rounded-t-full rounded-b-2xl border border-foreground/15 bg-surface-elevated/90 shadow-[0_24px_55px_-14px_rgba(24,24,27,0.18)] dark:border-foreground/40 dark:bg-surface/10 dark:shadow-none">
              {/* Inner arch container without border */}
              <div className="relative w-[220px] sm:w-[255px] aspect-[3/4] rounded-t-full rounded-b-xl bg-[#101014] overflow-hidden">
                {personal.avatarUrl?.trim() ? (
                  <Image
                    src={personal.avatarUrl}
                    alt={`${personal.name} portrait`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 220px, 255px"
                    className="object-cover object-top"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-surface-elevated/80 via-surface to-background text-muted gap-3">
                    <div className="w-20 h-20 rounded-full border border-accent/35 bg-accent/10 flex items-center justify-center text-accent">
                      <User className="w-9 h-9 stroke-[1.5]" />
                    </div>
                    <span className="font-mono text-[10px] tracking-widest uppercase text-muted/80">
                      {personal.shortName}
                    </span>
                  </div>
                )}

                {/* Subtle dark bottom vignette inside arch (stays dark in both light & dark mode) */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d0f]/60 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
