'use client';

import React from 'react';
import { PORTFOLIO_CONTENT } from '@/data/content';
import { HeroStatusStrip } from './HeroStatusStrip';
import { LivingDataCanvas } from './LivingDataCanvas';
import { ArrowDownRight, ArrowUpRight, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onOpenAiAssistant: () => void;
}

export function HeroSection({ onOpenAiAssistant }: HeroSectionProps) {
  const { personal, hero } = PORTFOLIO_CONTENT;

  return (
    <section className="relative min-h-[78vh] flex flex-col justify-center pt-28 pb-16 overflow-hidden border-b border-border">
      {/* Living Data Animated Canvas in Background */}
      <LivingDataCanvas />

      <div className="relative z-10 flex flex-col items-start max-w-3xl">
        {/* Status Strip */}
        <div className="mb-8">
          <HeroStatusStrip />
        </div>

        {/* Identity & Role */}
        <div className="space-y-2 mb-6">
          <div className="font-mono text-xs uppercase tracking-widest text-accent">
            {hero.eyebrow}
          </div>
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl text-foreground font-normal tracking-tight leading-[1.05]">
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

        <p className="font-sans text-base text-muted font-light leading-relaxed max-w-xl mb-10">
          {hero.intro}
        </p>

        {/* Clean Link Structure: Primary CTA followed by Socials below */}
        <div className="space-y-4 pt-2">
          <div>
            <a
              href="#projects"
              className="inline-flex items-center gap-1.5 text-foreground hover:text-accent font-mono text-xs font-medium transition-colors group"
            >
              <span>Explore Work</span>
              <ArrowDownRight className="w-3.5 h-3.5 text-accent group-hover:translate-y-0.5 transition-transform" />
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs text-muted">
            <a
              href={`mailto:${personal.email}`}
              className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
            >
              <span>Email</span>
              <ArrowUpRight className="w-3 h-3 text-muted" />
            </a>

            <span className="text-border">·</span>

            <a
              href={personal.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
            >
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3 text-muted" />
            </a>

            <span className="text-border">·</span>

            <a
              href={personal.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
            >
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3 h-3 text-muted" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
