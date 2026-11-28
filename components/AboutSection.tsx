'use client';

import React from 'react';
import { PORTFOLIO_CONTENT } from '@/data/portfolio';
import { SectionHeader } from './SectionHeader';
import { Counter } from './Counter';

export function AboutSection() {
  const { about, personal } = PORTFOLIO_CONTENT;

  return (
    <section id="about" className="py-20 border-b border-border scroll-mt-20">
      <SectionHeader
        number={about.sectionNumber}
        title={about.sectionTitle}
        labelClassName="text-sm"
      />

      {/* Editorial Lead Paragraph with inline highlighted role */}
      <p className="font-serif text-2xl sm:text-3xl text-foreground/90 font-light leading-relaxed max-w-3xl mb-10">
        {about.leadPrefix}
        <span className="text-accent">{personal.role}</span>, {about.lead}
      </p>

      {/* 3 Focused "What that looks like" Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-t border-border">
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
    </section>
  );
}

