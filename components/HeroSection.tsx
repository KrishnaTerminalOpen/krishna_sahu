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
    <section className="relative min-h-[80vh] flex flex-col justify-center pt-32 sm:pt-36 md:pt-38 pb-20 overflow-hidden border-b border-border">
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

        {/* Right Column: Glowing Amber Arch Portrait Frame + Tech Coordinates */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative py-4">
          {/* Subtle dot-grid backdrop behind the arch */}
          <div
            className="absolute inset-0 pointer-events-none opacity-60"
            style={{
              backgroundImage: 'radial-gradient(rgba(232, 160, 76, 0.22) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
              maskImage: 'radial-gradient(circle at center, black 35%, transparent 72%)',
              WebkitMaskImage: 'radial-gradient(circle at center, black 35%, transparent 72%)',
            }}
            aria-hidden="true"
          />

          {/* Soft ambient amber glow */}
          <div
            className="absolute w-72 h-80 rounded-full pointer-events-none blur-3xl opacity-25 bg-accent"
            aria-hidden="true"
          />

          {/* Outer hairline arch */}
          <div className="relative p-2.5 rounded-t-full rounded-b-2xl border border-accent/25 bg-surface/20 backdrop-blur-[2px]">
            {/* Inner glowing amber arch */}
            <div className="relative w-[220px] sm:w-[250px] aspect-[3/4] rounded-t-full rounded-b-xl border border-accent/70 bg-surface overflow-hidden shadow-[0_0_35px_rgba(232,160,76,0.2)]">
              {personal.avatarUrl?.trim() ? (
                <Image
                  src={personal.avatarUrl}
                  alt={`${personal.name} portrait`}
                  fill
                  sizes="(max-width: 1024px) 220px, 250px"
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

              {/* Subtle bottom vignette inside arch */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Monospace coordinates & tag below arch */}
          <div className="relative mt-4 text-center font-mono text-[10px] tracking-widest uppercase text-muted/80 space-y-1">
            <div>{personal.coordinates}</div>
            <div className="text-accent/80">{personal.heroBadgeTag}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
