'use client';

import React, { useRef } from 'react';
import { PORTFOLIO_CONTENT } from '@/data/portfolio';
import { SectionHeader } from './SectionHeader';
import { motion, useScroll, useTransform } from 'framer-motion';

export function ExperienceTimeline() {
  const { education } = PORTFOLIO_CONTENT;
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 85%', 'end 55%'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="education" className="py-20 border-b border-border scroll-mt-20">
      <SectionHeader
        number={education.sectionNumber}
        title={education.sectionTitle}
      />

      <div ref={containerRef} className="relative pl-6 sm:pl-8 space-y-10">
        {/* Hairline guide */}
        <div className="absolute left-[7px] top-2 bottom-2 w-[1px] bg-border" />
        <motion.div
          className="absolute left-[7px] top-2 w-[1px] bg-accent origin-top"
          style={{ height: lineHeight }}
        />

        {education.items.map((edu, index) => (
          <div key={`${edu.degree}-${index}`} className="relative space-y-2">
            {/* Dot marker */}
            <div className="absolute -left-[20px] top-2 w-2 h-2 rounded-full border border-accent bg-surface" />

            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2.5">
                <h3 className="font-serif text-xl sm:text-2xl text-foreground font-normal tracking-tight">
                  {edu.degree}
                </h3>
                {edu.status === 'Ongoing' && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-accent/10 border border-accent/25 font-mono text-[10px] text-accent">
                    Ongoing
                  </span>
                )}
              </div>

              <span className="font-mono text-xs text-muted shrink-0">
                {edu.period}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs text-accent">
              <span>{edu.institution}</span>
              {edu.cgpa && (
                <>
                  <span className="text-border">&middot;</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-accent/10 border border-accent/25 font-mono text-[10px] text-accent">
                    {edu.cgpa}
                  </span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
