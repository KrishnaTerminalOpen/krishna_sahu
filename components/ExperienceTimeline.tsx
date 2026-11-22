'use client';

import React, { useRef } from 'react';
import { PORTFOLIO_CONTENT } from '@/data/content';
import { SectionHeader } from './SectionHeader';
import { motion, useScroll, useTransform } from 'framer-motion';

export function ExperienceTimeline() {
  const { experience } = PORTFOLIO_CONTENT;
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 85%', 'end 55%'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="experience" className="py-20 border-b border-border scroll-mt-20">
      <SectionHeader
        number={experience.sectionNumber}
        title={experience.sectionTitle}
      />

      <div ref={containerRef} className="relative pl-6 sm:pl-8 space-y-10">
        {/* Hairline guide */}
        <div className="absolute left-[7px] top-2 bottom-2 w-[1px] bg-border" />
        <motion.div
          className="absolute left-[7px] top-2 w-[1px] bg-accent origin-top"
          style={{ height: lineHeight }}
        />

        {experience.items.map((item, index) => (
          <div key={`${item.role}-${index}`} className="relative space-y-2">
            {/* Dot marker */}
            <div className="absolute -left-[20px] top-2 w-2 h-2 rounded-full border border-accent bg-surface" />

            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <h3 className="font-serif text-xl sm:text-2xl text-foreground font-normal tracking-tight">
                {item.role}
              </h3>
              <span className="font-mono text-xs text-muted">
                {item.period}
              </span>
            </div>

            <div className="font-mono text-xs text-accent">
              {item.organization} &middot; <span className="text-muted">{item.location}</span>
            </div>

            <p className="font-sans text-sm text-foreground/80 font-light leading-relaxed max-w-xl">
              {item.summary} {item.highlight}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}


