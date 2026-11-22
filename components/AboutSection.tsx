'use client';

import React from 'react';
import { PORTFOLIO_CONTENT } from '@/data/content';
import { SectionHeader } from './SectionHeader';
import { Counter } from './Counter';

export function AboutSection() {
  const { about } = PORTFOLIO_CONTENT;

  return (
    <section id="about" className="py-20 border-b border-border scroll-mt-20">
      <SectionHeader
        number={about.sectionNumber}
        title={about.sectionTitle}
      />

      {/* Editorial Lead Paragraph */}
      <p className="font-serif text-2xl sm:text-3xl text-foreground/90 font-light leading-relaxed max-w-3xl mb-12">
        {about.lead}
      </p>

      {/* 3 Focused "What that looks like" Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-t border-b border-border mb-12">
        {about.pillars.map((pillar) => (
          <div key={pillar.title} className="space-y-2">
            <div className="font-mono text-xs text-accent uppercase tracking-wider">
              {pillar.number} / {pillar.title}
            </div>
            <p className="font-sans text-sm text-muted font-light leading-relaxed">
              {pillar.description}
            </p>
          </div>
        ))}
      </div>

      {/* Minimal Inline Counter Numbers */}
      <div className="flex flex-wrap items-center gap-8 sm:gap-16 font-mono text-xs text-muted">
        {about.stats.map((stat, i) => (
          <div key={i} className="flex items-baseline gap-2">
            <span className="font-serif text-3xl text-foreground font-light">
              <Counter to={stat.value} suffix={stat.suffix} />
            </span>
            <span className="text-subtle uppercase tracking-wider text-[11px]">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
