'use client';

import React from 'react';
import { PORTFOLIO_CONTENT } from '@/data/portfolio';
import { SectionHeader } from './SectionHeader';
import { Download, ArrowUpRight } from 'lucide-react';

export function ResumeSection() {
  const { resume, personal } = PORTFOLIO_CONTENT;

  return (
    <section id="resume" className="py-20 border-b border-border scroll-mt-20">
      <SectionHeader
        number={resume.sectionNumber}
        title={resume.sectionTitle}
      />

      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-6 py-6 border-t border-b border-border">
        <div className="space-y-1">
          <h3 className="font-serif text-2xl text-foreground font-normal">
            {resume.degree}
          </h3>
          <div className="font-mono text-xs text-muted">
            {resume.institution} &middot; {resume.period} &middot; <span className="text-accent">{resume.grade}</span>
          </div>
        </div>

        <div className="flex items-center gap-6 font-mono text-xs shrink-0">
          <a
            href={personal.resumePath}
            download={personal.resumeFileName}
            className="inline-flex items-center gap-1.5 text-foreground hover:text-accent font-medium transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-accent" />
            <span>{resume.downloadLabel}</span>
          </a>

          <a
            href={personal.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-muted hover:text-foreground transition-colors"
          >
            <span>{resume.viewPdfLabel}</span>
            <ArrowUpRight className="w-3 h-3 text-muted" />
          </a>
        </div>
      </div>
    </section>
  );
}
